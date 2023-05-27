function open_mode() {
  $("#family_name").val("");
  $("#family_name_err").html("");
  $(".ApiResponse").html("");
  $(".skillversionInputs").val("");
  $(".apiskilldetailsResponse").html("");
  $(".error_message").html("");
  $("#skillsetmodel")
    .appendTo("body")
    .modal("show");
}

$('#training_program_data').on('click' , (e) => {
  e.preventDefault()
  if($('#name').val() == '') {
    $('.program_error_message').html('Program name is required')
  } else {
    $('.program_error_message').html('')
  }
  if($('#training_dl_family').val() == '') {
    $('.family_error_message').html('family is required')
  } else {
    $('.family_error_message').html('')
  }
  if($('#training_dl_technology').val() == '' ||  $('#training_dl_technology').val() == -1) {
    $('.technology_error_message').html('technology is required')
  } else {
    $('.technology_error_message').html('')
  }
  if($('#training_dl_version').val() == '' || $('#training_dl_version').val() == -1) {
    $('.version_error_message').html('Program name is required')
  } else {
    $('.version_error_message').html('')
  }
  if($('#source').val() == '') {
    $('.source_error_message').html('source is required')
  } else {
    $('.source_error_message').html('')
  }
})

getSkillFamilies();
GetTechnologies();

function getSkillFamilies() {
  var filter_val = JSON.stringify({ IsActive: true });
  var result = callgetlist("GetSkillFamilies", filter_val);

  var options = "<option value=''>Select Family</option>";
  for (var i = 0; i < result.length; i++) {
    options +=
      "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
  }
  $("#training_dl_family").html(options);
}

function GetTechnologies() {
  var filter_val = JSON.stringify({ Isactive: true });
  var result = callgetlist("GetTechnology", filter_val);
  //console.log('result')
  //console.log(result)
  var options = "<option value=-1>Select Technology</option>";
  for (var i = 0; i < result.length; i++) {
    options +=
      "<option value='" +
      result[i].SkillId +
      "'>" +
      result[i].Skill +
      "</option>";
  }
  $("#training_dl_technology").html(options);
}

$("#training_dl_technology").on("change",function(){
    var training_dl_technology_selected = $("#training_dl_technology").val();
    //console.log(training_dl_technology_selected);
    GetVersion(training_dl_technology_selected);
})

function GetVersion(training_dl_technology_selected) {
  if(training_dl_technology_selected == -1)
  {
    var options = "<option value='-1'>Please Select Technology</option>";
  }
  else{
    var filter_val = JSON.stringify({SkillId: training_dl_technology_selected});
    var result = callgetlist("GetSkillVersions", filter_val);
    //console.log('result')
    //console.log(result)
    var options = "<option value='-1'>Select Skill Version</option>";
    for (var i = 0; i < result.length; i++) {
      options +=
        "<option value='" +
        result[i].Id +
        "'>" +
        result[i].Name +
        "</option>";
    }
  }
  $("#training_dl_version").html(options);
}

function skillsetEnvironment() {
  var filter_val = JSON.stringify({ IsActive: true });
  var result = callgetlist("GetSkillFamilies", filter_val);

  var options = "<option value=''>Select Family</option>";
  for (var i = 0; i < result.length; i++) {
    options +=
      "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
  }
  $("#skillsetFamilies").html(options);
}

function clear_skillset_error()
{
  $(".ApiResponse").removeClass("success_message");
  $(".ApiResponse").removeClass("error_message");
  $(".ApiResponse").html("");
  $("#family_name_err").removeClass("error_message");
  $("#family_name_err").html(""); 
}

function ClearSkillDetails(){
  getSkillFamilies();
  $('#newSkill').val('');
  $('#skillsetEnvironment').val('');
  $('#version').val('');
}

function SaveSkillFamilies() {
  $("#skillfamilyId").prop("disabled", true);
  var family_name = $("#family_name").val();
  if (family_name == "") {
    $("#family_name_err").html("Please Enter Family Name.");
    $(".ApiResponse").removeClass("success_message");
    $(".ApiResponse").removeClass("error_message");
    $(".ApiResponse").html("");
    return false;
  } else {
    $("#family_name_err").html("");
    $(".ApiResponse").removeClass("success_message");
    $(".ApiResponse").removeClass("error_message");
    $(".ApiResponse").html("");
  }

  var family = {
    SkillFamilies: family_name,
    IsActive: true
  };

  data = {
    Method: "PostSkillFamilies",
    Data: family
  };

  var postCall = PostDataCall(data);
  /* //console.log('Here I have set ProjectId 1 as default for temprory solution.');*/
 /*  $(".ApiResponse").removeClass("success_message");
  $(".ApiResponse").removeClass("error_message");
 */
 

  if (postCall["IsSuccess"] == true) {
    $(".ApiResponse").addClass("success_message");
    $(".ApiResponse").html(postCall["Message"]);
    $("#family_name").val("");
  } else {
    $(".ApiResponse").addClass("error_message");
    $(".ApiResponse").html(postCall["Message"]);
    $("#family_name").val("");
  }

  /* setTimeout(function() {
    $(".ApiResponse").fadeOut("slow", function() {
    $(".ApiResponse").html("");
    $("#skillfamilyId").prop("disabled", false);
    });
  }, 2500);
 */
  getSkillFamilies();
}

function SaveSkillDetails() {
  var family_id = $("#skillsetFamilies").val();
  if (family_id == "") {
    $("#family_nm_err").html("Please Select Family Name.");
    return false;
  } else {
    $("#family_nm_err").html("");
  }

  var newSkill = $("#newSkill").val();
  if (newSkill == "") {
    $("#skills_err").html("Please Enter Skills.");
    return false;
  } else {
    $("#skills_err").html("");
  }

  var skillsetEnvironment = $("#skillsetEnvironment").val();
  if (skillsetEnvironment == "") {
    $("#skillsetEnvironment_err").html("Please Select Skillset Environment.");
    return false;
  } else {
    $("#skillsetEnvironment_err").html("");
  }

  var version = $("#version").val();
  if (version == "") {
    $("#version_err").html("Please Enter Version.");
    return false;
  } else {
    $("#version_err").html("");
  }
  $("#addSkill").prop("disabled", true);

  var skillDetails = {
    FamilyID: family_id,
    SkillName: newSkill,
    TypeId: skillsetEnvironment,
    SkillVersion: version,
    IsActive: true
  };

  data = {
    Method: "PostSkillandversion",
    Data: skillDetails
  };

  var postCall = PostDataCall(data);
  $(".apiskilldetailsResponse").removeClass("success_message");
  $(".apiskilldetailsResponse").removeClass("error_message");

  if (postCall["IsSuccess"] == true) {
    $(".apiskilldetailsResponse").addClass("success_message");
    $(".apiskilldetailsResponse").html(postCall["Message"]);
    $(".skillversionInputs").val("");
  } else {
    $(".apiskilldetailsResponse").addClass("error_message");
    $(".apiskilldetailsResponse").html(postCall["Message"]);
  }

  setTimeout(function() {
    $(".apiskilldetailsResponse").fadeOut("slow", function() {
      $(".apiskilldetailsResponse").html("");
      $("#addSkill").prop("disabled", false);
    });
  }, 2500);
}
