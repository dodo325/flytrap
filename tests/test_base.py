from typer.testing import CliRunner

from flytrap.cli import app

runner = CliRunner()


def test_main():
    assert 0 == 0


def test_app():
    result = runner.invoke(app, ["--help"])
    assert result.exit_code == 0
    assert "Usage" in result.stdout
