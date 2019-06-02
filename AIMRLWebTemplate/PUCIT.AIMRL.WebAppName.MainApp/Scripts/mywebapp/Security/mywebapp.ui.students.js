MyWebApp.namespace("UI.Student");

MyWebApp.UI.Student = (function () {
    "use strict";
    var _isInitialized = false;
   
    var studentsData;
    var temp_perdata;

    function initialisePage() {
        if (_isInitialized == false) {
            _isInitialized = true;
           
		   	BindEvents();
			getAllStudents();
		
          //  getActivePermissions();
        }
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////
    function BindEvents() {
       
        $("#selectType1").change(function (e) {
            e.preventDefault();
            debugger;
            var selected_dropdownindex1 = parseInt($('#selectType1').val());
            var data = {};
            data.StudentList = [];
		    if (selected_dropdownindex1 == -1) {
                data = studentsData;
            }
            else {
                data.StudentList = studentsData.StudentList.filter(p=> p.IsActive == Boolean(selected_dropdownindex1));
            }

            displayAllStudents(data);
		});  //end of $("#selectType1").change(function (e) {});

		$("#newStudent").click(function (e) {
            e.preventDefault();
            clearFeilds();
            $.bsmodal.show("#modal-form");
        });

		$("#Save").unbind('click').bind('click', function (e) {
            e.preventDefault();
            
            if ($("#studentName").val() == "" || $('#rollNumber').val() == "" || $("#DOB").val()=="") {
                MyWebApp.UI.showRoasterMessage("Empty Field(s)", Enums.MessageType.Error, 2000);
            }
            else {
                $.bsmodal.hide("#modal-form");

                MyWebApp.Globals.ShowYesNoPopup({
                    headerText: "Save",
                    bodyText: 'Do you want to Save this record?',
                    dataToPass: { 
                        StudentId: $("#hiddenid").val(),
                        Name: $("#studentName").val(),
                        RollNum: $('#rollNumber').val(),
						DOB: $("#DOB").val()
                    },
                    fnYesCallBack: function ($modalObj, dataObj) {
                        saveStudent(dataObj);
                        $modalObj.hideMe()
                    }
                });
            }
            return false;
        });

		
		
        $("#ModalClose, #Cancel").click(function (e) {
            e.preventDefault();
            $.bsmodal.hide("#modal-form");
            clearFeilds();
			return false;
        });


    } //end of BindEvents()
///////////////////////////////////////////////////////////////////////////////////////
	//studentsData contain list of students, filled in getAllStudents()
                //var stdObj = studentsData.StudentList.find(p => p.StudentID == studentObjToSend.StudentID);
 /*               
	function EnableDisableStudent(dataObj) {
			var studentData = {
				Id: dataObj.StudentId,
				IsActive: !dataObj.IsActive
			}

        var dataToSend = JSON.stringify(roleData);
        var url = "Security/EnableDisableStudent";

        MyWebApp.Globals.MakeAjaxCall("POST", url, dataToSend, function (result) {

            if (result.success === true) {
                
                var stdObj = studentsData.StudentList.find(p => p.StudentID == studentData.studentId);
                stdObj.IsActive = studentData.IsActive;
               
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Success, 2000);

                $("#selectType1").trigger("change");

            } else {
                MyWebApp.UI.showRoasterMessage('some error has occurred', Enums.MessageType.Error);                
            }
        }, function (xhr, ajaxoptions, thrownerror) {
            MyWebApp.UI.showMessage("#spstatus", 'A problem has occurred while saving this Role: "' + thrownerror + '". Please try again.', Enums.MessageType.Error);
        });
    }
    
	*/
	
///////////////////////////////////////////////////////////////////////////////////////
	function clearFeilds() {
        
        $("#hiddenid").val("");
        //$("#IsActive2").val("-1");
        $("#studentName").val("");
        $("#rollNumber").val("");
		$("#DOB").val("");
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////

	function getAllStudents()
	{

        var url = "Security/getStudents";
		debugger;
        MyWebApp.Globals.MakeAjaxCall("GET", url, "{}", function (result) {
            if (result.success === true) {
                displayAllStudents(result.data);
               studentsData = result.data;

            } else {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Error);
            }
        }, function (xhr, ajaxOptions, thrownError) {
            MyWebApp.UI.showRoasterMessage('A problem has occurred while getting Roles: "' + thrownError + '". Please try again.', Enums.MessageType.Error);
        }, false);   //End of MakeAjaxCall()
	} // End of getAllStudents()

////////////////////////////////////////////////////////////////////////////////////////////

	 function displayAllStudents(StudentList) {
	 debugger;
        $("#simple-table").html("");

        if (!StudentList)
            return;

        try {
            var source = $("#StudentTemplate").html();
            var template = Handlebars.compile(source);
            var html = template(StudentList);
        } catch (e) {
            debugger;
        }

        $("#simple-table").append(html);
      //  BindGridEvents();
    }
/////////////////////////////////////////////////////////////////////////////////////////////
	function saveStudent(dataObj) {
        debugger;
        var studentObjToSend = {
            StudentID: dataObj.StudentId,
            Name: dataObj.Name,
            RollNumber: dataObj.RollNum,
			DoB:dataObj.DOB
        }

        var dataToSend = JSON.stringify(studentObjToSend);
        var url = "Security/SaveStudent";
        MyWebApp.Globals.MakeAjaxCall("POST", url, dataToSend, function (result) {

            if (result.success === true) {
                MyWebApp.UI.showRoasterMessage(result.error, Enums.MessageType.Success, 2000);
				debugger;

				//studentsData contain list of students, filled in getAllStudents()
                var stdObj = studentsData.StudentList.find(p => p.StudentID == studentObjToSend.StudentID);
                
                if(stdObj){
                    stdObj.Name = studentObjToSend.Name;
                    stdObj.RollNumber = studentObjToSend.RollNumber;
                }
                else {
                    studentObjToSend.StudentID = result.data.StudentId;
                    studentObjToSend.IsActive = true;
                    studentsData.StudentList.push(studentObjToSend);
                }
              
                $("#selectType1").trigger("change");

            } else {
                MyWebApp.UI.showRoasterMessage('some error has occurred', Enums.MessageType.Error);
            }
            $.bsmodal.hide("#modal-form");
        }, function (xhr, ajaxoptions, thrownerror) {
            MyWebApp.UI.showMessage("#spstatus", 'A problem has occurred while saving this Role: "' + thrownerror + '". Please try again.', Enums.MessageType.Error);
        });

    }
    
/////////////////////////////////////////////////////////////////////////////////////////////
	 
	 
    return {
        readyMain: function () {
            initialisePage();
        }
    };

}());