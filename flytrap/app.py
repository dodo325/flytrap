from flask import Flask, request, render_template
from rich import print

app = Flask(
    __name__,
    template_folder="./templates",
    static_folder="./static"
)


@app.route("/")
def base_view():
    context = {}

    url = "https://gitlab.com/moneyhand2/moneyhand-react-web"

    # app.logger.warning
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

    context["url"] = url
    return render_template("redirect.html", context=context)
    # "<p>Hello, World!</p>"
