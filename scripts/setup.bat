@echo off
REM Tech Line Website - Quick Start Script for Windows

echo.
echo 🚀 Tech Line Website - Quick Start
echo ==================================
echo.

REM Check if Node.js is installed
node --version > nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18 or higher.
    exit /b 1
)

echo ✓ Node.js version:
node --version

echo ✓ npm version:
npm --version
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo ✓ Dependencies installed
echo.

REM Create .env.local if it doesn't exist
if not exist .env.local (
    echo 📝 Creating .env.local...
    copy .env.example .env.local > nul
    echo ✓ .env.local created (update with your settings)
) else (
    echo ✓ .env.local already exists
)

echo.
echo ✨ Setup complete!
echo.
echo Next steps:
echo   1. Update .env.local with your settings
echo   2. Update brand assets in public/ folder
echo   3. Update content in src/data/ files
echo   4. Run: npm run dev
echo.
echo For more info, see README.md
