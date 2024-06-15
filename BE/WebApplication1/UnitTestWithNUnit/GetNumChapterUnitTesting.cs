using NUnit.Framework;
using DomainLayer.Interfaces;
using ArchitectureLayer.Repositories;
using ApplicationLayer.InternalService;
using Microsoft.Extensions.DependencyInjection;

namespace UnitTestWithNUnit
{
	
	public class GetNumChapterUnitTesting
	{
		private IReadDomGetTotalPageService _readDomGetTotalPageService;
		private IReadDomGetListChapterService _readDomGetListChapterService;
		private IHttpClientFactory _httpClientFactory;
		private IGetNumberChapterOfNovelRepositories getNumberChapterOfNovelRepositories;

		[SetUp]
		public void Setup()
		{
			_readDomGetTotalPageService = new ReadDomGetTotalPageService();
			// Tạo một ServiceCollection và ServiceProvider cục bộ
			var serviceCollection = new ServiceCollection();
			serviceCollection.AddHttpClient();
			var serviceProvider = serviceCollection.BuildServiceProvider();
			// Lấy IHttpClientFactory từ ServiceProvider
			_httpClientFactory = serviceProvider.GetRequiredService<IHttpClientFactory>();
			_readDomGetListChapterService = new ReadDomGetListChapterService(_httpClientFactory);

			getNumberChapterOfNovelRepositories = new GetNumberChapterOfNovelRepositories
				(_readDomGetTotalPageService, _readDomGetListChapterService, _httpClientFactory);

		}

		[Test]
		public async void Main_Test()
		{
			int fact = await getNumberChapterOfNovelRepositories.
				GetNumberChapterOfNovel("https://truyenfull.vn/am-quan-minh-the/");
			Assert.That(fact, Is.EqualTo(20));
		}
	}
}
