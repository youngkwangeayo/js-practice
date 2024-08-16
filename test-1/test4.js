class OutClass {
    constructor ( ) {
        console.log("hello im main");
    }
}

OutClass.OtherClass = class {
    constructor () {
        console.log("hello im Other");
    }
}

new OutClass.OtherClass();
// OutClass.