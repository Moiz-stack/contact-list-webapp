let contacts = []; // Array to store contacts
let editingIndex = -1; // Index of the contact being edited

// Function to add or update a contact
function addOrUpdateContact() {
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const actionButton = document.getElementById('actionButton');

    if (editingIndex >= 0) {
        // Update existing contact
        contacts[editingIndex] = { name, mobile, email };
        actionButton.textContent = 'Add Contact'; // Reset button text
        editingIndex = -1;
    } else {
        // Add new contact
        contacts.push({ name, mobile, email });
    }

    saveContacts();
    displayContacts();
}

// Function to edit a contact
function editContact(index, name, mobile, email) {
    document.getElementById('name').value = name;
    document.getElementById('mobile').value = mobile;
    document.getElementById('email').value = email;
    document.getElementById('actionButton').textContent = 'Update'; // Change button text
    editingIndex = index;
}

// Function to delete a contact
function deleteContact(index) {
    contacts.splice(index, 1);
    saveContacts();
    displayContacts();
}

// Function to search contacts
function searchContacts() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery) ||
        contact.mobile.toLowerCase().includes(searchQuery) ||
        contact.email.toLowerCase().includes(searchQuery)
    );
    displayContacts(filteredContacts);
}

// Function to sort contacts
function sortContacts() {
    const sortBy = document.getElementById("sort").value;
    if (sortBy === "none") {
        displayContacts();
        return;
    }

    contacts.sort((a, b) => {
        const fieldA = a[sortBy].toLowerCase();
        const fieldB = b[sortBy].toLowerCase();

        if (fieldA < fieldB) return -1;
        if (fieldA > fieldB) return 1;
        return 0;
    });

    displayContacts();
}

// Function to save contacts to localStorage
function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Function to load contacts from localStorage
function loadContacts() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
        contacts = JSON.parse(savedContacts);
    }
    displayContacts();
}

// Function to display contacts
function displayContacts(filteredContacts = contacts) {
    const tbody = document.getElementById('contactTable').querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing rows

    filteredContacts.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.className = 'border-b';

        row.innerHTML = `
            <td class="py-2 px-4">${contact.name}</td>
            <td class="py-2 px-4">${contact.mobile}</td>
            <td class="py-2 px-4">${contact.email}</td>
            <td class="py-2 px-4 flex space-x-2">
                <button onclick="editContact(${index}, '${contact.name}', '${contact.mobile}', '${contact.email}')" class="py-1 px-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">Edit</button>
                <button onclick="deleteContact(${index})" class="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Initialize contacts on page load
window.onload = loadContacts;
