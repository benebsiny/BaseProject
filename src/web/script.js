$.getJSON('../news.json', (data)=>{
    for(let i=0; i<10; i++){
        $(`#img-${i}`).attr('src', data[i]['image']);
        $(`#title-${i}`).text(data[i]['title']);
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
