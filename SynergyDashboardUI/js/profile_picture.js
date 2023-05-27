function GetEmployeeProfilePicture() {
    var ProfilePicture = null;
    // var localget = localStorage.getItem("UserCheckRes");
    // var jsonData = JSON.parse(localget);
    // var filter_val = JSON.stringify({"EmployeeId": jsonData['Data'][0]['EmployeeID']});
    // //console.log(filter_val);
    var result = callgetlist('GetEmployeeProfilePicture', '');
    result.forEach(function (key, item) {
        ProfilePicture = key.ProfilePicture;
    });
    return ProfilePicture;
}