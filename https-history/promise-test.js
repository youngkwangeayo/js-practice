async function promiseTest () {

    return new Promise (function (resolve, reject) {

        console.log("someTing TODO");
        resolve("ok")

    });
};



function promiseTest2 () {

    new Promise((resolve, reject) => {
        document.addEventListener("DOMContentLoaded", function() {
            resolve();
        });
    }).then(() => {
        console.log("ok");
    });


};


