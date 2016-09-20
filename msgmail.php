<?php
if(isset($_GET["s"]))
{
    echo "<p class=\"statut ";
    if($_GET["s"]==0)
        echo "ok\">Votre adresse e-mail m’a bien été envoyée, merci ! (Rassurez-vous, aucune utilisation frauduleuse n’en sera faite.)";
    else if($_GET["s"]==1)
        echo "err\">Votre adresse e-mail n’a pas pu m’être envoyée, en raison d’un problème technique inconnu.";
    else if($_GET["s"]==2)
        echo "err\">Adresse e-mail absente ou non valide.";
    echo "</p>";
}
?>