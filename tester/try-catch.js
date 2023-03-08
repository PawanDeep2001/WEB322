const name='Pawan'
try {
    name='Angelo'
} catch (error) {
    console.log(' The error that occours here is ', error.message)
}finally{
    console.log('Run this either way!!!')
}
console.log('Final value of name is ', name)