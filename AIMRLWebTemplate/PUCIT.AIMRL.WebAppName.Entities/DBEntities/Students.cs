using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace PUCIT.AIMRL.WebAppName.Entities.DBEntities
{
        [Table ( "dbo.Student" )]
        public class Students
         {
        [Key]
            public Int32 StudentID { get; set; }
            public String Name { get; set; }
            public String RollNumber { get; set; }
            public DateTime DoB { get; set; }
        //    public String Gender { get; set; }
           // public Int32 Education { get; set; }
            public Boolean? IsActive { get; set; }
            public String CreatedBy { get; set; }
            public DateTime CreatedOn { get; set; }
            public String LastModifiedBy { get; set; }
            public DateTime? LastModifiedOn { get; set; }

         //StudentID ( int, auto increment ), Name varchar (100), RollNumber varchar (15), DoB date, IsActive bit, CreatedOn datetime,
            
           // CreatedBy varchar (20), LastModifiedOn datetime, LastModifiedBy varchar (20)
    }
}
