const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const signBtn = document.getElementById("signBtn")

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

const signForm = document.getElementById("signform");

signForm.addEventListener("submit", (e) => {
    signBtn.disabled = true;
})