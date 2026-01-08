import webview  # pyright: ignore[reportMissingImports]
import threading
import os

DEV_URL = "http://localhost:3000"

if __name__ == "__main__":

    windows = webview.create_window(
        "EFAA",
        DEV_URL,
        width=1200,
        height=800
    )

    webview.start(debug=True)