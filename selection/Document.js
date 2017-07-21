import Mousetrap from 'mousetrap'
import keyboard  from './keyboard.js';

this.typeSelected = "";
this.initElements();
this.voice = true;
this.maxElements = 0;
this.selectedText = "";
this.synth = "";
this.loading: true;
this.selected: 0;
this.selectAlled: 1;
//this.typeSelected: "";
this.htmlRender: "";


function selection()
{
    context = this;


    // RIGHT KEY
    Mousetrap.bind(keyboard[4], () => {
        let priorityOrder = ["h1", "h2", "h3", "h4", "h5", "p", "li"];
        let found = false;
        for(let j=0;(j<5)&&(found===false);j++)
        {
            for(let k=0;(k<context.elements[priorityOrder[j]].length)&&(found===false);k++)
            {
                if(context.elements[priorityOrder[j]][k] === context.selected + 1 || context.selected >= context.maxElements - 1)
                {
                    found = true
                }
            }
        }
    if(found===false)
    {
        this.selected = context.selected + 1;
        this.selectAlled = context.selected + 1;
        context.updateSpeak();
        context.speak()
    }
    })


    //LEFT KEY
    Mousetrap.bind(keyboard[3], () => {
        let priorityOrder = ["h1", "h2", "h3", "h4", "h5", "p", "li"];
        let found = false;
        for(let j=0;(j<5)&&(found===false);j++)
        {
            for(let k=0;(k<context.elements[priorityOrder[j]].length)&&(found===false);k++)
            {
                if(context.elements[priorityOrder[j]][k] === context.selected)
                {
                    found = true
                }
            }
        }
    if(found===false)
    {
        this.selected = context.selected - 1;
        this.selectAlled = context.selected + 1;
        context.updateSpeak();
        context.speak()
    }
    })


    // UP KEY
    Mousetrap.bind(keyboard[2], () => {
        let priorityOrder = ["h1", "h2", "h3", "h4", "h5", "p", "li"];
        let currentElement = -1;
        let found = false;
        for(let i=1; (context.selected + i < context.maxElements-1)&&(found===false);i++)
        {
            for(let j=0;(j<5)&&(found===false);j++)
            {
                for(let k=0;(k<context.elements[priorityOrder[j]].length)&&(found===false);k++)
                {
                    if(context.elements[priorityOrder[j]][k] === context.selected + i)
                    {
                        currentElement = context.selected + i;
                        found = true
                    }
                }
            }
        }
    if(found===true)
    {
        this.selected = currentElement;
        context.selectAll();
        context.updateSpeak();
        context.speak()
    }
    })


    // DOWN KEY
    Mousetrap.bind(keyboard[1], () => {
        let priorityOrder = ["h1", "h2", "h3", "h4", "h5", "p", "li"];
        let currentElement = -1;
        let found = false;
        for(let i=1; (context.selected - i >= 0)&&(found===false);i++)
        {
            for(let j=0;(j<5)&&(found===false);j++)
            {
                for(let k=0;(k<context.elements[priorityOrder[j]].length)&&(found===false);k++)
                {
                    if(context.elements[priorityOrder[j]][k] === context.selected - i)
                    {
                        currentElement = context.selected - i;
                        found = true
                    }
                }
            }
        }
    if(found===true)
    {
        this.selected = currentElement;
        context.selectAll();
        context.updateSpeak();
        context.speak();
    }
    })

    initElement()
    {
        this.elements =
            {
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                p: [],
                li: [],
                ol: [],
                ul: []
            }
    }
}

/*
function new_selected_elem()
{
    document.getElementsByClassName("selected").className = ""; //l'élément selectionée devien une classe nul
    context.state.selected.getElementsByTagName("poulet").className = "selected"; //changement de classe
}
*/