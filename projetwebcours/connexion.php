<?php

$c;

function connexion()
{
	global $c;	
	# $utilisateurDB = "jbsubils"; 
	# $utilisateurDB = "sbrunerie";
	$utilisateurDB = "root";

	$passwordDB = $utilisateurDB;

	if($_SERVER["HTTP_HOST"] == "innsbay.toile-libre.org")
	{
		$c = mysql_connect("sql.toile-libre.org", "innsbay_projweb", "GLIN607") or die("Erreur connect : ".mysql_error());
		mysql_select_db("innsbay_projweb",$c) or die ("Erreur select_db : ".mysql_error());
	}
	else //if($_SERVER["HTTP_HOST"] == "localhost")
	{
		$c = mysql_connect("localhost", "user", "user") or die("Erreur connect : ".mysql_error());
		mysql_select_db("glin607",$c) or die ("Erreur select_db : ".mysql_error());
	}
	
	mysql_set_charset("utf8", $c) or die ("Erreur set_charset utf8 : ".mysql_error());
}

function close()
{
	global $c;
	mysql_close($c);
}

?>
