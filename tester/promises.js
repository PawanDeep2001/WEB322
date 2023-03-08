function A(result){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('Run function A after 0 seconds')
            resolve("outputA() complete")
        }, 0)
    })
}

function B(result){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('Run function B after 3 seconds')
            resolve("outputB() complete")
        }, 3000)
    })
}

function C(result){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('Run function C after 7 seconds')
            resolve("outputC() complete")
        }, 7000)
    })
}

A()
.then(B)
.then(C)
.catch((error)=>{
    console.log(error)
})