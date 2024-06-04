using DomainLayer.Entities;
using DomainLayer.Interfaces;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

		public async Task<List<Genre>> GetGenreAsync(string http)
		{
			var request = new HttpRequestMessage(HttpMethod.Get, http);
			var client = _clientFactory.CreateClient();

			var response = await client.SendAsync(request);
			var list = new List<Genre>();

			if (response.IsSuccessStatusCode)
			{
				var html = await response.Content.ReadAsStringAsync();
				var htmlDocument = new HtmlDocument();
				htmlDocument.LoadHtml(html);

				// Extract all links
				var hotSelect = htmlDocument.DocumentNode.SelectSingleNode("//*[@id='hot-select']");

				if (hotSelect != null)
				{
					var optionInHotSelect = hotSelect.SelectNodes(".//option");
					if (optionInHotSelect != null)
					{
						foreach (var optionNode in optionInHotSelect)
						{
							var value = optionNode.GetAttributeValue("value", string.Empty);
							var text = optionNode.InnerText.Trim();
							list.Add(new Genre { id = value.Trim(), name = text });
						}
					}

				}
			}
			return list;
		}
	}
}
