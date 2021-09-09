//replace all iso dates with formated ones
const dates = document.getElementsByClassName("date");
for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    console.log(date.innerText);
    date.innerText = moment(date.innerText).format("DD.MM.yyyy (hh:mm)");
}
