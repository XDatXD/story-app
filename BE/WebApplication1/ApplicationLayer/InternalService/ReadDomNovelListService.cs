
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using HtmlAgilityPack;

namespace ApplicationLayer.InternalService
{
	public class ReadDomNovelListService : IReadDomNovelListService
    {
		private readonly IHttpClientFactory _httpClientFactory;

		public ReadDomNovelListService(IHttpClientFactory httpClientFactory)
		{
			_httpClientFactory = httpClientFactory;
		}

		public async Task<List<Novel>> ReadDomNovelListVersion1(HtmlDocument htmlDocument)
		{
			List<Novel> listNovel = new List<Novel>();
			var novelNodes = htmlDocument.DocumentNode.SelectNodes("//div[@class='row' and @itemtype='https://schema.org/Book']");
			if(novelNodes == null)
			{
				return listNovel;
			}
			foreach(var node in novelNodes )
			{
				var hrefNovelNode = node.SelectSingleNode(".//a[@itemprop='url']");
				string hrefNovel = hrefNovelNode != null ? hrefNovelNode.GetAttributeValue("href", string.Empty) : "";
				if (String.IsNullOrEmpty(hrefNovel))
				{
					continue;
				}
				string title = hrefNovelNode != null ? hrefNovelNode.GetAttributeValue("title", string.Empty): "";
				var authorNode = node.SelectSingleNode(".//span[@class='author']");
				string nameAuthor = authorNode != null ? authorNode.InnerText : "";
				string imageHref = "";
				var nodeImg = node.SelectSingleNode(".//img");
				if (nodeImg != null)
				{
					imageHref = nodeImg.GetAttributeValue("src", string.Empty);
				}
				else
				{
					imageHref = await getImage(hrefNovel);
				}
				listNovel.Add(new Novel()
				{
					href = hrefNovel,
					image = imageHref,
					title = title,
					author = new Author()
					{
						name = nameAuthor,
					}
				});
			}
			return listNovel;
		}

		public async Task<string> getImage(string url)
		{
			string srcImage = "";
			var request = new HttpRequestMessage(HttpMethod.Get, url);
			var client = _httpClientFactory.CreateClient();
			var response = await client.SendAsync(request);
			if (response.IsSuccessStatusCode)
			{
				var html = await response.Content.ReadAsStringAsync();
				var htmlDocument = new HtmlDocument();
				htmlDocument.LoadHtml(html);
				var nodeImage = htmlDocument.DocumentNode.SelectSingleNode("//img[@itemprop='image']");
				srcImage = nodeImage.GetAttributeValue("src", string.Empty);
			}
			return srcImage;
		}
	}
}
