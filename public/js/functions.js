const API_URL = 'http://localhost:3000/api';

async function getCurrentUser() {
  const response = await fetch(API_URL + '/auth/me', {
    credentials: 'include',
  });

  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data.user;
}

// Hide & show password
function togglePassword() {
  const passwordInput = document.getElementById('login-password');
  const togglePasswordBtn = document.querySelector('.toggle-password');
  const eyeOpen = togglePasswordBtn.querySelector('.eye-open');
  const eyeClosed = togglePasswordBtn.querySelector('.eye-closed');

  togglePasswordBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeOpen.classList.add('d-none');
      eyeClosed.classList.remove('d-none');
      togglePasswordBtn.setAttribute('aria-label', 'Hide Password');
    } else {
      passwordInput.type = 'password';
      eyeOpen.classList.remove('d-none');
      eyeClosed.classList.add('d-none');
      togglePasswordBtn.setAttribute('aria-label', 'Show Password');
    }
  });
}
togglePassword();
