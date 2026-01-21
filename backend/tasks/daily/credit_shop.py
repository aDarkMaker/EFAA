import os
import sys
import time

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from utils.click.click import click_text, click
from utils.ocr.ocr import ocr_all

def refresh(): # 刷新，不具备判断（是否可以刷新，是否刷新成功）能力
    if click_text("立即刷新"):
        time.sleep(2)

        result = ocr_all("确认")
        if result:
            
            result.sort(key=lambda r: r[1])
            target = result[-1]

            cx = (target[0] + target[2]) // 2
            cy = (target[1] + target[3]) // 2

            click(cx, cy)

def get_items(): # 获取当前页面的商品

def get_points(): # 获取当前信用点

def order_priority(): # 根据指定物品策略 / 商品 / 信用点余额生成购买序列

def order_lowest(): # 根据最高折扣策略 / 商品 / 信用点余额生成购买序列

def run_task(device_id="127.0.0.1:7555"):
    print("[信用点购物] 任务开始")
    
    # 稍后在此实现具体策略逻辑
    # 1. 读取 shopping_strategy.json 确定策略
    # 2. 识别商品
    # 3. 执行购买
    
    time.sleep(1)
    print("[信用点购物] 任务完成")

if __name__ == "__main__":
    run_task()
