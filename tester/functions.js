function student(sName, sAge){
    this.name=sName
    this.age=sAge
}

//setters
student.prototype.setName=function(newName){
    this.name=newName
}

//getters
student.prototype.getAge=function(){
    console.log('THe age is ', this.age)
}

//instances
var student1=new student('Angelo', 21)
console.log(student1.name)
student1.getAge()
student1.setName('Pawan Deep')
console.log(student1.name)