document
  .querySelector("#btnFilterProducts")
  .addEventListener("click", async () => {
    const minPrice = document.getElementById("minPrice").value || 0;
    const maxPrice = document.getElementById("maxPrice").value || Number.MAX_SAFE_INTEGER;
    
    const url = `http://localhost:3000/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}`;
    
    try {
      const response = await fetch(url);
      const products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  });

document
  .querySelector("#btnSearchProducts")
  .addEventListener("click", async () => {
    const searchTerm = document.getElementById("searchTerm").value;
    
    const url = `http://localhost:3000/api/products?search=${encodeURIComponent(searchTerm)}`;
    
    try {
      const response = await fetch(url);
      const products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error("Error fetching searched products:", error);
    }
  });

function displayProducts(products) {
  const productsList = document.getElementById("productsList");
  productsList.innerHTML = "";

  if (products.length === 0) {
    const noProductsItem = document.createElement("li");
    noProductsItem.classList.add("list-group-item");
    noProductsItem.textContent = "No Products found.";
    productsList.appendChild(noProductsItem);
    return;
  }

  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.classList.add("list-group-item");
    productItem.innerHTML = `
      ${product.id} - ${product.name} - ${product.price}€ - ${product.description}
      <button class="btn btn-danger btn-sm delete-product" data-id="${product.id}">Delete</button>
    `;

    productsList.appendChild(productItem);
  });

  document.querySelectorAll(".delete-product").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const productId = event.target.dataset.id;

      try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Product deleted successfully!");
          button.parentElement.remove();
        } else {
          alert("Failed to delete product.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("An error occurred while deleting the product.");
      }
    });
  });
}
