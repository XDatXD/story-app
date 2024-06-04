using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Entities
{
	public class Novel
	{
		public string id {  get; set; }
		public string href { get; set; }
		public string title { get; set; }
		public string briefDescription { get; set; }
		public string author { get; set; }
		public string image {  get; set; }
		public string genre { get; set; }
		public string status { get; set; }
		public string rating {  get; set; }
		public string src {  get; set; }
		public int chapterNumber { get; set; }
	}
}
