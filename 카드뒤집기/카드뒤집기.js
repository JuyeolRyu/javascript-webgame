var 가로 = 4;
var 세로 = 3;
var 클릭플래그 = true;
var 클릭카드 = [];
var 완성카드 = [];

var 색깔 = [];
var 색깔들 = ['red', 'blue', 'green', 'yellow', 'pink', 'white','red', 'blue', 'green', 'yellow', 'pink', 'white'];
var 색깔후보 = 색깔들.slice();    //.slice() 배열의 참조관계 끊기 deepcopy??
var 시작시간;

//색 섞기
function 셔플(){
    while(색깔후보.length > 0){
        색깔 = 색깔.concat(색깔후보.splice(Math.floor(Math.random()* 색깔후보.length),1));
    }
}

function 카드세팅(가로, 세로){
    클릭플래그 = false;
    for(var i = 0; i<가로 * 세로; i++){
        var card = document.createElement('div');
        card.className = 'card';
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        cardFront.textContent = '뒷면';
        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = 색깔[i];
    
        cardInner.append(cardFront);
        cardInner.append(cardBack);
        card.append(cardInner);

        (function(c){
            c.addEventListener('click', function(){
                if(클릭플래그 && !완성카드.includes(c)){
                    c.classList.toggle('flipped');
                    클릭카드.push(c);

                    if(클릭카드.length ===2){
                        if(클릭카드[0].querySelector('.card-back').style.backgroundColor === 클릭카드[1].querySelector('.card-back').style.backgroundColor){
                            완성카드.push(클릭카드[0]);
                            완성카드.push(클릭카드[1]);
                            클릭카드 = [];
                            if(완성카드.length === 가로 * 세로){
                                var 끝시간 = new Date();
                                console.log(시작시간,끝시간);
                                alert('완성하셨습니다.' + (끝시간-시작시간)/1000 + '초 걸렸습니다.');
                                
                                document.querySelector('#wrapper').innerHTML='';
                                
                                색깔후보 = 색깔들.slice();
                                색깔 = [];
                                완성카드 = [];
                                시작시간 = null;
                                셔플();
                                카드세팅(가로,세로);
                            }
                        }else{
                            클릭플래그 = false;
                            setTimeout(function(){
                                클릭카드[0].classList.remove('flipped');
                                클릭카드[1].classList.remove('flipped');
                                클릭플래그 = true;
                                클릭카드 = [];
                            },1000);
                        }
                    }
                }
            });
        })(card);
        document.querySelector('#wrapper').append(card);
    }

    //순서대로 카드를 보여주기
    document.querySelectorAll('.card').forEach(function (card,index){
        setTimeout(function(){
            card.classList.add('flipped');
        }, 1000 + 100*index);
    });
    //다시 뒤집기
    setTimeout(function(){
        document.querySelectorAll('.card').forEach(function (card,index){
            card.classList.remove('flipped');
        });
        클릭플래그 = true;
        시작시간 = new Date();
    }, 5000);
}
셔플();
카드세팅(가로, 세로);