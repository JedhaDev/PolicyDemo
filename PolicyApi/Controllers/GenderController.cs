using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenderController : ControllerBase
    {

        [HttpGet]
        public List<Gender> GetGenders()
        {
            List<Gender> genders = new List<Gender>();
            foreach (Gender gender in Enum.GetValues(typeof(Gender)))
            {
                genders.Add(gender);
            }
            return genders;
        }
    }
}