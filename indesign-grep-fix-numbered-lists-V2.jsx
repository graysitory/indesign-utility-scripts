//https://www.typefi.com/extendscriptAPI/indesign/#GroupSUI.html

// TODO: Create a "notes" button (or tab) with longer description of function...use active/inactive window?
// TODO: If document only has default [no] or [Basic] styles, disable dropdown or checkbox?


// DONE: check for active document; selected text.
// DONE: provide checkbox option for whether or not to replace with style
// DONE: provide option to only show numbered/bullet lists; re-get paragraph styles if so
// DONE: add radio buttons to specify between bullet, number and lettered lists

var myVersion = "2.4";
var myName = "Numbered List Fixer - Version " + myVersion;
var myDescription = "Formats numbered lists copied to InDesign that retained leading digits, for example:\r\u00A0\u00A01) line of text\r\u00A0\u00A02) line of text\rScript will remove leading digits and apply the selected number/list style.\rFor lists that have bullets or letters, select the appropriate list type to the right.";
var myNotes = ""
var grepFindStringNumbered = {findWhat: "^\\d+(\\.)?(\\))?([ \\t])"};
var grepFindStringBullet = {findWhat: "^\\W(\\.)?(\\))?([ \\t])"};
var grepFindStringAlphabet = {findWhat: "^\\[A-Za-z](\\.)?(\\))?([ \\t])"}
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
var myListTypeSelection
var myDefaultParagraphStylesOnly = checkForDefaultParagraphStyles();


function checkForDefaultParagraphStyles() { // check if document only has the default [No Paragraph] and [Basic Paragraph] styles.
  var myParagraphStyles = myDoc.paragraphStyles;

  if (myParagraphStyles.length <= 2) {
    return true;
  } else {
    return false;
  }

}


function myChangeGrep(mySelection, grepFindString, grepChangeString) {

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

function getListParagraphStylesByName(myParagraphStyles) { // get all paragraph styles that are bullet, numbered, or list type
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

function getParagraphsByName(myParagraphStyles) { // get all paragraph styles in document

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

function multilineTextSplitter(str, target) { // split string by \r and makes individual statictext objects for each

      var multilineString = str.split('\r');

      for (var i = 0; i < multilineString.length; i++) {
        target.add("statictext", undefined, multilineString[i])
      }

    }

function buildWindow(myWindow) {
  var myPreferredSize = [600, 50];

  myWindow.preferredSize = myPreferredSize;
  myWindow.margins = 20;
  myWindow.alignChildren = "fill";

  var myDescriptionAndListTypeGroup = myWindow.add("group", undefined);
      myDescriptionAndListTypeGroup.alignChildren = "fill"

  // panel describing script
  var myDescriptionPanel = myDescriptionAndListTypeGroup.add("panel", undefined, "Description");
      myDescriptionPanel.preferredSize = myPreferredSize;
      myDescriptionPanel.alignChildren = "left";
      myDescriptionPanel.margins = 20;

      multilineTextSplitter(myDescription, myDescriptionPanel)

  //var myDescriptionPanelText = myDescriptionPanel.add("statictext", undefined, myDescription, {multiline: true});
      //myDescriptionPanelText.minimumSize = [500,10]

  // set options for list type. Default is numbered.
  var myListTypeOptionsPanel = myDescriptionAndListTypeGroup.add("panel", undefined, "List Type");
      myListTypeOptionsPanel.margins = 20;
      myListTypeOptionsPanel.alignChildren = "left";

      var myListTypeOptionsNumbered = myListTypeOptionsPanel.add("radiobutton", undefined, "Numbered List");
      var myListTypeOptionsBullet = myListTypeOptionsPanel.add("radiobutton", undefined, "Bulleted List");
      var myListTypeOptionsAlphabet = myListTypeOptionsPanel.add("radiobutton", undefined, "Lettered List");


      // set default value for global variables
      myListTypeOptionsNumbered.value = true;
      myListTypeSelection = myListTypeOptionsNumbered.text;

      // event listeners for changing list type
      myListTypeOptionsNumbered.onClick = function() {
        myListTypeSelection = myListTypeOptionsNumbered.text;
      }

      myListTypeOptionsBullet.onClick = function() {
        myListTypeSelection = myListTypeOptionsBullet.text;
      }

      myListTypeOptionsAlphabet.onClick = function() {
        myListTypeSelection = myListTypeOptionsAlphabet.text;
      }



  //NOTE: Because checkbox doesn't have a margin property, it can't be set; need to add to group to add margin settings.

  var myOptionsPanel = myWindow.add("panel", undefined, "Options");
      myOptionsPanel.preferredSize = myPreferredSize;
      myOptionsPanel.orientation = "row";
      myOptionsPanel.spacing = 50;

  var myOptionsAssignStyleGroup = myOptionsPanel.add("group");
  var myAssignStyleCheckbox = myOptionsAssignStyleGroup.add("checkbox", undefined, "Apply a paragraph style to cleaned text.");
      myOptionsAssignStyleGroup.alignment = "left"
      myOptionsAssignStyleGroup.margins = 10;

  var myOptionsOnlyShowListsGroup = myOptionsPanel.add("group");
  var myShowListsCheckbox = myOptionsOnlyShowListsGroup.add("checkbox", undefined, "Only show Numbered or Bulleted List styles.");
      myOptionsOnlyShowListsGroup.alignment = "right";

  // set default checkbox values to true
  myAssignStyleCheckbox.value = true;
  // starting value determined by setOptions(). myShowListsCheckbox.value = false;

    var myDropdownPanel = myWindow.add("panel", undefined, "Select Paragraph Style to Apply");
    var myDropdownGroup = myDropdownPanel.add("dropdownlist", undefined, []);

   populateDropdown(myDropdownGroup, getParagraphsByName(myParagraphStyles)) // inital populate dropdown



  function setOptions() { // enable/disable checkbox and dropdown panel based on value
     if (myAssignStyleCheckbox.value == false) { // if assign style is false, disable showLists and dropdown panel
       myShowListsCheckbox.enabled = false;
       myDropdownPanel.enabled = false;
     } else if ((myAssignStyleCheckbox.value == true) && (getListParagraphStylesByName(myParagraphStyles) == 0)) { // if assign style is true, but the document doesn't have any list styles, enable dropdown, but disable show lists checkbox
       myShowListsCheckbox.enabled = false;
       myDropdownPanel.enabled = true;
     } else {
       myShowListsCheckbox.enabled = true;
       myDropdownPanel.enabled = true;
     }

   }

  setOptions(); // run setOptions on window build
  myAssignStyleCheckbox.onClick = function() { // run setOptions on click of myAssignStyleCheckbox
    setOptions();
  };


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

  buildWindow(myWindow);

  function getSelectedListType(targetRadioParentGroup) {
    for (var i=0; i < targetRadioParentGroup.length; i++) {
      if (targetRadioParentGroup.children[i].value == true) {
        return targetRadioParentGroup.children[i].text;
      }
    }
  }


  if (myWindow.show() == true) { // if the dialog window is showing (ok is clicked)

    if ((mySelection == "") || (mySelection == undefined)) { // make sure user has selected text
      alert("Please select the text you want to clean up, and run this script again.")
    } else {
      // determine type of grep string to use based on list type
      if (myListTypeSelection == "Numbered List") {
        myChagneGrep(mySelection, grepFindStringNumbered, grepChangeString);
      } else if (myListTypeSelection == "Bulleted List") {
        myChangeGrep(mySelection, grepFindStringBullet, grepChangeString);
      } else if (myListTypeSelection == "Lettered List") {
        myChangeGrep(mySelection, grepFindStringAlphabet, grepChangeString)
      } else {
        alert("Error - can't determine list type.")
        exit(0)
      }



      myChangeGrep(mySelection); // run grep to remove leading numbers
      var paragraphStyleToApply = myParagraphStyles.itemByName(myDropdownOptions[myDropdownSelection]); // get paragraph style object by name from the myDropdownOptions Array

      mySelection.applyParagraphStyle(paragraphStyleToApply); // apply paragraph style to selection.
    }


  }

}


main();
