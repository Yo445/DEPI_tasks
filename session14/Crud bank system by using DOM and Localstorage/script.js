    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userForm = document.getElementById("userForm");
    const usersTable = document.getElementById("usersTable");

    // Render users in table
    function renderUsers() {
      usersTable.innerHTML = "";
      users.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.id}</td>
          <td>${user.balance}</td>
          <td class="actions">
            <button onclick="editUserByBalanceId('${user.id}')">Edit</button>
            <button class="delete" onclick="deleteUserById('${user.id}')">Delete</button>
          </td>
        `;
        usersTable.appendChild(row);
      });
    }

    // Add User
    function addUser(name, id, balance) {
      if (users.some(u => u.id === id)) {
        alert("User with this ID already exists!");
        return;
      }
      users.push({ name, id, balance });
      saveUsers();
      renderUsers();
    }

    // Edit user balance
    function editUserByBalanceId(id) {
      const user = users.find(u => u.id === id);
      if (user) {
        const newBalance = prompt("Enter new balance:", user.balance);
        if (newBalance !== null && !isNaN(newBalance)) {
          user.balance = Number(newBalance);
          saveUsers();
          renderUsers();
        }
      }
    }

    // Delete user
    function deleteUserById(id) {
      users = users.filter(u => u.id !== id);
      saveUsers();
      renderUsers();
    }

    // Save to localStorage
    function saveUsers() {
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Handle form submit
    userForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const id = document.getElementById("id").value.trim();
      const balance = Number(document.getElementById("balance").value);

      if (name && id && !isNaN(balance)) {
        addUser(name, id, balance);
        userForm.reset();
      }
    });

    // Initial render
    renderUsers();