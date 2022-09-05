from flask import Flask, request
from flask import session
from rich import print
app = Flask(__name__)


@app.route("/")
def hello_world():
    print("  ## method = ")
    print(request.method)
    print("  ## headers = ")
    print(request.headers)
    print("  ## user_agent = ")
    print(request.user_agent)
    print("  ## request.accept_languages = ")
    print(request.accept_languages)
    print("  ## request = ")
    print(request)

    print("  ## cookies = ")
    print(request.cookies)

    print("  ## url = ")
    print(request.url)

    print("  ## blueprint = ")
    print(request.blueprint)

    print("  ## view_args = ")
    print(request.view_args)

    # print("  ## status_code = ")
    # print(request.status_code)

    print("  ## remote_addr = ")
    print(request.remote_addr)

    print("  ## authorization = ")
    print(request.authorization)

    print("  ## path = ")
    print(request.path)

    print("  ## args = ")
    print(request.args)

    print("  ## request.environ = ")
    print(request.environ)

    return "<p>Hello, World!</p>"
