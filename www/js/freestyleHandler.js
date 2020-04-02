
/* JavaScript content from js/freestyleHandler.js in folder common */
/**
 * handler for the freestyle selection window
 */

var FreestyleHandler = function() {
	this.initialized = false;
	this.belts = undefined;
	
	$(document).on("pageshow", "#freestyle", function() {
		mainHandler.freestyleHandler.show();
	});
};

FreestyleHandler.prototype.backButton = function() {
	mainHandler.utility.changePage("home");
	this.belts = undefined;
};

FreestyleHandler.prototype.initialize = function() {
	mainHandler.freestyleDetailsHandler.stop();
	this.belts = mainHandler.utility.loadJSON('freestyle', 'freestyle');
	console.log(this.belts);
	
	if (this.initialized == false) {
		$("#fsBeltsID").change(function() {
			localStorage.fsBelt = $("#fsBeltsID").val();
		});
		$("#fsTimerID").change(function() {
			localStorage.fsTimer = "" + $("#fsTimerID").val();
		});
		$("#fsRepeatID").change(function() {
			localStorage.fsRepeat = "" + $("#fsRepeatID").val();
		});
		this.initialized = true;
	}
};

FreestyleHandler.prototype.defaultSlider = function(id,value) {
	if(localStorage[id] === undefined) {
		localStorage[id] = value;
	}
	var v = Number(localStorage[id]);
	$("#" + id + "ID").val(v);
	$("#" + id + "ID").slider("refresh");
};

FreestyleHandler.prototype.show = function() {
	this.initialize();

	mainHandler.currentHandler = this;
	this.defaultSlider("fsTimer","5");
	this.defaultSlider("fsRepeat","3");

	$("#fsBeltsID").empty();

	for (var i = 0; i < this.belts.length; i++) {
		var belt = this.belts[i];
		var desc = belt.description;
		var idx = belt.id;
		var newOption = "<option value='" + idx + "'>" + desc + "</option>";
		$("#fsBeltsID").append(newOption);
	}

	if (localStorage.fsBelt === undefined) {
		localStorage.fsBelt = this.belts[0].id;
	}
	$('#fsBeltsID').val(localStorage.fsBelt);
	$('#fsBeltsID').selectmenu('refresh');
};

FreestyleHandler.prototype.getData = function() {
	var belt = undefined;
	for (var i = 0; i < this.belts.length; i++) {
		if (this.belts[i].id == localStorage.fsBelt) {
			belt = this.belts[i];
		}
	}
	var data = {
		"belt" : belt,
		"timer" : Number(localStorage.fsTimer),
		"repeat" : Number(localStorage.fsRepeat)
	};
	return data;
};