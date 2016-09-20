var x,y,i;
var tableau = new Array();
var largeur = 0;
var hauteur = 0;
var nbMines = 0;
 
var grilleCreee = false;
var fini = false;
 
var tChrono;
var temps = -1;
var minesRest = 0;
 
var nbNonDecouverts = 0;
 
function input() {
    largeur = parseInt(window.prompt('Largeur ?',(largeur ? largeur : 10)));
    if(!largeur) return;
    hauteur = parseInt(window.prompt('Hauteur ?',(hauteur ? hauteur : largeur)));
    if(!hauteur) return;
    nbMines = parseInt(window.prompt('Nombre de mines ?',(nbMines ? nbMines : 15)));
    if(!nbMines) return;
    afficherGrille(largeur, hauteur);
}
 
function afficherGrille() {
    // Réinitialisation
    if (grilleCreee) {
        document.getElementById('empGrille').innerHTML = "";
        tableau = [];
 
        grilleCreee = false;
        fini = false;
 
        clearTimeout(tChrono);
        temps = -1;
        minesRest = 0;
 
        nbNonDecouverts = 0;
        document.getElementById('chronomètre').innerHTML = "";
        document.getElementById('compteurMines').innerHTML = "";
    }
 
    var txtLigne = "";
    var txtGrille = "";
    for (y=0; y<hauteur; y++) {
        txtLigne = "";
        for (x=0; x<largeur; x++) {
            txtLigne += ('<td onmouseup="gererClic(' + y + ',' + x + ',event);"><span style="visibility: hidden;">&nbsp;</span>');
        }
        txtGrille += "<tr>" + txtLigne + "</tr>";
    }
    txtGrille = '<table style="border-spacing:0px; table-layout:fixed;" id="Grille">' + txtGrille + '</table>';
    document.getElementById('empGrille').innerHTML = txtGrille;
}
 
function creerGrille2(clicX, clicY) {
    for (y=0; y<hauteur; y++) {
        tableau[y] = new Array();
        for (x=0; x<largeur; x++) {
            tableau[y].push({mine:false, drapeau:false, decouvert:false, valeur:0});
        }
    }
    ///////////////////////
    var posX;
    var posY;
    for (i=1; i<=nbMines; i++) {
        do {
            posX = Math.floor(Math.random()*largeur);
            posY = Math.floor(Math.random()*hauteur);
            var goodPlace;
 
            if(tableau[posY][posX].mine == false && (Math.abs(clicX-posX)>1 || Math.abs(clicY-posY)>1))
                {
                goodPlace = true;
                } else {
                goodPlace = false;
                }
            } while (!goodPlace)
        tableau[posY][posX].mine = true;
 
        // On incrémente toutes les cases autour (ou presque) :
        if(posY>=1 && posX>=1)
            tableau[posY-1][posX-1].valeur ++;
        if(posY>=1)
            tableau[posY-1][posX].valeur ++;
        if(posY>=1 && posX<=largeur-2)
            tableau[posY-1][posX+1].valeur ++;
 
        if(posX>=1)
            tableau[posY][posX-1].valeur ++;
        if(posX<=largeur-2)
            tableau[posY][posX+1].valeur ++;
 
        if(posY<= hauteur-2 && posX>=1)
            tableau[posY+1][posX-1].valeur ++;
        if(posY<= hauteur-2)
            tableau[posY+1][posX].valeur ++;
        if(posY<= hauteur-2 && posX<=largeur-2)
            tableau[posY+1][posX+1].valeur ++;
 
    }
    grilleCreee = true;
    minesRest = nbMines;
    document.getElementById('compteurMines').innerHTML = minesRest;
    nbNonDecouverts = largeur*hauteur;
    chrono();
}
 
function clicCase(clicY, clicX) {
    var case_ = document.getElementById('Grille').firstChild.childNodes[clicY].childNodes[clicX];
 
    if (!tableau[clicY][clicX].decouvert) {
        tableau[clicY][clicX].decouvert = true;
        if(tableau[clicY][clicX].mine)
            {
            case_.className = 'mines';
            case_.id = 'mine';
 
            // Montrer les autres mines :
            for (y=0; y<hauteur; y++) {
                for (x=0; x<largeur; x++) {
                    if (tableau[y][x].mine && !tableau[y][x].drapeau) {
                        case_ = document.getElementById('Grille').firstChild.childNodes[y].childNodes[x];
                        case_.className = 'mines';
                    }
                    if (!tableau[y][x].mine && tableau[y][x].drapeau) {
                        document.getElementById('Grille').firstChild.childNodes[y].childNodes[x].innerHTML = '<span class="v3">X</span>';
                    }
                }
            }
 
            finir(false);
            }
        else
            {
            nbNonDecouverts--;
            case_.className = 'decouvert';
            if(tableau[clicY][clicX].valeur != 0) {
                case_.innerHTML = tableau[clicY][clicX].valeur;
                case_.className += ' v' + tableau[clicY][clicX].valeur;
            } else {
                if(clicY>=1 && clicX>=1)
                    clicCase(clicY-1,clicX-1);
                if(clicY>=1)
                    clicCase(clicY-1,clicX);
                if(clicY>=1 && clicX<=largeur-2)
                    clicCase(clicY-1,clicX+1);
 
                if(clicX>=1)
                    clicCase(clicY,clicX-1);
                if(clicX<=largeur-2)
                    clicCase(clicY,clicX+1);
 
                if(clicY<= hauteur-2 && clicX>=1)
                    clicCase(clicY+1,clicX-1);
                if(clicY<= hauteur-2)
                    clicCase(clicY+1,clicX);
                if(clicY<= hauteur-2 && clicX<=largeur-2)
                    clicCase(clicY+1,clicX+1);
            }
        }
    }
    verifVictoire();
}
 
function gererClic(cY,cX,e) {
    if (!e) var e = window.event;
 
    if (!grilleCreee && e.button != 0) {
        return;
    } else if (!grilleCreee && e.button == 0) {
        creerGrille2(cX, cY);
        clicCase(cY, cX);
        return;
    }
 
    if (fini) {
        return;
    }
 
    if(!tableau[cY][cX].decouvert) {
        if (e.button == 0 && !tableau[cY][cX].drapeau) { // clic gauche, normal
            clicCase(cY, cX);
        } else if (e.button == 2) { // clic droit : drapeau
            document.getElementById('Grille').firstChild.childNodes[cY].childNodes[cX].className = tableau[cY][cX].drapeau ? '' : 'drapeau';
            tableau[cY][cX].drapeau = !tableau[cY][cX].drapeau;
            if (tableau[cY][cX].drapeau)
                minesRest--;
            else
                minesRest++;
            document.getElementById('compteurMines').innerHTML = minesRest;
        }
    } else if (e.button == 0) { // clic gauche, équivalent gauche + droit sur démineur Windows
            // On crée d'abord un tableau des cases autour
            var casesAutour = new Array();
            if(cY>=1 && cX>=1)
                casesAutour.push([cY-1,cX-1]);
            if(cY>=1)
                casesAutour.push([cY-1,cX]);
            if(cY>=1 && cX<=largeur-2)
                casesAutour.push([cY-1,cX+1]);
 
            if(cX>=1)
                casesAutour.push([cY,cX-1]);
            if(cX<=largeur-2)
                casesAutour.push([cY,cX+1]);
 
            if(cY<= hauteur-2 && cX>=1)
                casesAutour.push([cY+1,cX-1]);
            if(cY<= hauteur-2)
                casesAutour.push([cY+1,cX]);
            if(cY<= hauteur-2 && cX<=largeur-2)
                casesAutour.push([cY+1,cX+1]);
 
            // Puis on compte les drapeaux et les mines
            var drapeauxAutour = 0;
            var minesAutour = 0;
            for (i=0; i<casesAutour.length; i++) {
                if (tableau[casesAutour[i][0]][casesAutour[i][1]].drapeau)
                    drapeauxAutour ++;
                if (tableau[casesAutour[i][0]][casesAutour[i][1]].mine)
                    minesAutour ++;
            }
 
            if (drapeauxAutour == minesAutour) {
                for (i=0; i<casesAutour.length; i++) {
                    if (!tableau[casesAutour[i][0]][casesAutour[i][1]].drapeau)
                        clicCase(casesAutour[i][0], casesAutour[i][1]);
                }
            }
            ///////////////////////////////////
    }
}
 
function verifVictoire() {
    if (fini)
        return;
    if (nbNonDecouverts != nbMines) {
        return;
    } else {
        var posMines = new Array();
        for (y=0; y<hauteur; y++) {
            for (x=0; x<largeur; x++) {
                if (tableau[y][x].mine)
                    posMines.push([y, x]);
            }
        }
    }
    /*
    var posNonDecouverts = new Array();
    var posMines = new Array();
 
    // Listage des cases non découvertes et des mines
    for (y=0; y<hauteur; y++) {
        for (x=0; x<largeur; x++) {
            if (!tableau[y][x].decouvert && !tableau[y][x].mine)
                return;
            if (!tableau[y][x].decouvert)
                posNonDecouverts.push([y, x]);
            if (tableau[y][x].mine)
                posMines.push([y, x]);
        }
    }*/
 
    //if (posNonDecouverts.toSource() == posMines.toSource()) {
    // Mettre des drapeaux là où il faut :
    /*for (i=0; i<posMines.length; i++) {
        if (!tableau[posMines[i][0]][posMines[i][1]].drapeau) {
            document.getElementById('Grille').firstChild.childNodes[posMines[i][0]].childNodes[posMines[i][1]].className = 'drapeau';
            tableau[posMines[i][0]][posMines[i][1]].drapeau = true;
        }
    }*/
    // Mettre des drapeaux là où il faut :
    for (i=0; i<posMines.length; i++) {
        if (!tableau[posMines[i][0]][posMines[i][1]].drapeau) {
            document.getElementById('Grille').firstChild.childNodes[posMines[i][0]].childNodes[posMines[i][1]].className = 'drapeau';
            tableau[posMines[i][0]][posMines[i][1]].drapeau = true;
        }
    }
    minesRest = 0;
    document.getElementById('compteurMines').innerHTML = minesRest;
    finir(true);
}
 
function chrono() {
    tChrono = setTimeout('chrono()',1000);
    if(tChrono) {
        temps++;
        document.getElementById('chronomètre').innerHTML = temps;
    }
}
 
function finir(gagne) {
    clearTimeout(tChrono);
    fini = true;
    for (y=0; y<hauteur; y++) {
        for (x=0; x<largeur; x++) {
            if (!tableau[y][x].decouvert)
                document.getElementById('Grille').firstChild.childNodes[y].childNodes[x].className += ' fini';
        }
    }
    alert(gagne ? 'Gagné !' : 'Perdu.');
}