const registerPage = document.querySelector('.register-page')
const successedPage = document.querySelector('.successed-page')

if (registerPage) {
    document.addEventListener('DOMContentLoaded', () => {
        const usernameInput = document.querySelector('.username-input')
        const emailInput = document.querySelector('.email-input')
        const passwordInput = document.querySelector('.password-input')
        const cPasswordInput = document.querySelector('.cPassword-input')
        const userForm = document.querySelector('.user-form')
        const submitBtn = document.querySelector('.form-btn')
        const usernameError = document.querySelector('.username-error')
        const emailError = document.querySelector('.email-error')
        const passwordError = document.querySelector('.password-error')
        const cPasswordError = document.querySelector('.cPassword-error')
        const formError = document.querySelector('.form-error')
        const usernameRegex = /^[^0-9][a-zA-Z0-9]{3,13}[^0-9]$/
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/
        let username, email, password, password_confirmation;

        const setFormValues = () => {
            usernameInput.addEventListener('keyup', (e) => {
                if (usernameRegex.test(e.target.value)) {
                    username = e.target.value
                    usernameError.textContent = ''
                } else {
                    usernameError.textContent = `Username must consist of 5 to 15 characters, only letters and numbers are allowed`
                }
            })
            emailInput.addEventListener('keyup', (e) => {
                if (emailRegex.test(e.target.value)) {
                    email = e.target.value
                    emailError.textContent = ''
                } else {
                    emailError.textContent = 'Please Enter A Valid Email'
                }
            })
            passwordInput.addEventListener('keyup', (e) => {
                if (passwordRegex.test(e.target.value)) {
                    password = e.target.value
                    passwordError.textContent = ''
                } else {
                    passwordError.textContent = 'Password must be at least 8 characters contains one uppercase letter, one special character, one number'
                }
            })
            cPasswordInput.addEventListener('keyup', (e) => {
                if (passwordRegex.test(e.target.value)) {
                    if (e.target.value !== password) {
                        cPasswordError.textContent = 'Passwords must match'
                    } else {
                        password_confirmation = e.target.value
                        cPasswordError.textContent = ''
                    }
                } else {
                    cPasswordError.textContent = 'Password must be at least 8 characters contains one uppercase letter, one special character, one number'
                }
            })
        }

        const postRequest = async(url, data = {}) => {
            const myHeaders = new Headers()
            myHeaders.append('content-type', 'application/json')
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                body: JSON.stringify(data)
            })
            const content = await response.json()
            return content  
        }

        const submitForm = async () => {
            if (!username || !email || !password || !password_confirmation) {
                formError.textContent = 'invalid form'
            } else {
                postRequest('https://goldblv.com/api/hiring/tasks/register', {
                    username,
                    email,
                    password,
                    password_confirmation
                }).then((res) => {
                    if(res.message){
                        passwordError.textContent = res.errors.password[0]
                    }else{
                        localStorage.setItem('userInfo', JSON.stringify(res))
                        const url = new URL('', 'https://mahmoudgomaa167.github.io/valentica-task/')
                        window.location.replace(`${url}successed.html`)
                    }
                })
            }
        }

        submitBtn.addEventListener('click', (e) => {
            e.preventDefault()
            submitForm()
        })
        setFormValues()
    })
}

if(successedPage){
    document.addEventListener('DOMContentLoaded', () => {
        const userEmail = document.querySelector('.user-email')
        const data = JSON.parse(localStorage.getItem('userInfo'))
        userEmail.textContent = data.email
    })
}
