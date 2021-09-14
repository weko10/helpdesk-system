const flash = document.getElementsByClassName("flash");

const pagePath = window.location.pathname;
const ticketId = pagePath.slice(18); //warning: bad practice

//replace all iso dates with formated ones
const dates = document.getElementsByClassName("date");
for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    date.innerText = moment(date.innerText).format("DD.MM.yyyy (hh:mm)");
}

//fetch all ticket messages from api
const fetchMessages = () => {
    let result;

    const xhr = new XMLHttpRequest();
    const url = `http://localhost:3000/api/ticket/${ticketId}/messages`;
    xhr.open("GET", url, true);

    xhr.onload = () => {
        result = JSON.parse(xhr.responseText);
    };

    xhr.onerror = () => {
        flash.innerText = xhr.response;
    };

    xhr.send();

    return result;
};

//append ticket messages
const appendMessages = () => {};
