using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class GetAllGenreController : Controller
	{
		private readonly IGetGenreRepositories getGenreRepositories;
		public GetAllGenreController(IGetGenreRepositories _getGenreRepositories)
		{
			getGenreRepositories = _getGenreRepositories;
		}
		[HttpGet]
		public async Task<IActionResult> Get()
		{
			string http = "https://truyenfull.vn/";
			List<Genre> genres = await getGenreRepositories.GetDetailGenre(http);
			return Ok(genres);
		}
	}
}
