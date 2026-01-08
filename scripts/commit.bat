@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

echo 正在重置暂存区...
git reset >nul 2>&1

set "TEMP_FILES=%TEMP%\efaa_changes.txt"
git status --short -uall > "%TEMP_FILES%"

for /f "usebackq" %%A in ("%TEMP_FILES%") do (
    goto :start_process
)
echo 没有发现任何变动。
del "%TEMP_FILES%"
exit /b

:start_process
echo 发现文件变动，开始逐一处理...

for /f "tokens=1,2*" %%a in (%TEMP_FILES%) do (
    set "status=%%a"
    set "file=%%b"
    if not "%%c"=="" set "file=%%b %%c"

    git status --short "!file!" | findstr /r "^.." >nul
    if !errorlevel! equ 0 (
        echo.
        echo --------------------------------
        echo 文件路径: !file!
        
        echo [1] "提交此文件"
        echo [2] "提交同级目录"
        echo [3] "跳过"
        echo [4] "退出程序"
        set /p action="选择操作 (1-4): "

        if "!action!"=="4" goto :end
        if "!action!"=="3" goto :next_loop
        
        echo.
        echo 选择模块类型:
        echo [1] "后端引擎" [2] "前端开发" [3] "视觉算法"
        echo [4] "业务任务" [5] "资源配置" [6] "文档更新"
        echo [7] "故障修复"
        set /p type_idx="选择类型 (1-7): "

        if "!type_idx!"=="1" set "module=后端引擎"
        if "!type_idx!"=="2" set "module=前端开发"
        if "!type_idx!"=="3" set "module=视觉算法"
        if "!type_idx!"=="4" set "module=业务任务"
        if "!type_idx!"=="5" set "module=资源配置"
        if "!type_idx!"=="6" set "module=文档说明"
        if "!type_idx!"=="7" set "module=故障修复"

        set /p desc="输入提交描述: "
        if "!desc!"=="" set "desc=更新 !file!"

        set "msg=[!module!] !desc!"

        if "!action!"=="1" (
            git add "!file!"
            git commit -m "!msg!"
        ) else (
            for %%i in ("!file!") do set "dir=%%~dpi"
            git add "!dir!*"
            git commit -m "!msg!"
        )
    )
    :next_loop
    echo.
)

:end
set /p push="是否推送到远程仓库? (y/n): "
if /i "!push!"=="y" (
    git push
    echo 推送成功!
)

del "%TEMP_FILES%"
echo 处理完毕。
pause
