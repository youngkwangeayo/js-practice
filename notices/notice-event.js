/***
 *  TODO
 *  수정사항 => id 면 쭉 id  변수이름을 읽힐수있게 쭉 가져가라. 변수이름도 잘적어라
 *  get() 함수는 가져와서 끝나는 함수갖고 와일이 도는지 전혀안보인다. 이름을바꿔라
 * 
 *  message 리스너하나를 등록하고 각각의 인스턴스에 이벤트를 넣어줄수있는 방법으로 바꿔보아라.
 * 
 */

class NoticeEnv {
    
    static #listener = false; //  (클래스변수 스태틱변수 :명칭차이) 선언. 
    
    constructor ( targetNoticeId ) {
        
        if (NoticeEnv.#listener == false) { //1번만 리스너 등록
            this.#registerNotice(); 
        }
        NoticeEnv.#listener = true;
        
        this.targetNoticeId = targetNoticeId; //   id = order. order에 대한 노티만 받겠다라는 타겟노티아이디
    }


    #registerNotice () {  // 노티 리스너 초기화 1번만 등록시키고 실수로 재생성 못하게  프라이빗메소드 설정
       
        window.addEventListener("message", (event) => { // 리스너 등록
            if (event.data && event.data.source === 'react-devtools-content-script')return; //리액트 디버깅 쓰는사람은 무한 호출됨.

            if ( event.data.commend == "notice" ) { //commend 가 노티일시만. 기존 브릿지 양식처럼 쓰기위해
                let targetNoticeId;
                let payload;

                try {
                    targetNoticeId = event.data.targetNoticeId;
                    payload = event.data.payload;
                } catch (error) {
                    console.log("no Notice Form"); 
                };

                try {
                    let targetNoticeEvent = new CustomEvent(targetNoticeId, { detail: payload } );
                    window.dispatchEvent(targetNoticeEvent);
                } catch (error) {
                    console.log("notice event send Error"); 
                };
                
            };
            
        });
        
    };

};



NoticeEnv.prototype.receive = function ( callback ) { //노티를 받아서 쓰기위한 미종료 콜백 함수.
    let targetNoticeId = this.targetNoticeId;
    // console.log("리스너 등록합니다")
   

        window.addEventListener(targetNoticeId, (data) => {
    
            callback(data.detail);
        });
   
    
};






// ==================사용 예제 ==============

// table.js
new NoticeEnv("order").receive( (payload) => {

    console.log(payload,"new 노변수");

});

// order.js 
/**
 * "new 연산자에 매개변수로 해당 노티만 받겠다."
 * 
 */
new NoticeEnv("order").receive( (payload) => {

    console.log(payload,"new 노변수 2");

});

new NoticeEnv("order").receive( (payload) => {

    console.log(payload,"new 노변수 3");

});


// pay.js
new NoticeEnv("pay").receive( (payload) => {

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
//     new Notice("order").receive( (d) => {

//         console.log(d,"new 노변수 ",ccc);
    
//     });
//     ccc--;
// }


// ==================test END==============


