module.exports = class Employee {
    constructor(id, name, age) {
        this.id = id
        this.name = name
        this.age = age
    }

    getInfor() {
        console.log(`Employee's ID is ${this.id}, Name is ${this.name}, Age is ${this.age}`)
    }
}