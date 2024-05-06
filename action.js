const Employee = require('./employee')
const Company = require('./company')
employee = new Employee(1193, "Sam", 22)
employee2 = new Employee(1194, "Anna", 29)
employee3 = new Employee(2002, "Linda", 18)
employee4 = new Employee(2002, "Alex", 58)
employee5 = new Employee(2002, "Lee", 55)
employee6 = new Employee(2002, "Sarah", 39)
employee7 = new Employee(2002, "Briyney", 68)


company = new Company("SSI", "Alex")

company.addEmployee(employee)
company.addEmployee(employee2)
company.addEmployee(employee3)
company.addEmployee(employee4)
company.addEmployee(employee5)
company.addEmployee(employee6)
company.addEmployee(employee7)


company.getListOfEmployees()
// company.getEmployeeInforById(1193)
// company.getCompanyInfor()
// company.updateEmployeeInforById(1193, "Jisoo", 21)
// company.getEmployeeInforById(1193)

company.removeEmployeesFromAge(30)