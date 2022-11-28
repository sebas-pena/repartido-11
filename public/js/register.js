document.querySelector("#register-form").addEventListener("submit", e => {
  e.preventDefault()
  const password = document.querySelector("#password").value
  const email = document.querySelector("#email").value
  const username = document.querySelector("#username").value
  fetch("/api/user/register", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      password,
      email,
      username
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject()
      }
    })
    .then(data => {
      localStorage.setItem("user", JSON.stringify(data))
      location.href = "/comments"
    })
    .catch(e => {
      console.log("F")
    })
})