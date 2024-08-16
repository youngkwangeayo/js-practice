
const hugoName = process.env.HUGO_NAME;

const sayHugo = (say)=>{
    return `${hugoName}(hugo) Say! ${say} ho!`;
}


/**
 * 
 * @param {interger} ms million seconds 
 * @example await sleep(3000)   직렬화 대기가능
 */
const sleep = async (ms)=>{
    if(typeof ms != "number") throw new Error("s = onlny Integer");
    return new Promise(function(resolve,reject){
        setTimeout(async()=>{resolve()},ms)});
}




/**
 * 
 * @param {any} data 확인할 data 
 * @param {string} type 해당 데이터의 확인할 타입
 * @returns {boolean} 일치하면 트루 아니면 펄스
 */
const checkEffectiveness = (data,type)=>{
    const enumType = ["array","object","string","number","boolean"];

    if(data==undefined)throw new Error("data is not null");
    
    let checkType = enumType.find(e=>e == type);
    if(checkType==undefined)throw new Error("put the tpyes in array,object,string,number,boolean");


    let reqType = typeof data;
    
    if(reqType != type){
        return false;
    }else{

        if(reqType == "number"){
            if(isNaN(parseInt(data)))return false
            return true;
        }else if(reqType == "object"){
            if(Object.entries(data).length <1)return false;
            return true;
        }else if(reqType == "boolean"){
            if(isNaN(data))return false
            return true;
        }else {
            if(data.length <1)return false;
            return true;
        }
    }
    
}

module.exports = {sayHugo, sleep};