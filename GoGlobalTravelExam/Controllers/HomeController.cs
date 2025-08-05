using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Web.Mvc;
using GoGlobalTravelExam.Models;

namespace GoGlobalTravelExam.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Bookmark(GitHubRepo repo)
        {
            var bookmarks = Session["Bookmarks"] as List<GitHubRepo> ?? new List<GitHubRepo>();
            bookmarks.Add(repo);
            Session["Bookmarks"] = bookmarks;
            return Json(new { success = true });
        }

        [HttpGet]
        public ActionResult Bookmarks()
        {
            var bookmarks = Session["Bookmarks"] as List<GitHubRepo> ?? new List<GitHubRepo>();
            return View(bookmarks);
        }

        [HttpPost]
        public JsonResult SendEmail(EmailRequest request)
        {
            try
            {
                var body = $"<h3>{request.Repo.name}</h3><p>{request.Repo.html_url}</p>";
                var msg = new MailMessage("michal13951@gmail.com", request.Email)
                {
                    Subject = "GitHub Repository Info",
                    Body = body,
                    IsBodyHtml = true
                };

                var client = new SmtpClient("smtp.gmail.com")
                {
                    Credentials = new System.Net.NetworkCredential("michal13951@gmail.com", "rzyysdbymnycjmrf"),
                    Port = 587,
                    EnableSsl = true
                };

                client.Send(msg);
                return Json("Email sent successfully!");
            }
            catch (Exception ex)
            {
                return Json("Error: " + ex.Message);
            }
        }
    }
}






