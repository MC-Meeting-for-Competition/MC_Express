const delay = (durationMs) => {
    return new Promise(resolve => setTimeout(resolve, durationMs));
}

// 자바스크립트는 기본적으로 비동기로 동작한다.
function async_task() {
    console.log("1");
    delay(2000).then(() => {
        console.log("done!");
    });
    console.log("2");
    console.log("3");
}


// 비동기적인 함수를 동기적으로 만드려면? async - await 키워드를 쓴다.
async function sync_task() {
    console.log("1");
    await delay(2000).then(() => {
        console.log("done!");
    });
    console.log("2");
    console.log("3");
}

// sync_task();

/**
 * Promise는 자바스크립트 비동기 처리에 사용되며
 * 예시로, 서버에서 데이터를 모두 받아온 후에 동작하도록 할 때 사용된다.
 * 
 * 콜백 함수를 대체하고, 비동기 작업의 흐름을 개발자가 쉽게 컨트롤할 수 있도록 사용하는 게 Promise
 */
// function taskIncrease(number, callback) {
//     setTimeout(() => {
//         const increasedNumber = number + 1;
//         console.log(increasedNumber);
//         if (callback) {
//             callback(increasedNumber);
//         }
//     }, 1000);
// }

// taskIncrease(0, n => {
//     taskIncrease(n, n => {
//         taskIncrease(n, n => {
//             taskIncrease(n, n => {
//                 console.log("Done");
//             })
//         })
//     })
// })

function taskPromiseIncrease(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const increasedNumber = n + 1;
            console.log(increasedNumber);

            // if (increasedNumber >= 5) {
            //     reject("Number is too big");
            // } else {
            //     resolve(increasedNumber);
            // }
            resolve(increasedNumber);
        }, 1000);
    })
}


taskPromiseIncrease(0)
    .then(n => taskPromiseIncrease(n))
    .then(n => taskPromiseIncrease(n))
    .then(n => taskPromiseIncrease(n))
    .then(n => taskPromiseIncrease(n))
    .catch((err) => console.error(err))
    .finally(() => {
        console.log("counting is done!");
    });

// const failPromise = new Promise((resolve, reject) => {
//     const data = fetch("http://localhost:3000");

//     if (data) {
//         resolve(data); // 비동기 로직이 성공하면 resolve 를 실행
//     } else {
//         reject("Error"); // 비동기 로직이 실패하면 reject 를 실행해서 비동기 로직이 실패함을 알려줌
//     }
// })
