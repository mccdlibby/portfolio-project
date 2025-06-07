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
                    Featured = true,
                    Tabs = new Dictionary<string, string>
                    {
                        { "Overview", "This portfolio site was built with React and Tailwind CSS for a responsive and clean interface. ASP.NET Core powers the backend API that delivers project data." },
                        { "Challenges", "One key challenge was implementing framer-motion animations without creating rendering artifacts. Another was maintaining responsiveness across viewports." },
                        { "Outcomes", "The site showcases software projects with modal previews, fade-in animations, paginated views, and dynamic tech stack styling." }
                    }
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
                    Featured = false,
                    Tabs = new Dictionary<string, string>
                    {
                        { "Overview", "A Windows Forms desktop app built with C# and .NET 8.  It allows users to add tasks, optionally set due dates, and mark them complete." },
                        { "Challenges", "Handling .vs folder issues with Git and designing a clean UX for task creation and status toggling." },
                        { "Outcomes", "The app includes due date handling, completion feedback, and can be distributed as an executable or source code." }
                    }
                },
                new Project {
                    Id = 3,
                    Title = "Book Review Platform",
                    Description = "Full-stack Django app with user ratings and reviews.",
                    ImageUrl = "https://assets.imagineforest.com/blog/wp-content/uploads/2015/08/book_review-1024x683.jpg",
                    RepoUrl = "https://github.com/mccdlibby/book-reviews-web",
                    LiveUrl = "",
                    TechStack = new List<string> { "Python", "Django", "SQLite", "HTML", "CSS", "JavaScript" },
                    Featured = false,
                    Tabs = new Dictionary<string, string>
                    {
                        { "Overview", "A full-stack web application for submitting and browsing book reviews, built using Django, PostgreSQL, and Bootstrap." },
                        { "Challenges", "Implementing user authentication securely and managing relationships between users, books, and reviews." },
                        { "Outcomes", "Successfully built login systems, dynamic review pages, and CRUD operations for authenticated users." }
                    }
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