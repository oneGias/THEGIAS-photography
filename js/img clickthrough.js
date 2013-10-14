$(function() {
	$('#portfolio, a, img')
		.on('click', function() {
			$(this).toggleClass('clicked');
		})
/*		.on('mousemove', function(event) {
			var x = event.pageX;
			var y = event.pageY;
			var boxOffset = $(this).offset();
			$('#xLocation').text(x - boxOffset.left);
			$('#yLocation').text(y - boxOffset.top);
		});*/
});




