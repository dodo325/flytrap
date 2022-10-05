import json
from collections.abc import Mapping
from copy import deepcopy

from . import configs


def nested_update(d, u):
    for k, v in u.items():
        if isinstance(v, Mapping):
            d[k] = nested_update(d.get(k, {}), v)
        else:
            d[k] = v
    return d


SESSION_DIR = configs.USER_SESSION_DIR

# Импровизированная база данных
_stack = dict()


class SessionBD:
    def _init_file(self):
        if not SESSION_DIR.is_dir():
            SESSION_DIR.mkdir()
        self._file = SESSION_DIR / f"{self._session_id}.json"
        if not self._file.exists():
            self.write({})

    def __init__(self, session_id: str):
        self._session_id = session_id
        self._init_file()

    def update(self, data: dict):
        d = self.get()
        nested_update(d, data)
        self.set(d)

    def set(self, data):
        global _stack
        # Никакой грязной записи!
        # Мы сохраняем только полную последнюю копию из оперативной памяти,
        # Что означает, что сессия не должна жить долго. Это нам подходит, так как сессии по идеи одноразовые
        _stack[self._session_id] = deepcopy(data)
        self.write(data)

    def write(self, data):
        with open(self._file, "w") as sf:
            json.dump(data, sf, ensure_ascii=False, sort_keys=True, indent=4)

    def get(self) -> dict:
        global _stack
        return deepcopy(_stack.get(self._session_id, dict()))

    def read(self) -> dict:
        data = dict()
        with self._file.open("r") as sf:
            data = json.load(sf)
        return data
