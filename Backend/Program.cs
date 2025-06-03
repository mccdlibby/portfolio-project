namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Initialize a web application builder with command-line args
            var builder = WebApplication.CreateBuilder(args);

            // Configure CORS to allow frontend requests from specified origin
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173")
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });

            // Register controller services (API endpoints)
            builder.Services.AddControllers();

            // Enables minimal API endpoint discovery
            builder.Services.AddEndpointsApiExplorer();

            // Enables Swagger/OpenAPI generation for API documentation
            builder.Services.AddSwaggerGen();

            // Build the configured app
            var app = builder.Build();

            // Enable Swagger only in development environment
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Redirect all HTTP requests to HTTPS
            app.UseHttpsRedirection();

            // Apply authorization middleware (optional if no auth is configured yet)
            app.UseAuthorization();

            // Apply the CORS policy defined above
            app.UseCors("AllowFrontend");

            // Maps controller routes (e.g., /api/projects)
            app.MapControllers();

            // Start the web application
            app.Run();
        }
    }
}