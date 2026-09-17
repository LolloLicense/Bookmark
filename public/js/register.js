function register() {
  const registerForm = document.getElementById('register-form');

  registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // clears old messages
    document.getElementById('register-message').textContent = '';
    document.getElementById('username-error').textContent = '';
    document.getElementById('password-error').textContent = '';

    // get the input fileds
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    try {
      const response = await fetch(API_URL + '/auth/register', {
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
      if (response.ok) {
        registerForm.reset();
        // send user message that all is good
        document.getElementById('register-message').textContent =
          'Congrats, You are now a Bookmark member! You can now log in';
      } else {
        if (data.field === 'username') {
          document.getElementById('username-error').textContent = data.message;
        }
        if (data.field === 'password') {
          document.getElementById('password-error').textContent = data.message;
        }
        if (!data.field) {
          document.getElementById('register-message').textContent = data.message;
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
}

register();
