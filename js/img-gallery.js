/*define all variables*/
var photoPathArray = [];
var photoOrientationArray = [];
var nextPhotoKeys = [13, 32, 39, 40];  /*enter, space, right and down arrow*/
var previousPhotoKeys = [37, 38];  /*left and up arrow*/
var clickedPhotoIndex;
var firstGalleryPhoto;
var keyboardInput;
var fullScreenDiv


/*populate one array with all photo on page plus one array with orientation CSS class*/
function populatePhotoArray() {
	$('#portfolio a img').each( function(i) {
		photoPathArray[i] = $(this).attr('src');
		/*check image orientation for optimal gallery display*/
		if ( ($(this).width()) / ($(this).height() ) >= 1) {
			photoOrientationArray[i] = 'landscape';
/*			console.log(photoPathArray[i] + " " + photoOrientationArray[i]);*/
		} else {
			photoOrientationArray[i] = 'portrait';			
/*		 	console.log(photoPathArray[i] + " " +  photoOrientationArray[i]);*/
		}
	});
}


/*store the path of the clicked image*/
function getClickedPhotoIndex() {
	$('#portfolio a img').on('click', function(event) {
		event.preventDefault();
/*		console.log($(this).attr('src'));*/
		clickedPhotoIndex = parseInt(photoPathArray.indexOf($(this).attr('src')));
		firstGalleryPhoto = photoPathArray[clickedPhotoIndex]
/*		console.log('clicked on photo ' + firstGalleryPhoto);*/
	});
}


/*open gallery view, in the same tab, showing clicked photo*/
function switchToGalleryView() {
	$('#gallery').hide();
	$('#portfolio a img').on('click', function(event) {
		event.preventDefault();
		$('header, #portfolio, footer').hide();
		goFullScreen();
		$('#gallery').show();
		$('#gallery img').attr('src', firstGalleryPhoto).addClass(photoOrientationArray[clickedPhotoIndex]);
/*		console.log('just gone full screen');*/
	});
}


/*handles navigation in the gallery view*/
function navigatePhotoGallery() {
	$('#gallery').on('click', function(event) {
		event.preventDefault();
			goToNextPhoto();
/*			console.log('logging clicks');*/
		});
	$(document).on('keydown', function(event) {
		event.preventDefault();
		keyboardInput = event.which;
/*		console.log('logging key inputs ' + keyboardInput);*/
		if (nextPhotoKeys.indexOf(keyboardInput) >= 0) {
			goToNextPhoto();
		} else if (previousPhotoKeys.indexOf(keyboardInput) >= 0) {
			goToPreviousPhoto();
		} else if (keyboardInput == (8 || 46)) {  /*represtinate previosu page on delete in after leaving fullScreen wiht escape*/
			location.reload();
		}   
	});
}


function goToNextPhoto() {
		console.log('called goToNextPhoto');
	if (clickedPhotoIndex < (photoPathArray.length-1)) {
		clickedPhotoIndex += 1;
	} else if (clickedPhotoIndex == (photoPathArray.length-1)) {
		clickedPhotoIndex = 0;
	};
	$('#gallery').fadeOut(500, function() {
		$('#gallery img').attr('src', photoPathArray[clickedPhotoIndex]).addClass(photoOrientationArray[clickedPhotoIndex]);
		$('#gallery').fadeIn(500);
/*		console.log("the next photo's src is " + photoPathArray[clickedPhotoIndex]);*/
	});
}


function goToPreviousPhoto() {
		console.log('called goToPreviousPhoto');
	if (clickedPhotoIndex > 0) {
		clickedPhotoIndex -= 1;
	} else if (clickedPhotoIndex == 0) {
		clickedPhotoIndex =  photoPathArray.length - 1;
	}
	$('#gallery img').fadeOut(500, function() {
		$('#gallery img').attr('src', photoPathArray[clickedPhotoIndex]).addClass(photoOrientationArray[clickedPhotoIndex]);
		$('#gallery img').fadeIn(500);
/*		console.log("the previous photo's src is " + photoPathArray[clickedPhotoIndex]);*/
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
3) keep background black fading forward (ok fading backwards)
4) #gallery border shadow? use same colour as in mainpage?
*/
