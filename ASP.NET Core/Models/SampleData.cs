using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASP_NET_Core.Models {
    static class SampleData {
        public static List<DropDownPerson> Persons = new List<DropDownPerson>() {
            new DropDownPerson {
                ID = 0,
                Name = "John Doe"
            },
            new DropDownPerson {
                ID = 1,
                Name = "Jane Smith"
            }
        };

        public static List<Item> Items = new List<Item>() {
            new Item {
                ID = 1,
                DynamicValue = "Sample String",
                Type = "String"
            },
            new Item {
                ID = 2,
                DynamicValue = 42,
                Type = "Number"
            },
            new Item {
                ID = 3,
                DynamicValue = DateTime.Now,
                Type = "Date"
            },
            new Item {
                ID = 4,
                DynamicValue = true,
                Type = "Boolean"
            },
            new Item {
                ID = 5,
                DynamicValue = new DropDownPerson {
                ID = 0,
                Name = "John Doe"
                },
                Type = "CustomType"
            },

        };

    }
}
