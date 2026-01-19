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

def find_text_in_image(img, target_text):
    results, _ = ocr_engine(img)
    if not results: return None

    for res in results:
        box, text, score = res
        print(f"[OCR Debug] Text: '{text}' | Score: {score:.2f} | Box: {box}")
        
        if target_text in text:
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
    return None

def ocr(target_text, device=None):
    img = get_screenshot(device)
    if img is None:
        print("[OCR Error] Failed to get screenshot")
        return None
    return find_text_in_image(img, target_text)

def test_local_image(image_path, text_to_find):
    img = cv2.imread(image_path)
    result = find_text_in_image(img, text_to_find)
    print(f"Finding: '{text_to_find}': {result}")

    if result:
        cv2.rectangle(img, (int(result[0]), int(result[1])), (int(result[2]), int(result[3])), (0, 0, 255), 2)
        cv2.namedWindow("OCR_Test", cv2.WINDOW_NORMAL)
        cv2.imshow("OCR_Test", img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

if __name__ == "__main__":
    test_local_image("test.png", "登录")
