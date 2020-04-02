
/* JavaScript content from js/basicsHandler.js in folder common */
/**
 * handler for the sf selection window
 */

var BasicsHandler = function() {
	this.initialized = false;
	this.belts = undefined;
	
	$(document).on("pageshow", "#basics", function() {
		mainHandler.basicsHandler.show();
	});
};

BasicsHandler.prototype.backButton = function() {
	mainHandler.utility.changePage("home");
	this.belts = undefined;
};

BasicsHandler.prototype.initialize = function() {
	mainHandler.basicsDetailsHandler.stop();
	this.belts = mainHandler.utility.loadJSON('basics', 'basics');
	this.belts = this.belts.sort(function(a,b) {
		return (a.description > b.description)?1:-1;
	})
	// console.log(this.belts);
	
	if (this.initialized == false) {
		$("#bsBeltsID").change(function() {
			localStorage.bsBelt = $("#bsBeltsID").val();
		});
		$("#bsTimerID").change(function() {
			localStorage.bsTimer = "" + $("#bsTimerID").val();
		});
		$("#bsRepeatID").change(function() {
			localStorage.bsRepeat = "" + $("#bsRepeatID").val();
		});
		this.initialized = true;
	}
};

BasicsHandler.prototype.defaultSlider = function(id,value) {
	if(localStorage[id] === undefined) {
		localStorage[id] = value;
	}
	var v = Number(localStorage[id]);
	$("#" + id + "ID").val(v);
	$("#" + id + "ID").slider("refresh");
};

BasicsHandler.prototype.show = function() {
	this.initialize();

	mainHandler.currentHandler = this;
	this.defaultSlider("bsTimer","1");
	this.defaultSlider("bsRepeat","20");

	$("#bsBeltsID").empty();

	for (var i = 0; i < this.belts.length; i++) {
		var belt = this.belts[i];
		var desc = belt.description;
		var idx = belt.id;
		var newOption = "<option value='" + idx + "'>" + desc + "</option>";
		$("#bsBeltsID").append(newOption);
	}

	if (localStorage.bsBelt === undefined) {
		localStorage.bsBelt = this.belts[0].id;
	}
	$('#bsBeltsID').val(localStorage.bsBelt);
	$('#bsBeltsID').selectmenu('refresh');
};

BasicsHandler.prototype.getData = function() {
	var belt = undefined;
	if(this.initialized == false) {
		this.belts = mainHandler.utility.loadJSON('basics', 'basics');
	}
	for (var i = 0; i < this.belts.length; i++) {
		if (this.belts[i].id == localStorage.bsBelt) {
			belt = this.belts[i];
		}
	}
	var data = {
		"belt" : belt,
		"timer" : Number(localStorage.bsTimer),
		"repeat" : Number(localStorage.bsRepeat)
	};
	return data;
};