
var DownloadMSGFileURL = SynergyAPIURL;
MessageSecurityToken = localStorage.getItem("securityToken");
var Msg_Counter = 0;
var recevierId;
var senderId;
var backup_resource_id;
var createdtimestring;
var Createddate;
var Notseen_Messages = new Array();
var unreadMessage_count;
var Get_MentorId;

/* SwalAlert */
function swalAlert(data){
    swal({
    title: data.title,
    text: data.text,
    icon: data.icon,
    button:"Close"
    });   
}
$.getScript("js/library/dropzone.js", function(){});

/*Open Message Modal*/
function openMessageModal() {
    $('#open_message').appendTo('body').modal('show');
    let editor = CKEDITOR.instances.message_content;
    if (editor) {
        editor.destroy(true); 
    }
        CKEDITOR.replace('message_content');
        
        var _backupResourceList = callgetlist('GetBackupResource', '{"IsActive":1}');

        var backupResourceList = $.map(_backupResourceList, function (obj) {
            obj.text = obj.ResourceName || obj.ResourceName; // replace name with the property used for the text
            obj.id = obj.Id || obj.Id; // replace name with the property used for the text
            return obj;
        });
      
        $("#backupResource_message").select2({
            placeholder: "Select Backup Resource",
            allowClear: true,
            data: backupResourceList
           
        });
        $("#backupResource_message > option").prop("selected","selected");
        $("#backupResource_message").trigger("change");
        // var send_message = mail_to_resource(_backupResourceList);
}

/*Open Skill Modal*/
function openSkillModal(Id, Name) {
    $('#open_skill').appendTo('body').modal('show');
    $('.skill-label').html(Name + ' Skills');

    //GetBackupResourceSkills - Added By Bharath
    let filter_val = JSON.stringify({"EmployeeId": Id});
    var GetBackupResourceSkills = callgetlist('GetBackupResourceSkills', filter_val);

    var backupresource_skill_html= backup_resource_skill_list(GetBackupResourceSkills);
    $('#DisplayBackupResourceSkills').html(backupresource_skill_html); 
}

/*Open Project Modal*/
function openProjectModal(Id,Name) {
    $('#open_project').appendTo('body').modal('show')
    $('.project-label').html(Name + ' Projects');

    var data = {
        "EmployeeId":Id,
        "IsActive":1
    }

    //GetBackResourceProject - Added By Bharath
    var GetBackResourceProject = callgetlist('GetBackupResourceStatusById', JSON.stringify(data));
    //Project Table List Section - Added By Bharath 
    // Obj =  {};
    // for(var i = 0; i < 3; i++) {
    //     // 1st object
    //     list1 = {};
    //     list1.push("val1",i+1);
    //     list1.push("val2",i+2);
    //     list1.push("val3",i+3);
    //     obj.push(list1);
    // }
    // console.log(obj,'obj');
    var project_list_html= project_table_list(GetBackResourceProject);
    $('#DisplayProjectLists').html(project_list_html);
}

/*Open Plan Modal*/
function openPlanModal(Id, Name) {                                                                                                                                                                                                                                                                                                                                                
    $('#open_plan').appendTo('body').modal('show');
    $('.plan-label').html( Name + ' - Plans');
    $('#plan-id').val(Id);

    //GetResourceYourPlan - Added By Bharath
    var GetResourceYourPlan = callgetlist('GetResourceYourPlan', '{"Iactive":1}');

    //Your Plan Section (MessageType) - Added By Bharath
    var message_type_list_html= message_type_list(GetResourceYourPlan);
    $('#SelectMessageType').html(message_type_list_html);

    // let editor = CKEDITOR.instances.plan_content_message;
    // if (editor) {
    //     editor.destroy(true); 
    // }
    // CKEDITOR.replace('plan_content_message');

    //Default Value
    var radios = $('input:radio[name=messagetype]');
    if(radios.is(':checked') === false) {
        radios.filter('[value=Chat]').prop('checked', true);
    }
}

/*Open leave Modal*/
function openLeaveModal(Id, Name){
    $('#open_leave').appendTo('body').modal('show')
    $('.leave-label').html( Name + ' - Leave Plans');

    //GetEmployeeLeavePlan - Added By Bharath
    let filter_val = JSON.stringify({"EmployeeId": Id, "IsActive":1});
    var GetBackResourceLeavePlan = callgetlist('GetEmployeeLeavePlan', filter_val);

    //Leave Plan Table List Section - Added By Bharath
    var leave_plan_list_html= leave_plan_list(GetBackResourceLeavePlan, Id);
    $('#DisplayLeavePlanLists').html(leave_plan_list_html);
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();  
    //GetBackupResource - Added By Bharath
    var GetBackupResource = callgetlist('GetBackupResource', '{"IsActive":1}');
    var backupresource_list_html= backup_resource_list(GetBackupResource);    
    $('#DisplayBackupResource').html(backupresource_list_html);

    //GetMentor Details - Added By Lingesh Deepak
    var GetMentor = callgetlist('GetMyMentor', '{"IsActive":1}');
    GetMentor.forEach(function (key, item) {
        Get_MentorId = key.MentorId;
    });
    // setInterval(function() {
        //get_unseenMessages(GetBackupResource);
    // }, 1000);  
    
}); 

 /** Added By Bharath - BACKUP RESOURCE LIST**/
 function backup_resource_list(GetBackupResource){
    var y = $("#open_chat").attr('class');
    var html = "";
    if (GetBackupResource.length == 0) {
    html += "<p>No Data Found.!</p>";
    } else {
        GetBackupResource.forEach(function (key, item) {
            var Id = key.Id;
            var Name = key.ResourceName;
            backup_resource_id = Id;
           
          html += '<div class="backup-width">';
          html += '<div class="panel panel-default">';
          html += '<div class="panel-body text-center users">';
          html +=  '<div class="backupdefault">';
          html +=  '<div class="img-default">';
          if(key.ProfilePicture == null){
           
            html += '<img src="./components/backupresource/images/avatar.png" class="img-full" alt="User photo">';
          }else{
            html += '<img src="' + key.ProfilePicture + '" class="img-full" alt="User photo">';
          }
          
          html +=  '</div>';
          html +=  '<div class="content-default">';
          html +=  '<div class="col-xs-3">';
          html +=  '<a href="#" onclick="openSkillModal(\'' + Id  +'\', \'' + Name  +'\')" data-toggle="tooltip" title="Skills" ><i class="glyphicon glyphicon-education"></i></a>';
          html += '</div>';
          html +=  '<div class="col-xs-3">';
          html +=  '<a href="#" onclick="openProjectModal(\'' + Id  +'\', \'' + Name  +'\')" data-toggle="tooltip" title="Project Details" ><i class="glyphicon glyphicon-cog"></i></a>';
          html +=  '</div>';
        //   html +=  '<div class="col-sm-3">';
        //   html +=   '<a href="#" onclick="openPlanModal(\'' + Id  +'\', \'' + Name  +'\')" data-toggle="tooltip" title="Plan" ><i class="glyphicon glyphicon-link"></i></a>';
        //   html +=  '</div>';
          html +=  '<div class="col-xs-3">';
          html +=  '<a href="#" onclick="openChatModal(\'' + Id  +'\', \'' + Name  +'\')" data-toggle="tooltip" title="Chat" id="chat"><i class="glyphicon glyphicon-envelope"><span class="badge count" id="message_notification_'+Id+'"></span></i></a>';
          html +=  '</div>';
          html +=   '<div class="col-xs-3">';
          html +=  '<a href="#"  onclick="ledger_getReportIndividualData(\'' + Id  +'\')" data-toggle="tooltip" title="Leave Plans" ><i class="glyphicon glyphicon-calendar"></i></a></span>';
          //   html +=  '<a href="#"  onclick="openLeaveModal(\'' + Id  +'\', \'' + Name  +'\')" data-toggle="tooltip" title="Leave Plans" ><i class="glyphicon glyphicon-calendar"></i></a></span>';

          html +=  '</div>';
          html +=  '</div>';
          html +=  '</div>';
          html +=  '<div class="row billablity">';
          html += '<p>' + key.ResourceName +  '</p>';
          var data = {"EmployeeId":Id,"IsActive":1}
          var GetBackResourceProject = callgetlist('GetBackupResourceStatusById', JSON.stringify(data));
          GetBackResourceProject.forEach(function (key, item) {
            html +=   '<span>'+ key.OccupiedHours+'/' +key.BillableHours+'</span>';
          })
          html +=  '</div>';
          html +=  '</div>';
          html +=  '</div>';
          html +=  '</div>';
        })
        
       
    }
    return html;
};

function get_unseenMessages(GetBackupResource){

    Notseen_Messages = [];
    var resourceUnreadMessageCount;
    $("#message_notification_list").html("");
    if(GetBackupResource.length>0){

        GetBackupResource.forEach(function(key,item){
            var ResourceMessageCount = new Array();
            
            var ID,ResourceName;
            if(key.Id == undefined)
            {
                ID = key.MentorId;
            }
            else{
                ID = key.Id;
            }
            var User_EmployeeID = localStorage.getItem("EmployeeID");
            var filter_val = {
                "ToEmployeeId" : ID
            }
            if($("#message_header_batch_"+ID).length==0)
            {
                var dropdownNotify = "";
                dropdownNotify += '<li><a href="#" onclick = "openChatModal(\'' +ID +'\', \'' + key.ResourceName +'\');">'+key.ResourceName+'<span class="badge badge-light" id="message_header_batch_'+ID+'"></span></a></li>';
                $("#message_notification_list").append(dropdownNotify);
            }
            var get_MessageCount = callgetlist("GetMessages",JSON.stringify(filter_val));
            
            if (get_MessageCount.length != 0){
                get_MessageCount.forEach(function (item){
                if(item.IsSeen == false && User_EmployeeID == item.ToEmployeeId){
                    if(Notseen_Messages.includes(item.MessageId) == false && ID == item.FromEmployeeId && ResourceMessageCount.includes(item.MessageId) == false){
                        ResourceMessageCount.push(item.MessageId);
                        Notseen_Messages.push(item.MessageId);
                        unreadMessage_count = Notseen_Messages.length;
                        resourceUnreadMessageCount = ResourceMessageCount.length;
                    }
                    $('#message_notification_'+ID).html(resourceUnreadMessageCount);
                    $('#notification').show();
                    $("#header_notification_batch").html(unreadMessage_count);
                    $('#message_header_batch_'+ID).html(resourceUnreadMessageCount);
                    //console.log(unreadMessage_count)
                }
                })
            }
        });
    }
    else{
        var GetMentor = callgetlist('GetMyMentor', '{"IsActive":1}');
        GetMentor.forEach(function(key,item){
            $("#notification").on("click",function(){
            $("#message_notification_list").hide();
            openChatModal(key.MentorId,key.mentorFirstName);
        })
    })
        //get_unseenMessages(GetMentor);
    }
}

 /** Added By Bharath - SKILLS **/
 function backup_resource_skill_list(GetBackupResourceSkills){
    var html = "";
    if (GetBackupResourceSkills.length == 0) {
    html += "<p>No Data Found.!</p>";
    } else {
        var PrimaryResourceSkills = [];
        var SecondaryResourceSkills = [];
        var LevelOneResourceSkills = []; 
        var LevelTwoResourceSkills = [];
        var LevelThreeResourceSkills = [];
        var LevelFourResourceSkills = [];
        var LevelFiveResourceSkills = [];
        GetBackupResourceSkills.forEach(function (key, item) {
            if(key.SkillGradeName == 'Primary'){
                PrimaryResourceSkills.push(key.SkillName);
            }
            if(key.SkillGradeName == 'Secondary'){
                SecondaryResourceSkills.push(key.SkillName);
            }
            if(key.SkillGradeName == 'Level 1'){
                LevelOneResourceSkills.push(key.SkillName);
            }
            if(key.SkillGradeName == 'Level 2'){
                LevelTwoResourceSkills.push(key.SkillName);
            }
            if(key.SkillGradeName == 'Level 3'){
                LevelThreeResourceSkills.push(key.SkillName);
            }
            if(key.SkillGradeName == 'Level 4'){
                LevelFourResourceSkills.push(key.SkillName);
            }
            if(key.SkillGradeName == 'Level 5'){
                LevelFiveResourceSkills.push(key.SkillName);
            }
        })
            html += '<div class="modal-body" data-simplebar>';
            html += '<h4>Primary Skills:&nbsp&nbsp'+ PrimaryResourceSkills +'</h4>'; 
            html += '<h4>Secondary Skills:&nbsp&nbsp'+ SecondaryResourceSkills +'</h4>';
            ////console.log(LevelOneResourceSkills.length);
            if(LevelOneResourceSkills.length > 0){
                html += '<h4>' + LevelOneResourceSkills + '&nbsp&nbsp<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></h4>';
            }
            if(LevelTwoResourceSkills.length > 0){
                html += '<h4>' + LevelTwoResourceSkills + '&nbsp&nbsp<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></h4>';
            }
            if(LevelThreeResourceSkills.length > 0){
                html += '<h4>' + LevelThreeResourceSkills + '&nbsp&nbsp<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></h4>';
            }
            if(LevelFourResourceSkills.length > 0){
                html += '<h4>' + LevelFourResourceSkills + '&nbsp&nbsp<i class="fas fa-star"></i><i class="fas fa-star"></i></h4>';
            }
            if(LevelFiveResourceSkills.length > 0){
                html += '<h4>' + LevelFiveResourceSkills + '&nbsp&nbsp<i class="fas fa-star"></i></h4>';
            }
            html += '</div>';
    }
    return html;
};


  /** Added By Bharath - PROJECT DETAILS **/
//  function project_table_list(GetBackResourceProject){
//     var html = "";
//     if (GetBackResourceProject.length == 0) {
//     html += "<p>No Data Found.!</p>";
//     } else {
//         html += '<table class="table" id="BackupResourceProjectList">';
//         html += '<thead>';
//         html += '<tr>';
//         html += '<th>#</th>'
//         html += '<th>Project</th>';
//         html += '<th>Client</th>';
//         html += '<th>Lead</th>';
//         html += '<th>Project Type</th>'
//         html += '</tr>';
//         html += '</thead>';
//         html += '<tbody>';
//         GetBackResourceProject.forEach(function (key, item) {
//             var str = key.Projects;
//             var str_array = str.split(',');
//             for(var i = 0; i < str_array.length; i++) {
//                 str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
//             }

//             var leads = key.ProjectLeads;
//             var leads_array = leads.split(',');
//             for(var i = 0; i < leads_array.length; i++) {
//                 leads_array[i] = leads_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
//             }

//             var project_type = key.ProjectTypeId;
//             var project_type_array = project_type.split(',');
//             for(var i = 0; i < project_type_array.length; i++) {
//                 project_type_array[i] = project_type_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
//             }

//             for(var i =0; i < str_array.length; i++){
//                 sno = i + 1;
//                 // html += '<div id="item">'
//                 html += '<tr  class="item_'+ i +'" id="item">';
//                 html += '<td>'+ sno +'</td>';
//                 html += '<td>'+ str_array[i] +'</td>';
//                 html += '<td>'+ key.Client +'</td>';
//                 html += '<td>'+ leads_array[i] +'</td>';
//                 html += '<td>'+ key.ProjectType+'</td>';
//                 html += '</tr>';

//                 if(project_type_array[i] == "99E78791-6C84-40AB-A6D3-6DA3E5A03AAB"){//Retainer
//                     $("#item").css("background",'pink');
                    
//                 }else if(project_type_array[i] == "B2B93FB7-1C7B-4773-A0A4-9A2D3A09445F"){//Package
//                     $("#item").css("background",'yellow');
                    
//                 }else if(project_type_array[i] == "8317CC89-A2F9-421A-95B8-30B945F93545"){//Fixed Bit
//                     $("#item").css("background",'green');
                    
//                 }else if(project_type_array[i] == "52997530-4E69-416B-847E-76BE921947EC"){//RandD
//                     $("#item").css("background",'blue');
                    
//                 }else if(project_type_array[i] == "4BE9AC26-A99A-4265-8404-ECC93D5E14F6"){//Time and Material
//                     $("#item").css("background",'gray');
                    
//                 }else{
//                     $("#item").css("background",'white');
                    
//                 }
//             }
//             // 4BE9AC26-A99A-4265-8404-ECC93D5E14F6	Time and Material
//             // 52997530-4E69-416B-847E-76BE921947EC	RandD
//             // 8317CC89-A2F9-421A-95B8-30B945F93545	Fixed Bit
//             // 99E78791-6C84-40AB-A6D3-6DA3E5A03AAB	Retainer
//             // B2B93FB7-1C7B-4773-A0A4-9A2D3A09445F	Package
//         })
//         html += '</tbody>';
//         html += '</table>';
//     }
//     return html;
//  }



/** Added By Bharath - YOUR PLAN **/
function message_type_list(GetResourceYourPlan){
    var html = "";
    if (GetResourceYourPlan.length == 0) {
    html += "<p>No Data Found.!</p>";
    } else {
        html += '<div class="form-group">';
        GetResourceYourPlan.forEach(function (key, item) {
            sno = item + 1;
            html += '<input type="radio" class="form-check-input" name="messagetype" onchange="getType(this)" id="'+ key.MessageType +'_MessageType" value="'+ key.MessageType +'"><label>'+ key.MessageType +'</label>&nbsp&nbsp';
        })
        html += '</div>';
    }
    return html;
}

 /** Added By Bharath - LEAVE PLAN **/
 function leave_plan_list(GetBackResourceLeavePlan, Id){
    var html = "";
    if (GetBackResourceLeavePlan.length == 0) {
    html += "<p>No Data Found.!</p>";
    } else {
        html += '<table class="table" id="BackupResourceleavePlanList">';
        html += '<thead>';
        html += '<tr>';
        html += '<th>#</th>'
        html += '<th>Leave Requested</th>';
        html += '<th>IsApproved</th>';
        html += '<th>Reason</th>';
        html += '<th>B.CL</th>';
        html += '<th>B.EL</th>';
        html += '<th>LoCM</th>';
        html += '<th>LoCY</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
            GetBackResourceLeavePlan.forEach(function (key, item) {
            sno = item + 1;

            html += '<tr>';
            html += '<td>'+ sno +'</td>';
            html += '<td><a href="#" onclick="openLeaveApprover(\'' + Id  +'\')">'+ key.LeaveRequested +' days</td>';
                if(key.IsApproved == 'Y'){
                    html += '<td><input type="checkbox" class="check" name="appliedDate"  checked disabled="disabled"></td>';
                }
                else{
                    html += '<td><input type="checkbox" class="check" name="appliedDate"  disabled="disabled"></td>';
                }
            html += '<td>'+ key.Reason +'</td>';
            html += '<td>'+ key["B.CL"] +'</td>';
            html += '<td>'+ key["B.EL"] +'</td>';
            html += '<td>'+ key.LoCM +'</td>';
            html += '<td>'+ key.LoCY +'</td>';
            html += '</tr>';
        })
        html += '</tbody>';
        html += '</table>';
    }
    return html;
 }

/** Added By Bharath - LEAVE PLAN **/
 function openLeaveApprover(Id){
    $('#openLeaveApproverDetails').appendTo('body').modal('show')

    //GetEmployeeLeaveApproverDetails - Added By Bharath
    let filter_val = JSON.stringify({"EmployeeId": Id, "IsActive":1});
    var GetEmployeeLeaveApproverDetails = callgetlist('GetEmployeeLeaveApproverDetails', filter_val);

    var leave_plan_details_list_html= leave_plan_details_list(GetEmployeeLeaveApproverDetails);
    $('#DisplayLeaveApproverDetails').html(leave_plan_details_list_html);
 }


 /** Added By Bharath - LEAVE PLAN **/
 function leave_plan_details_list(GetEmployeeLeaveApproverDetails){
    var html = "";
    if (GetEmployeeLeaveApproverDetails.length == 0) {
    html += "<p>No Data Found.!</p>";
    } else {
        html += '<table class="table" id="BackupResourceleaveApproverList">';
        html += '<thead>';
        html += '<tr>';
        html += '<th>Date</th>'
        html += '<th>Hours</th>';
        html += '<th>Approver</th>';
        html += '<th>isApproved</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        GetEmployeeLeaveApproverDetails.forEach(function (key, item) {
            html += '<tr>';
            html += '<td>'+ key.Date +'</td>';
            html += '<td>'+ key.Hours +'</td>';
            html += '<td>'+ key.Approver +'</td>';
            if(key.IsApproved == 'Y'){
                html += '<td><input type="checkbox" class="check" name="leaveApprover"  checked disabled="disabled"></td>';
            }
            else{
                html += '<td><input type="checkbox" class="check" name="leaveApprover"  disabled="disabled"></td>';
            }
            html += '</tr>';
        })
        html += '</tbody>';
        html += '</table>';
    }
    return html;
}

// Added By Lingesh Deepak - Displaying the Sent and Recevied Messages
function getMessageOnLoad(){
    
    var employeeId;
    employeeId = $('#chat-id').val();
    // Performance Issue Commented by christlin, why it shoud be in else and outer scope??
    //get_sender_receiver_details(employeeId);
    
    get_sender_receiver_details(employeeId);
    $("#message_chat_list").scrollTop(10000000000000000000000000000);
}

// Performance issue Commented by Christlin, Need to review
// // Added By Lingesh Deepak - Displaying the Sent and Recevied Messages

$('#mentor_open_chat').on('show.bs.modal', function () {
    setTimeout(getMessageOnLoad, 1000);
    //getMessageOnLoad();
});

$('#open_chat').on('show.bs.modal', function () {
    setTimeout(getMessageOnLoad, 1000);
    //getMessageOnLoad();
    
});

// Added By Lingesh Deepak - Displaying the Sent and Recevied Messages

function get_sender_receiver_details(employeeId){
    var filter_val = {
        "ToEmployeeId" : employeeId
    }
    
    var Get_sent_and_recevied_message = callgetlist("GetMessages",JSON.stringify(filter_val));
    var get_messages = get_message(Get_sent_and_recevied_message);
    $('#message_chat_list').html(get_messages);
    
}


// Added By Lingesh Deepak - Sending mail to resources and file attachment
function mail_to_resource(empId = null,From_Empolyee = null ,messageContent = null,mailfiles = null){ 
    var mailFormData = new FormData();

    if(empId == null){
        var ToEmployeeIdArray = $("#backupResource_message").val();
    }else{
        var ToEmployeeIdArray = [];
        ToEmployeeIdArray.push(empId);
    }
    
    var FromEmployeeID = (From_Empolyee == null)?localStorage.getItem("EmployeeID"):From_Empolyee;
    var message = (messageContent == null)?CKEDITOR.instances.message_content.getData():messageContent;
   
        var messageDetails =
        {
            fromId: FromEmployeeID,
            toId: ToEmployeeIdArray, //toId should be in this formate ["B0694A26-E334-49E4-9346-ECA517E3E1BD"]
            message: escape(message)
        }
        
        mailFormData.append('messageDetails',JSON.stringify(messageDetails));
        
        //file sending
        if(mailfiles == null){
            var messagefiles = document.getElementById('sendMessage');
            if (messagefiles.files.length > 0) {
                for (var i = 0; i <= messagefiles.files.length - 1; i++) {
                    var sendMessageFile = messagefiles.files.item(i);
                    mailFormData.append('file'+(i+1),sendMessageFile);
                }
            }
        }else{
            var messagefiles = mailfiles;
            if (messagefiles.length > 0) {
                for (var i = 0; i <= messagefiles.length - 1; i++) {
                    mailFormData.append('files'+(i+1),messagefiles[i]);
                }
            }
        }

        var result_sendmessage = sendMessage(mailFormData);
    if (result_sendmessage == null) {
        var swalEMRSucc = {
            title: 'Success!',
            text: "Mail Sent Successfully",
            icon: "success"
        }
        swalAlert(swalEMRSucc);
    
        } else {
            var swalEMRErr = {
                title: 'Warning!',
                text: "Error in Sending Mail",
                icon: "error"
            }
            swalAlert(swalEMRErr); 
        }

}

// Added by Lingesh Deepak L - Chat Model
function openChatModal(Id, Name) { 
    var html = "";
    html +='<div class="modal-dialog" role="document">';
    html +='<div class="modal-content">';
    html +='<div class="modal-header">';
    html +='<button type="button" class="close" id="chat_message" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button><button class="expand modalExpanding"><i class="fas fa-expand" data-toggle="modal"></i></button>';
    html +='<h2 class="modal-title chat-label" id="myModalLabel">' + Name + ' -Chat </h2>';
    html +='</div>';
    html +='<div class="modal-body" data-simplebar>';
    html +='<div class="row">';
    html +='<div class="col-md-4 col-md-offset-4" id="SelectChatType"></div>';
    html +='</div>';
    html +='<div class="row">';
    html +='<div class="col-sm-12">';
    html +='<label>Chat History :</label>';
    html +='<div class="message_lists row" id="message_chat_list"></div>';
    html +='<br>';
    html +='</div>';
    html +='</div>';
    html +='<div class="row">';
    html +='<div class="col-md-6 message_dropzone" id="message_dropzone">';
    html +='<label>File :</label>';
    html += '<div class="msg_dropzone">';
    html +='<form action="#" class="dropzone needsclick dz-clickable" id="msg_document_upload" method="post" enctype="multipart/form-data">';
    html +='<div class="dz-message needsclick">'
    html +='Drop files here or click to upload.<br/>';
    html +='</div>';
    html +='</form>';
    html +='</div>';
    html +='</div>';
    html +='<div class="col-md-6 chat_message_area">';
    html +='<div class="form-section">';
    html +='<input type="hidden" id="chat-id" value="'+Id+'">';
    html +='<label>Message :</label>';
    html +='<div class="form-group chat-subject" style="display:none;">';
    html +='<label>Subject :</label>';
    html +='<input type="text" name="chat_subject" id="chat-subject" class="form-control">';
    html +='</div>';
    html +='<textarea name="chat_content_message" id="chat_content_message" rows="7" class="form-control ckeditor"></textarea>';
    html +='<p class="error_message message_text"></p>';
    html +='<br>'                           
    html +='<div class="bottom-section">'
    html +='<div class="pull-right">'
    html +='<button class="btn btn-secondary btn-sm" type="button" onclick="messageSubmit()">Send</button>'
    html +='</div>'
    html +='</div>'
    html +='</div>' 
    html +='</div>'
    html +='</div>'
    html +='</div>'
    html +='</div>'
    html +='</div>'  

    if(Get_MentorId != null){
        $('#mentor_open_chat').html(html);                                                                                                                                                                                                                                                                                                                              
        $('#mentor_open_chat').appendTo('body').modal('show');
    }else{
        $('#open_chat').html(html);                                                                                                                                                                                                                                                                                                                              
        $('#open_chat').appendTo('body').modal('show');
    }
    Notseen_Messages = [];
    var GetResourceYourPlan = callgetlist('GetResourceYourPlan', '{"Iactive":1}');

    var chat_type_list_html= chat_type_list(GetResourceYourPlan);
    $('#SelectChatType').html(chat_type_list_html);

    $("#Mail_messagetype").click(function(){
        $(".chat-subject").show();
    });
    $("#Chat_messagetype").click(function(){
        $(".chat-subject").hide();
    });
    $("#SMS_messagetype").click(function(){
        $(".chat-subject").hide();
    });
    
    Notseen_Messages = [];

    let editor = CKEDITOR.instances.chat_content_message;
    CKEDITOR.replace('chat_content_message');

    //Default Value
    var radios = $('input:radio[name=messagetype]');
    if(radios.is(':checked') === false) {
        radios.filter('[value=Chat]').prop('checked', true);
    }
    var msg_document_upload = new Dropzone("#msg_document_upload", {
        addRemoveLinks: true,
        uploadMultiple: true,
        autoProcessQueue: false,
        url: messageSubmit
    });
        return html;
}

// Added By Lingesh Deepak - Displaying the Sent and Recevied Messages

function get_sender_receiver_details(employeeId){
    var filter_val = {
        "ToEmployeeId" : employeeId
    }
   
    var Get_sent_and_recevied_message = callgetlist("GetMessages",JSON.stringify(filter_val));
    var get_messages = get_message(Get_sent_and_recevied_message);

    //Display messages - Backup Lead Side Chat Area
    $('#message_chat_list').html(get_messages);
}

// Added by Lingesh Deepak L - Chat message sending
function messageSubmit(){
    var messageFormData = new FormData();
    let postMessageCall;
    var empId,chatSubject;
    var From_Empolyee = localStorage.getItem("EmployeeID");
   
    empId = $('#chat-id').val();
    chatSubject = $('#chat-subject').val();
 
    var Token = localStorage.getItem("login_securityToken");
    var radioValue = $("input[name='messagetype']:checked").val();
    var messageContent;

    let valOb = {
        ob1 : (radioValue == "Chat") ? "1" : "0",
        ob2 : (radioValue == "Mail") ? "1" : "0",
        ob3 : (radioValue == "SMS") ? "1" : "0",
    }

    messageContent = CKEDITOR.instances.chat_content_message.getData();

    var files;
    files = $('#msg_document_upload').get(0).dropzone.getAcceptedFiles();

    if(messageContent === ""){
        $('.message_text').html("Can't Send Empty Message");
        return false;
    }else{
        $('.message_text').html('');
    }

   let PostMessageData = 
    [{
        "ToEmployeeId": empId,
        "isChat": valOb.ob1,
        "isEmail": valOb.ob2,
        "isSMS": valOb.ob3,
        "Subject": chatSubject,
        "MessageContent": messageContent,
        "IsSeen" : "0",
        "IsActive": "1"
    }];

    if(valOb.ob2 == "1"){
        var result_sendmessage = mail_to_resource(empId,From_Empolyee,messageContent,files);
        return result_sendmessage;
    }else{
        data_PostBakupResourceMessage = {
            Method: "PostMessage",
            Data: {
                Data: `${JSON.stringify(PostMessageData)}` 
            },
            "Message":"",
            "Status":" "
        }
    
        postMessageCall = PostDataCall(data_PostBakupResourceMessage);
        
        MessageId = postMessageCall.Data[0].MessageId;
        if(postMessageCall["IsSuccess"] == true){
            
            if (files.length > 0) {
                for (i = 0; i < files.length; i++) {
                var FileExtension = files[i].name.slice((Math.max(0, files[i].name.lastIndexOf(".")) || Infinity) + 1);
                var FileName = files[i].name.substr(0, files[i].name.lastIndexOf("."));
                var FileType = files[i].type;
                var formData = new FormData();
                formData.append('files', files[i]);
                var contentdetails =
                    [{
                        "DocumentTypeId": MessageId,
                        "DocumentType": "MSG",
                        "DocumentName": FileName,
                        "Extension": FileExtension,
                        "ContentType": FileType
                    }]
                formData.append('contentdetails', JSON.stringify(contentdetails));
                var result = postFileGeneric(formData);
                //console.log(result,"File send");
                }
            }
        }
        
        if (postMessageCall['IsSuccess'] == true) {
            var swalEMRSucc = {
                title: 'Success!',
                text: postMessageCall['Message'],
                icon: "success"
            }
            swalAlert(swalEMRSucc);
            get_sender_receiver_details(empId);
            //Clear text box and dropzone after sending the Message
            $("#chat_content_message").val("");
            dropzone_remove_files();
        } else {
            var swalEMRErr = {
                title: 'Warning!',
                text: postMessageCall['Message'],
                icon: "error"
            }
            swalAlert(swalEMRErr); 
        }
    }
    
}

// Added By Lingesh Deepak - Displaying the Sent and Recevied Messages
function get_message(Get_sent_and_recevied_message){
    var User_EmployeeID = localStorage.getItem("EmployeeID");
    var html = "";
    if (Get_sent_and_recevied_message.length == ""){
        html += "<p>Not Yet Started To Chat,Start To Chat</p>";
    } else{
        datelistarray = [];
        Get_sent_and_recevied_message.forEach(function (item){
            senderId = item.FromEmployeeId;
            Createddate = new Date(item.CreatedDate); 
            var sendDate = Createddate.getDate()<10?"0"+Createddate.getDate():Createddate.getDate();
            var sendMonth = Createddate.getMonth();
            var sendYear = Createddate.getFullYear();            
            var sendTime = Createddate.toLocaleTimeString();
            var FileId = item.FileId;
            var FileName = item.DocumentName;
            const dateConverter = (dateParam) => {
                var day = dateParam.getDate();
                var month = dateParam.getMonth() + 1;
                if (day < 10) {
                    day = "0" + (day);
                }
                if (month < 10) {
                    month = "0" + (month);
                }
                var year = dateParam.getUTCFullYear();
                var convertedDate = ( day + "-" + month + "-" + year);
                return convertedDate;
            }
            // The below function change the datetime string as time string and returns the time string with am/pm
            const timeConverter = (dateTimeParam) => { 
              var hours = dateTimeParam.getHours(); 
              var minutes = dateTimeParam.getMinutes(); 
              
              // Check whether AM or PM 
              var newformat = hours >= 12 ? 'PM' : 'AM';  
        
              hours = hours % 12;  
            
              hours = hours ? hours : 12;  
              minutes = minutes < 10 ? '0' + minutes : minutes; 
              var convertedTime = hours + ':' + minutes + ' ' + newformat; 
              return convertedTime;
            } 
            var createddatestring = dateConverter(Createddate);
        
             createdtimestring = timeConverter(Createddate);
       
            if(! datelistarray.includes(createddatestring)) {
                var currentDateString = new Date();
                
                var currentDate = dateConverter(currentDateString);
                
                 if(createddatestring == currentDate){
                    html += '<div class=" col-md-12 col-sm-12 text-center text-primary">Today</div></br>' 
                }else{
                    html += '<div class=" col-md-12 col-sm-12 text-center text-primary">'+createddatestring+'</div></br>'  ;
                } 
                datelistarray.push(createddatestring);
            }

            if(item.IsSeen == false && User_EmployeeID == item.ToEmployeeId){
                if(Notseen_Messages.includes(item.MessageId) == false){
                    Notseen_Messages.push(item.MessageId);
                }
                unreadMessage_count = Notseen_Messages.length;
                $('#message_notification_'+item.FromEmployeeId).html(unreadMessage_count);

                var filter_val = {
                    "MessageId": item.MessageId,
                    "Isseen": true
                };

                var Read_messageData = {
                    Method: "PostMessageSeen",
                    Data: filter_val
                };

                var read_message = PostDataCall(Read_messageData);

            }
            if(item.Message != null){
                html += '<div class="col-md-12 col-sm-12">';                  
                html += (User_EmployeeID != item.ToEmployeeId)?'<div class="in-message">':'<div class = "out-message">';
                html += '<small><span>'+sendTime+'</span></small>';
                html += '<label>'+item.Message +'</label></br>';
                html += '</div>';
                html += '</div>';
            }
            if(item.DocumentName != null && item.Message != null){
        
                var DocumentId = FileId.split(', ');
                var DocumentName= FileName.split(', ');
                var FileName = new Array();
                for (var id =0;id < DocumentId.length; id++)
                {
                    FileName[id] = DocumentName[id];
                    html += '<div class="col-md-12 col-sm-12">';
                    html += (User_EmployeeID != item.ToEmployeeId)?'<div class="in-message">':'<div class = "out-message">';
                    html += '<small><span>'+sendTime+'</span></small>';
                    html += '<label>Click to Download file</label></br>';
                    html += "<label>"+FileName[id]+"</label><button class='btn btn-primary btn-xs' onclick=downloadMsgFile('"+DocumentId[id]+"','"+item.MessageId+"')><span class='glyphicon glyphicon-arrow-down'></span></button></br>";
                    html += '</div>';
                    html += '</div>';
                }
            }   
        });
    }
    var BackupResource = callgetlist('GetBackupResource', '{"IsActive":1}');
    //get_unseenMessages(BackupResource);
    return html;
}


function chat_type_list(GetResourceYourPlan){
    var html = "";
    if (GetResourceYourPlan.length == 0) {
    html += "<p>No Data Found.!</p>";
    } else {
        html += '<div class="form-group">';
        GetResourceYourPlan.forEach(function (key, item) {
            sno = item + 1;
            html += '<input type="radio" class="form-check-input" name="messagetype" onchange="getType(this)" id="'+ key.MessageType +'_messagetype" value="'+ key.MessageType +'"><label>'+ key.MessageType +'</label>&nbsp&nbsp';
        })
        html += '</div>';
    }
    return html;
}

 //GetMessageType
  function getType(selectType){
    var SeletedValue = selectType.value;

    if(SeletedValue == "Chat" || SeletedValue == "Mail"){
        CKEDITOR.replace('chat_content_message');
        $('#message_dropzone').css('display','block');
    }else{
        if (CKEDITOR.instances.chat_content_message) CKEDITOR.instances.chat_content_message.destroy();
        $('#message_dropzone').css('display','none');
    }

    if(SeletedValue == "Chat" || SeletedValue == "SMS"){
        $(".chat-subject").css('display','none');
    }else{
        $(".chat-subject").css('display','block');
    }
}

//Code for Downloading File in chat - Added By Lingesh Deepak
function downloadMsgFile(FileId,MessageId) {
    swal({
      title: "Are you sure?",
      text: "You want to download the File",
      icon: "warning",
      buttons: true,
    })
      .then((willDownload) => {
        if (willDownload) {
          window.open(DownloadMSGFileURL + "DownloadFile?query=GetDownloadMessageFiles&filters={'MessageId':'" + MessageId + "','FileId':'" + FileId + "'}&Token=" + MessageSecurityToken, '_blank');
        }
      });
}

function project_table_list(data){
    var SARoutineDataGrid = $("#DisplayProjectLists")
      .dxDataGrid({
        dataSource: data,
        export: {
          enabled: true,
          allowExportSelectedData: true,
        },
        grouping: {
          autoExpandAll: true,
        },
        pager: {
          showPageSizeSelector: true,
          allowedPageSizes: [5, 10, 20],
          showInfo: true,
        },
        paging: {
          pageSize: 10,
        },
        groupPanel: {
          visible: true,
          emptyPanelText: "Drag a column"
        },
        sorting: {
          mode: "multiple",
        },
        selection: {
          mode: "multiple",
        },
        summary: {
          totalItems: [
            {
              column: "sno",
              summaryType: "count",
            },
          ],
          groupItems: [
            {
              column: "sno",
              summaryType: "count",
            },
          ],
        },
        editing: {
          mode: "popup",
          allowAdding: false,
          allowUpdating: false,
          useIcons: true,
        },
        columnChooser: {
          enabled: true,
        },
        rowAlternationEnabled: true,
        filterPanel: { visible: true },
        allowColumnReordering: true,
        allowColumnResizing: true,
        showBorders: true,
        columns: [
          {
            caption: "#",
            dataField: "sno",
            cssClass: "rno",
            allowGrouping: false,
            allowCollapsing: false,
            allReordering: false,
            width: 70,
            cellTemplate: function (container, options) {
              container.text(
                SARoutineDataGrid.pageIndex() * SARoutineDataGrid.pageSize() + options.rowIndex + 1
              );
            },
          },
          {
            caption: "Projects",
            dataField: "Projects",
          },
          {
            caption: "ProjectLeads",
            dataField: "ProjectLeads",
          },
          {
            caption: "ProjectType",
            dataField: "ProjectType",
          },
        ],
        onRowPrepared(e) {  
          if (e.rowType == 'data') {  
              if(e.data.ProjectTypeId == "4BE9AC26-A99A-4265-8404-ECC93D5E14F6"){ //Time and Material
                e.rowElement.css("background",'#ffd6cc'); 
                e.rowElement.removeClass("dx-row-alt");
              }              
               else if(e.data.ProjectTypeId == "52997530-4E69-416B-847E-76BE921947EC"){ //RandD
                  e.rowElement.css("background",'#ccffcc');
                  e.rowElement.removeClass("dx-row-alt");
               }              
               else if(e.data.ProjectTypeId == "8317CC89-A2F9-421A-95B8-30B945F93545"){ //Fixed Bit
                  e.rowElement.css("background",'#FFF59D');
                  e.rowElement.removeClass("dx-row-alt");
               }              
               else if(e.data.ProjectTypeId == "99E78791-6C84-40AB-A6D3-6DA3E5A03AAB"){ //Retainer
                e.rowElement.css("background",'#F15550');
                e.rowElement.removeClass("dx-row-alt");
               }              
               else if(e.data.ProjectTypeId == "B2B93FB7-1C7B-4773-A0A4-9A2D3A09445F"){ //Package
                e.rowElement.css("background",'#ffffb3');
                e.rowElement.removeClass("dx-row-alt");
               }else{
                e.rowElement.css("background",'white');
                e.rowElement.removeClass("dx-row-alt");
               }
           }  
        } 
      })
      .dxDataGrid("instance");
}

$("#ledgerIndividualPopup").dxPopup({  
    showTitle: true,  
    height:640,
title: 'Ledger Details',  
contentTemplate: function (contentElement) { 
    contentElement.append("<div id='ledger_reportGridIndividual' style='height:480px !important;'>");  
}  
});  

function ledger_getReportIndividualData(employId) {
    $("#ledgerIndividualPopup").dxPopup("instance").show(); 
	//var endDatae =new Date().toLocaleDateString();
    var date = new Date();
    var endDatae = moment(date).format('MM/DD/YYYY');
	var startDate = "10/10/2020";
		var leaveledgerData = callgetlist('GetLeaveLedgerDetails', '{"EmployeeId":"' + employId + '","EndDate":"'+ endDatae +'"}');
		var options = getDevExtremeGridJson();
        options.dataSource = leaveledgerData;
        options.columns = [
		{ caption: "Date", dataField: "DATE", dataType: "date", format: 'dd-MM-yyyy' },
		{ caption: "Details", dataField: "Description" },
		{
            caption: "Compensation",
            columns: [
            {
                caption: "Debit",
                dataField: "CPDebit"
            },
            {
                caption: "Credit",
                dataField: "CPCredit"
            },{
                caption: "Balance",
                dataField: "CPBalance"
            }]
        },
		{
            caption: "CL",
			columns: [ {
                caption: "Debit",
                dataField: "CLDebit"
            },{
                caption: "Credit",
                dataField: "CLCredit"
            }, {
                caption: "Balance",
                dataField: "CLBalance"
            },]
        },
		{
            caption: "EL",
			columns: [
            {
                caption: "Debit",
                dataField: "ELDebit"
            },{
                caption: "Credit",
                dataField: "ELCredit"
            },{
                caption: "Balance",
                dataField: "ELBalance"
            }]
        }];
        var dataGrid = $("#ledger_reportGridIndividual").dxDataGrid(options).dxDataGrid("instance");
        	
	};