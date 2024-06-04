using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class GetContentChapterController : Controller
	{
		private readonly IGetContentChapterRepositories getContentChapterRepositories;
		public GetContentChapterController(IGetContentChapterRepositories _getContentChapterRepositories)
		{
			getContentChapterRepositories = _getContentChapterRepositories;
		}
		[HttpGet]
		public async Task<IActionResult> GetContentChapter([FromQuery]string href)
		{
			ContentChapter content = await getContentChapterRepositories.GetContentChapter(href);
			return Ok(content);
		}
	}
}
