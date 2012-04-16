# Set the source directory
srcdir = src/

# Create the list of modules
targets =  	${srcdir}util.js\
			${srcdir}events.js\
			${srcdir}styles.js\
			${srcdir}io.js\
			${srcdir}io/inputstream.js\
			${srcdir}io/outputstream.js\
			${srcdir}process.js\
			${srcdir}commander.js\
			${srcdir}shell.js\
			${srcdir}terminal/client.js\
            ${srcdir}terminal.js

all: terminal.js terminal.min.js

terminal.js: ${targets}
	cat $^ > $@

terminal.min.js: ${targets}
	cat $^ | uglifyjs -o $@

build-runner: 
	cd deps/examples/specrunner
	qmake && make

build-runner-mac: 
	cd deps/examples/specrunner
	qmake -spec macx-g++ && make

clean:
	rm terminal.js
	rm terminal.min.js


