const API_URL = 'http://localhost:3000/api';

// User Management Functions
async function fetchUsers() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first');
    window.location.href = 'login.html';
    return;
  }

  try {
    const res = await fetch(`${API_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (res.status === 401) {
      alert('Session expired. Please login again.');
      window.location.href = 'login.html';
      return;
    }

    const users = await res.json();
    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = '';
    users.forEach(user => {
      tbody.innerHTML += `
        <tr>
          <td>${user.id}</td>
          <td>${user.username}</td>
          <td>${user.role}</td>
          <td>
            <button onclick="editUser(${user.id}, '${user.username}', '${user.role}')">Edit</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    alert('Failed to fetch users');
  }
}

function showAddUserForm() {
  document.getElementById('userFormTitle').textContent = 'Add User';
  document.getElementById('userId').value = '';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('role').value = '';
  document.getElementById('password').required = true;
  document.getElementById('userFormContainer').style.display = 'block';
}

function editUser(id, username, role) {
  document.getElementById('userFormTitle').textContent = 'Edit User';
  document.getElementById('userId').value = id;
  document.getElementById('username').value = username;
  document.getElementById('role').value = role;
  document.getElementById('password').required = false;
  document.getElementById('userFormContainer').style.display = 'block';
}

function cancelUserForm() {
  document.getElementById('userFormContainer').style.display = 'none';
}

// Handle user form submission
document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const userId = document.getElementById('userId').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first');
    window.location.href = 'login.html';
    return;
  }

  const payload = { username, role };
  if (password) {
    payload.password = password;
  }

  const method = userId ? 'PUT' : 'POST';
  const url = userId ? `${API_URL}/users/${userId}` : `${API_URL}/users`;

  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      cancelUserForm();
      fetchUsers();
    } else {
      if (res.status === 401) {
        alert('Session expired. Please login again.');
        window.location.href = 'login.html';
      } else {
        alert(data.message);
      }
    }
  } catch (error) {
    alert('An error occurred. Please try again.');
  }
});

async function deleteUser(id) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first');
    window.location.href = 'login.html';
    return;
  }

  if (!confirm('Are you sure you want to delete this user?')) {
    return;
  }

  try {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      fetchUsers();
    } else {
      if (res.status === 401) {
        alert('Session expired. Please login again.');
        window.location.href = 'login.html';
      } else {
        alert(data.message);
      }
    }
  } catch (error) {
    alert('An error occurred. Please try again.');
  }
}

// Product Management Functions
async function fetchProducts() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first');
    window.location.href = 'login.html';
    return;
  }

  try {
    const res = await fetch(`${API_URL}/products`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (res.status === 401) {
      alert('Session expired. Please login again.');
      window.location.href = 'login.html';
      return;
    }

    const products = await res.json();
    const tbody = document.querySelector('#productsTable tbody');
    tbody.innerHTML = '';
    products.forEach(p => {
      tbody.innerHTML += `
        <tr>
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${p.category}</td>
          <td>${p.price}</td>
          <td>${p.stock}</td>
          <td>
            <button onclick="editProduct(${p.id}, '${p.name}', '${p.category}', ${p.price}, ${p.stock})">Edit</button>
            <button onclick="deleteProduct(${p.id})">Delete</button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    alert('Failed to fetch products');
  }
}

function showAddForm() {
  document.getElementById('formTitle').textContent = 'Add Product';
  document.getElementById('productId').value = '';
  document.getElementById('productName').value = '';
  document.getElementById('productCategory').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productStock').value = '';
  document.getElementById('productForm').style.display = 'block';
}

function editProduct(id, name, category, price, stock) {
  document.getElementById('formTitle').textContent = 'Edit Product';
  document.getElementById('productId').value = id;
  document.getElementById('productName').value = name;
  document.getElementById('productCategory').value = category;
  document.getElementById('productPrice').value = price;
  document.getElementById('productStock').value = stock;
  document.getElementById('productForm').style.display = 'block';
}

function cancelForm() {
  document.getElementById('productForm').style.display = 'none';
}

async function submitProduct() {
  const id = document.getElementById('productId').value;
  const name = document.getElementById('productName').value;
  const category = document.getElementById('productCategory').value;
  const price = document.getElementById('productPrice').value;
  const stock = document.getElementById('productStock').value;

  const payload = { name, category, price, stock };
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please login first');
    window.location.href = 'login.html';
    return;
  }

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/products/update/${id}` : `${API_URL}/products/add`;

  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      cancelForm();
      fetchProducts();
    } else {
      if (res.status === 401) {
        alert('Session expired. Please login again.');
        window.location.href = 'login.html';
      } else {
        alert(data.message);
      }
    }
  } catch (error) {
    alert('An error occurred. Please try again.');
  }
}

async function deleteProduct(id) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    alert('Please login first');
    window.location.href = 'login.html';
    return;
  }

  if (!confirm('Are you sure you want to delete this product?')) {
    return;
  }

  try {
    const res = await fetch(`${API_URL}/products/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      fetchProducts();
    } else {
      if (res.status === 401) {
        alert('Session expired. Please login again.');
        window.location.href = 'login.html';
      } else {
        alert(data.message);
      }
    }
  } catch (error) {
    alert('An error occurred. Please try again.');
  }
}

// Initialize both tables on page load
window.onload = () => {
  fetchUsers();
  fetchProducts();
};
