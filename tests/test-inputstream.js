/**
 * Copyright © 2012 Ramón Lamana
 */
define(['terminus/io/inputstream', 'terminus/promise'],function(InputStream, Promise) {
	var stdin = new InputStream();

	describe('InputStream', function() {
	    describe('First call to read()', function() {
			it('should be empty', function() {
				expect(stdin.read()).to.be.empty;
			})
	    })

	   	describe('Call to read() of a stream with data', function() {
			it('should return stream\'s data and empty the stream', function() {
				stdin._put('h');
				stdin._put('e');
				stdin._put('l');
				stdin._put('l');
				stdin._put('o');
				var data = stdin.read();
				expect(data).to.be.instanceof(Array);

				data = data.toString().replace(/,/g,'');
				expect(data).to.be.equal('hello');
				expect(stdin.stream).to.be.empty;
			})
	    })
	});
});