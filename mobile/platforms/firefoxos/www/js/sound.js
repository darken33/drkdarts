/**
 * sound.js : Script de gestion sonore de "Darts Contest"
 * 
 * Par Philippe Bousquet <darken33.free.fr>
 * Ce logiciel est sous license GNU Genral Public License v3.0
 */ 

var sound_loaded = 0;
var dart_snd = "/android_asset/www/sounds/dartShot.mp3";
var m_dart;
var player1_snd = "/android_asset/www/sounds/player1.mp3";
var m_player1;
var player2_snd = "/android_asset/www/sounds/player2.mp3";
var m_player2;
var wait_snd = "/android_asset/www/sounds/wait.mp3";
var m_wait;
var ready_snd = "/android_asset/www/sounds/ready.mp3";
var m_ready;
var shoot_snd = "/android_asset/www/sounds/shoot.mp3";
var m_shoot;
var centre_snd = "/android_asset/www/sounds/centre.mp3";
var m_centre;
var simple_snd = "/android_asset/www/sounds/simple.mp3";
var m_simple;
var double_snd = "/android_asset/www/sounds/double.mp3";
var m_double;
var triple_snd = "/android_asset/www/sounds/triple.mp3";
var m_triple;
var buzzer_snd = "/android_asset/www/sounds/buzzer.mp3";
var m_buzzer;
var congrat_snd = "/android_asset/www/sounds/congratulation.mp3";
var m_congrat;

function soundLoaded() {
	console.log('play sound.');
}

function isSoundReady() {
	return (sound_loaded == 12);
}

function soundErr(err) {
	alert(err);
}

function loadSounds() {
	if (isFirefoxOS()) {
		m_dart = document.getElementById("dart_snd");
		m_player1 = document.getElementById("player1_snd");
		m_player2 = document.getElementById("player2_snd");
		m_wait = document.getElementById("wait_snd");
		m_ready = document.getElementById("ready_snd");
		m_shoot = document.getElementById("shoot_snd");
		m_centre = document.getElementById("centre_snd");
		m_simple = document.getElementById("simple_snd");
		m_double = document.getElementById("double_snd");
		m_triple = document.getElementById("triple_snd");
		m_buzzer = document.getElementById("buzzer_snd");
		m_congrat = document.getElementById("congrat_snd");
		sound_loaded = 12;
	}
	else {
		m_dart = new Media(dart_snd, soundLoaded, soundErr);
		m_player1 = new Media(player1_snd, soundLoaded, soundErr);
		m_player2 = new Media(player2_snd, soundLoaded, soundErr);
		m_wait = new Media(wait_snd, soundLoaded, soundErr);
		m_ready = new Media(ready_snd, soundLoaded, soundErr);
		m_shoot = new Media(shoot_snd, soundLoaded, soundErr);
		m_centre = new Media(centre_snd, soundLoaded, soundErr);
		m_simple = new Media(simple_snd, soundLoaded, soundErr);
		m_double = new Media(double_snd, soundLoaded, soundErr);
		m_triple = new Media(triple_snd, soundLoaded, soundErr);
		m_buzzer = new Media(buzzer_snd, soundLoaded, soundErr);
		m_congrat = new Media(congrat_snd, soundLoaded, soundErr);
		sound_loaded = 12;
	}
}
