class NPState {

    #handler

    constructor (targetObj) {

        this.#handler = { get : this.#get, set : this.#set }
        this.obj = new Proxy(targetObj, this.#handler);
        // this[ new Proxy(targetObj, this.#handler) ];

    }
    
    #get(target, prop, receiver){
        return target[prop];
    }

    #set(target, prop, val){
        target[prop] = val;
        // someting do
        console.log("셋 : ",val);
    }

}


// let np = new NPState(test);

// console.log(np.obj.test)
// np.obj.test ="hg"
// console.log(np.obj.test)
let testfv = {
    hd: 1
}
let testfv2 = {
    hd: 2
}

let test2 = [
    testfv,testfv2
];

// for(let obj in test2){
//     console.log(obj)
// }


let test = {
    cstr:"tt",
    carray : [1,2,3],
    conj : {
        gd:"32",
        p : [1,4,5]
    },
    test2
};


function creatObj (req) {

    let more = false;
    let moreData;
    let result;

    if ( Array.isArray(req) ) {
        result = [];
        for(let data of req) {
            result.push(data);
            if( typeof data == "object" ||  Array.isArray(data) ) {
                more = true;
                moreData = data;
            };
        }

    }else if ( typeof req == "object" ){
        result = {};
        for(let data in req) {
            
            result[data] = req[data];
            if( typeof data == "object" ||  Array.isArray(data) ){
                more = true;
                moreData = data;
            };
        }
    }else{
        result[req] = req;
    }

    if( more ){
        result[moreData] = creatObj(moreData);
    }
    return result;
}




let g = creatObj(test);

console.log(g)
console.log(g.conj.gd)
console.log(g.test2[1].hd)