
/* JavaScript content from js/techHandler.js in folder common */
/**
 * handler for the tech selection window
 */

var TechHandler = function() {
	this.initialized = false;
	this.index = undefined;
	$(document).on("pageshow", "#techniques", function() {
		mainHandler.techHandler.show();
	});
};

TechHandler.prototype.backButton = function() {
	mainHandler.utility.changePage("home");
	this.index = undefined;
};

TechHandler.prototype.initialize = function() {
	mainHandler.techDetailsHandler.stop();
	this.index = mainHandler.utility.loadJSON('predefined', 'techIndex');
	console.log(this.index);
	for (var i = 0; i < this.index.length; i++) {
		var idx = this.index[i];
		this.index[idx] = mainHandler.utility.loadJSON('predefined', idx);
		console.log(this.index[idx]);
	}
	
	if (this.initialized == false) {
		$("#techGroupingID").change(function() {
			localStorage.techGroup = $("#techGroupingID").val();
			mainHandler.techHandler.setBelts();
		});
		$("#techBeltsID").change(function() {
			localStorage.techBelt = $("#techBeltsID").val();
		});
		$("#techTimerID").change(function() {
			localStorage.techTimer = "" + $("#techTimerID").val();
		});
		$("#techRepeatID").change(function() {
			localStorage.techRepeat = "" + $("#techRepeatID").val();
		});
		$("#techOrderID").change(function() {
			localStorage.techOrder = "" + $("#techOrderID").val();
		});
		$("#tdSpeakAttack").change(function() {
			localStorage.techSpeakAttack = "" + $("#tdSpeakAttack").val();
		});
		this.initialized = true;
	}
};

TechHandler.prototype.defaultSlider = function(id, value) {
	if (localStorage[id] === undefined) {
		localStorage[id] = value;
	}
	var v = Number(localStorage[id]);
	$("#" + id + "ID").val(v);
	$("#" + id + "ID").slider("refresh");
};

TechHandler.prototype.show = function() {
	this.initialize();
	mainHandler.currentHandler = this;
	this.defaultSlider("techTimer", "5");
	this.defaultSlider("techRepeat", "3");

	$("#techGroupingID").empty();
	for (var i = 0; i < this.index.length; i++) {
		var idx = this.index[i];
		var desc = this.index[idx].description;
		var newOption = "<option value='" + idx + "'>" + desc + "</option>";
		$("#techGroupingID").append(newOption);
	}

	if (localStorage.techGroup === undefined) {
		localStorage.techGroup = this.index[0];
	}

	if (localStorage.techOrder === undefined) {
		localStorage.techOrder = "tdStandard";
	}
	if (localStorage.techSpeakAttack === undefined) {
		localStorage.techSpeakAttack = "on";
	}

	$('#techGroupingID').val(localStorage.techGroup);
	$('#techGroupingID').selectmenu('refresh');
	$('#techOrderID').val(localStorage.techOrder);
	$('#techOrderID').selectmenu('refresh');
	$('#tdSpeakAttack').val(localStorage.techSpeakAttack);
	$('#tdSpeakAttack').slider('refresh');

	this.setBelts();
};

TechHandler.prototype.setBelts = function() {
	var idx = $("#techGroupingID").val();
	var group = this.index[idx];
	$("#techBeltsID").empty();

	for (var i = 0; i < group.belts.length; i++) {
		var belt = group.belts[i];
		var desc = belt.description;
		var idx = belt.id;
		var newOption = "<option value='" + idx + "'>" + desc + "</option>";
		$("#techBeltsID").append(newOption);
	}

	if (localStorage.techBelt === undefined) {
		localStorage.techBelt = group.belts[0].id;
	}
	$('#techBeltsID').val(localStorage.techBelt);
	$('#techBeltsID').selectmenu('refresh');
};

TechHandler.prototype.getData = function() {
	var group = this.index[localStorage.techGroup];
	var belt = undefined;
	for (var i = 0; i < group.belts.length; i++) {
		if (group.belts[i].id == localStorage.techBelt) {
			belt = group.belts[i];
		}
	}

	var newBelt = {
		"id" : belt.id,
		"description" : belt.description
	};
	if (localStorage.techOrder == "tdReverse") {
		newBelt.tech = belt.tech.slice().reverse();
	} else if (localStorage.techOrder == "tdRandom") {
		newBelt.tech = belt.tech.slice();
		newBelt.tech = mainHandler.utility.shuffle(newBelt.tech);
	} else {
		newBelt.tech = belt.tech;
	}

	var data = {
		"group" : group,
		"belt" : newBelt,
		"timer" : Number(localStorage.techTimer),
		"repeat" : Number(localStorage.techRepeat)
	};
	return data;
};