
async function getTest(){

    let token = 'xhzms';
    let url = `https://myurl/gettest`;
    try {

        await fetch(url,{
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }).then((data)=>{
            console.log(data);
        })

    } catch (error) {
        console.log(error)
    }
}   

async function test2 (){
    let token = 'xhzms';
    let url = `https://myurl/gettest`;


    let response = await fetch(url,{
        method : "GET",
        headers : {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    })
    
    
    response.then((data)=>{
        console.log(data);
    })

}




