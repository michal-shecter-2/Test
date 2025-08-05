using GoGlobalTravelExam.Models;

namespace GoGlobalTravelExam.Models
{
    public class EmailRequest
    {
        public string Email { get; set; }
        public GitHubRepo Repo { get; set; }
    }
}