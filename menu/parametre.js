import SizeList from "./SizeList"
import FontList from "./FontList"
import PaletteList from "./PaletteList"
import VoiceList from "./VoiceList"

var init_menu = 0;

function create_parameters()
{
    var div = document.createElement("div");
    div.id = "P_create";
    document.body.appendChild(div);
    document.getElementById("P_create").innerHTML = parameters();
}



function parameters()
{
    var font =
    {
        loading: true,
        disease: "Basique"
    };

    onChange(e)
    {
        font.disease = e.target.value;
    }

    return ('<div className="Parameters">' +
        '<div className="Online">' +
        '<SizeList disease={font.disease}/>' +
        '<FontList disease={font.disease}/>' +
        '</div>' +
        '<PaletteList disease={font.disease}/>' +
        '<VoiceList setSelectedVoice={font.setSelectedVoice}/>' +
            '<\div>');
}
