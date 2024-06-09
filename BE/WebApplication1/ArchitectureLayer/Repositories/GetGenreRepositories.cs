using DomainLayer.Entities;
using DomainLayer.Interfaces;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using static System.Net.WebRequestMethods;

namespace ArchitectureLayer.Repositories
{
	public class GetGenreRepositories : IGetGenreRepositories
	{
		private readonly IHttpClientFactory _clientFactory;
		public GetGenreRepositories(IHttpClientFactory httpClientFactory)
		{
			_clientFactory = httpClientFactory;
		}

		public async Task<List<string>> GetGenreAsync(string href)
		{
			// Extract all links
			var request = new HttpRequestMessage(HttpMethod.Get, href);
			var client = _clientFactory.CreateClient();

			var response = await client.SendAsync(request);
			List<string> list = new List<string>();
			if (response.IsSuccessStatusCode)
			{
				var html = await response.Content.ReadAsStringAsync();
				var htmlDocument = new HtmlDocument();
				htmlDocument.LoadHtml(html);
				var hotSelect = htmlDocument.DocumentNode.SelectSingleNode("//*[@id='hot-select']");
				string[] temp = { "16", "14" };
				if (hotSelect != null)
				{
					var optionInHotSelect = hotSelect.SelectNodes(".//option");
					if (optionInHotSelect != null)
					{
						foreach (var optionNode in optionInHotSelect)
						{
							var value = optionNode.GetAttributeValue("value", string.Empty);
							var text = optionNode.InnerText.Trim();
							if(temp.Contains(value))
							{
								continue;
							}
							list.Add(href = "https://truyenfull.vn/ajax.php?type=hot_select&id="+value);
						}
					}
				}
			}
			return list;
		}

		public async  Task<List<Genre>> GetDetailGenre(string href)
		{
			var request = new HttpRequestMessage(HttpMethod.Get, href);
			var client = _clientFactory.CreateClient();

			var response = await client.SendAsync(request);
			var list = new List<Genre>();

			if (response.IsSuccessStatusCode)
			{
				var html = await response.Content.ReadAsStringAsync();
				var htmlDocument = new HtmlDocument();
				htmlDocument.LoadHtml(html);

				// Extract all links
				var targetNode = htmlDocument.DocumentNode.SelectSingleNode("//ul[@class='control nav navbar-nav ']/li[2]");
				if (targetNode != null)
				{
					var listGenreNodes = targetNode.SelectNodes(".//a");
					foreach (var node in listGenreNodes)
					{
						string hrefNovel = node.GetAttributeValue("href", string.Empty);
						string nameGenre = node.InnerText.Trim();
						list.Add(new Genre()
						{
							name = nameGenre,
							href = hrefNovel,
						});
					}
				}
			}
			return list;
		}
	}
}
