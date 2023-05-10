

let items = document.querySelectorAll('.like');

items.forEach(item => { 
    item.addEventListener('click', function() {

        // check if signed in
        // if not signed in, redirect to sign in page
        // else, add to users liked list
        
        if (item.checked) {
        }
    });
});