using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data;

namespace WebApplication1.Extensions
{
    public static class PolicyExtensions
    {

        /// <summary>
        /// check for null object
        /// </summary>
        /// <param name="policy"></param>
        /// <returns></returns>
        public static bool IsObjectNull(this Policy policy)
        {
            return policy == null;
        }


    }
}
