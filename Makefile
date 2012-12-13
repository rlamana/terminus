# Set the source directory
srcdir = src/
builddir = build/

# Dependencies
targets = config.js

all: terminus.js terminus.min.js

terminus.js: ${targets}
	r.js -o config.js optimize=none out=${builddir}terminus.js

terminus.min.js: ${targets}
	r.js -o config.js out=${builddir}terminus.min.js

build-runner: 
	cd deps/examples/specrunner
	qmake && make

build-runner-mac: 
	cd deps/examples/specrunner
	qmake -spec macx-g++ && make

clean:
	rm ${builddir}terminus.js
	rm ${builddir}terminus.min.js

install:
	npm install requirejs


