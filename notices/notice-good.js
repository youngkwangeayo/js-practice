/**
 * @param {string} targetNoticeId'ORDER'   Snake Case 
 * @example new Notice("ORDER", (payload) => { console.log(payload,"new 노변수"); }); 
 * @example new Notice("ORDER").setReceive( (payload) => { console.log(payload,"체인함수 호출"); }); 
 * 
 */
class Notice {

    static #listener = false; //  노티받는 메세지 리스너 등록 여부. 
    static targetIdCallbackGroup = {}; // 타겟노티ID 의 콜백 그룹


    constructor(targetNoticeId, noticeReceiveCallback) {

        this.targetNoticeId = targetNoticeId; //   Snake Case  : 'ORDER' 대한 노티만 받겠다라는 타겟노티아이디

        if (Notice.#listener == false) { //1번만 리스너 등록
            this.#registerNoticeMessageEvent();
        }

        Notice.#listener = true;

        if (Notice.targetIdCallbackGroup[this.targetNoticeId] == undefined) { // 타겟아이디의 콜백 그룹이 없으면 생성
            Notice.targetIdCallbackGroup[this.targetNoticeId] = [];

        };

        if (noticeReceiveCallback != undefined) {  //new 연산자에 매게변수로 callback 함수를 넣으면 콜백그룹에 추가
            Notice.targetIdCallbackGroup[this.targetNoticeId].push(noticeReceiveCallback);
        };

    };


    #registerNoticeMessageEvent() {  // 노티 리스너 초기화 1번만 등록시키고 실수로 재생성 못하게  프라이빗메소드 설정

        window.addEventListener("message", (event) => { // 리스너 등록
            if (event.data && event.data.source === 'react-devtools-content-script') return; //리액트 디버깅 쓰는사람은 무한 호출됨.

            if (event.data.cmd != "NOTICE") return;  // command(cmd) 가 노티일시만


            let targetNoticeId;
            let payload;

            try {   //데이터 치환
                targetNoticeId = event.data.target_notice_id;
                payload = event.data.payload;
            } catch (error) {
                console.log("no Notice Form");
            };

            try {   //해당 타겟 id 의 콜백그룹 호출
                this.#callTargetIDCallbackGroup(targetNoticeId, payload);
            } catch (error) {
                console.log(error);
            };

        });

    };

    // 노티 타겟그룹  리시브 콜백 호출
    #callTargetIDCallbackGroup(targetNoticeId, payload) {

        if (!targetNoticeId) {
            //추후 로그 저장, app 호출, 슬랙대화방 호출 등등 조치 하기.
            console.log("command (cmd) 안내려옴.");
            return;
        };

        Notice.targetIdCallbackGroup[targetNoticeId].forEach( (noticeReceiveCallback) => {
            try {
                noticeReceiveCallback(payload);
            } catch (error) {
                console.log("notice Receive Callback error", error);
            }
        });
    };


};



/**
 * new 연산시 매게변수로 콜백 안넣고 쓸때
 * 노티 리시브 받는 콜백 함수 등록.
 * 
 * @param {function} noticeReceiveCallback 
 */
Notice.prototype.setReceive = function (noticeReceiveCallback) {

    if (!noticeReceiveCallback) throw new Error(" 콜백함수는 필수입니다.");
    if (typeof (noticeReceiveCallback) != "function") throw new Error(" 콜백함수는 함수여야 합니다.");

    let targetNoticeId = this.targetNoticeId;
    Notice.targetIdCallbackGroup[targetNoticeId].push(noticeReceiveCallback);

};





/* ==================사용 예제 및 테스트 ============================  주석 컨트롤+/ 누르면 예제활성화


//==============셀프 노티 전송 테스트 

function sendNoticeTest(target_notice_id, payload) {

    let noticeForm = {
        cmd: "NOTICE",
        target_notice_id: target_notice_id,
        payload: payload
    }

    window.postMessage(noticeForm);
}



// ================== 예제 sample

// setTiemout 함수처럼 생성과 동시에 사용.
new Notice("ORDER", (payload) => {

    console.log(payload, "생성자에 콜백");
});


// 체인 함수 형식 호출
new Notice("ORDER").setReceive((payload) => {
    
    console.log(payload, "체인함수 호출");
});



// 클래스 생성후 함수 사용
let sampleNotice = new Notice("ORDER");
sampleNotice.setReceive((payload) => {

    console.log(payload, "new 연산 후 setReceive 호출");
});



// ==================test 인스턴스 5000개 및 await ==============

// let ccc = 5000;
// while(ccc > 0){

//     if (ccc < 1500) {
//         new Notice("ORDER").setReceive( (payload) => {
//             console.log(payload,"채인함수 생성");
//         });

//     } else if (ccc < 3500){
//         new Notice("ORDER", (payload) => {
//             console.log(payload,"new 생성과 동시 ");
//         })
//     }else {
//         let newnotice = new Notice("ORDER");
//         newnotice.setReceive( (payload) => {
//             console.log(payload,"new 연산 후 recevice 호출");
//         });
//     }
//     if(ccc == 1){
//         console.log("생성끝");
//     }
//     ccc--;
// }


// ==================test END=============  */


