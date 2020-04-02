
/* JavaScript content from js/supportHandler.js in folder common */
/**
 * 
 */

var SupportHandler = function() {
	$(document).on("pageshow", "#support", function() {
		mainHandler.supportHandler.show();
	});
};

SupportHandler.prototype.show = function() {
	mainHandler.currentHandler = this;
	$("#supportEmailID").html("<a href='mailto:kenn.roberson@gmail.com?subject=" + Messages.title + " " + Messages.version + "'>Click here to ask a question or report an issue.</a>");
};

SupportHandler.prototype.backButton = function() {
	mainHandler.utility.changePage("home");
};
