using DomainLayer.Entities;
using DomainLayer.Interfaces;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchitectureLayer.Repositories
{
	public class GetInformationNovelRepositories : IGetInformationNovelRepositories
	{
		private readonly IHttpClientFactory httpClientFactory;
		private readonly IReadDomGetTotalPageService readDomGetTotalPageService;
		private readonly IReadDomGetListChapterService readDomGetListChapterService;
		public GetInformationNovelRepositories(IHttpClientFactory _httpClientFactory, 
			IReadDomGetTotalPageService _readDomGetTotalPageService,
			IReadDomGetListChapterService _readDomGetListChapterService)
		{
			httpClientFactory = _httpClientFactory;	
			readDomGetTotalPageService = _readDomGetTotalPageService;
			readDomGetListChapterService = _readDomGetListChapterService;
		}
		public async Task<Novel> GetDetail(string href)
		{
			var request = new HttpRequestMessage(HttpMethod.Get, href);
			var client = httpClientFactory.CreateClient();
			var response = await client.SendAsync(request);
			if(response.IsSuccessStatusCode)
			{
				var html = await response.Content.ReadAsStringAsync();
				var htmlDocument = new HtmlDocument();
				htmlDocument.LoadHtml(html);
				//get title novel
				string title = htmlDocument.DocumentNode.SelectSingleNode("//h3[@class='title']").InnerText;

				//information
				var inforNode = htmlDocument.DocumentNode.SelectSingleNode("//div[@class='info']");
				var authorNode = inforNode.SelectSingleNode("//a[@itemprop='author']");
				string hrefAuthor = authorNode.GetAttributeValue("href", string.Empty);
				string nameAuthor = authorNode.GetAttributeValue("title", string.Empty);
				//get author novel
				var authorModel = new Author()
				{
					name = nameAuthor,
					href = hrefAuthor,
				};
				//get genre novel
				List<Genre> listGenre = new List<Genre>();
				var listGenreNode = inforNode.SelectNodes(".//a[@itemprop='genre']");
				foreach( var genre in listGenreNode)
				{
					listGenre.Add(new Genre()
					{
						name = genre.GetAttributeValue("title", string.Empty),
						href = genre.GetAttributeValue("href", string.Empty)
					});
				}

				//get source
				var sourceNode = inforNode.SelectSingleNode(".//span[@class='source']");
				string src = sourceNode != null ? sourceNode.InnerText : "";
				//get status
				var statusNode = inforNode.SelectSingleNode(".//span[@class='text-success']");
				string status = statusNode != null ? statusNode.InnerText : "";

				//get rating novel
				var ratingNode = htmlDocument.DocumentNode.SelectSingleNode("//div[@class='rate-holder']");
				string ratingNumber = ratingNode != null ? ratingNode.GetAttributeValue("data-score", string.Empty) : "";

				//get brief decription
				var decriptionNode = htmlDocument.DocumentNode.SelectSingleNode("//div[@itemprop='description']");
				string briefDecription = decriptionNode != null ? decriptionNode.InnerHtml : "";

				//get image novel
				var imageNode = htmlDocument.DocumentNode.SelectSingleNode("//img[@itemprop='image']");
				string image = imageNode != null ? imageNode.GetAttributeValue("src", string.Empty) : "";



				List<string> listString = new List<string>();
				string template = "https://truyenfull.vn/than-dao-dan-ton-6060282/";
				int count_1 = template.Split('/').Length;
				int count_2 = href.Split('/').Length;
				if(count_2 == count_1)
				{
					listString = readDomGetTotalPageService.GetTotalPage(htmlDocument, href);
				}

				var targetNovel = new Novel()
				{
					href = href,
					author = authorModel,
					rating = ratingNumber,
					briefDescription = briefDecription,
					title = title,
					listGenre = listGenre,
					src = src,
					status = status,
					image = image,
					contentChapterList = await readDomGetListChapterService.ReadDomGetListChapterAsync(href),
					pages = listString.ToList(),
				};
				return targetNovel;
			}
			return new Novel();
		}
	}
}
