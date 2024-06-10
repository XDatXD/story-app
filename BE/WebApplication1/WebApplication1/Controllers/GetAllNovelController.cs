using DomainLayer.Entities;
using DomainLayer.Interfaces;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class GetAllNovelController : Controller
	{
		private readonly IGetAllRepositories getAllRepositories; 

		public GetAllNovelController(IGetAllRepositories _getAllRepositories)
		{
			getAllRepositories = _getAllRepositories;
		}
		[HttpGet]
		public async Task<IActionResult> GetAsync([FromQuery] string href = "https://truyenfull.vn/ajax.php?type=hot_select&id=1")
		{
			Page page = await getAllRepositories.GetAllAsync(href);
			return Ok(page);
		}
	}
}
