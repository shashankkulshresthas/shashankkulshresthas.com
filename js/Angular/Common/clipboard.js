document.oncontextmenu = function () {
    return true;
}

function copyTextToClipboard() {
    
    var success = document.execCommand('copy', true);


}
function copyTextToClipboard(text) {
    
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}

function AccessClipboardData() {

    try {
        window.clipboardData.setData('text', "No print data");
    } catch (err) {
        // txt = "There was an error on this page.\n\n";
        // txt += "Error description: " + err.description + "\n\n";
        // txt += "Click OK to continue.\n\n";
        //  alert(txt);
    }

}

document.onkeyup = function(e) {

    if (e.keyCode == 44) {
        copyTextToClipboard();

    }
};
setInterval("AccessClipboardData()", 100);

var ClipBoardText = "";

//remove selection
function killCopy(e) { return false }
function reEnable() { return true }
document.onselectstart = new Function("return false");
if (window.sidebar) {
    document.onmousedown = killCopy;
    document.onclick = reEnable;
}

/*
    Key Code
    88: cut
    65: select all
    67: copy
    86: paste
    73: Ctrl + Shift + i (F12 alternative)
    85: View Source
*/
// Start of code to disable keys
document.onkeypress = function (event) {
    event = (event || window.event);
    if (event.keyCode == 123 || (event.ctrlKey && event.keyCode == 88) || (event.ctrlKey && event.keyCode == 65) || (event.ctrlKey && event.keyCode == 67) || (event.ctrlKey && event.keyCode == 86) || (event.ctrlKey && event.keyCode == 73) || (event.ctrlKey && event.keyCode == 85)) {
        return false;
    }
}
document.onmousedown = function (event) {

    event = (event || window.event);
    if (event.keyCode == 123 || (event.ctrlKey && event.keyCode == 88) || (event.ctrlKey && event.keyCode == 65) || (event.ctrlKey && event.keyCode == 67) || (event.ctrlKey && event.keyCode == 86) || (event.ctrlKey && event.keyCode == 73) || (event.ctrlKey && event.keyCode == 85)) {
        return false;
    }
}
document.onkeydown = function (event) {

    event = (event || window.event);
    if (event.keyCode == 123 || (event.ctrlKey && event.keyCode == 88) || (event.ctrlKey && event.keyCode == 65) || (event.ctrlKey && event.keyCode == 67) || (event.ctrlKey && event.keyCode == 86) || (event.ctrlKey && event.keyCode == 73) || (event.ctrlKey && event.keyCode == 85)) {
        return false;
    }
}
// End of code to disable keys

// Start of code to disable select/selection of text
function disableselect(e) {
  //  return false
}
function reEnable2() {
    return true
}
//if IE4+
document.onselectstart = new Function("return false")
//if NS6
if (window.sidebar) {
    document.onmousedown = disableselect
    document.onclick = reEnable2
}
// End of code to disable select/selection of text

//Start of code to detect lost of focus
function handleVisibilityChange() {
    //Code throws exception in firefox.
//    if (document.hidden) {
//     //   window.location.href = '../Logout.aspx';
//    }
}
document.addEventListener("visibilitychange", handleVisibilityChange, false);
//End of code to detect lost of focus

// Maintain Focus
//setTimeout(function () {
//    window.opener.maintainFocus();
//}, 1000);


$(document).bind("contextmenu", function (e) {
    e.preventDefault();
});