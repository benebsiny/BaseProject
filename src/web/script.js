let keywords = [];
if (localStorage.getItem('keyword') !== null) {
    let keyword = localStorage.getItem('keyword');
    if (keyword === '') keywords = [];
    else keywords = keyword.split(" ");
}

$.getJSON('../news.json', (data) => {
    for (let i = 0, k = 0; k < 10; i++){
        let filter = 0;
        for (keyword of keywords) {
            if (data[i]['title'].includes(keyword) || data[i]['content'].includes(keyword)) {
                filter = 1;
                break;
            }
        }

        if (!filter) {
            $(`#a-${k}`).attr({'href': `./${i}`});
            $(`#img-${k}`).attr({'src': data[i]['image'], 'title': data[i]['title']});
            $(`#title-${k}`).attr({'title': data[i]['title']}).text(data[i]['title']);
            k++;
        }
    }
})

$(document).on('keypress', (event) => {
    if (event.which === 13) {
        if ($('#keyword-modal').is(':visible')) {
            localStorage.setItem('keyword', $('#keyword-name').val());
        }
    }
})

$('.save-keyword-btn').on('click', ()=>{
    localStorage.setItem('keyword', $('#keyword-name').val());
    $('#keyword-modal').modal('hide');
    location.reload();
})

$('.filter-btn').on('click', ()=>{
    $('#keyword-name').val(localStorage.getItem('keyword'));
})