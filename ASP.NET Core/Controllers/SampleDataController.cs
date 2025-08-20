using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Text.Json;
using ASP_NET_Core.Models;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;

namespace ASP_NET_Core.Controllers {
    [Route("api/[controller]/[action]")]
    public class SampleDataController : Controller {
        private static void ModifyEnteredValues(string values, Item item) {
            using var jsonDoc = JsonDocument.Parse(values);
            var root = jsonDoc.RootElement;

            if (root.TryGetProperty("Type", out var typeElement)) {
                var type = typeElement.GetString();

                if (type == "CustomType") {
                    if (root.TryGetProperty("DynamicValue", out var dataElement)) {
                        var person = JsonSerializer.Deserialize<DropDownPerson>(dataElement.GetRawText());
                        item.Type = type;
                        item.DynamicValue = person;
                    }
                } else {
                    var options = new JsonSerializerOptions {
                        PropertyNameCaseInsensitive = true
                    };
                    var tempItem = JsonSerializer.Deserialize<Item>(values, options);
                    item.Type = tempItem.Type;
                    item.DynamicValue = tempItem.DynamicValue;
                }
            }
        }

        [HttpGet]
        public object Get(DataSourceLoadOptions loadOptions) {
            return DataSourceLoader.Load(SampleData.Items, loadOptions);
        }

        [HttpPut]
        public IActionResult Put(int key, string values) {
            var item = SampleData.Items.First(e => e.ID == key);
            ModifyEnteredValues(values, item);
            return Ok(item);
        }

        [HttpPost]
        public IActionResult Post(string values) {
            var newItem = new Item();
            var id = SampleData.Items.Select(d => d.ID).Max() + 1;
            newItem.ID = id;
            ModifyEnteredValues(values, newItem);
            SampleData.Items.Add(newItem);
            return Ok(newItem);
        }

        [HttpGet]
        public object PersonsGet(DataSourceLoadOptions loadOptions) {
            return DataSourceLoader.Load(SampleData.Persons, loadOptions);
        }
    }
}
