using DomainLayer.Entities;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
	public interface IReadDomNovelListService
	{
		Task<List<Novel>> ReadDomNovelListVersion1(HtmlDocument html);
	}
}
