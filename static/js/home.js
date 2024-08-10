// Function to create the page content based on products
async function createPage(products) {
  console.log("createPage called");
  let products_length = products.length;
  let products_cnt = 0;
  let i = 1;

  while (products_cnt < products_length) {
    let row = null;
    if (products_cnt % 4 === 0) {
      row = document.createElement("div");
      row.id = `row${i}`;
      row.classList.add("row", "m-1", "gy-3");
      i++;
    } else {
      row = document.getElementById(`row${i}`);
      if (!row) {
        row = document.createElement("div");
        row.id = `row${i}`;
        row.classList.add("row", "m-1", "gy-5");
      }
    }

    for (let j = 0; j < 4; j++) {
      if (products_cnt >= products_length) break; // Prevent index out of bounds

      let product = products[products_cnt];
      products_cnt++;
      let col = document.createElement("div");
      col.classList.add(
        "col-lg-3",
        "col-md-6",
        "col-sm-12",
        "d-flex",
        "justify-content-center",
      );

      try {
        col.innerHTML = `
          <div class="card">
            <div class="d-flex justify-content-center">
              <img src="${product.Img}" class="card-img p-3" style="width: 80%; height:auto" alt="${product.ProductName}" />
            </div>
            <div class="card-body">
              <h5 class="card-title">${product.ProductName}</h5>
              <p class="card-text">
                ${product.Qty} ${product.ProductName} at price ${product.UnitPrice} per product
              </p>
              <a href="#" onclick="addToCart('${product._id}')" class="btn btn-dark">
                Add to cart
              </a>
            </div>
          </div>`;
      } catch (err) {
        console.error("Error creating product card:", err);
      }
      row.appendChild(col);
    }
    container.appendChild(row);
  }
  console.log(products_cnt);
}

// Handling form submission
const formEl = document.getElementById("search-form");
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = formEl.querySelector('input[name="search"]'); // Ensure 'search' is defined
  if (search.value.trim() === "") {
    return;
  }
  const formData = new FormData(formEl);
  axios
    .post("http://localhost:3000/api/search", Object.fromEntries(formData))
    .then((res) => {
      console.log(res.data);
      container.innerHTML = "";
      createPage(res.data.data);
    })
    .catch((error) => {
      console.error("Search error:", error);
      document.write("404");
    });
});

// Fetch initial data
axios
  .get("https://crud.teamrabbil.com/api/v1/ReadProduct")
  // .get("http://localhost:3000/api/home/getData")
  .then((res) => {
    console.log(res.data);
    createPage(res.data.data);
    axios
      .post("http://localhost:3000/api/home", res.data.data)
      .then((res) => {
        console.log(res);
        document.getElementById("log-out").style.display = "block";
        document.getElementById("sign-up").style.display = "none";
        document.getElementById("log-in").style.display = "none";
      })
      .catch((error) => {
        document.getElementById("log-out").style.display = "none";
        document.getElementById("sign-up").style.display = "block";
        document.getElementById("log-in").style.display = "block";
        if (error.response) {
          // Request was made and server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response error:", {
            status: error.response.status,
            headers: error.response.headers,
            data: error.response.data,
          });
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Request error:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
        }
      });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    (async () => {
      try {
        let response = await fetch("http://localhost:3000/api/home/getData");
        let data = await response.json();
        console.log(data);
        createPage(data.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    })();
  });

// Function to add product to cart
function addToCart(productId) {
  console.log("Adding to cart:", productId);
  fetch("http://localhost:3000/api/cart", {
    method: "POST",
    body: JSON.stringify({ pro_id: productId }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("Add to cart response:", res);
    })
    .catch((error) => {
      console.error("Error adding to cart:", error);
    });
}

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
        window.location.reload();
      }
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
}
