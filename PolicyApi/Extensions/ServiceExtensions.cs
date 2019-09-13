using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;

namespace WebApplication1.Extensions
{
    public static class ServiceExtensions
    {
        /// <summary>
        /// add policyrepository as singleton
        /// </summary>
        /// <param name="services"></param>
        public static void AddPolicyRepository(this IServiceCollection services)
        {
            services.AddSingleton<IPolicyRepository, PolicyRepository>();
        }

        /// <summary>
        /// setup IIS configuration
        /// </summary>
        /// <param name="services"></param>
        public static void ConfigureIISIntegration(this IServiceCollection services)
        {
            services.Configure<IISOptions>(options => {

            });
        }

        /// <summary>
        /// Swagger api documentation
        /// </summary>
        /// <param name="services"></param>
        public static void ConfigureSwaggerIntegration(this IServiceCollection services)
        {
            services.AddSwaggerGen(c => {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Application API",
                    Description = "ASP.NET Core Web API"
                });
            });
        }

    }
}
