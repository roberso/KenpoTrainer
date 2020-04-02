
/* JavaScript content from js/techDetailsHandler.js in folder common */
/**
 * 
 */

var TechDetailsHandler = function() {
	this.initialized = false;
	this.pauseShowing = true;
	this.keepGoing = true;
	$(document).on("pageshow", "#techDetails", function() {
		mainHandler.techDetailsHandler.show();
	});
};

TechDetailsHandler.prototype.backButton = function() {
	mainHandler.utility.changePage("techniques");
	this.techIndex = undefined;
};

TechDetailsHandler.prototype.initialize = function() {
	this.techIndex = mainHandler.utility.loadJSON('tech', 'index');
	console.log(this.index);
	for (var i = 0; i < this.techIndex.length; i++) {
		var idx = this.techIndex[i].id;
		this.techIndex[idx] = i;
	}
	console.log(this.techIndex);
};

TechDetailsHandler.prototype.show = function() {
	this.initialize();
	mainHandler.currentHandler = this;
	this.data = mainHandler.techHandler.getData();
	this.index = -1;
	this.textToSpeak = undefined;
	this.timer = undefined;
	$("#tdPauseID").val("Pause");
	this.keepGoing = true;
	this.addOnTime = 0;
	mainHandler.utility.fromStance("attention stance", this.begin);
};

TechDetailsHandler.prototype.begin = function() {
	mainHandler.techDetailsHandler.next(1);
};

TechDetailsHandler.prototype.next = function(direction) {
	if (direction === undefined) {
		direction = 1;
	}
	mainHandler.utility.removePI();
	this.index += direction;
	this.repeat = 0;
	this.addOnTime = mainHandler.utility.get("techDelay");
	if (localStorage.techSpeakAttack == "on") {
		this.addOnTime += mainHandler.utility.get("attackDelay");
	}
	if (this.index < this.data.belt.tech.length) {
		var tech = this.data.belt.tech[this.index];
		var idx = this.techIndex[tech];
		this.textToSpeak = this.techIndex[idx].name;
		if (this.textToSpeak === undefined) {
			mainHandler.utility.error(mainHandler.techDetailsHandler.next, 1,
					"tech", tech.id, this.index);
		} else {
			if (localStorage.techSpeakAttack == "on") {
				this.textToSpeak += ".  Against a "
						+ this.techIndex[idx].attack;
				this.textToSpeak = this.textToSpeak.replace(/-/g, " ");
			}
			this.textToSpeak += ". Begin.";

			// update screen
			$("#tdBeltID").html(
					this.data.group.description + ": "
							+ this.data.belt.description);
			$("#tdTechID").html(
					this.techIndex[idx].name + " ("
							+ this.techIndex[idx].attack + ")");

			$("#tdStepsID").empty();
			try {
				var steps = mainHandler.utility.loadJSON('tech', tech);

				for (var i = 0; i < steps.length; i++) {
					($('<div>').attr({
						'data-role' : 'collapsible',
						'data-collapsed' : 'true'
					}).html("<h4>" + steps[i].substring(0, 30) + "...</h4><p>"
							+ steps[i] + "</p></div>")).appendTo('#tdStepsID');
				}
			} catch (err) {
				console.log(err);
			}
			$('#tdStepsID').collapsibleset().trigger('create');
			this.repeatTech(true);
		}
	} else {
		mainHandler.utility.done("techniques");
	}
};

TechDetailsHandler.prototype.repeatTech = function(fullTitle) {
	if (this.repeat < this.data.repeat) {
		this.repeat++;
		if (fullTitle == false) {
			this.textToSpeak = "" + this.repeat;
			this.addOnTime = 0;
		}
		$("#tdCountID").html(
				"Count: " + this.repeat + " of " + this.data.repeat);

		mainHandler.utility.speak(this.textToSpeak, this.speechCallback);
	} else {
		this.next(1);
	}
};

TechDetailsHandler.prototype.speechCallback = function(data) {
	console.log(data);
	var delay = Math
			.round((mainHandler.techDetailsHandler.data.timer + mainHandler.techDetailsHandler.addOnTime) * 1000);
	console.log(delay);
	this.timer = setTimeout(function() {
		if (mainHandler.techDetailsHandler.keepGoing) {
			mainHandler.techDetailsHandler.repeatTech(false);
		}
	}, delay);
};

TechDetailsHandler.prototype.togglePause = function() {
	if (this.pauseShowing == true) {
		this.stop();
		this.keepGoing = false;
		this.pauseShowing = false;
		$("#tdPauseID").html("Resume");
	} else {
		this.keepGoing = true;
		this.pauseShowing = true;
		$("#tdPauseID").html("Pause");
		this.speechCallback("resume from pause");
	}
};

TechDetailsHandler.prototype.stop = function() {
	this.keepGoing = false;
	if (this.timer != undefined) {
		clearTimeout(this.timer);
		this.timer = undefined;
	}
};

TechDetailsHandler.prototype.resume = function() {
	this.speechCallback();
};

TechDetailsHandler.prototype.stopAndNext = function() {
	this.index++;
	this.repeat = 0;
	mainHandler.utility.showPI();
	// this.stop();
	// this.keepGoing = true;
	// this.next(1);
};