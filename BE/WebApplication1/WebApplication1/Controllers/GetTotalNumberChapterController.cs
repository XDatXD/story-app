using DomainLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class GetTotalNumberChapterController : Controller
	{
		private readonly IGetNumberChapterOfNovelRepositories getNumberChapterOfNovelRepositories;

		public GetTotalNumberChapterController(IGetNumberChapterOfNovelRepositories getNumberChapterOfNovelRepositories)
		{
			this.getNumberChapterOfNovelRepositories = getNumberChapterOfNovelRepositories;
		}

		[HttpGet]
		public async Task<IActionResult> Get([FromQuery] string href)
		{
			int total = await getNumberChapterOfNovelRepositories.GetNumberChapterOfNovel(href);
			return Ok(new { totalChapter = total});
		}
	}
}
