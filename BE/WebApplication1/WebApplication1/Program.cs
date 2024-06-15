
using ApplicationLayer.InternalService;
using ArchitectureLayer.Repositories;
using DomainLayer.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpClient();// Configure HttpClientFactory
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowSpecificOrigin",
		builder => builder
			.WithOrigins("http://localhost:3000") // Thay thế bằng domain của bạn
			.AllowAnyHeader()
			.AllowAnyMethod());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//add dich vu repositories
builder.Services.AddSingleton<IGetAllRepositories, GetAllRepositories>();
builder.Services.AddSingleton<IGetAllRepositories, GetAllRepositories>();
builder.Services.AddSingleton<IGetGenreRepositories, GetGenreRepositories>();
builder.Services.AddSingleton<IGetInformationNovelRepositories, GetInformationNovelRepositories>();
builder.Services.AddSingleton<IGetContentChapterRepositories, GetContentChapterRepositories>();
builder.Services.AddSingleton<IReadDomNovelListService, ReadDomNovelListService>();
//builder.Services.AddSingleton<IGetNovelByCriteriaRepositories, GetNovelByGenreRepositories>();
//builder.Services.AddSingleton<IGetNovelByCriteriaRepositories, GetNovelByNumberChapterRepositories>();
builder.Services.AddSingleton<GetNovelByNumberChapterRepositories>();
builder.Services.AddSingleton<GetNovelByGenreRepositories>();
builder.Services.AddSingleton<IReadDomGetTotalPageService, ReadDomGetTotalPageService>();
builder.Services.AddSingleton<IGetNovelBySearchRepositories, GetNovelBySearchRepositories>();
builder.Services.AddSingleton<IReadDomGetListChapterService, ReadDomGetListChapterService>();
builder.Services.AddSingleton<IGetNumberChapterOfNovelRepositories, GetNumberChapterOfNovelRepositories>();
builder.Services.AddSingleton<IGetAllContentChapterOfNovelRepositories, GetAllContentChapterOfNovelRepositories>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}
app.UseCors("AllowSpecificOrigin"); // Áp dụng chính sách CORS

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
