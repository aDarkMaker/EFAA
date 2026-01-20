import webview  # pyright: ignore[reportMissingImports]
import threading
import os

DEV_URL = "http://localhost:5173"

class Api:
    def close_window(self):
        windows.destroy()

if __name__ == "__main__":
    api = Api()
    windows = webview.create_window(
        "EFAA",
        DEV_URL,
        width=1200,
        height=800,
        frameless=True,
        js_api=api,
        resizable=False
    )

    webview.start(debug=True)