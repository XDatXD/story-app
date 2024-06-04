using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Entities
{
	public class ContentChapter
	{
		public int numberChapter { set; get; }
		public string content {  set; get; }
		public string href { set; get; }
		public string title { set; get; }
		public string titleNovel {  set; get; }
	}
}
