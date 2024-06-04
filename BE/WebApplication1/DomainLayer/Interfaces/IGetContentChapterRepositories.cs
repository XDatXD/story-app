using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
	public interface IGetContentChapterRepositories
	{
		Task<ContentChapter> GetContentChapter(string href);
	}
}
