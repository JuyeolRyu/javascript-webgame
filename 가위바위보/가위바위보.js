var computer = 0;
//딕셔너리 자료형 사용하기
var dictionary={
    가위: '-200px',
    바위: '0',
    보: '-415px'
};

var 점수표={
    가위: 1,
    바위: 0,
    보: -1,
};
var 인터벌;
//console.log(Object.entries(dictionary));
//Object.entries() ==> 객체를 배열로 바꿔준다.
//.find() ==>반복문이지만 원하는 것을 찾으면 리턴한다.
//.findIndex() ==> 인덱스를 찾을때 사용한다.
function 컴퓨터의선택(이미지좌표){
    return Object.entries(dictionary).find(function(v){
        return v[1] === 이미지좌표;
    })[0];
}

//setInterval ==> 0.1초마다 계속 실행하는것
//뒤의 인자는 반복되는 시간을 정해준다.
function 인터벌메이커(){
    인터벌 = setInterval(function(){
        if(computer === dictionary.가위){
            computer = dictionary.바위;
        }else if(computer === dictionary.바위){
            computer = dictionary.보;
        }else{
            computer = dictionary.가위;
        }
        document.querySelector('#computer').style.background =
            'url(./가위바위보.png)' + computer + ' 0';
    }, 100);
}

인터벌메이커();
//여러개의 태그를 선택할때 사용하는 querySelectorAll
//querySelectorAll 는 forEach를 지원해서 반복문을 돌수 있다.
//반복문을 돌면서 클래스들을 다 방문 가능
document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click',function(){
        //clearInterval 사용하면 setInterval을 멈춘다.
        //내가 낼 것을 고르면 잠시 멈쳐준다.
        clearInterval(인터벌);
        //다음 게임 시작을 위해 넣어준다.
        setTimeout(function(){
            //다시 이미지 회전을 시작하는것
            인터벌메이커();
        },1000);

        var 나의선택 = this.textContent;
        var 나의점수 = 점수표[나의선택];
        var 컴퓨터점수 = 점수표[컴퓨터의선택(computer)];
        var 점수차 = 나의점수-컴퓨터점수;
        
        //배열.includes(숫자) ==> 숫자가 배열안에 있으면 true
        console.log(나의선택,컴퓨터의선택(computer),computer);
        console.log(점수차);
        console.log([-1,2].includes(점수차));
        if(점수차 === 0){
            console.log('비겼습니다');
        }else if([-1,2].includes(점수차)){
            console.log('이겼습니다.');
        }else{
            console.log('졌습니다.');
        }
    });
    
});