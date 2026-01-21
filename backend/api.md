# 后端 API 接口文档

本文档描述了 EFAA 后端提供的本地 API 接口，供前端调用。所有接口默认基础路径为 `http://127.0.0.1:8000`。

---

## 1. 任务管理 (Task Management)

### 1.1 获取本地任务列表
*   **路由**: `GET /api/tasks`
*   **功能**: 读取 `backend/tasks/task.json`，返回所有任务的配置及启用状态。
*   **返回参数**: 
    *   `JSON Object`: 键为任务 ID，值为包含 `name` 和 `default` (启用状态) 的对象。

### 1.2 切换任务启用状态
*   **路由**: `POST /api/tasks/toggle`
*   **功能**: 修改指定任务的启用/禁用状态，并持久化到 `task.json`。
*   **请求参数 (Query)**:
    *   `task_id` (string): 任务的唯一标识符（如 `run`, `tijiang` 等）。
    *   `enabled` (boolean): `true` 为启用，`false` 为禁用。
*   **返回参数**: 
    *   `status`: `"ok"`
    *   `task`: 任务 ID
    *   `enabled`: 当前状态

---

## 2. 策略配置 (Settings)

### 2.1 获取购物策略配置
*   **路由**: `GET /api/settings/shopping`
*   **功能**: 读取 `backend/tasks/shopping_strategy.json`，返回当前的购物逻辑配置。
*   **返回参数**: 
    *   `JSON Object`: 包含 `selected_strategy` 和各个策略的详细参数。

### 2.2 更新购物策略配置
*   **路由**: `POST /api/settings/shopping/update`
*   **功能**: 接收新的 JSON 策略对象并覆写到 `shopping_strategy.json`。
*   **请求体 (Body)**:
    *   `new_data` (dict): 完整的策略配置 JSON 對象。
*   **返回参数**: 
    *   `status`: `"success"`

---

## 3. 自动化执行 (Automation)

### 3.1 启动自动执行队例
*   **路由**: `POST /api/execute`
*   **功能**: 按照 `task.json` 中配置的顺序，依次执行所有已启用的任务脚本。
*   **注意**: 此接口采用**异步后台任务**模式，调用后会立即返回启动成功的响应，实际脚本在后台运行。
*   **返回参数**: 
    *   `status`: `"running"`
    *   `message`: `"已启动"`

---
