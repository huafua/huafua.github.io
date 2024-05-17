namespace Models;

public class Employee
{
    public Employee(string username, SalaryGetter salaryGetter, float height)
    {
        this.UserName = username;
        this.Salary = salaryGetter();
        this.Height = height;
    }

    public string UserName { get; set; }
    public int Salary { get; set; }
    public float Height { get; set; }

    public override string ToString()
    {
        return $"Employee[{this.UserName} {this.Salary} {this.Height}]";
    }
}
