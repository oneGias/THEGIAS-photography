/*define all variables*/
var photoPathArray = new Array();
var clickedPhotoIndex
var firstGalleryPhoto

/*populate array with all photo on the page*/
function populatePhotoArray() {
	$('#portfolio a img').each( function(i) {
		photoPathArray[i] = $(this).attr('src');
		console.log(photoPathArray[i]);
	});
}

/*store the index of the clicked image*/
function getClickedPhotoIndex() {
	$('#portfolio a img').on('click', function(event) {
		event.preventDefault();
/*		console.log($(this).attr('src'));*/
		clickedPhotoIndex = parseInt(photoPathArray.indexOf($(this).attr('src')));
		firstGalleryPhoto = photoPathArray[clickedPhotoIndex]
/*		console.log('clicked on photo ' + firstGalleryPhoto);*/
	});
};


function openGalleryView() {
	$('#portfolio a img').on('click', function(event) {
		event.preventDefault();
		var w = window.open('gallery.html','_self',false);
		console.log('got to openGalleryPage ' + firstGalleryPhoto);
		var htmlFirstGalleryPhoto = '<img src="' + firstGalleryPhoto + '"/>';
		$(w.document.body).html(htmlFirstGalleryPhoto).addClass('gallery');
		console.log('holding photo???');
		
	});
};

/*function updateGalleryPhoto() {
};*/

$(document).ready( function() {
	populatePhotoArray();
	getClickedPhotoIndex();
	openGalleryView();
});


/*
call functions in order:
 1)store path photo clicked
 2)open page
 3)forward/backward arrows
 4)return to original page
*/

/*
copy all photo paths on the page to an array
upon click on any photo
	copy image path
	find the key value in the array
	open up on gallery page full size (better with animation, blurr rest of screen)
		on mouse-click/right-arrow-key/right-arrow-button 'next'
		on delete/left-arrow-key/left-arrow-button 'previous'
		on esc revert to last image shown
*/	