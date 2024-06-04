using DomainLayer.Entities;
using DomainLayer.Interfaces;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;

namespace PresentationLayer.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class GetAllNovelController : Controller
	{
		private readonly IGetAllRepositories getAllRepositories; 

		public GetAllNovelController(IGetAllRepositories _getAllRepositories)
		{
			getAllRepositories = _getAllRepositories;
		}
		[HttpGet]
		public async Task<IActionResult> GetAsync()
		{
			string http = "https://truyenfull.vn/";
			List<Novel> novels = await getAllRepositories.GetAllAsync(http);
			return Ok(novels);
		}

		[HttpPost]
		public IActionResult Post()
		{
			return Ok(new SinhVien());
		}
		[HttpDelete]
		public IActionResult Delete()
		{
			return Ok(new SinhVien());
		}
		[HttpPut]
		public IActionResult Update(SinhVien v)
		{
			return Ok(v);
		}
	}

	public class SinhVien
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public SinhVien()
		{
			Id = 1;
			Name = "dang tuan anh";
		}
	}

	public class LinkInfo
	{
		public string Url { get; set; }
		public string Text { get; set; }
	}
}
