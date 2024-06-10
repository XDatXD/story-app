using DomainLayer.Entities;
using DomainLayer.Interfaces;
using HtmlAgilityPack;
namespace ArchitectureLayer.Repositories
{
	public class GetNovelByGenreRepositories : IGetNovelByGenreRepositories
	{
		private readonly IReadDomNovelListService _readDomNovelListService;
		private readonly IHttpClientFactory _httpClientFactory;
		private readonly IReadDomGetTotalPageService _readDomGetTotalPageService;
		public GetNovelByGenreRepositories(IReadDomNovelListService readDomNovelListService
			, IHttpClientFactory httpClientFactory, IReadDomGetTotalPageService readDomGetTotalPageService)
		{
			_readDomNovelListService = readDomNovelListService;
			_httpClientFactory = httpClientFactory;
			_readDomGetTotalPageService = readDomGetTotalPageService;
		}
		public async Task<Page> GetNovelByGenre(string href)
		{
			var request = new HttpRequestMessage(HttpMethod.Get, href);
			var client = _httpClientFactory.CreateClient();
			var response = await client.SendAsync(request);
			string templateString = "https://truyenfull.vn/the-loai/quan-truong/";
			List<Novel> novels = new List<Novel>();
			List<string> listString = new List<string>();
			if (response.IsSuccessStatusCode)
			{
				var html = await response.Content.ReadAsStringAsync();
				var htmlDocument = new HtmlDocument();
				htmlDocument.LoadHtml(html);
				novels = await _readDomNovelListService.ReadDomNovelListVersion1(htmlDocument);
				int count_1 = href.Split('/').Length;
				int count_2 = templateString.Split('/').Length;
				if (count_1 == count_2)
				{
					listString = _readDomGetTotalPageService.GetTotalPage(htmlDocument, href);
				}
			}
			return new Page()
			{
				Novels = novels,
				listPage = listString
			};
		}
	}
}
