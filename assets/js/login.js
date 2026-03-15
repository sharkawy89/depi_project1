const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const title = document.getElementById("title");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

function getLoginMessageElement() {
	let message = document.getElementById("loginMessage");
	if (!message) {
		message = document.createElement("p");
		message.id = "loginMessage";
		const button = loginForm.querySelector("button[type='submit']");
		button.insertAdjacentElement("beforebegin", message);
	}
	return message;
}

function setLoginMessage(text, isError) {
	const message = getLoginMessageElement();
	message.innerText = text;
	message.style.color = isError ? "red" : "green";
}

function showRegister() {
	loginForm.style.display = "none";
	registerForm.style.display = "block";
	title.innerText = "Register";
	setLoginMessage("", true);
}

function showLogin() {
	registerForm.style.display = "none";
	loginForm.style.display = "block";
	title.innerText = "Login";
}

loginForm.addEventListener("submit", function (e) {
	e.preventDefault();

	const email = document.getElementById("lEmail").value.trim();
	const password = document.getElementById("lPassword").value;
	const user = JSON.parse(localStorage.getItem("user"));

	if (!emailRegex.test(email)) {
		setLoginMessage("Enter a valid email", true);
		return;
	}

	if (!passwordRegex.test(password)) {
		setLoginMessage(
			"Password must contain uppercase, lowercase, number and symbol",
			true
		);
		return;
	}

	if (!user) {
		setLoginMessage("No account found. Please register first.", true);
		return;
	}

	if (user.email !== email || user.password !== password) {
		setLoginMessage("Email or password is incorrect", true);
		return;
	}

	setLoginMessage("Login successful", false);
	localStorage.setItem("isLoggedIn", "true");
	setTimeout(function () {
		window.location.href = "index.html";
	}, 500);
});
