
/* JavaScript content from js/formsHandler.js in folder common */
/**
 * handler for the forms selection window
 */

var FormsHandler = function() {
	this.initialized = false;
	this.index = undefined;
	$(document).on("pageshow", "#forms", function() {
		mainHandler.formsHandler.show();
	});
};

FormsHandler.prototype.backButton = function() {
	mainHandler.utility.changePage("home");
	this.index = undefined;
};

FormsHandler.prototype.initialize = function() {
	mainHandler.formsDetailsHandler.stop();
	this.index = mainHandler.utility.loadJSON('setsAndForms', 'SetsAndForms');
	console.log(this.index);
	
	if (this.initialized == false) {
		$("#fmListID").change(function() {
			localStorage.fmListID = $("#fmListID").val();
		});
		$("#fmTimerID").change(function() {
			localStorage.fmTimerID = $("#fmTimerID").val();
		});
		$("#fmRepeatID").change(function() {
			localStorage.fmRepeatID = "" + $("#fmRepeatID").val();
		});
		$("#fmSpeakNamesID").change(function() {
			localStorage.fmSpeakNamesID = "" + $("#fmSpeakNamesID").val();
		});
		this.initialized = true;
	}
};

FormsHandler.prototype.show = function() {
	this.initialize();
	mainHandler.currentHandler = this;
	mainHandler.utility.defaultSlider("fmTimerID", "5");
	mainHandler.utility.defaultSlider("fmRepeatID", "3");

	$("#fmListID").empty();
	for (var i = 0; i < this.index.length; i++) {
		var desc = this.index[i].name;
		var id = this.index[i].id;
		var newOption = "<option value='" + id + "'>" + desc + "</option>";
		$("#fmListID").append(newOption);
	}

	if (localStorage.fmListID === undefined) {
		localStorage.fmListID = this.index[0].id;
	}

	if (localStorage.fmSpeakNamesID === undefined) {
		localStorage.fmSpeakNamesID = "on";
	}

	$('#fmListID').val(localStorage.fmListID);
	$('#fmListID').selectmenu('refresh');
	$('#fmSpeakNamesID').val(localStorage.fmSpeakNamesID);
	$('#fmSpeakNamesID').slider('refresh');
};

FormsHandler.prototype.begin = function() {
//	var warn = false;
//	var form = undefined;
//	for (var i = 0; i < this.index.length; i++) {
//		if (this.index[i].id == localStorage.fmListID) {
//			form = this.index[i];
//		}
//	}
//
//	if (localStorage.fmSpeakNamesID == "on") {
//		if (form.suggestedSpeachTime != undefined) {
//			if (Number(localStorage.fmTimerID) < form.suggestedSpeachTime) {
//				if (form.style == "complex") {
//					warn = true;
//				}
//			}
//		}
//	}
//
//	if (warn) {
//		WL.SimpleDialog.show(Messages.title, Messages.isThatEnoughTime, [ {
//			text : Messages.yes,
//			handler : function() {
//				mainHandler.utility.changePage("formsDetails");
//			},
//			text : Messages.no,
//			handler : function() {
//			}
//		} ]);
//	} else {
		mainHandler.utility.changePage("formsDetails");
//	}
};

FormsHandler.prototype.getData = function() {
	var form = undefined;
	for (var i = 0; i < this.index.length; i++) {
		if (this.index[i].id == localStorage.fmListID) {
			form = this.index[i];
		}
	}
	var timer = Number(localStorage.fmTimerID);
	// if (form.suggestedSpeachTime != undefined) {
	// timer += form.suggestedSpeachTime;
	// }

	var data = {
		"form" : form,
		"timer" : timer,
		"repeat" : Number(localStorage.fmRepeatID),
		"speakNames" : localStorage.fmSpeakNamesID
	};
	return data;
};