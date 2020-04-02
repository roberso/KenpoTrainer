
/* JavaScript content from js/splashHandler.js in folder common */
/**
 * 
 */

var SplashHandler = function() {
	$(document).on("pageshow", "#splash", function() {
		mainHandler.splashHandler.show();
	});
};

SplashHandler.prototype.show = function() {
	mainHandler.currentHandler = this;
	$("#splashFooterID").html(Messages.izzy);
};

SplashHandler.prototype.backButton = function() {
		mainHandler.utility.changePage("home");
};
