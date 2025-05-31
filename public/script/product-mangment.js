const deleteProductButtonElements = document.querySelectorAll(
  ".product-item button"
);

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productId; // Retrieve productId
  const csrfToken = buttonElement.dataset.csrf;

  if (!productId) {
    alert("Product ID is missing!");
    return;
  }

  try {
    const response = await fetch(
      "/admin/products/" + productId + "?_csrf=" + csrfToken,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      alert("Something went wrong: " + (errorData.message || "Unknown error"));
      return;
    }

    const productElement = buttonElement.closest(".product-item");
    productElement.remove();
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("An error occurred while deleting the product.");
  }
}

for (let deleteProductButtonElement of deleteProductButtonElements) {
  deleteProductButtonElement.addEventListener("click", deleteProduct);
}
