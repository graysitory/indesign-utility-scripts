var scriptName = "Relink selected link to folder",  
doc;  
  
PreCheck();  
  
//===================================== FUNCTIONS ======================================  
function Main(image) {  
    var file,  
    path = "/E/Archive/My folder/", // type the path to your folder here  
    link = image.itemLink;  
      
    if (link.status == LinkStatus.LINK_MISSING) {  
        file = new File(path + link.name);  
          
        if (file.exists) {  
            link.relink(file);  
        }  
    }  
}  
//--------------------------------------------------------------------------------------------------------------------------------------------------------  
function PreCheck() {  
    var image;  
    if (app.documents.length == 0) ErrorExit("Please open a document and try again.", true);  
    doc = app.activeDocument;  
    if (doc.converted) ErrorExit("The current document has been modified by being converted from older version of InDesign. Please save the document and try again.", true);  
    if (!doc.saved) ErrorExit("The current document has not been saved since it was created. Please save the document and try again.", true);  
    if (app.selection.length == 0) ErrorExit("Nothing is selected.", true);  
      
    if (app.selection[0].constructor.name == "Image") {  
        image = app.selection[0];  
    }  
    else if (app.selection[0].images.length == 1) {  
        image = app.selection[0].images[0];  
    }  
    else {  
        ErrorExit("There's no image in selection.", true);  
    }  
  
    Main(image);  
}  
//--------------------------------------------------------------------------------------------------------------------------------------------------------  
function ErrorExit(error, icon) {  
    alert(error, scriptName, icon);  
    exit();  
}  
//--------------------------------------------------------------------------------------------------------------------------------------------------------  