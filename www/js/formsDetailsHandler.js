
/* JavaScript content from js/formsDetailsHandler.js in folder common */
/**
 * 
 */

var FormsDetailsHandler = function() {
	this.initialized = false;
	this.pauseShowing = true;
	this.keepGoing = true;
	$(document).on("pageshow", "#formsDetails", function() {
		mainHandler.formsDetailsHandler.show();
	});
};

FormsDetailsHandler.prototype.backButton = function() {
	mainHandler.utility.changePage("forms");
};

FormsDetailsHandler.prototype.initialize = function() {
	if (this.initialized == false) {
		this.initialized = true;
	}
};

FormsDetailsHandler.prototype.show = function() {
	this.initialize();
	mainHandler.currentHandler = this;
	this.data = mainHandler.formsHandler.getData();
	this.index = -1;
	this.textToSpeak = undefined;
	this.timer = undefined;
	$("#fmPauseID").val("Pause");
	this.keepGoing = true;
	this.addOnTime = 0;
	mainHandler.utility.fromStance("attension", this.begin);
	this.data.details = mainHandler.utility.loadJSON('setsAndForms',
			this.data.form.id);
	this.repeat = 0;
	this.next();
};

FormsDetailsHandler.prototype.begin = function() {
	mainHandler.formsDetailsHandler.next(1);
};

FormsDetailsHandler.prototype.next = function(direction) {
	if (direction === undefined) {
		direction = 1;
	}
	mainHandler.utility.removePI();
	this.index += direction;
	if (this.repeat < this.data.repeat) {
		if (this.index < this.data.details.steps.length) {
			var num = this.index + 1;
			var fmFormID = this.data.form.name;
			var fmCountID = "Iteration " + (this.repeat + 1) + " of "
					+ this.data.repeat;
			var fmStepID = "Step " + num + " of "
					+ this.data.details.steps.length;
			var fmDetailsID = "";
			var longText = undefined;

			if (this.data.form.style == "simple") {
				fmDetailsID = "<p><b>Step " + num + "</b> - "
						+ this.data.details.steps[this.index] + "</p>";
			} else if (this.data.form.style == "complex") {
				longText = this.data.details.steps[this.index].description;
				fmDetailsID = "<p><b>"
						+ longText
						+ "</b></p><ol>";
				for (var i = 0; i < this.data.details.steps[this.index].steps.length; i++) {
					fmDetailsID += "<li>"
							+ this.data.details.steps[this.index].steps[i]
							+ "</li>";
				}
				fmDetailsID += "</ol>";
			} else {
				fmDetailsID = "<p><b>Step " + num + "</b></p><ul>";
				fmDetailsID += "<li><b>Side1</b> - "
						+ this.data.details.steps[this.index].s1 + "</li>";
				fmDetailsID += "<li><b>Side2</b> - "
						+ this.data.details.steps[this.index].s2 + "</li>";
				fmDetailsID += "</ul>";
			}
			$("#fmFormID").html(fmFormID);
			$("#fmStepID").html(fmStepID);
			$("#fmCountID").html(fmCountID);
			$("#fmDetailsID").html(fmDetailsID);
			var textToSpeak = num;
			this.addOnTime = 0;
			if((this.data.speakNames == "on") && (longText != undefined)) {
				textToSpeak = longText;
				this.addOnTime = textToSpeak.length / 10;
			}
			
			mainHandler.utility.speak(""+textToSpeak, this.speechCallback);
		} else {
			this.index = -1;
			this.repeat = this.repeat + 1;
			this.next();
		}
	} else {
		mainHandler.utility.done("forms");
	}
};

FormsDetailsHandler.prototype.speechCallback = function(data) {
	console.log(data);
	var delay = Math
			.round((mainHandler.formsDetailsHandler.data.timer + mainHandler.formsDetailsHandler.addOnTime) * 1000);
	this.timer = setTimeout(function() {
		if (mainHandler.formsDetailsHandler.keepGoing) {
			mainHandler.formsDetailsHandler.next();
		}
	}, delay);
};

FormsDetailsHandler.prototype.togglePause = function() {
	if (this.pauseShowing == true) {
		this.stop();
		this.keepGoing = false;
		this.pauseShowing = false;
		$("#fsPauseID").html("Resume");
	} else {
		this.keepGoing = true;
		this.pauseShowing = true;
		$("#fsPauseID").html("Pause");
		this.speechCallback("resume from pause");
	}
};

FormsDetailsHandler.prototype.stop = function() {
	this.keepGoing = false;
	if (this.timer != undefined) {
		clearTimeout(this.timer);
		this.timer = undefined;
	}
};

FormsDetailsHandler.prototype.resume = function() {
	this.speechCallback();
};

FormsDetailsHandler.prototype.stopAndNext = function() {
	this.index++;
	this.repeat = this.data.repeat;
	mainHandler.utility.showPI();
	// this.stop();
	// this.keepGoing = true;
	// this.next(1);
};