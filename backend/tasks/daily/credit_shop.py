import os
import sys
import time
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from utils.click.click import click_text, click
from utils.ocr.ocr import ocr_all, ocr
from utils.keyboard.keyboard import keyevent

def refresh(device_id="127.0.0.1:7555"): # 刷新
    if click_text("立即刷新", device_id=device_id):
        time.sleep(2)

        result = ocr_all("确认", device=device_id)
        if result:
            result.sort(key=lambda r: r[1])
            target = result[-1]

            cx = (target[0] + target[2]) // 2
            cy = (target[1] + target[3]) // 2

            click(cx, cy, device_id=device_id)

def get_items(device_id="127.0.0.1:7555"): # 获取当前页面的商品

    region = (0, 0, 1920, 1080) # 目前为占位
    
    from utils.ocr.ocr import get_screenshot, get_ocr_result
    img = get_screenshot(device_id)
    if img is None: return []
    
    crop_img = img[region[1]:region[3], region[0]:region[2]]
    raw_results = get_ocr_result(img=crop_img)
    if not raw_results: return []

    def to_rect(box):
        return [
            int(box[0][0]) + region[0], int(box[0][1]) + region[1],
            int(box[2][0]) + region[0], int(box[2][1]) + region[1]
        ]

    anchors = []
    other_elements = []
    for res in raw_results:
        box, text = res
        rect = to_rect(box)
        is_system_text = any(k in text for k in ["信用", "刷新", "售罄", "交易所", "确定", "取消"])
        is_value = text.isdigit() or "%" in text or "×" in text or "x" in text
        
        if not is_system_text and not is_value and len(text) > 1:
            anchors.append({"name": text, "rect": rect, "components": []})
        else:
            other_elements.append({"text": text, "rect": rect})

    X_THRESHOLD = 130 
    Y_UP_THRESHOLD = 300 

    for element in other_elements:
        er = element["rect"]
        best_anchor = None
        min_dist = float('inf')
        for anchor in anchors:
            ir = anchor["rect"]
            dx = abs((er[0] + er[2]) / 2 - (ir[0] + ir[2]) / 2)
            dy = ir[1] - er[3] 
            if dx < X_THRESHOLD and 0 <= dy < Y_UP_THRESHOLD:
                if dx + dy < min_dist:
                    min_dist = dx + dy
                    best_anchor = anchor
        if best_anchor:
            best_anchor["components"].append(element)

    final_items = []
    for item in anchors:
        comps = item["components"]
        
        is_sold_out = any("售罄" in c["text"] for c in comps)
        if is_sold_out:
            continue

        all_numbers = []
        for c in comps:
            if c["text"].isdigit():
                all_numbers.append({"val": c["text"], "y": c["rect"][1]})
        
        all_numbers.sort(key=lambda x: x["y"], reverse=True)
        
        price = "未知"
        if len(all_numbers) >= 2:
            price = all_numbers[1]["val"]
        elif len(all_numbers) == 1:
            price = all_numbers[0]["val"]
            
        if price != "未知":
            final_items.append({
                "name": item["name"],
                "price": int(price),
                "rect": item["rect"]
            })
            
    return final_items

def get_points(device_id="127.0.0.1:7555"): # 获取当前信用点

    region = (0, 0, 1920, 1080) # 目前为占位
    
    from utils.ocr.ocr import get_screenshot, get_ocr_result
    img = get_screenshot(device_id)
    if img is None: return 0
    
    crop_img = img[region[1]:region[3], region[0]:region[2]]
    results = get_ocr_result(img=crop_img)
    
    if not results: return 0

    for res in results:
        text = res[1].strip()
        if "/" in text:
            points = text.split("/")[0]
            if points.isdigit():
                return int(points)
        if text.isdigit():
            return int(text)
            
    return 0

def order_priority(item_name: str, device_id="127.0.0.1:7555"): # 指定物品
    current_points = get_points(device_id)
    current_items = get_items(device_id)
    
    print(f"[信用点购物] 策略: 优先购买 '{item_name}'，当前余额: {current_points}")

    for item in current_items:
        if item_name in item["name"]:
            if current_points >= item["price"]:

                rect = item["rect"]
                cx = (rect[0] + rect[2]) // 2
                cy = (rect[1] + rect[3]) // 2
                click(cx, cy, device_id=device_id)
                time.sleep(1)
                
                if click_text("确认购买", device_id=device_id):
                    time.sleep(2)

                    keyevent("space", device_id=device_id)
                    time.sleep(1)
                    
                    current_points -= item["price"]
                    print(f"[信用点购物] 购买成功，剩余余额: {current_points}")
 
    return current_points


def order_lowest(device_id="127.0.0.1:7555"): # 按折扣买
    current_points = get_points(device_id)
    current_items = get_items(device_id)
    
    print(f"[信用点购物] 策略: 折扣优先购买，当前余额: {current_points}")

    for item in current_items:
        if current_points >= item["price"]:
            
            rect = item["rect"]
            cx = (rect[0] + rect[2]) // 2
            cy = (rect[1] + rect[3]) // 2
            click(cx, cy, device_id=device_id)
            time.sleep(1)
            
            if click_text("确认购买", device_id=device_id):
                time.sleep(2)

                keyevent("space", device_id=device_id)
                time.sleep(1)
                
                current_points -= item["price"]
                print(f"[信用点购物] 购买成功，剩余余额: {current_points}")
 
    return current_points

def run_task(device_id="127.0.0.1:7555"):
    print("[信用点购物] 任务开始")
    
    strategy_path = os.path.join(BASE_DIR, "tasks", "shopping_strategy.json")
    try:
        with open(strategy_path, "r", encoding="utf-8") as f:
            strategy_config = json.load(f)
    except Exception as e:
        return

    selected_strategy = strategy_config.get("selected_strategy", "lowest_price")
    is_refresh_enabled = strategy_config.get("is_refresh", False)
    
    refreshed_count = 0
    while True:
        current_points = 0
        
        if selected_strategy == "priority_items":
            priority_config = strategy_config.get("strategies", {}).get("priority_items", {})
            target_items = priority_config.get("target_items", [])
            if not target_items:
                print("[信用点购物] 错误：请先指定购买物品")
                return
            
            for item_cfg in target_items:
                item_name = item_cfg.get("name")
                if item_name:
                    current_points = order_priority(item_name, device_id)
        else:
            current_points = order_lowest(device_id)

        if not is_refresh_enabled or refreshed_count >= 4: break;
            
        refresh_cost = 80 + (refreshed_count * 40)

        if current_points - refresh_cost > 120:
            refresh(device_id=device_id)
            refreshed_count += 1
            time.sleep(1)

        else: break;
    
    print("[信用点购物] 任务完成")

if __name__ == "__main__":
    run_task()
