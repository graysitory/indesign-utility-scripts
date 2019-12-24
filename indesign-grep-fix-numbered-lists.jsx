﻿
// TODO: load all paragraph styles, allow user to select to apply to item.

var myVersion = "0.1";
var myName = "Numbered List Fixer - Version " + myVersion;
var myDescription = "Find lists in which people have actually typed a number followed by a period followed by a space.";
var myExampleFrom = "1. item 1";
var myExampleTo = "item 1"
var myNotes = ""
var grepFindString = {findWhat: "^\\d+(\\.)?(\\))?([ \\t])"};
var grepChangeString = {changeTo: ""};




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
                myChangeGrep(mySelection);
            }
    
        }
    
    }


main();