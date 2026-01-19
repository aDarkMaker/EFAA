import subprocess

def keyevent(code, device_id=None):
    cmd = ["adb"]
    if device_id:
        cmd.extend(["-s", device_id])

    key_map = {
        "space": 62,
        "esc": 111,
        "back": 4,
        "enter": 66
    }
    
    if isinstance(code, str):
        code = key_map.get(code.lower(), code)
        
    cmd.extend(["shell", "input", "keyevent", str(code)])
    
    try:
        subprocess.run(cmd, capture_output=True, check=True)
        return True
    except Exception:
        return False
