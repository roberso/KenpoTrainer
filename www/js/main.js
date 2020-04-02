
/* JavaScript content from js/main.js in folder common */
function wlCommonInit() {
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst
	 * Server is required. This API should be called only once, before any other
	 * WL.Client methods that communicate with the MobileFirst Server. Don't
	 * forget to specify and implement onSuccess and onFailure callback
	 * functions for WL.Client.connect(), e.g:
	 * 
	 * WL.Client.connect({ onSuccess: onConnectSuccess, onFailure:
	 * onConnectFailure });
	 * 
	 */

	// Common initialization code goes here
}

var mainHandler = new MainHandler();

function go() {
	var tech = mainHandler.utility.loadJSON('tech', 'index');

	tech.sort(compareTech);
	var techIdx = {};

	for (var ti = 0; ti < tech.length; ti++) {
		techIdx[tech[ti].id] = ti;
	}

	var t16 = mainHandler.utility.loadJSON('predefined', '24Tech');

	console.log(t16.description);
	for (var i = 0; i < t16.belts.length; i++) {
		var belt = t16.belts[i];
		if (belt.tech.length == 0) {
			console.log("  " + belt.description);
			var baseTech = findBase(belt.extension, t16);
			for (var bt = 0; bt < baseTech.tech.length; bt++) {
				var ext = findExt(baseTech.tech[bt], tech, techIdx);
				if (ext === undefined) {
					var btID = baseTech.tech[bt];
					var tID = techIdx[btID];
					var missing = tech[tID];
					var newName = missing.name + " With Extension";
					var newID = findNewID(missing.id, newName, tech, techIdx);
					var newObject = {
						id : newID,
						extension : "true",
						name : newName,
						attack : missing.attack
					};
					belt.tech.push(newID);
					tech.push(newObject);
					techIdx[newObject.id] = tech.length - 1;
				} else {
					belt.tech.push(ext.id);
				}
			}
		}
	}
	console.log("******");
	console.log(JSON.stringify(t16, null, 3));
	console.log("******");
	console.log(JSON.stringify(tech, null, 3));
	console.log("******");
}

function findNewID(id, newName, tech, techIdx) {
	var matches = newName.match(/\b(\w)/g);
	var acronym = matches.join('').toLowerCase();
	var done = false;
	var idx = 0;
	var newID = acronym;
	while (!done) {
		if (techIdx[newID] === undefined) {
			done = true;
		} else {
			idx++;
			newID = acronym + "-" + idx;
		}
	}
	return newID;
}

function findExt(id, tech, idIndex) {
	var newName = tech[idIndex[id]].name + " With Extension";
	for (var i = 0; i < tech.length; i++) {
		if (tech[i].name == newName) {
			return tech[i];
		}
	}
	return undefined;
}

function findBase(id, sys) {
	for (var i = 0; i < sys.belts.length; i++) {
		if (sys.belts[i].id == id) {
			return sys.belts[i];
		}
	}
	return undefined;
}

function goVerify(sys) {
	var tech = mainHandler.utility.loadJSON('tech', 'index');

	tech.sort(compareTech);
	var techIdx = {};

	for (var ti = 0; ti < tech.length; ti++) {
		techIdx[tech[ti].id] = ti;
	}

	var t16 = mainHandler.utility.loadJSON('predefined', sys);

	console.log(t16.description);
	for (var i = 0; i < t16.belts.length; i++) {
		var belt = t16.belts[i];
		console.log("  " + belt.description);
		for (var b = 0; b < belt.tech.length; b++) {
			var t = belt.tech[b];
			var x = techIdx[t];
			var output = "** not found **";
			if (x != undefined) {
				output = tech[x].name + " (" + tech[x].attack + ")";
			}
			console.log("    " + (b + 1) + ". " + t + " " + output);
		}
	}
}
/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}