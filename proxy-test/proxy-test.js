let target = {
    targetName : "hello",
    test : "test"
};

let handler = {
    get(target, prop, receiver){
        return target[prop];
    },
    set(target, prop, val){
        target[prop] = val;
        console.log("셋 : ",val);
    }
};

let proxy = new Proxy(target,handler);


proxy.targetName = "chang";

console.log(proxy.targetName);


// setTimeout( () => {
//     console.log(proxy.targetName)
// }, 2000 )

// Reflect.get


