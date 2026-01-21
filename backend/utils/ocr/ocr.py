import subprocess
import cv2
import numpy as np
from rapidocr_onnxruntime import RapidOCR

ocr_engine = RapidOCR()

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

def get_precise_box(box, text, target_text):
    line_x1, line_y1 = box[0][0], box[0][1]
    line_x2, line_y2 = box[2][0], box[2][1]
    
    padding_fix = (line_x2 - line_x1) * 0.035
    line_x1_real = line_x1 + padding_fix
    line_x2_real = line_x2 - padding_fix
    line_width = line_x2_real - line_x1_real

    def get_precise_w(c):
        if ord(c) > 127: return 1.0
        if c in 'ijlI1!|.,:; ': return 0.25
        if c in 'mwMW@': return 0.75
        return 0.5

    weights = [get_precise_w(c) for c in text]
    total_weight = sum(weights)
    pixel_unit = line_width / total_weight

    start_idx = text.find(target_text)
    end_idx = start_idx + len(target_text)

    prefix_weight = sum(weights[:start_idx])
    precise_x1 = line_x1_real + (prefix_weight * pixel_unit)
    
    target_weight = sum(weights[start_idx:end_idx])
    precise_x2 = precise_x1 + (target_weight * pixel_unit)

    return [int(precise_x1), int(line_y1), int(precise_x2), int(line_y2)]

def find_text_in_image(img, target_text):
    results, _ = ocr_engine(img)
    if not results: return None

    for res in results:
        box, text, score = res
        if target_text in text:
            return get_precise_box(box, text, target_text)
    return None

def find_all_text_in_image(img, target_text):
    results, _ = ocr_engine(img)
    if not results: return []

    found_boxes = []
    for res in results:
        box, text, score = res
        if target_text in text:
            found_boxes.append(get_precise_box(box, text, target_text))
    return found_boxes

def ocr(target_text, device=None):
    img = get_screenshot(device)
    if img is None:
        print("[OCR Error] Failed to get screenshot")
        return None
    return find_text_in_image(img, target_text)

def ocr_all(target_text, device=None):
    img = get_screenshot(device)
    if img is None:
        print("[OCR Error] Failed to get screenshot")
        return []
    return find_all_text_in_image(img, target_text)

def get_ocr_result(device=None, img=None):
    if img is None:
        img = get_screenshot(device)
    if img is None:
        return []
    results, _ = ocr_engine(img)
    return results or []