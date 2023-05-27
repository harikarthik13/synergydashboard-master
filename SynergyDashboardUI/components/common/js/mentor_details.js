
// Added By Bharath
$(document).ready(function () {
    var GetMentor = callgetlist('GetMyMentor', '{"IsActive":1}');
    var Mentor_details_html= mentor_details(GetMentor);
    $('#DisplayMentorDetails').html(Mentor_details_html);

});

// Added By Bharath
function mentor_details(GetMentor){
    var html = "";
    if (GetMentor.length == 0) {
        html += '<ul class="nav navbar-nav pull-right headerNav">';
        html += '<li><a style="color:white!important"><span style="color:white!important">Mentor</span> :</a></li>';
        html += '<a><img class="img-circle profile-img" src="components/common/images/backupName.jpg" alt="img" style="width : 40px ; height : 40px ; margin: 5px"></a>';
        html += '</ul>';
    } else {
        html += '<ul class="nav navbar-nav pull-right headerNav">';
        GetMentor.forEach(function (key, item) {
        html += '<li id = "chat"><a href="#" style="color:white!important"  onclick="openChatModal(\'' +key.MentorId +'\', \'' + key.mentorFirstName   +'\')"><span style="color:white!important">'+ key.mentorFirstName +'</span> :</a></li>';
        html += '<a><img class="img-circle profile-img" src="' + key.MentorProfilePicture + '" alt="img" style="width : 40px ; height : 40px ; margin: 5px"></a>';
      });
      html += '</ul>';
  }
  return html;
}