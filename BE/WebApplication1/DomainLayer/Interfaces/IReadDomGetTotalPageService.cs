using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
	public interface IReadDomGetTotalPageService
	{
		List<string> GetTotalPage(HtmlDocument htmlDocument, string hrefBase);
		List<string> GetTotalPageVersion1(HtmlDocument htmlDocument, string hrefBase);
	}
}
