using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class GetDetailNovelController : Controller
	{
		private readonly IGetInformationNovelRepositories getInformationNovelRepositories;
		public GetDetailNovelController(IGetInformationNovelRepositories _getInformationNovelRepositories)
		{
			getInformationNovelRepositories = _getInformationNovelRepositories;
		}

		[HttpGet]
		public async Task<IActionResult> Get([FromQuery] string href)
		{
			Novel novel = await getInformationNovelRepositories.GetDetail(href);
			return Ok(novel);
		}
	}
}
