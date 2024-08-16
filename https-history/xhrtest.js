

function test1 (){
    
    let xhr = new XMLHttpRequest();
    let url = "myurl/test";
    
    xhr.open("PUT",url,true);
    xhr.setRequestHeader("Content-Type","application/json;charset=utf-8")
    xhr.send(memoInfo);
    

    xhr.onload = function(){
        console.log(this,someTIngGOOD);
    }

}

