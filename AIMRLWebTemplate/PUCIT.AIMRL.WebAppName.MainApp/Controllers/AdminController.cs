using Microsoft.AspNetCore.Mvc;
using PUCIT.AIMRL.WebAppName.MainApp.Util;

namespace PUCIT.AIMRL.WebAppName.MainApp.Controllers
{
    public class AdminController : BaseController
    {
        //
        // GET: /Admin/

        public ActionResult LoginAs()
        {
            if (PUCIT.AIMRL.WebAppName.MainApp.Security.PermissionManager.perCanLoginAsOtherUser==false)
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                return View("LoginAsAnotherUser");
            }
        }
    }
}
