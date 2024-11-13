const productList = document.querySelector('#products');
const addProductButton = document.querySelector('#add-product-button');
const updateProductButton = document.querySelector('#update-product-button');
const deleteProductButton = document.querySelector('#delete-product-button');
const addProductForm = document.querySelector('#add-product-form');
const updateProductForm = document.querySelector('#update-product-form');
const addForm = document.querySelector('#add-form');
const updateForm = document.querySelector('#update-form');

const API_URL = "54.224.193.230";
// Função para carregar os produtos
async function fetchProducts() {
  const response = await fetch(`${API_URL}:3000/products`);
  const products = await response.json();
  
  // Limpar a lista de produtos
  productList.innerHTML = '';

  // Adicionar os produtos à lista
  products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="product-info">
        <strong>${product.name}</strong><br>
        ${product.description}<br>
        R$ ${product.price}
      </div>
      <button class="update" onclick="editProduct(${product.id})">Editar</button>
      <button class="delete" onclick="deleteProduct(${product.id})">Excluir</button>
    `;
    productList.appendChild(li);
  });
}

// Função para exibir o formulário de adicionar produto
addProductButton.addEventListener('click', () => {
  addProductForm.style.display = 'block';
  updateProductForm.style.display = 'none';
});

// Função para adicionar um novo produto
addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const description = document.querySelector('#description').value;
  const price = document.querySelector('#price').value;

  await fetch(`${API_URL}:3000/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, price })
  });

  addProductForm.style.display = 'none';
  await fetchProducts();
});

// Função para exibir o formulário de editar produto
async function editProduct(id) {
  const response = await fetch(`${API_URL}:3000/products/${id}`);
  const product = await response.json();
  
  document.querySelector('#update-id').value = product.id;
  document.querySelector('#update-name').value = product.name;
  document.querySelector('#update-description').value = product.description;
  document.querySelector('#update-price').value = product.price;

  addProductForm.style.display = 'none';
  updateProductForm.style.display = 'block';
}

// Função para atualizar o produto
updateForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const id = document.querySelector('#update-id').value;
  const name = document.querySelector('#update-name').value;
  const description = document.querySelector('#update-description').value;
  const price = document.querySelector('#update-price').value;

  await fetch(`${API_URL}:3000/products${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, price })
  });

  updateProductForm.style.display = 'none';
  await fetchProducts();
});

// Função para excluir um produto
async function deleteProduct(id) {
  await fetch(`${API_URL}:3000/products${id}`, {
    method: 'DELETE',
  });

  await fetchProducts();
}

// Inicializa a lista de produtos
fetchProducts();
