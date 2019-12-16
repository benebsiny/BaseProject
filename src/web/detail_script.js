$.getJSON('../news.json', (data)=>{
    $(`#detail_title`).text(data[0]['title']);
    $(`#detail_title-1`).text(data[0]['content']);
})