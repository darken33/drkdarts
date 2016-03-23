<?php
/**
 * Simple Webservice REST en PHP / JSON
 */
 include("http_response_code.php");
 
 $id_key = "<key>";
 $dbuser = "root" ;
 $dbhost = "localhost";
 $dbname = "drkdarts"; 
 $dbpasswd = "";

// Si la clé n'est pas fournie => 403
if (!isset($_GET['key']) || $id_key != $_GET['key']) {
	http_response_code(403);
	exit;
}
if (!isset($_GET['name'])) {
	http_response_code(400);
	exit;
}
if (!isset($_GET['score']) || !is_numeric($_GET['score'])) {
	http_response;_code(400);
	exit;
}
if (!isset($_GET['date'])) {
	http_response_code(400);
	exit;
}
if (!isset($_GET['diff'])) {
	http_response_code(400);
	exit;
}
if (!isset($_GET['type'])) {
	http_response_code(400);
	exit;
}
$name = $_GET['name'];
$score = $_GET['score'];
$datej = $_GET['date'];
$diff = $_GET['diff'];
$type = $_GET['type'];

// on se connecte à la DB
mysql_connect($dbhost,$dbuser,$dbpasswd);
mysql_select_db($dbname);

// On insere le score
$requete="INSERT INTO drkdarts_score (`id` , `difficulty` , `name` , `score` ,`date`, `type`) VALUES (NULL , ".$diff.", '".$name."', '".$score."', '".$datej."', ".$type.");";
$result=mysql_query($requete);
$idrow=mysql_insert_id(); 

// On recupère les 10 meilleurs scores du jour
$requete="SELECT `id`, `name`, `score`, `date` FROM drkdarts_score WHERE `date` = '$datej' AND `difficulty` = $diff AND `type` = $type ORDER BY score DESC;";
$result=mysql_query($requete);

$list = Array();
$pos = 1;
while ($row=mysql_fetch_array($result)) {
	if ($pos < 11 || $row['id'] == $idrow) {
		array_push($list, Array(
			'pos' => $pos,
			'isplayer' => ($row['id'] == $idrow ? 1 : 0),
			'name'=>$row['name'],
			'score'=>$row['score'],
			'type'=>'today'
		));
		if ($pos > 10) break;
	}	
	$pos++;
}

$requete2="SELECT `id`, `name`, `score`, `date` FROM drkdarts_score WHERE `difficulty` = $diff AND `type` = $type ORDER BY score DESC;";
$result2=mysql_query($requete2);

$pos2 = 1;
while ($row2=mysql_fetch_array($result2)) {
	if ($pos2 < 11 || $row2['id'] == $idrow) {
		array_push($list, Array(
			'pos' => $pos2,
			'isplayer' => ($row2['id'] == $idrow ? 1 : 0),
			'name'=>$row2['name'],
			'score'=>$row2['score'],
			'type'=>'global'
		));
		if ($pos2 > 10) break;
	}	
	$pos2++;
}

/* on renvoie le resultat */
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($list); //Array('list' => $list));
?>
