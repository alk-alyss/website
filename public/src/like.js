let hearts = document.querySelectorAll('.like');

hearts.forEach(item => { 
    let id = item.id
    item.addEventListener('click', async (event) => {
        event.preventDefault()

        let result = await fetch(`/listing/${id}/heart`, {
            method: "POST",
            mode: "same-origin",
            referrerPolicy: "same-origin"
        })

        if (!result.redirected) {
            item.checked = !item.checked
        }
    });
});

