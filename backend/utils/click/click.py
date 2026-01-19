import subprocess
import os
import json

def load_keyboard_mapping():
    config_path = os.path.join(os.path.dirname(__file__), "config.json")
    try:
        with open(config_path, "r", encoding="utf-8") as f:
            config = json.load(f)
            return config.get("keyboard_mapping", {})
    except Exception:
        return {}

def click(x_or_key, y=None, duration=0.2, device_id=None):
    if isinstance(x_or_key, str):
        mapping = load_keyboard_mapping()
        coord_str = mapping.get(x_or_key)
        if not coord_str:
            return False
        try:
            x, y = map(int, coord_str.split(','))
        except ValueError:
            return False
    else:
        x = x_or_key
    
    if x is None or y is None:
        return False

    cmd = ["adb"]
    if device_id:
        cmd.extend(["-s", device_id])
    
    duration_ms = int(duration * 1000)
    if duration_ms <= 0:
        cmd.extend(["shell", "input", "tap", str(x), str(y)])
    else:
        cmd.extend(["shell", "input", "swipe", str(x), str(y), str(x), str(y), str(duration_ms)])
    
    try:
        subprocess.run(cmd, capture_output=True, check=True)
        return True
    except Exception:
        return False

def click_text(target, duration=0.2, device_id=None, is_icon=False, threshold=0.7):
    if is_icon:
        from utils.ocr.ocr_icon import find_icon
        res_list = find_icon(target, threshold=threshold, device_id=device_id)
        res = res_list[0] if res_list else None
    else:
        from utils.ocr.ocr import ocr
        res = ocr(target, device=device_id)
    
    if res:
        cx = (res[0] + res[2]) // 2
        cy = (res[1] + res[3]) // 2
        print(f"[Click] Found {'icon' if is_icon else 'text'} '{target}' at ({cx}, {cy}), clicking...")
        return click(cx, cy, duration=duration, device_id=device_id)
    
    print(f"[Click] {'Icon' if is_icon else 'Text'} '{target}' not found")
    return False
