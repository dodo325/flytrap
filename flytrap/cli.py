from typing import Optional

import typer
from rich.prompt import Confirm, Prompt

from . import configs
from .app import create_app

app = typer.Typer()


# @app.callback(invoke_without_command=True)
# def main(
#     ctx: typer.Context
# ) -> None:
#     if ctx.invoked_subcommand is not None:
#         return

#     print("Running TUI")


@app.command()
def run(
    target_url: str,
    ngrok: bool = True,
    bitly: bool = False,
    speed_test: bool = False,
    port: int = 8080,
    ngrok_token: Optional[str] = typer.Option(None, envvar="NGROK_TOKEN"),
    bitly_token: Optional[str] = typer.Option(None, envvar="BITLY_TOKEN"),
):
    """Start the trap tunnel"""
    data = configs.read_config_file()
    ngrok_token = ngrok_token or data["ngrok_token"]
    bitly_token = bitly_token or data["bitly_token"]

    app = create_app(
        target_url=target_url,
        ngrok_token=ngrok_token,
        bitly_token=bitly_token,
        port=port,
        use_ngrok=ngrok,
        use_bitly=bitly,
        speed_test=speed_test,
    )
    app.run(host='0.0.0.0', port=port)  # , debug=True)


@app.command()
def config(
    ngrok_token: Optional[str] = typer.Option(None, envvar="NGROK_TOKEN"),
    bitly_token: Optional[str] = typer.Option(None, envvar="BITLY_TOKEN"),
):
    """Configures the file"""
    print("Write configuration no ", configs.USER_CONFIG_FILE.absolute())
    configs.init_user_configs_dir()
    if configs.USER_CONFIG_FILE.exists():
        is_overwrite = Confirm.ask("Config file already exists! Would you like to overwrite it?")
        if not is_overwrite:
            return
    else:
        configs.USER_CONFIG_FILE.touch()

    ngrok_token = ngrok_token or Prompt.ask("Enter your ngrok token", default=None)
    bitly_token = bitly_token or Prompt.ask("Enter your bitly token", default=None)

    data = configs.read_config_file()
    if ngrok_token:  # TODO: refactor this!
        data['ngrok_token'] = ngrok_token
    if bitly_token:
        data['bitly_token'] = bitly_token
    configs.write_config_file(data)


if __name__ == "__main__":
    app()
