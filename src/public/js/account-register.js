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
  const url = 'http://127.0.0.1:3000/account-register';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: data,
    });
    if(response.status == 200) {
      alert("Đăng ký tài khoản thành công!");
      r
    }
    else {
      alert("Đăng ký thất bại!");
    }
  } catch (error) {
    console.log(error);
  }
})