using DomainLayer.Entities;
using DomainLayer.Interfaces;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ArchitectureLayer.Repositories
{
	public class GetNumberChapterOfNovelRepositories : IGetNumberChapterOfNovelRepositories
	{
		private readonly IReadDomGetTotalPageService _readDomGetTotalPageService;
		private readonly IReadDomGetListChapterService _readDomGetListChapterService;
		private readonly IHttpClientFactory _httpClientFactory;

		public GetNumberChapterOfNovelRepositories(IReadDomGetTotalPageService readDomGetTotalPageService,
			IReadDomGetListChapterService readDomGetListChapterService,
			IHttpClientFactory httpClientFactory)
		{
			_readDomGetTotalPageService = readDomGetTotalPageService;
			_readDomGetListChapterService = readDomGetListChapterService;
			_httpClientFactory = httpClientFactory;
		}

		public async Task<int> GetNumberChapterOfNovel(string href )
		{
			List<ContentChapter> chapters = new List<ContentChapter>();
			var request = new HttpRequestMessage(HttpMethod.Get, href);
			var client = _httpClientFactory.CreateClient();
			var response = await client.SendAsync(request);
			int totalChapter = 0;
			if (response.IsSuccessStatusCode)
			{
				var html = await response.Content.ReadAsStringAsync();
				var htmlDocument = new HtmlDocument();
				htmlDocument.LoadHtml(html);
				List<string> listPages = _readDomGetTotalPageService.GetTotalPage(htmlDocument, href);
				foreach(var item in listPages)
				{
					List<ContentChapter> list = await _readDomGetListChapterService.ReadDomGetListChapterAsync(item);
					totalChapter += list.Count;
				}
			}
			return totalChapter;
		}
	}
}
