import os
import json
import asyncio
import logging
import sys
from fastapi import FastAPI, HTTPException, BackgroundTasks, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

TASK_CONFIG = os.path.join(BASE_DIR, "tasks", "task.json")
SHOPPING_CONFIG = os.path.join(BASE_DIR, "tasks", "shopping_strategy.json")

# 统一响应格式处理
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"retcode": exc.status_code, "message": exc.detail},
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"retcode": 500, "message": f"服务器内部错误: {str(exc)}"},
    )

def success_response(data=None):
    return {"retcode": 0, "data": data}

@app.get("/api/tasks")
async def get_local_tasks():
    try:
        with open(TASK_CONFIG, "r", encoding="utf-8") as f:
            data = json.load(f)
            return success_response(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"读取本地配置失败: {str(e)}")

@app.post("/api/tasks/toggle")
async def toggle_task(task_id: str, enabled: bool):
    try:
        with open(TASK_CONFIG, "r", encoding="utf-8") as f:
            config = json.load(f)
        
        if task_id in config:
            config[task_id]["default"] = enabled
            with open(TASK_CONFIG, "w", encoding="utf-8") as f:
                json.dump(config, f, indent=4, ensure_ascii=False)
            return success_response({"status": "ok", "task": task_id, "enabled": enabled})
        
        raise HTTPException(status_code=404, detail="未找到该任务项目")
    except Exception as e:
        if isinstance(e, HTTPException): raise e
        raise HTTPException(status_code=500, detail=f"操作失败: {str(e)}")

@app.get("/api/settings/shopping")
async def get_shopping_settings():
    try:
        with open(SHOPPING_CONFIG, "r", encoding="utf-8") as f:
            data = json.load(f)
            return success_response(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"读取购物配置失败: {str(e)}")

@app.post("/api/settings/shopping/update")
async def save_shopping_settings(new_data: dict):
    try:
        with open(SHOPPING_CONFIG, "w", encoding="utf-8") as f:
            json.dump(new_data, f, indent=4, ensure_ascii=False)
        return success_response({"status": "success"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"保存失败: {str(e)}")

async def run_selected_tasks():
    try:
        with open(TASK_CONFIG, "r", encoding="utf-8") as f:
            config = json.load(f)
        
        for task_id, info in config.items():
            if info.get("default") is True:
                logging.info(f"开始本地任务: {info['name']}")
                try:
                    if task_id == "run":
                        from tasks.run.run import run_task
                        run_task()
                    elif task_id == "tijiang":
                        from tasks.daily.tijiang import run_tijiang_task
                        run_tijiang_task()
                    elif task_id == "credit_points":
                        from tasks.daily.credit_points import run_task
                        run_task()

                    await asyncio.sleep(1)
                except Exception as e:
                    logging.error(f"任务 {task_id} 执行失败: {str(e)}")
    except Exception as e:
        logging.error(f"后台任务调度失败: {str(e)}")

@app.post("/api/execute")
async def start_automation(background_tasks: BackgroundTasks):
    background_tasks.add_task(run_selected_tasks)
    return success_response({"status": "running", "message": "已执行"})
