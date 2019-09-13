using System.Collections.Generic;
using System.Linq;

namespace WebApplication1.Data
{
    public class PolicyRepository : IPolicyRepository
    {
        private readonly IList<Policy> _policies;

        /// <summary>
        /// 
        /// </summary>
        public PolicyRepository()
        {
            _policies = new List<Policy>
            {
                new Policy
                {
                    PolicyNumber = 739562,
                    PolicyHolder = _policyHolder1
                },
                new Policy
                {
                    PolicyNumber = 383002,
                    PolicyHolder = _policyHolder1
                },
                new Policy
                {
                    PolicyNumber = 462946,
                    PolicyHolder = _policyHolder2
                },
                new Policy
                {
                    PolicyNumber = 355679,
                    PolicyHolder = _policyHolder3
                },
                new Policy
                {
                    PolicyNumber = 589881,
                    PolicyHolder = _policyHolder3
                },
                new Policy
                {
                    PolicyNumber = 998256,
                    PolicyHolder = _policyHolder3
                },
                new Policy
                {
                    PolicyNumber = 100374,
                    PolicyHolder = _policyHolder3
                }
            };
        }

        public IEnumerable<Policy> Get()
        {
            return _policies;
        }

        public Policy GetById(int policyNumber)
        {
            return _policies.SingleOrDefault(p => p.PolicyNumber == policyNumber);
        }


        public void Add(Policy policy)
        {
            _policies.Add(policy);
        }

        public void Update(Policy policy)
        {
            Remove(policy.PolicyNumber);
            _policies.Add(policy);
        }

        public void Remove(int policyNumber)
        {
            var policy = _policies.SingleOrDefault(p => p.PolicyNumber == policyNumber);

            if (policy != null)
                _policies.Remove(policy);
        }

        public IEnumerable<Policy> GetPaged(int page, int size)
        {
            var skip = (page - 1) * size;
            return _policies.Skip(skip).Take(size);
        }

        public int GetTotal()
        {
            return _policies.Count();
        }

        private readonly PolicyHolder _policyHolder1 = new PolicyHolder
        {
            Name = "Dwayne Johnson",
            Age = 44,
            Gender = Gender.Male
        };

        private readonly PolicyHolder _policyHolder2 = new PolicyHolder
        {
            Name = "John Cena",
            Age = 38,
            Gender = Gender.Male
        };

        private readonly PolicyHolder _policyHolder3 = new PolicyHolder
        {
            Name = "Trish Stratus",
            Age = 42,
            Gender = Gender.Female
        };
    }
}