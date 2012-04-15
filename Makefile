# Set the source directory
srcdir = src/

# Create the list of modules
targets =  	${srcdir}util.js\
			${srcdir}events.js\
			${srcdir}styles.js\
			${srcdir}process.js\
			${srcdir}commander.js\
			${srcdir}shell.js\
			${srcdir}/Terminal/client.js\
            ${srcdir}terminal.js

all: terminal.js terminal.min.js

terminal.js: ${targets}
	cat $^ > $@

terminal.min.js: ${targets}
	cat $^ | uglifyjs -o $@

clean:
	rm terminal.js
	rm terminal.min.js


