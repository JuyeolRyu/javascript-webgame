//이렇게 배열을 선언하면 안에 아무것도 들어있지 않음
//undefined도 안들어있음
var candidate = Array(45);
//괄호안의 값으로 배열을 채움
//인자로 아무것도 받지 않으면 undefined로 채운다
var fill = candidate.fill();
//map ==> mapping
//
var map = fill.map(function(num,idx){
    return idx + 1;
})

var shuffle = [];
//
//Math.floor는 소수점 아래의 값을 버린다.
while(map.length > 0){
    var num = map.splice(Math.floor(Math.random()*map.length) , 1)[0];
    shuffle.push(num);
}
console.log(shuffle);

var bonus = shuffle[shuffle.length - 1];
var result_num = shuffle.slice(0,6);

//당첨숫자들 정렬
//그냥 sort 하면 우리가 원하는 sorting이 아님
//p-c 앞에 있는 값과 뒤에있는 값을 빼서 양수이면 앞뒤 숫자 바꿈
console.log('당첨 숫자들',result_num.sort(function(p,c){return p-c;}),'보너스',bonus);

//querySelector로 id class 상관없이 찾을수 있다. 아이디 앞에 #붙여야함
//                                             클래스는 앞에 .붙여야함
var 결과창 = document.querySelector('#결과창');
var 보너스 = document.querySelector('.보너스');

function 공색칠하기(숫자,결과창){
    var ball = document.createElement('div');
    //css에서 border-radius ==> js에서 borderRadius로 
    //why? ==> -가 연산자 빼기로 인식되기 때문
    ball.textContent = 숫자;
    ball.style.display = 'inline-block';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '10px';
    ball.style.width = '20px';
    ball.style.height = '20px';
    ball.style.textAlign = 'center';
    ball.style.marginRight = '10px'
    ball.id = '공아이디' + 숫자;
    var 배경색;
    if(숫자 <=10){
        배경색 = 'red';
    }else if(숫자 <=20){
        배경색 = 'orange';
    }else if(숫자 <=30){
        배경색 = 'yellow';
    }else if(숫자 <=40){
        배경색 = 'blue';
    }else{
        배경색 = 'green';
    }
    ball.style.background = 배경색;
    결과창.append(ball);
}
//setTimeout(,밀리초)
setTimeout(function(){
    공색칠하기(result_num[0],결과창);
}, 1000);

setTimeout(function(){
    공색칠하기(result_num[1],결과창);
}, 2000);

setTimeout(function(){
    공색칠하기(result_num[2],결과창);
}, 3000);

setTimeout(function(){
    공색칠하기(result_num[3],결과창);
}, 4000);

setTimeout(function(){
    공색칠하기(result_num[4],결과창);
}, 5000);

setTimeout(function(){
    공색칠하기(result_num[5],결과창);
}, 6000);
//클래스는 여러번 가져올수 있으므로 [0]붙여줘야 한다
setTimeout(function(){
    공색칠하기(bonus,보너스);
}, 7000);
