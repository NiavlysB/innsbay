<?php
function echoLogin()
{
	echo '
			<div id="contenu" class="cLogin">
				<h2 id="hLogin">Connexion</h2>';
	
	if(!isset($_POST["user"]))
	{
		echo '
					<!-- form à passer en POST -->
					<form method="POST" action="?p=login">
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
	else if(isset($_POST["password"]))
	{
		echo '<p>Vous avez tenté de vous connecter avec le nom d’utilisateur « '.$_POST["user"].
		' » et le mot de passe « '.$_POST["password"].' » de somme MD5 '.md5($_POST["password"]);
	}
	else
		echo '<p>Vous croyez qu’on peut se connecter sans mot de passe ? -_-';
}
?>
