using System.Collections.Generic;

namespace WebApplication1.Data
{
    public interface IPolicyRepository
    {
        IEnumerable<Policy> Get();
        Policy GetById(int policyNumber);
        IEnumerable<Policy> GetPaged(int page, int size);
        int GetTotal();
        void Add(Policy policy);
        void Update(Policy policy);
        void Remove(int policyNumber);

    }
}