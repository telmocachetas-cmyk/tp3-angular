#!/bin/bash

echo ""
echo "==================================="
echo "Portfolio Tracker - Setup Script"
echo "==================================="
echo ""

echo "[1/5] Installing Backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies"
    exit 1
fi

echo ""
echo "[2/5] Seeding database with sample data..."
node seed.js
if [ $? -ne 0 ]; then
    echo "Warning: Error seeding database. Make sure MongoDB is running."
fi

echo ""
cd ..

echo "[3/5] Installing Frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "==================================="
echo "Setup Complete!"
echo "==================================="
echo ""
echo "To start the application:"
echo ""
echo "1. Open two terminal windows"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm start"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "The application will open at http://localhost:4200"
echo ""
