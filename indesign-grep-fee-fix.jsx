

var myVersion = "0.4";
var myName = "Fee Format " + myVersion;
var myDescription = "Formats numbered lists copied to InDesign that retained leading digits, for example: \r\r    1) line of text \r    2) line of text \r\rScript will remove leading digits and apply the selected number/list style.";
var myNotes = ""
var grepFindString = {findWhat: "\\b(\\d\\d)(\\d\\d\\d)\\b"};
var grepChangeString = {changeTo: "\\$$1,$2"};

var mySelection = app.selection[0]; // get selected text

var grep = {
  four: {
    findWhat: "\\b(\\d)(\\d\\d\\d)\\b",
    changeTo: "\\$$1,$2"
  },
  five: {
    findWhat: "\\b(\\d\\d)(\\d\\d\\d)\\b",
    changeTo: "\\$$1,$2"
  }
}

// var findChangeStrings = {
//   four: [{findWhat: "\\b(\\d)(\\d\\d\\d)\\b"}, {changeTo: "\\$$1,$2"}],
//   five: [{findWhat: "\\b(\\d\\d)(\\d\\d\\d)\\b"}, {changeTo: "\\$$1,$2"}],
//   six: [{findWhat: "\\b(\\d\\d\\d)(\\d\\d\\d)\\b"}, {changeTo: "\\$$1,$2"}],
//   seven: [{findWhat: "\\b(\\d)(\\d\\d\\d)(\\d\\d\\d)\\b"}, {changeTo: "\\$$1,$2,$3"}],
//   eight: [{findWhat: "\\b(\\d\\d)(\\d\\d\\d)(\\d\\d\\d)\\b"}, {changeTo: "\\$$1,$2,$3"}],
//   nine: [{findWhat: "\\b(\\d{\\d\\d})(\\d\\d\\d)(\\d\\d\\d)\\b"}, {changeTo: "\\$$1,$2,$3"}],
// }

var findChangeStrings = { // key value equates to number of digits in find strings
  // find string = <word boundary>(digit group 1)(digit group 2)<word boundary>
  // change string = $(digit group 1),(digit group 2)
  four: [{findWhat: "\\b(\\d)(\\d{3})\\b"}, {changeTo: "$$1,$2"}],
  five: [{findWhat: "\\b(\\d{2})(\\d{3})\\b"}, {changeTo: "$$1,$2"}],
  six: [{findWhat: "\\b(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2"}],
  seven: [{findWhat: "\\b(\\d)(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2,$3"}],
  eight: [{findWhat: "\\b(\\d{2})(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2,$3"}],
  nine: [{findWhat: "\\b(\\d{3})(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2,$3"}],
  ten: [{findWhat: "\\b(\\d)(\\d{3})(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2,$3,$4"}],
  eleven: [{findWhat: "\\b(\\d{2})(\\d{3})(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2,$3,$4"}],
  twelve: [{findWhat: "\\b(\\d{3})(\\d{3})(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2,$3,$4"}]
}

findChangeArr = [[{findWhat: "\\b(\\d)(\\d{3})\\b"}, {changeTo: "$$1,$2"}], [{findWhat: "\\b(\\d{2})(\\d{3})\\b"}, {changeTo: "$$1,$2"}], [{findWhat: "\\b(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2"}], [{findWhat: "\\b(\\d)(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2,$3"}], [{findWhat: "\\b(\\d{2})(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2,$3"}], [{findWhat: "\\b(\\d{3})(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2,$3"}], [{findWhat: "\\b(\\d)(\\d{3})(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2,$3,$4"}], [{findWhat: "\\b(\\d{2})(\\d{3})(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2,$3,$4"}], [{findWhat: "\\b(\\d{3})(\\d{3})(\\d{3})(\\d{3})\\b"}, {changeTo: "$$1,$2,$3,$4"}]]

function getFindChangeStrings(findChangeStringsObject, mySelection) {

  for (var key in findChangeStringsObject) {
    if (findChangeStringsObject.hasOwnProperty(key)) {
      myChangeGrep(mySelection, findChangeStringsObject[key][0], findChangeStringsObject[key][1])
    }
  }

}

function myChangeGrep(mySelection, findPref, changePref) {

  // http://jongware.mit.edu/idcs6js/pc_Application.html#changeGrep


  // clear find preferences
  app.findGrepPreferences = NothingEnum.nothing;
  app.changeGrepPreferences = NothingEnum.nothing;

  //var myString = "app.findGrepPreferences.properties = " + grep.four.findWhat + ";"
  // set find preferences
  app.findGrepPreferences.properties = findPref;
  app.changeGrepPreferences.properties = changePref;

  // Run grep find/change on selection
  mySelection.changeGrep();

  // clear find preferences
  app.findGrepPreferences = NothingEnum.nothing;
  app.changeGrepPreferences = NothingEnum.nothing;

}

function main() {
  app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL; // allow user interaction with dialogs

  var mySelection = app.selection[0]; // get selected text

  var myWindow = new Window("dialog", myName); // create dialog window

  getFindChangeStrings(findChangeStrings, mySelection)

  // ok, cancel buttons
  var myActionGroup = myWindow.add("group", undefined);
  myActionGroup.alignment = "right";

  var myCancelBtn = myActionGroup.add("button", undefined, "Cancel"); // auto responds to Esc key
  var myOkBtn = myActionGroup.add("button", undefined, "Run", {
    name: "ok"
  }); // auto responds to Enter key


  if (myWindow.show() == true) { // if the dialog window is showing (ok is clicked)

    if ((mySelection == "") || (mySelection == undefined)) { // make sure user has selected text
      alert("Please select the text you want to clean up, and run this script again.")
    } else {
      myChangeGrep(mySelection, findChangeArrs); // run grep to remove leading numbers
      //var paragraphStyleToApply = myParagraphStyles.itemByName(myDropdownOptions[myDropdownSelection]); // get paragraph style object by name from the myDropdownOptions Array

      //mySelection.applyParagraphStyle(paragraphStyleToApply); // apply paragraph style to selection.
    }


  }

}

main();


function testIterate(obj) {

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var result = obj[key][0].toSource();
      alert(result)
    }
  }

}

//  testIterate(findChangeStrings);
