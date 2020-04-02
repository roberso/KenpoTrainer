/* JavaScript content from js/util.js in folder common */
/**
 * 
 */

var Util = function () {
	console.log("utility ctor");
	this.busyIsVisible = false;
};

Util.prototype.defaultSlider = function (id, value) {
	if (localStorage[id] === undefined) {
		localStorage[id] = value;
	}
	var v = Number(localStorage[id]);
	$("#" + id + "ID").val(v);
	$("#" + id + "ID").slider("refresh");
};

Util.prototype.defaultSetting = function (name, value) {
	if (localStorage[name] === undefined) {
		this.set(name, value);
	}
};

Util.prototype.set = function (name, value) {
	localStorage[name] = '' + value;
};

Util.prototype.get = function (name) {
	return Number(localStorage[name]);
};

Util.prototype.loadJSON = function (type, db) {
	var response = $.ajax({
		dataType: "json",
		url: "data/" + type + "/" + db + ".json",
		failure: function (data) {
			navigator.notification.alert(
				'error loading data file, please contact developer',
				null,
				Messages.title,
				Messages.ok
			);
		},
		async: false
	});

	// console.log(response.responseText);
	return JSON.parse(response.responseText);
};

Util.prototype.error = function (callback, callbackparam, section, id, parameter) {
	var msg = Messages.error1 + section + Messages.error2 + id +
		Messages.error2 + parameter + Messages.error3 +
		Messages.supportEmail + Messages.error4;

	navigator.notification.alert(
		msg,
		function () {
			if(callback) {
			callback(callbackparam);
			}
		},
		Messages.title,
		Messages.ok
	);
};

Util.prototype.removePI = function () {
	if (this.busyIsVisible) {
		console.log("removing pi");
		this.busyIsVisible = false;
		$.mobile.loading("hide");
	}
};

Util.prototype.showPI = function () {
	if (this.busyIsVisible == false) {
		console.log("showing pi");
		this.busyIsVisible = true;
		$.mobile.loading("show");
	}
};

Util.prototype.speak = function (text, callback) {
	TTS.speak({
		text: text
	}, function () {
		console.log('speech successful');
		callback();
	}, function (reason) {
		console.log(reason);
		callback();
	});
};

Util.prototype.fromStance = function (text, callback) {
	this.speak(text);
	var time = (mainHandler.utility.get("beginDelay") * 1000);
	setTimeout(callback, time);
};

Util.prototype.changePage = function (page) {
	$.mobile.changePage("#" + page);
};

Util.prototype.random = function (min, max) {
	var range = max - min;
	return Math.floor(Math.random() * range) + min;
};

Util.prototype.shuffle = function (array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

Util.prototype.done = function (page) {
	var idx = this.random(0, Messages.trainingComplete.length - 1);
	var text = Messages.trainingComplete[idx];
	this.speak(text);
	alert(text);
	mainHandler.utility.changePage(page);

	navigator.notification.alert(
		text,
		function(){
			mainHandler.utility.changePage(page);
		},
		Messages.title,
		Messages.ok         
	);
};

function compareTech(a, b) {
	if (a.id < b.id) {
		return -1;
	}
	if (a.id > b.id) {
		return 1;
	}
	// a must be equal to b
	return 0;
};