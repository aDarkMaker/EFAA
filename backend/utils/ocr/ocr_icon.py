import subprocess
import cv2
import numpy as np
import os

ICON_DIR = os.path.join(os.path.dirname(__file__), "icons")

def get_screenshot(device_id=None):
    adb_cmd = ["adb"]
    if device_id:
        adb_cmd.extend(["-s", device_id])
    adb_cmd.extend(["exec-out", "screencap -p"])
    
    process = subprocess.Popen(adb_cmd, stdout=subprocess.PIPE)
    stdout, _ = process.communicate()
    
    if not stdout:
        return None
        
    nparr = np.frombuffer(stdout, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

def find_all_images_in_image(img, template_path, threshold=0.7):
    template = cv2.imread(template_path)
    if template is None or img is None:
        return []
    
    img_h, img_w = img.shape[:2]
    tpl_h, tpl_w = template.shape[:2]

    if tpl_h > img_h or tpl_w > img_w:
        return []

    res = cv2.matchTemplate(img, template, cv2.TM_CCOEFF_NORMED)
    final_results = []
    res_copy = res.copy()

    while True:
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res_copy)

        if max_val < threshold:
            break

        start_x, start_y = max_loc
        end_x = start_x + tpl_w
        end_y = start_y + tpl_h
        
        final_results.append([int(start_x), int(start_y), int(end_x), int(end_y), float(max_val)])
        
        mask_w_offset = tpl_w // 3
        mask_h_offset = tpl_h // 3

        mask_x1 = max(0, start_x - mask_w_offset)
        mask_y1 = max(0, start_y - mask_h_offset)
        mask_x2 = min(res_copy.shape[1], start_x + mask_w_offset)
        mask_y2 = min(res_copy.shape[0], start_y + mask_h_offset)
        
        res_copy[mask_y1:mask_y2, mask_x1:mask_x2] = 0

    return final_results

def find_icon(icon_name, threshold=0.7, device_id=None):
    results = find_icon_with_score(icon_name, threshold, device_id)
    return [r[:4] for r in results]

def find_icon_with_score(icon_name, threshold=0.7, device_id=None):
    for ext in [".png", ".jpg", ".jpeg"]:
        template_path = os.path.join(ICON_DIR, icon_name + ext)
        if os.path.exists(template_path):
            img = get_screenshot(device_id)
            if img is None:
                return []
            return find_all_images_in_image(img, template_path, threshold)
    
    print(f"[OCR Error] Icon '{icon_name}' not found")
    return []

def find_best_icon(icon_names, threshold=0.5, device_id=None):
    img = get_screenshot(device_id)
    if img is None: return None
    
    best_res = None
    
    for name in icon_names:
        for ext in [".png", ".jpg", ".jpeg"]:
            path = os.path.join(ICON_DIR, name + ext)
            if os.path.exists(path):
                results = find_all_images_in_image(img, path, threshold)
                if results:
                    current_best = max(results, key=lambda r: r[4])
                    if best_res is None or current_best[4] > best_res[4]:
                        best_res = current_best
                break
    
    if best_res:
        print(f"[Debug] Best match icon found with score: {best_res[4]:.4f}")
    return best_res
