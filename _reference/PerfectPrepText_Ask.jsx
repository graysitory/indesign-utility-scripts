//DESCRIPTION: Neutralise or restore text styles
// Peter Kahrel -- www.kahrel.plus.com


main ();

function main ()
    {
    switch (ToDo(app.activeDocument))
        {
        case 1: neutraliseStyles (app.activeDocument); break;
        case 2: restoreStyles (app.activeDocument);
        }
    }


function ToDo (doc)
    {
    var w = new Window ("dialog");
        var panel = w.add ("panel"); panel.alignChildren = "left";
            panel.add ("radiobutton", undefined, " Neutralise text styles\u00A0");
            panel.add ("radiobutton", undefined, " Restore text styles\u00A0");
        var buttons = w.add ("group");
            buttons.add ("button", undefined, "OK");
            buttons.add ("button", undefined, "Cancel");
    if (File(String (doc.fullName).replace(/\.indd$/, "_____copy.indd")).exists)
        panel.children[1].value = true;
    else
        panel.children[0].value = true;
    if (w.show() == 2) {w.close(); exit();}
    else {if (panel.children[0].value) var val = 1 else var val = 2; w.close();}
    return val;
    }


function neutraliseStyles (doc)
	{
		function neutraliseSub (styles)
			{
			var props = styles[0].properties;
			for (var i=1; i < styles.length; i++)
				{
				styles[i].properties = props; // This is the equivalent of "Reset to base"
				}
			} // neutraliseSub

	// Save the document as a copy so that we can retrieve the text styles from it later
	var copyName = String (doc.fullName).replace(/\.indd$/, "_____copy.indd");
	doc.saveACopy (File (copyName));
	// Now neutralise the text styles
	neutraliseSub (doc.allCharacterStyles);
	neutraliseSub (doc.allParagraphStyles);
	} // neutraliseStyles


function restoreStyles (doc)
	{
	var source = String (doc.fullName).replace(/\.indd$/, "_____copy.indd");
	doc.importStyles (ImportFormat.paragraphStylesFormat, File (source), GlobalClashResolutionStrategy.loadAllWithOverwrite);
	doc.importStyles (ImportFormat.characterStylesFormat, File (source), GlobalClashResolutionStrategy.loadAllWithOverwrite);
    File(source).remove();
	} // restoreStyles
