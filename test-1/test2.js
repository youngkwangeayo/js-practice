class OuterClass {

    hi = "dsadas";
    message = "초기";
    constructor () {
        
        this.hi = "asdas";
    }

    someting =  ( ) => {
        console.log(this.message);
        console.log(this.hi);
    }
    

}


let out2 = new OuterClass();

OuterClass.prototype.good = () => {
    hi = "fasf";
}
let out = new OuterClass();

out.message = "변경완료";


out.someting();

out2.someting();

