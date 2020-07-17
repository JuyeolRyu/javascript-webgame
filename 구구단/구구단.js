var num1 = Math.ceil(Math.random()*9);
var num2 = Math.ceil(Math.random()*9);
var result = num1 * num2;

var 바디 = document.body;
var 단어 = document.createElement('div');
단어.textContent = String(num1) + ' X ' + String(num2) + ' = ?';
document.body.append(단어);

var 폼 = document.createElement('form');
document.body.append(폼);
var 입력창 = document.createElement('input');
폼.append(입력창);
var 버튼 = document.createElement('button');
버튼.textContent = '입력'
폼.append(버튼);
var 결과창 = document.createElement('div');
document.body.append(결과창);

입력창.focus();

//폼 엔터누르면 새로고침
폼.addEventListener('click', function(이벤트) { //콜백함수
    이벤트.preventDefault();
    console.log(result, 입력창.value);
    if(result === Number(입력창.value)){
        결과창.textContent = '딩동댕';
        num1 = Math.ceil(Math.random()*9);
        num2 = Math.ceil(Math.random()*9);
        result = num1 * num2;
        단어.textContent = String(num1) + ' X ' + String(num2) + ' = ?';

        입력창.value = '';
        입력창.focus();
    }else{
        결과창.textContent = '땡';
        입력창.value = '';
        입력창.focus();
    }
});