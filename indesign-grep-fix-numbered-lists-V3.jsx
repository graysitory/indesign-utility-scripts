
// TODO: load all paragraph styles, allow user to select to apply to item.

var myVersion = "0.1";
var myName = "Numbered List Fixer - Version " + myVersion;
var myDescription = "Find lists in which people have actually typed a number followed by a period followed by a space.";
var myExampleFrom = "1. item 1";
var myExampleTo = "item 1"
var myNotes = ""
var grepFindStringNumber = {findWhat: "^\\d+(\\.)?(\\))?([ \\t])"};
var grepFindStringBullet = {findWhat: "^\\W+(\\.)?(\\))?([ \\t])"};
var grepFindStringLetter = {findWhat: "^\\[A-Za-z]+(\\.)?(\\))?([ \\t])"};
var grepChangeString = {changeTo: ""};

if (app.documents.length > 0) {
  var myDoc = app.activeDocument;
} else {
  alert("Please make sure a document is open, select the text you want to clean up, and run this script again.");
  exit(0);
}


function myChangeGrep(mySelection, grepFindString) {
   
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


function myGetAllDocumentStyles() { // returns array of all paragraph style names
        var allParagraphStyles = myDoc.paragraphStyles;
        var paragraphStylesByName = [];
        
        for (var i = 0; i < allParagraphStyles.length; i++) {
                
                paragraphStylesByName.push(allParagraphStyles[i].name);
    
            }
        
        return paragraphStylesByName
    }

function myGetAllListStyles() {
        var allParagraphStyles = myDoc.paragraphStyles;
        var paragraphStylesByName = [];
        
        var bulletListValue = 1280598644; // return value for Object.bulletsAndNumberingListType --- when Object is a bulleted list
        var numberedListValue = 1280601709; // return value for Object.bulletsAndNumberingListType --- when Object is a numbered list
        var noListValue = 1280601711; // return value for Object.bulletsAndNumberingListType --- when Object does not have a list type property
        
        for (var i = 0; i < allParagraphStyles.length; i++) {
                if ((allParagraphStyles[i].bulletsAndNumberingListType == bulletListValue) || (allParagraphStyles[i].bulletsAndNumberingListType == numberedListValue)) {
                        paragraphStylesByName.push(allParagraphStyles[i].name);
                    }
            }
        
        return paragraphStylesByName;
    }

function populateDropdown(targetDropdown, itemArr) { // populate the paragraph style select dropdown

        targetDropdown.removeAll(); // remove all children

        for (var i = 0; i < itemArr.length; i++) {
               targetDropdown.add("item", itemArr[i]); // populate list with new values
            }

    }


function buildWindow(myWindow) {

      var myPreferredSize = [600,50];
        
               myWindow.preferredSize = myPreferredSize;
               myWindow.margins = 20;
               myWindow.alignChildren = "fill";
               
     // panel describing script
     var myDescriptionPanel = myWindow.add("panel", undefined, "Description");
            myDescriptionPanel.add("statictext", undefined, myDescription);
            myDescriptionPanel.preferredSize = myPreferredSize;
            myDescriptionPanel.alignChildren = "left";
      
      // panel giving an example of the changes
      var myExamplePanel = myWindow.add("panel", undefined, "Changes:");
            myExamplePanel.preferredSize = myPreferredSize;
            myExamplePanel.alignChildren = "left";
            
        var myExamplePanelExamples = myExamplePanel.add("group", undefined);
               myExamplePanelExamples.margins = [0,8,0,8]; // left, top, right, bottom
                
                var myExampleFromPanel = myExamplePanelExamples.add("panel", undefined, "From");
                       myExampleFromPanel.add("statictext", undefined, myExampleFrom);
                var myExampleToPanel = myExamplePanelExamples.add("panel", undefined, "To");
                       myExampleToPanel.add("statictext", undefined, myExampleTo);
                       
         var myOptionsPanel = myWindow.add("panel", undefined, "Options");
                myOptionsPanel.preferredSize = myPreferredSize;
                myOptionsPanel.alignChildren = "left";
                myOptionsPanel.orientation = "row";
                myOptionsPanel.spacing = 50;
                
              var myOptionsAssignStyleGroup = myOptionsPanel.add("group");
                     myOptionsAssignStyleGroup.alignment = "left"
                      myOptionsAssignStyleGroup.margins = 10;
                      
                    var myAssignStyleCheckbox = myOptionsAssignStyleGroup.add("checkbox", undefined, "Apply a paragraph style to cleaned text.");

                    var myOptionsOnlyShowListsGroup = myOptionsPanel.add("group");
                    var myShowListsCheckbox = myOptionsOnlyShowListsGroup.add("checkbox", undefined, "Only show Numbered or Bulleted List styles.");
                           myOptionsOnlyShowListsGroup.alignment = "right";

  // set default checkbox values to true
  myAssignStyleCheckbox.value = true;
  // starting value determined by setOptions(). myShowListsCheckbox.value = false;

    var myDropdownPanel = myWindow.add("panel", undefined, "Select Paragraph Style to Apply");
    var myDropdown = myDropdownPanel.add("dropdownlist", undefined, []);
    
    
    populateDropdown(myDropdown, myGetAllListStyles())
         
     // panel with notes/instructions    
      var myNotesPanel = myWindow.add("panel", undefined, "Notes")
             var myNotesPanelText = myNotesPanel.add("statictext", undefined, myNotes, {multiline: true});
                    myNotesPanelText.preferredSize = myPreferredSize;
                        
                        
       // ok, cancel buttons
        var myActionGroup = myWindow.add("group", undefined);
                myActionGroup.alignment = "right";
                
                var myCancelBtn = myActionGroup.add("button", undefined, "Cancel"); // auto responds to Esc key
                var myOkBtn = myActionGroup.add("button", undefined, "Run", {name: "ok"}); // auto responds to Enter key

    }

function main() {
     app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL; // allow user interaction with dialogs
    
     var mySelection = app.selection[0];  // get selected text
    
    
    var myWindow = new Window("dialog", myName); // create dialog window
            // resizable window:  var myWindow = new Window("dialog", myName, undefined, {resizeable: true}); // create dialog window

        buildWindow(myWindow); // build dialog contents with function


       if (myWindow.show() == true) { // if the dialog window is showing (ok is clicked)
           
           if ((mySelection == "") || (mySelection == undefined)) {
               alert("Please select the text you want to clean up, and run this script again.")
               } else {
                myChangeGrep(mySelection, grepFindStringBullet);
            }
    
        }
    
    }


main();