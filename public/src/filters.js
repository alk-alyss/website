let choice = document.querySelectorByName('rent_sale');    
let subtype = document.querySelectorById('subtype');
let price_start = document.querySelectorById('price_from');
let price_end = document.querySelectorById('price_to');
let area_start = document.querySelectorById('area_from');
let area_end = document.querySelectorById('area_to');
let type = document.querySelectorById('type');
let location = document.querySelectorByClass('top_search');

// different filters implemented for the different types of listings
// for example, if the user is searching for a house, the subtype filter will be different than if the user is searching for land


function search() {
    let search = {
        choice: choice.value,
        subtype: subtype.value,
        price_start: price_start.value,
        price_end: price_end.value,
        area_start: area_start.value,
        area_end: area_end.value,
        type: type.value,
        location: location.value
    }
    console.log(search);
    // send search to server
    // server will return listings that match the search
    // render listings
}