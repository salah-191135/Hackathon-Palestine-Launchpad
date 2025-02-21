// import '../styles/login-style.scss';
// import '../styles/resets.scss';

// alert("i am working");

function hideForm(event) {
    console.log('signin to register');

    event.preventDefault();
    document.getElementById('SigninForm').classList.toggle('show');
    document.getElementById('RegisterForm').classList.toggle('show');
}

document.getElementById('toggleForm').addEventListener('click', hideForm);


// register form validation
document.addEventListener('DOMContentLoaded', function () {
    const RegisterForm = document.querySelector('#RegisterForm');
    const form = document.querySelector('#RegisterForm form');
    const submitButton = document.querySelector('#RegisterForm a');

    let errorContainer = document.createElement('div');
    errorContainer.className = 'error-messages';
    RegisterForm.appendChild(errorContainer);

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        errorContainer.innerHTML = '';

        let errors = [];

        // Retrieve form field values
        const username = form.elements['user-name'].value.trim();
        const email = form.elements['email'].value.trim();
        // For password fields that have no names, use querySelectorAll
        const passwordInputs = form.querySelectorAll('input[type="password"]');
        let password = '', confirmPassword = '';
        if (passwordInputs.length >= 2) {
            password = passwordInputs[0].value;
            confirmPassword = passwordInputs[1].value;
        }
        const yob = form.elements['yob'].value;
        const gender = form.elements['gender'].value;
        const degree = form.elements['degree'].value;
        const interest = form.elements['interest'].value;

        if (!username) {
            errors.push("User Name is required.");
        }
        if (!email) {
            errors.push("Email is required.");
        } else {
            const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailPattern.test(email)) {
                errors.push("Please enter a valid email address.");
            }
        }
        if (!password || !confirmPassword) {
            errors.push("Both password fields are required.");
        } else if (password !== confirmPassword) {
            errors.push("Passwords do not match.");
        }
        if (!yob) {
            errors.push("Year of birth is required.");
        } else {
            const year = parseInt(yob, 10);
            if (year < 1970 || year > 2011) {
                errors.push("Year of birth must be between 1970 and 2011.");
            }
        }
        if (!gender || gender === "Select") {
            errors.push("Gender is required.");
        }
        if (!degree || degree === "Select") {
            errors.push("Degree selection is required.");
        }
        if (!interest || interest === "Select") {
            errors.push("Interest/Degree topic is required.");
        }

        if (errors.length > 0) {
            errors.forEach(function (err) {
                let errMsg = document.createElement('div');
                errMsg.textContent = err;
                errMsg.style.color = "red";
                errorContainer.appendChild(errMsg);
            });
        } else {
            const formData = {
                username: username,
                email: email,
                password: password,
                yob: yob,
                gender: gender,
                degree: degree,
                interest: interest
            };
            console.log('Form data:', formData);

            // Send data to the server as JSON
            fetch('/submit-registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            }).then(data => {
                console.log('Success:', data);
                window.location.href = '/dashboard';
            }).catch(error => {
                console.error('Error:', error);
                let errMsg = document.createElement('p');
                errMsg.textContent = "An error occurred while submitting the form.";
                errMsg.style.color = "red";
                errorContainer.appendChild(errMsg);
            });

        }
    });
});

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

// signin form validation
document.addEventListener('DOMContentLoaded', function () {
    // Get the Signin form and the "Signin" button (the anchor link)
    const signinForm = document.querySelector('#SigninForm form');
    const signinButton = document.querySelector('#SigninForm a.button');

    // Create an error container for validation messages
    let errorContainer = document.createElement('div');
    errorContainer.className = 'error-messages';
    signinForm.prepend(errorContainer);

    signinButton.addEventListener('click', function (event) {
        event.preventDefault();
        errorContainer.innerHTML = '';

        let errors = [];
        const email = signinForm.elements['email'].value.trim();
        const passwordField = signinForm.querySelector('input[type="password"]');
        const password = passwordField ? passwordField.value : '';

        if (!email) {
            errors.push("Email is required.");
        } else {
            const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailPattern.test(email)) {
                errors.push("Please enter a valid email address.");
            }
        }

        if (!password) {
            errors.push("Password is required.");
        }

        if (errors.length > 0) {
            errors.forEach(function (err) {
                let errMsg = document.createElement('p');
                errMsg.textContent = err;
                errMsg.style.color = "red";
                errorContainer.appendChild(errMsg);
            });
        } else {
            const signinData = {
                email: email,
                password: password
            };

            fetch('/submit-signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signinData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Signin successful:', data);
                    window.location.href = '/dashboard';
                })
                .catch(error => {
                    console.error('Error during signin:', error);
                    let errMsg = document.createElement('p');
                    errMsg.textContent = "An error occurred while signing in. Please try again.";
                    errMsg.style.color = "red";
                    errorContainer.appendChild(errMsg);
                });
        }
    });
});