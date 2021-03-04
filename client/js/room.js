// +++++ OPEN OR CLOSE OPTIONS +++++++
let button_open_option = document.querySelectorAll('#btnOpenOption');

button_open_option.forEach(menuButton => {
    menuButton.addEventListener('click', () => {
        if(!menuButton.nextElementSibling.classList.contains('open'))
            menuButton.nextElementSibling.classList.add('open');
        else
            menuButton.nextElementSibling.classList.remove('open');

    });
});



// ++++++++++++ OPEN OR CLOSE USER SECTION (SIDEBAR) ++++++
let close_userSection = document.getElementById('btnCloseUserSection');
let open_userSection = document.getElementById('btnOpenUserSection');
let user_section = document.querySelector('.user-section');

close_userSection.addEventListener('click', () => {
    user_section.classList.remove('open');
});
open_userSection.addEventListener('click', () => {
    user_section.classList.add('open');
});
