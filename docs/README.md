# Collabs docs

Source of [https://collabs.readthedocs.io/](https://collabs.readthedocs.io/).

## Setup

TODO: Sphinx + Myst-parser + Typedoc.

When cross-linking within the docs, use a link to the compiled html page. I.e., use `.html` instead of `.md` or nothing on the link. This is due to the `myst_all_links_external=True` option in `src/conf.py`.
