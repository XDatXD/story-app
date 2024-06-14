using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class GetAllContentChapterOfNovelController : Controller
	{
		private readonly IGetAllContentChapterOfNovelRepositories getAllContentChapterOfNovelRepositories;
		public GetAllContentChapterOfNovelController(
			IGetAllContentChapterOfNovelRepositories _getAllContentChapterOfNovelRepositories)
		{
			getAllContentChapterOfNovelRepositories = _getAllContentChapterOfNovelRepositories;
		}
		[HttpGet]
		public async Task<IActionResult> Get([FromQuery]string href)
		{
			if (string.IsNullOrEmpty(href))
			{
				return BadRequest();
			}
			Novel novel = await getAllContentChapterOfNovelRepositories.GetDetailNovel(href);
			return Ok(novel);
		}
	}
}
