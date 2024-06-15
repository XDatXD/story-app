using ArchitectureLayer.Repositories;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class GetNovelByGenreController : Controller
	{
		private IGetNovelByCriteriaRepositories repository;
		private readonly IReadDomNovelListService _readDomNovelListService;
		private readonly IHttpClientFactory _httpClientFactory;
		private readonly IReadDomGetTotalPageService _readDomGetTotalPageService;
		public GetNovelByGenreController(IReadDomNovelListService readDomNovelListService
			, IHttpClientFactory httpClientFactory, 
			IReadDomGetTotalPageService readDomGetTotalPageService
			, GetNovelByGenreRepositories getNovelByGenreRepositories)
		{
			_readDomGetTotalPageService = readDomGetTotalPageService;
			_readDomNovelListService = readDomNovelListService;
			_httpClientFactory = httpClientFactory;
			repository = getNovelByGenreRepositories;
		}
		[HttpGet]
		public async Task<IActionResult> Get([FromQuery]string href)
		{
			//repository = new GetNovelByGenreRepositories(_readDomNovelListService, _httpClientFactory, _readDomGetTotalPageService);
			Page list = await repository.GetNovel(href);
			return Ok(list);
		}
	}
}
