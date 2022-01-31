namespace back_end.Models
{
    public class Address
    {
        public string? StreetAddress { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Zip { get; set; }
        public int Id { get; set; }
        public Customer? Customer { get; set; }
    }
}