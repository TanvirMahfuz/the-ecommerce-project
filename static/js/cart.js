function startpage() {
  document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById("container");
    // axios
    //   .get("http://localhost:3000/api/cart/cartData") // Make sure the URL matches your server's address and port
    //   .then((response) => {
    //     createPage(response.data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    try {
      fetch("http://localhost:3000/api/cart/cartData", {
        credentials: "include",
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data.data);
          createPage(data.data);
        });
    } catch (error) {
      console.log(error);
    }

    async function createPage(products) {
      let products_length = products.length;
      console.log(products_length);
      let products_cnt = 0;
      let total = 0;
      let i = 1;

      while (products_cnt < products_length) {
        let row = null;
        if (products_cnt % 2 === 0) {
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
          if (products_cnt == products_length) break;
          let product = products[products_cnt];
          products_cnt++;
          let col = document.createElement("div");
          col.classList.add(
            "col-lg-6",
            "col-sm-12",
            "d-flex",
            "justify-content-center",
          );
          try {
            // console.log(parseInt(product.TotalPrice.split(" ")[0]));
            // total += parseInt(product.TotalPrice.split(" ")[0]);
            col.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4 d-flex justify-content-center align-items-center">
                  <img src="${product.productImg}" class="img-fluid rounded-start" style="height:80%" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">you are buying ${product.qty} ${
                      product.name
                    }s for ${product.unitPrice * product.qty}</p>
                    <button class="btn btn-dark w-100" onClick="unSelectItem('${product._id}')"> UnSelect </button>
                  </div>
                </div>
              </div>
            </div>`;
          } catch (err) {}
          row.appendChild(col);
        }
        container.appendChild(row);
      }
      console.log(total);
    }
  });
}
startpage();
function unSelectItem(item) {
  // axios
  //   .post("http://localhost:3000/api/cart/unselectItem", { pro_id: item })
  //   .then((response) => {
  //     console.log(response.data);
  //     window.location.reload();
  //   });c
  fetch("http://localhost:3000/api/cart/unselectItem", {
    method: "POST",
    body: JSON.stringify({ pro_id: item }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res.msg);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
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
