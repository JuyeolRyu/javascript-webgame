var body = document.body;
var num_candidate;
var num_arr;

//splice(index 값, 뽑을개수)
//그냥 계속 뽑으면 해당 자리 계속 참조할수있으므로 범위 줄여줘야한다.
function 숫자뽑기(){
    num_candidate = [1,2,3,4,5,6,7,8,9];
    num_arr = [];
    for(var i = 0; i < 4; i += 1){
        num_arr.push(num_candidate.splice(Math.random()*(9-i), 1)[0]);
    }
}

숫자뽑기();

console.log(num_arr);
var result = document.createElement('h1');
body.append(result);
var 남은횟수 = document.createElement('h2');
body.append(남은횟수);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
form.append(input);
input.type = 'text';
input.maxLength = 4;
var button = document.createElement('button');
button.textContent = '입력'
form.append(button);

var wrong_cnt = 0;

//배열.join('구분자') ==> 배열 내용을 하나로 합침
form.addEventListener('submit', function(e){
    e.preventDefault(); //이벤트 리스너에서 'submit' 할때 새로고침 방지
    var ans = input.value;

    if(ans === num_arr.join('')){//정답일 경우
        result.textContent = 'Homerun!!';
        input.value = '';
        input.focus();

        숫자뽑기();

        wrong_cnt = 0;
    }else{ //오답일 경우
        //split('') => 문자열을 배열로 바꿔줌
        //indexOf() => 괄호안의 값이 배열에서 몇번째 인덱스인지 알려줌
        //          => 없을경우 -1 반환
        var ans_arr = ans.split('');
        var strike = 0;
        var ball = 0;
        wrong_cnt += 1;

        if(wrong_cnt > 10){//10번 넘게 틀린 경우
            result.textContent = '10번 넘게 틀림. 답 = ' + num_arr.join('')
            input.value = '';
            input.focus();

            숫자뽑기();

            wrong_cnt = 0;
        }else{
            for(var i=0;i<4;i+=1){
                if(Number(ans_arr[i]) === num_arr[i]){
                    strike += 1;
                }else if(num_arr.indexOf(Number(ans_arr[i])) > -1){
                    ball += 1;
                }
            }
            result.textContent = strike + 'Strike ' + ball + 'Ball'
            남은횟수.textContent = '남은 횟수 : ' + String(10-wrong_cnt);
            input.value = '';
            input.focus();
        }
    }
});
