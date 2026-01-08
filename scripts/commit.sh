#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${YELLOW}正在重置暂存区...${NC}"
git reset > /dev/null 2>&1

files=$(git status --short -uall | sed 's/^...//')

if [ -z "$files" ]; then
    echo -e "${GREEN}没有发现任何变动。${NC}"
    exit 0
fi

echo -e "${BLUE}发现文件变动，开始逐一处理...${NC}"

IFS=$'\n' read -rd '' -a file_array <<<"$files"

for file in "${file_array[@]}"; do
    if [ -z "$(git status --short "$file")" ]; then
        continue
    fi

    echo -e "\n${CYAN}--------------------------------${NC}"
    echo -e "${MAGENTA}文件路径: $file${NC}"

    echo "如何处理此变动?"
    options=("提交此文件" "提交同级目录" "跳过" "退出程序")
    
    PS3="选择操作 (1-4): "
    select opt in "${options[@]}"; do
        case $REPLY in
            1) action="file"; break ;;
            2) action="dir"; break ;;
            3) action="skip"; break ;;
            4) exit 0 ;;
            *) echo -e "${RED}无效选择${NC}" ;;
        esac
    done

    if [ "$action" == "skip" ]; then continue; fi

    echo -e "\n选择模块类型:"
    types=("后端引擎" "前端开发" "视觉算法" "业务任务" "资源配置" "文档更新" "故障修复")
    
    PS3="选择类型 (1-7): "
    select t in "${types[@]}"; do
        if [ -n "$t" ]; then
            module=$t
            break
        else
            echo -e "${RED}无效选择${NC}"
        fi
    done

    read -p "输入提交描述: " description
    while [ -z "$description" ]; do
        echo -e "${RED}描述不能为空，请重新输入!${NC}"
        read -p "输入提交描述: " description
    done

    commit_msg="[$module] $description"

    if [ "$action" == "file" ]; then
        git add "$file"
        git commit -m "$commit_msg"
    else
        dir=$(dirname "$file")
        git add "$dir"
        git commit -m "$commit_msg"
    fi
done

echo -e "\n${BLUE}所有变动处理完毕。${NC}"
read -p "是否推送到远程仓库? (y/n): " push
if [[ $push =~ ^[Yy]$ ]]; then
    git push
    echo -e "${GREEN}推送成功!${NC}"
fi
