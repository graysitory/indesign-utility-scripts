

// TODO: check for active document; selected text. 
// TODO: provide checkbox option for whether or not to replace with style

var myVersion = "0.1";
var myName = "Numbered List Fixer - Version " + myVersion;
var myDescription = "Find lists in which people have actually typed a number followed by a period followed by a space.";
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
var myDropdownOptions = getParagraphsByName(myParagraphStyles); // get names of all paragraph styles
var myDropdownSelection; 


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


function getParagraphsByName(myParagraphStyles) { // get all paragraph style names for dropdown
        
        var paragraphsByName = [];
        
        for (var i = 0; i < myParagraphStyles.length; i++) {
            
                    paragraphsByName.push(myParagraphStyles[i].name) // push name of paragraph style to array   
                    
                }
        
        return paragraphsByName;
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
     
         

    var myDropdownPanel = myWindow.add("panel", undefined, "Select Paragraph Style to Apply");
    var myDropdownGroup = myWindow.add("dropdownlist", undefined, myDropdownOptions);
            
            myDropdownGroup.onChange = function() {
                myDropdownSelection = myDropdownGroup.selection.index; // chagne global variable to index of seleted option on change.
                };
          
               
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
            
            buildWindow(myWindow);
            
            
            if (myWindow.show() == true) { // if the dialog window is showing (ok is clicked)      
                    
                      if ((mySelection == "") || (mySelection == undefined)) { // make sure user has selected text
                            alert("Please select the text you want to clean up, and run this script again.")
                    } else {
                            myChangeGrep(mySelection); // run grep to remove leading numbers
                                var paragraphStyleToApply = myParagraphStyles.itemByName(myDropdownOptions[myDropdownSelection]); // get paragraph style object by name from the myDropdownOptions Array
                                       mySelection.applyParagraphStyle(paragraphStyleToApply); // apply paragraph style to selection.
            }    
                    
                
                }
    
    }


main();