const formEl = document.getElementById("pro-form");
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const formdat = new FormData(formEl); //always have the name property in the form input parameters if you are to use this
  const product = Object.fromEntries(formdat);
  console.log(product);
  fetch("http://localhost:3000/api/add", {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      if (res.msg == "ok") {
        alert("data submitted successfully");
        window.location.reload();
      } else {
        // document.getElementById("err").style.display = "block";
        console.log(res.msg);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
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
