
function displayAddedProjectMembers(){
    var SavedProjectMembers = GetAddedProjectMembers();
    HTML = projectMembers(SavedProjectMembers);
    $("#displayProjectMembers").html(HTML);
}

function GetAddedProjectMembers() {
    var filter_val = JSON.stringify({
      "ProjectId": "sampleProjectId",
      "IsActive": true,
      "ProjectId":"1"
    });

    var result = callgetlist('GetProjectMembers', filter_val);
    return result;
  
  }


function projectMembers(SavedProjectMembers){
   let html="";
   if (SavedProjectMembers.length == 0) {
     html += "<h4>No Data Found.!</h4>";
   } else {
    SavedProjectMembers.forEach(function (key, item) {
    var profileImage="./components/project/images/user.png";
    if(key.MemberProfile!=null)
    {
        profileImage=key.MemberProfile;
    }
    html += "<div class='col-md-3 project-member' onclick='open_projectMember()'>"
    html +="<div class='panel panel-default'>"
    html +="<div class='panel-body text-center'>"
    html +="<img src='"+profileImage+"' class='img-circle' alt='User photo' style='cursor:pointer'>"
    html +="<h4 id='" + key.MemberNameId + "'>"+key.ProjectMemberName+"</h4>"
    html +="<p id='" + key.MemberPositionId + "'>"+key.MemberPositionName+"</p>"
    html +="<p id='" + key.MemberProjectId + "'>"+key.MemberProjectName+"</p>"
    html +="<b>"+key.BillAbility+"/"+key.ActualAbility+"</b>"
    html +="</div>"
    html +="</div>"
    html +="</div>"
     });
   }
 
   html += "</>"
   return html;
 }

 function open_projectMember()
 {
  $('#open_projectMember').appendTo('body').modal('show')
 }