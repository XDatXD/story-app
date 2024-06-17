using ArchitectureLayer.Repositories;
using DomainLayer.Entities;
using DomainLayer.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace UnitTestWithNUnit
{
	[TestFixture]
	public class GetAllGenreUnitTesting
	{
		private IHttpClientFactory _clientFactory;
		private IGetGenreRepositories getGenreRepositories;
		[SetUp] 
		public void SetUp()
		{
			var serviceCollection = new ServiceCollection();
			serviceCollection.AddHttpClient();
			var serviceProvider = serviceCollection.BuildServiceProvider();
			// Lấy IHttpClientFactory từ ServiceProvider
			_clientFactory = serviceProvider.GetRequiredService<IHttpClientFactory>();
			getGenreRepositories = new GetGenreRepositories(_clientFactory);
		}

		[Test]
		public async Task TestGetAllGenre()
		{
			List<Genre> result = await getGenreRepositories.GetDetailGenre("https://truyenfull.vn/");
			Assert.That(result.Count, Is.EqualTo(39));
		}

		[Test]
		public async Task TestGenreName()
		{
			List<Genre> result = await getGenreRepositories.GetDetailGenre("https://truyenfull.vn/");
			string firstGenre = result[1].name;
			Assert.That(firstGenre, Is.EqualTo("Tiên Hiệp"));
		}
	}
}
