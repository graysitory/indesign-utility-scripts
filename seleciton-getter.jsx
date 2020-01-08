


// REFERENCES
  // app.documents.item(0) appears to return the active document.??

          // DETERMINE PROPERTIES ACCESSIBLE FOR app.selection[t].constructor

var codeToPrinty;

function main() {

  app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll; // confirm user interaction with dialogs is enabled.

  if (app.documents.length > 0) { // if there are documents open
    if (app.selection.length > 0) {

    }
  }

}


function dialog() {

        // structure: [label, id, return value]

    var mySelectionOptions = [["Whole Document", "whole-doc", 1], ["Current Story", "current-story", 2], ["Selection", "selection", 3]]

    //var mySelectionOptions = ["Whole Document", "Current Story", "Selection"]

    var myWindow = new Window("dialog", undefined)

    var myPreferredMinimumSize = [400, 50]

        var myDescriptionPanel = myWindow.add("panel", undefined, "Description")
            myDescriptionPanel.minimumSize = myPreferredMinimumSize;
            myDescriptionPanel.add("statictext", undefined, "This is what the program does.")

        var myOptionsPanel = myWindow.add("panel", undefined, "Apply changes to:");
            myOptionsPanel.minimumSize = myPreferredMinimumSize;

            var myRadioBtnGroup = myOptionsPanel.add("group", undefined);
                myRadioBtnGroup.minimumSize = myPreferredMinimumSize;

                // for (var i = 0; i < mySelectionOptions.length; i++) {
                //   // var current = mySelectionOptions[i];
                //
                //   myRadioBtnGroup.add("radiobutton", undefined, "fuck you")
                // }

                for (var i = 0; i < mySelectionOptions.length; i++) {
                  var fuckthisshit = mySelectionOptions[i]
                  var thisIsDumb = myRadioBtnGroup.add("radiobutton", undefined, fuckthisshit[0], {id: fuckthisshit[1]})

                  thisIsDumb.addEventListener("click", function() {
                    alert()
                  })

                }

                // alert(mySelectionOptions.length)
                //
                // for (var i = 0; i < mySelectionOptions.length; i++) {
                //
                //   var targetOption = mySelectionOptions[i]
                //
                //   alert(targetOption[i])

                //   myRadioBtnGroup.add("radiobutton", undefined, targetOption[0], {name: targetOption[0], id: targetOption[1]})
                // }






            var myActionGroup = myWindow.add("group", undefined);
            myActionGroup.alignment = "right";

            var myCancelBtn = myActionGroup.add("button", undefined, "Cancel"); // auto responds to Esc key
            var myOkBtn = myActionGroup.add("button", undefined, "Ok")



        // property/seleciton return functions

          function getCurrentOption() {

          }

        myWindow.show()
  }


// dialog(app.selection[0].constructor.
dialog();
main();
