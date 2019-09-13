<pre>
The solution contains a standard Asp.Net Core project with an Angular cli project. Using Visual Studio F5 will build both the server side and client side code and launch the website.

Once running the client side code (found in ClientApp/src) can be edited in Visual Studio or any other IDE (e.g. VSCode) and will be rebuilt as files are changed

There is a single server side API controller called PolicyController that has a very simple implementation of a repository for storing policies of the following format:

Each policy has the following structure and data classes are already provided:
{
	PolicyNumber: int,
	PolicyHolder: {
		Name: string,
		Age: int,
		Gender: emum
	}
}

Backend:
	language: csharp
	framework: .net core
	controllers: 
		PolicyController: CRUD operations including a Paged read to optimize reading
	unit test: Xunit using Moq for the backend PolicyController

Frontend:
	language: typescript
	framework: Angular
	components:
		home: home page
		menu: top menu
		policy-create: create a new policy window with validators
		policy-list: list all policies with a paging system
		policy-update: edit a existing policy with validators
		policy-details: show policy details
	services:
		errorhandler: catch all backend errors and display a modal window
		repository: general repository for api calls
		url: endpoint url definition global
	multi-language:
		the systems includes a multilanguage system, which you can switch between spanish and english
	unit test: using jasmine, tested CRUD operations and basics layouts.
	style: bootstrap 3.x
  </pre>
