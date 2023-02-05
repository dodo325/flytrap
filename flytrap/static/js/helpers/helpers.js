const inInfinity = (number) => !Number.isFinite(number);

function addRow(name, description, value) {
    let tableRef = document.getElementById("main_table");

    // Insert a row at the end of the table
    let newRow = tableRef.insertRow(-1);

    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    // Add some text to the new cells:
    cell1.innerHTML = name;
    cell2.innerHTML = description;
    cell3.innerHTML = value;
}
