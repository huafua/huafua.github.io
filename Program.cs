using Models;

namespace q;

public class Program
{
    public static void Main()
    {
        Console.WriteLine(new Employee("Alice", () => 100, 178).ToString());
    }
}