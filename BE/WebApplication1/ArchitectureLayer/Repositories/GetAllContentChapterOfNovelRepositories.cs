using DomainLayer.Entities;
using DomainLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArchitectureLayer.Repositories
{
	public class GetAllContentChapterOfNovelRepositories : IGetAllContentChapterOfNovelRepositories
	{
		private readonly IReadDomGetListChapterService _readDomGetListChapterService;
		private readonly IGetContentChapterRepositories _getContentChapterRepositories;
		private readonly IGetInformationNovelRepositories _getInformationNovelRepositories;
		public GetAllContentChapterOfNovelRepositories(IReadDomGetListChapterService readDomGetListChapterService,
			IGetContentChapterRepositories getContentChapterRepositories,
			IGetInformationNovelRepositories getInformationNovelRepositories)
		{
			_readDomGetListChapterService = readDomGetListChapterService;
			_getContentChapterRepositories = getContentChapterRepositories;
			_getInformationNovelRepositories = getInformationNovelRepositories;
		}

		public async Task<Novel> GetDetailNovel(string href)
		{
			Novel targetNovel = await _getInformationNovelRepositories.GetDetail(href);
			List<ContentChapter> targetContentChapter = new List<ContentChapter>();
			foreach(var item in targetNovel.pages)
			{
				List<ContentChapter> temp = await _readDomGetListChapterService.ReadDomGetListChapterAsync(item);
				foreach(var item_1 in temp)
				{
					targetContentChapter.Add(await _getContentChapterRepositories.GetContentChapter(item_1.href));
				}
			}
			targetNovel.contentChapterList = targetContentChapter;
			return targetNovel;
		}
	}
}
