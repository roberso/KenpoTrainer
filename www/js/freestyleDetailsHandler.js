
/* JavaScript content from js/freestyleDetailsHandler.js in folder common */
/**
 * 
 */

var FreestyleDetailsHandler = function() {
	this.initialized = false;
	this.pauseShowing = true;
	this.keepGoing = true;
	$(document).on("pageshow", "#freestyleDetails", function() {
		mainHandler.freestyleDetailsHandler.show();
	});
};

FreestyleDetailsHandler.prototype.backButton = function() {
	mainHandler.utility.changePage("freestyle");
};

FreestyleDetailsHandler.prototype.initialize = function() {
	if (this.initialized == false) {
		this.initialized = true;
	}
};

FreestyleDetailsHandler.prototype.show = function() {
	this.initialize();
	mainHandler.currentHandler = this;
	this.data = mainHandler.freestyleHandler.getData();
	this.index = -1;
	this.textToSpeak = undefined;
	this.timer = undefined;
	$("#fsPauseID").val("Pause");
	this.keepGoing = true;
	this.addOnTime = 0;
	mainHandler.utility.fromStance("fighting stance", this.begin);
};

FreestyleDetailsHandler.prototype.begin = function() {
	mainHandler.freestyleDetailsHandler.next(1);
};

FreestyleDetailsHandler.prototype.next = function(direction) {
	if (direction === undefined) {
		direction = 1;
	}
	mainHandler.utility.removePI();
	this.index += direction;
	this.repeat = 0;
	if (this.index < this.data.belt.tech.length) {
		var belt = this.data.belt;
		var fs = belt.tech[this.index];
		this.textToSpeak = fs.pronounce;
		if (this.textToSpeak === undefined) {
			mainHandler.utility.error(mainHandler.freestyleDetailsHandler.next,
					1, "freestyle", belt.id, this.index);
		} else {
			var steps = fs.steps;
			this.addOnTime = mainHandler.utility.get("freestyleDelay");
			// update screen
			this.textToSpeak += ". Begin.";
			$("#fsBeltID").html(this.data.belt.description);
			$("#fsTechID").html(fs.description);
			$("#fsStepsID").empty();
			for (var i = 0; i < steps.length; i++) {
				var id = fs.steps[i];
				var idx = belt.index[id];
				var key = belt.key[idx];
				($('<div>').attr({
					'data-role' : 'collapsible',
					'data-collapsed' : 'true'
				}).html("<h4>" + key.id + "</h4><p>" + key.description
						+ "</p></div>")).appendTo('#fsStepsID');
			}
			$('#fsStepsID').collapsibleset().trigger('create');
			this.repeatFreestyle(true);
		}
	} else {
		mainHandler.utility.done("freestyle");
	}
};

FreestyleDetailsHandler.prototype.repeatFreestyle = function(fullTitle) {
	if (this.repeat < this.data.repeat) {
		this.repeat++;
		if (fullTitle == false) {
			this.textToSpeak = "" + this.repeat;
			this.addOnTime = 0;
		}
		$("#fsCountID").html(
				"Count: " + this.repeat + " of " + this.data.repeat);

		mainHandler.speakPlugin.speak(this.textToSpeak, this.speechCallback);
	} else {
		this.next(1);
	}
};

FreestyleDetailsHandler.prototype.speechCallback = function(data) {
	console.log(data);
	var delay = Math.round((mainHandler.freestyleDetailsHandler.data.timer+mainHandler.freestyleDetailsHandler.addOnTime) * 1000);
	this.timer = setTimeout(function() {
		if (mainHandler.freestyleDetailsHandler.keepGoing) {
			mainHandler.freestyleDetailsHandler.repeatFreestyle(false);
		}
	}, delay);
};

FreestyleDetailsHandler.prototype.togglePause = function() {
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

FreestyleDetailsHandler.prototype.stop = function() {
	this.keepGoing = false;
	if (this.timer != undefined) {
		clearTimeout(this.timer);
		this.timer = undefined;
	}
};

FreestyleDetailsHandler.prototype.resume = function() {
	this.speechCallback();
};

FreestyleDetailsHandler.prototype.stopAndNext = function() {
	this.index ++;
	this.repeat = this.data.repeat;
	mainHandler.utility.showPI();
//	this.stop();
//	this.keepGoing = true;
//	this.next(1);
};