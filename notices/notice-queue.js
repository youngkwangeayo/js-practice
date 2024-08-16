class NoticeQueue {
    
    static #listener = false; //  (클래스변수 스태틱변수 :명칭차이) 선언. 

    constructor ( targetNoticeId ) {
        
        if(NoticeQueue.#listener == false){ //1번만 리스너 등록
            this.#registerNotice(); 
        }
        
        this.targetNoticeId = targetNoticeId; //해당 인스턴스의 (path 또는 id 또는 이름 : 명칭차이)  예 order,payment,table

        NoticeQueue.prototype.messageQueue[this.targetNoticeId] = []; //생성할때 넘어온 매개변수의 이름으로 messageQueue.order = [] 형식으로  queue 설정.
        NoticeQueue.#listener = true;
        
    }


    #registerNotice () {  // 노티초기화 리스너 1번만 등록시키게 프라이빗메소드 설정
       
        window.addEventListener("message", (event) => { // 리스너 등록
            if (event.data && event.data.source === 'react-devtools-content-script')return; //리액트 디버깅 쓰는사람은 무한 호출됨.

            // console.log("    = ",event.data.path)

            if ( event.data.commend == "notice" ) { //commend 가 노티일시만. 기존 브릿지 양식처럼 쓰기위해
                try {
                    let targetNoticeId = event.data.targetNoticeId; //패스는 노티의 id 타입
                    NoticeQueue.prototype.messageQueue[targetNoticeId].push(event.data.payload); // 노티의 같은 id로 넘어온애들만 안에 payload (데이터) 푸쉬.
                } catch (error) {
                    
                }
            }
            
        })
        
    }

}

NoticeQueue.prototype.messageQueue = {};

NoticeQueue.prototype.get = function ( callback ) { //노티를 받아서 쓰기위한 미종료 콜백 함수.
    
    setInterval( () => { 
        

        if ( NoticeQueue.prototype.messageQueue[ this.targetNoticeId ][0] != undefined  ) { //인스턴스 생성시 같은 ID 넣어준 애들의 큐만 받음./

            callback( NoticeQueue.prototype.messageQueue[ this.targetNoticeId ][0] ); 
            setTimeout( ()=> { NoticeQueue.prototype.messageQueue[this.targetNoticeId].shift(); }, 200);  //메세지의 큐를 콜백시키면 해당 큐는 삭제
           
        }

    },500);

};



// ==================사용 예제 ==============

// table.js
new NoticeQueue("order").get( (payload) => {

    console.log(payload,"new 노변수");

});

// order.js 
/**
 * "new 연산자에 매개변수로 해당 노티만 받겠다."
 * 
 */
new NoticeQueue("order").get( (payload) => {

    console.log(payload,"new 노변수 2");

});


// pay.js
new NoticeQueue("pay").get( (payload) => {

    console.log(payload,"new 노변수 2 pay");

});





// ==================test 인스턴스 5000개 및 await ==============



function sendNoticeTest(id, payload){
    let noticeForm = {
        commend : "notice",
        targetNoticeId : id,
        payload : payload
    }
    window.postMessage(noticeForm);
}

// let ccc = 5000;
// while(ccc > 0){

//     new Notice("order").get( (d) => {

//         console.log(d,"new 노변수 ",ccc);
    
//     });
//     ccc--;
// }


// new Notice("order").get( async (d) => {
    
//     await sleepT(5000);

//     console.log(d,"n222222222ew 노변수");

// });


// async function sleepT(time) {
    
//     return new Promise( function(resolve, reject){
//         setTimeout( () => {
//             resolve("good");
//         },time);
//     })
    
// }

// ==================test END==============




