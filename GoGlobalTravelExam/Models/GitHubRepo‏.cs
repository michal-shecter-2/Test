namespace GoGlobalTravelExam.Models
{
    public class GitHubRepo
    {
        public string name { get; set; }
        public string html_url { get; set; }
        public Owner owner { get; set; }
    }

    public class Owner
    {
        public string avatar_url { get; set; }
        public string login { get; set; }
    }
}