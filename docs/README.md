# Collabs docs

Source of [https://collabs.readthedocs.io/](https://collabs.readthedocs.io/).

## Setup

To run commands in this folder, in addition to `npm ci` in the main folder, also install Python dependencies: `pip install -r requirements.txt`.

`src/` is built with Sphinx, using MyST to let us write Markdown (see `src/conf.py`).

We also build Typedoc for all published packages into `generated/api`, which Sphinx copies to the `/api/` site path.

When cross-linking within the docs, use a link to the compiled html page. I.e., use `.html` instead of `.md` or nothing on the link. This is due to the `myst_all_links_external=True` option in `src/conf.py`.
