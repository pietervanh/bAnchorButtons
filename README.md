# bAnchorButtons

See [Uber Forums](https://forums.uberent.com/threads/rel-anchor-buttons.54563/) for details

## Development

The project is set up to use [Grunt](http://gruntjs.com/) the JavaScript Task Runner to make a release.

The generated project includes a `package.json` that lists the dependencies, but you'll need to run `npm install` to download them.

The repository expects to be in a mod folder named `bAnchorbuttons_dev`.  The default grunt task builds to `bAnchorbuttons_test`.  The 'production' build is through:

    grunt release --target=bAnchorButtons
