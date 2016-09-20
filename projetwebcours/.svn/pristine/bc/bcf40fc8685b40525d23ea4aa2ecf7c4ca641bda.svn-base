<?php
function echoLogin()
{
	echo '
			<div id="contenu" class="cLogin">
				<h2 id="hLogin">Connexion</h2>';
	
	if(!isset($_GET["user"]))
	{
		echo '
					<!-- form à passer en POST -->
					<form method="GET" action="?p=login">
						<fieldset>
							<legend>Connexion</legend>
							<label for="inputUser">Pseudo</label>
							<input type="text" id="inputUser" name="user" />
							<label for="inputMdp">Mot de passe</label>
							<input type="password" id="inputMdp" name="password" />
							<input type="submit" value="Se connecter" />
						</fieldset>
					</form>
			</div>';
	}
	else if(isset($_GET["mdp"]))
	{
		echo '<p>Vous avez tenté de vous connecter avec le nom d’utilisateur '.$_GET["user"].' et le mot de passe '.$_GET["mdp"].' de somme MD5 ';
	}
	else
		echo '<p>Vous croyez qu’on peut se connecter sans mot de passe ? -_-';
}
?>
