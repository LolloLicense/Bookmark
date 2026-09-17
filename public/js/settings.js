let currentUserId = null;

function handleDeleteBtn() {
  const confirmDeleteBtn = document.getElementById('confirm-delete-account-btn');
  const passwordInput = document.getElementById('delete-account-password');

  confirmDeleteBtn.addEventListener('click', async () => {
    const password = passwordInput.value;
    if (password === '') {
      return;
    }

    try {
      const response = await fetch(API_URL + `/users/${currentUserId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        throw new Error('Could not delete account, check username & password');
      }
      const logoutResponse = await fetch(API_URL + '/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (logoutResponse.ok) {
        window.location.href = 'index.html';
      }
    } catch (error) {
      console.log(error);
    }
  });
}

async function loadAccount() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return;
  }
  currentUserId = currentUser.userId;
  const response = await fetch(API_URL + `/users/${currentUserId}`, {
    credentials: 'include',
  });

  const user = await response.json();
  document.getElementById('account-username').innerText = user.username;
  document.getElementById('account-created').innerText = new Date(user.created_at).toLocaleDateString('en-GB');
}

async function updateAccount() {
  const newUsername = document.getElementById('edit-username').value;
  const newPassword = document.getElementById('edit-password').value;
  const patchAccount = {};
  if (newUsername !== '') {
    patchAccount.username = newUsername;
  }
  if (newPassword !== '') {
    patchAccount.password = newPassword;
  }
  try {
    const response = await fetch(API_URL + `/users/${currentUserId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(patchAccount),
    });
    if (!response.ok) {
      throw new Error('Unable to update account');
    }
    editAccountForm.reset();
    await loadAccount();
    const successMsg = document.getElementById('edit-account-msg');
    successMsg.classList.remove('invisible');
  } catch (error) {
    console.log(error);
  }
}

const editAccountForm = document.getElementById('edit-account-form');
editAccountForm.addEventListener('submit', async event => {
  event.preventDefault();
  await updateAccount();
});
loadAccount();
handleDeleteBtn();
