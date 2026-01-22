import os
import sys
import time
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from utils.connect.connect import connect_to_emulator
from utils.ocr.ocr import ocr, ocr_all
from utils.ocr.ocr_icon import find_icon, find_best_icon
from utils.click.click import click, click_text
from utils.keyboard.keyboard import keyevent

def click_center(box, device_id):
    if not box: return
    cx = (box[0] + box[2]) // 2
    cy = (box[1] + box[3]) // 2
    click(cx, cy, device_id=device_id)

def handle_manufacturing_cabin(device_id):

    res_collect = ocr("收取", device=device_id)
    if res_collect:
        click_center(res_collect, device_id)
        time.sleep(2)

        click(960, 675, device_id=device_id)

        time.sleep(2)
        
        max_icons = find_best_icon(["max", "max_2"], device_id=device_id)
        
        if max_icons:
            click_center(max_icons[:4], device_id)
            time.sleep(1)
            
        res_confirm = ocr("确认", device=device_id)
        if res_confirm:
            click_center(res_confirm, device_id)
            time.sleep(2)
            
        best_close = find_best_icon(["close", "close_2"], threshold=0.4, device_id=device_id)
        if best_close:
            click_center(best_close[:4], device_id)
            time.sleep(1)
    else:
        best_close = find_best_icon(["close", "close_2"], threshold=0.4, device_id=device_id)
        if best_close:
            click_center(best_close[:4], device_id)
            time.sleep(1)

def handle_cultivation_cabin(device_id):

    res_collect_all = ocr("全部收取", device=device_id)
    if res_collect_all:
        click_center(res_collect_all, device_id)
        time.sleep(1)
        
        keyevent("space", device_id=device_id)
        time.sleep(2)
        
        best_close = find_best_icon(["close", "close_2"], threshold=0.4, device_id=device_id)
        if best_close:
            click_center(best_close[:4], device_id)
            time.sleep(1)
    else:
        best_close = find_best_icon(["close", "close_2"], threshold=0.4, device_id=device_id)
        if best_close:
            click_center(best_close[:4], device_id)
            time.sleep(1)

def run_tijiang_task(device_id="127.0.0.1:7555"):
    print("[基建收菜] 任务开始")
    connect_to_emulator(device_id)

    tijiang_icons = find_best_icon(["Tijiang", "Tijiang_2"], threshold=0.7, device_id=device_id)
    
    if not tijiang_icons:
        config_path = os.path.join(BASE_DIR, "utils", "click", "config.json")
        try:
            with open(config_path, "r", encoding="utf-8") as f:
                config = json.load(f)
                map_coords = config.get("keyboard_mapping", {}).get("map")
                if map_coords:
                    mx, my = map(int, map_coords.split(","))
                    click(mx, my, device_id=device_id)
                    time.sleep(2)
                else:
                    return
        except Exception:
            return

        res = ocr("帝江号", device=device_id)
        if res:
            click_center(res, device_id)
            time.sleep(2)
        else:
            return

        portals = find_icon("portal", device_id=device_id, threshold=0.4)
        if portals:
            rightmost_portal = max(portals, key=lambda b: b[0])
            click_center(rightmost_portal, device_id)
            time.sleep(2)
        else:
            return

        teleport_buttons = ocr_all("传送", device=device_id)

        if teleport_buttons:
            teleport_buttons.sort(key=lambda b: b[3], reverse=True)
            bottom_teleport = teleport_buttons[0]
            click_center(bottom_teleport, device_id)
            time.sleep(20)
        else:
            return

        tijiang_icons = find_best_icon(["Tijiang", "Tijiang_2"], threshold=0.5, device_id=device_id)

    if tijiang_icons:
        click_center(tijiang_icons[:4], device_id)
        time.sleep(3)

        manufacturing_cabins = ocr_all("制造舱", device=device_id)
        if manufacturing_cabins:
            manufacturing_cabins.sort(key=lambda b: b[1], reverse=True)
            targets = manufacturing_cabins[:2]
            for cabin in targets:
                click_center(cabin, device_id)
                time.sleep(2)
                handle_manufacturing_cabin(device_id)
                time.sleep(1)

        cultivation_cabins = ocr_all("培养舱", device=device_id)
        if cultivation_cabins:
            cultivation_cabins.sort(key=lambda b: b[1], reverse=True)
            target = cultivation_cabins[0]
            click_center(target, device_id)
            time.sleep(2)
            handle_cultivation_cabin(device_id)
            time.sleep(1)

        best_close = find_best_icon(["close", "close_2"], threshold=0.4, device_id=device_id)
        if best_close:
            click_center(best_close[:4], device_id)
            time.sleep(1)
        
        print("[基建收菜] 任务完成")

    else:
        print("[基建收菜] 出了点错误")

if __name__ == "__main__":
    run_tijiang_task()
