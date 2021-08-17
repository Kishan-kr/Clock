// ----navigation ---
let tabButton = document.getElementById('tab-button');
let minusSymbol = document.getElementsByClassName('minus-symbol');
let navPanel = document.getElementById('small-device-menu');
let isNavPanelOpen = false;

tabButton.onclick = toggleNavPanel;
function toggleNavPanel() {
      if(!isNavPanelOpen) {
            tabButton.classList.add('close-tab');
            tabButton.classList.remove('open-tab');
            minusSymbol[0].style.display = 'none';
            navPanel.style.display = 'flex';
            isNavPanelOpen = true;
      }
      else {
            tabButton.classList.add('open-tab');
            tabButton.classList.remove('close-tab');
            minusSymbol[0].style.display = 'block';
            navPanel.style.display = 'none';
            isNavPanelOpen = false;
      }
}

for(item of document.querySelectorAll('#small-device-menu a')) {
      item.onclick = () => {
            isNavPanelOpen = true;
            setTimeout(toggleNavPanel, 300);
      }
}
    
// ---- Stopwatch ----

let stopCenti = 0;

function pad(val) {
      val = val < 10 ? "0" + val : val;
      return val;
}

function displayStopwatch() {
      document.getElementById('centiSecond').innerHTML = pad(stopCenti%100);
      ++stopCenti;
      let stopSecond = Math.floor(stopCenti/100);
      let stopMinute = Math.floor(stopCenti/6000);
      let stopHour = Math.floor(stopCenti/360000);
      
      document.getElementById('stopwatchHour').innerHTML = pad(stopHour%60) + " :&nbsp;";
      document.getElementById('stopwatchMinute').innerHTML = pad(stopMinute%60) + " :&nbsp;";
      document.getElementById('stopwatchSecond').innerHTML = pad(stopSecond%60);
      if(stopHour>0) { document.getElementById('stopwatchHour').style.display = "block"}
      // console.log(stopSecond);
}
let timeOut;
let start = document.getElementById('start');   
start.onclick = function() { 
      if(start.style.backgroundColor != "green") {
            start.style.backgroundColor = "green";
            start.style.color = "white";
            start.innerText = "Stop";
            timeOut = setInterval(displayStopwatch,10);
      }
      else {
            clearInterval(timeOut);
            start.style.backgroundColor = "red";
            start.innerText = "Resume";
      }
};

let reset = document.getElementById('reset');
reset.onclick = function() { 
      clearInterval(timeOut);
      stopCenti=0; stopMinute=0; stopSecond=0; stopHour=0;
      displayStopwatch();
      start.style.backgroundColor = "#BDD6D2";
      start.style.color = "black";
      start.innerText = "Start";
}

// ---- Time ----

function displayTime() {
      let watch = new Date();
      let hour = pad(watch.getHours()); 
      let minute = pad(watch.getMinutes());
      let hourMinute = hour+" : "+minute;
      let seconds = pad(watch.getSeconds());
      document.getElementById('hourMinute').innerHTML = hourMinute;
      document.getElementById('second').innerHTML = seconds;
            
}
setInterval(displayTime,1000);

// ---- Timer ----

let setTimeBtn = document.getElementById('setTimebtn');
let setTimer = document.getElementById('setTimer');
setTimer.addEventListener("click", () => {
      setTimeBtn.style.display = "flex";
});

let timerHour;
let timerMinute;
let timerSecond;
let timerTime = document.getElementById('timerTime');
let hourMinSec ;
let set = document.getElementById('setBtn');
set.addEventListener("click", () => {
      hourMinSec = timerTime.value;
      hmsStr = hourMinSec.toString();
      setHourMinuteSecond(hmsStr);
      if(timerHour>0) { document.getElementById('timerHour').style.display = "block"}
      document.getElementById('timerHour').innerHTML = pad(timerHour) + " :&nbsp;";
      document.getElementById('timerMinute').innerHTML = pad(timerMinute) + " :&nbsp;";
      document.getElementById('timerSecond').innerHTML = pad(timerSecond%60);
      console.log(hmsStr);
});

let timerTimeoutSecond;
let setHourMinuteSecond = (timeStr) => {
      timerHour = timeStr.substr(0,2);
      timerMinute = timeStr.substr(3,2);
      timerSecond = timeStr.substr(6,2);
      timerHour = parseInt(timerHour);
      timerMinute = parseInt(timerMinute);
      timerSecond = parseInt(timerSecond);
      timerSecond = 3600 * timerHour + 60 * timerMinute + timerSecond;  // Error line
      console.log(timerHour + " " + timerMinute + " " + timerSecond);
      timerTimeoutSecond = timerSecond;
}

function displayTimer() {
      --timerSecond;
      if(timerSecond==0) { clearInterval(timerTimeOut);
            timerStart.style.backgroundColor = "#BDD6D2";  
            timerStart.innerText = "Start";    
            timerStart.style.color = "black";
      }
      document.getElementById('timerSecond').innerHTML = pad(timerSecond%60);
      timerMinute = Math.floor(timerSecond/60);
      timerHour = Math.floor(timerSecond/3600);
      
      document.getElementById('timerHour').innerHTML = pad(timerHour%60) + " :&nbsp;";
      document.getElementById('timerMinute').innerHTML = pad(timerMinute%60) + " :&nbsp;";
      if(timerHour>0) { document.getElementById('timerHour').style.display = "block"}
}

let timerTimeOut;
let timerStart = document.getElementById('timerStart');   
timerStart.onclick = function() { 
      if(timerStart.style.backgroundColor != "green" && timerSecond > 0) {
            timerStart.style.backgroundColor = "green";
            timerStart.style.color = "white";
            timerStart.innerText = "Stop";
            timerTimeOut = setInterval(displayTimer,1000);
            setTimeBtn.style.display = "none";
      }
      else if(timerStart.style.backgroundColor == "green") {
            clearInterval(timerTimeOut);
            timerStart.style.backgroundColor = "red";
            timerStart.innerText = "Resume";
      }
};

let timerReset = document.getElementById('timerReset');
timerReset.onclick = function() { 
      clearInterval(timerTimeOut);
      timerSecond=1; timerMinute=0; timerHour=0;
      displayTimer();
}

// -----Alarm-----

let toggleOn = document.getElementById('on-off');
let Switch = false;
let alarmTimeout;
let off = document.getElementById('off');
let snooze = document.getElementById('snooze');

// function to toggle the On / Off button 
toggleOn.onclick = () => {
      if(!Switch) {
            toggleOn.style.backgroundColor = '#0ea25d';
            toggleOn.value = 1;
            Switch = true;
            getAlarm();
      }
      else {
            toggleOn.value = 0;
            toggleOn.style.backgroundColor = '#a0b0a9';
            Switch = false;
            clearInterval(alarmTimeout);
      }
}

function checkSwitch() {
      if(Switch) {
            getAlarm();
      }
}

function getAlarm() {
      clearInterval(alarmTimeout);
      alarmTimeout = setInterval(checkAlarmTime, 1000);
}

let inputHour = document.getElementById('alarm-hour');
let inputMinute = document.getElementById('alarm-minute');
let inputTimePeriod = document.getElementById('time-period');

let alarmHour, alarmMinute,timePeriod = inputTimePeriod.value;

// fetching alarm time 
inputHour.oninput = () => {alarmHour = inputHour.value; checkSwitch();}
inputMinute.oninput = () => {alarmMinute = inputMinute.value; checkSwitch();}
inputTimePeriod.oninput = () => {timePeriod = inputTimePeriod.value; checkSwitch();}
let alarmTune;
let outFluctuation;

function checkAlarmTime() {
            
      let date = new Date();
      let hour = date.getHours();
      let minute = date.getMinutes();
      function getAlarmHours() {
            if(timePeriod == 'pm') {
                  alarmHour = parseInt(inputHour.value) + 12;
            }
      }
      console.log(alarmHour);

      getAlarmHours();
      if(alarmHour == hour && alarmMinute == minute) {
            alarmTune = new Audio('./tunes/musicAlarm.mp3');
            console.log('playing alarm')
            playAlarm(alarmTune);
            clearInterval(alarmTimeout);
            off.style.visibility = 'visible';
            snooze.style.visibility = 'visible';
            outFluctuation = setInterval(fluctuateBGcolor, 500);
            setTimeout(stopFluctuation, 15000);
      }
}

function playAlarm(tune) {
      tune.play();
}

let fluctuateCount = 0;
function fluctuateBGcolor() {
      let alarmBg = document.getElementById('alm');
      if(fluctuateCount % 2 == 0) {
            alarmBg.style.backgroundColor = '#e73d3d';
            ++fluctuateCount;
            console.log('changed 1st color')
      }
      else {
            alarmBg.style.backgroundColor = '#D2D9D5';
            ++fluctuateCount;
            console.log('changed 2nd color')
      }
      console.log('fluctating');

}

function stopFluctuation() {
      clearInterval(outFluctuation);
      console.log('fluctuation cleared!');
      document.getElementById('alm').style.backgroundColor = '#D2D9D5';
}

// fuction to off the alarm 
off.onclick = () => {
      alarmTune.pause();
      stopFluctuation();
      toggleOn.value = 0;
      toggleOn.style.backgroundColor = '#a0b0a9';
      off.style.visibility = 'hidden';
      snooze.style.visibility = 'hidden';
}

// function to snooze the alarm for 5 minutes 
snooze.onclick = () => {
      alarmTune.pause();
      stopFluctuation();
      alarmMinute = parseInt(alarmMinute) + 5;
      getAlarm();
      snooze.style.visibility = 'hidden';
      off.style.visibility = 'hidden';
}
