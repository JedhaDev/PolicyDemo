using GenFu;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Controllers;
using WebApplication1.Data;
using Xunit;

namespace WebApiTest
{
    public class ControllerTests
    {

        #region Get All Tests

        [Fact]
        public void GetAllTest()
        {
            var mockRepository = new Mock<IPolicyRepository>();

            var items = GetFakeData();
            mockRepository.Setup(x => x.Get()).Returns(items);

            var controller = new PolicyController(mockRepository.Object);
            
            var result = controller.Get();
            var okResult = result as OkObjectResult;

            // Assert
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);
           
            IEnumerable<Policy> allItems = okResult.Value as IEnumerable<Policy>;
            Assert.Equal(allItems.Count(), items.Count());
        }

        #endregion

        #region Get Paged Data Tests

        [Fact]
        public void GetPagedTest()
        {
            var mockRepository = new Mock<IPolicyRepository>();
            int page = 1;
            int pageSize = 3;
            var items = GetFakeData();
            mockRepository.Setup(x => x.GetPaged(page, pageSize)).Returns(items.Skip(page).Take(pageSize));

            var controller = new PolicyController(mockRepository.Object);

            var result = controller.GetAllPaged(page, pageSize);
            var okResult = result as OkObjectResult;

            // Assert
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);

            IEnumerable<Policy> allItems = okResult.Value as IEnumerable<Policy>;
            Assert.True(allItems.Count() == pageSize);
        }

        [Fact]
        public void GetTotal()
        {
            var mockRepository = new Mock<IPolicyRepository>();

            var items = GetFakeData();
            mockRepository.Setup(x => x.GetTotal()).Returns(items.Count());

            var controller = new PolicyController(mockRepository.Object);

            var result = controller.GetTotal();
            var okResult = result as OkObjectResult;

            // Assert
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);

            int total = Convert.ToInt32(okResult.Value);
            Assert.True(total == items.Count());
        }

        #endregion

        #region Get Single Item

        [Fact]
        public void GetByIdTest()
        {
            var mockRepository = new Mock<IPolicyRepository>();

            var items = GetFakeData();
            mockRepository.Setup(x => x.GetById(1)).Returns(items.First());

            var controller = new PolicyController(mockRepository.Object);

            var result = controller.GetDetails(1);
            var okResult = result as OkObjectResult;

            // Assert
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);
            Assert.IsType<Policy>(okResult.Value);

            Policy item = okResult.Value as Policy;
            Assert.Equal(item.PolicyNumber, 1);

        }


        [Fact]
        public void GetByIdNotExistingTest()
        {
            var mockRepository = new Mock<IPolicyRepository>();

            var items = GetFakeData();
            mockRepository.Setup(x => x.GetById(-1)).Returns((Policy)null);

            var controller = new PolicyController(mockRepository.Object);

            var result = controller.GetDetails(-1);
            var badRequestResult = result as BadRequestObjectResult;

            // Assert
            Assert.NotNull(badRequestResult);
            Assert.Equal(400, badRequestResult.StatusCode);
        }

        #endregion

        #region Add Item

        [Fact]
        public void Add()
        {
            var mockRepository = new Mock<IPolicyRepository>();

            var items = GetFakeData();
            mockRepository.Setup(x => x.Add(_newPolicy));

            var controller = new PolicyController(mockRepository.Object);

            var result = controller.Add(_newPolicy);

            var createdAtRouteResult = result as CreatedAtRouteResult;

            // Assert
            Assert.NotNull(createdAtRouteResult);
            Assert.Equal(201, createdAtRouteResult.StatusCode);
            Assert.IsType<Policy>(createdAtRouteResult.Value);

            Policy item = createdAtRouteResult.Value as Policy;
            Assert.Equal(item.PolicyNumber, _newPolicy.PolicyNumber);
        }


        [Fact]
        public void AddNullPolicy()
        {
            var mockRepository = new Mock<IPolicyRepository>();

            var items = GetFakeData();
            mockRepository.Setup(x => x.Add(null));

            var controller = new PolicyController(mockRepository.Object);

            var result = controller.Add(null);

            var badRequestObjectResult = result as BadRequestObjectResult;

            // Assert
            Assert.NotNull(badRequestObjectResult);
            Assert.Equal(400, badRequestObjectResult.StatusCode);
        }

        [Fact]
        public void AddExistingPolicy()
        {
            var mockRepository = new Mock<IPolicyRepository>();

            var items = GetFakeData();
            mockRepository.Setup(x => x.Add(_existingPolicy));
            mockRepository.Setup(x => x.GetById(_existingPolicy.PolicyNumber)).Returns(_existingPolicy);

            var controller = new PolicyController(mockRepository.Object);

            var result = controller.Add(_existingPolicy);
            var badRequestObjectResult = result as BadRequestObjectResult;

            // Assert
            Assert.NotNull(badRequestObjectResult);
            Assert.Equal(400, badRequestObjectResult.StatusCode);
        }

        #endregion

        #region Update Item

        [Fact]
        public void Update()
        {
            var mockRepository = new Mock<IPolicyRepository>();

            var items = GetFakeData();
            mockRepository.Setup(x => x.Update(_existingPolicy));
            mockRepository.Setup(x => x.GetById(_existingPolicy.PolicyNumber)).Returns(_existingPolicy);

            var controller = new PolicyController(mockRepository.Object);

            var result = controller.Update(_existingPolicy);

            var createdAtRouteResult = result as CreatedAtRouteResult;

            // Assert
            Assert.NotNull(createdAtRouteResult);
            Assert.Equal(201, createdAtRouteResult.StatusCode);
            Assert.IsType<Policy>(createdAtRouteResult.Value);

            Policy item = createdAtRouteResult.Value as Policy;
            Assert.Equal(item.PolicyNumber, _existingPolicy.PolicyNumber);
        }


        [Fact]
        public void UpdateNullPolicy()
        {
            var mockRepository = new Mock<IPolicyRepository>();

            var items = GetFakeData();
            mockRepository.Setup(x => x.Add(null));

            var controller = new PolicyController(mockRepository.Object);

            var result = controller.Update(null);

            var badRequestObjectResult = result as BadRequestObjectResult;

            // Assert
            Assert.NotNull(badRequestObjectResult);
            Assert.Equal(400, badRequestObjectResult.StatusCode);
        }

        [Fact]
        public void UpdateNewPolicy()
        {
            var mockRepository = new Mock<IPolicyRepository>();

            var items = GetFakeData();
            mockRepository.Setup(x => x.Add(_newPolicy));
            mockRepository.Setup(x => x.GetById(_newPolicy.PolicyNumber)).Returns((Policy)null);

            var controller = new PolicyController(mockRepository.Object);

            var result = controller.Update(_newPolicy);
            var notFoundResult = result as NotFoundResult;

            // Assert
            Assert.NotNull(notFoundResult);
            Assert.Equal(404, notFoundResult.StatusCode);
        }

        #endregion

        #region Remove Item

        #endregion

        #region Fake Data

        /// <summary>
        /// Generates dummy data
        /// </summary>
        /// <returns></returns>
        private IEnumerable<Policy> GetFakeData()
        {
            var i = 1;
            var items = A.ListOf<Policy>(26);
            items.ForEach(x =>
            {
                x.PolicyNumber = i++;
                x.PolicyHolder = new PolicyHolder
                {
                    Name = i % 2 == 0 ? "Laura " + i : "Ricardo " + i,
                    Age = 30 + i,
                    Gender = i % 2 == 0 ? Gender.Female : Gender.Male
                };
            });
            return items;
        }

        /// <summary>
        /// New policy
        /// </summary>
        private readonly Policy _newPolicy = new Policy
        {
            PolicyNumber = 100,
            PolicyHolder = new PolicyHolder
            {
                Age = 33,
                Name = "Frank Simon",
                Gender = Gender.Male
            }
        };

        /// <summary>
        /// Existing policy
        /// </summary>
        private readonly Policy _existingPolicy = new Policy
        {
            PolicyNumber = 1,
            PolicyHolder = new PolicyHolder
            {
                Age = 33,
                Name = "Frank Simon",
                Gender = Gender.Male
            }
        };
        #endregion

    }
}
