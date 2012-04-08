
all:
	cat src/* | uglifyjs -o build/terminal.min.js
