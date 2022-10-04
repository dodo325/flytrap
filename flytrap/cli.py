from typing import Optional

import typer

from .app import create_app

app = typer.Typer()


@app.command()
def base(
    target_url: str,
    ngrok_token: Optional[str] = typer.Option(None, envvar="NGROK_TOKEN"),
    ngrok: bool = True,
    speed_test: bool = False,
    port: int = 8080,
):
    app = create_app(target_url=target_url, ngrok_token=ngrok_token, port=port, use_ngrok=ngrok, speed_test=speed_test)
    app.run(host='0.0.0.0', port=port)  # , debug=True)


if __name__ == "__main__":
    app()
