const loginForm = document.getElementById("accountLogin");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const data = JSON.stringify({
    username, password
  });
  const url = 'http://127.0.0.1:3000/';
  try {
    const response = await fetch(url + 'account-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: data,
    });
    if(response.status == 201) {
      window.location.href = url;
    }
    else {
      alert("Đăng nhập thất bại!");
    }
  } catch (error) {
    console.log(error);
  }
})