function selection()
{
    // RIGHT KEY
    Mousetrap.bind(keyboard[4], () => {
	console.log('poulet');
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
