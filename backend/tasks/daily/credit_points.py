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

        keyevent("esc", device_id=device_id)

        print("[领取商城信用点] 任务完成")

    else:
        print("[领取商城信用点] 出了点错误")

if __name__ == "__main__":
    run_task()
