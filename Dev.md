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

# Frontend
cd frontend
bun install
```

## 运行项目

```bash
# 开发模式
bun --cwd frontend dev
python main.py
```
