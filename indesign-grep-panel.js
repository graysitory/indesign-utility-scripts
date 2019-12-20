
// TODO: highlight line endings that don't have city, ST

var version = 1.0;

var actionArr = new Array();

// GREP strings: refrence name, friendly name, description, example, grep string, default value
var grepAction1 = ["grep1", "Grep Action 1", "Removes commas between project name and city, state as exported by Vision.", "...Li Ka Shing Center, Berkeley, CA ==> ...Li Ka Shing Center Berkeley, CA", "grepString", false];

var grepAction2 = ["grep2", "Grep Action 2", "Does something else", "example", "grep string", true];

actionArr.push(grepAction1);


function autoGetMyInput() { // attempt to allow for looping through an array of settings and defining a checkbox for each. Not sure how to implement without declaring a unique var for each checbox.
    
    var myWindow = new Window("dialog", "Text Cleanup - version " + version);
            myWindow.preferredSize = [500, 500];
            
            var myActionsPanel = myWindow.add("panel", undefined, "Cleanup Actions");
                myActionsPanel.orientation = "column";
                myActionsPanel.alignChildren = "left";
                myActionsPanel.margins = 20;
                myActionsPanel.preferredSize = [420,500];
            
            
            for (var i = 0; i < actionArr.length; i++) { // loop through actionArr
                
                
                for (var j = 0; j < actionArr[i].length; j++) { // loop through each arr in actionArr
                    
                            $.writeln(actionArr[i][j]); // print each element in each array of actionArr
                    
                    }
                
                }
            
            
            myWindow.show();
    
    }







function getMyInput() {
        
        var myWindow = new Window("dialog", "Text Cleanup - version " + version);
            myWindow.preferredSize = [450,600]
            
         var myChecklistPanel = myWindow.add("panel", undefined, "Cleanup Actions");
                myChecklistPanel.orientation = "column";
                myChecklistPanel.alignChildren = "left";
                myChecklistPanel.margins = 20;
                myChecklistPanel.preferredSize = [420,500];
                
                function buildCheckbox(panel, arr) {
                    
                    
                    var checklistGroup = panel.add("group", undefined);
                            checklistGroup.orientation = "column";
                    
                    var checklistItem = checklistGroup.add("checkbox", undefined, arr[1]);
                            checklistItem.margins = 0;
                            var descriptionGroup = panel.add("group", undefined);
                             var description = descriptionGroup.add("statictext", undefined, arr[2]);
                            descriptionGroup.add("statictext", undefined, "EXAMPLE: " + arr[3]);
                            checklistItem.value = arr[5];
                            
                    
                    checklistItem.margins = 0;
                    
                    }
                
               var grepAction4 = buildCheckbox(myChecklistPanel, grepAction1);
         
         
            var myGrepAction1 = myChecklistPanel.add("checkbox", undefined, grepAction1[1]);
            myGrepAction1.value = grepAction1[5];
            myChecklistPanel.add("statictext", undefined, grepAction1[2]);
            
            var myGrepAction2 = myChecklistPanel.add("checkbox", undefined, grepAction2[1]);
            myGrepAction2.value = grepAction2[5];
            
            
            
         var myActionBtnGroup = myWindow.add("group");
            var myCancelBtn = myActionBtnGroup.add("button", undefined, "Cancel");
            var myOkBtn = myActionBtnGroup.add("button", undefined, "Ok");
            
          myOkBtn.onClick = function() {
              
             $.writeln("ok clicked");
             exit();
              }
    
        myWindow.show();
    
    }

// getMyInput();

getMyInput()