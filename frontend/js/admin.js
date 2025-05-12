const form = document.getElementById('userForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        window.location.href = 'login.html';
        return;
      }

      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, password, role })
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        form.reset();
      } else {
        if (res.status === 401) {
          alert('Session expired. Please login again.');
          window.location.href = 'login.html';
      } else {
        alert(data.message);
        }
      }
    });