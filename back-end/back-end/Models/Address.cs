namespace back_end.Models
{
    public class Address
    {
        public int  Id { get; set; }
        public string? streetAddress { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }

        public string? Zip { get; set; }

        public int CustomerId { get; set; }
    }
}
