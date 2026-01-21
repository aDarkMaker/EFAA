import os
import json
import asyncio
import logging
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TASK_CONFIG = os.path.join(BASE_DIR, "tasks", "task.json")
SHOPPING_CONFIG = os.path.join(BASE_DIR, "tasks", "shopping_strategy.json")

@app.get("/api/tasks")
async def get_local_tasks():
    try:
        with open(TASK_CONFIG, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"读取本地配置失败: {str(e)}")

@app.post("/api/tasks/toggle")
async def toggle_task(task_id: str, enabled: bool):
    with open(TASK_CONFIG, "r", encoding="utf-8") as f:
        config = json.load(f)
    
    if task_id in config:
        config[task_id]["default"] = enabled
        with open(TASK_CONFIG, "w", encoding="utf-8") as f:
            json.dump(config, f, indent=4, ensure_ascii=False)
        return {"status": "ok", "task": task_id, "enabled": enabled}
    raise HTTPException(status_code=404, detail="未找到该任务项目")

@app.get("/api/settings/shopping")
async def get_shopping_settings():
    with open(SHOPPING_CONFIG, "r", encoding="utf-8") as f:
        return json.load(f)

@app.post("/api/settings/shopping/update")
async def save_shopping_settings(new_data: dict):
    try:
        with open(SHOPPING_CONFIG, "w", encoding="utf-8") as f:
            json.dump(new_data, f, indent=4, ensure_ascii=False)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"保存失败: {str(e)}")

async def run_selected_tasks():
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

@app.post("/api/execute")
async def start_automation(background_tasks: BackgroundTasks):
    background_tasks.add_task(run_selected_tasks)
    return {"status": "running", "message": "已执行"}