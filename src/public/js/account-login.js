const loginForm = document.getElementById("accountLogin");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const data = JSON.stringify({
    username, password
  });
  const url = 'http://127.0.0.1:3000/account-login';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: data,
    });
    if(response.status == 201) {
      alert("Đăng nhập tài khoản thành công!");
    }
    else {
      alert("Đăng nhập thất bại!");
    }
  } catch (error) {
    console.log(error);
  }
})