using DomainLayer.Entities;
using DomainLayer.Interfaces;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchitectureLayer.Repositories
{
	public class GetContentChapterRepositories : IGetContentChapterRepositories
	{
		private readonly IHttpClientFactory httpClientFactory;
		public GetContentChapterRepositories(IHttpClientFactory _httpClientFactory)
		{
			httpClientFactory = _httpClientFactory;
		}

		public async Task<ContentChapter> GetContentChapter(string href)
		{
			var request = new HttpRequestMessage(HttpMethod.Get, href);
			var client = httpClientFactory.CreateClient();

			var response = await client.SendAsync(request);
			if (response.IsSuccessStatusCode)
			{
				var html = await response.Content.ReadAsStringAsync();
				var htmlDocument = new HtmlDocument();
				htmlDocument.LoadHtml(html);
				//get content
				var contentNode = htmlDocument.DocumentNode.SelectSingleNode("//*[@id='chapter-c']");
				string content = contentNode.InnerHtml;
				//get title
				var titleChapterNode = htmlDocument.DocumentNode.SelectSingleNode("//a[@class='chapter-title']");
				string title = titleChapterNode.GetAttributeValue("title", string.Empty);
				//get title of novel
				var titleNovelNode = htmlDocument.DocumentNode.SelectSingleNode("//a[@class='truyen-title']");
				string titleNovel = titleNovelNode.GetAttributeValue("title", string.Empty);	
				return new ContentChapter()
				{
					content = content,
					href = href,
					titleNovel = titleNovel,
					title = title,
				};
			}
			return new ContentChapter();
		}
	}
}
