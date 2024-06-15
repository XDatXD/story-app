using ApplicationLayer.InternalService;
using ArchitectureLayer.Repositories;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class GetNovelByCriteriaController : Controller
	{
		private DependencyInversionService _dependencyInversionService;
		private readonly IReadDomNovelListService _readDomNovelListService;
		private readonly IHttpClientFactory _httpClientFactory;
		private readonly IReadDomGetTotalPageService _readDomGetTotalPageService;
		public GetNovelByCriteriaController(IReadDomNovelListService readDomNovelListService
			, IHttpClientFactory httpClientFactory,
			IReadDomGetTotalPageService readDomGetTotalPageService)
		{
			_readDomGetTotalPageService = readDomGetTotalPageService;
			_readDomNovelListService = readDomNovelListService;
			_httpClientFactory = httpClientFactory;
		}

		[HttpGet]
		public async Task<IActionResult> Get([FromQuery]string href, [FromQuery] string key = null)
		{
			if (String.IsNullOrEmpty(key))
				//api lấy tất cả truyện theo thể loại
			{
				GetNovelByGenreRepositories obj = new GetNovelByGenreRepositories(
					_readDomNovelListService, _httpClientFactory, _readDomGetTotalPageService);
				_dependencyInversionService = new DependencyInversionService(obj);
				Page page = await _dependencyInversionService.Excute(href);
				return Ok(page);
			}
			else //lấy tất cả truyện theo số chương
			{
				//chuẩn bị đối tượng
				GetNovelByNumberChapterRepositories obj = new GetNovelByNumberChapterRepositories(
					_readDomNovelListService, _httpClientFactory, _readDomGetTotalPageService);
				_dependencyInversionService = new DependencyInversionService(obj);
				Page page = await _dependencyInversionService.Excute(href);
				return Ok(page);
			}
		}
	}
}
