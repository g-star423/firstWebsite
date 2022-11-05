
$(() => {
    $('#mobileNav').click((event) => {
        event.preventDefault();
        $('#mobileNavLinks').toggle(500);
    })
})