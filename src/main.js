const { ipcRenderer } = require('electron');
const version = document.getElementById('version');
const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');
const print = require('spray-print');

ipcRenderer.on('update_available', () => {
    ipcRenderer.removeAllListeners('update_available');
    message.innerText = 'A new update is available. Downloading now...';
    notification.classList.remove('hidden');
});

ipcRenderer.on('update_downloaded', () => {
    ipcRenderer.removeAllListeners('update_downloaded');
    message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
    restartButton.classList.remove('hidden');
    notification.classList.remove('hidden');
});

ipcRenderer.send('app_version');
ipcRenderer.on('app_version', (event, arg) => {
    ipcRenderer.removeAllListeners('app_version');
    print.println('average-calculator by aceiusio\nVersion ' + arg.version);
    //version.innerText = 'Version ' + arg.version;
});

function closeNotification() {
    notification.classList.add('hidden');
}

function restartApp() {
    ipcRenderer.send('restart_app');
}

function sum(numbers) {
    let number = numbers;
    return number.reduce(function(a,b) {
        return a + b
    });
}

function avg(iarray) {
    //let array = JSON.parse("[" + iarray + "]");
    let array = iarray.split(",").map(Number);
    
    print.cprint('There are ' + array.length + ' entries to average');
    print.cprint('Sum of array returned ' + sum(array));
    print.cprint('Length of array returned ' + array.length);
    print.cprint('Average or inputted array is ' + sum(array) / array.length);
    //alert('Average of inputted array is ' + sum(iarray) / entries)
    return sum(array) / array.length;
}

function main() {
    print.cprint('Preparing to average');
    document.getElementById('avg-output').innerHTML = avg(document.getElementById("avg-input").value);
}

document.getElementById('avg-input').value = "1,2,3"
document.getElementById('avg-output').innerHTML = "2"