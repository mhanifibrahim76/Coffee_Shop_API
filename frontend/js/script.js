// Global variable to store products
let products = [];

// Backend URL
const BACKEND_URL = 'http://localhost:3000';

// Fetch products when page loads
document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    populateProductSelects();
});

// Load products from the API
async function loadProducts() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BACKEND_URL}/api/products`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch products');
        products = await response.json();
        console.log('Loaded products:', products);
    } catch (error) {
        console.error('Error loading products:', error);
        alert('Failed to load products');
    }
}

// Populate product select elements
function populateProductSelects() {
    const selects = document.querySelectorAll('select[name="product_id"]');
    selects.forEach(select => {
        // Clear existing options except the first one
        while (select.options.length > 1) {
            select.remove(1);
        }
        
        // Add product options
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = `${product.name} - Rp${product.price}`;
            select.appendChild(option);
        });
    });
}

// Add new item entry
function addNewItem() {
    const itemList = document.getElementById('itemList');
    const newItem = document.createElement('div');
    newItem.className = 'item-entry';
    newItem.innerHTML = `
        <select name="product_id" required>
            <option value="">Select Product</option>
        </select>
        <input type="number" name="quantity" placeholder="Quantity" min="1" required>
        <button type="button" class="btn btn-danger" onclick="removeItem(this)">Remove</button>
    `;
    itemList.appendChild(newItem);
    populateProductSelects();
}

// Remove item entry
function removeItem(button) {
    const itemEntries = document.querySelectorAll('.item-entry');
    if (itemEntries.length > 1) {
        button.parentElement.remove();
    } else {
        alert('At least one item is required');
    }
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
}

// Format date
function formatDate(date) {
    return new Date(date).toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Generate receipt content
async function generateReceipt(transactionId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BACKEND_URL}/api/transactions/${transactionId}/receipt`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch receipt');
        const data = await response.json();

        // Format receipt
        let receiptContent = `
===========================================
                KASIR RECEIPT             
===========================================
Date: ${formatDate(data.transaction.date)}
Transaction ID: ${data.transaction.id}
Customer: ${data.transaction.customer}
-------------------------------------------

Items:
`;

        data.items.forEach(item => {
            receiptContent += `
${item.name}
${item.quantity} x ${formatCurrency(item.price)} = ${formatCurrency(item.quantity * item.price)}`;
        });

        receiptContent += `
-------------------------------------------
Total Products: ${data.transaction.total_product}
Total Amount: ${formatCurrency(data.transaction.total_price)}
===========================================
          Thank You For Shopping!          
===========================================`;

        return receiptContent;
    } catch (error) {
        console.error('Error generating receipt:', error);
        throw error;
    }
}

// Show receipt modal
function showReceiptModal(content) {
    const modal = document.getElementById('receiptModal');
    const receiptContent = document.getElementById('receiptContent');
    receiptContent.textContent = content;
    modal.style.display = 'block';
}

// Close receipt modal
function closeReceiptModal() {
    const modal = document.getElementById('receiptModal');
    modal.style.display = 'none';
}

// Print receipt
function printReceipt() {
    const receiptContent = document.getElementById('receiptContent').textContent;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Receipt</title>');
    printWindow.document.write('<style>body { font-family: monospace; white-space: pre-line; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(receiptContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// Handle transaction creation
async function handleCreateTransaction(event) {
    event.preventDefault();

    const customerName = document.getElementById('customer').value;
    const itemEntries = document.querySelectorAll('.item-entry');
    const items = [];

    // Collect items data
    itemEntries.forEach(entry => {
        const productId = entry.querySelector('select[name="product_id"]').value;
        const quantity = entry.querySelector('input[name="quantity"]').value;
        
        if (productId && quantity) {
            items.push({
                product_id: parseInt(productId),
                quantity: parseInt(quantity)
            });
        }
    });

    // Validate data
    if (!customerName || items.length === 0) {
        alert('Please fill in all required fields');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BACKEND_URL}/api/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                customer: customerName,
                items: items
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create transaction');
        }

        const result = await response.json();
        
        // Generate and show receipt
        const receiptContent = await generateReceipt(result.transaction.transaction_id);
        showReceiptModal(receiptContent);

        // Reset form
        document.getElementById('transactionForm').reset();
        const itemList = document.getElementById('itemList');
        while (itemList.children.length > 1) {
            itemList.removeChild(itemList.lastChild);
        }
        
    } catch (error) {
        console.error('Error creating transaction:', error);
        alert('Failed to create transaction');
    }
}
