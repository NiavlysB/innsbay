<?php ob_start("ob_gzhandler"); /* coding: utf-8 */ ?>
<!DOCTYPE html> 
<html lang="fr"> 
    <head>
        <meta charset="utf-8" />
        <meta name="description" content="Innsbay est un court/moyen métrage de 30 minutes, réalisé par Sylvain Brunerie, librement adapté de la nouvelle de H. P. Lovecraft « Le Cauchemar d’Innsmouth »." /> 
        <meta name="author" content="Sylvain Brunerie" />
        <meta name="keywords" lang="fr" content="innsbay, court, moyen, métrage, film, sylvain, brunerie, lovecraft, cauchemar, innsmouth" />
        <meta name="keywords" lang="en" content="innsbay, short, film, sylvain, brunerie, lovecraft, shadow, over, innsmouth" />
        <meta name='viewport' content='initial-scale=1.0' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Innsbay (Sylvain Brunerie, 2009)' />
        <meta name='twitter:description' content='Innsbay est un court/moyen métrage de 30&nbsp;minutes, réalisé par Sylvain&nbsp;Brunerie, librement adapté de la nouvelle de H.&nbsp;P.&nbsp;Lovecraft «&nbsp;Le&nbsp;Cauchemar d’Innsmouth&nbsp;».' />
        <meta name='twitter:image' content='http://innsbay.toile-libre.org/image-cropped.png' />
        <!--<meta name='twitter:creator' content='@Niavlys' />
        <meta name='twitter:site' content='@Niavlys' />-->
        
        <meta property='og:title' content='Innsbay (Sylvain Brunerie, 2009)' />
        <meta property='og:site_name' content='Innsbay' />
        <meta property='og:url' content="<?php echo("http://".$_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"]); ?>" />
        <meta property='og:description' content='Innsbay est un court/moyen métrage de 30&nbsp;minutes, réalisé par Sylvain&nbsp;Brunerie, librement adapté de la nouvelle de H.&nbsp;P.&nbsp;Lovecraft «&nbsp;Le&nbsp;Cauchemar d’Innsmouth&nbsp;». Synopsis&nbsp;: Un homme se rend dans une ville inconnue, attiré par la description pourtant sordide qu’on lui en fait. Adapté de la nouvelle de H.&nbsp;P.&nbsp;Lovecraft «&nbsp;Le&nbsp;Cauchemar d’Innsmouth&nbsp;», Innsbay est le récit de la déconstruction lente et terrible d’une vie humaine.' />
        <meta property='og:locale' content='fr_FR' />
        <meta property='og:image' content='http://innsbay.toile-libre.org/image-cropped.png' />
        <meta property='og:image:width' content='768' />
        <meta property='og:image:height' content='438' />

        <title>Innsbay - court métrage de Sylvain Brunerie, d’après H. P. Lovecraft</title>
        <link rel="stylesheet" href="innsbay.css" media="all" async />
        <!--[if IE 6]><style type="text/css">body { font-size: 12px; }</style><![endif]-->
        <!--<link rel="stylesheet" href="lightbox/css/lightbox.css" media="screen" async />-->
        <!--<link rel="icon" type="image/png" href="favicon-<?php //echo $_GET['i']?$_GET['i']:(date('W')%4)+1 ?>.png" />
        <link rel="shortcut icon" type="image/png" href="favicon-<?php //echo $_GET['i']?$_GET['i']:(date('W')%4)+1 ?>.png" />-->
        <link rel="icon" type="image/png" href="favicon-1.png" />
        <link rel="shortcut icon" type="image/png" href="favicon-1.png" />
    </head> 
    <body>
        <div id="conteneur" itemscope itemtype="http://schema.org/Movie">
            <header id="div_titre">
                <h1><a href="?" title="Accueil">Innsbay</a></h1>
                <!--<div id="date"><?php /*
                $jours = array("dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi");
                $mois = array("","janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre");
                $j = date("d");
                $date = "Le ".$jours[date("w")]." ".($j[0]=="0"?$j[1]:$j)." ".$mois[date("n")]." ".date("Y");
                echo $date; */ ?></div>-->
                <div id="imdb">
                    <a href="http://www.imdb.com/title/tt1986870/" itemprop="sameAs" title="Lien vers la fiche IMDb de Innsbay" target="_blank"><img src="imdb_h30.png" alt="Lien vers la fiche IMDb de Innsbay" /></a>
                </div>
            </header>
        <div><img src="image2r_bg.jpg" alt="" style="display:none;" /></div><!-- Préchargement de l’image -->
            <nav id="div_menu">
                <ul id="menu">
                    <li<?php if(!($_GET)||isset($_GET['presentation'])) echo " class=\"selected\""; ?>><a href="?presentation" title="Accueil">Présentation</a></li>
                    <li<?php if(isset($_GET['infos'])) echo " class=\"selected\""; ?>><a href="?infos">Informations diverses</a></li>
                    <li<?php if(isset($_GET['voir'])) echo " class=\"selected\""; ?>><a href="?voir">Comment le voir</a></li>
                    <li<?php if(isset($_GET['ressources'])||isset($_GET['liens'])) echo " class=\"selected\""; ?>><a href="?ressources">Ressources et liens</a></li>
                    <li<?php if(isset($_GET['contact'])) echo " class=\"selected\""; ?>><a href="?contact">Contact</a></li>
                </ul>
                
            </nav>
            <section id="div_contenu" role="main">
        <?php /* Contenu */
        if(isset($_GET['presentation'])){ echo("<h1>"."Présentation"."</h1>"); include('presentation.html'); }
        elseif(isset($_GET['infos'])){ echo("<h1>"."Informations diverses"."</h1>"); include('infos.html'); }
        elseif(isset($_GET['voir'])){ echo("<h1>"."Comment le voir"."</h1>"); include('voir.html'); }
        elseif(isset($_GET['ressources'])||isset($_GET['liens'])){ echo("<h1>"."Ressources et liens"."</h1>"); include('ressources.html'); }
        elseif(isset($_GET['contact'])){ echo("<h1>"."Contact"."</h1>"); include('contact.html'); }
        //else include('accueil.html');
        else include('presentation.html');
        ?>
            </section>
        </div>
        <?php
        //print_r($_GET);
        //phpinfo(); ?>
        <div><a href="demineur/demineur.html" id="D">(Démineur)</a></div>
        <!--<div id="twitterlink"><a href="http://www.twitter.com/Niavlys"><img src="http://twitter-badges.s3.amazonaws.com/t_small-a.png" alt="Suivre Sylvain Brunerie (Niavlys) sur Twitter" /></a></div>-->
        <script src="http://www.google-analytics.com/ga.js" type="text/javascript"></script>
        <script>try { var pageTracker = _gat._getTracker("UA-15454539-1"); pageTracker._trackPageview(); } catch(err) {}</script>
        <!-- Lightbox -->
        <!--<script src="lightbox/js/prototype.js"></script>
        <script src="lightbox/js/scriptaculous-1.8.1/scriptaculous.js?load=effects,builder"></script>
        <script src="lightbox/js/lightbox.js"></script>-->
    </body> 
</html>
