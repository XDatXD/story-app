using DomainLayer.Interfaces;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.InternalService
{
	public class ReadDomGetTotalPageService : IReadDomGetTotalPageService
	{
		public List<string> GetTotalPage(HtmlDocument htmlDocument, string hrefBase)
		{
			//get chapter
			List<string> pageList = new List<string>();
			var listPage = htmlDocument.DocumentNode.SelectSingleNode("//ul[@class='pagination pagination-sm']");
            if (listPage == null)
            {
				return pageList;
            }
			HtmlNode anchorTarget = null;
			var listLiTag = listPage.SelectNodes(".//li");
			var nodeFinal = listLiTag[listLiTag.Count - 1];
			var anchorTestNode = nodeFinal.SelectSingleNode(".//a");
			if (anchorTestNode != null)
			{
				var arrowNode = anchorTestNode.SelectSingleNode(".//span[@class='arrow']");
				if(arrowNode != null)
				{
					anchorTarget = anchorTestNode;
				}
			}

			//
			if(anchorTarget == null)
			{
				var nodeEnd = listLiTag[listLiTag.Count - 2];
				anchorTarget = nodeEnd.SelectSingleNode(".//a");
			}
			if(anchorTarget == null)
			{
				return pageList;
			}

			string strTemp = anchorTarget.GetAttributeValue("href", string.Empty);
			List<string> tmp = strTemp.Split('/').ToList();
			int totalPage = int.Parse(tmp[tmp.Count - 2].Split('-')[1]);
			for(int i = 1; i <= totalPage; i++)
			{
				pageList.Add(hrefBase + "trang-" + i.ToString() + "/");
			}
			return pageList;
		}

		public List<string> GetTotalPageVersion1(HtmlDocument htmlDocument, string hrefBase)
		{
			//get chapter
			List<string> pageList = new List<string>();
			var listPage = htmlDocument.DocumentNode.SelectSingleNode("//ul[@class='pagination pagination-sm']");
			if (listPage == null)
			{
				return pageList;
			}
			var listLiTag = listPage.SelectNodes(".//li");
			var nodeFinal = listLiTag[listLiTag.Count - 1];
			var anchorTestNode = nodeFinal.SelectSingleNode(".//a");
			HtmlNode anchorTarget = null;
			if (anchorTestNode != null)
			{
				var arrowNode = anchorTestNode.SelectSingleNode(".//span[@class='arrow']");
				if (arrowNode != null)
				{
					anchorTarget = anchorTestNode;
				}
			}
			//
			if(anchorTarget == null)
			{
				var nodeEnd = listLiTag[listLiTag.Count - 2];
				anchorTarget = nodeEnd.SelectSingleNode(".//a");
			}

			if(anchorTarget == null)
			{
				return pageList;
			}

			string strTemp = anchorTarget.GetAttributeValue("href", string.Empty);
			List<string> tmp = strTemp.Split('&').ToList();
			int totalPage = int.Parse(tmp[tmp.Count - 1].Split('=')[1]);
			for (int i = 1; i <= totalPage; i++)
			{
				pageList.Add(hrefBase + "&page=" + i.ToString());
			}
			return pageList;
		}
	}
}
