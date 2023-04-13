// Handle form submit
document
  .querySelector("#torn-api-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const apiKey = document.querySelector("#api-key").value;
    const userId = document.querySelector("#user-id").value;
    localStorage.setItem("torn-api-key", apiKey); // Save the API key to local storage
    fetch(
      `https://api.torn.com/user/${userId}?selections=bazaar&key=${apiKey}&comment=oranbazaar`
    )
      .then((response) => response.json())
      .then((data) => {
        const bazaarList = document.querySelector("#bazaar-list");
        bazaarList.innerHTML = "";
        const sortedBazaarItems = data.bazaar.sort((a, b) => b.price - a.price);
        const bazaarItems = sortedBazaarItems
          .map((item) => {
            const imageUrl = `https://www.torn.com/images/items/${item.ID}/large.png`;
            return `<div class="bg-gray-700 rounded-md shadow-2xl p-4 mb-4 col-span-1 flex">
   <img class="w-1/3 h-32 object-contain mr-4" src="${imageUrl}">
   <div class="w-2/3">
     <h3 class="text-lg font-bold">${item.name}</h3>
     <p class="mt-2">Price: ${item.price.toLocaleString()}</p>
     <p class="mt-2">Quantity: ${item.quantity.toLocaleString()}</p>
     <p class="mt-2">Market Price: ${item.market_price.toLocaleString()}</p>
   </div>
 </div>`;
          })
          .join("");
        bazaarList.innerHTML = `<div class="grid grid-cols-3 gap-4">${bazaarItems}</div>`;

        const totalQuantity = sortedBazaarItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        const totalPrice = sortedBazaarItems.reduce(
          (acc, item) => acc + item.price,
          0
        );
        const totalMarketPrice = sortedBazaarItems.reduce(
          (acc, item) => acc + item.market_price,
          0
        );
        const totalDiv = document.createElement("div");
        totalDiv.innerHTML = `<p class="mt-4 font-bold text-center">Total Quantity: ${totalQuantity.toLocaleString()}</p>
                      <p class="mt-2 font-bold text-center">Total Price: ${totalPrice.toLocaleString()}</p>
                      <p class="mt-2 font-bold text-center">Total Market Price: ${totalMarketPrice.toLocaleString()}</p>`;
        bazaarList.appendChild(totalDiv);
      })
      .catch((error) => {
        console.error(error);
      });
  });

const apiKey = localStorage.getItem("torn-api-key");
if (apiKey) {
  document.querySelector("#api-key").value = apiKey;
}
