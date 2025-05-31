const cartItemUpdateFormElements = document.querySelectorAll(
  ".cart-item-mangemenent"
);

async function updateCartItem(event) {
  event.preventDefault();
  const form = event.target;
  const prodId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const newQuantity = parseInt(form.querySelector("input").value, 10);
  if (newQuantity <= 0) {
    alert("Please enter a valid quantity greater than 0.");
    return;
  }

  try {
    const response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: prodId,
        newQuantity: newQuantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update cart item.");
    }

    const responseData = await response.json();

    const cartItemTotalPriceElement =
      form.parentElement.querySelector(".cart-item-price");
    cartItemTotalPriceElement.textContent = `${responseData.updatedCartItem.totalPrice.toFixed(
      2
    )}`;

    const cartTotalPriceElement = document.getElementById("cart-total-price");
    cartTotalPriceElement.textContent = `${responseData.newTotalPrice.toFixed(
      2
    )}`;

    const cartBadge = document.querySelector(".badge");
    cartBadge.textContent = responseData.newTotalQuantity;
  } catch (error) {
    alert("Something went wrong while updating the cart.");
  }
}

for (let formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
