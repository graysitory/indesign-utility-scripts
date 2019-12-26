
var myWindow = new Window("dialog", "test")







var myFirstGroup = myWindow.add("group", undefined);
var activateStatus = myFirstGroup.add("checkbox", undefined, "activate below group.");
       activateStatus.value = true;

        
var mySecondGroup = myWindow.add("panel", undefined, "");
var myDropdownList = mySecondGroup.add("dropdownlist", undefined, ["one", "two", "three"]);

        activateStatus.onClick = function() {
                
                if (activateStatus.value == true) {
                     mySecondGroup.enabled = true;
                     //myDropdownList.enabled = true;
                     $.writeln("enabled")
                    } else {
                       mySecondGroup.enabled = false;
                      // myDropdownList.enabled = false;
                       $.writeln("disabled")
                        }
                    
                    myWindow.update(); // redraw 
            };


myWindow.show();