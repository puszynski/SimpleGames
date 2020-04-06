﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using TicTacToe.Model;

namespace TicTacToe.Pages
{
    public class PrivacyModel : PageModel
    {
        private readonly ILogger<PrivacyModel> _logger;

        public PrivacyModel(ILogger<PrivacyModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {            
            string dateTime = DateTime.Now.ToShortDateString();

            var model = new Sample { TimeToDisplay = DateTime.Now.ToShortDateString() };
            ViewData["TimeStamp"] = dateTime;
        }
    }
}
