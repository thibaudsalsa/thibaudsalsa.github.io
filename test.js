/**
 * Created by Dondeo on 7/13/17.
 */

//Balises gérés par le script
var checkElem = ['BODY', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'OL', 'LI', 'A', 'IMG'];

// Parsing général du fichier HTML
function f1() {
    var childNode = document.body.childNodes;
    var newBody = document.createElement("BODY");
    var childLength = childNode.length;
    var childPart;
//    var newHead = document.createElement("HEAD"); /* soon */

//Parcours du body actuel
    for(var i = 2; i < childLength; i++) { //i a modifier pour version finale
        if(childNode[i].nodeType === 1) {
            //parsing entier d'une balise du body
            childPart = f2(childNode[i], newBody, newBody);
            //Ajoute la balise si ce n'est pas déjà le cas
            if (newBody !== childPart) {
                newBody.appendChild(childPart);
            }
        }
    }
    //remplace le body atuel par le nouveau body
    newBody.firstElementChild.setAttribute("class", "selected");
    document.documentElement.removeChild(document.body);
    document.documentElement.appendChild(newBody);
    f5();
}

//Parsing de la balise myNode
function f2(myNode, newBody, parentBody) {
    var bodyPart = f3(myNode, newBody, parentBody);

    return (f4(bodyPart, myNode, newBody));
}

//Création de la balise
function f3(myNode, newBody, parentBody) {
    var tempNode = myNode;
    var bodyPart;

    //On remonte au parent tant que la balise visualisé n'est pas une balise valide
    while (checkElem.indexOf(tempNode.nodeName) === -1) {
        tempNode = tempNode.parentNode;
    }
    //La balise envoyé en paramètre est valide : Création d'une nouvelle balise
    if (tempNode.nodeName.localeCompare(myNode.nodeName) === 0) {
        bodyPart = document.createElement(myNode.nodeName);
        if (tempNode.nodeName.localeCompare("A") === 0 && tempNode.hasAttribute("href")){
            bodyPart.setAttribute("href", tempNode.getAttribute("href"))
        }
        else if (tempNode.nodeName.localeCompare("IMG") === 0){
            if (tempNode.hasAttribute("src")) {
                bodyPart.setAttribute("src", tempNode.getAttribute("src"))
            }
            if (tempNode.hasAttribute("alt")) {
                bodyPart.setAttribute("alt", tempNode.getAttribute("alt"))
            }
        }
    }
    else if (tempNode.nodeName.localeCompare(newBody.nodeName) === 0) {
        bodyPart = newBody;
    }
    else {
        bodyPart = parentBody;
    }
    return (bodyPart);
}

function f4(bodyPart, myNode, newBody) {
    var childNode = myNode.childNodes;
    var childLength = childNode.length;
    var childPart;

    for(var i = 0; i < childLength; i++) {
        if(childNode[i].nodeType === 1) {
            childPart = f2(childNode[i], newBody, bodyPart);
            if (bodyPart !== childPart) {
                bodyPart.appendChild(childPart);
            }
        }
        else if (childNode[i].nodeType === 3) {
            childPart = document.createTextNode(childNode[i].nodeValue);
            bodyPart.appendChild(childPart);
        }
    }
    return (bodyPart);
}

function f5() {
    var my_css = document.createElement("LINK");
    my_css.setAttribute("rel", "stylesheet");
    my_css.setAttribute("type", "text/css");
    my_css.setAttribute("href", "selection/index.css");
    document.head.appendChild(my_css);


    var my_script = document.createElement("SCRIPT");
    my_script.setAttribute("src", "./key.js");
    document.body.appendChild(my_script);
}
