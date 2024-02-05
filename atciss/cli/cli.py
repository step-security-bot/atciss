"""Command-line interface - root."""

from typing import Any

import click

from .serve import serve

CMD_HELP = "ATCISS CLI root."


@click.group(help=CMD_HELP)
def cli(**_: dict[str, Any]) -> None:
    """Define command-line interface root."""


cli.add_command(serve)

if __name__ == "__main__":
    cli()
