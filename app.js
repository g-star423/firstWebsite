console.log('testing')

// $.ajax({
//     url:'https://api.datamuse.com/words?rel_jja=yellow&max=4'
// }).then(
//     (data)=>{
//     console.log(data);
// },
// ()=>{
//     console.log('bad request');
// });

function getWordData(){
    const word = $('#wordInputText').val();
    $.ajax({
        url:'https://api.datamuse.com/words?rel_jja=' + word + '&max=5'
    }).then(
        (data)=> {
            wordData = data;
            console.log(wordData)
            logData();
        },
        ()=> {
            console.log('bad request');
        }
    );
}
let wordData = {};

function logData() {
    $('.result').remove();// clears previous results.
    if (wordData.length === 0){
        $('#relatedWordResults').append($('<li>').text('no results').addClass('result'));
    }
    for (let i = 0; i < wordData.length; i++){
        const $resultAdded = $('<li>').text(wordData[i].word).addClass('result');
        $('#relatedWordResults').append($resultAdded);
        console.log(wordData[i].word);
    }
}

$(()=>{
    $('#wordForm').on('submit', (event)=>{
        event.preventDefault();
        getWordData();
    });
})