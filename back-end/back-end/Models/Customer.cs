namespace back_end.Models
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string? Name { get; set; }

        public  Address? Address { get; set; }

    }
}
