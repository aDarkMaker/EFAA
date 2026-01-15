import subprocess
import time

def click(x, y, duration=0.2, device_id=None):

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