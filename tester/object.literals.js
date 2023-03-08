var student = {
    //properties:values
    name: 'John Smith',
    age: 22,
    country: 'Canada',
    id:3040,

    //methods
    setAge: function(newAge){
        this.age=newAge
    },
    setCountry: function(newCountry){
        this.country=newCountry
    },
    setID: function(newID){
        this.id=newID
    },
    getName: function(){
        console.log('The student\'s name is: ', this.name)
    },
    getID: function(){
        console.log('his ID is ', this.id)
    }
} 
//create an object
var student1=Object.create(student)
var student2=Object.create(student)
student1.setID(2010)
student1.getID()
console.log('the student ID is ',student1.id)
student1.setCountry('Spain')
console.log('the student country is ',student1.country)
