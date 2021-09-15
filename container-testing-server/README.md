# Compoventuals container-testing-server

Simple server for testing [Compoventuals containers](TODO).

## Usage

`container-testing-server [OPTION] CONTAINER`

where CONTAINER is a container file (or URL, if --url is set). Then navigate to the printed link ([http://localhost:3000](http://localhost:3000) by default).

"My Container" runs the container, using the server to connect clients. Try opening that page in multiple tabs.

The Matrix command can be entered into a chat in a widget-capable Matrix client (e.g., [Element web](https://app.element.io/)). The `--https` option is required. The command creates a widget that runs the container, using the Matrix chat to connect clients. You can test the app with multiple users by opening multiple clients on the same machine (the widget will not work on other machines due to the localhost address).

### Options

- -s, --https run in https mode, using a fake (not secret, self-signed) certificate
- -u, --url interpret CONTAINER as an absolute URL instead of a file path
- -h, --help display help for command

The port can be configured with the PORT environment variable. It defaults to 3000.
