
const enterForm = document.querySelector('.enter_form');
const enterFormLogin = document.querySelector('.enter_form_login');
const waitingRoomScreen = document.querySelector(".waiting_room");


enterForm.addEventListener("submit", event => {
    event.preventDefault();
    if (enterFormLogin.value === '') {
        enterFormLogin.classList.add('form_error');
    } else {
        enterFormLogin.classList.remove('form_error');
        enterForm.classList.add('hidden');
        waitingRoomScreen.classList.remove('hidden');

        let xhr = new XMLHttpRequest();
        let playerName = enterFormLogin.value;
        xhr.open('GET', 'https://skypro-rock-scissors-paper.herokuapp.com/login?login=' + playerName);
        xhr.send();

        xhr.onload = function () {
            if (xhr.status != 200) {
                alert(`Error ${xhr.status}: ${xhr.statusText}`);
            } else {
                let token = JSON.parse(xhr.response).token;
                localStorage.setItem('login', playerName);
                localStorage.setItem('token', token);

                xhr.onerror = function () {
                    alert('Request failed');
                };
            };
        };
    };
});


window.application = {
    blocks: {},
    screens: {},
    renderScreen: function(screenName) {},
    renderBlock: function(blockName, container) {},
    timers: []
  }

  let userName = localStorage.getItem('login');
  let token = localStorage.getItem('token');
  application.player = {
    name: userName,
    token: token,
  }


  function renderPlayerNames() {
    const playerName = document.querySelector(".player-name");
    const playerNames = document.querySelector(".player_names");

    playerNames.textContent = userName;
    playerName.textContent = userName;
};

renderPlayerNames();