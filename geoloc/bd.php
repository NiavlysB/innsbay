<html>
<head>
<title>(PHP) Test géolocalisation</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
<?php
# -*- coding: utf-8 -*-
$ll=explode(",",$_GET["ll"]);
$lat = $ll[0];
$lon = $ll[1];
echo "
Coordonnées reçues : ".$_GET['ll']."<br />
Latitude : $lat<br />
Longitude : $lon<br />";
$données = file("bd",FILE_IGNORE_NEW_LINES);
$p = array();
foreach($données as $l)
{
    $ligne = explode("|",$l);
    $nom = $ligne[2];
    $lat2 = $ligne[0];
    $lon2 = $ligne[1];
    $R = 6367445; # Rayon de la Terre
    #var_dump(($ligne[0]-$lat));
    #echo "<small>Distance fausse ".$nom." : ".sqrt(pow(($lat2-$lat),2)+pow(($lon2-$lon),2))."</small><br />";
    $dist = $R*acos(sin(deg2rad($lat2))*sin(deg2rad($lat))+cos(deg2rad($lat2))*cos(deg2rad($lat))*cos(deg2rad($lon2)-deg2rad($lon)));
    echo "Distance ".$nom." : ".$dist." m = ".round($dist/1000,1)." km<br />";
    $p["$nom"] = $dist;
}
echo "<br />Avant tri :";
var_dump($p);
asort($p);
echo "Après tri :";
var_dump($p);
$k = array_keys($p);
echo "Théâtre le plus proche : ".$k[0]."<br />Autres théâtres : ".$k[1].", ".$k[2].".";
?>
</body>
</html>