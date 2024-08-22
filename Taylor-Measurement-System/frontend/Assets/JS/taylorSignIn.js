const signInForm = document.querySelector('.signIn-form')

signInForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const api = 'http://localhost:5000/api/v1/taylors/SignIn';
    const shopName = document.querySelector('#shopName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if ( !shopName || !email || !password) {
        alert('All fields are required. in frontend')
        return;
    }

    const response = await fetch(api,
         { 

            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ shopName, email, password })

         })

    const data = await response.json();
    
    alert(data.message)
})