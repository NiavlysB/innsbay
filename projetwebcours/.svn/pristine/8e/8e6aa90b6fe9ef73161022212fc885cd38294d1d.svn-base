<?php

include("accueil.php");
include("login.php");
include("artiste.php");
include("album.php");
include("recherche.php");

$utilisateurDB = "jbsubils"; 
$utilisateurDB = "sbrunerie";
$racine = "http://localhost/~sbrunerie/ArchiWeb/projetwebcours/index.php";
/*
$c = mysql_connect("venus",$utilisateurDB,$utilisateurDB) or die("Erreur connect");
mysql_select_db($utilisateurDB,$c) or die ("Erreur select_db");
mysql_set_charset("utf8",$c) or die ("Erreur set_charset utf8");
*/

function echoErreurP()
{
	if(isset($_GET["p"]))
	{
		echo '
			<div id="contenu" class="cErreurP">
				<p>Désolé, le paramètre «&nbsp;'.$_GET["p"].'&nbsp;» n’a pas été reconnu.</p>
			</div>
				';
	}
	else
	{
		echoAccueil();
	}
}

function echoAll()
{
	echo '
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<link type="text/css" href="style.css" rel="stylesheet" />
		<!--<script type="text/javascript" src="wait.js"></script>-->
		<title>Titre !</title>
	</head>
	<body>
		<div id="main">
			<div id="entete">
				<div id="logo">
					<a href="'.$racine.'">
						<h1> Catalogue d\'albums de musiques </h1>
						<!--<img src="img/logo.jpg" alt="Logo avec lien sur page d’accueil" />-->
					</a>
				</div>
				<div id="divMenu">
					<ul id="menu">
						<li><a href="?p=accueil">Accueil</a></li>
						<li><a href="?p=artiste&amp;idArtiste=0">Artistes</a></li>
						<li><a href="?p=album&amp;idAlbum=0">Albums</a></li>
						<li><a href="?p=login">Connexion</a></li>
						<li><a href="?p=recherche">Recherche</a></li>
					</ul>
				</div>
			</div>
';
	if(isset($_GET["p"]))
	{
		if($_GET["p"] == "album")
		{
			echoAlbum();
		}
		elseif($_GET["p"] == "artiste")
		{
			echoArtiste();
		}
		elseif($_GET["p"] == "recherche")
		{
			echoRecherche();
		}
		elseif($_GET["p"] == "login")
		{
			echoLogin();
		}
		elseif($_GET["p"] == "accueil")
		{
			echoAccueil();
		}
		else
		{
			echoErreurP();
		}
	}
	else
	{
		echoAccueil();
	}
	echo '
			<div id="footer">
				<span>© Sylvain Brunerie, Jean-Baptiste Subils</span>
				<a href="?p=licence">Informations de licence</a>
				<a href="?p=mentions">Mentions légales</a>
			</div>			
		</div>

	
   </body>
</html>
';
}

echoAll();
?>
