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
	public class GetNovelBySearchRepositories : IGetNovelBySearchRepositories
	{
		private readonly IHttpClientFactory _httpClientFactory;
		private readonly IReadDomNovelListService _readDomNovelListService;
		private readonly IReadDomGetTotalPageService _readDomGetTotalPageService;
		public GetNovelBySearchRepositories(IHttpClientFactory httpClientFactory
			, IReadDomNovelListService readDomNovelListService, IReadDomGetTotalPageService readDomGetTotalPageService)
		{
			_httpClientFactory = httpClientFactory;
			_readDomNovelListService = readDomNovelListService;
			_readDomGetTotalPageService = readDomGetTotalPageService;
		}
		public async Task<Page> GetNovelBySearch(string href)
		{
			var request = new HttpRequestMessage(HttpMethod.Get, href);
			var client = _httpClientFactory.CreateClient();
			var response = await client.SendAsync(request);
			string templateString = "https://truyenfull.vn/tim-kiem/?tukhoa=anh";
			List<Novel> novels = new List<Novel>();
			List<string> listString = new List<string>();
			if (response.IsSuccessStatusCode)
			{
				var html = await response.Content.ReadAsStringAsync();
				var htmlDocument = new HtmlDocument();
				htmlDocument.LoadHtml(html);
				novels = await _readDomNovelListService.ReadDomNovelListVersion1(htmlDocument);
				//check href
				if(href.Split('&').Length == templateString.Split('&').Length)
				{
					listString = _readDomGetTotalPageService.GetTotalPageVersion1(htmlDocument, href);
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
