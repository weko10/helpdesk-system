const message = document.querySelector("textarea#message");

message.addEventListener("keyup", () => {
    document.getElementById("char_count").innerHTML = message.value.length + "/1000";
});
