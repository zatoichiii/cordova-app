document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  if (!form) return;

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const rememberMe = document.getElementById("rememberMe");
  console.log()

  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");

  const usernameIcon = document.querySelector("#username + .error-icon");
  const passwordIcon = document.querySelector("#password + .error-icon");


  form.addEventListener("submit", function (e) {
    e.preventDefault();



    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const rememberMeChecked = rememberMe.checked;

    let isValid = true;

    if (isValid) {
      if (rememberMeChecked) {
        localStorage.setItem("savedUser", username);
        localStorage.setItem("savedPass", password);
      } else {
        sessionStorage.setItem("savedUser", username);
        sessionStorage.setItem("savedPass", password);
      }
      window.location.href = "home.html";
    }
  });
});