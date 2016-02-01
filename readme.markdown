# How to convert drawn images into Box2D objects

[This question][1] [nerd-sniped][2] me hard, so I went on a magical journey to
figure out how to turn a drawn raster image into Box2D objects.

![sword and wand](https://cloud.githubusercontent.com/assets/5231746/12706961/9c9dfb1e-c88d-11e5-8738-f8927d8c9ffb.png) → this pipeline → ![box2d sword and wand](https://cloud.githubusercontent.com/assets/5231746/12707020/646bb46a-c88e-11e5-9d6b-16a0cab0739b.gif)

This proof of concept expects to find an input file `input.png` in this project
root directory.  Then run `make`. 

You should find a bunch of intermediate formats in `out/` and if you open
`game.html`, you should see a Box2D debug view with your objects loaded.

See the [`makefile`](makefile) for how the build steps work.

Dependencies:

-   `make`
-   Node.js and npm
-   Inkscape
-   potrace
-   ImageMagick (`convert` and `mogrify`)

[1]: http://gamedev.stackexchange.com/questions/109216/box2d-dynamic-assignment-of-fixture-shapes-based-on-sprite-alpha-channel
[2]: https://xkcd.com/356/
