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



$('.donate-submit').on('click', ()=>{
    const cardNumber = $('.card-number').val();
    const cardissuer = $('.card-issuer').val();

    const cardname = $('.card-name').val();
    const cardphone = $('.card-phone').val();
    const cardcvc2 = $('.card-cvc2').val();
    const carddate = $('.card-date').val();
    const cardemail = $('.card-email').val();
    const cardmoney = $('.card-money').val();
    console.log(cardissuer); 
    // console.log(cardmoney);
    if(cardname !== '' && cardphone !== '' && cardcvc2!== '' && carddate !== '' && cardemail !== '' )
    {
        tel(cardphone);
        email(cardemail);
        cvc2(cardcvc2);
        let r;
        r = CardNumview(cardNumber, cardissuer);
        // console.log(tel(cardphone));
        // console.log(email(cardemail));
        // console.log(cvc2(cardcvc2));
        // console.log(test(cardNumber));
        if(r === 1)
        {
            let a;
            if(cardissuer==='American Express'){
                a = test2(cardNumber)
            }
            else{
                a = test(cardNumber);
            }
    
            if(tel(cardphone) === 1 && email(cardemail) ===1 && cvc2(cardcvc2) === 1 && a === 1)
            {
                if(cardmoney <= 500 || cardmoney == '')
                {
                    alert("成功捐款");
                }
                else
                {   
                    alert("捐款失敗-超出信用額度");
                }        
            } 
        }

  
    }
    else
    {   
        alert("警告!! 輸入資料不能為空");
    } 
})


function CardNumview(cardNumber, cardissuer)
{
    console.log('0//////////')
    if(cardNumber.length === 16 || cardNumber.length === 15)
        {
            if (cardissuer === 'Visa Card')
                if(parseInt(cardNumber / 1000000000000000 % 10) !== 4)
                {
                    $('.error-msg-cardnumber').text('輸入卡號錯誤');
                    $('.correct-msg-cardnumber').text('');
                    return -1;
                }
                else
                {
                    console.log('1//////////')
                    test(cardNumber)
                    return 1;
                }
            else if(cardissuer === 'Master Card')
            {
                let x, y;
                x = cardNumber[0];
                y = cardNumber[1];

                if(x === '5')
                {
                if(y < '0' || y > '7')
                    {
                        $('.error-msg-cardnumber').text('輸入卡號錯誤');
                        $('.correct-msg-cardnumber').text('');
                        return -1;
                    }
                    else
                    {
                        console.log('2/////////')
                        test(cardNumber)
                        return 1;
                    }
                }
                else
                {
                    $('.error-msg-cardnumber').text('輸入卡號錯誤');
                    $('.correct-msg-cardnumber').text('');
                    return -1;
                }
                
            }  
            else if(cardissuer === 'American Express')
            {
                let x, y;
                x = parseInt(cardNumber / 100000000000000 % 10);
                y = parseInt(cardNumber / 10000000000000 % 10);
                console.log(x)
                console.log(y)
                console.log('10/////////////')
                if(x === 3)
                {
                    console.log('14/////////////')
                    if(y ===4 || y === 7)
                    {
                        console.log('3/////////////')
                        test2(cardNumber);
                        return 1;
                        
                    }
                    else
                    {
                        console.log('13/////////////')
                        $('.error-msg-cardnumber').text('輸入卡號錯誤');
                        $('.correct-msg-cardnumber').text('');
                        return -1;
                    }
                }
                $('.error-msg-cardnumber').text('輸入卡號錯誤');
                $('.correct-msg-cardnumber').text('');
                return -1;
                
            }
            else if(cardissuer === 'other')
            {
                console.log('4/////////')
                test(cardNumber)
                return 1;
            }
            console.log(cardNumber); 
        }
        else
        {
            $('.error-msg-cardnumber').text('輸入卡號錯誤'); 
            $('.correct-msg-cardnumber').text('');
            return -1;
        }
}


$('.donate-money').on('click', function (){
    const id = $(this).attr('id')
    $('.donate-money').each(function (){
        if($(this).attr('id')!==id){
            $(this).removeClass('active')
        }
    })
    $(this).toggleClass('active')
})



function CardNumtest(cardNumber)
{
    let i, j,  doble_sum = 0, single_sum = 0, sum = 0, chk = 0;  
    let cardnum_N = new Array();
    let card_times = new Array();

    // card_times[0] = parseInt(cardNumber.Substring(0,4));
    card_times[0] = parseInt(cardNumber/1000000000000)%10000;
    card_times[1] = parseInt(cardNumber/100000000)%10000;
    card_times[2] = parseInt(cardNumber/10000)%10000;
    card_times[3] = parseInt(cardNumber)%10000;

    for(i = 0;i < 4;i++)
    {   
        console.log(card_times[i])
        cardnum_N[0] = parseInt(card_times[i]/1000)%10;
        cardnum_N[1] = parseInt(card_times[i]/100)%10;
        cardnum_N[2] = parseInt(card_times[i]/10)%10;
        cardnum_N[3] = parseInt(card_times[i])%10;
        console.log(cardnum_N[0])
        console.log(cardnum_N[1])
        console.log(cardnum_N[2])
        console.log(cardnum_N[3])
        if(i !=3)
        {
            doble_sum = parseInt((2*cardnum_N[0])/10)+parseInt((2*cardnum_N[2])/10)+parseInt((2*cardnum_N[0])%10)+parseInt((2*cardnum_N[2])%10);
            single_sum = parseInt(cardnum_N[1] + cardnum_N[3]);
        }
        else
        {
            doble_sum = parseInt((2*cardnum_N[0])/10)+parseInt((2*cardnum_N[2])/10)+parseInt((2*cardnum_N[0])%10)+parseInt((2*cardnum_N[2])%10);
            single_sum = parseInt(1*cardnum_N[1]);
            chk = parseInt(1*cardnum_N[3]);
        }
        //  doble_sum = parseInt((2*cardnum_N[0])/10)+parseInt((2*cardnum_N[2])/10)+parseInt((2*cardnum_N[0])%10)+parseInt((2*cardnum_N[2])%10);
        //  single_sum = parseInt(cardnum_N[1] + cardnum_N[3]);
        // if(i != 3)
        // {
        //     doble_sum = parseInt((2*cardnum_N[0])%9)+parseInt((2*cardnum_N[2])%9);
        //     single_sum = parseInt(cardnum_N[1] + cardnum_N[3]); 
        // }
        // else
        // {
        //     doble_sum = parseInt((2*cardnum_N[0])%9)+parseInt((2*cardnum_N[2])%9);
        //     single_sum = parseInt(1*cardnum_N[1]);
        //     chk = parseInt(1*cardnum_N[3]);
        // }      
        sum += parseInt(doble_sum) + parseInt(single_sum);
        console.log(doble_sum)
        console.log(single_sum)
        console.log('sum' + sum)   
    }
    console.log(sum)
    sum = 10- (sum%10);
    console.log(sum);
    if(sum === chk)
    {
        return(1);
    }
    else
    {
        return(0);
    } 
}

function test(cardNumber)
{
    var x;
    let last_N;
    last_N = CardNumtest(cardNumber)
    if(last_N === 1 )
    {
        // document.("<h1>正確</h1>");
        // alert("成功捐款");
        $('.correct-msg-cardnumber').text('輸入卡號正確');
        $('.error-msg-cardnumber').text('');
        x = 1;
    }
    else
    {
        $('.error-msg-cardnumber').text('輸入卡號錯誤');
        $('.correct-msg-cardnumber').text('');
        x = -1;
    }
    return x;
}




function tel(cardphone)
{   
    var x;
    if((cardphone.length) !== 9 )
    {


        $('.error-msg-tel').text('輸入電話格式錯誤');
        $('.correct-msg-tel').text('');
        x = -1;
    }
    else
    {
        $('.correct-msg-tel').text('輸入電話格式正確');
        $('.error-msg-tel').text('');
        x = 1;
    }
    return x;
}

function email(cardemail)
{
    if(cardemail.indexOf('@') === -1)
    {
        var x;
        $('.error-msg-email').text('輸入信箱格式錯誤');
        $('.correct-msg-email').text('');
        x = -1;
    }
    else
    {
        $('.correct-msg-email').text('輸入信箱格式正確');
        $('.error-msg-email').text('');
        x = 1;
    }
    return x;
}

function cvc2(cardcvc2)
{
    var x;
    if((cardcvc2.length) !== 3 )
    {
        $('.error-msg-cardcvc2').text('輸入檢查碼格式錯誤');
        $('.correct-msg-cardcvc2').text('');
        x = -1;
    }
    else
    {
        $('.correct-msg-cardcvc2').text('輸入檢查碼格式正確');
        $('.error-msg-cardcvc2').text('');
        x = 1;
    }
    return x;
}

function CardNumtest2(cardNumber)
{
    let i, j,  doble_sum = 0, single_sum = 0, sum = 0, chk = 0;  
    let cardnum_N = new Array();
    let card_times = new Array();
    cardNumber = cardNumber*10;
    // card_times[0] = parseInt(cardNumber.Substring(0,4));
    card_times[0] = parseInt(cardNumber/1000000000000)%10000;
    card_times[1] = parseInt(cardNumber/100000000)%10000;
    card_times[2] = parseInt(cardNumber/10000)%10000;
    card_times[3] = parseInt(cardNumber)%10000;

    for(i = 0;i < 4;i++)
    {   
        console.log(card_times[i])
        cardnum_N[0] = parseInt(card_times[i]/1000)%10;
        cardnum_N[1] = parseInt(card_times[i]/100)%10;
        cardnum_N[2] = parseInt(card_times[i]/10)%10;
        cardnum_N[3] = parseInt(card_times[i])%10;
        console.log(cardnum_N[0])
        console.log(cardnum_N[1])
        console.log(cardnum_N[2])
        console.log(cardnum_N[3])
        if(i !=3)
        {
            single_sum = parseInt((2*cardnum_N[1])/10)+parseInt((2*cardnum_N[3])/10)+parseInt((2*cardnum_N[1])%10)+parseInt((2*cardnum_N[3])%10);
            doble_sum = parseInt(cardnum_N[0] + cardnum_N[2]);
        }
        else
        {
            single_sum = parseInt((2*cardnum_N[1])/10)+parseInt((2*cardnum_N[3])%10);
            doble_sum = parseInt(1*cardnum_N[0]);
            chk = parseInt(1*cardnum_N[2]);
        }   
        sum += parseInt(doble_sum) + parseInt(single_sum);
        console.log('d'+doble_sum)
        console.log('s'+single_sum)
        console.log('sum' + sum)   
    }
    console.log(sum)
    sum = 10- (sum%10);
    console.log(sum);
    if(sum === chk)
    {
        return(1);
    }
    else
    {
        return(0);
    } 
}

function test2(cardNumber)
{
    var x;
    let last_N;
    last_N = CardNumtest2(cardNumber)
    if(last_N === 1 )
    {
        // document.("<h1>正確</h1>");
        // alert("成功捐款");
        $('.correct-msg-cardnumber').text('輸入卡號正確');
        $('.error-msg-cardnumber').text('');
        x = 1;
    }
    else
    {
        $('.error-msg-cardnumber').text('輸入卡號錯誤');
        $('.correct-msg-cardnumber').text('');
        x = -1;
    }
    return x;
}