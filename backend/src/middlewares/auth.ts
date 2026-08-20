import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/jwt';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';
import prisma from '../utils/prisma';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
        permissions: string[];
      };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Access token is missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    // Fetch user role and permissions from DB to enforce dynamic RBAC
    const userDb = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!userDb || !userDb.isActive) {
      throw new UnauthorizedError('User account is inactive or deleted');
    }

    const permissions = userDb.role.permissions.map((rp) => rp.permission.name);

    req.user = {
      userId: userDb.id,
      email: userDb.email,
      role: userDb.role.name,
      permissions,
    };

    next();
  } catch (error) {
    next(new UnauthorizedError('Access token is missing, expired, or invalid'));
  }
};

// Enforces specific role membership
export const requireRoles = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError());
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError('You do not have permission to access this resource'));
    }

    next();
  };
};

// Enforces specific permission ownership
export const requirePermissions = (requiredPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError());
    }

    const hasPermission = requiredPermissions.every((perm) =>
      req.user?.permissions.includes(perm)
    );

    if (!hasPermission) {
      return next(new ForbiddenError('Access denied: Insufficient permissions'));
    }

    next();
  };
};
