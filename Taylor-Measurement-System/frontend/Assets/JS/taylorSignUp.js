const signUpForm = document.querySelector('.signUp-form')
console.log(signUpForm);
signUpForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const api = 'http://localhost:5000/api/v1/taylors/SignUp';
    const name = document.querySelector('#name').value;
    const shopName = document.querySelector('#shopName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    
    console.log(name, email, shopName, password);

    fetch(api,
        {
            method: 'POST',
            body: JSON.stringify
                (
                    { name, shopName, email, password }
                ),
        }
    ).then((res) => res.json())
    .then((data) => {
        alert(data.message)

    }).catch((err) => console.log(err))

})