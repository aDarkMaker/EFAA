# EFAA Backend 函数规范

约定一下函数规范

## 目录

- [通用约定](#通用约定)
- [1. 点击与视觉交互（`utils/click/click.py`）](#1-点击与视觉交互utilsclickclickpy)
  - [`click`](#click)
  - [`click_text`](#click_text)
- [2. OCR 文字识别（`utils/ocr/ocr.py`）](#2-ocr-文字识别utilsocrocrpy)
  - [`ocr`](#ocr)
- [3. 图标识别（`utils/ocr/ocr_icon.py`）](#3-图标识别utilsocrocr_iconpy)
  - [`find_icon`](#find_icon)
- [4. 键盘模拟（`utils/keyboard/keyboard.py`）](#4-键盘模拟utilskeyboardkeyboardpy)
  - [`keyevent`](#keyevent)

---

## 通用约定

- **ADB 依赖**：所有与设备交互的能力都依赖 `adb` 可执行文件可用（已加入 PATH）。
- **设备选择**：多数函数支持 `device_id`（或 `device`）参数；为空时使用默认连接设备。
- **坐标格式**：文档里的矩形框统一使用 `[x1, y1, x2, y2]`（左上、右下）。
- **返回值风格**：
  - 点击/键盘类函数返回 `bool`（成功 `True`，失败 `False`）。
  - OCR/图标定位返回坐标（找不到则 `None` 或 `[]`）。

---

## 1. 点击与视觉交互（`utils/click/click.py`）

### `click`

**用途**：执行一次 ADB 点击（短按或长按）。

**签名**：`click(x_or_key, y=None, duration=0.2, device_id=None) -> bool`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---:|---|
| `x_or_key` | `Union[int, str]` | - | 传 `int` 表示 X 坐标；传 `str` 表示从 `config.json` 的 `keyboard_mapping` 里取坐标（如 `"shop"`）。 |
| `y` | `Optional[int]` | `None` | Y 坐标；当 `x_or_key` 为键名时忽略。 |
| `duration` | `float` | `0.2` | 点击时长（秒）。`<= 0` 时使用 `tap`；否则用 `swipe` 模拟按压时长。 |
| `device_id` | `Optional[str]` | `None` | 目标设备 ID（等价于 `adb -s <device_id>`）。 |

**配置（`utils/click/config.json`）**：键名到坐标的映射，坐标以 `"x,y"` 字符串保存。

```json
{
  "keyboard_mapping": {
    "shop": "1361,48"
  }
}
```

**示例**：

```python
from utils.click.click import click

# 直接点坐标
click(100, 200)

# 点配置里的命名坐标
click("shop")

# 指定设备 + 长按 0.5s
click("Attack", duration=0.5, device_id="emulator-5554")
```

### `click_text`

**用途**：识别屏幕上的文字或图标，取其中心点并点击。

**签名**：`click_text(target, duration=0.2, device_id=None, is_icon=False, threshold=0.7) -> bool`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---:|---|
| `target` | `str` | - | 文字内容（`is_icon=False`）或图标名（`is_icon=True`，不带后缀）。 |
| `duration` | `float` | `0.2` | 点击时长（秒），同 `click`。 |
| `device_id` | `Optional[str]` | `None` | 目标设备 ID。 |
| `is_icon` | `bool` | `False` | `False` 使用 OCR 文本定位；`True` 使用图标模板匹配。 |
| `threshold` | `float` | `0.7` | 置信度阈值；图标模式下会传给 `find_icon`。 |

**返回**：找到并点击成功返回 `True`；未找到或点击失败返回 `False`。

**示例**：

```python
from utils.click.click import click_text

# 点击包含“设置”的文本（子串匹配）
click_text("设置")

# 点击 icons 目录里的 logout.(png/jpg/jpeg) 图标
click_text("logout", is_icon=True, threshold=0.9)
```

---

## 2. OCR 文字识别（`utils/ocr/ocr.py`）

### `ocr`

**用途**：对当前屏幕截图做 OCR，定位包含目标文本的区域。

**签名**：`ocr(target_text, device=None) -> list[int] | None`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---:|---|
| `target_text` | `str` | - | 目标文本（**子串匹配**：只要 `target_text in text` 即命中）。 |
| `device` | `Optional[str]` | `None` | 目标设备 ID（注意：此处参数名为 `device`）。 |

**返回**：找到返回 `[x1, y1, x2, y2]`；未找到返回 `None`。

**示例**：

```python
from utils.ocr.ocr import ocr

box = ocr("退出登录", device="emulator-5554")
print(box)  # e.g. [123, 456, 234, 488] 或 None
```

---

## 3. 图标识别（`utils/ocr/ocr_icon.py`）

### `find_icon`

**用途**：在当前屏幕中查找指定图标模板，返回所有匹配框。

**签名**：`find_icon(icon_name, threshold=0.9, device_id=None) -> list[list[int]]`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---:|---|
| `icon_name` | `str` | - | 图标文件名（不含后缀，如 `"logout"`）。 |
| `threshold` | `float` | `0.9` | 匹配阈值，越大越严格。 |
| `device_id` | `Optional[str]` | `None` | 目标设备 ID。 |

**资源存放**：`backend/utils/ocr/icons/`，支持 `.png` / `.jpg` / `.jpeg`（会按该顺序尝试）。

**返回**：返回 `[[x1, y1, x2, y2], ...]`，找不到或读取失败返回 `[]`。

**示例**：

```python
from utils.ocr.ocr_icon import find_icon

boxes = find_icon("settings", threshold=0.9)
if boxes:
    print("found:", boxes[0])
```

---

## 4. 键盘模拟（`utils/keyboard/keyboard.py`）

### `keyevent`

**用途**：发送 ADB 键盘事件（`adb shell input keyevent`）。

**签名**：`keyevent(code, device_id=None) -> bool`

| 参数 | 类型 | 默认值 | 说明 |
|---|---|---:|---|
| `code` | `Union[int, str]` | - | Keycode 数字，或常用别名：`"space"`, `"esc"`, `"back"`, `"enter"`（大小写不敏感）。 |
| `device_id` | `Optional[str]` | `None` | 目标设备 ID。 |

**示例**：

```python
from utils.keyboard.keyboard import keyevent

keyevent("back")
keyevent("enter", device_id="emulator-5554")
keyevent(62)  # space
```
