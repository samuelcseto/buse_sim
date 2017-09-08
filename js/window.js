// INCLUDES
var moment = require('moment');
var jsonfile = require('jsonfile')
var MouseTrap = require("mousetrap");
const path = require('path');
const remote = require('electron').remote;
const ipc = require('electron').ipcRenderer;
// ZOBRAZENIE ČASU
function checkTime() {
  document.getElementById("time").innerHTML = moment().format('HH:mm');
}
setInterval(checkTime, 1000);
// KEYBINDS
MouseTrap.bind("f1", () => {
  remote.BrowserWindow.fromId(2).show();
})
Mousetrap.bind("f11", () => {
  remote.BrowserWindow.fromId(1).maximize();
})
// NAČÍTANIE DATABÁZE
jsonfile.readFile(path.join(__dirname, 'database.json'), function(err, obj) {
  if (err) throw err;
  var currentStop = 0;
  var sluzba = "";
  ipc.on("sluzba", (event, message) => {
    console.log(message);
    sluzba = message;
    loadStops(currentStop, sluzba);
  })
  function clearStops() {
    currentStop = 0;
    document.getElementById("line").innerHTML = "";
    document.getElementById("final_stop").innerHTML = "";
    document.getElementById("next_stop").innerHTML = "";
    document.getElementById("next_stop_zone").innerHTML = "";
    document.getElementById("next_stop_1").innerHTML = "";
    document.getElementById("next_stop_1_zone").innerHTML = "";
    document.getElementById("next_stop_2").innerHTML = "";
    document.getElementById("next_stop_2_zone").innerHTML = "";
    document.getElementById("next_stop_3").innerHTML = "";
    document.getElementById("next_stop_3_zone").innerHTML = "";
    document.getElementById("next_stop_4").innerHTML = "";
    document.getElementById("next_stop_4_zone").innerHTML = "";
    document.getElementById("next_stop_5").innerHTML = "";
    document.getElementById("next_stop_5_zone").innerHTML = "";
    document.getElementById("next_stop_6").innerHTML = "";
    document.getElementById("next_stop_6_zone").innerHTML = "";
    document.getElementById("next_stop_7").innerHTML = "";
    document.getElementById("next_stop_7_zone").innerHTML = "";
  }
  function loadStops(currentStop, sluzba) {
    document.getElementById("line").innerHTML = obj[sluzba].lineNumber;
    document.getElementById("final_stop").innerHTML = obj[sluzba].finalStop;
    if (obj[sluzba].stops[currentStop]) {
      document.getElementById("next_stop").innerHTML = obj[sluzba].stops[currentStop].name;
      document.getElementById("next_stop_zone").innerHTML = obj[sluzba].stops[currentStop].zone;
    } else {
      clearStops();
    }
    if (obj[sluzba].stops[currentStop + 1]) {
      document.getElementById("next_stop_1").innerHTML = obj[sluzba].stops[currentStop + 1].name;
      document.getElementById("next_stop_1_zone").innerHTML = obj[sluzba].stops[currentStop + 1].zone;
    } else {
      document.getElementById("next_stop_1").innerHTML = "";
      document.getElementById("next_stop_1_zone").innerHTML = "";
    }
    if (obj[sluzba].stops[currentStop + 2]) {
      document.getElementById("next_stop_2").innerHTML = obj[sluzba].stops[currentStop + 2].name;
      document.getElementById("next_stop_2_zone").innerHTML = obj[sluzba].stops[currentStop + 2].zone;
    } else {
      document.getElementById("next_stop_2").innerHTML = "";
      document.getElementById("next_stop_2_zone").innerHTML = "";
    }
    if (obj[sluzba].stops[currentStop + 3]) {
      document.getElementById("next_stop_3").innerHTML = obj[sluzba].stops[currentStop + 3].name;
      document.getElementById("next_stop_3_zone").innerHTML = obj[sluzba].stops[currentStop + 3].zone;
    } else {
      document.getElementById("next_stop_3").innerHTML = "";
      document.getElementById("next_stop_3_zone").innerHTML = "";
    }
    if (obj[sluzba].stops[currentStop + 4]) {
      document.getElementById("next_stop_4").innerHTML = obj[sluzba].stops[currentStop + 4].name;
      document.getElementById("next_stop_4_zone").innerHTML = obj[sluzba].stops[currentStop + 4].zone;
    } else {
      document.getElementById("next_stop_4").innerHTML = "";
      document.getElementById("next_stop_4_zone").innerHTML = "";
    }
    if (obj[sluzba].stops[currentStop + 5]) {
      document.getElementById("next_stop_5").innerHTML = obj[sluzba].stops[currentStop + 5].name;
      document.getElementById("next_stop_5_zone").innerHTML = obj[sluzba].stops[currentStop + 5].zone;
    } else {
      document.getElementById("next_stop_5").innerHTML = "";
      document.getElementById("next_stop_5_zone").innerHTML = "";
    }
    if (obj[sluzba].stops[currentStop + 6]) {
      document.getElementById("next_stop_6").innerHTML = obj[sluzba].stops[currentStop + 6].name;
      document.getElementById("next_stop_6_zone").innerHTML = obj[sluzba].stops[currentStop + 6].zone;
    } else {
      document.getElementById("next_stop_6").innerHTML = "";
      document.getElementById("next_stop_6_zone").innerHTML = "";
    }
    if (obj[sluzba].stops[currentStop + 7]) {
      document.getElementById("next_stop_7").innerHTML = obj[sluzba].stops[currentStop + 7].name;
      document.getElementById("next_stop_7_zone").innerHTML = obj[sluzba].stops[currentStop + 7].zone;
    } else {
      document.getElementById("next_stop_7").innerHTML = "";
      document.getElementById("next_stop_7_zone").innerHTML = "";
    }
  }

  MouseTrap.bind("q", () => {
    currentStop++;
    loadStops(currentStop, sluzba);
    // Hlásenia
    var player = require("play-sound") (opts = {})
    player.play(path.join(__dirname, 'announcements/nextStop.mp3'), function(err){
      if (err) throw err
      try {
        player.play(path.join(__dirname, 'announcements/') + obj[sluzba].stops[currentStop].name + ".mp3", function(err){
          if (err) throw err
        })
      } catch (e) {

      }
    })
  });

})
