
async function getTest(){

    let token = 'xhzms';
    let url = `https://myurl/gettest`;
    try {
        let response = await fetch(url,{
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        let result =await response.json();
        console.log(result);
    } catch (error) {
        console.log(error)
    }
}   

const testObj = {
    name : "이름",
    age : 24
};


async function postTest(){

    let token = 'xhzms';
    let url = `https://myurl/posttest`;
    try {
        let response = await fetch(url,{
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify(testObj)
        })
        let result =await response.json();
        console.log(result);
    } catch (error) {
        console.log(error)
    }
}   


