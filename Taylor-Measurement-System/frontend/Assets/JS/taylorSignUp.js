const signUpForm = document.querySelector('.signUp-form')

signUpForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const api = 'http://localhost:5000/api/v1/taylors/SignUp';
    const name = document.querySelector('#name').value;
    const shopName = document.querySelector('#shopName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    
    if (!name || !shopName || !email || !password) {
        alert('All fields are required. in frontend')
        return;
    }

    try {
        const reponse = await fetch(api,
            {
                method: 'POST',
                headers : { 'Content-Type': 'application/json' } ,
                body: JSON.stringify
                    (
                        { name, shopName, email, password }
                    ),
            }
        );

        const data = await reponse.json()

        alert(data.message)


    } catch (error) {
        console.error("Fetching error:", error)
        alert('An error occured. Please check your network and try again.')
    }

})