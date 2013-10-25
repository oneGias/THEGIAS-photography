/*define all variables*/
var photoPathArray = [];
var nextPhoto = [13, 32, 39, 40];  /*enter, space, right and down arrow*/
var previousPhoto = [37, 38];  /*left and up arrow*/
var clickedPhotoIndex;
var htmlGallery;
var galleryWindow;
var firstGalleryPhoto;
var htmlFirstGalleryPhoto;
var htmlGalleryPhoto;
var keyboardInput;
var fullScreenDiv


/*populate array with all photo on the page*/
function populatePhotoArray() {
	$('#portfolio a img').each( function(i) {
		photoPathArray[i] = $(this).attr('src');
/*		console.log(photoPathArray[i]);*/
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
function switchToGalleryView() {
	$('#gallery').hide();
	$('#portfolio a img').on('click', function(event) {
		event.preventDefault();
		htmlFirstGalleryPhoto = '<a href="#"><img src="' + firstGalleryPhoto + '"/></a>'
		$('header, #portfolio, footer').hide();
		goFullScreen();
		$('#gallery').show();
		$('#gallery').html(htmlFirstGalleryPhoto);
		console.log('just gone full screen');
	});
};

/*handles navigation in the gallery view*/
function navigatePhotoGallery() {
/*	$('#gallery').on('click', function(event) {
		event.preventDefault();
			goToNextPhoto();
			console.log('logging clicks');
		});*/
	$('#gallery').on('keyup', function(event) {
		keyboardInput = event.which;
		console.log('logging key inputs ' + keyboardInput);
		if (nextPhoto.indexOf(keyboardInput) >= 0) {
			goToNextPhoto();
		} else if (previousPhoto.indexOf(keyboardInput) >= 0) {
			goToPreviousPhoto();
		} /*else if (keyboardInput == (27 || 46) {  
			$('header, #portfolio, footer').show();
			$('#gallery').hide();
		}   ????? pressing delete reloads the page?    */
		return false;
	});
/*	on mouse-click/right-arrow-key/right-arrow-button 'next'
	on delete/left-arrow-key/left-arrow-button 'previous'
	on esc revert to last image shown*/
};


function goToNextPhoto() {
	if (clickedPhotoIndex < (photoPathArray.length-1)) {
		clickedPhotoIndex += 1;
	} else if (clickedPhotoIndex == (photoPathArray.length-1)) {
		clickedPhotoIndex = 0;
	};
	$('#gallery').fadeOut(500, function() {
		htmlGalleryPhoto = '<a href="#"><img src="' + photoPathArray[clickedPhotoIndex] + '"/></a>';
		$('#gallery').html(htmlGalleryPhoto);
		$('#gallery').fadeIn(500);
		console.log('nextphoto is ' + htmlFirstGalleryPhoto);
	});
}


function goToPreviousPhoto() {
	if (clickedPhotoIndex > 0) {
		clickedPhotoIndex -= 1;
	} else if (clickedPhotoIndex == 0) {
		clickedPhotoIndex =  photoPathArray.length;
	}
	$('#gallery').fadeOut(500, function() {
		htmlGalleryPhoto = '<a href="#"><img src="' + photoPathArray[clickedPhotoIndex] + '"/></a>';
		$('#gallery').html(htmlGalleryPhoto);
		$('#gallery').fadeIn(500);
		console.log('previous photo is ' + htmlFirstGalleryPhoto);
	});
}

/*lanches full screen*/
function goFullScreen() {
	var fullScreenDiv = document.getElementById('gallery');
	function fullScreen(fullScreenDiv) {
		if(fullScreenDiv.requestFullScreen) {
    		fullScreenDiv.requestFullScreen();
  		} else if(fullScreenDiv.webkitRequestFullScreen ) {
    		fullScreenDiv.webkitRequestFullScreen();
  		} else if(fullScreenDiv.mozRequestFullScreen) {
    		fullScreenDiv.mozRequestFullScreen();
  		}
  	}	
	fullScreen(fullScreenDiv);
}

/*calling all functions in the right order*/
$(document).ready( function() {
	populatePhotoArray();
	getClickedPhotoIndex();
	switchToGalleryView();
	navigatePhotoGallery();
});


/*
TODOs:
1) maxheigth on Gallery
2) naspaces for functions
	var THEGIAS = {
		functionName: function() {
			stuff
		}
	}
	THEGIAS.functionName (calling function)
	init plus second tier functions (helpers)
3) fadein/out opacity at 0.3
4) #gallery border shadow?
*/
