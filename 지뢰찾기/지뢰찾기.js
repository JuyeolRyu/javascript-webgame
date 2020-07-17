var tbody = document.querySelector('#table tbody');
var dataset = [];
var 중단플래그 = false;
var 열은칸 = 0;
var 코드표 = {
    연칸 : -1,
    물음표: -2,
    깃발: -3,
    깃발지뢰: -4,
    물음표지뢰: -5,
    지뢰: 1,
    보통칸: 0,
};
document.querySelector('#exec').addEventListener('click',function(){
    //.innerHTML ==> 내부 태그 초기화
    tbody.innerHTML = ''
    document.querySelector('#result').textContent = '';
    dataset = [];
    열은칸 = 0;
    중단플래그 = false;

    var hor = document.querySelector('#hor').value;
    var ver = document.querySelector('#ver').value;
    var mine = document.querySelector('#mine').value;

    //지뢰 위치 뽑기
    var 후보군 = Array(hor*ver).fill().map(function(요소,인덱스){
        return 인덱스;
    });
    var 셔플 = [];

    while(후보군.length> hor * ver - mine){
        var 이동값 = 후보군.splice(Math.floor(Math.random()*후보군.length),1)[0];
        셔플.push(이동값);
    }

    for(var i=0;i<ver;i+=1){
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);

        for(var j=0;j<hor;j+=1){
            //비동기이기 때문에 td에 이벤트 리스너를 미리 넣어줘야한다.
            arr.push(코드표.보통칸);
            var td = document.createElement('td');
            td.addEventListener('contextmenu',function(e){
                e.preventDefault();
                if(중단플래그){
                    return;
                }
                //e.target 현재 선택된 타겟 지금의 경우 td
                /**
                 * e.target rhk e.currentTarget 차이
                 *  커런트타겟은 이벤트리스너가 달린놈이 뽑히고
                 *  타겟은 선택한놈이 뽑힌다.
                 */
                //indexOf 사용하고 싶은데 배열이 아닌것에 적용할때 사용한다.
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                
                if(['','X'].includes(e.currentTarget.textContent)){
                    e.currentTarget.textContent = '!';
                    e.currentTarget.classList.add('flag');
                    if(dataset[줄][칸] === 코드표.지뢰){
                        dataset[줄][칸] = 코드표.깃발지뢰;
                    }else{
                        dataset[줄][칸] = 코드표.깃발;
                    }
                }else if(e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    if(dataset[줄][칸] === 코드표.깃발지뢰){
                        dataset[줄][칸] = 코드표.물음표지뢰;
                    }else{
                        dataset[줄][칸] = 코드표.물음표;
                    }
                }else if(e.currentTarget.textContent === '?'){
                    e.currentTarget.classList.remove('question');
                    if(dataset[줄][칸] === 코드표.물음표지뢰){
                        e.currentTarget.textContent = 'X';
                        dataset[줄][칸] = 코드표.지뢰;
                    }else{
                        e.currentTarget.textContent = '';
                        dataset[줄][칸] = 코드표.보통칸;
                    }
                }
            });

            td.addEventListener('click',function (e){
                if(중단플래그){
                    return;
                }
                //클릭했을때 주변 지뢰 개수
                var 부모tr = e.currentTarget.parentNode;
                var 부모tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(부모tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                
                if([코드표.연칸, 코드표.깃발, 코드표.깃발지뢰, 코드표.물음표지뢰, 코드표.물음표].includes(dataset[줄][칸])){
                    return;
                }
                e.currentTarget.classList.add('opened');
                열은칸 += 1;
                if(dataset[줄][칸] === 코드표.지뢰){
                    e.currentTarget.textContent = '펑';
                    document.querySelector('#result').textContent = '실패!!';
                    중단플래그 = true;
                }else{
                    var 주변 = [dataset[줄][칸-1],dataset[줄][칸+1]];

                    //concat 은 새롭게 배열을 만드는것이므로 다시 넣어서 갱신해야한다.
                    if(dataset[줄-1]){
                        주변 = 주변.concat([dataset[줄-1][칸-1], dataset[줄-1][칸], dataset[줄-1][칸+1]]);
                    }
                    if(dataset[줄+1]){
                        주변 = 주변.concat([dataset[줄+1][칸-1], dataset[줄+1][칸], dataset[줄+1][칸+1]]);
                    }

                    var 주변지뢰개수 = 주변.filter(function(v){
                        return [코드표.지뢰,코드표.깃발,코드표.물음표지뢰].includes(v);
                    }).length;

                    //주변지뢰개수 || '';
                    //==>주변지뢰개수가 false인값 ('',0,null,undefined,NaN)
                    //인 경우 || 뒤의 값을 사용하겠다.
                    e.currentTarget.textContent = 주변지뢰개수 || '';
                    dataset[줄][칸] = 코드표.연칸;
                    if(주변지뢰개수 === 0){
                        //주변에 지뢰가 없으면 0이난 값이 나올때까지 계속연다.
                        //재귀
                        var 주변칸 = [];
                        if(tbody.children[줄-1]){
                            주변칸 = 주변칸.concat([
                                tbody.children[줄-1].children[칸-1],
                                tbody.children[줄-1].children[칸],
                                tbody.children[줄-1].children[칸+1],
                            ]);
                        }

                        주변칸 = 주변칸.concat([
                            tbody.children[줄].children[칸-1],
                            tbody.children[줄].children[칸+1],
                        ]);

                        if(tbody.children[줄+1]){
                            주변칸 = 주변칸.concat([
                                tbody.children[줄+1].children[칸-1],
                                tbody.children[줄+1].children[칸],
                                tbody.children[줄+1].children[칸+1],
                            ]);
                        }
                        //function(v){return !!v}
                        //배열에서 undefined,null 제거하는 코드
                        주변칸.filter( function(v){
                            return !!v
                        }).forEach(function(옆칸) {
                            var 부모tr = 옆칸.parentNode;
                            var 부모tbody = 옆칸.parentNode.parentNode;
                            var 옆칸칸 = Array.prototype.indexOf.call(부모tr.children, 옆칸);
                            var 옆칸줄 = Array.prototype.indexOf.call(부모tbody.children, 부모tr);
                            console.log(옆칸);
                            console.log(부모tr);
                            console.log(부모tbody);
                            console.log('옆칸줄 : ',옆칸줄);
                            console.log('옆칸칸 : ',옆칸칸);
                            console.log('dataset[옆칸줄][옆칸칸] : ',dataset[옆칸줄][옆칸칸]);
                            if(dataset[옆칸줄][옆칸칸] !== 코드표.연칸){
                                 옆칸.click();
                            }
                        });
                    }
                }
                if(열은칸 == hor * ver - mine){
                    중단플래그 = true;
                    document.querySelector('#result').textContent = '승리';

                }
            });
            tr.append(td);
        }
        tbody.append(tr);
    }

    //지뢰 심기
    for(var k=0;k< 셔플.length; k++){
        var 세로 = Math.floor(셔플[k] / ver);
        var 가로 = 셔플[k] % ver;
        //.children으로 자식 태그를 유사 배열로 접근할수 있음
        tbody.children[세로].children[가로].textContent = 'X';
        dataset[세로][가로] = 코드표.지뢰;
    }
});

