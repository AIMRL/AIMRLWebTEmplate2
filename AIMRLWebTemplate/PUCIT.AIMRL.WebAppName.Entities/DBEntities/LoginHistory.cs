using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PUCIT.AIMRL.WebAppName.Entities.DBEntities
{
    [Table("sec.LoginHistory")]
    public class LoginHistory
    {
        [Key]
        public Int64 LoginHistoryID { get; set; }
        public int UserID { get; set; }
        public String LoginID { get; set; }
        public String MachineIP { get; set; }
        public DateTime LoginTime { get; set; }
        [NotMapped]
        public String LoginTimeStr
        {
            get
            {
                return HelperMethods.ConvertDTToStr(this.LoginTime);
            }
        }
        [NotMapped]
        public String LoginDateTimeStr
        {
            get
            {
                return HelperMethods.ChangeDTFormat(this.LoginTime);
            }
        }
    }
}