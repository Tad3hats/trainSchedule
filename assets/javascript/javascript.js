// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyBjpnHcidb5U8KGdGhQLNSb5NLf4bdnEI0",
  authDomain: "trainschedule-c1dae.firebaseapp.com",
  databaseURL: "https://trainschedule-c1dae.firebaseio.com",
  projectId: "trainschedule-c1dae",
  storageBucket: "trainschedule-c1dae.appspot.com",
  messagingSenderId: "360209568588"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  //create variable to reference the database
  var trainName = "";
  var trainDestination = "";
  var trainStart = 0;
  var trainFrequency = 0;
  var nextArrival=0;
  var minutesAway=0;


  // Grabs user input
  trainName = $("#train-name-input").val().trim();
  trainDestination = $("#destination-input").val().trim();
  trainStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  trainFrequency = $("#frequency-input").val().trim();
  nextArrival;
  minutesAway;

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().role;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().rate;

  // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);
  

  // Pretty up the train start
  var trainStartPretty = moment.unix(trainStart).format("MM/DD/YY");


// Set up calculations for train arrival 
var tFrequency = 3;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextArrival = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var trainMonths = moment().diff(moment(trainStart, "X"), "months");
  // console.log(traomMonths);

  // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016

  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
