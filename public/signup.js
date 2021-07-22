const form = document.querySelector('#signupForm')
const emailError = document.querySelector('.email.error')
const passwordError = document.querySelector('.password.error')


form.addEventListener('submit', async (e) => {
    e.preventDefault()

    emailError.textContent = ''
    passwordError.textContent = ''

    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch('/signup', { 
        method: 'POST', 
        body: JSON.stringify({ email, password }),
        headers: {'Content-Type': 'application/json'}
      })
      
      const result = await response.json()
      console.log(result)

      if(result.errors) {
        emailError.textContent = result.errors.email
        passwordError.textContent = result.errors.password
      }

      if(result.user) {
        location.assign('/')
      }

    } catch (err) {
      console.log(err);
    }

})