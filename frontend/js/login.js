const form = document.getElementById("loginForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json()
  if(res.ok){
    // Store the token in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    alert(`Login success as ${data.user.role}`)
    if(data.user.role === 'admin'){
        window.location.href = 'admin.html'
    }
    else{
        window.location.href = 'index.html'
    }
  }
  else {
    alert(data.message)
  }
});
