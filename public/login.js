const form = document.querySelector("#loginForm")
    form.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = form.email.value
    const password = form.password.value

    console.log(email, password)
})