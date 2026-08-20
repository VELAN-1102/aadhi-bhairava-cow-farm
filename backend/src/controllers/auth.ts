import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { BadRequestError, ConflictError, UnauthorizedError } from '../utils/errors';
import sendResponse from '../utils/response';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, phone, roleName } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictError('A user with this email address already exists');
    }

    // Find the role requested
    const role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) {
      throw new BadRequestError(`Requested role "${roleName}" does not exist`);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        phone,
        roleId: role.id,
        isActive: true,
      },
      include: {
        role: true,
      },
    });

    const userResponse = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
      role: newUser.role.name,
      createdAt: newUser.createdAt,
    };

    return sendResponse(res, req, 201, 'User registered successfully', userResponse);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Retrieve user and their role
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedError('Invalid email or password credentials');
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password credentials');
    }

    // Generate credentials tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role.name,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Cache or record activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        activityType: 'LOGIN',
        description: `User ${user.email} logged in successfully`,
      },
    });

    const loginResponse = {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role.name,
      },
      accessToken,
      refreshToken,
    };

    return sendResponse(res, req, 200, 'Login successful', loginResponse);
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    const decoded = verifyRefreshToken(refreshToken);

    // Fetch active user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedError('Invalid token owner status');
    }

    // Issue a fresh access token
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role.name,
    };

    const accessToken = generateAccessToken(tokenPayload);

    return sendResponse(res, req, 200, 'Access token refreshed successfully', { accessToken });
  } catch (error) {
    next(new UnauthorizedError('Refresh token is expired, invalid, or corrupted'));
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatarUrl: true,
        isActive: true,
        createdAt: true,
        role: {
          select: {
            name: true,
            permissions: {
              select: {
                permission: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new BadRequestError('User details could not be found');
    }

    const userProfile = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      role: user.role.name,
      permissions: user.role.permissions.map((p) => p.permission.name),
      createdAt: user.createdAt,
    };

    return sendResponse(res, req, 200, 'Profile details fetched successfully', userProfile);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      await prisma.activityLog.create({
        data: {
          userId: req.user.userId,
          activityType: 'LOGOUT',
          description: `User ${req.user.email} logged out`,
        },
      });
    }

    return sendResponse(res, req, 200, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};
