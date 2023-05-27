/*  Skill info page   */

var SkillURL = SynergyAPIURL;

var data2 = [];
var messageBox2 = document.getElementById("display_SkillInfo");

var uploaded1 = false;
var uploaded2 = false;
var uploadedResume;
var isOrResumeUpdated = false;


function GetEmployeeResumes() {
  var result = callgetlist('GetEmployeeResumes', '');
  //console.log(result);
  for (var i = 0; i < result.length; i++) {
    if (result[i].FileId) {
      if (result[i].DocumentType == 'OR') {
        $("#orResume").removeClass("hidden");
        $("#resume").removeClass('no-resume');
      } else if (result[i].DocumentType == 'GR') {
        $("#grResume").removeClass("hidden");
        $("#resumeg2").removeClass('no-resume');
      }
    }
  }
}
GetEmployeeResumes();


function insert_SkillInfo(SkillId) {
  if (SkillId) {
    //alert(SkillId);
  }

  var localget = localStorage.getItem("UserCheckRes");
  var jsonData = JSON.parse(localget);

  ////console.log(localget);
  ////console.log(jsonData);
  ////console.log(SkillId);

  var skill_version = document.getElementById("skillversion").value;
  var skill_grade = document.getElementById("skill_grade").value;
  var family = document.getElementById("family").value;
  var skill = document.getElementById("skill").value;

  /*var resume = $('#resume').val();
  var g2resume = $('#resumeg2').val();*/

  if (family == "" || skill == "" || skill_version == "" || skill_grade == "") {

    if (skill_grade == "") {
      $('#skill_grade_error').html("Select Grade");
      $('#skill_grade').addClass('input-error');
    } else {
      $('#skill_grade_error').html("");
      $('#skill_grade').removeClass('input-error');
    }
    if (family == "") {
      $('#family_error').html("Select Family");
      $('#family').addClass('input-error');
    } else {
      $('#family_error').html("");
      $('#family').removeClass('input-error');
    }
    if (skill == "") {
      $('#skill_error').html("Select Skills");
      $('#skill').addClass('input-error');
    } else {
      $('#skill_error').html(" ");
      $('#skill').removeClass('input-error');
    }
    if (skill_version == "") {
      $('#skillversion_error').html("Select Version");
      $('#skillversion').addClass('input-error');
    } else {
      $('#skillversion_error').html(" ");
      $('#skillversion').removeClass('input-error');
    }
  }
  if (family != "" && skill != "" && skill_version != "" && skill_grade != "") {

    $('#skill_grade_error').html("");
    $('#skill_grade').removeClass('input-error');
    $('#family_error').html("");
    $('#family').removeClass('input-error');
    $('#skill_error').html(" ");
    $('#skill').removeClass('input-error');
    $('#skillversion_error').html(" ");
    $('#skillversion').removeClass('input-error');

    var data = [];
    if (SkillId) {
      //alert(1);
      data = {
        "Method": "PostEmployeeSkills",
        "Data": {
          // "EmployeeId": "",
          //"EmployeSkillId": SkillId,
          "EmployeeSkillMappingID": SkillId,
          "SkillVersionID": skill_version,
          "SkillGradeId": skill_grade
        }
      }
    } else {
      //alert(2);
      data = {
        "Method": "PostEmployeeSkills",
        "Data": {
          //"EmployeSkillId": SkillId,
          // "EmployeeId": "",
          "EmployeeSkillMappingID": null,
          "SkillVersionID": skill_version,
          "SkillGradeId": skill_grade
        }
      }
    }

    var postCall = PostDataCall(data);
    ////console.log(postCall);
    $("#SkillsetsBtn").attr("onclick", "insert_SkillInfo()");
    $("#SkillsetsBtn").attr("data-id", "");

    $(".skillset_status").attr("class", "skillset_status");
    $(".skillset_status").html("");
    $(".skillset_status").show();

    // ////console.log(postCall);
    if (postCall['IsSuccess'] == true) {
      $(".skillset_status").addClass("data_success");
      if (SkillId) {
        $(".skillset_status").html(postCall['Message']);
      } else {
        $(".skillset_status").html(postCall['Message']);
      }
      clearSkill_Info();
      var employee_id = "";
      var filter_val = JSON.stringify({
        "EmployeeId": employee_id
      });
      var result = callgetlist('GetEmployeeSkills', filter_val);
      // messageBox2.innerHTML = computeHTML_SkillInfo(result);
      $('#display_SkillInfo').html(computeHTML_SkillInfo(result));
    } else {
      $(".skillset_status").addClass("data_error");
      $(".skillset_status").html(postCall['Message']);
    }

    setTimeout(function () {
      $(".skillset_status").fadeOut("slow", function () {
        $(".skillset_status").html("");
      });
    }, 1500);

  } else {

  }
}

function clearSkill_Info() {
  document.getElementById("skill_grade").value = "";
  // document.getElementById("skill").value = "";
  document.getElementById("family").value = "";
  get_skill("");
  get_version("");
  //document.getElementById("skillversion").value = "";
}



function clearAndShow_SkillInfo() {
  // Clear our fields

  var filter_val = JSON.stringify();
  var result = callgetlist('GetSkillGrades', filter_val);

  ////console.log(result);

  var options = "<option value=''>Select Grade</option>";
  for (var i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
  }
  $("#skill_grade").html(options);

  // Api call to set Family in skillset
  var filter_val = JSON.stringify({ "IsActive": true });
  var result = callgetlist('GetSkillFamilies', filter_val);

  ////console.log(result);

  var options = "<option value=''>Select Family</option>";
  for (var i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
  }
  $("#family").html(options);


  // document.getElementById("skill_grade").value = "";
  // document.getElementById("skill").value = "";
  // document.getElementById("family").value = "";
  // document.getElementById("skillversion").value = "";
  var localget = localStorage.getItem("UserCheckRes");
  var jsonData = JSON.parse(localget);

  ////console.log(localget);  
  ////console.log(jsonData);

  //var employee_id = jsonData['Data'][0]['EmployeeID'];
  var employee_id = '';
  var filter_val = JSON.stringify({
    "EmployeeId": employee_id
  });
  var result = callgetlist('GetEmployeeSkills', filter_val);
  var token = jsonData['Data'] ? jsonData['Data'][0]['Token'] : "";
  var token_val = JSON.stringify({
    "Token": token
  });
  uploadedResume = callgetlist('GetEmployeeResumeFiles', token_val);
  // messageBox2.innerHTML = computeHTML_SkillInfo(result);
  $('#display_SkillInfo').html(computeHTML_SkillInfo(result));
  if (uploadedResume != undefined) {
    for (let i = 0; i < uploadedResume.length; i++) {
      if (uploadedResume[i]['DocumentType'] == "Original Resume") {
        var resume_type = 'OR';
        $('#originalresume_row').find('#or-upload-div').html("");
        $('#originalresume_row').find('#or-result-div').html("");
        if (uploadedResume[i]['Content'] != "") {
          $('#or-result-div').append(Employeeresume_result(resume_type, uploadedResume[i]['Extension']));
          $('#or_upload_div').append("<div></div>");
          $('#or-result-div').show();
        }
        else {
          $('#or_upload_div').append(Employeeresume_html(resume_type));
          $('#or_upload_div').show();
        }

      }
      else if (uploadedResume[i]['DocumentType'] == "G2 Resume") {
        var resume_type = 'GR';
        $('#g2resume_row').find('#gr-upload-div').html("");
        $('#g2resume_row').find('#gr-result-div').html("");
        $('#gr_upload_div').html("");
        if (uploadedResume[i]['Content'] != "") {
          $('#gr-result-div').append(Employeeresume_result(resume_type, uploadedResume[i]['Extension']));
          $('#gr_upload_div').hide();
          $('#gr-result-div').show();

        }
        else {
          $('#gr_upload_div').append(Employeeresume_html(resume_type));
          $('#gr_upload_div').show();
        }

      }

    }
  }
}

function Employeeresume_html(resume_type) {
  var fileId = "id='resumeg2'";
  if (resume_type == 'OR') {
    fileId = "id='resume'"
  }
  var html = "";
  html += '<div class="form-group inputDnD">';
  html += '<label class="sr-only" for="inputFile">File Upload</label>';
  onChange = "onchange = uploadResumeFiles('" + resume_type + "')";
  html += '<input type="file" class="form-control-file text-warning font-weight-bold" ' + fileId + ' accept = " .doc, .pdf " ' + onChange + ' data-title="Drop Files to upload or Browse"></div>'
  return html;

}

function Employeeresume_result(resume_type, ext) {
  ext == ".pdf" ? icon = "fa fa-file-pdf-o" : icon = "fa fa-file-text";
  var onclick = "onclick=removeResume('" + resume_type + "')";
  var downloadOnclick = "onclick=downloadResume('" + resume_type + "')";
  var html = "";
  html += "<div><span class='doc-icon'><i class='" + icon + "' hidden='true' > "
  html += "<span class='doc-name'><a class='resume-links' " + downloadOnclick + "> Resume" + ext + "</a ></span > "
  html += " <span><button class='doc-close-btn' " + onclick + " ><i class='fa fa-window-close'></i></button ></span ></div >"
  return html;
}

function downloadResume(resume_type) {
  var type = resume_type == 'GR' ? "G2 Resume" : "Original Resume";
  var filteredContent = uploadedResume.filter(function (item) {
    return item['DocumentType'] == type;
  });
  if (filteredContent.length > 0) {
    var ext = filteredContent[0]['Extension'];
    var byteCharacters = atob(filteredContent[0]['Content']);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);

    // now that we have the byte array, construct the blob from it
    var contentType = ext == '.doc' ? "application/msword" : "application/pdf";
    var blob1 = new Blob([byteArray], { type: contentType });

    var fileName = resume_type == 'GR' ? "Resume_G2" + ext : "Resume" + ext;
    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(blob1);
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0)
  }
}

function computeHTML_SkillInfo(result) {
  var html = "<table id='myTable'>";
  html += "<tr>";
  html += "<th>Grade</th>"
  html += "<th>Family</th>"
  html += "<th>Skills</th>"
  html += "<th>Version</th>"
  html += "<th>Action</th>"
  html += "</tr>";
  ////console.log(result);
  result.forEach(function (key, item) {
    var skillId = key.EmployeeSkillMappingId;
    html += "<tr class='row_" + item + "' id='row_" + skillId + "'>";
    html += "<td><input type='hidden' class='skill' value='" + key.SkillGradeId + "'> " + key.SkillGradeName + "</td>"
    html += "<td><input type='hidden' class='family' value='" + key.SkillFamilieId + "'> " + key.SkillFamilieName + "</td>"
    html += "<td><input type='hidden' class='skill_type' value='" + key.SkillID + "'>" + key.SkillName + "</td>"
    html += "<td><input type='hidden' class='version' value='" + key.SkillVersionId + "'>" + key.SkillVersionName + "</td>"
    // html += '<td><input type="button" class="btn btn-previous" value="Edit" onClick="editRow_SkillInfo(\'' + skillId + '\')" />&nbsp;&nbsp;'
    // html += '<input type="button" class="btn btn-previous" value="X" onClick="deleteRow_SkillInfo(\'' + skillId + '\')" />'
    // html += "</td>";
    html += "<td><button class='btn edit-btn' onclick=editRow_SkillInfo('" + skillId + "')><i class='fas fa-pencil-alt'></i></button>"
    html += "<button class='btn delete-btn' onclick=deleteRow_SkillInfo('" + skillId + "')><i class='fas fa-trash-alt'></i></button></td>"
    html += "</tr>";
  });
  html += "</table>"
  return html;
}


function editRow_SkillInfo(skillId) {
  var skill = jQuery("#row_" + skillId + " td .skill").val();
  var family = jQuery("#row_" + skillId + " td .family").val();
  var skill_type = jQuery("#row_" + skillId + " td .skill_type").val();
  var version = jQuery("#row_" + skillId + " td .version").val();
  var parent_fielset = jQuery("fieldset.skillsetField");
  parent_fielset.find("#skill_grade").val(skill);
  parent_fielset.find("#family").val(family);
  get_skill(family);
  parent_fielset.find("#skill").val(skill_type);
  get_version(skill_type);
  parent_fielset.find("#skillversion").val(version);
  parent_fielset.find("#SkillsetsBtn").attr("data-id", skillId);
  parent_fielset.find("#SkillsetsBtn").removeAttr("onclick");
  parent_fielset.find("#SkillsetsBtn").attr("onclick", "insert_SkillInfo('" + skillId + "')");
  parent_fielset.find(".error_message").html("");
  parent_fielset.find(".input-error").removeClass("input-error");
  //alert(skillId);
}


function deleteRow_SkillInfo(SkillId) {
  var result = confirm("Do you want to delete the skillset?");
  if (result) {
    // var localget = localStorage.getItem("UserCheckRes");
    // var jsonData = JSON.parse(localget);
    // var employee_id = jsonData['Data'][0]['EmployeeID'];

    if ($("#SkillsetsBtn").attr("data-id")) {
      var dataId = $("#SkillsetsBtn").attr("data-id");
      if (dataId == SkillId) {
        clearSkill_Info();
        jQuery("#SkillsetsBtn").attr("onclick", "insert_SkillInfo()");
        jQuery("#SkillsetsBtn").attr("data-id", "");
      }
    }

    var data = []
    data = {
      "Method": "DeleteEmployeeSkills",
      "Data": {
        "EmployeSkillId": SkillId,
      }
    }

    var postCall = PostDataCall(data);

    $(".skillset_status").attr("class", "skillset_status");
    $(".skillset_status").html("");
    $(".skillset_status").show();

    if (postCall['IsSuccess'] == true) {
      $(".skillset_status").addClass("data_success");
      $(".skillset_status").html(postCall['Message']);
      var row_class = $('#row_' + SkillId).attr('class');
      $('#row_' + SkillId).remove();
    } else {
      $(".skillset_status").addClass("data_error");
      $(".skillset_status").html(postCall['Message']);
      //////console.log('Something Went Wrong');
    }
    setTimeout(function () {
      $(".skillset_status").fadeOut("slow", function () {
        $(".skillset_status").html("");
      });
    }, 1500);

    // if (postCall['IsSuccess'] == true) {
    //   clearAndShow_SkillInfo();               
    // }else{
    //   alert("Unable to remove Skill Data");
    // }
  }

}

function FinalSubmit_update() {
  var error = 0;
  $(".error_message").html("");

  var hid_attr_or = $("#orResume").hasClass('hidden');
  if (hid_attr_or) {
    error = 1;
    $("#resume").parent('.resume').find(".error_message").html("Upload original resume is required");
  }
  var hid_attr_gr = $("#grResume").hasClass('hidden');
  if (hid_attr_gr) {
    error = 1;
    $("#resumeg2").parent('.resume').find(".error_message").html("Upload original g2resume is required");
  }

  // var hid_attr = $("#orResume").attr('hidden');
  //            if ((typeof hid_attr != typeof undefined || hid_attr != false ) && !uploaded1) {
  //               error = 1;
  //                $("#resume").parent('.resume').find(".error_message").html("Upload original resume is required");
  //            }
  // var hid_attr = $("#grResume").attr('hidden');
  //         if ((typeof hid_attr != typeof undefined || hid_attr != false) && !uploaded2) {
  //             error = 1;
  //             $("#resumeg2").parent('.resume').find(".error_message").html("Upload original g2resume is required");
  //         }
  // if($("#resume").hasClass('no-resume')) {
  //   error = 1;
  //   $("#resume").parent('.resume').find(".error_message").html("This field is required");
  // } 
  // if($("#resumeg2").hasClass('no-resume')) {
  //   error = 1;
  //   $("#resumeg2").parent('.resume').find(".error_message").html("This field is required");
  // } 
  if (error == 0) {
    var localget = localStorage.getItem("UserCheckRes");
    var jsonData = JSON.parse(localget);
    var employee_id = "";
    var filter_val = JSON.stringify({
      "EmployeeId": employee_id
    });
    var result = callgetlist('GetEmployeeSkills', filter_val);
    var skillsetDetails = [];
    skillsetDetails.push(result);
    ////console.log(skillsetDetails);
    if (skillsetDetails[0].length <= 0) {
      alert('Please add atleast one Skill set');
      // next_step = false;
    } else {
      // next_step = true;
      //localStorage.removeItem('UserCheckRes');
      //localStorage.removeItem('securityToken');
      //localStorage.removeItem('PasswordFieldRes');
      $("#skill-success").html("Updated successfully");
      //alert("You have successfully registered to new synergy.");   
      setTimeout(function () {
        window.history.back();
      }, 2000);
    }
  }
}


function FinalSubmit() {

  //console.log('final button clicked');


  var error = 0;
  $(".error_message").html("");


  // var hid_attr_or = $("#or_resume").hasClass('hidden');
  if(!isOrResumeUpdated){
    error = 1;
    // $("#resume").parent('.resume').find(".error_message").html("Upload original resume is required");
    $('.or_error_message').html('Upload original resume is required')
  }
  // if (!hid_attr_or) {
  //   ////console.log('has hidden in or');
  //   error = 1;
  //   $("#resume").parent('.resume').find(".error_message").html("Upload original resume is required");
  // }
  // var hid_attr_gr = $("#grResume").hasClass('hidden');
  // if (!hid_attr_gr) {
  //   error = 1;
  //   $("#resumeg2").parent('.resume').find(".error_message").html("Upload original g2resume is required");
  // }
  /*  var hid_attr = $("#orResume").attr('hidden');
               if ((typeof hid_attr != typeof undefined || hid_attr != false ) && !uploaded1) {
                  error = 1;
                   $("#resume").parent('.resume').find(".error_message").html("Upload original resume is required");
               }
    var hid_attr = $("#grResume").attr('hidden');
            if ((typeof hid_attr != typeof undefined || hid_attr != false) && !uploaded2) {
                error = 1;
                $("#resumeg2").parent('.resume').find(".error_message").html("Upload original g2resume is required");
            }*/
  // if($("#resume").hasClass('no-resume')) {
  //   error = 1;
  //   $("#resume").parent('.resume').find(".error_message").html("This field is required");
  // } 
  // if($("#resumeg2").hasClass('no-resume')) {
  //   error = 1;
  //   $("#resumeg2").parent('.resume').find(".error_message").html("This field is required");
  // } 
  if (error == 0) {
    var localget = localStorage.getItem("UserCheckRes");
    var jsonData = JSON.parse(localget);
    var employee_id = "";
    var filter_val = JSON.stringify({
      "EmployeeId": employee_id
    });
    var result = callgetlist('GetEmployeeSkills', filter_val);
    if (result == "") {
      alert('Please add your skill sets');
      next_step = false;
      return false;
    }

    //console.log(result);
    var skillErr = 0;
    for (var i = 0; i < result.length; i++) {
      if (result[i].SkillGradeId == '9D5255DE-0214-4EF1-A92C-D28096F737F0') { skillErr++; }
    }
    //alert(skillErr);
    if (skillErr == 0) {
      alert('Primary skill grade is manditory');
      next_step = false;
      return false;
    } else {
      ////console.log("completed");
      //return false;
      var Data = {
        "Method": "UpdateStageCompleted",
        "Data": {
          "StageNumber": 7
        }
      }
      var postCall = PostDataCall(Data);
      ////console.log(postCall);
      // next_step = true;  
      localStorage.removeItem('UserCheckRes');
      localStorage.removeItem('securityToken');
      localStorage.removeItem('PasswordFieldRes');
      $("#skill-success").html("You have successfully register. Please wait will redirect to login page.");
      //alert("You have successfully registered to new synergy.");   
      setTimeout(function () {
        location.href = './index.html';
      }, 2000);
    }
  }
}

function get_version(skill_id) {
  var skill_id = skill_id;
  var filter_val = JSON.stringify({
    "SkillId": skill_id
  });
  var result = callgetlist('GetSkillVersions', filter_val);

  var options = "<option value=''>Select Skill Version</option>";
  for (var i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
  }
  $("#skillversion").html(options);

}


function get_skill(family_id) {
  var family_id = family_id;
  var filter_val = JSON.stringify({
    "FamilyId": family_id
  });
  var result = callgetlist('GetSkills', filter_val);
  var options = "<option value=''>Select Skills</option>";
  for (var i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
  }
  $("#skill").html(options);
  get_version("");
}

$('#resume').change(function () {
  if ($('#resume').val() != '') {
    $('#resume_original').prop('disabled', false);
    var fileExtension = ['pdf', 'doc', 'docx', 'odt'];
    if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
      alert("Only formats are allowed : " + fileExtension.join(', '));

      $('#resume').val('');
    }
    var filename = $('#resume').val().replace(/C:\\fakepath\\/, '');
    var extension = filename.split('.').pop();
    var extensionPart = extension;
    $('#originalresume').html(filename.substring(0,10)+'.'+extensionPart);
  }
});

$('#resumeg2').change(function () {
  if ($('#resumeg2').val() != '') {
    $('#resume_g2').prop('disabled', false);
    var fileExtension = ['pdf', 'doc', 'docx', 'odt'];
    if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
      alert("Only formats are allowed : " + fileExtension.join(', '));

      $('#resumeg2').val('');
    }
    var filename =$('#resumeg2').val().replace(/C:\\fakepath\\/, '');
    var extension = filename.split('.').pop();
    var extensionPart = extension;
    $('#g2resume').html(filename.substring(0,10)+'.'+extensionPart);
  }
});

function uploadResumeFiles(resume_type) {
  var data = new FormData();
  if (resume_type == 'OR') {
    $("#or_error_message").html("");
    if (document.getElementById("resume").value != "") {
      var file = document.getElementById("resume").files[0];
      var ext = file.name.split('.').pop();
      if (ext != 'pdf' && ext != "doc" && ext != "docx") {
        $('#or_error_message').html("Please Drop .pdf,.Doc,.docx");
        return;
      }

      if (window.FormData !== undefined) {
        file.DocumentType = "OR"
        data.append("file", file);
        $("#or_resume").addClass('hidden');


      }
    } else {
      data.append("file", null);
      $("#or_error_message").html("Please select a file");
    }
    data.append("documentType", "OR");
    $("#resume").val("");
  } else if (resume_type == 'GR') {
    $("#gr_error_message").html("");
    if (document.getElementById("resumeg2").value != "") {
      var fileg2 = document.getElementById("resumeg2").files[0];
      var extg2 = fileg2.name.split('.').pop();
      if (extg2 != 'pdf' && extg2 != "doc" && extg2 != "docx") {
        $('#gr_error_message').html("Please Drop .pdf,.Doc,.docx");
        return;
      }

      if (window.FormData !== undefined) {
        fileg2.DocumentType = "GR"
        data.append("file", fileg2);

        $("#grResume").addClass('hidden');
      }
    } else {
      data.append("file", null);
      $("#gr_error_message").html("Please select a file");
    }
    data.append("documentType", "GR");
    $("#resumeg2").val("");
  }
  $.ajax({
    type: "POST",
    url: SkillURL + "PostFiles",
    contentType: false,
    processData: false,
    data: data,
    headers: {
      "SecurityToken": localStorage.getItem("securityToken"),
    },
    success: function (result) {
      ////console.log(result);
      var localget = localStorage.getItem("UserCheckRes");
      var jsonData = JSON.parse(localget);
      var token = jsonData['Data'] ? jsonData['Data'][0]['Token'] : "";
      var token_val = JSON.stringify({
        "Token": token
      });
      uploadedResume = callgetlist('GetEmployeeResumeFiles', token_val);
      if (resume_type == 'OR') {
        if (result['IsSuccess'] == true) {
          isOrResumeUpdated = true;
          $('.or-res-con').addClass('hidden')
          $('.uploadedOrres').removeClass('hidden')
          $("#or_success_message").html("");
          $("#or_error_message").html("");
          uploaded1 = true;
          // $("#resume").parent('.resume').find(".success_message").html(result['Message']);
          $("#or_success_message").html(result['Message']);
          $("#or-upload-div").hide();
          $("#or-result-div").show();
          $('#or-result-div').html("");
          $('#or-result-div').append(Employeeresume_result(resume_type, "." + ext));
          // var $el = jQuery('#resume');
          // $el.wrap('<form>').closest('form').get(0).reset();
          // $el.unwrap();
          // $("#or_resume").prop("hidden", true);
          // var hid_attr = $("#orResume").attr('hidden');
          // if (typeof hid_attr != typeof undefined && hid_attr != false) {
          //   $("#orResume").removeAttr('hidden');
          // }
        } else {
          $("#or_error_message").html(result['Message']);
        }
        setTimeout(function () {
          $("#or_success_message").html("");
          $("#or_error_message").html("");
        }, 2000);

      } else if (resume_type == 'GR') {
        if (result['IsSuccess'] == true) {
          $('.gr-res-con').addClass('hidden')
          $('.uploadedGrres').removeClass('hidden')
          uploaded2 = true;
          $("#gr_success_message").html(result['Message']);
          $("#gr-upload-div").hide();
          $("#gr-result-div").show();
          $('#gr-result-div').html("");
          $('#gr-result-div').append(Employeeresume_result(resume_type, "." + extg2));
          // $("#resumeg2").parent('.resume').find(".success_message").html(result['Message']);
          // var $el = jQuery('#resumeg2');
          // $el.wrap('<form>').closest('form').get(0).reset();
          // $el.unwrap();
          // $("#gr_resume").attr("hidden", true);
          // var hid_attr = $("#grResume").attr('hidden');
          // if (typeof hid_attr != typeof undefined && hid_attr != false) {
          //   $("#grResume").removeAttr('hidden');
          // }
        } else {
          $("#gr_error_message").html(result['Message']);
        }
        setTimeout(function () {
          $("#gr_success_message").html("");
          $("#gr_error_message").html("");
        }, 2000);
      }
    },
    error: function (xhr, status, p3, p4) {
      var err = "Error " + " " + status + " " + p3 + " " + p4;
      if (xhr.responseText && xhr.responseText[0] == "{")
        err = JSON.parse(xhr.responseText).Message;
      ////console.log(err);
    }
  });
}
function removeResumeRegister(resume_type){
  if(resume_type == 'OR'){
    isOrResumeUpdated = false;
    $('.uploadedOrres').addClass('hidden')
    $('.or-res-con').removeClass('hidden')
  }
  if(resume_type == 'GR'){
    $('.uploadedGrres').addClass('hidden')
    $('.gr-res-con').removeClass('hidden')
  }
}
function removeResume(resume_type) {
  if (resume_type == 'GR') {
    $('#gr-result-div').hide();
    $('#gr-result-div').html("");
    $("#gr-upload-div").html("");
    $("#gr-upload-div").html(Employeeresume_html(resume_type));
    $("#gr-upload-div").show();
  }
  else {
    $('#or-result-div').hide();
    $('#or-result-div').html("");
    $("#or-upload-div").html("");
    $("#or-upload-div").html(Employeeresume_html(resume_type));
    $("#or-upload-div").show();
  }

}

// DownloadOR
function DownloadOR(type) {
  //debugger;
  var result = callgetlist('GetEmployeeResumes', filter_val);
  //////console.log(result[data]);   

  for (var i = 0; i < result.length; i++) {
    //options += "<option value='" + result[i].Id + "'>" + result[i].Status + "</option>";
    if (result[i].DocumentType == type) {
      ////console.log(result[i].FileId);
      var filter_val = JSON.stringify({
        "FileId": result[i].FileId
      });

      window.open(SkillURL + "DownloadPdfFile?query=DownloadFile&filters={'FileId':'" + result[i].FileId + "'}&Token=" + localStorage.getItem("securityToken"), '_blank')

    }

  }

  //var result = callgetlist('DownloadFile', filter_val);

}

$(document).ready(function () {

  $("#resume_original").prop('disabled', true);
  $("#resume_g2").prop('disabled', true);
  jQuery('#or_resume').on('click', function (e) {
    var $el = jQuery('#resume');
    $el.wrap('<form>').closest('form').get(0).reset();
    $el.unwrap();
    $(this).prop("hidden", true);
  });
  jQuery('#gr_resume').on('click', function (e) {
    var $el = jQuery('#resumeg2');
    $el.wrap('<form>').closest('form').get(0).reset();
    $el.unwrap();
    $(this).prop("hidden", true);
  });
});



$(".skill-resume").change(function () {
  var vidFileLength = $(this)[0].files.length;
  if (vidFileLength != 0) {
    $(this).parent('.resume').find(".reset-resume").removeAttr('hidden');
    $(this).parents('.resume').find(".err_message").html("");
  }
});