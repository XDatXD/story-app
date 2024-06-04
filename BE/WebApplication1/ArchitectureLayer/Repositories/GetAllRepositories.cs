using DomainLayer.Entities;
using DomainLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using HtmlAgilityPack;

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

		public async Task<List<Novel>> GetAllAsync(string http)
		{
			List<Genre> listGenre = await _genreRepositories.GetGenreAsync(http);
			List<Novel> listNovel = new List<Novel>();
			foreach (Genre genre in listGenre)
			{
				string httpForm = "https://truyenfull.vn/ajax.php?type=hot_select&id=" + genre.id;
				var request = new HttpRequestMessage(HttpMethod.Get, httpForm);
				var client = _clientFactory.CreateClient();

				var response = await client.SendAsync(request);
				var linkList = new List<Novel>();
				if (response.IsSuccessStatusCode)
				{
					var html = await response.Content.ReadAsStringAsync();
					var htmlDocument = new HtmlDocument();
					htmlDocument.LoadHtml(html);
					var anchorNodes = htmlDocument.DocumentNode.SelectNodes("//a[@itemprop='url']");
					if(anchorNodes != null)
					{
						foreach (var anchorNode in anchorNodes)
						{
							string href = anchorNode.GetAttributeValue("href", string.Empty);
							var image = anchorNode.SelectSingleNode("//img");
							string title = image.GetAttributeValue("alt", string.Empty);
							string src = image.GetAttributeValue("src", string.Empty);
							listNovel.Add(new Novel()
							{
								href = href,
								title = title,
								image =	src
							});
						}
					}
				}
			}
			return listNovel;
		}
	}
}
