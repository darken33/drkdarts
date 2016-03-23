/**
 * highscores.js : Script de gestion des highscores de "Darts Contest"
 * 
 * Par Philippe Bousquet <darken33.free.fr>
 * Ce logiciel est sous license GNU Genral Public License v3.0
 */ 

function quitscore() {
	if (game_options.sharescore && nbjoueurs == 1) {
		showPageHscToday();	
	}
	else {
		showPageTitre();
	}
}

function quithscl() {
	showPageHscInternet();
} 

function quithsci() {
	showPageTitre();
}

function service(score) {
	var d = new Date();
	var txd=d.getFullYear()+(d.getMonth() < 9 ? "0" : "")+(d.getMonth()+1)+(d.getDate() < 10 ? "0" : "")+d.getDate();  
	var tableScore = "<tr><td>"+texte_loading[game_options.lang]+"</td></tr>";
	document.getElementById("tx_hsc_today").innerHTML = texte_meilleur_score_dujour[game_options.lang]+"<br/>"+(game_options.type == "1" ? texte_option_type_301[game_options.lang] : (game_options.type == "2" ? texte_option_type_301_dout[game_options.lang] : (game_options.type == "3" ? texte_option_type_501[game_options.lang] : texte_option_type_501_dout[game_options.lang])))+" "+(game_options.difficulty == "1" ? texte_option_diff_easy[game_options.lang] : (game_options.difficulty == "2" ? texte_option_diff_average[game_options.lang] : texte_option_diff_difficult[game_options.lang]));
	document.getElementById("tx_hsc_internet").innerHTML = texte_meilleur_score_mondial[game_options.lang]+"<br/>"+(game_options.type == "1" ? texte_option_type_301[game_options.lang] : (game_options.type == "2" ? texte_option_type_301_dout[game_options.lang] : (game_options.type == "3" ? texte_option_type_501[game_options.lang] : texte_option_type_501_dout[game_options.lang])))+" "+(game_options.difficulty == "1" ? texte_option_diff_easy[game_options.lang] : (game_options.difficulty == "2" ? texte_option_diff_average[game_options.lang] : texte_option_diff_difficult[game_options.lang]));
	document.getElementById("t_hsc_today").innerHTML = tableScore;
	document.getElementById("t_hsc_internet").innerHTML = tableScore;
	var key = "D8C945A4000133333BFC544CB2728B89";
	var name = game_options.name;
	var score = score;
	var url = "http://darken33.free.fr/drkdarts/services/score_service.php?key="+key+"&name="+name+"&score="+score+"&date="+txd+"&diff="+game_options.difficulty+"&type="+game_options.type;
	$.getJSON(url, function(data) {
		fillHighscores(data);
	}).fail(function() { 
		var tableScore = '<tr><td style="color: #FF0000">'+texte_erreur_chargement_score[game_options.lang]+'</td></tr>';
		document.getElementById("t_hsc_today").innerHTML = tableScore;
		document.getElementById("t_hsc_internet").innerHTML = tableScore;
	});
}		

function fillHighscores(data) {
	var tableScore = "<tr><th>#</th><th>"+texte_hsc_nom[game_options.lang]+"</th><th>"+texte_hsc_score[game_options.lang]+"</th></tr>";
	var tableScore2 = "<tr><th>#</th><th>"+texte_hsc_nom[game_options.lang]+"</th><th>"+texte_hsc_score[game_options.lang]+"</th></tr>";
	var tabscores = data;
	var i=0;
	var playerFound = false;
	for (i=0; i<10; i++) {
		if (i < tabscores.length && tabscores[i].type != "today") break;  
		if (i < tabscores.length) {
			cl = (tabscores[i].isplayer == 1 ? "hlg" : "");
			tableScore += '<tr><td style="text-align: right;" class="'+cl+'">'+tabscores[i].pos+'.</td>' +
					'<td style="text-align: left;" class="'+cl+'">'+tabscores[i].name+'</td>' +
					'<td style="text-align: right;" class="'+cl+'">'+tabscores[i].score+'</td></tr>';
			if (tabscores[i].isplayer == 1) playerFound=true;		
		}
	}
	if (tabscores[i].type == "today" && !playerFound) {
		tableScore += '<tr><td style="text-align: center;" colspan="3">...</td></tr>';
		cl = "hlg";
		tableScore += '<tr><td style="text-align: right;" class="'+cl+'">'+tabscores[i].pos+'.</td>' +
					'<td style="text-align: left;" class="'+cl+'">'+tabscores[i].name+'</td>' +
					'<td style="text-align: right;" class="'+cl+'">'+tabscores[i].score+'</td></tr>';
		i++;			
	}
	var j=i;
	playerFound = false;
	for (j=i; j<(i+10); j++) {
		if (j < tabscores.length) {
			cl = (tabscores[j].isplayer == 1 ? "hlg" : "");
			tableScore2 += '<tr><td style="text-align: right;" class="'+cl+'">'+tabscores[j].pos+'.</td>' +
					'<td style="text-align: left;" class="'+cl+'">'+tabscores[j].name+'</td>' +
					'<td style="text-align: right;" class="'+cl+'">'+tabscores[j].score+'</td></tr>';
			if (tabscores[j].isplayer == 1) playerFound=true;		
		}
	}
	if (!playerFound) {
		tableScore2 += '<tr><td style="text-align: center;" colspan="3">...</td></tr>';
		cl = "hlg";
		tableScore2 += '<tr><td style="text-align: right;" class="'+cl+'">'+tabscores[j].pos+'.</td>' +
					'<td style="text-align: left;" class="'+cl+'">'+tabscores[j].name+'</td>' +
					'<td style="text-align: right;" class="'+cl+'">'+tabscores[j].score+'</td></tr>';
		i++;			
	}
	document.getElementById("t_hsc_today").innerHTML = tableScore;
	document.getElementById("t_hsc_internet").innerHTML = tableScore2;
}
