import json
from pathlib import Path

PACKAGE_DIR = Path(__file__).resolve().parent

USER_DATA_DIR = Path.home() / ".flytrap"
USER_CONFIG_FILE = USER_DATA_DIR / "config.json"
USER_SESSION_DIR = USER_DATA_DIR / "sessions"


def init_user_configs_dir():
    USER_DATA_DIR.mkdir(exist_ok=True)
    USER_SESSION_DIR.mkdir(exist_ok=True)


def read_config_file() -> dict:
    with USER_CONFIG_FILE.open("r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return dict()


def write_config_file(data: dict):
    with USER_CONFIG_FILE.open("w") as f:
        json.dump(data, f, ensure_ascii=False, sort_keys=True, indent=4)
