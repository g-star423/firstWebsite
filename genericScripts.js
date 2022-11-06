
$(() => {
    $('#mobileNav').click((event) => {// this script is called on every page to make the mobile menu work.
        event.preventDefault();
        $('#mobileNavLinks').toggle(500);
    })
})