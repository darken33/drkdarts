/**
 * accel.js : Script de gestion du canvas de "Darts Contest"
 * 
 * Par Philippe Bousquet <darken33.free.fr>
 * Ce logiciel est sous license GNU Genral Public License v3.0
 */ 
var	manifest = [
	{src:"images/bg_sgp.png", id:"back"},
	{src:"images/cible.png", id:"cible"},
	{src:"images/dart.png", id:"dart"},
	{src:"images/dart_lc.png", id:"dart_lc"},
	{src:"images/bullet_hole.png", id:"hole"},
	{src:"images/viseur.png", id:"viseur"}
];

/* Taille de l'écran */
var width;
var height;
/* Les divers objets du canvas */
var ground;
var stage;
var cible;
var cibleImg;
var cibleLength = 158;
var dart = [];
var dartImg;
var dart_lc;
var dart_lcPlan;
var dart_lcImg;
var holesPlan;
var hole = [];
var nbholes = 0
var holeImg;
var viseur;
var viseurImg;
var viseurX;
var viseurY;
var nbtirs_j1 = 0;
var nbtirs_j2 = 0;
var startTime = 0;
var stopTime = 0;
var timerG = 5000;
var score = 0;
var scoreTmp = 0;
var score_j1 = 0;
var row_j1 = 0;
var score_j2 = 0;
var row_j2 = 0;
var scoreManche = 0;
var second = 1000;
var nbjoueurs = 1;
var joueur=1;
var tshoot = 0;

/* gestion du canvas */
var canvasLoaded = false;
var scale = 1;
var xMin=55;
var xCen=0;
var hWidth=0;
var xMax=325;
var yMax=800;
var yMin=-210;
var timer=0;
var timer_thread=null;
var option_valide=false;
var hWindow = 0;


/**
 * Initiailisation du canvas
 */ 
function initCanvas() {
	stage = new createjs.Stage("myCanvas");
	// on conserve la taille originale
	width = stage.canvas.width;
	height = stage.canvas.height;
	// On charge les images
	loader = new createjs.LoadQueue(false);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest);
	// On aplique la taille de l'ecran et on calcule le facteur de scale
	$("#myCanvas").attr("height",window.innerHeight);
	if (window.innerWidth >= 1024) { 
		$("#myCanvas").attr("width",1024);
		scale=1024/480;
		icon=128;
	}
	if (window.innerWidth < 1024) {
		$("#myCanvas").attr("width",800);
		scale=800/480;
		icon=128;
	}
	if (window.innerWidth < 800) {
		$("#myCanvas").attr("width",720);
		scale=720/480;
		icon=128;
	}
	if (window.innerWidth < 720) {
		$("#myCanvas").attr("width",640);
		scale=640/480;
		icon=128;
	}
	if (window.innerWidth < 640) {
		$("#myCanvas").attr("width",600);
		scale=600/480;
		icon=128;
	}	
	if (window.innerWidth < 600) {
		$("#myCanvas").attr("width",512);
		scale=512/480;
		icon=64;
	}	
	if (window.innerWidth < 512) {
		$("#myCanvas").attr("width",480);
		scale=480/480;
		icon=64;
	}	
	if (window.innerWidth < 480) {
		$("#myCanvas").attr("width",400);
		scale=400/480;
		icon=64;
	}	
	if (window.innerWidth < 400) {
		$("#myCanvas").attr("width",320);
		scale=320/480;
		icon=64;
	}	
	if (window.innerWidth < 320) {
		$("#myCanvas").attr("width",240);
		scale=240/480;
		icon=32;
	}	
	hWindow = Math.floor(window.innerWidth / 2);
	hIcon = Math.floor(window.innerWidth * 0.8);
	bIcon = hWindow;
	pIcon = Math.floor(window.innerWidth * 0.2);
	hxIcon=Math.floor(icon/2);
}

/**
 * Le canvas est initialisé
 */
function handleComplete() {
	canvasLoaded = true;
	var groundImg = loader.getResult("back");
	// corriger le bug sur android de double affichage du canvas
	ground = new createjs.Shape();
	ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, stage.canvas.width, stage.canvas.height);
	ground.y = 0;
	ground.x = 0;
	cibleImg = loader.getResult("cible");
	cible = new createjs.Bitmap(cibleImg);
	cible.x = (width - cibleImg.width) / 2;
	cible.y = (height - cibleImg.height) / 2;
	dartImg = loader.getResult("dart");
	dart_lcImg = loader.getResult("dart_lc");
	dart_lc = new createjs.Bitmap(dart_lcImg);
	holeImg = loader.getResult("hole");
	viseurImg = loader.getResult("viseur");
    stage.scaleX = scale;
    stage.scaleY = scale;
}

/**
 * Démarrer la partie
 */
function demarre(nbj) {
	nbjoueurs=nbj;
	$("#message").html(texte_wait[game_options.lang]);
//	if (game_options.soundactive) m_wait.play();
	holesPlan = new createjs.Container();
	dart_lcPlan = new createjs.Container();
	// correction du bug de double affichage sur Android
	stage.addChild(ground, cible, holesPlan, dart_lcPlan);
	score_j1=(game_options.type=="1" || game_options.type=="2" ? 301 : 501);
	nbtirs_j1 = 0;
	row_j1=0;
	score_j2=0;
	nbtirs_j2 = 0;
	row_j2=0;
	$("#score_j1").html(score_j1);
	// on crée la boucle
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.addEventListener("tick", tick);
	if (nbjoueurs == 2) {
		score_j2=(game_options.type=="1" || game_options.type=="2" ? 301 : 501);
		joueur=2;
		setTimeout(changePlayer, 1*second);			
	}
	else {
		joueur=1;
		setTimeout(initRow, 1*second);			
	}
}	

/**
 * On change de joueur
 */
function changePlayer() {
	joueur = (joueur == 2 ? 1 : 2);
	$("#message").html((joueur == 2 ? texte_player2[game_options.lang] : texte_player1[game_options.lang]));
	if (game_options.soundactive) {
		if (joueur == 2) m_player2.play();
		else m_player1.play();
	}
	setTimeout(initRow, 2*second);			
}
  
/**
 * On entemme une série
 */ 
function initRow() {
	$("#message").html(texte_wait[game_options.lang]);
	if (game_options.soundactive) m_wait.play();
	nbtirsManche=0;
	nbholes = 0;
	if (joueur==2) row_j2++;
	else row_j1++;
	scoreManche = 0;
	var bx=20;
	for (i = 0; i < 3; i++) {
		dart[i] = new createjs.Bitmap(dartImg);
		dart[i].x = bx;
		dart[i].y = height - dartImg.height - 5;
		bx += dartImg.width + 10;
		stage.addChild(dart[i]);
	}
	$("#row_j1").html(row_j1);
	$("#score_j1").html(score_j1);
	$("#row_j2").html(row_j2);
	$("#score_j2").html(score_j2);
	holesPlan.removeAllChildren();
	setTimeout(initShoot, 2*second);			
}

/**
 * Initialisation d'un tir
 */ 
function initShoot() {
	$("#score_box").html(scoreManche);
	$("#message").html(texte_ready[game_options.lang]);
	if (game_options.soundactive) m_ready.play();
	setTimeout(startViseur, 2*second);			
}

/**
 * On met en route le viseur
 */ 
function startViseur() {
	$("#message").html(texte_shoot[game_options.lang]);
	if (game_options.soundactive) m_shoot.play();
	viseur = new createjs.Bitmap(viseurImg);
	viseurX = Math.round(Math.random() * width);
	viseurY = Math.round(Math.random() * 480 + (height/2 - 240));
	viseur.x = viseurX - 24;
	viseur.y = viseurY - 24;
	stage.addChild(viseur);
	startWatch();		
	$('#game').bind("tap", shoot);
	startTime = (new Date()).getTime();
}

/**
 * La fléchette est lancée
 */ 
function shoot() {
	stopWatch();
	stopTime = (new Date()).getTime();
	if (game_options.soundactive) m_dart.play();
//	setTimeout(function() {
//		$("#message").html(texte_wait[game_options.lang]);
//		if (game_options.soundactive) m_wait.play();
//	}, 1*second);
	stage.removeChild(viseur);
	hole[nbholes] = new createjs.Bitmap(holeImg);
	hole[nbholes].x = viseurX - 4;
	hole[nbholes].y = viseurY - 4;
	holesPlan.addChild(hole[nbholes]);
	dart_lc.x = viseurX - 7;
	dart_lc.y = viseurY - dart_lcImg.height + 6;
	dart_lcPlan.addChild(dart_lc);
	nbholes++;
	$('#game').unbind("tap");
	$("message").removeClass("opacity10");
	$("score_box").removeClass("opacity10");
	$("score_j1").removeClass("opacity10");
	$("score_j2").removeClass("opacity10");
	$("row_j1").removeClass("opacity10");
	$("row_j2").removeClass("opacity10");
	if (joueur==2) nbtirs_j2++;
	else nbtirs_j1++;
	nbtirsManche++;
	stage.removeChild(dart[3-nbtirsManche]);
	calculeScore();
	$("#score_box").html(scoreManche);
	setTimeout(function() {
		dart_lcPlan.removeAllChildren();
		if (nbtirsManche < 3) {
			stage.update();
			if ((joueur == 2 ? score_j2 : score_j1) - scoreManche == 1 && 
				(game_options.type == "2" || game_options.type == "4")) {
				if (game_options.soundactive) m_buzzer.play();
				if (nbjoueurs == 2)	setTimeout(changePlayer, 1*second);
				else setTimeout(initRow, 1*second);
			}
			else if ((joueur == 2 ? score_j2 : score_j1) - scoreManche == 0) {
				if (tshoot != 2 && 	(game_options.type == "2" || game_options.type == "4")) {
					if (game_options.soundactive) m_buzzer.play();
					if (nbjoueurs == 2)	setTimeout(changePlayer, 1*second);
					else setTimeout(initRow, 1*second);
				}
				else {
					score+=scoreTmp;
					endGame();
				}
			}
			else if ((joueur == 2 ? score_j2 : score_j1) - scoreManche < 0) {
				if (game_options.soundactive) m_buzzer.play();
				if (nbjoueurs == 2)	setTimeout(changePlayer, 1*second);
				else setTimeout(initRow, 1*second);
			}
			else setTimeout(initShoot, 3*second);			
		}
		else {
			if (joueur == 2) {
				if (score_j2 - scoreManche == 1 && 
					(game_options.type == "2" || game_options.type == "4")) {
					if (game_options.soundactive) m_buzzer.play();
				}
				else if (score_j2 - scoreManche == 0 && tshoot != 2 &&
						(game_options.type == "2" || game_options.type == "4")) { 
					if (game_options.soundactive) m_buzzer.play();
				}
				else if (score_j2 - scoreManche >= 0) {
					score_j2-=scoreManche;
				}	
				else if (game_options.soundactive) m_buzzer.play();
			}
			else {
				if (score_j1 - scoreManche == 1 && 
					(game_options.type == "2" || game_options.type == "4")) {
					if (game_options.soundactive) m_buzzer.play();
				}
				else if (score_j1 - scoreManche == 0 && tshoot != 2 && 
						(game_options.type == "2" || game_options.type == "4")) { 
					if (game_options.soundactive) m_buzzer.play();
				}
				else if (score_j1 - scoreManche >= 0) {
					score_j1-=scoreManche;
					score+=scoreTmp;
				}	
				else if (game_options.soundactive) m_buzzer.play();
			}
			$("#row_j1").html(row_j1);
			$("#score_j1").html(score_j1);
			$("#row_j2").html(row_j2);
			$("#score_j2").html(score_j2);
			stage.update();
			if (score_j1 == 0 || (score_j2 == 0 && nbjoueurs == 2)) endGame();
			else {
				if (nbjoueurs == 2)	setTimeout(changePlayer, 1*second);
				else setTimeout(initRow, 1*second);
			}
		}
	}, 1*second);
}

/**
 * Rafraichissement
 */ 
function tick(event) {
	// On met à jour le canvas
	stage.update(event);
}

/**
 * Calculer le score d'une fléchette
 */ 
function calculeScore() {
	//c2 = x2 + y2
	var lx = viseurX - (width / 2);
	var ly = viseurY - (height / 2); 
	var lg = Math.round(Math.sqrt(lx*lx + ly*ly));
	var ag = 0;
	if (ly== 0) ag = (lx < 0 ? 270 : 90);
	else ag = Math.round(180 * Math.atan(Math.abs(lx/ly)) / Math.PI * 100) / 100;
	if (lx>=0 && ly>0) ag=180-ag;
	else if (lx<0 && ly>0) ag+=180;
	else if (lx<0 && ly<0) ag=360-ag;
	// Points 
	sc = 0;
	if (ag >= 351 || ag < 9) sc = 20;
	else if (ag >= 9 && ag < 27) sc = 1;
	else if (ag >= 27 && ag < 45) sc = 18;
	else if (ag >= 45 && ag < 63) sc = 4;
	else if (ag >= 63 && ag < 81) sc = 13;
	else if (ag >= 81 && ag < 99) sc = 6;
	else if (ag >= 99 && ag < 117) sc = 10;
	else if (ag >= 117 && ag < 135) sc = 15;
	else if (ag >= 135 && ag < 153) sc = 2;
	else if (ag >= 153 && ag < 171) sc = 17;
	else if (ag >= 171 && ag < 189) sc = 3;
	else if (ag >= 189 && ag < 207) sc = 19;
	else if (ag >= 207 && ag < 225) sc = 7;
	else if (ag >= 225 && ag < 243) sc = 16;
	else if (ag >= 243 && ag < 261) sc = 8;
	else if (ag >= 261 && ag < 279) sc = 11;
	else if (ag >= 279 && ag < 307) sc = 14;
	else if (ag >= 307 && ag < 315) sc = 9;
	else if (ag >= 315 && ag < 333) sc = 12;
	else if (ag >= 333 && ag < 351) sc = 5;
	tshoot = 1;
	// Centre, Bulle, Double ou Tripple
	if (lg > 175) sc = 0;
	else if (lg < 9) {
		tshoot = 2;
		sc = 50;
		if (game_options.soundactive) m_centre.play();
	}
	else if (lg >= 9 && lg < 18) {
		sc = 25;
		if (game_options.soundactive) m_simple.play();
	}
	else if (lg >= 100 & lg < 111) {
		tshoot = 3;
		sc *= 3;
		if (game_options.soundactive) m_triple.play();
	}
	else if (lg >= 165 & lg < 176) {
		tshoot = 2;
		sc *= 2;
		if (game_options.soundactive) m_double.play();
	}
	else {
		if (game_options.soundactive) m_simple.play();
	}	 
	var t = timerG - (stopTime - startTime);
	if (t < 0) t = 0;
	scoreTmp = Math.round(((sc * 1000) * (1+(game_options.difficulty/5))) + t);
	scoreManche+=sc;
}
/**
 * Fin de partie
 */ 
function endGame() {	
	if (game_options.soundactive) m_congrat.play();
	createjs.Ticker.reset();
	stage.removeAllChildren();
	createjs.Ticker.removeAllEventListeners();
	$('body').removeClass("noover");
	$("#titre_game").html((game_options.type == "1" ? texte_option_type_301[game_options.lang] : (game_options.type == "2" ? texte_option_type_301_dout[game_options.lang] : (game_options.type == "3" ? texte_option_type_501[game_options.lang] : texte_option_type_501_dout[game_options.lang]))));
	if (nbjoueurs == 2) {
		$("#nb_darts").html(texte_winner[game_options.lang]);
		$("#score_final").html(score_j2 == 0 ? texte_player2[game_options.lang] : texte_player1[game_options.lang]);
	} else {
		$("#nb_darts").html(nbtirs_j1 + " " + texte_dart_name[game_options.lang]);	
		score = Math.round(score / nbtirs_j1);
		$("#score_final").html(score);
	}
	started = false;
	if (nbjoueurs == 1 && game_options.sharescore) service(score);
	setTimeout(showPageScore, 2000);
}
