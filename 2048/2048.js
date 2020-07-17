var 테이블 = document.getElementById('table');
var 점수표 = document.getElementById('score');
var 데이터 = [];

function 초기화(){
    //document.createDocumentFragment(); ==> 노드를 담을수 있는 컨테이너 역할을 하는 특수 노드
    var fragment = document.createDocumentFragment();
    [1,2,3,4].forEach(function(){
        var 열데이터 = [];
        데이터.push(열데이터);
        var tr = document.createElement('tr');
        [1,2,3,4].forEach(function(){
            열데이터.push(0);
            var td = document.createElement('td');
            tr.append(td);
        });
        fragment.append(tr);
    });
    테이블.innerHTML = '';
    테이블.append(fragment);
}

function 랜덤생성(){
    //빈칸인 배열의 인덱스를 저장하는 배열
    var 빈칸배열 = [];
    데이터.forEach(function(열데이터,i){
        열데이터.forEach(function(행데이터,j){
            if(!행데이터){
                빈칸배열.push([i,j]);
            }
        });
    });
    
    if(빈칸배열.length === 0){
        alert('게임오버!! 점수 : ' + 점수표.textContent);
        초기화();
    }else{

    }
    var 랜덤칸 = 빈칸배열[Math.floor(Math.random() * 빈칸배열.length)];
    데이터[랜덤칸[0]][랜덤칸[1]] = 2;
    그리기();
}

function 그리기(){
    데이터.forEach(function(열데이터,i){
        열데이터.forEach(function(행데이터,j){
            if(행데이터 > 0){
                테이블.children[i].children[j].textContent = 행데이터;
            }else{
                테이블.children[i].children[j].textContent = '';
            }
        });
    });
}

초기화();
랜덤생성();
그리기();

var 드래그시작 = false;
var 드래그중 = false;
var 시작좌표;
var 끝좌표;
window.addEventListener('mousedown', function(이벤트){
    드래그시작 = true;
    시작좌표 = [이벤트.clientX,이벤트.clientY];
});
window.addEventListener('mousemove', function(이벤트){
    //이벤트.screanX : 모니터 기준
    //이벤트.clientX : 브라우저 기준
    if(드래그시작){
        드래그중 = true;
    }
});
window.addEventListener('mouseup', function(이벤트){
    끝좌표 = [이벤트.clientX,이벤트.clientY];
    
    if(드래그중){
        var 방향;
        var x차이 = 끝좌표[0] - 시작좌표[0];
        var y차이 = 끝좌표[1] - 시작좌표[1];
    
        if(x차이 < 0 && Math.abs(x차이) / Math.abs(y차이) > 1){
            방향 = '왼쪽';
        }else if(x차이 > 0 && Math.abs(x차이) / Math.abs(y차이) > 1){
            방향 = '오른쪽';
        }else if(y차이 > 0 && Math.abs(x차이) / Math.abs(y차이) < 1){
            방향 = '아래';
        }else if(y차이 < 0 && Math.abs(x차이) / Math.abs(y차이) < 1){
            방향 = '위';
        }
        console.log(방향);
    }
    
    드래그시작 = false;
    드래그중 = false;

    switch(방향){
        case '왼쪽':
            var 새데이터 = [
                [],
                [],
                [],
                []
            ];

            데이터.forEach(function(열데이터,i){
                열데이터.forEach(function(행데이터, j){
                    if(행데이터){
                        //같은 숫자일때 숫자 합쳐주기
                        if(새데이터[i][새데이터[i].length - 1] && 새데이터[i][새데이터[i].length - 1] === 행데이터){
                            새데이터[i][새데이터[i].length - 1] *= 2;
                            var 현점수 = parseInt(점수표.textContent, 10);
                            점수표.textContent = 현점수 + 새데이터[i][새데이터[i].length - 1];
                        }else{
                            새데이터[i].push(행데이터);
                        }
                    }
                });
            });

            [1,2,3,4].forEach(function(열데이터,i){
                [1,2,3,4].forEach(function(행데이터, j){
                    데이터[i][j] = 새데이터[i][j] || 0;
                });
            });
            break;
        case '오른쪽':
            var 새데이터 = [
                [],
                [],
                [],
                []
            ];

            데이터.forEach(function(열데이터,i){
                열데이터.forEach(function(행데이터, j){
                    if(행데이터){
                        if(새데이터[i][새데이터[i].length - 1] && 새데이터[i][새데이터[i].length - 1] === 행데이터){
                            새데이터[i][새데이터[i].length - 1] *= 2;
                            var 현점수 = parseInt(점수표.textContent, 10);
                            점수표.textContent = 현점수 + 새데이터[i][새데이터[i].length - 1];
                        }else{
                            새데이터[i].push(행데이터);
                        }
                    }
                });
            });

            [1,2,3,4].forEach(function(열데이터,i){
                [1,2,3,4].forEach(function(행데이터, j){
                    데이터[i][3-j] = 새데이터[i][j] || 0;
                });
            });
            break;
        case '위':
            var 새데이터 = [
                [],
                [],
                [],
                []
            ];

            데이터.forEach(function(열데이터,i){
                열데이터.forEach(function(행데이터, j){
                    if(행데이터){
                        if(새데이터[j][새데이터[j].length - 1] && 새데이터[j][새데이터[j].length - 1] === 행데이터){
                            새데이터[j][새데이터[j].length - 1] *= 2;
                            var 현점수 = parseInt(점수표.textContent, 10);
                            점수표.textContent = 현점수 + 새데이터[j][새데이터[j].length - 1];
                        }else{
                            새데이터[j].push(행데이터);
                        }
                    }
                });
            });

            [1,2,3,4].forEach(function(열데이터,i){
                [1,2,3,4].forEach(function(행데이터, j){
                    데이터[j][i] = 새데이터[i][j] || 0;
                });
            });

            break;
        case '아래':
            var 새데이터 = [
                [],
                [],
                [],
                []
            ];

            데이터.forEach(function(열데이터,i){
                열데이터.forEach(function(행데이터, j){
                    if(행데이터){
                        if(새데이터[j][새데이터[j].length - 1] && 새데이터[j][새데이터[j].length - 1] === 행데이터){
                            새데이터[j][새데이터[j].length - 1] *= 2;
                            var 현점수 = parseInt(점수표.textContent, 10);
                            점수표.textContent = 현점수 + 새데이터[j][새데이터[j].length - 1];
                        }else{
                            새데이터[j].unshift(행데이터);
                        }
                    }
                });
            });

            [1,2,3,4].forEach(function(열데이터,i){
                [1,2,3,4].forEach(function(행데이터, j){
                    데이터[3-j][i] = 새데이터[i][j] || 0;
                });
            });
            break;
    }
    그리기();
    랜덤생성(); 
});

