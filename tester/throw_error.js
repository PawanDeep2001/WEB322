function divide(x,y){
    if (y===0) {
        throw new Error('Division by 0 does not work')
    }
    return x/y
}
let a=29, b=0;
try {
    c= divide(a,b)
} catch (err) {
    console.log(err.message)
}