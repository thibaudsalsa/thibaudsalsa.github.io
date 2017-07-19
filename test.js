/**
 * Created by Dondeo on 7/13/17.
 */

function main() {
    var childNode = document.body.childNodes;                       //listes des balises de premier rang
    console.log(childNode);
    var checkElem = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'OL', 'LI'];//tableau des éléments à garder
    var posCheckElem = -1;                                          //Valeur check d'éléments dans un élément
    var upBrowserHTML = document.createElement("DIV");              //Où est stocké la nouvelle page
    var bodyPart;                                                   //Résultat du parsing (1er rang)
    var childPart;                                                  //Résultat du parsing (recursive)

    for(var i = 0; i < childNode.length; i++) {
        if(childNode[i].nodeType === 1) {
            if(childNode[i].hasChildNodes() === true) {
                childPart = exploreNodeTest(childNode[i]);
            }
            posCheckElem = checkElem.indexOf(childNode[i].nodeName);
            if(posCheckElem !== -1) {
                bodyPart = document.createElement(checkElem[posCheckElem]);
                bodyPart.appendChild(childPart);
            }
            else {
                bodyPart = childPart;
            }
                upBrowserHTML.appendChild(bodyPart);
        }
    }
    document.body.innerHTML = '';
    document.body.appendChild(upBrowserHTML);
}

function exploreNodeTest() {
    var p = document.createElement("P");
    var t = document.createTextNode("Je suis un test.");

    p.appendChild(t);
    return (p);
}

//function exploreNode(myNode) {
//}
