/*global window, document, localStorage */
function main() {
    'use strict';

    var textToPush = document.getElementById("textToPush"),
        pushButton = document.getElementById("pushButton"),
        stackText = document.getElementById("stackText"),
        popButton = document.getElementById("popButton");

    function formatStack(stackData) {
        var formattedEntries = JSON.stringify(stackData.reverse()).replace(/[\[\]\"]/gi, '');
        return formattedEntries.split(",").join("\n");
    }

    pushButton.onclick = function () {
        var entry,
            entries;

        entry = textToPush.value;
        if (entry.trim() === '') {
            return;
        }

        entries = JSON.parse(localStorage.entries);
        if (entries.includes(entry)) {
            window.alert("That task is already on the stack");
            return;
        }
        entries.push(entry);
        localStorage.entries = JSON.stringify(entries);

        stackText.innerHTML = formatStack(entries);
        textToPush.value = "";
    };

    popButton.onclick = function () {
        var entries,
            poppedText;

        entries = JSON.parse(localStorage.entries);
        if (entries.length === 0) {
            // stackText.innerHTML = "Empty stack";
            window.alert("The stack is empty");
            return;
        }

        // update local storage 
        poppedText = entries.pop();
        localStorage.entries = JSON.stringify(entries);

        textToPush.value = poppedText;
        stackText.innerHTML = formatStack(entries);
    };

    // for debugging only
    // localStorage.entries = JSON.stringify([]);

    if (!localStorage.hasOwnProperty('entries')) {
        localStorage.entries = JSON.stringify([]);
    }

    // initialize the stack display with existing tasks, if any
    stackText.innerHTML = formatStack(JSON.parse(localStorage.entries));
}
