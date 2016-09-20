<?php
    $email = $_GET["mail"];
    //echo $email.','.eregi("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$", $email).'<br />';
    //$headers.='Content-Type: text/plain; charset=utf-8\nFrom: "Innsbay Toile-libre" <moi@toile-libre.org>\n';
    //$headers.='Content-Transfer-Encoding: 8bit';
    if(eregi("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,4}$", $email))
    {
        if(mail("sylvain.brunerie@gmail.com", "Quelqu’un d’intéressé par Innsbay : $email", "Tout est dans le titre : quelqu’un d’intéressé par Innsbay ($email). Mail envoyé depuis l’adresse IP ".$_SERVER["REMOTE_ADDR"]))
        {
            if(isset($_GET['aj']))
            {
                $_GET['s'] = 0;
                include('msgmail.php');
            }
            else
                header("Location: index.php?voir&s=0");
        }
        else // envoi raté
        {
            if(isset($_GET['aj']))
            {
                $_GET['s'] = 1;
                include('msgmail.php');
            }
            else
                header("Location: index.php?voir&s=1&m=$email");
        }
   }
    else // adresse absente ou invalide
    {
    if(isset($_GET['aj']))
        {
            $_GET['s'] = 2;
            include('msgmail.php');
        }
    else
        header("Location: index.php?voir&s=2&m=$email");
    }
?> 