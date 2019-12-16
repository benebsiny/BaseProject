$.getJSON('../news.json', (data)=>{
    for(let i=0; i<10; i++){
        $(`#img-${i}`).attr('src', data[i]['image']);
        $(`#title-${i}`).text(data[i]['title']);
    }
})
