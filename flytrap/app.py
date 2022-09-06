from flask import Flask, request, render_template, Response
from rich import print
import uuid
import json
from pathlib import Path
from collections.abc import Mapping
import datetime

BASE_DIR = Path(__file__).absolute().parent.parent
SESSION_DIR = BASE_DIR / "session"

app = Flask(
    __name__,
    template_folder="./templates",
    static_folder="./static"
)

def nested_update(d, u):
    for k, v in u.items():
        if isinstance(v, Mapping):
            d[k] = nested_update(d.get(k, {}), v)
        else:
            d[k] = v
    return d


# Не работает!
class SessionBD:

    def _init_file(self):
        if not SESSION_DIR.is_dir():
            SESSION_DIR.mkdir()
        self._file = SESSION_DIR / f"{self._session_id}.json"
        if not self._file.exists():
            self.set({})

    def __init__(self, session_id: str):
        self._session_id = session_id
        self._init_file()

    def update(self, data: dict):
        d = self.get()
        nested_update(d, data)
        self.set(d)

    def set(self, data):
        with open(self._file, "w") as sf:
            json.dump(
                data,
                sf,
                ensure_ascii=False,
                sort_keys=True,
                indent=4
            )

    def get(self) -> dict:
        data = dict()
        with self._file.open("r") as sf:
            data = json.load(sf)
        return data

def gen_session_id() -> str:
    return str(uuid.uuid4()).replace("-", "")


def get_request_data():
    return {
        "method": request.method,
        "remote_addr": request.remote_addr,
        "path": request.path,
        "headers": dict(request.headers),
        "cookies": dict(request.cookies),
        "datetime": datetime.datetime.now().isoformat()
        # "accept_languages": dict(request.accept_languages)
    }

@app.route("/")
def base_view():
    context = {}
    print("BASE_DIR = ", BASE_DIR)

    url = "https://gitlab.com/moneyhand2/moneyhand-react-web"
    session_id = gen_session_id()
    print("session_id = ", session_id)
    db = SessionBD(session_id)

    db.update(get_request_data())
    # print("  ## request.environ = ")
    # print(request.environ)

    context["url"] = url
    context["session_id"] = session_id
    return render_template("redirect.html", context=context)


@app.route("/update", methods=["PATCH"])
def update_view():
    session_id = request.args.get("id")
    if session_id is None:
        return Response(status=400)
    data = request.get_json()
    print("session_id = ", session_id)
    print("session_id = ", data)

    # print("data = ", data)
    # db = SessionBD(session_id)
    # db.update(data)

    return Response(status=200)
