$.getJSON('../news.json', (data)=>{
    $(`#detail_title`).text(data[0]['title']);
    $(`#detail_title-1`).text(data[0]['content']);
    $(`#detail_img`).attr('src',data[0]['image']);
    $(`#source`).text(data[0]['source']);
    $(`#time`).text(data[0]['time']);
})

$('#report').on('click', function () {
    location.href = 'https://cabletvweb.ncc.gov.tw/SWSFront35/SWSF/SWSF01015.aspx'
})