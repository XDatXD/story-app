using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class SearchController : Controller
	{
		private readonly IGetNovelBySearchRepositories getNovelBySearchRepositories;

		public SearchController(IGetNovelBySearchRepositories _getNovelBySearchRepositories)
		{
			getNovelBySearchRepositories = _getNovelBySearchRepositories;
		}

		[HttpGet]
		public async Task<IActionResult> Search([FromQuery] string href)
		{
			Page result = await getNovelBySearchRepositories.GetNovelBySearch(href);
			return Ok(result);
		}
	}
}
