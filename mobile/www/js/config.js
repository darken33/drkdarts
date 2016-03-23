/**
 * config.js : Script de gestion de la config de "Darts Contest"
 * 
 * Par Philippe Bousquet <darken33.free.fr>
 * Ce logiciel est sous license GNU Genral Public License v3.0
 */ 

var cfgLoaded = 0;
var cfgToLoad = 7;
var game_options = { "name" : "Player 1", "helponstart" : true, "soundactive" : true, "sharescore" : false, "lang" : "en", "difficulty" : "2", "type" : "4" };
var new_install = true;

/**
 * La config est elle chargée
 */ 
function isConfigLoaded() {
	return (cfgLoaded == cfgToLoad);
}

/**
 * Chargement de la config
 */ 
function loadConfig() {
	if (isFirefoxOS()) {
		asyncStorage.getItem('name', function(value) {
			cfgLoaded++;
			if (value != null) {
				new_install = false;
				game_options.name=value;
			}
			activateApp();
		}); 
		asyncStorage.getItem('helponstart', function(value) {
			cfgLoaded++;
			if (value != null) {
				new_install = false;
				game_options.helponstart=(value=="true");
			}
			activateApp();
		}); 
		asyncStorage.getItem('soundactive', function(value) {
			cfgLoaded++;
			if (value != null) {
				new_install = false;
				game_options.soundactive=(value=="true");
			}
			activateApp();
		}); 
		asyncStorage.getItem('sharescore', function(value) {
			cfgLoaded++;
			if (value != null) {
				new_install = false;
				game_options.sharescore=(value=="true");
			}
			activateApp();
		}); 
		asyncStorage.getItem('lang', function(value) {
			cfgLoaded++;
			if (value != null) {
				new_install = false;
				game_options.lang=value;
			}
			activateApp();
		}); 
		asyncStorage.getItem('difficulty', function(value) {
			cfgLoaded++;
			if (value != null) {
				new_install = false;
				game_options.difficulty=value;
			}
			activateApp();
		}); 
		asyncStorage.getItem('type', function(value) {
			cfgLoaded++;
			if (value != null) {
				new_install = false;
				game_options.type=value;
			}
			activateApp();
		}); 
	}
	else {
		var name = window.localStorage.getItem('name'); 
		var helponstart = window.localStorage.getItem('helponstart'); 
		var soundactive = window.localStorage.getItem('soundactive'); 
		var sharescore = window.localStorage.getItem('sharescore'); 
		var lang = window.localStorage.getItem('lang'); 
		var difficulty = window.localStorage.getItem('difficulty'); 
		var type = window.localStorage.getItem('type'); 
		if (name != null) game_options.name = name;
		if (helponstart != null) game_options.helponstart = (helponstart == "true");
		if (soundactive != null) game_options.soundactive = (soundactive == "true");
		if (sharescore != null) game_options.sharescore = (sharescore == "true");
		if (lang != null) game_options.lang = lang;
		if (difficulty != null) game_options.difficulty = difficulty;
		if (type != null) game_options.type = type;
		cfgLoaded = cfgToLoad;
		activateApp()
	}
}

/**
 * Sauvegarder la config
 */
function saveConfig() {
	if (isFirefoxOS()) {
		asyncStorage.setItem('name', game_options.name, function(value) { }); 
		asyncStorage.setItem('helponstart', (game_options.helponstart ? "true" : "false"), function(value) { }); 
		asyncStorage.setItem('soundactive', (game_options.soundactive ? "true" : "false"), function(value) { }); 
		asyncStorage.setItem('sharescore', (game_options.sharescore ? "true" : "false"), function(value) { }); 
		asyncStorage.setItem('lang', game_options.lang, function(value) { }); 
		asyncStorage.setItem('difficulty', ""+game_options.difficulty, function(value) { }); 
		asyncStorage.setItem('type', ""+game_options.type, function(value) { }); 
	}
	else {
		window.localStorage.setItem('name', game_options.name); 
		window.localStorage.setItem('helponstart', (game_options.helponstart ? "true" : "false")); 
		window.localStorage.setItem('soundactive', (game_options.soundactive ? "true" : "false")); 
		window.localStorage.setItem('sharescore', (game_options.sharescore ? "true" : "false")); 
		window.localStorage.setItem('lang', game_options.lang); 
		window.localStorage.setItem('difficulty', ""+game_options.difficulty); 
		window.localStorage.setItem('type', ""+game_options.type); 
	}
}
