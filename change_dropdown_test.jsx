

var myWindow = new Window("dialog", undefined);

var arr1 = ["Dog", "Cat", "Horse"]
var arr2 = ["Car", "Plane", "Boat"]


var myDropdown = myWindow.add("dropdownlist", undefined, arr1);


var myBtn = myWindow.add("button", undefined, "Change");

var boolStatus = false;


function changeDropdown() {
 
    myDropdown.removeAll()
   
    for (var i = 0; i < arr2.length; i++) {
        myDropdown.add("item", arr2[i])
        }
    myWindow.update();
    }


myBtn.onClick = function() {
    changeDropdown();
    myWindow.update();
    }

myWindow.show();