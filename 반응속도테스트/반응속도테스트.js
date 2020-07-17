var 스크린 = document.querySelector('#screen');
var 시작시간;
var 끝시간;
var 타임아웃;
var 기록 = [];

//preformance.now() ==> 정밀한 시간, time() - timeEnd() 로도 구현 가능
//시작 시간 기억
//클릭 이벤트리스너 생성
스크린.addEventListener('click',function(){
    //classList.contains()
    //현재 클래스가 waiting 일때 true값 반환한다.
    if( 스크린.classList.contains('waiting') ){
        스크린.classList.remove('waiting');
        스크린.classList.add('ready');
        스크린.textContent = '초록색이 되면 클릭하세요.';
        타임아웃 = setTimeout(function(){
            시작시간 = new Date();
            스크린.click();
        }, Math.floor(Math.random() * 1000 ) + 2000) //2000~3000사이의 수
    }else if( 스크린.classList.contains('ready') ){
        //대기상태에서 누른 부정 클릭
        if(!시작시간){
            clearTimeout(타임아웃);
            스크린.classList.remove('ready');
            스크린.classList.add('waiting');
            스크린.textContent = '너무 성급하시군요.';
        }else{
            스크린.classList.remove('ready');
            스크린.classList.add('now');
            스크린.textContent = '클릭하세요.';
        }      
    }else if( 스크린.classList.contains('now') ){
        끝시간 = new Date();
        var 결과 = 끝시간 - 시작시간;

        시작시간 = null;
        끝시간 = null;

        기록.push(결과);
        스크린.classList.remove('now');
        스크린.classList.add('waiting');
        스크린.textContent = '클릭해서 시작하세요.';
    }
})