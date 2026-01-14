import subprocess
import time

def click(x, y, duration=0.2, device_id=None):
    """
    模拟点击
    :param x: X 坐标
    :param y: Y 坐标
    :param duration: 点击持续时间（秒），默认 0.2
    :param device_id: 设备 ID (可选)
    :return: 是否成功
    """
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