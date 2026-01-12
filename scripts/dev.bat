@echo off
:: Run Pywebview & Frontend

echo "Start Frontend"
start /b bun run --cwd frontend dev

echo "Start Pywebview"
python main.py