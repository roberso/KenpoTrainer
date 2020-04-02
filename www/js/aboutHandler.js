
/* JavaScript content from js/aboutHandler.js in folder common */
/**
 * 
 */

var AboutHandler = function() {
	$(document).on("pageshow", "#about", function() {
		mainHandler.aboutHandler.show();
	});
};

AboutHandler.prototype.show = function() {
	mainHandler.currentHandler = this;
	$("#aboutID").html(Messages.title + " " + Messages.version);
};

AboutHandler.prototype.backButton = function() {
		mainHandler.utility.changePage("home");
};
