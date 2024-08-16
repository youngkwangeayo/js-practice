
class OuterClass {

    static hi = "dsadas";

    constructor () {
        this.message = "아웃클래스야";
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


OuterClass.hi ="123";
let out = new OuterClass();
let out2 = new OuterClass();


console.log(out.hi)
console.log(out2.hi)

OuterClass.prototype.hi = "클래스 변경합니달리"


console.log(out.hi)
console.log(out2.hi)


