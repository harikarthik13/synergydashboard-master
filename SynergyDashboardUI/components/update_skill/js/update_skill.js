// var profilePic = GetEmployeeProfilePicture();
var Employee_id = localStorage.getItem("EmployeeID");
var Employee_profilepic = imageFilesPath+Employee_id+'.png';
if (Employee_profilepic != null) {
    if ($(".profile-pic")) {
        $(".profile-pic").css("background-image", "url(" + Employee_profilepic + ")");
        callgetlist('GenerateEmployeeProfilePictures', '{}');
    }
}


