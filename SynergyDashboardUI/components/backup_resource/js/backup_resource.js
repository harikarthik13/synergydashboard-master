
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


/*Open Message Modal*/
function openMessageModal() {
    $('#open_message').appendTo('body').modal('show');
    let editor = CKEDITOR.instances.message_content;
    if (editor) {
        editor.destroy(true); 
    }
        CKEDITOR.replace('message_content');
        
        var _backupResourceList = callgetlist('GetBackupResource', '{"IsActive":1}');
        //console.log(_backupResourceList);

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
function openProjectModal(Name) {
    $('#open_project').appendTo('body').modal('show')
    $('.project-label').html(Name + ' Projects');

    //GetBackResourceProject - Added By Bharath
    var GetBackResourceProject = callgetlist('GetBackResourceProject', '{"IsActive":1}');

    //Project Table List Section - Added By Bharath 
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
    //console.log('GetResourceYourPlan',GetResourceYourPlan);

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
    ////console.log('GetBackResourceLeavePlan',GetBackResourceLeavePlan);

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
    
    $("#Mail_messagetype").click(function(){
        // alert("Click Mail");
            $(".employeechat-subject").show();
    });
    $("#Chat_messagetype").click(function(){
        $(".employeechat-subject").hide();
    });
    $("#SMS_messagetype").click(function(){
        $(".employeechat-subject").hide();
    });
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
          html += '<div class="col-md-6 col-lg-4 ">';
          html += '<div class="panel panel-default">';
          html += '<div class="panel-body text-center users">';
          html += '<img src="' + key.ProfilePicture + '" class="img-circle" alt="User photo" width="50px" height="50px">';
          html += '<p>' + key.ResourceName +  '</p>';
          html +=  '<div class="row">';
          html +=  '<div class="col-sm-3">';
          html +=  '<a href="#" onclick="openSkillModal(\'' + Id  +'\', \'' + Name  +'\')" data-toggle="tooltip" title="Skills" ><i class="glyphicon glyphicon-education"></i></a>';
          html += '</div>';
          html +=  '<div class="col-sm-3">';
          html +=  '<a href="#" onclick="openProjectModal(\'' + Name  +'\')" data-toggle="tooltip" title="Project Details" ><i class="glyphicon glyphicon-cog"></i></a>';
          html +=  '</div>';
        //   html +=  '<div class="col-sm-3">';
        //   html +=   '<a href="#" onclick="openPlanModal(\'' + Id  +'\', \'' + Name  +'\')" data-toggle="tooltip" title="Plan" ><i class="glyphicon glyphicon-link"></i></a>';
        //   html +=  '</div>';
          html +=  '<div class="col-sm-3">';
          html +=  '<a href="#" onclick="openChatModal(\'' + Id  +'\', \'' + Name  +'\')" data-toggle="tooltip" title="Chat" id="chat"><i class="glyphicon glyphicon-envelope"><span class="badge count" id="message_notification_'+Id+'"></span></i></a>';
          html +=  '</div>';
          html +=   '<div class="col-sm-3">';
          html +=  '<a href="#"  onclick="openLeaveModal(\'' + Id  +'\', \'' + Name  +'\')" data-toggle="tooltip" title="Leave Plans" ><i class="glyphicon glyphicon-calendar"></i></a></span>';
          html +=  '</div>';
          html +=  '</div>';
          html +=  '<div class="row billablity">';
          html +=   '<span>160/160</span>';
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
        })
            html += '<div class="modal-body" data-simplebar>';
            html += '<h4>Primary Skills:&nbsp&nbsp'+ PrimaryResourceSkills +'</h4>'; 
            html += '<h4>Secondary Skills:&nbsp&nbsp'+ SecondaryResourceSkills +'</h4>';
            ////console.log(LevelOneResourceSkills.length);
            if(LevelOneResourceSkills.length > 0){
                html += '<h4>' + LevelOneResourceSkills + '&nbsp&nbsp<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></h4>';
            }
            if(LevelTwoResourceSkills.length > 0){
                html += '<h4>' + LevelTwoResourceSkills + '&nbsp&nbsp<i class="fas fa-star"></i><i class="fas fa-star"></i></h4>';
            }
            if(LevelThreeResourceSkills.length > 0){
                html += '<h4>' + LevelThreeResourceSkills + '&nbsp&nbsp<i class="fas fa-star"></i></h4>';
            }
            html += '</div>';
    }
    return html;
};


  /** Added By Bharath - PROJECT DETAILS **/
 function project_table_list(GetBackResourceProject){
    var html = "";
    if (GetBackResourceProject.length == 0) {
    html += "<p>No Data Found.!</p>";
    } else {
        html += '<table class="table" id="BackupResourceProjectList">';
        html += '<thead>';
        html += '<tr>';
        html += '<th>#</th>'
        html += '<th>Project</th>';
        html += '<th>Client</th>';
        html += '<th>Lead</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        GetBackResourceProject.forEach(function (key, item) {
             // //console.log('test');
            sno = item + 1;
            html += '<tr id="item_'+ item +'">';
            html += '<td>'+ sno +'</td>';
            html += '<td>'+ key.Project +'</td>';
            html += '<td>'+ key.client +'</td>';
            html += '<td>'+ key.Lead +'</td>';
            html += '</tr>';
        })
        html += '</tbody>';
        html += '</table>';
    }
    return html;
 }



/** Added By Bharath - YOUR PLAN **/
 function message_type_list(GetResourceYourPlan){
    var html = "";
    if (GetResourceYourPlan.length == 0) {
    html += "<p>No Data Found.!</p>";
    } else {
        html += '<div class="form-group">';
        GetResourceYourPlan.forEach(function (key, item) {
            sno = item + 1;
            html += '<input type="radio" class="form-check-input" name="messagetype" onchange="getType(this)" value="'+ key.MessageType +'"><label>'+ key.MessageType +'</label>&nbsp&nbsp';
        })
        html += '</div>';
    }
    return html;
 }


 //GetMessageType
//   function getType(selectType){
//     var SeletedValue = selectType.value;
//     if(SeletedValue == "SMS" || SeletedValue == "Chat"){
//         CKEDITOR.replace('plan_content_message');
//         //if (CKEDITOR.instances.plan_content_message) CKEDITOR.instances.plan_content_message.destroy();
//         $(".plan-subject").hide();
//     }
//     else{
//         CKEDITOR.replace('plan_content_message');
//         $(".plan-subject").show();
//     }

//     //Added by Lingesh
//     if(SeletedValue == "SMS"){
//         $('#btnAttachment').css('display','none');
//     }
//     else {
//         $('#btnAttachment').css('display','block');
//     }
// }

// PlanPostMethod - Added by Bharath
//   function planSubmit(){

//     var empId = $('#plan-id').val();
//     var planSubject = $('#plan-subject').val();
//     var Token = localStorage.getItem("login_securityToken");
//     var radioValue = $("input[name='messagetype']:checked").val();

//         let valOb = {
//         ob1 : (radioValue == "Chat") ? "1" : "0",
//         ob2 : (radioValue == "Mail") ? "1" : "0",
//         ob3 : (radioValue == "SMS") ? "1" : "0",
//         }
//     var messageContent = CKEDITOR.instances.plan_content_message.getData(); //Added by Lingesh
    
//     if(messageContent === ""){ //#plan_content_message
//         $('.message_text').html("Can't Send Empty Message");
//         return false;
//     }else{
//         $('.message_text').html('')
//     }

//    let PostMessageData = 
//     [{
//         "ToEmployeeId": empId,
//         "isChat": valOb.ob1,
//         "isEmail": valOb.ob2,
//         "isSMS": valOb.ob3,
//         "Subject": planSubject,
//         "MessageContent": messageContent,
//         "IsActive": "1"
//     }];

//     data_PostBakupResourceMessage = {
//         Method: "PostMessage",
//         Data: {
//             Data: `${JSON.stringify(PostMessageData)}` //Added by Lingesh
//         },
//         "Message":"",
//         "Status":" "
//     }

//     //console.log (data_PostBakupResourceMessage,'data_PostBakupResourceMessage');
//     let postMessageCall = PostDataCall(data_PostBakupResourceMessage);
//     //console.log(postMessageCall,'postMessageCall');
    
//     MessageId = postMessageCall.Data[0].MessageId;
//     //console.log(MessageId);
//     if(postMessageCall["IsSuccess"] == true){
//         var files = $('#attachment')[0].files; 
//         if (files.length > 0) {
//             for (i = 0; i < files.length; i++) {
//             var FileExtension = files[0].name.slice((Math.max(0, files[0].name.lastIndexOf(".")) || Infinity) + 1);
//             var formData = new FormData();
//             formData.append('files', files[i]);
//             var contentdetails =
//                 [{
//                     "DocumentTypeId": MessageId,
//                     "DocumentType": "MSG",
//                     "Extension": FileExtension,
//                     "ContentType": "application/pdf"
//                 }]
//             formData.append('contentdetails', JSON.stringify(contentdetails));
//             var result = postFileGeneric(formData);
//             //console.log(result,"File send");
//             }
//         }
//     }
    
//     if (postMessageCall['IsSuccess'] == true) {
//         var swalEMRSucc = {
//             title: 'Success!',
//             text: postMessageCall['Message'],
//             icon: "success"
//         }
//         swalAlert(swalEMRSucc);
//         get_sender_receiver_details(empId);
//         } else {
//             var swalEMRErr = {
//                 title: 'Warning!',
//                 text: postMessageCall['Message'],
//                 icon: "error"
//             }
//             swalAlert(swalEMRErr); 
//         }

// }


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
    if(Get_MentorId != null){
        if(Get_MentorId != localStorage.getItem("EmployeeID")){
            employeeId = Get_MentorId;  
        }
    }else{
        employeeId = $('#chat-id').val(); //localStorage.getItem("EmployeeID")
        // Performance Issue Commented by christlin, why it shoud be in else and outer scope??
        //get_sender_receiver_details(employeeId);
    }
    
    get_sender_receiver_details(employeeId);
    $("#employee_message_chat_list").scrollTop(10000000000000000000000000000);
    $("#message_chat_list").scrollTop(10000000000000000000000000000);
}

// Performance issue Commented by Christlin, Need to review
// // Added By Lingesh Deepak - Displaying the Sent and Recevied Messages

$('#open_employee_chat').on('show.bs.modal', function () {
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
    //console.log(Get_sent_and_recevied_message);
    var get_messages = get_message(Get_sent_and_recevied_message);
    $('#message_chat_list').html(get_messages);
    
}


// Added By Lingesh Deepak - Sending mail to resources and file attachment
function mail_to_resource(empId = null,From_Empolyee = null ,messageContent = null,files = null){
    //debugger;
    var messageFormData = new FormData();
    var ToEmployeeIdArray = (empId == null)?$("#backupResource_message").val():empId;
    var FromEmployeeID = (From_Empolyee == null)?localStorage.getItem("EmployeeID"):From_Empolyee;
    var message = (messageContent == null)?CKEDITOR.instances.message_content.getData():messageContent;
    
    //message sending
    var messageDetails =
    {
        fromId: FromEmployeeID,
        toId: ToEmployeeIdArray,
        message: escape(message)
    }
    
    messageFormData.append('messageDetails',JSON.stringify(messageDetails));
    
    //file sending
    var messagefiles =document.getElementById('sendMessage');
    if (messagefiles.files.length > 0) {
        for (var i = 0; i <= messagefiles.files.length - 1; i++) {
            var sendMessageFile = messagefiles.files.item(i);
            messageFormData.append('file'+(i+1),sendMessageFile);
        }
    }
   
    var result_sendmessage = sendMessage(messageFormData);
    
    if (result_sendmessage['IsSuccess'] == true) {
        var swalEMRSucc = {
            title: 'Success!',
            text: result_sendmessage['Message'],
            icon: "success"
        }
        swalAlert(swalEMRSucc);
    
        } else {
            var swalEMRErr = {
                title: 'Warning!',
                text: result_sendmessage['Message'],
                icon: "error"
            }
            swalAlert(swalEMRErr); 
        }

}

// Added by Lingesh Deepak L - Chat Model
function openChatModal(Id, Name) {                                                                                                                                                                                                                                                                                                                                                
    $('#open_chat').appendTo('body').modal('show');
    $('.chat-label').html( Name + ' - Chat');
    $('#chat-id').val(Id);

    Notseen_Messages = [];
    var GetResourceYourPlan = callgetlist('GetResourceYourPlan', '{"Iactive":1}');
    //console.log('GetResourceYourPlan',GetResourceYourPlan);

    var chat_type_list_html= chat_type_list(GetResourceYourPlan);
    $('#SelectChatType').html(chat_type_list_html);

    if(Get_MentorId == Id){
        $('#open_employee_chat').appendTo('body').modal('show');
        $('.chat_employee-label').html( Name + ' - Chat');
        $('#employeechat-id').val(Id);
        
        $('#SelectChatBoxType').html(chat_type_list_html);
        // $("#employee_message_chat_list").scrollTop(10000000000000000000000000000);

    }else{
        $('#open_chat').appendTo('body').modal('show');
        $('.chat-label').html( Name + ' - Chat');
        $('#chat-id').val(Id);

        $('#SelectChatType').html(chat_type_list_html);
        // $("#message_chat_list").scrollTop(10000000000000000000000000000);
    }
   
    $("#Mail_messagetype").click(function(){
        // alert("Click Mail");
        $(".employeechat-subject").show();
        $(".chat-subject").show();
    });
    $("#Chat_messagetype").click(function(){
        $(".employeechat-subject").hide();
        $(".chat-subject").hide();
    });
    $("#SMS_messagetype").click(function(){
        $(".employeechat-subject").hide();
        $(".chat-subject").hide();
    });
    
    Notseen_Messages = [];

    if(Get_MentorId == Id){
        // let editor = CKEDITOR.instances['employeechat_content_message'];
        // if (editor) {
        //     editor.destroy(true); 
        // }
        // CKEDITOR.replace('employeechat_content_message');

        try {
            CKEDITOR.instances.employeechat_content_message.destroy(true);
         }
         catch {
            var employeechat_content_message = CKEDITOR.replace(
               "employeechat_content_message",
               {}
            );
            }
    }else{
        let editor = CKEDITOR.instances.chat_content_message;
        if (editor) {
            editor.destroy(true); 
        }
        CKEDITOR.replace('chat_content_message');

    }
    

    //Default Value
    var radios = $('input:radio[name=messagetype]');
    if(radios.is(':checked') === false) {
        radios.filter('[value=Chat]').prop('checked', true);
    }
}

function chat_type_list(GetResourceYourPlan){
    var html = "";
    if (GetResourceYourPlan.length == 0) {
    html += "<p>No Data Found.!</p>";
    } else {
        html += '<div class="form-group">';
        GetResourceYourPlan.forEach(function (key, item) {
            sno = item + 1;
            html += '<input type="radio" class="form-check-input" name="messagetype" onchange="getType(this)" id="'+key.MessageType+'_messagetype" value="'+ key.MessageType +'"><label>'+ key.MessageType +'</label>&nbsp&nbsp';
        })
        html += '</div>';
    }
    return html;
}

 //GetMessageType
  function getType(selectType){

    var SeletedValue = selectType.value;
    if(SeletedValue == "SMS" || SeletedValue == "Chat"){
        if(Get_MentorId != null){
            if(Get_MentorId != localStorage.getItem("EmployeeID")){
                CKEDITOR.replace('employeechat_content_message');
                $(".employeechat-subject").hide();
            }
        }else{
            CKEDITOR.replace('chat_content_message');
            $(".chat-subject").hide();
        }
    }
    else if(SeletedValue =="Mail"){
        if(Get_MentorId != null){
            if(Get_MentorId !=localStorage.getItem("EmployeeID")){
                $(".employeechat-subject").show();
            }
        }
        else{
            $(".chat-subject").show();
        }
    }

    //Added by Lingesh
    if(SeletedValue == "SMS"){
        $('#btnAttachment').css('display','none');
    }
    else {
        $('#btnAttachment').css('display','block');
    }
}

// Added By Lingesh Deepak - Displaying the Sent and Recevied Messages

function get_sender_receiver_details(employeeId){
    var filter_val = {
        "ToEmployeeId" : employeeId
    }
   
    var Get_sent_and_recevied_message = callgetlist("GetMessages",JSON.stringify(filter_val));
    var get_messages = get_message(Get_sent_and_recevied_message);

    //Display messages - Resource Side Chat Area
    $('#employee_message_chat_list').html(get_messages);

    //Display messages - Backup Lead Side Chat Area
    $('#message_chat_list').html(get_messages);

    
}

// Added by Lingesh Deepak L - Chat message sending
function messageSubmit(){
//debugger;
    var messageFormData = new FormData();
    let postMessageCall;
    var empId,chatSubject;
    var From_Empolyee = localStorage.getItem("EmployeeID");
    if(Get_MentorId != null){
        if(Get_MentorId != localStorage.getItem("EmployeeID")){
            empId = Get_MentorId;  
            chatSubject = $('#employeechat-subject').val();
        }
    }else{
        empId = $('#chat-id').val();
        chatSubject = $('#chat-subject').val();
    }
    // var chatSubject = $('#employeechat-subject').val();
    var Token = localStorage.getItem("login_securityToken");
    var radioValue = $("input[name='messagetype']:checked").val();
    var messageContent;

        let valOb = {
        ob1 : (radioValue == "Chat") ? "1" : "0",
        ob2 : (radioValue == "Mail") ? "1" : "0",
        ob3 : (radioValue == "SMS") ? "1" : "0",
        }

    if(Get_MentorId != null){
        if(Get_MentorId == empId){
            messageContent = CKEDITOR.instances.employeechat_content_message.getData();
        }
    }else{
        messageContent = CKEDITOR.instances.chat_content_message.getData();
    }

    var files;
    if(Get_MentorId == empId){
        files = $('#employee_message_document_upload').get(0).dropzone.getAcceptedFiles();
    }else{
        files = $('#msg_document_upload').get(0).dropzone.getAcceptedFiles();
    }

    if(messageContent === ""){ //#plan_content_message
        $('.message_text').html("Can't Send Empty Message");
        $('.employee_message_text').html("Can't Send Empty Message");
        return false;
    }else{
        $('.message_text').html('');
        $('.employee_message_text').html('');
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
        // postMessageCall= mail_to_resource(empId,From_Empolyee,messageContent,files);
        var messageDetails =
        {
            fromId: From_Empolyee,
            toId: empId,
            message: escape( messageContent)
        }
    
        messageFormData.append('messageDetails',JSON.stringify(messageDetails));
        var result_sendmessage = sendMessage(messageFormData);
        // return false;
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
            if(Get_MentorId == empId){
                $('#employee_message_document_upload').val("");
                dropzone_remove_files();
            }else{
                $("#chat_content_message").val("");
                msg_dropzone_remove_files();
            }
    
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
        // html += "hai";
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
                //console.log('#message_notification_'+item.FromEmployeeId);

                var filter_val = {
                    "MessageId": item.MessageId,
                    "Isseen": true
                };

                var Read_messageData = {
                    Method: "PostMessageSeen",
                    Data: filter_val
                };

                var read_message = PostDataCall(Read_messageData);
                //console.log(read_message);

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
            html += '<input type="radio" class="form-check-input" name="messagetype" onchange="getType(this)" value="'+ key.MessageType +'"><label>'+ key.MessageType +'</label>&nbsp&nbsp';
        })
        html += '</div>';
    }
    return html;
}

 //GetMessageType
  function getType(selectType){
    var SeletedValue = selectType.value;
    if(SeletedValue == "SMS" || SeletedValue == "Chat"){
        //CKEDITOR.replace('chat_content_message');
        if (CKEDITOR.instances.chat_content_message) CKEDITOR.instances.chat_content_message.destroy();
        $(".chat-subject").hide();
    }
    else{
        CKEDITOR.replace('chat_content_message');
        $(".chat-subject").show();
    }

    //Added by Lingesh
    if(SeletedValue == "SMS"){
        $('#btnAttachment').css('display','none');
    }
    else {
        $('#btnAttachment').css('display','block');
    }
}

// Removing Attached File in DropZone - Added By Lingesh Deepak
function msg_dropzone_remove_files() {
    Dropzone.forElement("#msg_document_upload").removeAllFiles(true);
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
