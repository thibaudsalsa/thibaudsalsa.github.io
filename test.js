/**
 * Created by Dondeo on 7/13/17.
 */


var checkElem = ['BODY', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'OL', 'LI', 'A', 'IMG'];

function f1() {
    var childNode = document.body.childNodes;
    var newBody = document.createElement("BODY");
    var childLength = childNode.length;
    var childPart;

    for(var i = 2; i < childLength; i++) {
        if(childNode[i].nodeType === 1) {
            childPart = f2(childNode[i], newBody, newBody);
            if (newBody !== childPart) {
                newBody.appendChild(childPart);
            }
        }
    }
    newBody.firstElementChild.setAttribute("id", "selected");
    document.documentElement.removeChild(document.body);
    document.documentElement.appendChild(newBody);
    f5();
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
    var my_script = document.createElement("SCRIPT");

    my_script.setAttribute("src", "https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js");
    document.body.appendChild(my_script);
}

//--------------------------------//


function selection()
{
    // RIGHT KEY
    Mousetrap.bind(keyboard[4], () => {
        var childNode = document.body.childNodes;
    for (var i = 2; 'selected' != childNode[i].nodeid; i++)
    {
    }
    if (childNode[i].nodeName[0] !== 'H')
    {
        childNode[i + 1].nodeid = 'selected';
        childNode[i].nodeid = '';
    }
})


    //LEFT KEY
    Mousetrap.bind(keyboard[3], () => {
        var childNode = document.body.childNodes;
    for (var i = 2; 'selected' != childNode[i].nodeid; i++)
    {
    }
    if (childNode[i].nodeName[0] !== 'H')
    {
        childNode[i - 1].nodeid = 'selected';
        childNode[i].nodeid = '';
    }
})


    // UP KEY
    Mousetrap.bind(keyboard[2], () => {
        var temp = 0;
    var childNode = document.body.childNodes;
    for (var i = 2; 'selected' != childNode[i].nodeid; i++)
    {
    }
    temp = i;
    i--;
    for (;i < childNode.length; i--)
    {
        if (childNode[i].nodeName[0] === 'H')
        {
            childNode[i].nodeid = 'selected';
            childNode[temp].nodeid = '';
            break;
        }
    }
})


    // DOWN KEY
    Mousetrap.bind(keyboard[1], () => {
        var found = false
        var temp = 0;
    var childNode = document.body.childNodes;
    for (var i = 2; 'selected' != childNode[i].nodeid; i++)
    {
    }
    temp = i;
    i++;
    for (;i < childNode.length; i++)
    {
        if (childNode[i].nodeName[0] === 'H')
        {
            childNode[i].nodeid = 'selected';
            childNode[temp].nodeid = '';
            break;
        }
    }
})
}