const remote = require('electron').remote;
const ipc = require('electron').ipcRenderer;
const Mousetrap = require('mousetrap');

document.getElementById('form').addEventListener("submit", send);
document.getElementById('submit').addEventListener("click", send);
document.getElementById('cancel').addEventListener("click", close);

Mousetrap.bind('esc', () => {
	close();
})

// Funkcie
function send() {
	var sluzba = "L" + document.getElementById('code').value;
	ipc.send("sluzba", sluzba);
	close();
}
function close() {
	remote.getCurrentWindow().hide();
}
