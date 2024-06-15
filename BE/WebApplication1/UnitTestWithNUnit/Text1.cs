using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTestWithNUnit
{
	[TestFixture]
	public class Text1
	{
		[Test]
		public void Test1()
		{
			int fact = 1 + 1;
			Assert.That(fact, Is.EqualTo(2));
		}
	}
}
