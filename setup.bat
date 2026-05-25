@echo off
echo.
echo ===================================
echo Portfolio Tracker - Setup Script
echo ===================================
echo.

echo [1/5] Instalando dependências do Backend...
cd backend
call npm install
if errorlevel 1 (
    echo Erro ao instalar dependências do backend
    exit /b 1
)

echo.
echo [2/5] Populando base de dados com dados de exemplo...
call node seed.js
if errorlevel 1 (
    echo Aviso: Erro ao popular a base de dados. Certifique-se de que MongoDB está a correr.
)

echo.
cd ..

echo [3/5] Instalando dependências do Frontend...
cd frontend
call npm install
if errorlevel 1 (
    echo Erro ao instalar dependências do frontend
    exit /b 1
)

cd ..

echo.
echo ===================================
echo Setup Completo!
echo ===================================
echo.
echo Para iniciar:
echo.
echo 1. Abra duas janelas de terminal
echo.
echo Terminal 1 - Backend:
echo   cd backend
echo   npm start
echo.
echo Terminal 2 - Frontend:
echo   cd frontend
echo   npm start
echo.
echo A aplicação será aberta em http://localhost:4200
echo.
