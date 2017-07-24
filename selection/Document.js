import Mousetrap from 'mousetrap'
import keyboard  from './keyboard.js';

function selection()
{
    var childNode = document.body.childNodes;
    var checkElem = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'OL', 'LI'];

    function main() {
        var childNode = document.body.childNodes;
        var bodyPart = document.createElement("BODY");
        var childPart;

        for(var i = 2; 'selected' != childNode[i].nodeid; i++) {
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



//---------------------------------------------------------------------------------------------------------------------------




    // RIGHT KEY
    Mousetrap.bind(keyboard[4], () => {
	var childNode = document.body.childNodes;
	for (var i = 2; 'selected' != childNode[i].nodeid; i++)
	{
	}
	childNode[i + 1].nodeid = 'selected';
	childNode[i].nodeid = '';
    })


    //LEFT KEY
    Mousetrap.bind(keyboard[3], () => {
	var childNode = document.body.childNodes;
	for (var i = 2; 'selected' != childNode[i].nodeid; i++)
	{
	}
	childNode[i - 1].nodeid = 'selected';
	childNode[i].nodeid = '';
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
	for (i < childNode.lenght, i--)
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
	for (i < childNode.lenght, i++)
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
