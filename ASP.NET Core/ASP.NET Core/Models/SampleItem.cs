using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASP_NET_Core.Models {
    public class DropDownPerson {
        public int ID { get; set; }
        public string Name { get; set; }
    }

     public class Item {
        public int ID { get; set; }
        public dynamic DynamicValue { get; set; }

        public string Type { get; set; }
    }
}
