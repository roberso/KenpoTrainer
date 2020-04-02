
/* JavaScript content from js/mainHandler.js in folder common */
/**
 * 
 */

var MainHandler = function() {
	this.aboutHandler = new AboutHandler();
	this.techHandler = new TechHandler();
	this.techDetailsHandler = new TechDetailsHandler();
	this.freestyleHandler = new FreestyleHandler();
	this.freestyleDetailsHandler = new FreestyleDetailsHandler();
	this.basicsHandler = new BasicsHandler();
	this.basicsDetailsHandler = new BasicsDetailsHandler();
	this.licenseHandler = new LicenseHandler();
	this.supportHandler = new SupportHandler();
	this.settingsHandler = new SettingsHandler();
	// this.speakPlugin = new KSpeakPlugin();
	this.formsHandler = new FormsHandler();
	this.formsDetailsHandler = new FormsDetailsHandler();
	// this.splashHandler = new SplashHandler();
	this.printHandler = new PrintHandler();
	this.utility = new Util();

	this.utility.defaultSetting("rate", "0.1");
	this.utility.defaultSetting("beginDelay", "2.5");
	this.utility.defaultSetting("techDelay", "1.0");
	this.utility.defaultSetting("attackDelay", "2.5");
	this.utility.defaultSetting("basicsDelay", "1.0");
	this.utility.defaultSetting("freestyleDelay", "1.5");
	this.utility.defaultSetting("acceptLicense", "0");

	this.currentHandler = this;
	this.speakHello = false;

	$(document).on(
			"pageshow",
			"#home",
			function() {
				$("#mainHeaderID").html(Messages.title);
				if (mainHandler.speakHello == false) {
					setTimeout(function() {
						mainHandler.utility.speak(Messages.welcome
								+ Messages.phonetic);
						mainHandler.speakHello = true;
					}, 1000);
				}
				mainHandler.currentHandler = mainHandler;
				if (Messages.version != localStorage["acceptLicense"]) {
					mainHandler.utility.changePage("license");
				}
			});

	// WL.App.overrideBackButton(function() {
	// 	if (mainHandler.currentHandler != undefined) {
	// 		mainHandler.currentHandler.backButton();
	// 	}
	// });
};

MainHandler.prototype.backButton = function() {
	navigator.notification.confirm(
		Messages.close,
		function() {
			navigator.app.exitApp();
		},          
		Messages.title
	);
};

MainHandler.prototype.sayCreed = function() {
	mainHandler.utility.speak(Messages.creed);
};
