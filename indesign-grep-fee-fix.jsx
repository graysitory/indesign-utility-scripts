

var myVersion = "0.2";
var myName = "Fee Format " + myVersion;
var myDescription = "Adds monetary formatting to numbers in selected text. \rGreat for quickly formatting numbers in a fee chart.";
var myExampleFrom = "23412";
var myExampleTo = "$23,412"
var myNotes = ""


// var findChangeStrings = { // each key has an array of [findString, changeString]
//   // key value equates to number of digits in number
//   // find string = <word boundary>(digit group 1)(digit group 2)<word boundary>
//   // change string = $(digit group 1),(digit group 2)
//   one: [{findWhat: "\\b(\\d)(\\.\\d{2})?\\b"}, {changeTo: "$$1"}],
//   two: [{findWhat: "\\b(\\d{2})(\\.\\d{2})?\\b"}, {changeTo: "$$1"}],
//   three: [{findWhat: "\\b(\\d{3})(\\.\\d{2})?\\b"}, {changeTo: "$$1"}],
//   four: [{findWhat: "\\b(\\d)(\\d{3})(\\.\\d{2})?\\b"}, {changeTo: "$$1,$2"}],
//   five: [{findWhat: "\\b(\\d{2})(\\d{3})(\\.\\d{2})?\\b"}, {changeTo: "$$1,$2"}],
//   six: [{findWhat: "\\b(\\d{3})(\\d{3})(\\.\\d{2})?\\b"}, {changeTo: "$$1,$2"}],
//   seven: [{findWhat: "\\b(\\d)(\\d{3})(\\d{3})(\\.\\d{2})?\\b"}, {changeTo: "$$1,$2,$3"}],
//   eight: [{findWhat: "\\b(\\d{2})(\\d{3})(\\d{3})(\\.\\d{2})?\\b"}, {changeTo: "$$1,$2,$3"}],
//   nine: [{findWhat: "\\b(\\d{3})(\\d{3})(\\d{3})(\\.\\d{2})?\\b"}, {changeTo: "$$1,$2,$3"}],
//   ten: [{findWhat: "\\b(\\d)(\\d{3})(\\d{3})(\\d{3})(\\.\\d{2})?\\b"}, {changeTo: "$$1,$2,$3,$4"}],
//   eleven: [{findWhat: "\\b(\\d{2})(\\d{3})(\\d{3})(\\d{3})(\\.\\d{2})?\\b"}, {changeTo: "$$1,$2,$3,$4"}],
//   twelve: [{findWhat: "\\b(\\d{3})(\\d{3})(\\d{3})(\\d{3})(\\.\\d{2})?\\b"}, {changeTo: "$$1,$2,$3,$4"}]
// }


// var findChangeStrings = {
//   one: [{findWhat: "\\<(\\d{1})(.\\d{2})?\>"}, {changeTo: "$$1$2"}],
//   two: [{findWhat: "\\<(\\d{2})(.\\d{2})?\>"}, {changeTo: "$$1$2"}],
//   three: [{findWhat: "\\<(\\d{3})(.\\d{2})?\>"}, {changeTo: "$$1$2"}],
//   four: [{findWhat: "\\<(\\d{1}),?(\\d{3})(.\\d{2})?\>"}, {changeTo: "$$1,$2$3"}],
//   five: [{findWhat: "\\<(\\d{2}),?(\\d{3})(.\\d{2})?\>"}, {changeTo: "$$1,$2$3"}],
//   six: [{findWhat: "\\<(\\d{3}),?(\\d{3})(.\\d{2})?\>"}, {changeTo: "$$1,$2$3"}],
//   seven: [{findWhat: "\\<(\\d{1}),?(\\d{3}),?(\\d{3})(.\\d{2})?\>"}, {changeTo: "$$1,$2,$3$4"}],
//   eight: [{findWhat: "\\<(\\d{2}),?(\\d{3}),?(\\d{3})(.\\d{2})?\>"}, {changeTo: "$$1,$2,$3$4"}],
//   nine: [{findWhat: "\\<(\\d{3}),?(\\d{3}),?(\\d{3})(.\\d{2})?\>"}, {changeTo: "$$1,$2,$3$4"}],
//   ten: [{findWhat: "\\<(\\d{1}),?(\\d{3}),?(\\d{3}),?(\\d{3})(.\\d{2})?\>"}, {changeTo: "$$1,$2,$3,$4$5"}],
//   eleven: [{findWhat: "\\<(\\d{2}),?(\\d{3}),?(\\d{3}),?(\\d{3})(.\\d{2})?\>"}, {changeTo: "$$1,$2,$3,$4$5"}],
//   twelve: [{findWhat: "\\<(\\d{3}),?(\\d{3}),?(\\d{3}),?(\\d{3})(.\\d{2})?\>"}, {changeTo: "$$1,$2,$3,$4$5"}],
// }

var findChangeStrings = { // each key has an array of [findString, changeString]
// key value equates to number of digits in number
// find string = <line start>(digit group 1)(digit group 2)(<two digit with decimal> or <word boundary>)
//               NOTE: last parent group is non-capturing to allow for return of ".00" value
//               NOTE: still works if numbers are formatted with commas
// change string = $(digit group 1),(digit group 2)(.00 digit group)
  one: [{findWhat: "^(\\d{1})(?:([.]\\d{2})\\b|\\b)"}, {changeTo: "$$1$2"}],
  two: [{findWhat: "^(\\d{2})(?:([.]\\d{2})\\b|\\b)"}, {changeTo: "$$1$2"}],
  three: [{findWhat: "^(\\d{3})(?:([.]\\d{2})\\b|\\b)"}, {changeTo: "$$1$2"}],
  four: [{findWhat: "^(\\d{1}),?(\\d{3})(?:([.]\\d{2})\\b|\\b)"}, {changeTo: "$$1,$2$3"}],
  five: [{findWhat: "^(\\d{2}),?(\\d{3})(?:([.]\\d{2})\\b|\\b)"}, {changeTo: "$$1,$2$3"}],
  six: [{findWhat: "^(\\d{3}),?(\\d{3})(?:([.]\\d{2})\\b|\\b)"}, {changeTo: "$$1,$2$3"}],
  seven: [{findWhat: "^(\\d{1}),?(\\d{3}),?(\\d{3})(?:([.]\\d{2})\\b|\\b)"}, {changeTo: "$$1,$2,$3$4"}],
  eight: [{findWhat: "^(\\d{2}),?(\\d{3}),?(\\d{3})(?:([.]\\d{2})\\b|\\b)"}, {changeTo: "$$1,$2,$3$4"}],
  nine: [{findWhat: "^(\\d{3}),?(\\d{3}),?(\\d{3})(?:([.]\\d{2})\\b|\\b)"}, {changeTo: "$$1,$2,$3$4"}],
  ten: [{findWhat: "^(\\d{1}),?(\\d{3}),?(\\d{3}),?(\\d{3})(?:([.]\\d{2})\\b|\\b)"}, {changeTo: "$$1,$2,$3,$4$5"}],
  eleven: [{findWhat: "^(\\d{2}),?(\\d{3}),?(\\d{3}),?(\\d{3})(?:([.]\\d{2})\\b|\\b)"}, {changeTo: "$$1,$2,$3,$4$5"}],
  twelve: [{findWhat: "^(\\d{3}),?(\\d{3}),?(\\d{3}),?(\\d{3})(?:([.]\\d{2})\\b|\\b)"}, {changeTo: "$$1,$2,$3,$4$5"}],
}


function myChangeGrep(mySelection, findPref, changePref) { // run grep find/change on selection, using grep find and replace strings

  // clear find preferences
  app.findGrepPreferences = NothingEnum.nothing;
  app.changeGrepPreferences = NothingEnum.nothing;

  // set find preferences
  app.findGrepPreferences.properties = findPref;
  app.changeGrepPreferences.properties = changePref;

  // Run grep find/change on selection
  mySelection.changeGrep();

  // clear find preferences
  app.findGrepPreferences = NothingEnum.nothing;
  app.changeGrepPreferences = NothingEnum.nothing;

}

function getFindChangeStrings(obj, mySelection) {

  for (var key in obj) { // for each key in the passed object,
    if (obj.hasOwnProperty(key)) { // make sure property belongs to the object, because for..in will loop over prototype chain also
      myChangeGrep(mySelection, obj[key][0], obj[key][1]) // run
    }
  }
}


function buildWindow(myWindow) {

      var myPreferredSize = [300,50];

               myWindow.preferredSize = myPreferredSize;
               myWindow.margins = 20;
               myWindow.alignChildren = "fill";

     // panel describing script
     var myDescriptionPanel = myWindow.add("panel", undefined, "Description");
            myDescriptionPanel.add("statictext", undefined, myDescription, {multiline: true});
            myDescriptionPanel.preferredSize = myPreferredSize;
            myDescriptionPanel.alignChildren = "left";

      // panel giving an example of the changes
      var myExamplePanel = myWindow.add("panel", undefined, "Changes:");
            myExamplePanel.preferredSize = myPreferredSize;
            myExamplePanel.alignChildren = "left";

        var myExamplePanelExamples = myExamplePanel.add("group", undefined);
               myExamplePanelExamples.margins = [0,8,0,8]; // left, top, right, bottom
               myExamplePanelExamples.alignChildren = ["fill", "fill"];

                var myExampleFromPanel = myExamplePanelExamples.add("panel", undefined, "From");
                       myExampleFromPanel.add("statictext", undefined, myExampleFrom);
                       myExampleFromPanel.align = "fill";
                var myExampleToPanel = myExamplePanelExamples.add("panel", undefined, "To");
                       myExampleToPanel.add("statictext", undefined, myExampleTo);
                       myExampleFromPanel.align = "fill";

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

  var mySelection = app.selection[0]; // get selected text

  var myWindow = new Window("dialog", myName, undefined, {closeButton: true}); // create dialog window

  buildWindow(myWindow)


  if (myWindow.show() == true) { // if the dialog window is showing (ok is clicked)

    if ((mySelection == "") || (mySelection == undefined)) { // make sure user has selected text
      alert("Please select the text you want to clean up and run this script again.");
    } else {
        getFindChangeStrings(findChangeStrings, mySelection);
    }


  }

}

main();


// function testIterate(obj) {
//
//   for (var key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       var result = obj[key][0].toSource();
//       alert(result)
//     }
//   }
//
// }
//
// //  testIterate(findChangeStrings);
