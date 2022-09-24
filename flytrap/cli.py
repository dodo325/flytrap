from typing import Optional

import typer

from .app import app as web_app

# import sys
# from pyngrok import ngrok as ngrok_api
# import signal
app = typer.Typer()


# def handler(signal, frame):
#     print(' - CTRL-C pressed!')
#     if _http_tunnel is not None:
#         ngrok_api.disconnect(_http_tunnel.public_url)
#         _http_tunnel = None
#     sys.exit(0)


@app.command()
def base(ngrok: bool = True, port: int = 8080, ngrok_token: Optional[str] = None):
    # global _http_tunnel

    # Start
    # signal.signal(signal.SIGINT, handler)
    # signal.pause()

    # if ngrok_token:
    #     ngrok_api.set_auth_token(ngrok_token)
    # if ngrok:
    #     _http_tunnel = ngrok_api.connect(port, "http")
    #     typer.echo(f"HTTP tunnel: {_http_tunnel.public_url}")

    web_app.run(host='0.0.0.0', port=port, debug=True)


if __name__ == "__main__":
    app()
