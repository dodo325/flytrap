import typer
import uvicorn


app = typer.Typer()


@app.command()
def hello(name: str):
    typer.echo(f"Hello {name}")


if __name__ == "__main__":
    app()
