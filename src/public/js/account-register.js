const registerForm = document.getElementById("accountRegister");
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const fullname = document.getElementById("fname").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const data = JSON.stringify({
    username, fullname, phone, password
  });
  try {
    const response = await fetch('/account-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: data,
    });
    if(response.status == 200) {
      window.location.href = '/';
    }
    else {
      alert("Đăng ký thất bại! " + await response.text());
    }
  } catch (error) {
    console.log(error);
  }
})