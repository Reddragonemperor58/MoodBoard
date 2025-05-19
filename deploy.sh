#!/bin/bash

# Exit on error
set -e

echo "🚀 Building the application..."
npm run build

echo "🚀 Deploying to GitHub Pages..."
npx gh-pages -d dist --clean

echo "✅ Deployment successful!"
echo "Your app should be live at: https://<your-username>.github.io/MoodBoard/"
echo "Note: It may take a few minutes for the changes to be visible."
