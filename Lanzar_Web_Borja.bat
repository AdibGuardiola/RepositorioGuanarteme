@echo off
chcp 65001 >nul
cd /d "c:\Users\Victus\Desktop\Borja\leandro-perdomo-portal"

echo ===================================================
echo 🚀 INICIANDO PORTAL WEB (Modo Producción)
echo ===================================================
echo.
echo Esta ventana debe permanecer abierta.
echo Si la cierras, la web dejará de funcionar.
echo.
echo Iniciando servidor...
echo.

:: Intenta iniciar en modo producción (optimizado)
call npm start

if %errorlevel% neq 0 (
    echo.
    echo ❌ Algo falló al iniciar. Intentando modo desarrollo...
    call npm run dev
)

pause
