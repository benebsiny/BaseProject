if(localStorage.getItem('keyword')!==null){
    var keyword = localStorage.getItem('keyword');
    if(keyword==='') keyword = null;
}

$.getJSON('../news.json', (data)=>{
    for(let i=0, k=0; i<10; i++){
        if(!data[i]['title'].includes(keyword)){
            $(`#img-${k}`).attr({'src': data[i]['image'], 'title': data[i]['title']});
            $(`#title-${k}`).attr({'title': data[i]['title']}).text(data[i]['title']);
            k++;
        }
    }
})

$('img').on('click', function () {
    const id = $(this).attr('id').match(/img-(.*)/)[1];
    location.href = `/${id}`
})

$('h4').on('click', function (){
    const id = $(this).attr('id').match(/title-(.*)/)[1]
    location.href = `/${id}`
})

$('.save-keyword-btn').on('click', ()=>{
    localStorage.setItem('keyword', $('#keyword-name').val());
    $('#keyword-modal').modal('hide');
    location.reload();
})

$('.filter-btn').on('click', ()=>{
    $('#keyword-name').val(localStorage.getItem('keyword'));
})