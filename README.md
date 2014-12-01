bowserify-expose-with-gulp
===

This repo is to demonstrate how to expose browserified packages. As you may know
that, there are a ton of [issues][0] about the `expose` function in browserify.

[0]: https://github.com/substack/node-browserify/search?q=expose&type=Issues

One package should do one thing, then compose them. Browserify does too much
things, so I am going to decouple the no-core functions as a separated packages,
then re-compose them with gulp tasks.

Please check the [`gulpfile.js`][1] to check the first step. If you have any
ideas on this, please open an issue.

[1]: https://github.com/lijunle/browserify-expose-with-gulp/blob/master/gulpfile.js
