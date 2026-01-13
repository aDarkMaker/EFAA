# 开发说明

## 提交代码

```bash
node ./scripts/commit.js
```

## 环境配置

```bash
# Python
uv venv .venv

# Windows
.venv\Scripts\activate

# Mac
bash .venv/source/activate.sh

uv pip install -r requirements.txt

```

## TodoList

### 前端部分：

1. 所有交互界面的开发
2. 为后续图标接入预留修改空间
3. 完成 i18n 的适配

### 功能部分：

1. 实现基础的游戏内容识别
2. 完成基本的战斗流程逻辑
3. 实现自动刷珠子的功能
4. 实现咨询功能接入
