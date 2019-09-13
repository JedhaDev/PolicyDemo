using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Extensions;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class PolicyController : Controller
    {
        private readonly IPolicyRepository _policyRepository;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="policyRepository"></param>
        public PolicyController(IPolicyRepository policyRepository)
        {
            _policyRepository = policyRepository;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_policyRepository.Get());
        }

        /// <summary>
        /// GET api/values
        /// </summary>
        /// <returns></returns>
        [HttpGet("total/", Name = "GetTotal")]
        public IActionResult GetTotal()
        {
            try
            {

                return Ok(_policyRepository.GetTotal());

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// GET api/values
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [HttpGet("paged/{pageNumber}/{pageSize}", Name = "GetAllPaged")]
        public IActionResult GetAllPaged(int pageNumber = 1, int pageSize = 10)
        {
            try
            {

                return Ok(_policyRepository.GetPaged(pageNumber, pageSize));

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("details/{policyNumber}", Name = "GetDetails")]
        public IActionResult GetDetails(int policyNumber)
        {
            try
            {
                var dbPolicy = _policyRepository.GetById(policyNumber);
                if (dbPolicy.IsObjectNull())
                {
                    return BadRequest("Policy number not exists");
                } else
                {
                    return Ok(dbPolicy);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="policy"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Add([FromBody]Policy policy)
        {
            try
            {
                if (policy.IsObjectNull())
                {
                    return BadRequest("Policy object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                var dbPolicy = _policyRepository.GetById(policy.PolicyNumber);
                if (dbPolicy.IsObjectNull() == false)
                {
                    return BadRequest("Policy number already exists");
                }

                _policyRepository.Add(policy);

                return CreatedAtRoute("GetDetails", new { policyNumber = policy.PolicyNumber }, policy);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="policy"></param>
        /// <returns></returns>
        [HttpPut]
        public IActionResult Update([FromBody]Policy policy)
        {
            try
            {
                if (policy.IsObjectNull())
                {
                    return BadRequest("Policy object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                var dbPolicy = _policyRepository.GetById(policy.PolicyNumber);
                if (dbPolicy.IsObjectNull())
                {
                    return NotFound();
                }

                _policyRepository.Update(policy);

                return CreatedAtRoute("GetDetails", new { policyNumber = policy.PolicyNumber }, policy);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="policyNumber"></param>
        /// <returns></returns>
        [HttpDelete("{policyNumber}")]
        public IActionResult Remove(int policyNumber)
        {
            try
            {
                var policy = _policyRepository.GetById(policyNumber);
                if (policy.IsObjectNull())
                {
                    return NotFound();
                }

                _policyRepository.Remove(policyNumber);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
