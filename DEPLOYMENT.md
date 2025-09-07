# Student Attendance Tracker - Deployment Guide

## Overview
The Student Attendance Tracker is a modern Next.js application built with TypeScript, Tailwind CSS, and shadcn/ui components. This guide will help you deploy the application to various platforms.

## Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

## Build the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Production
```bash
npm run build
```

### 3. Run in Production Mode
```bash
npm run start:next
```

## Deployment Platforms

### Vercel (Recommended)
1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Vercel will automatically detect the Next.js app and deploy it
4. Set the build command to `npm run build`
5. Set the start command to `npm run start:next`

### Netlify
1. Push your code to a Git repository
2. Connect your repository to Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `.next`
5. Add a `netlify.toml` file with the following configuration:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Railway
1. Create a new Railway project
2. Connect your Git repository
3. Railway will automatically detect the Next.js app
4. Set the build command to `npm run build`
5. Set the start command to `npm run start:next`

### AWS Amplify
1. Create a new Amplify app
2. Connect your Git repository
3. Amplify will automatically detect the Next.js app
4. Set the build settings:
   - Build command: `npm run build`
   - Start command: `npm run start:next`
   - Publish directory: `.next`

### DigitalOcean App Platform
1. Create a new App Platform project
2. Connect your Git repository
3. DigitalOcean will detect the Next.js app
4. Set the build command to `npm run build`
5. Set the run command to `npm run start:next`

## Environment Variables
The application doesn't require any environment variables for basic functionality. However, if you want to use additional features, you can add:

- `NODE_ENV`: Set to `production` for production builds
- `NEXT_PUBLIC_APP_URL`: Your application's public URL

## Troubleshooting

### Build Issues
If you encounter build issues:

1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. Clear the Next.js cache:
   ```bash
   rm -rf .next
   npm run build
   ```

3. Check for TypeScript errors:
   ```bash
   npm run lint
   ```

### Runtime Issues
If the application fails to start:

1. Check if port 3000 is available
2. Make sure the build was successful
3. Check the server logs for error messages

### Common Issues
- **Port already in use**: The development server might be running. Stop it or use a different port.
- **Build fails**: Check for missing dependencies or TypeScript errors.
- **Styles not loading**: Make sure Tailwind CSS is properly configured.

## Features
- 📊 Subject-wise attendance tracking
- 📅 Exam schedule management
- ⏰ Weekly class schedule
- 🌙 Dark/Light mode support
- 📱 Fully responsive design
- 🎯 Attendance goal calculator
- 🔄 Reset functionality
- 📈 Progress visualization

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance
- Optimized build with Next.js 15
- Lazy loading for better performance
- Responsive images and assets
- Efficient bundle splitting

## Security
- No external API calls for basic functionality
- Client-side only data storage
- No sensitive data handling

## Support
For issues or questions, please check the repository issues or create a new one.