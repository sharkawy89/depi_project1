window.addEventListener("load", () => {
  let xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === 200) {
      let allProducts = JSON.parse(xhr.responseText);

      const cartIds = (JSON.parse(localStorage.getItem("cart")) || []).map(
        (id) => id.toString(),
      );

      let container = document.getElementById("checkout-items");

      let total = 0;
      let html = "";

      for (let product of allProducts) {
        if (cartIds.includes(product.id.toString())) {
          total += parseFloat(product.price);

          html += `
<div class="checkout-item">

<img src="${product.image}">

<div>
<div class="checkout-item-name">${product.name}</div>
<div class="checkout-item-price">$${parseFloat(product.price).toFixed(2)}</div>
</div>

</div>
`;
        }
      }

      container.innerHTML = html;

      document.getElementById("checkout-total").innerText =
        `$${total.toFixed(2)}`;
    }
  };

  xhr.open(
    "GET",
    "https://69b309b1e224ec066bdb526a.mockapi.io/products/product",
  );

  xhr.send();
});

const form = document.getElementById("checkout-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  const order = {
    name,
    address,
    phone,
    items: JSON.parse(localStorage.getItem("cart")),
  };

  localStorage.setItem("order", JSON.stringify(order));

  Swal.fire({
    title: "Order Placed!",
    text: "Your order has been submitted successfully",
    icon: "success",
    confirmButtonColor: "#0b74ff",
  });

  localStorage.removeItem("cart");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
});
