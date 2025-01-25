let tables = {};

// Create Table Function
function createTable() {
    const tableName = document.getElementById('tableName').value;
    const numColumns = parseInt(document.getElementById('numColumns').value);
    const columnNames = [];

    for (let i = 0; i < numColumns; i++) {
        const columnInput = document.getElementById(column${i});
        columnNames.push(columnInput.value);
    }

    if (!tableName || columnNames.includes("")) {
        alert("Please fill out all fields!");
        return;
    }

    tables[tableName] = { columns: columnNames, rows: [] };
    renderTables();
    updateSelectOptions();
    resetCreateTableForm();
}

// Update Column Inputs
function updateColumnInputs() {
    const numColumns = parseInt(document.getElementById('numColumns').value);
    const columnInputsDiv = document.getElementById('columnInputs');
    columnInputsDiv.innerHTML = '';

    for (let i = 0; i < numColumns; i++) {
        const input = document.createElement('input');
        input.id = column${i};
        input.placeholder = Column ${i + 1} Name;
        columnInputsDiv.appendChild(input);
    }
}

// Render Tables
function renderTables() {
    const tablesContainer = document.getElementById('tablesContainer');
    tablesContainer.innerHTML = '';

    for (const tableName in tables) {
        const tableDiv = document.createElement('div');
        tableDiv.innerHTML = <h3>${tableName}</h3>;
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');

        tables[tableName].columns.forEach(col => {
            const th = document.createElement('th');
            th.innerText = col;
            headerRow.appendChild(th);
        });
        const actionsTh = document.createElement('th');
        actionsTh.innerText = "Actions";
        headerRow.appendChild(actionsTh);
        table.appendChild(headerRow);

        tables[tableName].rows.forEach((row, rowIndex) => {
            const rowElement = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.innerText = cell;
                rowElement.appendChild(td);
            });

            const actionsTd = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.onclick = () => editRow(tableName, rowIndex);
            actionsTd.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = () => deleteRow(tableName, rowIndex);
            actionsTd.appendChild(deleteButton);

            rowElement.appendChild(actionsTd);
            table.appendChild(rowElement);
        });

        const addRowButton = document.createElement('button');
        addRowButton.innerText = 'Add Row';
        addRowButton.onclick = () => addRow(tableName);
        tableDiv.appendChild(addRowButton);
        tableDiv.appendChild(table);
        tablesContainer.appendChild(tableDiv);
    }
}

// Add Row Function
function addRow(tableName) {
    const rowValues = [];
    for (const col of tables[tableName].columns) {
        const value = prompt(Enter value for ${col}:);
        rowValues.push(value);
    }
    tables[tableName].rows.push(rowValues);
    renderTables();
}

// Edit Row Function
function editRow(tableName, rowIndex) {
    const row = tables[tableName].rows[rowIndex];
    const updatedValues = [];

    tables[tableName].columns.forEach((col, index) => {
        const value = prompt(Edit value for ${col}:, row[index]);
        updatedValues.push(value);
    });

    tables[tableName].rows[rowIndex] = updatedValues;
    renderTables();
}

// Delete Row Function
function deleteRow(tableName, rowIndex) {
    tables[tableName].rows.splice(rowIndex, 1);
    renderTables();
}

// Update Select Options for Joins and Aggregates
function updateSelectOptions() {
    const joinTable1 = document.getElementById('joinTable1');
    const joinTable2 = document.getElementById('joinTable2');
    const aggregateTable = document.getElementById('aggregateTable');
    const aggregateColumn = document.getElementById('aggregateColumn');

    joinTable1.innerHTML = '';
    joinTable2.innerHTML = '';
    aggregateTable.innerHTML = '';
    aggregateColumn.innerHTML = '';

    for (const tableName in tables) {
        const option1 = document.createElement('option');
        option1.value = tableName;
        option1.innerText = tableName;
        joinTable1.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = tableName;
        option2.innerText = tableName;
        joinTable2.appendChild(option2);

        const aggregateOption = document.createElement('option');
        aggregateOption.value = tableName;
        aggregateOption.innerText = tableName;
        aggregateTable.appendChild(aggregateOption);
    }
}

// Populate Aggregate Columns on Table Selection
document.getElementById('aggregateTable').addEventListener('change', function() {
    const tableName = this.value;
    const columns = tables[tableName].columns;
    const aggregateColumn = document.getElementById('aggregateColumn');
    aggregateColumn.innerHTML = '';

    columns.forEach(col => {
        const option = document.createElement('option');
        option.value = col;
        option.innerText = col;
        aggregateColumn.appendChild(option);
    });
});

// Perform Inner Join
function performInnerJoin() {
    const table1Name = document.getElementById('joinTable1').value;
    const table2Name = document.getElementById('joinTable2').value;
    const joinResult = [];

    const table1 = tables[table1Name];
    const table2 = tables[table2Name];

    if (table1.rows.length === 0 || table2.rows.length === 0) {
        alert("One of the tables is empty. Please add data to both tables.");
        return;
    }

    for (const row1 of table1.rows) {
        for (const row2 of table2.rows) {
            if (row1[0] === row2[0]) { // Assuming the first column is the key
                joinResult.push([...row1, ...row2]);
            }
        }
    }
    renderJoinTable(joinResult);
}


function performLeftJoin() {
    const table1Name = document.getElementById('joinTable1').value;
    const table2Name = document.getElementById('joinTable2').value;
    const joinResult = [];

    const table1 = tables[table1Name];
    const table2 = tables[table2Name];

    if (table1.rows.length === 0) {
        alert(Table ${table1Name} is empty. Please add data to this table.);
        return;
    }

    for (const row1 of table1.rows) {
        const matchingRow = table2.rows.find(row2 => row1[0] === row2[0]); // Assuming the first column is the key
        joinResult.push([...row1, ...(matchingRow ? matchingRow : Array(table2.columns.length).fill('N/A'))]);
    }
    renderJoinTable(joinResult);
}

// Render Join Result Table
function renderJoinTable(result) {
    const joinBody = document.getElementById('joinResultBody');
    joinBody.innerHTML = '';

    result.forEach(row => {
        const tableRow = `<tr>${row.map(cell => <td>${cell}</td>).join('')}</tr>`;
        joinBody.innerHTML += tableRow;
    });
}

// Calculate Aggregate Functions
function calculateAggregate(func) {
    const tableName = document.getElementById('aggregateTable').value;
    const columnName = document.getElementById('aggregateColumn').value;
    const table = tables[tableName];

    if (!table || table.rows.length === 0) {
        alert(Table ${tableName} is empty or does not exist.);
        return;
    }

    const columnIndex = table.columns.indexOf(columnName);
    const values = table.rows.map(row => parseFloat(row[columnIndex])).filter(num => !isNaN(num));

    if (values.length === 0) {
        alert(No numeric values found in column ${columnName}.);
        return;
    }

    let result;
    switch (func) {
        case 'sum':
            result = values.reduce((a, b) => a + b, 0);
            break;
        case 'avg':
            result = values.reduce((a, b) => a + b, 0) / values.length;
            break;
        case 'min':
            result = Math.min(...values);
            break;
        case 'max':
            result = Math.max(...values);
            break;
        default:
            return;
    }

    document.getElementById('aggregateResult').innerText = Result: ${result};
}

// Reset Form After Creating Table
function resetCreateTableForm() {
    document.getElementById('tableName').value = '';
    document.getElementById('numColumns').value = '';
    document.getElementById('columnInputs').innerHTML = '';
}