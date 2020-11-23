/*global alert, document, localStorage */
function main() {
    'use strict';

    var textToPush = document.getElementById("textToPush"),
        pushButton = document.getElementById("pushButton"),
        stackText = document.getElementById("stackText"),
        popButton = document.getElementById("popButton");

    function formatStack(jsonData) {
        // format items on the stack for display
        // TODO: Is there a better way to do this? 
        var formattedEntries = JSON.stringify(jsonData.reverse());
        formattedEntries = formattedEntries.replace(/[\[\]\"]/gi, '');
        return formattedEntries.split(",").join("\n");
    }

    pushButton.onclick = function () {
        var entry,
            entries;

        entry = textToPush.value;
        if (entry.trim() === '') {
            return;
        }

        // update local storage
        entries = JSON.parse(localStorage.entries);
        if (entries.includes(entry)) {
            alert("That task is already on the stack");
            return;
        }
        entries.push(entry);
        localStorage.entries = JSON.stringify(entries);

        // update stack display and clear the task entry field
        stackText.innerHTML = formatStack(entries);
        textToPush.value = "";
    };

    popButton.onclick = function () {
        var entries,
            poppedText;

        entries = JSON.parse(localStorage.entries);
        if (entries.length === 0) {
            // stackText.innerHTML = "Empty stack";
            alert("The stack is empty");
            return;
        }

        // update local storage 
        poppedText = entries.pop();
        localStorage.entries = JSON.stringify(entries);

        // update task entry field with the popped task, update stack display
        textToPush.value = poppedText;
        stackText.innerHTML = formatStack(entries);
    };

    // for debugging only
    // localStorage.entries = JSON.stringify([]);

    // initialize local storage
    if (!localStorage.hasOwnProperty('entries')) {
        localStorage.entries = JSON.stringify([]);
    }

    // initialize the stack display with existing tasks
    stackText.innerHTML = formatStack(JSON.parse(localStorage.entries));
}

