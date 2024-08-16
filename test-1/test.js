/**
 * 
 * 
 * 내부 클래스로 클래스를 만들던가
 * 내부 함수 또는 변수로 포로토타입을 만들수있지만
 * 이너클래스외부 정의, 프로토타입써서 내부 함수및 변수 외부정의는
 * 
 * 메모리 관리 - new 연산자마다 새로 생성. 외부에서 정의는 한번만 
 * 객체지향형프로그래밍에서 namespace관리 인스턴스의 통일성 (static 클래스변수,클래스함수 처럼 사용가능)
 * 
 * 
 * 
 * 
 * 
 */

// 

class OuterClass {

    static hi = "dsadas";

    constructor () {
        this.message = "아웃클래스야";
        this.hi = "asdas";
    }

    someting =  ( ) => {
        
        let d = new OuterClass.InnerClass();
        console.log(d.message);
    }
    
    static InnerClass = class {

        constructor() {
            this.message = "이너클래스야";
            
        }
    }
}

class OuterClass2 {

    hi = "dsadas";

    constructor () {
        this.message = "아웃클래스야";
        this.hi = "asdas";
    }

    someting =  ( ) => {
        
        let d = new OuterClass.InnerClass();
        console.log(d.message);
    }
    
    
}
OuterClass2.InnerClass2 = class {
    constructor() {
        this.message = "이너클래스야";
        
    }
}

let out = new OuterClass();
out.someting();

let out2 = new OuterClass();
out2.someting();

