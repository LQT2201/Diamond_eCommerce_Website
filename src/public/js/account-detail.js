
    document.addEventListener('DOMContentLoaded', function () {
        var fixpassCheckbox = document.getElementById('fixpass');
        var showChangePassSection = document.querySelector('.show-change-pass');

        // Initial check for the checkbox state
        toggleChangePassSection();

        // Add event listener for checkbox change
        fixpassCheckbox.addEventListener('change', function () {
            toggleChangePassSection();
        });

        // Function to toggle the display of the password change section
        function toggleChangePassSection() {
            if (fixpassCheckbox.checked) {
                showChangePassSection.style.display = 'block';
            } else {
                showChangePassSection.style.display = 'none';
            }
        }
    });