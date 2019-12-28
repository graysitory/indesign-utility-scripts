//https://www.typefi.com/extendscriptAPI/indesign/#GroupSUI.html
// TODO: check for active document; selected text.
// TODO: provide checkbox option for whether or not to replace with style
// TODO: provide option to only show numbered/bullet lists; re-get paragraph styles if so
// TODO: Create a "notes" button with longer description of function...use active/inactive window?
// TODO: add radio buttons to specify between bullet, number and lettered lists

var myVersion = "0.6";
var myName = "Numbered List Fixer - Version " + myVersion;
var myDescription = "Formats numbered lists copied to InDesign that retained leading digits, for example: \r\r    1) line of text \r    2) line of text \r\rScript will remove leading digits and apply the selected number/list style.";
var myNotes = ""
var grepFindString = {findWhat: "^\\d+(\\.)?(\\))?([ \\t])"};
var grepChangeString = {changeTo: ""};

// make sure a document is open and set the active one to the target document.
if (app.documents.length > 0) {
  var myDoc = app.activeDocument;
} else {
  alert("Please make sure a document is open, select the text you want to clean up, and run this script again.");
  exit(0);
}

var myParagraphStyles = myDoc.paragraphStyles; // get all paragraph styles in the document
var myDropdownOptions;// = getListParagraphStylesByName(myParagraphStyles); // get names of all paragraph styles
var myDropdownSelection;
var myListTypeSelection;


function myChangeGrep(mySelection) {

  // http://jongware.mit.edu/idcs6js/pc_Application.html#changeGrep

  // clear find preferences
  app.findGrepPreferences = NothingEnum.nothing;
  app.changeGrepPreferences = NothingEnum.nothing;


  // set find preferences
  app.findGrepPreferences.properties = grepFindString;
  app.changeGrepPreferences.properties = grepChangeString;

  // Run grep find/change on selection
  mySelection.changeGrep();

  // clear find preferences
  app.findGrepPreferences = NothingEnum.nothing;
  app.changeGrepPreferences = NothingEnum.nothing;

}

function getListParagraphStylesByName(myParagraphStyles) {
  var paragraphsByName = []; 



    var bulletListValue = 1280598644; // values set by ID DOM, what styleInQuestion.bulletsAndNumberingListType returns.
    var numberedListValue = 1280601709; // values set by ID DOM, what styleInQuestion.bulletsAndNumberingListType returns.
    var noListValue = 1280601711; // values set by ID DOM, what styleInQuestion.bulletsAndNumberingListType returns.
    

    for (var i = 0; i < myParagraphStyles.length; i++) { // loop through each document paragraph style, and:


        if ((myParagraphStyles[i].bulletsAndNumberingListType == bulletListValue) || (myParagraphStyles[i].bulletsAndNumberingListType == numberedListValue)) { // if the paragraph style returns as a numbered list or bullet list, push to array.
            paragraphsByName.push(myParagraphStyles[i].name)
            }
       
    }
    myDropdownOptions = paragraphsByName;
    return paragraphsByName;
}


function getParagraphsByName(myParagraphStyles) { // get all paragraph style names for dropdown

  var paragraphsByName = [];

  for (var i = 0; i < myParagraphStyles.length; i++) {

    paragraphsByName.push(myParagraphStyles[i].name) // push name of paragraph style to array

  }
    myDropdownOptions = paragraphsByName;
  return paragraphsByName;
}

function populateDropdown(targetDropdown, itemArr) { // populate the paragraph style select dropdown
    
        targetDropdown.removeAll(); // remove all children
        
        for (var i = 0; i < itemArr.length; i++) { 
               targetDropdown.add("item", itemArr[i]); // populate list with new values
            }
        
    }



function buildWindow(myWindow) {
  var myPreferredSize = [600, 50];

  myWindow.preferredSize = myPreferredSize;
  myWindow.margins = 20;
  myWindow.alignChildren = "fill";

var myDescriptionPanelGroup = myWindow.add("group");
       myDescriptionPanelGroup.alignChildren = ["fill", "fill"]
       
  // panel describing script
  var myDescriptionPanel = myDescriptionPanelGroup.add("panel", undefined, "Description");
      myDescriptionPanel.preferredSize = myPreferredSize;
      myDescriptionPanel.alignChildren = "left";
      myDescriptionPanel.margins = 20;
      
      

  var myDescriptionPanelText = myDescriptionPanel.add("statictext", undefined, myDescription, {multiline: true});
      myDescriptionPanelText.minimumSize = myPreferredSize;

// radio button selector to specify list type
var myListTypeOptionsPanel = myDescriptionPanelGroup.add("panel", undefined, "List Type");
       myListTypeOptionsPanel.alignChildren = "left";
       myListTypeOptionsPanel.margins = 20;
       
       
       var listTypeNumbered = myListTypeOptionsPanel.add("radiobutton", undefined, "Numbered List");
        var listTypeBullet = myListTypeOptionsPanel.add("radiobutton", undefined, "Bullet List");
        var listTypeLettered = myListTypeOptionsPanel.add("radiobutton", undefined, "Lettered List");
        
    
        
        listTypeNumbered.value = true; // set default list type
  //      getListTypeOptionSelection(); // set initial value
        
//        myListTypeOptionsPanel.addEventListener("click", getListTypeOptionSelection(event), false);


        
        

     //   myListTypeOptionsPanel.minimumSize = myPreferredSize;
        
       // myListTypeOptionsPanel.minimumSize.height = myDescriptionPanel.size.height

  //NOTE: Because checkbox doesn't have a margin property, it can't be set; need to add to group to add margin settings.

  var myOptionsPanel = myWindow.add("panel", undefined, "Options");
      myOptionsPanel.preferredSize = myPreferredSize;
      myOptionsPanel.orientation = "row";
      myOptionsPanel.spacing = 50;

  var myOptionsAssignStyleGroup = myOptionsPanel.add("group");
  var myAssignStyleCheckbox = myOptionsAssignStyleGroup.add("checkbox", undefined, "Assign a paragraph style to cleaned text.");
      myOptionsAssignStyleGroup.alignment = "left"
      myOptionsAssignStyleGroup.margins = 10;

  var myOptionsOnlyShowListsGroup = myOptionsPanel.add("group");
  var myShowListsCheckbox = myOptionsOnlyShowListsGroup.add("checkbox", undefined, "Only show numbered or bullet list styles.");
      myOptionsOnlyShowListsGroup.alignment = "right";

  // set default checkbox values to true
  myAssignStyleCheckbox.value = true;
  myShowListsCheckbox.value = true;
  
    var myDropdownPanel = myWindow.add("panel", undefined, "Select Paragraph Style to Apply");
    var myDropdownGroup = myDropdownPanel.add("dropdownlist", undefined, []);
    
   populateDropdown(myDropdownGroup, getListParagraphStylesByName(myParagraphStyles)) // inital populate dropdown
   
   
    myShowListsCheckbox.onClick = function() { // watch for changes to checkbox and change dropdown accordingly
            if (myShowListsCheckbox.value == true) {
                  populateDropdown(myDropdownGroup, getListParagraphStylesByName(myParagraphStyles))
                } else {
                    populateDropdown(myDropdownGroup, getParagraphsByName(myParagraphStyles))
                    }
        }

      myDropdownGroup.onChange = function() {
        myDropdownSelection = myDropdownGroup.selection.index; // chagne global variable to index of seleted option on change.
  };

  
  // ok, cancel buttons
  var myActionGroup = myWindow.add("group", undefined);
  myActionGroup.alignment = "right";

  var myCancelBtn = myActionGroup.add("button", undefined, "Cancel"); // auto responds to Esc key
  var myOkBtn = myActionGroup.add("button", undefined, "Run", {
    name: "ok"
  }); // auto responds to Enter key

}


function main() {
  app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL; // allow user interaction with dialogs

  var mySelection = app.selection[0]; // get selected text

  var myWindow = new Window("dialog", myName); // create dialog window

    function getListTypeSelection() {
        for (var i = 0; i < myListTypeOptionsPanel.children.length; i++) {
                if (myListTypeOptionsPanel.children[i].value == true) {
                    var myListTypeSelection = myListTypeOptionsPanel.children[i].text;
                    $.writeln(myListTypeOptionsPanel.children[i].text)
                    break;
                    }
            return myListTypeSelection;
        }

  buildWindow(myWindow, getListTypeSelection);


  if (myWindow.show() == true) { // if the dialog window is showing (ok is clicked)

    if ((mySelection == "") || (mySelection == undefined)) { // make sure user has selected text
      alert("Please select the text you want to clean up, and run this script again.")
    } else {
        if (listTypeNumbered.value == true) {
            $.writeln("asdfasdf")
            }
            
        
      myChangeGrep(mySelection); // run grep to remove leading numbers
      var paragraphStyleToApply = myParagraphStyles.itemByName(myDropdownOptions[myDropdownSelection]); // get paragraph style object by name from the myDropdownOptions Array
      
      mySelection.applyParagraphStyle(paragraphStyleToApply); // apply paragraph style to selection.
    }


  }

}


main();
