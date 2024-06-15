using DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Interfaces
{
	public interface IGetNovelByCriteriaRepositories
	{
		Task<Page> GetNovel(string href);
	}
}
