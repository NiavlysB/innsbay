<?php

include("connexion.php");
include("accueil.php");
include("login.php");
include("artiste.php");
include("album.php");
include("recherche.php");

connexion();

$racine = 'http://localhost/~sbrunerie/ArchiWeb/projetwebcours/index.php';

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

function getSelectedP($param)
{
	if(isset($_GET["p"]) && $_GET["p"] == $param)
	{
		return ' class="selected"';
	}
	else
	{
		return '';
	}
}

function echoAll()
{
	global $racine;
	echo '
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<link type="text/css" href="style.css" rel="stylesheet" />
		<script type="text/javascript" src="script.js"></script>
		<title>Titre !</title>
	</head>
	<body>
		<div id="main">
			<div id="entete">
				<div id="logo">
					<a href="?">
						<h1> Catalogue d’albums de musiques </h1>
						<!--<img src="img/logo.jpg" alt="Logo avec lien sur page d’accueil" />-->
					</a>
				</div>
				<div id="divMenu">
					<ul id="menu">
						<li><a href="?p=accueil"'.getSelectedP("accueil").'>Accueil</a></li>
						<li><a href="?p=artiste"'.getSelectedP("artiste").'>Artistes</a></li> <!-- &amp;idArtiste=0 -->
						<li><a href="?p=album"'.getSelectedP("album").'>Albums</a></li> <!-- &amp;idAlbum=0 -->
						<li><a href="?p=login"'.getSelectedP("login").'>Connexion</a></li>
						<li><a href="?p=recherche"'.getSelectedP("recherche").'>Recherche</a></li>
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
close();

?>
