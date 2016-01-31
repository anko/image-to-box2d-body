all: shapesVis.png game

game: out/gameBuilt.js game.html

.PHONY: all game

out/gameBuilt.js: game.js out/triangulatedShapes.json
	browserify -o $@ $<

out/triangulatedShapes.json: out/shapes.json shapesToTriangles.js
	node shapesToTriangles.js < out/shapes.json > $@

shapesVis.png : out/shapesVis.svg
	inkscape $< --export-png=$@ --export-area-drawing
	mogrify -flip $@

out/shapesVis.svg : out/visShapesBuilt.js
	~/code/visbuild/index.js < $< > $@

out/visShapesBuilt.js: visShapes.js out/shapes.json
	browserify -o $@ visShapes.js

out/shapes.json: out/traced.ps convertToShapes.js
	node convertToShapes.js < out/traced.ps > $@

out/traced.ps: out/thresholded-alpha.ppm
	@mkdir -p out
	potrace --longcoding --postscript --tight --alphamax=0 --cleartext --output=$@ $<

out/thresholded-alpha.ppm: out/alpha.png
	@mkdir -p out
	convert $< -threshold 75%% -negate $@

out/alpha.png: input.png
	@mkdir -p out
	convert $< -alpha extract $@

clean:
	@rm -rf out/
