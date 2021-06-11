const form = document.getElementById("taskform");
const button = document.querySelector("#taskform > button");
var taskInput = document.getElementById("taskInput");
var tasklist = document.getElementById("tasklist");
var dueDateInput = document.getElementById("dueDateInput");
var completionTimeInput = document.getElementById("completionTimeInput");
var estimatedTimeInput = document.getElementById("estimatedTimeInput");
var priorityInput = document.getElementById("priorityInput");

button.addEventListener("click", function (event) {
    //makes sure none of browser functionality auto happens
    event.preventDefault();

    //storing retrieving values from html buttons
    let task = taskInput.value;
    let dueDate = dueDateInput.value;
    let completionTime = completionTimeInput.value;
    let estimatedTime = estimatedTimeInput.value;
    let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;

    addTask(task, dueDate, estimatedTime, priorityRating, completionTime, false);
    console.log(taskList);
})

var taskListArray = [];

function addTask(taskDescription, dueDate, priorityRating, estimatedTime, priorityRating, completionTime, completionStatus) {
    let d = new Date();
    let dateCreated = d.getFullYear();
    let task = {
        taskDescription,
        dueDate,
        dateCreated,
        estimatedTime,
        completionTime,
        priorityRating,
        estimatedTime,
        completionStatus
    };
    taskListArray.push(task);
    renderTask(task);
}

function renderTask(task){
    //Create HTML elements (REPEAT IT WITH DUEDATE AND STUFF vvv)
    let item = document.createElement("p");
    item.innerHTML = "<p>" + task.taskDescription + " is due on " + task.dueDate + "</p";

    item.style.right="50px";

        //adds new task to array
    tasklist.appendChild(item);

    //Extra task DOM elements - making a delete button
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("x");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);

    //customising delete button
    delButton.style.backgroundColor = "red";
    delButton.style.color="white";
    delButton.style.fontSize="15px";

    delButton.style.width="50px";
    delButton.style.height="30px";
    delButton.style.borderRadius="20px";

    //Eveny listeners for DOM elements- for delete button
    delButton.addEventListener("click", function(event){
        event.preventDefault();
        item.remove();
    })

    //Clear the input form - when user submit, it clears the data
    form.reset();
}

//hide button to hide the taskform, keeps the website from looking cluttered
function hideAddTask() {
      var x = document.getElementById("taskform");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
  }



//STOPWATCH
//reference:https://codepen.io/FRADAR/pen/mdOvbvm
  
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
  
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
  
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
  
    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);
  
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");
  
    return `${formattedMM}:${formattedSS}:${formattedMS}`;
  }
  
  // Declare variables to use in our functions below
  
  let startTime;
  let elapsedTime = 0;
  let timerInterval;
  
  // Create function to modify innerHTML
  
  function print(txt) {
    document.getElementById("display").innerHTML = txt;
  }
  
  //"start", "pause" and "reset" functions
  
  function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      print(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
  }
  
  function pause() {
    clearInterval(timerInterval);
    showButton("PLAY");
  }
  
  function reset() {
    clearInterval(timerInterval);
    print("00:00");
    elapsedTime = 0;
    showButton("PLAY");
  }
  
  // Create function to display play and pause buttons
  
  function showButton(buttonKey) {
    const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
    const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
    buttonToShow.style.display = "block";
    buttonToHide.style.display = "none";
  }
  // Event listeners
  
  let playButton = document.getElementById("playButton");
  let pauseButton = document.getElementById("pauseButton");
  let resetButton = document.getElementById("resetButton");
  
  playButton.addEventListener("click", start);
  pauseButton.addEventListener("click", pause);
  resetButton.addEventListener("click", reset);

  //pomodoro timer should show when the work button is pressed
  if(workBtn==='yes'){
    displayTime.style.display="none";
    controlBtn.style.display="none";
  };


  //pomodoro
  //referenced from https://codepen.io/beccapirie/pen/VwpwVqL

  var pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    fillerDom : null,
    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.fillerDom = document.querySelector('#filler');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector('#work').onclick = function(){
        self.startWork.apply(self);
      };
      document.querySelector('#shortBreak').onclick = function(){
        self.startShortBreak.apply(self);
      };
      document.querySelector('#longBreak').onclick = function(){
        self.startLongBreak.apply(self);
      };
      document.querySelector('#stop').onclick = function(){
        self.stopTimer.apply(self);
      };
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200/(this.minutes*60);
      this.fillerHeight = 0;  
    },
    startWork: function() {
      this.resetVariables(25, 0, true);
    },
    startShortBreak : function(){
      this.resetVariables(5, 0, true);
    },
    startLongBreak : function(){
      this.resetVariables(15, 0, true);
    },
    stopTimer : function(){
      this.resetVariables(25, 0, false);
      this.updateDom();
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.style.height = this.fillerHeight + 'px';
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.started = false;
      this.fillerHeight = 0;
    }
};
window.onload = function(){
  pomodoro.init();
};


//acronym part

function makeAcronym(){
  //gets the phrase and result
  var phrase = document.getElementById("phrase").value;
  var result = document.getElementById("result");

  var acronymStr = phrase.match(/\b(\w)/g); // this line was referenced from https://www.codegrepper.com/code-examples/javascript/get+first+letter+of+each+word+in+string+javascript
  var acronym = acronymStr.join(' ');


  var node = document.createElement("p");
  var textnode = document.createTextNode(acronym);

  node.appendChild(textnode);

  document.getElementById("result").appendChild(node);

  console.log(acronym);
}