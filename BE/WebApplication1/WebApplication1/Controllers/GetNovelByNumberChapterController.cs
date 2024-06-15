using ArchitectureLayer.Repositories;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class GetNovelByNumberChapterController : Controller
	{
		private IGetNovelByCriteriaRepositories repository;
		private readonly IReadDomNovelListService _readDomNovelListService;
		private readonly IHttpClientFactory _httpClientFactory;
		private readonly IReadDomGetTotalPageService _readDomGetTotalPageService;
		public GetNovelByNumberChapterController(IReadDomNovelListService readDomNovelListService
			, IHttpClientFactory httpClientFactory,
			IReadDomGetTotalPageService readDomGetTotalPageService)
		{
			_readDomGetTotalPageService = readDomGetTotalPageService;
			_readDomNovelListService = readDomNovelListService;
			_httpClientFactory = httpClientFactory;
		}
		[HttpGet]
		public async Task<IActionResult> Get([FromQuery] string href)
		{
			repository = new GetNovelByNumberChapterRepositories(_readDomNovelListService, _httpClientFactory, _readDomGetTotalPageService);
			Page page = await repository.GetNovel(href);
			return Ok(page);
		}
	}
}
