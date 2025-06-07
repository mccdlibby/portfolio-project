using Microsoft.AspNetCore.Mvc;
using Backend.Models;

namespace Backend.Controllers
{
    // API controller for web requests
    [ApiController]
    // Sets the base route to: api/projects
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        // Handles GET requests to api/projects
        [HttpGet]
        public ActionResult<IEnumerable<Project>> GetProjects()
        {
            // Project data returned to the frontend (no database yet)
            var projects = new List<Project>
            {
                new Project
                {
                    Id = 1,
                    Title = "Portfolio Website",
                    Description = "React frontend with C# ASP.NET Core backend.",
                    ImageUrl = "/images/dash.png",
                    RepoUrl = "https://github.com/mccdlibby/portfolio-frontend",
                    LiveUrl = "",
                    TechStack = new List<string> { "React", "Tailwind", "ASP.NET Core", "C#" },
                    Featured = true
                },
                new Project
                {
                    Id = 2,
                    Title = "To-Do List (WinForms)",
                    Description = "A basic task manager with a GUI built in .NET WinForms.",
                    ImageUrl = "/images/todo.png",
                    RepoUrl = "https://github.com/mccdlibby/todo-winforms-app",
                    LiveUrl = "",
                    TechStack = new List<string> { "C#", ".NET", "WinForms", "Windows" },
                    Featured = false
                },
                new Project {
                    Id = 3,
                    Title = "Book Review Platform",
                    Description = "Full-stack Django app with user ratings and reviews.",
                    ImageUrl = "https://assets.imagineforest.com/blog/wp-content/uploads/2015/08/book_review-1024x683.jpg",
                    RepoUrl = "https://github.com/mccdlibby/book-reviews-web",
                    LiveUrl = "",
                    TechStack = new List<string> { "Python", "Django", "SQLite", "HTML", "CSS", "JavaScript" },
                    Featured = false
                },

                // Placeholder projects for potential future use
                /*
                new Project{
                    Id = 4,
                    Title = "Temp Project",
                    Description = "Temp project description.",
                    ImageUrl = "/images/foggy.png",
                    RepoUrl = "temprepourl",
                    LiveUrl = "templiveurl",
                    Featured = false
                },
                new Project{
                    Id = 5,
                    Title = "Temp Project",
                    Description = "Temp project description.",
                    ImageUrl = "/images/foggy.png",
                    RepoUrl = "temprepourl",
                    LiveUrl = "templiveurl",
                    Featured = false
                },
                new Project{
                    Id = 6,
                    Title = "Temp Project",
                    Description = "Temp project description.",
                    ImageUrl = "/images/foggy.png",
                    RepoUrl = "temprepourl",
                    LiveUrl = "templiveurl",
                    Featured = false
                }
                */
            };

            // Return the list of projects
            return Ok(projects);
        }
    }
}