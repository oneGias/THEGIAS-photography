/*define all variables*/
var photoPathArray = new Array();
var clickedPhotoIndex;
var firstGalleryPhoto;
var htmlGallery;

/*populate array with all photo on the page*/
function populatePhotoArray() {
	$('#portfolio a img').each( function(i) {
		photoPathArray[i] = $(this).attr('src');
		console.log(photoPathArray[i]);
	});
};

/*store the path of the clicked image*/
function getClickedPhotoIndex() {
	$('#portfolio a img').on('click', function(event) {
		event.preventDefault();
/*		console.log($(this).attr('src'));*/
		clickedPhotoIndex = parseInt(photoPathArray.indexOf($(this).attr('src')));
		firstGalleryPhoto = photoPathArray[clickedPhotoIndex]
/*		console.log('clicked on photo ' + firstGalleryPhoto);*/
	});
};

/*open gallery view, in the same tab, showing clicked photo*/
function openGalleryView() {
	$('#portfolio a img').on('click', function(event) {
		event.preventDefault();
		var w = window.open('gallery.html','_self',false);
		console.log('got to openGalleryPage ' + firstGalleryPhoto);
		var htmlGallery = '<img src="' + firstGalleryPhoto + '"/>';
		$(w.document.body).html(htmlGallery);
		alert('pause');
		console.log('holding photo???');
	});
};

/*handles navigation in the gallery view*/
/*function updateGalleryPhoto() {
	on mouse-click/right-arrow-key/right-arrow-button 'next'
	on delete/left-arrow-key/left-arrow-button 'previous'
	on esc revert to last image shown
};*/

/*calling all functions in the right order*/
$(document).ready( function() {
	populatePhotoArray();
	getClickedPhotoIndex();
	openGalleryView();
/*	updateGalleryPhoto;*/
});

