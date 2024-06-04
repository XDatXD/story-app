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
		public GetInformationNovelRepositories(IHttpClientFactory _httpClientFactory)
		{
			httpClientFactory = _httpClientFactory;	
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
				string src = sourceNode.InnerText;
				//get status
				var statusNode = inforNode.SelectSingleNode(".//span[@class='text-success']");
				string status = statusNode.InnerText;

				//get rating novel
				var ratingNode = htmlDocument.DocumentNode.SelectSingleNode("//div[@class='rate-holder']");
				string ratingNumber = ratingNode.GetAttributeValue("data-score", string.Empty);

				//get brief decription
				var decriptionNode = htmlDocument.DocumentNode.SelectSingleNode("//div[@itemprop='description']");
				string briefDecription = decriptionNode.InnerHtml;

				//get image novel
				var imageNode = htmlDocument.DocumentNode.SelectSingleNode("//img[@itemprop='image']");
				string image = imageNode.GetAttributeValue("src", string.Empty);


				//get chapter
				var listPage = htmlDocument.DocumentNode.SelectSingleNode("//ul[@class='pagination pagination-sm']");
				var listLiTag = listPage.SelectNodes(".//li");
				var nodeEnd = listLiTag[listLiTag.Count - 2];
				var nodeAnchor = nodeEnd.SelectSingleNode(".//a");
				string strTemp =nodeAnchor.GetAttributeValue("href", string.Empty);
				List<string> tmp = strTemp.Split('/').ToList();
				int totalPage = int.Parse(tmp[tmp.Count - 2].Split('-')[1]);
				List<ContentChapter> chapters = new List<ContentChapter>();
				//
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
					contentChapterList = await getListChapter(totalPage),
				};
				return targetNovel;
			}
			return new Novel();
		}

		public async Task<List<ContentChapter>> getListChapter(int num)
		{
			List<ContentChapter> chapters = new List<ContentChapter>();
			int index = 1;
			for (int i = 1; i <= num; i++)
			{
				string href = "https://truyenfull.vn/linh-vu-thien-ha/trang-" + i;
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
					foreach( var ulNode in ul)
					{
						var listChapter = ulNode.SelectNodes(".//a");
						foreach (var item in listChapter)
						{
							chapters.Add(new ContentChapter()
							{
								numberChapter = index,
								href = item.GetAttributeValue("href", string.Empty),
								title = item.GetAttributeValue("title", string.Empty),
							});
							index++;
						}
					}
				}
			}
			return chapters;
		}
	}
}
