const form = document.getElementById("register");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("message");

    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01[0125][0-9]{8}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    // check username
    if (!usernameRegex.test(username)) {
        message.style.color = "red";
        message.innerText = "Username must be 3-15 letters or numbers";
        return;
    }
    // check email
    if (!emailRegex.test(email)) {
        message.style.color = "red";
        message.innerText = "Enter a valid email";
        return;
    }
    // check phone number
    if (!phoneRegex.test(phone)) {
        message.style.color = "red";
        message.innerText = "Enter a valid phone number";
        return;
    }
    // check password
    if (!passwordRegex.test(password)) {
        message.style.color = "red";
        message.innerText =
            "Password must contain uppercase, lowercase, number and symbol";
        return;
    }
    // check confirmpassword
    if (password !== confirmPassword) {
        message.style.color = "red";
        message.innerText = "Passwords do not match";
        return;
    }

    // save user data in localstorage
    const user = { username, email, phone, password };

    localStorage.setItem("user", JSON.stringify(user));

    message.style.color = "green";
    message.innerText = "Account created successfully";

    form.reset();

});