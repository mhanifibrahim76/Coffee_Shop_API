fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('product-list')
    data.forEach(product => {
        const li = document.createElement('li')
        li.textContent = `${product.name} - price: ${product.price}`
        list.appendChild(li)
    });
  })
  .catch(error => {
    console.error('Gagal mengambil product:', error)
  })
