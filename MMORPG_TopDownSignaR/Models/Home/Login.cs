using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MMORPG_TopDownSignaR.Models.Home
{
    public class Login
    {
        public string ID { get { return FirstName + " " + LastName; } }

        [Required]
        [StringLength(60, MinimumLength = 2)]
        [Display(Name = "First name")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(60, MinimumLength = 3)]
        [Display(Name = "Book Title")]
        public string LastName { get; set; }
    }
}
