class Student{
    //properties:values
    name =''
    age= 0
    semester=3 
    //constructor
    constructor(sName='', sAge=0){
        this.name=sName
        this.age=sAge
    }
    //methods
    setName(newName){this.name=newName};
    setAge(newAge){this.age=newAge};

    getName(){console.log('The name is ', this.name)}
    getAge(){console.log('The age is ', this.age)}
}

var student1=new Student('Pawan Deep', 21)
var student2=new Student('Angelo', 30)

student1.getName()
student1.getAge()
student1.setAge(25)
student1.getAge()
student2.getName()
student2.getAge()

