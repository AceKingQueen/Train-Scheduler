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
    var trainTime = $("#train-time").val().trim();
    var howOften = $("#how-often").val().trim();

    //send firebase the info
    database.ref().push({
        trainName: trainName,
        cityName: cityName,
        trainTime: trainTime,
        howOften: howOften,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

//this is watching for when something is added to firebase
database.ref().on("child_added", function(snapshot) {

    //check to make sure things are coming out of firebase
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().cityName);
    console.log(snapshot.val().trainTime);
    console.log(snapshot.val().howOften);

    //change the HTML to reflect the updates
    $("#added-name").text(snapshot.val().trainName);
    $("#added-city").text(snapshot.val().cityName);
    $("#added-time").text(snapshot.val().trainTime);
    $("#added-frequency").text(snapshot.val().howOften);
})

//get the info back from firebase & display it on the page

//time functionality