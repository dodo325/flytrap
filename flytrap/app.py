from flask import Flask, request, render_template, Response
from rich import print
import uuid
import datetime
import os
from .sessions import SessionBD


TARGET_URL = os.environ.get("TARGET_URL", "http://example.com")

app = Flask(
    __name__,
    template_folder="./templates",
    static_folder="./static"
)


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

    session_id = gen_session_id()
    print("session_id = ", session_id)
    db = SessionBD(session_id)

    db.update(get_request_data())

    context["url"] = TARGET_URL
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
    db = SessionBD(session_id)
    db.update(data)

    return Response(status=200)
