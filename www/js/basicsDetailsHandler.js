
/* JavaScript content from js/basicsDetailsHandler.js in folder common */
/**
 * 
 */

var BasicsDetailsHandler = function() {
	console.log('basicdetailshandler ctor');
	this.initialized = false;
	this.pauseShowing = true;
	this.keepGoing = true;
	$(document).on("pageshow", "#basicsDetails", function() {
		mainHandler.basicsDetailsHandler.show();
	});
};

BasicsDetailsHandler.prototype.backButton = function() {
	console.log('basicdetailshandler backButton');
	mainHandler.utility.changePage("basics");
};

BasicsDetailsHandler.prototype.initialize = function() {
	console.log('basicdetailshandler initialize');
	if (this.initialized == false) {
		this.initialized = true;
	}
};

BasicsDetailsHandler.prototype.show = function() {
	console.log('basicdetailshandler show');
	mainHandler.currentHandler = this;
	this.initialize();
	this.data = mainHandler.basicsHandler.getData();
	this.index = -1;
	this.textToSpeak = undefined;
	this.timer = undefined;
	$("#bsPauseID").val("Pause");
	this.keepGoing = true;
	this.addOnTime = 0;
	mainHandler.utility.fromStance(this.data.belt.from, this.begin);
};

BasicsDetailsHandler.prototype.begin = function() {
	console.log('basicdetailshandler begin');
	mainHandler.basicsDetailsHandler.next(1);
};

BasicsDetailsHandler.prototype.next = function(direction) {
	console.log('basicdetailshandler next');
	if (direction === undefined) {
		direction = 1;
	}
	mainHandler.utility.removePI();
	this.index += direction;
	this.repeat = 0;
	if (this.index < this.data.belt.tech.length) {
		var belt = this.data.belt;
		var bs = belt.tech[this.index];
		this.textToSpeak = bs.name;
		if (this.textToSpeak === undefined) {
			mainHandler.utility.error(mainHandler.basicsDetailsHandler.next, 1,
					"basics", belt.id, this.index);
		} else {
			this.addOnTime = mainHandler.utility.get("basicsDelay");
			this.textToSpeak += ". Begin.";
			// update screen
			$("#bsBeltID").html(this.data.belt.description);
			$("#bsTechID").html(bs.name);
			$("#bsStepsID").html(bs.description);
			this.repeatBasic(true);
		}
	} else {
		mainHandler.utility.done("basics");
	}
};

BasicsDetailsHandler.prototype.repeatBasic = function(fullTitle) {
	console.log('basicdetailshandler repeatBasic');
	if (this.repeat < this.data.repeat) {
		this.repeat++;
		if (fullTitle == false) {
			var between = "";
			if(this.data.belt.between != undefined) {
				between = this.data.belt.between + ". ";
			}
			this.textToSpeak = between + this.repeat;
			this.addOnTime = 0;
		}
		$("#bsCountID").html(
				"Count: " + this.repeat + " of " + this.data.repeat);

		mainHandler.utility.speak(this.textToSpeak, this.speechCallback);
	} else {
		this.next(1);
	}
};

BasicsDetailsHandler.prototype.speechCallback = function(data) {
	console.log('basicdetailshandler speechCallback');
	if (data != undefined) {
		console.log(data);
	}
	var delay = Math
			.round(((mainHandler.basicsDetailsHandler.data.timer + mainHandler.basicsDetailsHandler.addOnTime)) * 1000 - 250);
	this.timer = setTimeout(function() {
		if (mainHandler.basicsDetailsHandler.keepGoing) {
			mainHandler.basicsDetailsHandler.repeatBasic(false);
		}
	}, delay);
};

BasicsDetailsHandler.prototype.togglePause = function() {
	console.log('basicdetailshandler togglePause');
	if (this.pauseShowing == true) {
		this.stop();
		this.keepGoing = false;
		this.pauseShowing = false;
		$("#bsPauseID").html("Resume");
	} else {
		this.keepGoing = true;
		this.pauseShowing = true;
		$("#bsPauseID").html("Pause");
		this.speechCallback("resume from pause");
	}
};

BasicsDetailsHandler.prototype.stop = function() {
	console.log('basicdetailshandler stop');
	this.keepGoing = false;
	if (this.timer != undefined) {
		clearTimeout(this.timer);
		this.timer = undefined;
	}
};

BasicsDetailsHandler.prototype.resume = function() {
	console.log('basicdetailshandler resume');
	this.speechCallback();
};

BasicsDetailsHandler.prototype.stopAndNext = function() {
	console.log('basicdetailshandler stopAndNext');
	this.index++;
	this.repeat = this.data.repeat;
	mainHandler.utility.showPI();
	// this.stop();
	// this.keepGoing = true;
	// this.next(1);
};