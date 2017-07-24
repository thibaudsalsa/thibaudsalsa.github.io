/**
 * Created by Dondeo on 7/13/17.
 */

var checkElem = ['BODY', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'OL', 'LI', 'A'];

function f1() {
    var childNode = document.body.childNodes;
    var newBody = document.createElement("BODY");
    var childLength = childNode.length;
    var childPart;

    for(var i = 2; i < childLength; i++) {
        if(childNode[i].nodeType === 1 && childNode[i].hasChildNodes() === true) {
            childPart = f2(childNode[i], newBody, newBody);
            if (newBody !== childPart) {
                newBody.appendChild(childPart);
            }
        }
    }
    document.documentElement.removeChild(document.body);
    document.documentElement.appendChild(newBody);
}

function f2(myNode, newBody, parentBody) {
    var bodyPart = f3(myNode, newBody, parentBody);

    return (f4(bodyPart, myNode, newBody));
}

function f3(myNode, newBody, parentBody) {
    var tempNode = myNode;
    var bodyPart;

    while (checkElem.indexOf(tempNode.nodeName) === -1) {
        tempNode = tempNode.parentNode;
    }
    if (tempNode.nodeName.localeCompare(myNode.nodeName) === 0) {
        bodyPart = document.createElement(myNode.nodeName);
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
            if (childNode[i].hasChildNodes() === true) {
                childPart = f2(childNode[i], newBody, bodyPart);
                if (bodyPart !== childPart) {
                    childPart = f5();
                    bodyPart.appendChild(childPart);
                }
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
    
}