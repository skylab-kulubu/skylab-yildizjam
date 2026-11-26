# Error scenes

The club's error scenes (skylcn-ui ErrorScene), copied unchanged from
`skylcn-ui-error-scenes-0.3.0-onizleme.1.zip`:

- Release: https://github.com/skylab-kulubu/skylcn-ui/releases/tag/v0.3.0-onizleme.1 (skylcn-ui main at 46a581c)
- sha256 of the zip: `5d96becafb42c4d4b1944102102576c37a328f9780950ab9fd3fef876df6bb0b`

One SVG per drawing (`<kind>-<variant>.svg`), `<kind>.json` with a kind's variants, the ones
picked at random, its words and its drawings' markup, `index.json` with every kind, and
`error-scene.css`, the scenes' rules. This site does not take the skylcn-ui package: its error
pages import a kind's JSON and `error-scene.css` (src/components/error). To update, replace
the files with a newer release's zip and change the version above; do not edit them by hand.
