var tetris = document.querySelector('#tetris');
var tetrisData = [];
var currentBlock;
var nextBlock;
var currentTopLeft = [0,3];
var blocks = [
    {
        name: 's',
        center: false,
        numCode: 1,
        color: 'red',
        currentShapeIndex: 0,
        shape: [
            [
                [0,0,0],
                [0,1,1],
                [0,1,1],
            ]
        ]
    },
    {
        name: 't',
        center: true,
        numCode: 2,
        color: 'orange',
        currentShapeIndex: 0,
        shape: [
            [
                [0,0,0],
                [1,1,1],
                [0,1,0],
            ],
            [
                [0,1,0],
                [1,1,0],
                [0,1,0],
            ],
            [
                [0,1,0],
                [1,1,1],
                [0,0,0],
            ],
            [
                [0,1,0],
                [0,1,1],
                [0,1,0],
            ],
        ]
    },
    {
        name: 'z',
        center: true,
        numCode: 3,
        color: 'yellow',
        currentShapeIndex: 0,
        shape: [
            [
                [0,0,0],
                [1,1,0],
                [0,1,1],
            ],
            [
                [0,1,0],
                [1,1,0],
                [1,0,0],
            ],
            [
                [1,1,0],
                [0,1,1],
                [0,0,0],
            ],
            [
                [0,0,1],
                [0,1,1],
                [0,1,0],
            ],
        ]
    },
    {
        name: 'zr',
        center: true,
        numCode: 4,
        color: 'green',
        startRow: 1,
        currentShapeIndex: 0,
        shape: [
            [
                [0,0,0],
                [0,1,1],
                [1,1,0],
            ],
            [
                [1,0,0],
                [1,1,0],
                [0,1,0],
            ],
            [
                [0,1,1],
                [1,1,0],
                [0,0,0],
            ],
            [
                [0,1,0],
                [0,1,1],
                [0,0,1],
            ],
        ]
    },
    {
        name: 'l',
        center: true,
        numCode: 5,
        color: 'blue',
        currentShapeIndex: 0,
        shape: [
            [
                [0,0,0],
                [1,1,1],
                [1,0,0],
            ],
            [
                [1,1,0],
                [0,1,0],
                [0,1,0],
            ],
            [
                [0,0,1],
                [1,1,1],
                [0,0,0],
            ],
            [
                [0,1,0],
                [0,1,0],
                [0,1,1],
            ],
        ]
    },
    {
        name: 'lr',
        center: true,
        numCode: 6,
        color: 'navy',
        currentShapeIndex: 0,
        shape: [
            [
                [0,0,0],
                [1,1,1],
                [0,0,1],
            ],
            [
                [0,1,0],
                [0,1,0],
                [1,1,0],
            ],
            [
                [1,0,0],
                [1,1,1],
                [0,0,0],
            ],
            [
                [0,1,1],
                [0,1,0],
                [0,1,0],
            ],
        ]
    },
    {
        name: 'b',
        center: true,
        numCode: 7,
        color: 'violet',
        currentShapeIndex: 0,
        shape: [
            [
                [0,0,0,0]
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
            ],
            [
                [0,1,0,0]
                [0,1,0,0],
                [0,1,0,0],
                [0,1,0,0],
            ],[
                [0,0,0,0]
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0],
            ],[
                [0,0,1,0]
                [0,0,1,0],
                [0,0,1,0],
                [0,0,1,0],
            ],
        ]
    }
]

//const ==> 상수
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'navy', 'violet'];

/*
    const 함수명 = 인자 => 리턴값
    const 함수명 = (인자) => 리턴값
*/
const isActiveBlock = value => (value > 0 && value < 10);
const isInvalidBlock = value => (value > 0 && value < 10);

function init(){ //데이터 초기화 함수
    const fragment = document.createDocumentFragment();
    /* [...Array(20).keys()]
        ...[1,2,3] ==> 1,2,3 ...붙이면 배열 안의 내용이 빠져나온다.
    */
    [...Array(20).keys()].forEach((col,i =>{
        const tr = document.createElement('tr');
        fragment.append(tr);
        [...Array(10).keys()].forEach((row,j) => {
            const td = document.createElement('td');
            tr.append(td);
        });

        const column = Array(10).fill(0);
        tetrisData.push(0);
    });
    tetris.append(fragment);
}

function draw(){
    tetrisData.forEach((col, i) => { //게임오버 판단
        col.forEach((row,j) => {
            if(row > 0){
                tetris.children[i].children[j].className = tetrisData[i][j] >= 10 ? colors[tetrisData[i][j]/10 -1]:;
            }else{
                tetris.children[i].children[j].className = '';
            }
        });
    });
}
function generate(){ //테트리스 블록생성
    if(!currentBlock){//현재블록이 없으면
        currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
    }else{//현재블록이 있는 경우
        currentBlock = nextBlock;
    }
    currentBlock.currentShapeIndex = 0;
    nextBlock = blocks[Math.floor(Math.random() * blocks.length)];//다음블록 뽑기
    drawNext(); //다음 블록 그려주기
    currentTopLeft = [-1,3];

    let isGameOver = false;
    currentTopLeft.shape[0].slice(1).forEach((col, i) => { //게임오버 판단
        col.forEach((row,j) => {
            if(row && tetrisData[i][j+3]){
                isGameOver = true;
            }
        });
    });

    currentTopLeft.shape[0].slice(1).forEach((col, i) => { //게임오버 판단
        col.forEach((row,j) => {
            if(row){
                tetrisData[i][j+3] = currentBlock.numCode;
            }
        });
    });

    if(isGameOver){
        clearInterval(int);
        draw();
        alert('Game Over');
    }else{
        draw();
    }
}

function checkRows(){

}

function tick(){
    const nextTopLeft = [currentTopLeft[0] + 1, currentTopLeft[1] ];
    const activeBlocks = [];
    let canGoDown = true;
    let currnetBlockShape = currentBlock.shape[currentBlock.currentShapeIndex];

    for(let i=currentTopLeft[0]; i<currentTopLeft[0] + currnetBlockShape.length; )
}
function 화면그리기(){
    tetrisData.forEach(function(tr,i){
        tr.forEach(function(td, j){
            tetris.children[i].children[j].className = blockDict[td || 0][0];
        });
    });
}
function 블록생성기(){
    stopDown = false;
    var 블록 = blockArr[ Math.floor( Math.random()*7) ][2];
    console.log(블록);
    블록.forEach(function(tr, i){
        tr.forEach(function(td, j){
            //TODO: 블록 생성할때 다 차있으면 게임오버
            tetrisData[i][j+3] = td;
        });
    });
    화면그리기();
}

function 블록내리기(){
    for(var i = tetrisData.length -1; i >= 0; i--){
        tetrisData[i].forEach(function(td,j){
            if(td>0 && td<10){//아직 움직일수 있는 블록의 경우 내림
                if(tetrisData[i+1] && !stopDown){
                    tetrisData[i+1][j] = td;
                    tetrisData[i][j] = 0;
                }else{//못움직이는 블록으로 바꿔줌
                    stopDown = true;
                    tetrisData[j][j] = td*10;
                }
            }
        });
    }
    if(stopDown){
        블록생성기();
    }
    화면그리기();
}
//키보드 이벤트 한번만 받을때는 keyup 사용한다. 
window.addEventListener('keydown',function(e){
    console.log(e.code);
    switch (e.code){
        case 'ArrowRight':
            break;
        case 'ArrowLeft':
            break;
        case 'ArrowDown':
            break;
        case 'ArrowUp':
            break;
        default:
            break;
    }
});
//키보드 이벤트 연속으로 받을 경우
window.addEventListener('keyup',function(e){
    //console.log(e.code);
    switch (e.code){
        case 'Space':
            break;
        case 'ArrowUp':
            break;
        default:
            break;
    }
});

칸만들기();
블록생성기();
setInterval(블록내리기, 100);