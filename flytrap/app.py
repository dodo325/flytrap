import datetime
import os
import uuid
from typing import Optional

from flask import Flask, Response, render_template, request
from rich import print

from .sessions import SessionBD


def gen_session_id() -> str:
    return str(uuid.uuid4()).replace("-", "")


def get_request_data():
    return {
        "method": request.method,
        "remote_addr": request.remote_addr,
        "path": request.path,
        "headers": dict(request.headers),
        "cookies": dict(request.cookies),
        "datetime": datetime.datetime.now().isoformat(),
    }


def init_routes(app: Flask):
    @app.route("/")
    def base_view():
        context = {}

        session_id = gen_session_id()
        print("New session_id = ", session_id)
        db = SessionBD(session_id)

        db.update(get_request_data())

        context["url"] = app.config["TARGET_URL"]
        context["session_id"] = session_id
        context["speed_test"] = app.config["SPEED_TEST"]

        return render_template("redirect.html", context=context)

    @app.route("/update", methods=["PATCH"])
    def update_view():
        session_id = request.args.get("id")
        if session_id is None:
            return Response(status=400)
        data = request.get_json()
        print("Update data for session_id =", session_id)
        # print("session_id = ", data)

        # print("data = ", data)
        db = SessionBD(session_id)
        db.update(data)

        return Response(status=200)


def setup_bitly(app):
    if not app.config["USE_BITLY"]:
        return
    from . import short_url

    s = short_url.BitlyShortener(app.config["BITLY_TOKEN"])
    public_url = s.short(app.config["BASE_URL"])
    print(f" * bitly.com rederect \"{public_url}\" -> \"{app.config['BASE_URL']}\"")
    app.config["BASE_URL"] = public_url


def setup_ngrok(app):
    if not app.config["USE_NGROK"]:
        return
    from pyngrok import ngrok

    if app.config["NGROK_TOKEN"]:
        ngrok.set_auth_token(app.config["NGROK_TOKEN"])

    public_url = ngrok.connect(app.config["PORT"]).public_url

    print(f" * ngrok tunnel \"{public_url}\" -> \"{app.config['BASE_URL']}\"")

    # Update any base URLs or webhooks to use the public ngrok URL
    app.config["BASE_URL"] = public_url

    setup_bitly(app)


def create_app(
    target_url: Optional[str] = None,
    port=8080,
    use_ngrok=False,
    use_bitly=False,
    speed_test=True,
    ngrok_token: Optional[str] = None,
    bitly_token: Optional[str] = None,
    template_folder="./templates",
    static_folder="./static",
):
    app = Flask(__name__, template_folder=template_folder, static_folder=static_folder)
    app.config["TARGET_URL"] = target_url or os.environ.get("TARGET_URL")
    app.config["BASE_URL"] = f"http://localhost:{port}"
    app.config["USE_NGROK"] = use_ngrok
    app.config["USE_BITLY"] = use_bitly
    app.config["PORT"] = port

    app.config["NGROK_TOKEN"] = ngrok_token
    app.config["BITLY_TOKEN"] = bitly_token

    app.config["SPEED_TEST"] = speed_test

    print(" * Speed test: ", "on" if speed_test else "off")
    print(" * Ngrok mode: ", "on" if use_ngrok else "off")

    setup_ngrok(app)

    init_routes(app)
    return app
