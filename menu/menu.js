import SizeList from "./SizeList"
import FontList from "./FontList"
import PaletteList from "./PaletteList"
import VoiceList from "./VoiceList"

function create_parameters()
{
    var div = document.createElement("div");
    div.id = "P_create";
    document.body.appendChild(div);
    document.getElementById("P_create").innerHTML = parameters();
}



function parameters()
{
    var poulet =
    {
        loading: true,
        disease: "Basique"
    };

    onChange(e)
    {
        poulet.disease = e.target.value;
    }

    Parameters.getElementById('P_create').innerHTML = '<div className="Parameters">' +
        '<div className="Online">' +
        '<SizeList disease={poulet.disease}/>' +
        '<FontList disease={poulet.disease}/>' +
        '</div>' +
        '<PaletteList disease={poulet.disease}/>' +
        '<VoiceList setSelectedVoice={poulet.setSelectedVoice}/>' +
        '<\div>';
}
