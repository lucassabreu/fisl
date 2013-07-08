var Person = function(name) {
    this.name = name;
}

Person.prototype = {
    sayHello: function() {
        console.log("Hello my name is " + this.name);
    }
}

var Student = function(name) {
    Person.call(this, name);
}

Student.prototype = new Person();
Student.prototype.constructor = Student;

person = new Person("person");
student = new Student("student");

person.sayHello();
student.sayHello();

console.log("Type of student is student?: " + (student instanceof Student));