document.addEventListener('DOMContentLoaded', function () {
    var fixpassCheckbox = document.getElementById('fixpass');
    var submitInformation = document.getElementById('send-infor');
    
    var showChangePassSection = document.querySelector('.show-change-pass');
    // Initial check for the checkbox state
    toggleChangePassSection();

    // Add event listener for checkbox change
    fixpassCheckbox.addEventListener('change', function () {
        toggleChangePassSection();
    });
    submitInformation.addEventListener('submit', async (form) =>{
        form.preventDefault();
        const data = new FormData(submitInformation);
        try {
            const response = await fetch('/change-information', {
              method: 'POST',
              body: data,
            });
            if(response.status == 200) {
              window.location.href = '/account';
            }
            else {
              alert(await response.text());
            }
          } catch (error) {
            console.log(error);
          }
    })
    // Function to toggle the display of the password change section
    function toggleChangePassSection() {
        if (fixpassCheckbox.checked) {
            showChangePassSection.style.display = 'block';
        } else {
            showChangePassSection.style.display = 'none';
        }
    }
});

