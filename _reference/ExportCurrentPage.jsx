﻿//DESCRIPTION:Export the selection to JPG format with the desired dimensions
// Export to JPG - selection.jsx
//
// Modified 2016-04-26
// Keith Gilbert, Gilbert Consulting
// www.gilbertconsulting.com
// blog.gilbertconsulting.com

Main();

function Main() {
	// Check to see whether any InDesign documents are open.
	// If no documents are open, display an error message.
	if (app.documents.length > 0) {
		var myDoc = app.activeDocument;
		// Set the measurement system to points and the origin to page
		userHoriz = myDoc.viewPreferences.horizontalMeasurementUnits;
		userVert = myDoc.viewPreferences.verticalMeasurementUnits;
		userOrigin = myDoc.viewPreferences.rulerOrigin;
		myDoc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
		myDoc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
		myDoc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
		myDoc.zeroPoint = [0,0];
		// Prompt the user where to save the file
		var myFilePath = File.saveDialog("Choose a name and location for the file.");
		if (myFilePath) { // User did not click Cancel
			var myString = myFilePath.toString();
			var myLastSlash = myString.lastIndexOf("/");
			var myPath = myString.slice(0,myLastSlash+1);
			var myLastPeriod = myString.lastIndexOf(".");
			if (myLastPeriod == -1) {
				var myFileName = myString.slice(myLastSlash+1);
			}
			else {
				var myFileName = myString.slice(myLastSlash+1,myLastPeriod);
			}
			var myResultsArray = new Array;
			if (myResultsArray) { // User did not click Cancel
				// Gather the settings that are common to all exports
				var myWidth = 1920;
				var myHeight = 1080;
                    app.jpegExportPreferences.jpegQuality = JPEGOptionsQuality.MAXIMUM; // JPG Quality
                    app.jpegExportPreferences.jpegRenderingStyle = JPEGOptionsFormat.BASELINE_ENCODING; // Encoding
                    app.jpegExportPreferences.jpegColorSpace = JpegColorSpaceEnum.RGB; // colorspace
                    app.jpegExportPreferences.embedColorProfile = false; // Color profile
                    app.jpegExportPreferences.antiAlias = true; // Anti alias
                    app.jpegExportPreferences.simulateOverprint = false; // Simulate overprint
				var mySelection = app.selection;
                    var myObject = app.activeDocument.activePage;
					var myCurrentWidth = myObject.Bounds[3]-myObject.visibleBounds[1];
					var myCurrentHeight = myObject.Bounds[2]-myObject.visibleBounds[0];
					if (myWidth > 0) {
						// Calculate the scale percentage
						var myResizePercentage = myWidth/myCurrentWidth;
						var myExportRes = myResizePercentage * 72;	
					}
					else {
						// Calculate the scale percentage
						var myResizePercentage = myHeight/myCurrentHeight;
						var myExportRes = myResizePercentage * 72;
					}
					app.jpegExportPreferences.exportResolution = myExportRes;			
					myObject.exportFile(ExportFormat.JPG, File(myPath+myFileName+".jpg"), false);
					// undo the grouping
					if (myGroup) {
						myDoc.undo();
					}
				}
				else {
					alert("Nothing is selected. Please make a selection and try again.");
				}
			}
		}
		// Return the measurement system and origin to the way it was
		myDoc.viewPreferences.horizontalMeasurementUnits = userHoriz;
		myDoc.viewPreferences.verticalMeasurementUnits = userVert;
		myDoc.viewPreferences.rulerOrigin = userOrigin;
	}


function standardPPTExport() {
        
        var myWidthField = "1920";
        var myHeightField = "1080";
        var myQualityField = "Maxiumum"; // change selection in return
        var myFormatMethodField = "Baseline";
        var myColorSpaceField = "RGB";
        var myColorProfileField;
                myColorProfileField = false;
        var myAliasField;
                myAliasField = true;
        var myOverprintField;
                myOverprintField = false;
        
        	return [myWidthField.text, myHeightField.text,
			myQualityField.text, myFormatMethodField.text, myColorSpaceField.text, 
			myColorProfileField.value, myAliasField.value, myOverprintField.value];
    }

// Prompt the user for JPG export values
function myInput() {
	var myWindow = new Window("dialog", "Export to JPG - selection");
		myWindow.preferredSize = [372,418];
		myWindow.alignChildren = "right";
		var mySizePanel = myWindow.add("panel", undefined, "Enter the desired export size in pixels");
			mySizePanel.alignChildren = "left";
			mySizePanel.margins = 20;
			mySizePanel.preferredSize = [340,75];
			var mySizeGroup = mySizePanel.add("group", undefined);			
				mySizeGroup.add("statictext", undefined, "Width:");
				var myWidthField = mySizeGroup.add("edittext", undefined, ""); // width
					myWidthField.characters = 6;
					myWidthField.active = true;
				mySizeGroup.add("statictext", undefined, "\u00A0\u00A0\u00A0OR\u00A0\u00A0\u00A0");
				mySizeGroup.add("statictext", undefined, "Height:");
				var myHeightField = mySizeGroup.add("edittext", undefined, ""); // height
					myHeightField.characters = 6;					
		var myImagePanel = myWindow.add("panel", undefined, "Image");
			myImagePanel.orientation = "column";
			myImagePanel.alignChildren = "right";
			myImagePanel.margins = 20;
			myImagePanel.preferredSize = [340,106];
			var myQualityGroup = myImagePanel.add("group", undefined);
				myQualityGroup.orientation = "row";
				myQualityGroup.add("statictext", undefined, "Quality:");
				var myQualityField = myQualityGroup.add("dropdownlist", undefined, ["Maximum", "High", "Medium", "Low"]); // quality
					myQualityField.selection = 2;
					myQualityField.preferredSize = [200,21];
			var myFormatMethodGroup = myImagePanel.add("group", undefined);
				myFormatMethodGroup.orientation = "row";
				myFormatMethodGroup.add("statictext", undefined, "Format Method:");
				var myFormatMethodField = myFormatMethodGroup.add("dropdownlist", undefined, ["Progressive", "Baseline"]); // format
					myFormatMethodField.selection = 1;
					myFormatMethodField.preferredSize = [200,21];
			var myColorSpaceGroup = myImagePanel.add("group", undefined);
				myColorSpaceGroup.orientation = "row";
				myColorSpaceGroup.add("statictext", undefined, "Color Space:");
				var myColorSpaceField = myColorSpaceGroup.add("dropdownlist", undefined, ["RGB", "CMYK", "Gray"]); // color space
					myColorSpaceField.selection = 0;
					myColorSpaceField.preferredSize = [200,21];
		var myOptionsPanel = myWindow.add("panel", undefined, "Options");
			myOptionsPanel.orientation = "column";
			myOptionsPanel.alignChildren = "left";
			myOptionsPanel.margins = 20;
			myOptionsPanel.preferredSize = [340,127];
			var myColorProfileField = myOptionsPanel.add("checkbox", undefined, "\u00A0Embed Color Profile"); // color profile
				myColorProfileField.value = false;
			var myAliasField = myOptionsPanel.add("checkbox", undefined, "\u00A0Anti-alias"); // anti-alias
				myAliasField.value = true;
			var myOverprintField = myOptionsPanel.add("checkbox", undefined, "\u00A0Simulate Overprint"); // overprint
		var myButtonGroup = myWindow.add ("group");
			var myCancelBtn = myButtonGroup.add ("button", undefined, "Cancel");
			var myExportBtn = myButtonGroup.add ("button", undefined, "Export", {name:"ok"});
		myExportBtn.onClick = function() { // User clicked the OK button
			if (((myWidthField.text == "") && (myHeightField.text == "")) ||
				((myWidthField.text != "") && (myHeightField.text != ""))) {
				alert("Please enter an export width OR height in pixels"); // User left both width and height blank, or entered both a width and height
			}
			else {
				if (isNaN(myWidthField.text) || isNaN(myHeightField.text)) {
					alert ("Only numbers are allowed in the Width and Height fields"); // User entered a non-number in the width or height fields
				}
				else {
					exit(); // This onClick function
				}
			}
		}
	if (myWindow.show() == 1) { // User didn't click the cancel button
		return [myWidthField.text, myHeightField.text,
			myQualityField.selection.text, myFormatMethodField.selection.text, myColorSpaceField.selection.text, 
			myColorProfileField.value, myAliasField.value, myOverprintField.value];
	}
	else {
		return; // This dialog function
	}
}



