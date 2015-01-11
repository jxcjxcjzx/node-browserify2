node-bowserify2
===

[![Build Status][travis-image]][travis-url]
[![Dependencies Status][deps-image]][deps-url]

[travis-image]: https://travis-ci.org/lijunle/node-browserify2.png?branch=master "Build Status"
[travis-url]: https://travis-ci.org/lijunle/node-browserify2
[deps-image]: https://david-dm.org/lijunle/node-browserify2.png "Dependencies Status"
[deps-url]: https://david-dm.org/lijunle/node-browserify2

Hack the great [browserify][1] to work under gulp.

[1]: https://github.com/substack/node-browserify

Why hack it?
---

Browserify is a great tool to let node packages work in browser. While it is
being complex and heavy, I decide to remove some features and make it work
under [gulp][2]. Simplify browserify only for browser bundle. Compose gulp
plugins for complex tasks.

[2]: https://github.com/gulpjs/gulp

How can I start?
---

This project is still under development. See `test` task in [gulpfile.js][3] for
details.

[3]: https://github.com/lijunle/node-browserify2/blob/master/gulpfile.js

License
---
MIT
