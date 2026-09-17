function showLoggedInUser(user) {
  document.getElementById('auth-content').classList.add('d-none');
  document.getElementById('account-content').classList.remove('d-none');

  document.querySelectorAll('.admin-menu-item').forEach(item => {
    item.classList.toggle('d-none', !user.is_admin);
  });

  const welcomeMessage = document.getElementById('welcome-message');
  if (welcomeMessage) {
    welcomeMessage.querySelector('p').innerText = `Welcome ${user.username}`;
    welcomeMessage.classList.remove('d-none');
  }
}

async function login() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;

      const response = await fetch(API_URL + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      // login success-flow
      if (response.ok) {
        // clear loginform on login
        document.getElementById('login-form').reset();

        showLoggedInUser(data.user);

        // The message that shows up in modal
        const loginMessage = document.getElementById('login-message');
        loginMessage.innerHTML = '';
        loginMessage.className = '';

        //hides the modal on login
        const modalElement = document.getElementById('login-modal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        window.location.reload();
      } else {
        // 5. Make the error message display in a red fashioned label. Use bootstraps classes
        document.getElementById('login-message').className = 'alert alert-danger';
        document.getElementById('login-message').innerHTML = 'Login failed. Please check your credentials';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
}

// Keep me logged in on refresh
async function checkSession() {
  try {
    // fetching a helper from functions.js
    const user = await getCurrentUser();

    if (user) {
      showLoggedInUser(user);
    }
  } catch (error) {
    console.log(error);
  }
}

checkSession();
login();
