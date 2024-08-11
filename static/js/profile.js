function createPage(data) {
  console.log(data.name);
  const profile = document.querySelector("#profile-title");
  profile.innerText = data.name;
  username.innerText = data.username;
  email.innerText = data.email;
  const product_line = document.querySelector(".product-line");
  for (let item of data.products) {
    product_line.innerHTML += `
        <div class="m-card d-flex flex-column justify-content-around ">
            <div class="product-img">
              <img src="${item.productImg}" alt="" />
            </div>
            <div class="description"> 
              <h1>${item.name}</h1>
              <br/>
              <button 
                id="del-btn" 
                class="btn btn-dark" 
                onclick="deleteProduct('${item._id}')"
              >delete</button>
          </div>
        </div>
             
        `;
  }
}

fetch("http://localhost:3000/api/profile", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({}),
  credentials: "include",
})
  .then((res) => res.json())
  .then((data) => {
    if (data.msg == "ok") createPage(data.data);
  })
  .error((err) => {
    console.error("Error fetching data:", err);
  });
// Function to handle logout
function logout() {
  fetch("http://localhost:3000/api/log/out", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Ensure cookies are included in the request
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Logout failed");
      }
    })
    .then((data) => {
      if (data.msg === "ok") {
        window.location.href = "/api/home";
      }
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
}
function deleteProduct(id) {
  fetch("http://localhost:3000/api/product/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id}),
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.msg == "ok") {
        window.location.href = "/api/profile";
      }
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });
}
