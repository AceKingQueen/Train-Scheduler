//initialize firebase
  var config = {
    apiKey: "AIzaSyBQlT2zppQ4MXSPfAyeu7GXdYb0aMsGR4g",
    authDomain: "train-scheduler-7d54a.firebaseapp.com",
    databaseURL: "https://train-scheduler-7d54a.firebaseio.com",
    projectId: "train-scheduler-7d54a",
    storageBucket: "",
    messagingSenderId: "30674444945"
  };
  firebase.initializeApp(config);

//create variable for database
var database = firebase.database();

//add train on click
$("#add-train").on("click", function(event) {

    //allow use of "enter" on keyboard for submit
    event.preventDefault();

    //grab values from text boxes
    var trainName = $("#train-name").val().trim();
    var cityName = $("#city-name").val().trim();
    var howOften = $("#how-often").val().trim();
    var trainTime = $("#train-time").val().trim();
    

    //send firebase the info
    database.ref().push({
        trainName: trainName,
        cityName: cityName,
        howOften: howOften,
        trainTime: trainTime,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

//=====get the info back from firebase & display it on the page========


//this is watching for when something is added to firebase
database.ref().on("child_added", function(snapshot) {

    //change the HTML to reflect the updates
    var sv = snapshot.val();

    //create new row and new cell once data is entered for train name
    var createRow = $("<tr></tr>");
    var createCell = $("<td></td>").append(sv.trainName);
    createRow.append(createCell);

    //create new cell once data is entered for destination city
    createCell = $("<td></td>").append(sv.cityName);
    createRow.append(createCell);
   
//===========================calculate next arrival==========================    
    
    //create new cell once data is entered for frequency
    var tFrequency = sv.howOften;
    createCell = $("<td></td>").append(sv.howOften);
    createRow.append(createCell);

    //variable to store first train time
    var firstTime = sv.trainTime;
    
    //first time pushed back one year to make sure it comes before current time to avoid confusion
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    //current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    //difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    //time apart(remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    //minute until train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    //next train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    createCell = $("<td></td>").append(sv.trainTime);
    createRow.append(createCell);

//===========================calculate minutes away==========================  

    

    //add newly formed row to the bottom of the table
    $("#train-table").append(createRow);

//handles errors
}, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });




//time functionality