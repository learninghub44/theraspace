#!/bin/bash
# TheraSpace GitHub Push Script
# Run this after creating your GitHub repo

echo "=== TheraSpace GitHub Push ==="
echo ""
echo "Step 1: Create a new GitHub repository"
echo "   Go to: https://github.com/new"
echo "   Repository name: theraspace"
echo "   Visibility: Public (or Private)"
echo "   DO NOT initialize with README (we already have files)"
echo ""
read -p "Press Enter after creating the repo..."
echo ""

# Replace with your actual GitHub username
echo "Step 2: Enter your GitHub username:"
read GITHUB_USER

echo ""
echo "Step 3: Adding remote and pushing..."
git remote add origin https://github.com/$GITHUB_USER/theraspace.git
git branch -M main
git push -u origin main

echo ""
echo "=== Done! ==="
echo "Your repo is now live at: https://github.com/$GITHUB_USER/theraspace"
