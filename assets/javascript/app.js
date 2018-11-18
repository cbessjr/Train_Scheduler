$("#add-train-btn").on("click", function () {
    event.preventDefault();

    var employeeName = $("#employee-name-input").val().trim();
    var employeeRole = $("#role-input").val().trim();
    var employeeStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
    var employeeRate = $("#rate-input").val().trim();

    var newEmployee = {
        name: employeeName,
        role: employeeRole,
        start: employeeStart,
        rate: employeeRate
    };

    database.ref().push(newEmployee);

    console.log(newEmployee.name);
    console.log(newEmployee.role);
    console.log(newEmployee.start);
    console.log(newEmployee.rate);

    alert("Successfully added Employee")

    $("#employee-name-input").val("")
    $("#role-input").val("")
    $("#start-input").val("")
    $("#rate-input").val("")
});

database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot);

    var name = childSnapshot.val().name
    var role = childSnapshot.val().role
    var start = childSnapshot.val().start
    var rate = childSnapshot.val().rate
    var startPretty = moment.unix(start).format("MM/DD/YYYY");
    console.log(startPretty);
    var mosWorked = moment().diff(moment(start, "X"), "months");
    var billed = mosWorked * rate;

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(role),
        $("<td>").text(startPretty),
        $("<td>").text(mosWorked),
        $("<td>").text("$" + rate),
        $("<td>").text("$" + billed)
    );

    $("#employee-table").append(newRow);
});