// let alert = document.querySelector(".like_alert");
// alert.style.opacity = "0";

// let close = alert.querySelector(".close");
// close.addEventListener("click", function() {
//     alert.style.opacity = "0";
// });

let hearts = document.querySelectorAll('.like');

hearts.forEach(heart => {
    let id = heart.id
    heart.addEventListener('click', async (event) => {
        event.preventDefault()

        let result = await fetch(`/listing/${id}/heart`, {
            method: "POST",
            mode: "same-origin",
            referrerPolicy: "same-origin"
        })

        if (!result.redirected) {
            heart.checked = !heart.checked
        } else {
            window.alert("Πρέπει να συνδεθείτε πρώτα!")
            // alert.querySelector(".message").innerHTML = "Πρέπει να συνδεθείτε πρώτα!";
            // // setTimeout(function() {
            //     alert.style.opacity = "1";
            // // }, 2000);
        }
    });
});