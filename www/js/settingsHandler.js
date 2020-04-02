
/* JavaScript content from js/settingsHandler.js in folder common */
/**
 * 
 */

var SettingsHandler = function() {
	$(document).on("pageshow", "#settings", function() {
		mainHandler.settingsHandler.show();
	});
};

SettingsHandler.prototype.show = function() {
	mainHandler.currentHandler = this;
};

SettingsHandler.prototype.backButton = function() {
	mainHandler.utility.changePage("home");
};