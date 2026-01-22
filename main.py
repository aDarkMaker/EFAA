import os
import threading
import webview
import uvicorn
import socket

DEV_URL = "http://localhost:5173"

server = None
server_thread = None
windows = None
current_port = None

def pick_free_port(host="127.0.0.1"):
    s = socket.socket()
    s.bind((host, 0))
    port = s.getsockname()[1]
    s.close()
    return port

def start_api_server():
    global server, current_port
    from backend.main import app
    current_port = pick_free_port()
    config = uvicorn.Config(app, host="127.0.0.1", port=current_port, log_level="info")
    server = uvicorn.Server(config)
    server.run()

def stop_everything_and_exit():
    if server is not None:
        server.should_exit = True

    if server_thread is not None:
        server_thread.join(timeout=5)

    os._exit(0)

class Api:
    def close_window(self):
        if windows is not None:
            windows.destroy()

    def get_api_port(self):
        return current_port

if __name__ == "__main__":
    server_thread = threading.Thread(target=start_api_server, daemon=True)
    server_thread.start()

    icon_path = os.path.join(os.path.dirname(__file__), "public", "icon_black.png")

    api = Api()
    windows = webview.create_window(
        "EFAA",
        DEV_URL,
        width=1200,
        height=800,
        frameless=True,
        js_api=api,
        resizable=False,
    )

    windows.events.closed += lambda: stop_everything_and_exit()

    webview.start(debug=True, icon=icon_path)