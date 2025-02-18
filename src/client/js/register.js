import '../styles/login-style.scss';
// alert("i am working");

function hideForm(event) {
    event.preventDefault();
    document.getElementById('SigninForm').classList.toggle('show');
    document.getElementById('RegisterForm').classList.toggle('show');
}

document.getElementById('toggleForm').addEventListener('click', hideForm);