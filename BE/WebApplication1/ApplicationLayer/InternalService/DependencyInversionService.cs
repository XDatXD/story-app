using DomainLayer.Entities;
using DomainLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayer.InternalService
{
	public class DependencyInversionService
	{
		private readonly IGetNovelByCriteriaRepositories getNovelByCriteriaRepositories;
		public DependencyInversionService(IGetNovelByCriteriaRepositories _getNovelByCriteriaRepositories)
		{
			getNovelByCriteriaRepositories = _getNovelByCriteriaRepositories;
		}
		public async Task<Page> Excute(string href)
		{
			return await getNovelByCriteriaRepositories.GetNovel(href);
		}
	}
}
