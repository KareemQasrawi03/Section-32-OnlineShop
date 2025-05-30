const addToCartButtonElemnt = document.querySelector("#product-details button");
const cartBadgeElement = document.querySelector(".nav-item .badge");

async function addToCart() {
  const productId = addToCartButtonElemnt.dataset.productid;
  const csrfToken = addToCartButtonElemnt.dataset.csrf;
  let response;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({ productId: productId, _csrf: csrfToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }
  if (!response) {
    alert("Something went wrong!");
    return;
  }

  const responseData = await response.json();
  const newTotalQuantity = responseData.newTotalItems;
  cartBadgeElement.textContent = newTotalQuantity;
}

addToCartButtonElemnt.addEventListener("click", addToCart);
