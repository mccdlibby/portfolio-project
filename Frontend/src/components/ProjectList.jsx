// Import hooks and animation utilities
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function to return color styles based on tech name
function getTechColor(tech) {
  switch (tech.toLowerCase()) {
    case 'react': return 'bg-blue-100 text-blue-800';
    case 'tailwind': return 'bg-teal-100 text-teal-800';
    case 'asp.net core':
    case 'c#': return 'bg-purple-100 text-purple-800';
    case 'python': return 'bg-yellow-100 text-yellow-800';
    case 'django': return 'bg-green-100 text-green-800';
    case 'javascript': return 'bg-yellow-200 text-yellow-900';
    case 'html': return 'bg-red-100 text-red-800';
    case 'css': return 'bg-indigo-100 text-indigo-800';
    case 'sqlite': return 'bg-gray-300 text-gray-900';
    case '.net': return 'bg-blue-200 text-blue-900';
    case 'winforms': return 'bg-orange-100 text-orange-800';
    case 'windows': return 'bg-sky-100 text-sky-800';
    default: return 'bg-gray-200 text-gray-800'; // Fallback style
  }
}

// Helper function to return tooltip descriptions for each tech
function getTooltipText(tech) {
  switch (tech.toLowerCase()) {
    case 'react': return 'A JavaScript library for building UIs';
    case 'tailwind': return 'Utility-first CSS framework';
    case 'asp.net core': return 'Cross-platform web framework';
    case 'c#': return 'Modern object-oriented language';
    case 'python': return 'Versatile high-level language';
    case 'django': return 'High-level Python web framework';
    case 'javascript': return 'Language for web development';
    case 'html': return 'Markup language for documents';
    case 'css': return 'Style sheet language';
    case 'sqlite': return 'Lightweight SQL database';
    case '.net': return 'Microsoft development platform';
    case 'winforms': return 'Windows desktop UI framework';
    case 'windows': return 'Microsoft operating system';
    default: return 'Technology tag'; // Default fallback description
  }
}

// TechBadge renders a stylized label for each technology with a hover tooltip
function TechBadge({ tech }) {
  const [showTooltip, setShowTooltip] = useState(false); // Track tooltip visibility

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTechColor(tech)}`}>
        {tech}
      </span>
      {showTooltip && (
        <div className="absolute bottom-full mb-1 px-2 py-1 bg-black text-white text-xs rounded shadow-lg z-10 whitespace-nowrap">
          {getTooltipText(tech)}
        </div>
      )}
    </div>
  );
}

// ProjectList component fetches and displays a list of projects with pagination and animations
function ProjectList() {
  const [projects, setProjects] = useState([]); // Fetched project data
  const [selectedProject, setSelectedProject] = useState(null); // Currently selected project
  const [currentPage, setCurrentPage] = useState(1); // Track active page
  const projectsPerPage = 3; // Number of projects to show per page
  const [activeTab, setActiveTab] = useState('Overview'); // Active tab in modal

  // Fetch project data from the backend API once on mount
  useEffect(() => {
    fetch("https://portfolio-project-vtl0.onrender.com/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // Determine the slice of projects to show for current pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // Handle pagination logic
  const paginate = (direction) => {
    if (direction === 'next' && indexOfLastProject < projects.length) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-8">
          <AnimatePresence>
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1)',
                  transition: { duration: 0.3 },
                }}
                className={`relative p-4 rounded-lg cursor-pointer bg-white text-black transition-shadow duration-300 ${
                  project.featured
                    ? 'ring-2 ring-yellow-400 shadow-yellow-300 hover:shadow-yellow-400'
                    : ''
                }`}
                onClick={() => setSelectedProject(project)}
              >
                {/* Display a featured label if the project is marked as featured */}
                {project.featured && (
                  <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    🌟 Featured
                  </span>
                )}
                {/* Display project image if available */}
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                )}
                <h2 className="text-lg font-bold">{project.title}</h2>
                <p>{project.description}</p>

                {/* Render technology badges for each tech in the project */}
                {project.techStack && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.techStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Pagination controls for browsing through project pages */}
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => paginate('prev')}
            disabled={currentPage === 1} // Disable if already on the first page
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-800'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => paginate('next')}
            disabled={indexOfLastProject >= projects.length} // Disable if no more pages
            className={`px-4 py-2 rounded ${
              indexOfLastProject >= projects.length
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-800'
            }`}
          >
            Next
          </button>
        </div>

        {/* "About Me" section with career timeline and summary */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <div className="bg-white text-black p-6 rounded-xl shadow-md">
            <p className="mb-4">
              Driven developer with hands-on experience in full-stack web applications, data
              processing pipelines, and backend architecture. Applies strong attention to detail
              and time management to build clean, maintainable code. Quick to learn new tools
              and technologies, with a focus on usability, performance, and solving real-world
              problems. Excels in collaborative environments and values clear communication and 
              continuous improvement.
            </p>
            {/* Career and education timeline */}
            <ul className="list-disc list-inside space-y-2">
              <li>2013 - Started Bachelor's degree in Computer Science</li>
              <li>2015 - Left college due to needing a spinal fusion </li>
              <li>2022 - Returned to college after getting a spinal fusion</li>
              <li>2023 - Built academic and personal projects using Python, Java, C#, SQL, and other technologies</li>
              <li>2024 - Built a book review platform and a warehouse system</li>
              <li>2025 - Graduated; currently seeking a full-time software development role</li>
            </ul>
          </div>

          {/* Link to download resume as a PDF */}
          <div className="mt-8">
            <a
              href="/files/McCadeLibbyResume.pdf"
              download
              className="inline-block px-6 py-3 bg-gray-600 text-white font-semibold rounded hover:bg-gray-800"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
      {/* Modal overlay for displaying selected project details */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[4px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)} // Clicking outside the modal closes it
        >
          <motion.div
            className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-6 max-w-lg w-full relative text-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to close handler
          >
            {/* Close button in top-right corner */}
            <button
              className="absolute top-2 right-3 text-white/70 hover:text-white text-xl font-bold"
              onClick={() => setSelectedProject(null)}
            >
              &times;
            </button>

            {/* Project image preview */}
            {selectedProject.imageUrl && (
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            {/* Project title */}
            <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>

            {/* Display tech stack badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.techStack.map((tech, index) => (
                <TechBadge key={index} tech={tech} />
              ))}
            </div>

            {/* Tabbed navigation for different content views */}
            <div className="mb-4 border-b border-gray-300">
              <nav className="flex space-x-4">
                {['Overview', 'Challenges', 'Outcomes'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-3 font-medium text-sm rounded-t ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-200 bg-gray-600 hover:bg-gray-500'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Dynamic tab content based on selected tab */}
            <div className="text-sm">
              {activeTab === 'Overview' && (
                <p>
                  This portfolio site was built with React and Tailwind CSS for a responsive and clean interface. ASP.NET Core powers the backend API that delivers project data.
                </p>
              )}
              {activeTab === 'Challenges' && (
                <p>
                  One key challenge was implementing framer-motion animations without creating rendering artifacts. Another was maintaining responsiveness across viewports.
                </p>
              )}
              {activeTab === 'Outcomes' && (
                <p>
                  The site showcases software projects with modal previews, fade-in animations, paginated views, and dynamic tech stack styling.
                </p>
              )}
            </div>

            {/* External links for repo and live site */}
            <div className="flex gap-4 text-sm text-white underline mt-4">
              {selectedProject.repoUrl && (
                <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer">
                  View Repo
                </a>
              )}
              {selectedProject.liveUrl && (
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live Site
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// Export the component to be used in the app
export default ProjectList;
