using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class GetNovelByGenreController : Controller
	{
		public readonly IGetNovelByGenreRepositories getNovelByGenreRepositories;
		public GetNovelByGenreController(IGetNovelByGenreRepositories _getNovelByGenreRepositories)
		{
			getNovelByGenreRepositories = _getNovelByGenreRepositories;
		}

		[HttpGet]
		public async Task<IActionResult> Get([FromQuery]string href)
		{
			Page list = await getNovelByGenreRepositories.GetNovelByGenre(href);
			return Ok(list);
		}
	}
}
