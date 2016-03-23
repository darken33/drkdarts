/**
 * accel.js : Script de gestion de l'accéléromètre de "Darts Contest"
 * 
 * Par Philippe Bousquet <darken33.free.fr>
 * Ce logiciel est sous license GNU Genral Public License v3.0
 */ 

// Position de départ
var initialReading = {
    x: null,
    y: null,
    z: null
}
var mult = 20;
/**
 * updateAcceleration() 
 */ 			
function updateAcceleration(a) {
	
	if (initialReading.x == null) {
		initialReading.x = a.x;
		initialReading.y = a.y;
		initialReading.z = a.z;
	}
	// Calculer le déplacement sur x et y
	speedX = (Math.round((a.x - initialReading.x) *mult) * -1);
	speedY = Math.round((a.y - initialReading.y) * mult);
	viseurX += speedX;
	viseurY += speedY;
	if (viseurX < 0) viseurX = 0;
	if (viseurX > width) viseurX = width;
	if (viseurY < height/2 - 240) viseurY = height/2 - 240;
	if (viseurY > height/2 + 240) viseurY = height/2 + 240;
	viseur.x = viseurX -24;
	viseur.y = viseurY -24;
}

/**
 * startWatch() - initialisation de l'accelerometre
 */ 		
var watchID;
function startWatch() {
	mult = 5 * parseInt(game_options.difficulty) + 5;
	var options = { frequency: 25 };  // Update acceleration every quarter second
	watchID = navigator.accelerometer.watchAcceleration(updateAcceleration, function onError() {
		console.log('Some problem has occurred in reading the accelerometer.');
	}, options);
}
 
/**
 * stopWatch() - arret de l'accelerometre
 */  
function stopWatch() {
  if (watchID) {
	initialReading.x = null;
	initialReading.y = null;
	initialReading.z = null;
    navigator.accelerometer.clearWatch(watchID);
    watchID = null;
  }
}
