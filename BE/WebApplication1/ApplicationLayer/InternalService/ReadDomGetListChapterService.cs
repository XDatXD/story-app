using DomainLayer.Entities;
using DomainLayer.Interfaces;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.InternalService
{
	public class ReadDomGetListChapterService : IReadDomGetListChapterService
	{
		private readonly IHttpClientFactory httpClientFactory;
		public ReadDomGetListChapterService(IHttpClientFactory _httpClientFactory)
		{
			httpClientFactory = _httpClientFactory;	
		}
		public async Task<List<ContentChapter>> ReadDomGetListChapterAsync(string href)
		{
			List<ContentChapter> chapters = new List<ContentChapter>();
			var request = new HttpRequestMessage(HttpMethod.Get, href);
			var client = httpClientFactory.CreateClient();
			var response = await client.SendAsync(request);
			if (response.IsSuccessStatusCode)
			{
				var html = await response.Content.ReadAsStringAsync();
				var htmlDocument = new HtmlDocument();
				htmlDocument.LoadHtml(html);
				//get title novel
				var ul = htmlDocument.DocumentNode.SelectNodes("//ul[@class='list-chapter']");
				foreach (var ulNode in ul)
				{
					var listChapter = ulNode.SelectNodes(".//a");
					foreach (var item in listChapter)
					{
						chapters.Add(new ContentChapter()
						{
							href = item.GetAttributeValue("href", string.Empty),
							title = item.GetAttributeValue("title", string.Empty),
						});
					}
				}
			}
			return chapters;
		}
	}
}
