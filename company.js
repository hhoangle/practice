const Employee = require('./employee')
module.exports = class Company {
    constructor(companyName, companyDirector) {
        this.companyName = companyName;
        this.companyDirectory = companyDirector
        this.employeeList = []
    }

    getCompanyInfor() {
        console.log("Company name: " + this.companyName)
    }

    addEmployee(employee) {
        this.employeeList.push(employee)
    }

    removeEmployeeById(id) {
        const index = this.employeeList.findIndex(employee => employee.id === id)
        if (index !== -1) {
            this.employeeList.splice(index, 1)
            console.log("Employee with ID " + id + " has been removed")
        }
    }

    removeEmployeeByName(name) {
        const index = this.employeeList.findIndex(employee => employee.name === name)
        if (index !== -1) {
            this.employeeList.splice(index, 1)
            console.log("Employee with Name " + name + " has been removed")
        }
    }

    getListOfEmployees() {
        console.log(this.employeeList)
        console.log("Số lượng nhân viên còn lại là " + this.employeeList.length)
    }

    getEmployeeInforById(employeeId) {
        const employee = this.employeeList.find(emp => emp.id === employeeId)
        if (employee) {
            employee.getInfor()
        }
    }

    updateEmployeeInforById(employeeId, newName, newAge) {
        const employee = this.employeeList.find(emp => emp.id === employeeId);
        if(employee){
            employee.name = newName
            employee.age = newAge

        }
        console.log(`Employee with ID ${employeeId} has been updated`)
    }
    removeEmployeesFromAge(uselessAge){
        let employeeListAfterRemove = this.employeeList.filter(employee => employee.age < uselessAge)
        console.log("Danh sách nhân viên sau khi remove ", employeeListAfterRemove)
    }
}