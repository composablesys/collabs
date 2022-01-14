# @collabs/container-testing-server

**Simple server for testing Collabs containers**

[https://www.npmjs.com/package/@collabs/container-testing-server](https://www.npmjs.com/package/@collabs/container-testing-server)

## Usage

`container-testing-server [OPTION] CONTAINER`

where CONTAINER is a container file (or URL, if --url is set). Then navigate to the printed link ([http://localhost:3000](http://localhost:3000) by default).

The home page (index.html) runs the container, using the server to connect clients. Try opening that page in multiple tabs.

### Options

- -s, --https run in https mode, using a fake (not secret, self-signed) certificate
- -u, --url interpret CONTAINER as an absolute URL instead of a file path
- -h, --help display help for command

The port can be configured with the PORT environment variable. It defaults to 3000.
