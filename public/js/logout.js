function logout() {
  const logoutBtn = document.getElementById('logout-btn');

  logoutBtn.addEventListener('click', async function () {
    try {
      const response = await fetch(API_URL + '/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        const welcomeMessage = document.getElementById('welcome-message');

        if (welcomeMessage) {
          welcomeMessage.classList.add('d-none');
        }
        window.location.href = 'index.html';
      }
    } catch (error) {
      console.log(error);
    }
  });
}
logout();
