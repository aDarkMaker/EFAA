import os
import sys
import time

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from utils.click.click import click, click_text
from utils.keyboard.keyboard import keyevent

def run_task(device_id="127.0.0.1:7555"):
    print("[领取商城信用点] 任务开始")
    
    if click("shop", device_id=device_id):
        time.sleep(0.2)
    
    if click_text("信用交易所", device_id=device_id):
        time.sleep(0.2)
    
    if click_text("收取信用", device_id=device_id):
        time.sleep(0.2)

        keyevent("space", device_id=device_id)
        time.sleep(0.2)

        task_config_path = os.path.join(BASE_DIR, "tasks", "task.json")
        try:
            import json
            with open(task_config_path, "r", encoding="utf-8") as f:
                task_config = json.load(f)
                if task_config.get("credit_shop", {}).get("default", False):
                    from tasks.daily.credit_shop import run_task as run_shop_task
                    run_shop_task(device_id=device_id)
        except Exception as e:
            return False
        
        time.sleep(2)

        keyevent("esc", device_id=device_id)

        print("[领取商城信用点] 任务完成")

    else:
        print("[领取商城信用点] 出了点错误")

if __name__ == "__main__":
    run_task()
