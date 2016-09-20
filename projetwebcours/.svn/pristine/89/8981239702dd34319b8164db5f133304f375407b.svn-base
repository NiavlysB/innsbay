<?php
function echoArtiste()
{
	echo '
			<div id="contenu" class="cArtiste">';
			
	if(isset($_GET["idArtiste"]) and is_numeric($_GET["idArtiste"]) and $_GET["idArtiste"] > 0)
	{
		$nomArtiste = "Artiste bidon";
	
		echo '
				<h2 id="nomArtiste">Artiste : '.$nomArtiste.'</h2>
				<p>Désolé, pas plus d’informations pour l’instant.</p>
			</div>';
	}
	else
	{
		// Liste de tous les artistes
		echo '
				<h2>Liste de tous les artistes enregistrés</h2>
				<p>(Bientôt)</p>';
	}
	echo '
			</div>
			';
}
?>
