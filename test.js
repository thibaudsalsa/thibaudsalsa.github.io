/**
 * Created by Dondeo on 7/13/17.
 */

var checkElem = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'OL', 'LI'];

function main() {
    var childNode = document.body.childNodes;
    var bodyPart = document.createElement("BODY");
    var childPart;

    for(var i = 2; i < childNode.length; i++) {
        if(childNode[i].nodeType === 1) {
            if(childNode[i].hasChildNodes() === true) {
                childPart = exploreNode(childNode[i]);
                bodyPart.appendChild(childPart);
            }
        }
    }
    document.documentElement.removeChild(document.body);
    document.documentElement.appendChild(bodyPart);
}


function exploreNode(myNode) {
    var childNode = myNode.childNodes;
    var posCheckElem = -1;
    var bodyPart = document.createElement(myNode.nodeName);
    var childPart;

    for(var i = 0; i < childNode.length; i++) {
        if(childNode[i].nodeType === 1) {
            if (childNode[i].hasChildNodes() === true) {
                childPart = exploreNode(childNode[i]);
            }
            posCheckElem = checkElem.indexOf(childNode[i].nodeName);
            if(posCheckElem !== -1) {
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