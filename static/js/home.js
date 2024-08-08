let container = document.getElementById("container");
async function createPage(products) {
  console.log("create page called ");
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
      row.id = `row${i}`;
      row.classList.add("row", "m-1", "gy-5");
    }

    for (let j = 0; j < 4; j++) {
      let product = products[products_cnt];
      products_cnt++;
      let col = document.createElement("div");
      col.classList.add(
        "col-lg-3",
        "col-md-6",
        "col-sm-12",
        "d-flex",
        "justify-content-center"
      );
      try {
        col.innerHTML = `
          <div class="card"">
            <div class="d-flex justify-content-center">
              <img src="${product.Img}" class="card-img p-3" style="width: 80%; height:auto" alt="${product.ProductName}" />
            </div>
            <div class="card-body">
              <h5 class="card-title">${product.ProductName}</h5>
              <p class="card-text">
                ${product.Qty} ${product.ProductName} at price ${product.UnitPrice} per product
              </p>
              <a href="#" onclick="addToCart('${product._id}')" class ="btn btn-dark">
                add to cart
              </a>
            </div>
          </div>`;
      } catch (err) {}
      // addToCart('${JSON.stringify(product)}')
      row.appendChild(col);
    }
    container.appendChild(row);
  }
  console.log(products_cnt);
}

const formEl = document.getElementById("search-form");
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.value);
  if (search.value == "") {
  } else {
    const formData = new FormData(formEl);
    axios
      .post("http://localhost:3000/api/search", Object.fromEntries(formData))
      .then((res) => {
        console.log(res.data);
        container.innerHTML = "";
        createPage(res.data.data);
      })
      .catch((error) => {
        document.write("404");
      });
  }
});
axios
  .get("https://crud.teamrabbil.com/api/v1/ReadProduct")
  // .get("http://localhost:3000/api/home/getData")
  .then((res) => {
    console.log(res.cookies);
    createPage(res.data.data);
    axios.post("http://localhost:3000/api/home", res.data.data);
  })
  .catch((error) => {
    (async () => {
      let data = await fetch("http://localhost:3000/api/home/getData");
      data = await data.json();
      console.log(data);
      createPage(data.data);
    })();
  });

function addToCart(product) {
  console.log(product);
  // axios
  //   .post("http://localhost:3000/api/cart", { pro_id: product })
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  fetch("http://localhost:3000/api/cart", {
    method: "POST",
    body: JSON.stringify({pro_id: product}),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}
if (document.cookie == "") {
  document.getElementById("log-out").style.display = "none";
} else {
  document.getElementById("sign-up").style.display = "none";
  document.getElementById("log-in").style.display = "none";
}
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
      if (data.msg == "ok") {
        window.location.reload();
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}
