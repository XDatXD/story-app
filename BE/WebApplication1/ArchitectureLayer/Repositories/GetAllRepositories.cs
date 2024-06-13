using DomainLayer.Entities;
using DomainLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using HtmlAgilityPack;
using System.Net.Http;

namespace ArchitectureLayer.Repositories
{
	public class GetAllRepositories : IGetAllRepositories
	{
		private readonly IHttpClientFactory _clientFactory;
		private readonly IGetGenreRepositories _genreRepositories;
		public GetAllRepositories(IHttpClientFactory httpClientFactory, IGetGenreRepositories getGenreRepositories)
		{
			_clientFactory = httpClientFactory;
			_genreRepositories = getGenreRepositories;
		}

		public async Task<Page> GetAllAsync(string href)
		{
			List<string> listString = new List<string>();
			if(href == "https://truyenfull.vn/ajax.php?type=hot_select&id=1")
			{
				listString = await _genreRepositories.GetGenreAsync("https://truyenfull.vn/");
			}
			var request = new HttpRequestMessage(HttpMethod.Get, href);
			var client = _clientFactory.CreateClient();

			var response = await client.SendAsync(request);
			var listNovel = new List<Novel>();
			if (response.IsSuccessStatusCode)
			{
				var html = await response.Content.ReadAsStringAsync();
				var htmlDocument = new HtmlDocument();
				htmlDocument.LoadHtml(html);
				var anchorNodes = htmlDocument.DocumentNode.SelectNodes("//a[@itemprop='url']");
				if (anchorNodes != null)
				{
					foreach (var anchorNode in anchorNodes)
					{
						string hrefNovel = anchorNode.GetAttributeValue("href", string.Empty);
						var image = anchorNode.SelectSingleNode(".//img");
						string title = image.GetAttributeValue("alt", string.Empty);
						string src = image.GetAttributeValue("src", string.Empty);
						listNovel.Add(new Novel()
						{
							href = hrefNovel,
							title = title,
							image = src
						});
					}
				}
			}

			return new Page()
			{
				Novels = listNovel,
				listPage = listString
			};
		}
	}
}
