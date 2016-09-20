// From MediaWiki : http://bits.wikimedia.org/skins-1.5/common/ajax.js

function sajax_init_object() {
	var A;
	try {
		A = new XMLHttpRequest();
	} catch (e) {
		try {
			A=new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				A=new ActiveXObject("Microsoft.XMLHTTP");
			} catch (oc) {
				A=null;
			}
		}
	}
	return A;
}

function doMail(mail)
{
    A = sajax_init_object();
    if (!A)
        return true; // (continuer avec le submit HTML)
        
    document.getElementById('slotMsg').innerHTML = "";
    document.getElementById('smail').value = "En cours…";
    document.styleSheets[0].cssRules[document.styleSheets[0].cssRules.length-1].style.cursor = 'progress';
    document.body.style.cursor = 'progress';
    
    A.onreadystatechange = function()
    {
        if(A.readyState == 4)
        {
            document.styleSheets[0].cssRules[document.styleSheets[0].cssRules.length-1].style.cursor = 'auto';
            document.body.style.cursor = 'auto';
            document.getElementById('smail').value = "Envoyer";
            document.getElementById('slotMsg').innerHTML = A.responseText;
            if(document.getElementById('slotMsg').firstChild.className == "status ok")
                document.getElementById('mail').value = "";
            else
                document.getElementById('mail').select();
        }
    }
    A.open("GET","mail.php?aj&mail="+mail,true);
    A.send(null);
    return false; // ne pas faire le submit HTML
}