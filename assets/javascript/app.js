


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCHB3vVFL66mvsZaV5XeTYXqEk46al9lDc",
    authDomain: "ender-a6257.firebaseapp.com",
    databaseURL: "https://ender-a6257.firebaseio.com",
    projectId: "ender-a6257",
    storageBucket: "ender-a6257.appspot.com",
    messagingSenderId: "182360977035"
  };
  firebase.initializeApp(config);

  var database = firebase.database();




$("#add-train-btn").on("click", function () {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainStart,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    alert("Successfully added Train")

    $("#train-name-input").val("")
    $("#destination-input").val("")
    $("#start-input").val("")
    $("#frequency-input").val("")
});

database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot);

    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var start = childSnapshot.val().start;
    var frequency = childSnapshot.val().frequency;
    var startTime = moment.unix(start).format("HH:mm");
    console.log(startTime);
    // var mosWorked = moment().diff(moment(start, "X"), "months");
    // var billed = mosWorked * rate;

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(startTime),
        // $("<td>").text(mosWorked),
        $("<td>").text("$" + frequency),
        // $("<td>").text("$" + billed)
    );

    $("#train-table").append(newRow);
});