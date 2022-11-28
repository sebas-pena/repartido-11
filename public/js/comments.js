const commentsList = document.querySelector("#comments-list")
const user = JSON.parse(localStorage.getItem("user")) || null
const main = document.querySelector("main")

if (user) {

  document.querySelector(".header-user span").textContent = user.username

  const commentForm = document.createElement("form")
  commentForm.classList.add("add-comment-ctn")
  commentForm.id = "comment-form"
  commentForm.innerHTML = `
    <p id="comment__username">${user.username}</p>
    <textarea
      type="text"
      placeholder="Escribe tu comentario..."
      id="comment"
    ></textarea>
    <button>Enviar</button>
  `

  const commentEl = commentForm.querySelector("#comment")

  commentEl.addEventListener("input", () => {
    if (commentEl.value && commentEl.classList.contains("error")) {
      commentEl.classList.remove("error")
    }
  })

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if (commentEl.value) {
      commentEl.classList.remove("error")
      fetch("api/comments", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          uid: user.id,
          content: commentEl.value
        })
      })
        .then(res => {
          if (res.ok) {
            createComment({ content: commentEl.value, ...user })
            commentEl.value = ""
          }
        })

    } else {
      commentEl.classList.add("error")
    }
  })
  main.prepend(commentForm)
} else {
  const loginMessage = document.createElement("p")
  loginMessage.classList.add("login-message")
  loginMessage.textContent = "Inicia sesión para enviar un comentario"
  main.prepend(loginMessage)
}

// Recupera los comentarios en la api y los renderiza

fetch("/api/comments")
  .then(res => res.json())
  .then(comments => {
    comments.forEach(comment => {
      createComment({ content: comment.content, username: comment.uid.username, id: comment._id })
    })
  })


// Funcion que recibe un comentario y lo agrega a la lista

const createComment = (comment) => {
  const commentCtn = document.createElement("li")
  commentCtn.classList.add("comment__ctn")
  commentCtn.innerHTML = `
      <p class="comment__username">${comment.username}</p>
      <p class="comment">${comment.content}</p>
      ${user.username == comment.username ?
      `<div class="comment__controls">
          <button class="comment__edit">Editar</button>
          <button class="comment__delete">Eliminar</button>
        </div>` : ""
    }
      `
  if (user.username == comment.username) {
    const editBtn = commentCtn.querySelector(".comment__edit")
    let editable = false
    const commentEl = commentCtn.querySelector(".comment")
    editBtn.addEventListener("click", () => {
      commentEl.classList.toggle("input")
      if (editable == false) {
        editable = true
        editBtn.textContent = "Actualizar"
        commentEl.setAttribute("contenteditable", "true")
        commentEl.focus()
      } else {
        editable = false
        commentEl.setAttribute("contenteditable", "false")
        editBtn.textContent = "Editar"
        fetch(`api/comments/${comment.id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            content: commentEl.textContent
          })
        })
      }
    })
    commentCtn.querySelector(".comment__delete").addEventListener("click", () => {
      commentCtn.remove()
      fetch(`api/comments/${comment.id}`, {
        method: "DELETE"
      })
    })
  }
  commentsList.prepend(commentCtn)
}