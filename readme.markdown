# How to convert drawn images into Box2D objects

[This question][1] [nerd-sniped][2] me hard, so I went on a magical journey to
figure out how to turn a drawn raster image into Box2D objects.

This proof of concept expects to find an input file `input.png` in this project
root directory.  Then run `make`. 

You should find a bunch of intermediate formats in `out/` and if you open
`game.html`, you should see a Box2D debug view with your objects loaded.

See the <makefile> for the build steps work.

Dependencies:

-   `make`
-   Node.js and npm
-   Inkscape
-   potrace
-   ImageMagick (`convert` and `mogrify`)

[1]: http://gamedev.stackexchange.com/questions/109216/box2d-dynamic-assignment-of-fixture-shapes-based-on-sprite-alpha-channel
[2]: https://xkcd.com/356/
