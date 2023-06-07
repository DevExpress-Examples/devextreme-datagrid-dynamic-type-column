using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.CompilerServices;
using ASP_NET_Core.Models;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ASP_NET_Core.Controllers {

    [Route("api/[controller]/[action]")]
    public class SampleDataController : Controller {


        private static void ReturnParsedValues(string values, Item item)
        {
            var parsedValues = JObject.Parse(values);

            var type = (string)parsedValues.GetValue("Type");

            if (type == "CustomType")
            {
                var data = parsedValues.GetValue("DynamicValue");
                var person = data.ToObject<DropDownPerson>();
                item.Type = type;
                item.DynamicValue = person;
            }
            else
            {
                JsonConvert.PopulateObject(values, item);
            }
        }

        [HttpGet]
        public object Get(DataSourceLoadOptions loadOptions) {
            return DataSourceLoader.Load(SampleData.Items, loadOptions);
        }

        [HttpPut]
        public IActionResult Put(int key, string values) {

            var item = SampleData.Items.First(e => e.ID == key);
 
            ReturnParsedValues(values, item);

            return Ok(item);
        }

        [HttpPost]
        public IActionResult Post(string values)
        {
            var newItem = new Item();

            var id = SampleData.Items.Select(d => d.ID).Max() + 1;
            newItem.ID = id;

            ReturnParsedValues(values, newItem);

            SampleData.Items.Add(newItem);

            return Ok(newItem);

        }

        [HttpGet]
        public object PersonsGet(DataSourceLoadOptions loadOptions)
        {
            return DataSourceLoader.Load(SampleData.Persons, loadOptions);
        }
    }
}
