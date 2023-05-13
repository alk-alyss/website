
let icon = document.querySelector(".button_login");
let button = document.querySelectorAll(".icon_pressed")

button[0].classList.remove("active");
button[1].classList.remove("active");

//function that turns the signed in div on and the not signed in div off
function signed_in() {
    button[0].classList.remove("active");
    button[1].classList.add("active");
}

//function that turns the signed in div off and the not signed in div on
function not_signed_in() {
    button[0].classList.add("active");
    button[1].classList.remove("active");
}

function close_sign() {
    button[0].classList.remove("active");
    button[1].classList.remove("active");
}

icon.addEventListener("click", function() {

    if (button[0].classList.contains("active") || button[1].classList.contains("active")) {
        close_sign();
    }
    else {
        //if signed in
        signed_in();
        //if not signed in
        // not_signed_in();
    }

});