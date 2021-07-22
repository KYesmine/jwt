const form = document.querySelector("#loginForm")
const emailError = document.querySelector('.email.error')
const passwordError = document.querySelector('.password.error')

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    emailError.textContent = ''
    passwordError.textContent = ''

    const email = form.email.value
    const password = form.password.value

    const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const result = await response.json()
    
    if(result.errors) {
        emailError.textContent = result.errors.email
        passwordError.textContent = result.errors.password
    }

    // if(result.user) {
    //     location.assign('/')
    // }

    console.log(result)
})