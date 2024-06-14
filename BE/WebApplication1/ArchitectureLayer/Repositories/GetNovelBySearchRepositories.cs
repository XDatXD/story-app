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
		public async Task<List<Novel>> GetNovelBySearch(string genre, string author, string title)
		{
			List<Novel> result = new List<Novel>();
			if (!String.IsNullOrEmpty(genre))
			{
				var request = new HttpRequestMessage(HttpMethod.Get, genre);
				var client = _httpClientFactory.CreateClient();
				var response = await client.SendAsync(request);
				if (response.IsSuccessStatusCode)
				{
					var html = await response.Content.ReadAsStringAsync();
					var htmlDocument = new HtmlDocument();
					htmlDocument.LoadHtml(html);
					List<string> listPage = _readDomGetTotalPageService.GetTotalPage(htmlDocument, genre);
					foreach (var page in listPage)
					{
						var request1 = new HttpRequestMessage(HttpMethod.Get, page);
						var client1 = _httpClientFactory.CreateClient();
						var response1 = await client1.SendAsync(request1);
						if (response1.IsSuccessStatusCode)
						{
							var html1 = await response.Content.ReadAsStringAsync();
							var htmlDocument1 = new HtmlDocument();
							htmlDocument1.LoadHtml(html1);
							result.AddRange(await _readDomNovelListService.ReadDomNovelListVersion1(htmlDocument1));
						}
					}
				}
				List<Novel> filter = new List<Novel>();
				foreach (var item in result)
				{
					if(item.author.name.ToLower().Contains(author) || item.title.ToLower().Contains(title))
					{
						filter.Add(item);
					}
				}
				return filter;
			}
			else if (!String.IsNullOrEmpty(author))
			{
				string[] arrStr = author.Split(' ');
				string template = "https://truyenfull.vn/tim-kiem/?tukhoa=" + String.Join("+",arrStr);
				var request = new HttpRequestMessage(HttpMethod.Get, template);
				var client = _httpClientFactory.CreateClient();
				var response = await client.SendAsync(request);
				if (response.IsSuccessStatusCode)
				{
					var html = await response.Content.ReadAsStringAsync();
					var htmlDocument = new HtmlDocument();
					htmlDocument.LoadHtml(html);
					List<string> listPage = _readDomGetTotalPageService.GetTotalPageVersion1(htmlDocument, template);
					if(listPage.Count == 0)
					{
						result = await _readDomNovelListService.ReadDomNovelListVersion1(htmlDocument);
					}
					else
					{
						foreach (var page in listPage)
						{
							var request1 = new HttpRequestMessage(HttpMethod.Get, page);
							var client1 = _httpClientFactory.CreateClient();
							var response1 = await client1.SendAsync(request1);
							if (response1.IsSuccessStatusCode)
							{
								var html1 = await response.Content.ReadAsStringAsync();
								var htmlDocument1 = new HtmlDocument();
								htmlDocument1.LoadHtml(html1);
								result.AddRange(await _readDomNovelListService.ReadDomNovelListVersion1(htmlDocument1));
							}
						}
					}
				}
				List<Novel> filter = new List<Novel>();
				foreach(var item in result)
				{
					if(item.title.ToLower().Contains(title))
					{
						filter.Add(item);
					}
				}
				return filter;
			}
			else if(!String.IsNullOrEmpty(title))
			{
				string template = "https://truyenfull.vn/tim-kiem/?tukhoa=" + String.Join("+", title.Split(" "));
				var request = new HttpRequestMessage(HttpMethod.Get, template);
				var client = _httpClientFactory.CreateClient();
				var response = await client.SendAsync(request);
				if (response.IsSuccessStatusCode)
				{
					var html = await response.Content.ReadAsStringAsync();
					var htmlDocument = new HtmlDocument();
					htmlDocument.LoadHtml(html);
					List<string> listPage = _readDomGetTotalPageService.GetTotalPageVersion1(htmlDocument, template);
					foreach (var page in listPage)
					{
						var request1 = new HttpRequestMessage(HttpMethod.Get, page);
						var client1 = _httpClientFactory.CreateClient();
						var response1 = await client1.SendAsync(request1);
						if (response1.IsSuccessStatusCode)
						{
							var html1 = await response.Content.ReadAsStringAsync();
							var htmlDocument1 = new HtmlDocument();
							htmlDocument1.LoadHtml(html1);
							result.AddRange(await _readDomNovelListService.ReadDomNovelListVersion1(htmlDocument1));
						}
					}
				}
				return result;
			}
			return result;
		}
	}
}
