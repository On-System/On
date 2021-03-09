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

let main_webcam = document.querySelector('.main-webcam__video');
let show_other_webcam = document.querySelector('.show-other-webcam');
let all_webcams = document.querySelectorAll('video');

let right_section = document.querySelector('.right-section');

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
// -------------- AND LOAD ALL WEBCAMS IN PAGE ------------
window.addEventListener('load', () => {
    loadUser(users);
    setWebcamLayout();
    document.getElementById('btnClosePoll').click();
});

// +++++ OPEN OR CLOSE OPTIONS +++++++
toggleOptions();

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
    sendMessage(txt_send_message.value);
    txt_send_message.value = '';
});
txt_send_message.addEventListener('keydown', (e) => {
    if(e.keyCode == 13){
        e.preventDefault();
        btn_send_message.click();
    }
});

// +++++++++++++++ SEARCH USERS ++++++++++++
txt_search_user.addEventListener('input', () => {
    searchUser(users, txt_search_user.value);
});

// +++++++++++++++ CLOSE OR OPEN SIDEBAR +++++++++++
document.getElementById('btnOpenSidebar').addEventListener('click', () => {
    right_section.style.display = 'block';
    right_section.style.animation = 'showSidebar 0.5s';
});
document.getElementById('btnCloseSidebar').addEventListener('click', () => {
    right_section.style.display = 'none';
});

/////////////////////////////// FUNCTIONS ///////////////////////////////////
function toggleOptions(){
    button_open_option.forEach(menuButton => {
        menuButton.addEventListener('click', () => {
            if(!menuButton.nextElementSibling.classList.contains('open'))
                menuButton.nextElementSibling.classList.add('open');
            else
                menuButton.nextElementSibling.classList.remove('open');
        });
    });
}

function scrollToDownChat(){
    chat_section.scrollTo(0, chat_section.scrollHeight);
}

function sendMessage (inputMessage){
    if(inputMessage != '' || inputMessage != undefined)
        chat_section.insertAdjacentHTML('beforeend', `<div class="message-right"><div class="message"><p class="message-text">${inputMessage}</p></div></div>`);
    inputMessage = ' ';
    scrollToDownChat();
}

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

function searchUser (allUsers, serachInput){
    user_list_section.querySelectorAll('.user-item').forEach(userListItems => {
        userListItems.remove();
    });
    allUsers.forEach(userItem => {
        let search = userItem.name.toLowerCase();
        let inputValue = serachInput.toLowerCase();
        if(search.indexOf(inputValue) > -1){
            if(userItem.token != ''){
                if(userItem.image_avatar === undefined){
                    user_list_section.insertAdjacentHTML('beforeend', `<div class="user-item"><div class="profile"><div class="avatar" style="background-color: #FFDEDE;"><p class="first-letter">${userItem.name[0]}</p></div><h6 class="username">${userItem.name}</h6></div> <button class="button-icon"> <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24"> <path id="bx-dots-vertical-rounded" d="M18,15a3,3,0,1,0,3,3A3.009,3.009,0,0,0,18,15Zm0-9a3,3,0,1,0,3,3A3.009,3.009,0,0,0,18,6Zm0,18a3,3,0,1,0,3,3A3.009,3.009,0,0,0,18,24Z" transform="translate(-15 -6)" fill="#202020" /> </svg> </button></div>`)
                }
                else{
                    user_list_section.insertAdjacentHTML('beforeend', `<div class="user-item"><div class="profile"><div class="avatar"> <img src="${userItem.image_avatar}" alt=""></div><h6 class="username">${userItem.name}</h6></div> <button class="button-icon"> <svg xmlns="http://www.w3.org/2000/svg" width="6" height="24" viewBox="0 0 6 24"> <path id="bx-dots-vertical-rounded" d="M18,15a3,3,0,1,0,3,3A3.009,3.009,0,0,0,18,15Zm0-9a3,3,0,1,0,3,3A3.009,3.009,0,0,0,18,6Zm0,18a3,3,0,1,0,3,3A3.009,3.009,0,0,0,18,24Z" transform="translate(-15 -6)" fill="#202020" /> </svg> </button></div>`)
                }
            }
        }
    });
}

function addFakeWebcam(image) {
    if(image === undefined)
        image = 'design/webcam1.jpg';

    show_other_webcam.insertAdjacentHTML('beforeend', `<div class="other-webcam-item"> <video class="other-webcam__video" poster=${image}></video> <p class="webcam-name">Loren Spears</p></div>`)
}

function setWebcamLayout(){
    // mobile size
    if(all_webcams.length > 3 && window.innerWidth <= 540){
        show_other_webcam.insertAdjacentHTML('beforeend', `<div class="other-webcam-item"> <video class="other-webcam__video" poster=${main_webcam.getAttribute('poster')}></video> <p class="webcam-name">Loren Spears</p></div>`);
        main_webcam.remove();
    }
    else if(all_webcams.length <= 3 && window.innerWidth <= 540 && document.querySelector('.main-webcam__video') == null) {
        document.querySelector('.main-webinar').insertAdjacentHTML('afterbegin', `<video class="main-webcam__video" poster=${main_webcam.getAttribute('poster')}></video>`);
    }

    //tablet or fablet size
    if(all_webcams.length > 5 && (window.innerWidth > 540 && window.innerWidth <= 768)){
        show_other_webcam.insertAdjacentHTML('beforeend', `<div class="other-webcam-item"> <video class="other-webcam__video" poster=${main_webcam.getAttribute('poster')}></video> <p class="webcam-name">Loren Spears</p></div>`);
        main_webcam.remove();
    }
    else if(all_webcams.length <= 5 && (window.innerWidth > 540 && window.innerWidth <= 768) && document.querySelector('.main-webcam__video') == null) {
        document.querySelector('.main-webinar').insertAdjacentHTML('afterbegin', `<video class="main-webcam__video" poster=${main_webcam.getAttribute('poster')}></video>`);
    }

    // laptop or desctop size
    if(all_webcams.length > 8 && window.innerWidth > 768){
        show_other_webcam.insertAdjacentHTML('beforeend', `<div class="other-webcam-item"> <video class="other-webcam__video" poster=${main_webcam.getAttribute('poster')}></video> <p class="webcam-name">Loren Spears</p></div>`);
        main_webcam.remove();
    }
    else if(all_webcams.length <= 8 && window.innerWidth > 768 && document.querySelector('.main-webcam__video') == null) {
        document.querySelector('.main-webinar').insertAdjacentHTML('afterbegin', `<video class="main-webcam__video" poster=${main_webcam.getAttribute('poster')}></video>`);
    }
}
