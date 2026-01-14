import subprocess
import logging

logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)

def run_adb_command(args, device_id=None):
    cmd = ["adb"]
    if device_id:
        cmd.extend(["-s", device_id])
    cmd.extend(args)
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True, encoding='utf-8')
        return result.stdout.strip()
    except UnicodeDecodeError:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True, encoding='gbk')
        return result.stdout.strip()
    except Exception:
        return None

def get_devices():
    output = run_adb_command(["devices"])
    if not output:
        return []
    
    devices = []
    for line in output.splitlines()[1:]:
        if line.strip():
            parts = line.split()
            if len(parts) >= 2 and parts[1] == "device":
                devices.append(parts[0])
    return devices

def connect_to_emulator(address="127.0.0.1:5555"):
    output = run_adb_command(["connect", address])
    return output and ("connected to" in output or "already connected" in output)

def start_package(package_name, device_id=None):
    result = run_adb_command(["shell", "monkey", "-p", package_name, "-c", "android.intent.category.LAUNCHER", "1"], device_id)
    if result is not None:
        return True
    
    output = run_adb_command(["shell", "pm", "dump", package_name], device_id)
    if output:
        import re
        match = re.search(r'android.intent.action.MAIN.*?([^\s]+/[^\s]+)', output)
        if match:
            activity = match.group(1)
            result = run_adb_command(["shell", "am", "start", "-n", activity], device_id)
            return result is not None
    return False

if __name__ == "__main__":
    if connect_to_emulator("127.0.0.1:7555"):
        devices = get_devices()
        if devices:
            start_package("com.hypergryph.endfield", devices[0])