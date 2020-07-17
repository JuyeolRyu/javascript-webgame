var body = document.body;
var table = document.createElement('table');
var result = document.createElement('div');
var arr = [];
var row = [];
var usr = 'o';

function 결과체크(row_num, col_num){
    //세칸을 다 채웠는지 확인
    var check = false;

    if(arr[row_num][0].textContent === usr &&
        arr[row_num][1].textContent === usr &&
        arr[row_num][2].textContent === usr){
        check = true;
    }
    if(arr[0][col_num].textContent === usr &&
        arr[1][col_num].textContent === usr &&
        arr[2][col_num].textContent === usr){
        check = true;
    }

    if(arr[0][0].textContent === usr &&
        arr[1][1].textContent === usr &&
        arr[2][2].textContent === usr){
        check = true;
    }
    if(arr[0][2].textContent === usr &&
        arr[1][1].textContent === usr &&
        arr[2][0].textContent === usr){
        check = true;
    }

    console.log(usr, check);
    return check;
}

function 초기화(무승부){
    if(무승부){
        result.textContent = '무승부';
    }else{
        result.textContent = usr + '님이 승리하셨습니다.';
    }

    setTimeout(function(){
    //게임이 끝났을 경우 초기화
        result.textContent = '';
        arr.forEach(function (행){
            행.forEach(function (열){
                열.textContent = '';
            });
        });
        usr = 'o';
    }, 1000);    
}

var 비동기콜백 = function(e){
    if(usr === 'x'){//컴퓨터의 턴일때 내가 클릭하지 못하도록 한다.
        return;
    }
    var row_num = row.indexOf(e.target.parentNode);
    var col_num = arr[row_num].indexOf(e.target);

    //.value 는 input에서 사용
    //나머지가 .textContent 
    if(arr[row_num][col_num].textContent != ''){
        alert('빈칸 아닙니다. 다시 골라주세요.');
    }else{
        arr[row_num][col_num].textContent = usr;

        //세칸을 다 채웠는지 확인
        var check = 결과체크(row_num, col_num);

        var 후보칸 = [];
        arr.forEach(function(줄){
            줄.forEach(function(칸){
                후보칸.push(칸);
            });
        });
        후보칸 = 후보칸.filter(function(칸) {return !칸.textContent;});

        if(check){
            초기화();
        }else if(후보칸.length === 0){
            초기화(true);
        }else{
            if(usr === 'o'){
                usr = 'x'
            }

            //컴퓨터의 턴
            setTimeout(function(){
                console.log('컴퓨터의 턴 입니다.');
                //빈칸중 하나를 고르고
                
                var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];

                선택칸.textContent = usr;

                //세칸을 다 채웠는지 확인
                row_num = row.indexOf(선택칸.parentNode);
                col_num = arr[row_num].indexOf(선택칸);
                var check = 결과체크(row_num, col_num);

                //턴을 넘긴다.
                if(check){
                    초기화();
                }

                usr = 'o';
                
            }, 1000);
        }
    }

    
};

for(var i=0;i<3;i++){
    var tr = document.createElement('tr');
    arr.push( [] );
    row.push(tr);
    for(var j=0;j<3;j++){
        var td = document.createElement('td');
        td.addEventListener('click', 비동기콜백);
        tr.append(td);
        arr[i].push(td);
    }
    table.append(tr);
}
body.append(table);
body.append(result);
