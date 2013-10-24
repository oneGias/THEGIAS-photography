/*define all variables*/
var photoPathArray = [];
var nextPhoto = [13, 32, 39, 40];  /*enter, space, right and down arrow*/
var previousPhoto = [37, 38];  /*left and up arrow*/
var clickedPhotoIndex;
var htmlGallery;
var galleryWindow;
var firstGalleryPhoto;
var htmlFirstGalleryPhoto;
var keyboardInput;


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
		galleryWindow = window.open('gallery.html','_self',false);
		console.log('opening Gallery Page with ' + firstGalleryPhoto);
		htmlFirstGalleryPhoto = '<a href="#"><img src="' + firstGalleryPhoto + '"/></a>'
		$(galleryWindow.document).ready( function() {      /* ???? looks like doc.ready doesnt wrk here */
			$(this.body).html(htmlFirstGalleryPhoto);      /* ???? why .find('#gallery') doesn't work? */
			prompt('pausing after adding image html to #gallery');
		});
		console.log('galleryWindow closed');
	});
};

/*handles navigation in the gallery view*/
function navigatePhotoGallery() {
	$('#gallery').on('keyup', function(event) {
		event.preventDefault();
		keyboardInput = event.which;
		console.log(keyboardInput);
		if (nextPhoto.indexOf(keyboardInput) >= 0) {     /* ???????? can I add mouse click here? */
			clickedPhotoIndex += 1;
			$(this).html(htmlFirstGalleryPhoto);
			console.log('nextphoto is ' + htmlFirstGalleryPhoto);
		} else if (previousPhoto.indexOf(keyboardInput) >= 0) {
			clickedPhotoIndex -= 1;
			$(this).html(htmlFirstGalleryPhoto);
			console.log('previous photo is ' + htmlFirstGalleryPhoto);
		} else if (keyboardInput == 27) {    /* ???????? pressing escape I would liek to return to original page */

		}
	});
/*	on mouse-click/right-arrow-key/right-arrow-button 'next'
	on delete/left-arrow-key/left-arrow-button 'previous'
	on esc revert to last image shown*/
};

/*calling all functions in the right order*/
$(document).ready( function() {
	populatePhotoArray();
	getClickedPhotoIndex();
	openGalleryView();
	navigatePhotoGallery();
/*	nextGalleryPhoto;
	previousGalleryPhoto;
	exitPhotoGallery*/
});

