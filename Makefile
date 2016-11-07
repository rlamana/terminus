# Set the source directory
srcdir = src/
builddir = build/
buildname = terminus

lessfiles = $(wildcard src/ui/css/*.less)
cssfile = ${builddir}/${buildname}.css

# Dependencies
targets = config.js

all: debug release

jshint:
	@echo Executing jshint...
	@echo ---------------------------------------
	@jshint $(srcdir)
	@echo done.

debug: jshint ${targets} less
	r.js -o config.js optimize=none out=${builddir}/${buildname}.js

release: jshint ${targets} less
	r.js -o config.js out=${builddir}/${buildname}.min.js

less: $(lessfiles:.less=.css)
	@echo "LESS compiler finished."

%.css: %.less
	@echo Compiling $<
	@lessc --yui-compress $< >> ${cssfile}

test:
	karma start karma.conf.js

clean:
	rm -f ${builddir}/${buildname}.js
	rm -f ${builddir}/${buildname}.min.js
	rm -f ${cssfile}

install:
	npm install requirejs
	npm install less
	npm install mocha
	npm install karma
	npm install karma-mocha --save-dev
	npm install karma-requirejs --save-dev
	npm install karma-chrome-launcher --save-dev


