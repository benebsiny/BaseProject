$.getJSON('../news.json', (data)=>{
    let url = location.href;
    let id = url.match(/http:\/\/127\.0\.0\.1:3000\/(.+)$/)[1]
    
    $(`#detail_title`).text(data[id]['title']);
    $(`#detail_title-1`).text(data[id]['content']);
    $(`#detail_img`).attr('src',data[id]['image']);
    $(`#source`).text(data[id]['source']);
    $(`#time`).text(data[id]['time']);
})

$('#report').on('click', function () {
    location.href = 'https://cabletvweb.ncc.gov.tw/SWSFront35/SWSF/SWSF01015.aspx'
})


