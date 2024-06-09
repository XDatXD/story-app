using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Entities
{
	public class Page
	{
		public List<Novel> Novels { get; set; }
		public List<string> listPage { get; set; }	
	}
}
