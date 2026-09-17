function renderUsers(users) {
  const tableBody = document.getElementById('users-table-body');

  tableBody.innerHTML = users
    .map(user => {
      return `
          <tr class="fs-6">
            <td class="p-0">${user.username}</td>
            <td class="p-0 ps-3">${user.is_admin ? 'Yes' : 'No'}</td>
            <td class="p-0">${new Date(user.created_at).toLocaleDateString('en-GB')}</td>
            <td class="text-end">
              <button
                class="btn btn-light delete-user-btn"
                data-id="${user.id}"
              >
                Delete
              </button>
            </td>
          </tr>
        `;
    })
    .join('');

  // event for delete button
  document.querySelectorAll('.delete-user-btn').forEach(button => {
    button.addEventListener('click', () => {
      deleteUser(button.dataset.id);
    });
  });
}

async function getUsers() {
  try {
    const response = await fetch(API_URL + '/users', {
      credentials: 'include',
    });

    if (!response.ok) {
      console.log('Could not fetch users');
      return;
    }

    const users = await response.json();
    renderUsers(users);
  } catch (error) {
    console.log(error);
  }
}

//Delete user
async function deleteUser(userId) {
  const confirmed = confirm('Are you sure you want to delete this user?');

  if (!confirmed) {
    return;
  }
  try {
    const response = await fetch(API_URL + `/users/${userId}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      getUsers();
    }
  } catch (error) {
    console.log(error);
  }
}

getUsers();
