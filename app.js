function getWordData() { // this function will get data from the Datamuse API server via jquery AJAX request
    const word = $('#wordInputText').val();
    $.ajax({
        url: 'https://api.datamuse.com/words?rel_jja=' + word + '&max=5' // returning max 5 results
    }).then(
        (data) => {
            wordData = data;
            console.log(wordData)
            logData();
        },
        () => {
            console.log('bad request');
        }
    );
}
let wordData = {};

function logData() {
    $('.result').remove();// clears previous results.
    if (wordData.length === 0) {
        $('#relatedWordResults').append($('<li>').text('no results').addClass('result'));
    }
    for (let i = 0; i < wordData.length; i++) {
        const $resultAdded = $('<li>').text(wordData[i].word).addClass('result');
        $('#relatedWordResults').append($resultAdded);
        console.log(wordData[i].word);
    }
}

$(() => {
    $('#wordForm').on('submit', (event) => {
        event.preventDefault();
        getWordData();
    });
})