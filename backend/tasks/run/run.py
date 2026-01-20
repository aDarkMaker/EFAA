import os
import sys
import time

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from utils.connect.connect import connect_to_emulator, start_package
from utils.ocr.ocr import ocr
from utils.click.click import click

def run_task(device_id="127.0.0.1:7555"):

    connect_to_emulator(device_id)
    
    package_name = "com.hypergryph.endfield"
    start_package(package_name, device_id=device_id)

    time.sleep(5)
    
    target_text = "点击任意位置继续"
    while True:
        res = ocr(target_text, device=device_id)
        if res:
            cx = (res[0] + res[2]) // 2
            cy = (res[1] + res[3]) // 2
            click(cx, cy, device_id=device_id)
            break
        
        time.sleep(2)

    print("[一键唤醒] 任务完成")

if __name__ == "__main__":
    run_task()
