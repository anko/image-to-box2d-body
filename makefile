all: shapesVis.png game

game: out/gameBuilt.js game.html

.PHONY: all game

# All calls to `browserify` mean bundling all the dependencies into one file,
# for running in a browser or in `svg-pizzabase` into one file (because the
# Node.js `require`-function isn't available in them).

out/gameBuilt.js: game.js out/triangulatedShapes.json
	browserify -o $@ $<

out/triangulatedShapes.json: out/shapes.json shapesToTriangles.js
	# Convert the shape JSON data into triangle JSON data
	node shapesToTriangles.js < out/shapes.json > $@

shapesVis.png : out/shapesVis.svg
	# Rasterise the SVG file to a PNG
	inkscape $< --export-png=$@ --export-area-drawing
	# Flip it vertically (because the y-coordinates we get out of potrace
	# increase in the other direction)
	mogrify -flip $@

out/shapesVis.svg : out/visShapesBuilt.js
	# Create an SVG image from the visualisation code
	$$(npm bin)/svg-pizzabase < $< > $@

out/visShapesBuilt.js: visShapes.js out/shapes.json
	browserify -o $@ visShapes.js

out/shapes.json: out/traced.ps convertToShapes.js
	# Parse the traced PostScript file and convert it to a JSON format of
	# shapes.
	node convertToShapes.js < out/traced.ps > $@

out/traced.ps: out/thresholded-alpha.ppm
	@mkdir -p out
	# Trace the thresholded image into a PostScript file, using the most
	# verbose, least-compressed options available.  This makes it easier to
	# parse later.
	potrace --longcoding --postscript --tight --alphamax=0 --cleartext --output=$@ $<

out/thresholded-alpha.ppm: out/alpha.png
	@mkdir -p out
	# Threshold and negate the alpha channel image.  Also convert to the
	# (extremely simple and text-based) PPM image format, because that's what
	# potrace understands.
	convert $< -threshold 75%% -negate $@

out/alpha.png: input.png
	@mkdir -p out
	# Extract the alpha channel into a separate image.
	convert $< -alpha extract $@

clean:
	@# Delete all automatically generated files.
	@rm -rf out/ shapesVis.png
