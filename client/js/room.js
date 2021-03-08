// VARIABLES
let button_open_option = document.querySelectorAll('#btnOpenOption');

let close_userSection = document.getElementById('btnCloseUserSection');
let open_userSection = document.getElementById('btnOpenUserSection');

let user_section = document.querySelector('.user-section');
let user_list_section = document.querySelector('.user-section .user-list');
let txt_search_user = document.querySelector('.user-section .search-user input');
let btn_search_user = document.querySelector('.user-section .search-user button');

let pull_section = document.querySelector('.poll-section');
let chat_section = document.querySelector('.chat-section');
let send_message_form = document.querySelector('.send-message');
let btn_send_message = document.querySelector('.send-message button');
let txt_send_message = document.querySelector('.send-message input');

let users = [
    {
        token: 'USER1-TOKEN',
        name: 'Nickolas Toe',
        image_avatar: undefined,
        microphone: false,
        listener: true,
        presenter: false
    },{
        token: 'USER2-TOKEN',
        name: 'Brian Smith',
        image_avatar: 'design/Brian Smith.jpg',
        microphone: true,
        listener: true,
        presenter: true
    },{
        token: 'USER3-TOKEN',
        name: 'Loren Spears',
        image_avatar: 'design/Loren Spears.jpg',
        microphone: true,
        listener: true,
        presenter: false
    },{
        token: 'USER4-TOKEN',
        name: 'David Spark',
        image_avatar: undefined,
        microphone: false,
        listener: true,
        presenter: false
    },{
        token: 'USER5-TOKEN',
        name: 'Kaya Scodelario',
        image_avatar: 'design/Kaya Scodelario.jpg',
        microphone: true,
        listener: true,
        presenter: false
    }
];

// ++++++++++++++++ WHEN WINDOW ARE LOADED :) ++++++++++++++++++
// -------------- LOAD ALL USER TO USER SECTION ------------
window.addEventListener('load', () => {
    loadUser(users);
});

// +++++ OPEN OR CLOSE OPTIONS +++++++
button_open_option.forEach(menuButton => {
    menuButton.addEventListener('click', () => {
        if(!menuButton.nextElementSibling.classList.contains('open'))
            menuButton.nextElementSibling.classList.add('open');
        else
            menuButton.nextElementSibling.classList.remove('open');
    });
});

// ++++++++++++ OPEN OR CLOSE USER SECTION (SIDEBAR) ++++++
close_userSection.addEventListener('click', () => {
    user_section.classList.remove('open');
});
open_userSection.addEventListener('click', () => {
    user_section.classList.add('open');
});

// +++++++++ CLOSE POLL PAGE AND RESIZE CHAT SECTION HEIGHT ++++++++
document.getElementById('btnClosePoll').addEventListener('click', () => {
    pull_section.style.display = 'none';
    chat_section.style.height = '';
});

// +++++++++++++ SEND MESSAGE +++++++++++++
btn_send_message.addEventListener('click', (e) => {
    e.preventDefault();
    if(txt_send_message.value != '')
        chat_section.insertAdjacentHTML('beforeend', `<div class="message-right"><div class="message"><p class="message-text">${txt_send_message.value}</p></div></div>`);
});

// +++++++++++++++ SEARCH USERS ++++++++++++
txt_search_user.addEventListener('input', () => {
    users.forEach(userItem => {
        let search = userItem.name.toUpperCase();
        let inputValue = txt_search_user.value;
        let userSerched = [];
        if(search.indexOf(inputValue) == -1){
            userSerched.push(userItem);
        }
        console.log(userSerched);
    });
});

///////////////// FUNCTIONS ///////////////
function loadUser (allUsers){
    allUsers.forEach(userItem => {
        if(userItem.token != ''){
            if(userItem.image_avatar === undefined){
                user_list_section.insertAdjacentHTML('beforeend', `<div class="user-item"><div class="profile"><div class="avatar" style="background-color: #FFDEDE;"><p class="first-letter">${userItem.name[0]}</p></div><h6 class="username">${userItem.name}</h6></div> <button class="button-icon"> <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24"> <path id="bx-dots-vertical-rounded" d="M18,15a3,3,0,1,0,3,3A3.009,3.009,0,0,0,18,15Zm0-9a3,3,0,1,0,3,3A3.009,3.009,0,0,0,18,6Zm0,18a3,3,0,1,0,3,3A3.009,3.009,0,0,0,18,24Z" transform="translate(-15 -6)" fill="#202020" /> </svg> </button></div>`)
            }
            else{
                user_list_section.insertAdjacentHTML('beforeend', `<div class="user-item"><div class="profile"><div class="avatar"> <img src="${userItem.image_avatar}" alt=""></div><h6 class="username">${userItem.name}</h6></div> <button class="button-icon"> <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24"> <path id="bx-dots-vertical-rounded" d="M18,15a3,3,0,1,0,3,3A3.009,3.009,0,0,0,18,15Zm0-9a3,3,0,1,0,3,3A3.009,3.009,0,0,0,18,6Zm0,18a3,3,0,1,0,3,3A3.009,3.009,0,0,0,18,24Z" transform="translate(-15 -6)" fill="#202020" /> </svg> </button></div>`)
            }
        }
    });
}
