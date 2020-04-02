
/* JavaScript content from js/licenseHandler.js in folder common */
/**
 * 
 */

var LicenseHandler = function() {
	$(document).on("pageshow", "#license", function() {
		mainHandler.licenseHandler.show();
	});
};

LicenseHandler.prototype.show = function() {
	mainHandler.currentHandler = this;
	$("#licenseID").html(Messages.title + " " + Messages.version);
};

LicenseHandler.prototype.backButton = function() {
	if (Messages.version == localStorage["acceptLicense"])  {
		mainHandler.utility.changePage("home");
	} else {
		WL.SimpleDialog.show(Messages.title, Messages.license, [ {
			text : Messages.ok,
			handler : function() {
			}
		} ]);
	}
};

LicenseHandler.prototype.accept = function() {
	localStorage["acceptLicense"] = Messages.version;
	mainHandler.utility.changePage("home");
};