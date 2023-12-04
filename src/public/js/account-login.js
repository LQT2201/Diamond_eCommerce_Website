const loginForm = document.getElementById("accountLogin");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const data = JSON.stringify({
    username, password
  });
  try {
    const response = await fetch('/account-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: data,
    });
    if(response.status == 201) {
      window.location.href = '/admin/order';
    }
    else {
      alert("Đăng nhập thất bại!");
    }
  } catch (error) {
    console.log(error);
  }
})