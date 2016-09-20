<?php
function echoRecherche()
{
	echo '
			<div id="contenu" class="cRecherche">
				<form method="GET" action="?">
					<input type="hidden" name="p" value="recherche" />
					<label for="q">Votre recherche</label>
					<input type="text" id="q" name="q" value="'.(isset($_GET["q"])?$_GET["q"]:"").'" />
					<input type="submit" id="bRechercher" name="bRechercher" value="Rechercher" />
				</form>
			</div>';
}
