let users = [];
let currentUserId = null;

// Function to render user table
function renderUserTable() {
    const tbody = document.querySelector("#userTable tbody");
    tbody.innerHTML = ""; // Clear the table content before rendering
    
    users.forEach((user, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser(${index})">Edit</button>
                    <button onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Function to handle form submission
document.getElementById("userForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    
    if (currentUserId === null) {
        // Create new user
        users.push({ name, email });
    } else {
        // Update existing user
        users[currentUserId] = { name, email };
        currentUserId = null;
    }
    
    resetForm();
    renderUserTable();
});

// Function to reset the form
function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    currentUserId = null;
}

// Function to edit user
function editUser(index) {
    document.getElementById("name").value = users[index].name;
    document.getElementById("email").value = users[index].email;
    currentUserId = index;
}

// Function to delete user
function deleteUser(index) {
    users.splice(index, 1);
    renderUserTable();
}

// Initialize user table on page load
document.addEventListener("DOMContentLoaded", renderUserTable);
