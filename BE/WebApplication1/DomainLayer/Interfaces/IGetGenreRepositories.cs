using DomainLayer.Entities;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
	public interface IGetGenreRepositories
	{
		Task<List<string>> GetGenreAsync(string href);
		Task<List<Genre>> GetDetailGenre(string href);
	}
}
