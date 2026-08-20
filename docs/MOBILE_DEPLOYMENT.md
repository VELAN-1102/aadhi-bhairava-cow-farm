# Mobile App Deployment & EAS Guide

This document describes how to configure and deploy the React Native Expo app.

## Expo EAS Configuration

We utilize **Expo Application Services (EAS)** for production builds and publishing.

- Configuration is stored in `mobile/eas.json` (defines development, preview, and production profiles).
- Credentials and JWT tokens are managed locally via `expo-secure-store`.

## Installation & Local Runs
```bash
# Navigate to mobile
cd mobile

# Install Expo packages
npm install

# Run Expo local bundler
npx expo start
```

## EAS Production Builds

Ensure you are logged into your Expo account:
```bash
# Login to EAS
npx eas login

# Configure EAS project
npx eas build:configure

# Trigger production Android build (AAB / APK)
npx eas build --platform android --profile production

# Trigger production iOS build
npx eas build --platform ios --profile production
```

## OTA Updates (Over-The-Air)

Deploy hotfixes instantly without rebuilding native APKs:
```bash
npx eas update --branch production --message "releasing patch updates"
```
