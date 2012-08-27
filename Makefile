# Set the source directory
srcdir = src/
builddir = build/

# Dependencies
targets = config.js

all: terminal.js terminal.min.js

terminal.js: ${targets}
	r.js -o config.js optimize=none out=${builddir}terminal.js

terminal.min.js: ${targets}
	r.js -o config.js out=${builddir}terminal.min.js

build-runner: 
	cd deps/examples/specrunner
	qmake && make

build-runner-mac: 
	cd deps/examples/specrunner
	qmake -spec macx-g++ && make

clean:
	rm ${builddir}terminal.js
	rm ${builddir}terminal.min.js


