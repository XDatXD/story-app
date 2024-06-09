
using ApplicationLayer.InternalService;
using ArchitectureLayer.Repositories;
using DomainLayer.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpClient();// Configure HttpClientFactory
								  // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
								  // ??ng ký AngleSharp

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//add dich vu repositories
builder.Services.AddSingleton<IGetAllRepositories, GetAllRepositories>();
builder.Services.AddSingleton<IGetGenreRepositories, GetGenreRepositories>();
builder.Services.AddSingleton<IGetInformationNovelRepositories, GetInformationNovelRepositories>();
builder.Services.AddSingleton<IGetContentChapterRepositories, GetContentChapterRepositories>();
builder.Services.AddSingleton<IReadDomNovelListService, ReadDomNovelListService>();
builder.Services.AddSingleton<IGetNovelByGenreRepositories, GetNovelByGenreRepositories>();
builder.Services.AddSingleton<IReadDomGetTotalPageService, ReadDomGetTotalPageService>();
builder.Services.AddSingleton<IGetNovelBySearchRepositories, GetNovelBySearchRepositories>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
