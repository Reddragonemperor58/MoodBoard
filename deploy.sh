#!/bin/bash

# Exit on error
set -e

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist
rm -rf node_modules/.vite

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🚀 Building the application..."
npm run build

# Create a nojekyll file to prevent GitHub Pages from processing the files
echo "📝 Creating .nojekyll file..."
touch dist/.nojekyll

# Create a CNAME file if you're using a custom domain
# echo "yourdomain.com" > dist/CNAME

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
npx gh-pages -d dist --clean --dotfiles

echo ""
echo "✅ Deployment successful!"
echo "📱 Your app should be live at: https://<your-username>.github.io/MoodBoard/"
echo "⏳ Note: It may take a few minutes for the changes to be visible."
echo ""
echo "🔄 If you encounter any issues, try:"
echo "1. Hard refreshing your browser (Ctrl+Shift+R or Cmd+Shift+R)"
echo "2. Clearing your browser cache"
echo "3. Waiting a few minutes for GitHub's CDN to update"
