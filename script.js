let tasks = [];
let goals = [];
let studyMinutes = 0;
let exercises = [];

let prayers = {
Fajr: false,
Zuhr: false,
Asr: false,
Maghrib: false,
Isha: false
};


function addTask() {

let input = document.getElementById("taskInput");

let taskText = input.value.trim();

if (taskText === "") {
return;
}

tasks.push({
text: taskText,
completed: false
});

input.value = "";

displayTasks();

updateDashboard();

updateProgress();

}


function displayTasks() {

let taskList = document.getElementById("taskList");

taskList.innerHTML = "";

tasks.forEach(function(task, index) {

let li = document.createElement("li");

li.className = "list-group-item d-flex justify-content-between align-items-center";


let leftSide = document.createElement("div");


let checkbox = document.createElement("input");

checkbox.type = "checkbox";

checkbox.className = "form-check-input me-2";

checkbox.checked = task.completed;


checkbox.addEventListener("change", function() {

task.completed = checkbox.checked;

displayTasks();

updateProgress();

});


let text = document.createElement("span");

text.innerText = task.text;


if (task.completed) {

text.style.textDecoration = "line-through";

}


leftSide.appendChild(checkbox);

leftSide.appendChild(text);


let deleteButton = document.createElement("button");

deleteButton.innerText = "Delete";

deleteButton.className = "btn btn-danger btn-sm";


deleteButton.addEventListener("click", function() {

tasks.splice(index, 1);

displayTasks();

updateDashboard();

updateProgress();

});


li.appendChild(leftSide);

li.appendChild(deleteButton);

taskList.appendChild(li);

});

}


function addGoal() {

let input = document.getElementById("goalInput");

let goalText = input.value.trim();


if (goalText === "") {

return;

}


goals.push({

text: goalText,

completed: false

});


input.value = "";

displayGoals();

updateDashboard();

updateProgress();

}


function displayGoals() {

let goalList = document.getElementById("goalList");

goalList.innerHTML = "";


goals.forEach(function(goal, index) {

let li = document.createElement("li");

li.className = "list-group-item d-flex justify-content-between align-items-center";


let leftSide = document.createElement("div");


let checkbox = document.createElement("input");

checkbox.type = "checkbox";

checkbox.className = "form-check-input me-2";

checkbox.checked = goal.completed;


checkbox.addEventListener("change", function() {

goal.completed = checkbox.checked;

displayGoals();

updateProgress();

});


let text = document.createElement("span");

text.innerText = goal.text;


if (goal.completed) {

text.style.textDecoration = "line-through";

}


leftSide.appendChild(checkbox);

leftSide.appendChild(text);


let deleteButton = document.createElement("button");

deleteButton.innerText = "Delete";

deleteButton.className = "btn btn-danger btn-sm";


deleteButton.addEventListener("click", function() {

goals.splice(index, 1);

displayGoals();

updateDashboard();

updateProgress();

});


li.appendChild(leftSide);

li.appendChild(deleteButton);

goalList.appendChild(li);

});

}


function addStudyTime() {

let input = document.getElementById("studyInput");

let minutes = Number(input.value);


if (minutes <= 0 || isNaN(minutes)) {

return;

}


studyMinutes = studyMinutes + minutes;

input.value = "";


document.getElementById("studyTime").innerText =
studyMinutes + " min";


updateDashboard();

updateProgress();

}


function addExercise() {

let exerciseInput =
document.getElementById("exerciseInput");

let minutesInput =
document.getElementById("exerciseMinutes");


let exerciseName =
exerciseInput.value.trim();

let minutes =
Number(minutesInput.value);


if (exerciseName === "" || minutes <= 0 || isNaN(minutes)) {

return;

}


exercises.push({

name: exerciseName,

minutes: minutes

});


exerciseInput.value = "";

minutesInput.value = "";


displayExercises();

updateDashboard();

updateProgress();

}


function displayExercises() {

let exerciseList =
document.getElementById("exerciseList");

exerciseList.innerHTML = "";


exercises.forEach(function(exercise, index) {

let li = document.createElement("li");

li.className =
"list-group-item d-flex justify-content-between align-items-center";


let text = document.createElement("span");

text.innerText =
exercise.name + " - " +
exercise.minutes + " min";


let deleteButton =
document.createElement("button");

deleteButton.innerText = "Delete";

deleteButton.className =
"btn btn-danger btn-sm";


deleteButton.addEventListener("click", function() {

exercises.splice(index, 1);

displayExercises();

updateDashboard();

updateProgress();

});


li.appendChild(text);

li.appendChild(deleteButton);

exerciseList.appendChild(li);

});

}


function setupPrayerTracker() {

let prayerChecks =
document.querySelectorAll(".prayer-check");


prayerChecks.forEach(function(check) {

check.addEventListener("change", function() {

let prayerName =
check.getAttribute("data-prayer");


prayers[prayerName] =
check.checked;


updatePrayerCount();

updateProgress();

});

});

}


function updatePrayerCount() {

let completedPrayers = 0;


Object.values(prayers).forEach(function(value) {

if (value === true) {

completedPrayers++;

}

});


document.getElementById("prayerCount").innerText =
completedPrayers + "/5";

}


function updateDashboard() {

document.getElementById("totalTasks").innerText =
tasks.length;


document.getElementById("totalGoals").innerText =
goals.length;


document.getElementById("totalStudyTime").innerText =
studyMinutes + " min";


let totalExerciseMinutes = 0;


exercises.forEach(function(exercise) {

totalExerciseMinutes =
totalExerciseMinutes + exercise.minutes;

});


document.getElementById("totalExercise").innerText =
totalExerciseMinutes + " min";

}


function updateProgress() {

let completedTasks = 0;

let completedGoals = 0;

let completedPrayers = 0;


tasks.forEach(function(task) {

if (task.completed) {

completedTasks++;

}

});


goals.forEach(function(goal) {

if (goal.completed) {

completedGoals++;

}

});


Object.values(prayers).forEach(function(value) {

if (value === true) {

completedPrayers++;

}

});


let exerciseCompleted = 0;


if (exercises.length > 0) {

exerciseCompleted = 1;

}


let totalItems =
tasks.length +
goals.length +
5 +
1;


let completedItems =
completedTasks +
completedGoals +
completedPrayers +
exerciseCompleted;


let percentage = 0;


if (totalItems > 0) {

percentage =
Math.round(
(completedItems / totalItems) * 100
);

}


let progressBar =
document.getElementById("progressBar");


let progressText =
document.getElementById("progressText");


if (progressBar) {

progressBar.style.width =
percentage + "%";

progressBar.innerText =
percentage + "%";

}


if (progressText) {

progressText.innerText =
percentage + "%";

}

}


function setTodayDate() {

let dateElement =
document.getElementById("date");


if (dateElement) {

let today = new Date();

dateElement.innerText =
today.toDateString();

}

}


function initialize() {

displayTasks();

displayGoals();

displayExercises();

updateDashboard();

setupPrayerTracker();

updatePrayerCount();

updateProgress();

setTodayDate();

}


initialize();