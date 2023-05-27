
$(document).ready(function(){
    $("#Technology").dxTagBox();
    $("#Environment").dxTagBox();
    $("#Backend").dxTagBox();
});

function techdata(classname, method) {
    var option_variable = "";

    if (method == "GetTechnology") {
        option_variable = "Technology";
    }
    if (method == "GetEnvironment") {
        option_variable = "Environment";
    }

    if (method == "GetBackend") {
        option_variable = "Backend";
    }

    var filter_val = JSON.stringify({
        "IsActive": true
    });
    var result = callgetlist(method, filter_val);
    var get_ProposalId = localStorage.getItem('ProposalId');
    var set_ProposalId = "";
    if (get_ProposalId != "") {
        set_ProposalId = get_ProposalId;
    } else {
        ProposalSwal("OOPS!","PropsalId not found","error")
        return false;
    }

    var filter_val = JSON.stringify({
        "IsActive": true,
        "ProposalId": set_ProposalId
    });
    var loadTechDataVal = callgetlist('GetRFPTechnologyAndEnvironmentDetails', filter_val);
    // var options = "<option value=''>Select " + option_variable + " </option>";
    // for (var i = 0; i < result.length; i++) {
    //     options += "<option id='" + result[i].TechnologyandEnvironmentTypeId + "' value='" + result[i].SkillId + "' versionId='" + result[i].SkillVersionId + "' class='backend" + result[i].SkillId + "'>" + result[i].Skill + "</option>";
    // }
    if(loadTechDataVal.length == 0){
        $("#proposal-title-9").html('Technology and Environment');
    }else{
        $("#proposal-title-9").html(loadTechDataVal[0]['HeaderTitle']);
    }
    
    $(`#${option_variable}`).dxTagBox({
        dataSource: result,
        displayExpr: "Skill",
        valueExpr: "SkillId",
        searchEnabled: true,
        searchExpr: ['Skill', 'SkillId'],
        onValueChanged: function(e) {
            // debugger
            // console.log(e)
            // console.log(loadTechDataVal)
            if(e.previousValue.length != 0) {
                let deletedTag = e.previousValue.filter(x => !e.value.includes(x));
                if(deletedTag.length != 0) {
                    loadTechDataVal.forEach( (data) => {
                        if(data.SkillId === deletedTag[0]) {
                            // console.log(data.Id)
                            deleteTech(data.Id);
                        }
                    })
                }
              
            }
            if(e.value.length != 0) {
                if(option_variable === "Technology") {
                    $('.technology_error_message').html('');
                } else  if(option_variable === "Environment") {
                    $('.environment_error_message').html('');
                } else  if(option_variable === "Backend") {
                    $('.backend_error_message').html('');
                } 
            }
        }
    });

//    // $("." + classname).html(options);
//     var objMap = $.map(result, function (obj) {
//         obj.text = obj.text || obj.Skill;
//         obj.id = obj.id || obj.SkillId;
//         return obj;
//     });
//     $("." + classname).select2({
//         dropdownParent: $("#RfpModal"),
//         placeholder: "Select a Skill",
//         allowClear: true,
//         data: objMap
//     });
// getTech();
}



/*function GetTechnology(classname) {
	var filter_val = JSON.stringify({"IsActive":true });
	var result = callgetlist('GetTechnology', filter_val);
	var options = "<option value=''>Select Employee</option>";
	for (var i = 0; i < result.length; i++) {
		options += "<option value='"+ result[i].Id +"'>"+ result[i].Technology +"</option>";
	}
	$("."+classname).html(options);
}


function GetEnvironment(classname) {
	var filter_val = JSON.stringify({"IsActive":true });
	var result = callgetlist('GetEnvironment', filter_val);
	var options = "<option value=''>Select Employee</option>";
	for (var i = 0; i < result.length; i++) {
		options += "<option value='"+ result[i].Id +"'>"+ result[i].Environment +"</option>";
	}
	$("."+classname).html(options);
}



function GetBackend(classname) {
	var filter_val = JSON.stringify({"IsActive":true });
	var result = callgetlist('GetBackend', filter_val);
	var options = "<option value=''>Select Employee</option>";
	for (var i = 0; i < result.length; i++) {
		options += "<option value='"+ result[i].Id +"' class='backend"+result[i].Id+"'>"+ result[i].Backend +"</option>";
	}
	$("."+classname).html(options);
}
*/


// $(".add-technology").click(function () {
//     console.log('tech',$("#Technology").dxTagBox("instance").option('selectedItems'));  
//     console.log('env',$("#Environment").dxTagBox("instance").option('selectedItems'));  
//     console.log('back',$("#Backend").dxTagBox("instance").option('selectedItems'));  
//     // var technology_name = $('#technology option:selected').text();
//     // var technology_id = $('#technology option:selected').val();
//     // var version_id = $('#technology option:selected').attr("versionId");
//     // var TE_id = $('#technology option:selected').attr("id");
//     // if (technology_id != "" && technology_id!="0" && technology_name!="") {
//     //     $('#added_technology' + technology_id).remove();
//     //     $('#added_technology').append('<div id="added_technology' + technology_id + '" >' + technology_name + '<input type="button" class="btn-xs btn-danger del-btn-emp" tech_name="' + technology_name + '" name="technology" id="' + technology_id + '" value="x" ><input type="hidden" name="added_technology[]" class="added_technology" versionId="' + version_id + '" TE_Id="' + TE_id + '" value="' + technology_id + '" /></div>');
//     //     $('#technology option:selected').remove();
//     //     $('#technology').val("");
//     // }

//     let technologyData = $("#Technology").dxTagBox("instance").option('selectedItems');
//     technologyData.forEach(data => {
//         if (data.id != "" && data.id != "0" && data.text != "") {
//             $('#added_technology' + data.id).remove();
//             $('#added_technology').append('<div id="added_technology' + data.id + '" >' + data.text + '<input type="button" class="btn-xs btn-danger del-btn-emp" tech_name="' + data.text + '" name="technology" id="' + data.id + '" value="x" ><input type="hidden" name="added_technology[]" class="added_technology" versionId="' + data.SkillVersionId + '" TE_Id="' + data.TechnologyandEnvironmentTypeId + '" value="' + data.id + '" /></div>');
//         }
//     });
//     // $("#Technology").dxTagBox("instance").option('value','');
// });

// $(".add-environment").click(function () {

//     // var environment_name = $('#environment option:selected').text();
//     // var environment_id = $('#environment option:selected').val();
//     // var version_id = $('#environment option:selected').attr("versionId");
//     // var TE_id = $('#environment option:selected').attr("id");
//     // if (environment_id != "" && environment_id!="0" && environment_name!="") {
//     //     $('#added_environment' + environment_id).remove();
//     //     $('#added_environment').append('<div id="added_environment' + environment_id + '">' + environment_name + '<input type="button" class="btn-xs btn-danger del-btn-emp" tech_name="' + environment_name + '" name="environment" id="' + environment_id + '" value="x" ><input type="hidden" name="added_environment[]" class="added_environment" versionId="' + version_id + '" TE_Id="' + TE_id + '" value="' + environment_id + '" /></div>');
//     //     $('#environment option:selected').remove();
//     //     $('#environment').val("");

//     // }
//     let envioronmentData = $("#Environment").dxTagBox("instance").option('selectedItems');
//     envioronmentData.forEach(data => {
//         if (data.id != "" && data.id != "0" && data.text != "") {
//             $('#added_environment' + data.id).remove();
//             $('#added_environment').append('<div id="added_environment' + data.id + '">' + data.text + '<input type="button" class="btn-xs btn-danger del-btn-emp" tech_name="' + data.text + '" name="environment" id="' + data.id + '" value="x" ><input type="hidden" name="added_environment[]" class="added_environment" versionId="' + data.SkillVersionId + '" TE_Id="' + data.TechnologyandEnvironmentTypeId + '" value="' + data.id + '" /></div>');
//         }
//     });
//     $("#Environment").dxTagBox("instance").option('value','');
// });



// $(".add-backend").click(function () {

//     // var backend_name = $('#backend option:selected').text();
//     // var backend_id = $('#backend option:selected').val();
//     // var version_id = $('#backend option:selected').attr("versionId");
//     // var TE_id = $('#backend option:selected').attr("id");
//     // if (backend_id != "" && backend_id!="0" && backend_name!="") {
//     //     $('#added_backend' + backend_id).remove();
//     //     $('#added_backend').append('<div id="added_backend' + backend_id + '">' + backend_name + '<input type="button" class="btn-xs btn-danger del-btn-emp" tech_name="' + backend_name + '" name="backend" id="' + backend_id + '" value="x" ><input type="hidden" name="added_backend[]" class="added_backend" versionId="' + version_id + '" TE_Id="' + TE_id + '" value="' + backend_id + '" /></div>');
//     //     $('#backend option:selected').remove();
//     //     $('#backend').val("");
//     // }
//     let backEndData = $("#Backend").dxTagBox("instance").option('selectedItems');
//     backEndData.forEach(data => {
//         if (data.id != "" && data.id != "0" && data.text != "") {
//             $('#added_backend' + data.id).remove();
//             $('#added_backend').append('<div id="added_backend' + data.id + '">' + data.text + '<input type="button" class="btn-xs btn-danger del-btn-emp" tech_name="' + data.text + '" name="backend" id="' + data.id + '" value="x" ><input type="hidden" name="added_backend[]" class="added_backend" versionId="' + data.SkillVersionId + '" TE_Id="' + data.TechnologyandEnvironmentTypeId + '" value="' + data.id + '" /></div>');
//         }
//     });
//     $("#Backend").dxTagBox("instance").option('value','');
// });

// $('body').on('click', ".del-btn-emp", function () {
//     $(this).parent().remove();
//     var option_name = $(this).attr("tech_name");

//     var index = ($(this.id).selector);

//     //console.log(index);

//     //console.log(option_name);
//     $("#" + $(this.name).selector).append('<option value="' + $(this.id).selector + '" class="backend' + $(this.id).selector + '">' + option_name + '</option>');


//     /*$("#"+$(this.name).selector).html($("#"+$(this.name).selector+option').sort(function(x, y) {
//           return $(x).val() < $(y).val() ? -1 : 1;
//     }))
//     $("#"+$(this.name).selector).get(0).selectedIndex = 0;
//     e.preventDefault();*/


//     $(".dll option").eq(2).before($("<option></option>").val("").text("Select"));





// });



function AddTechData() {
    // if(($("#Technology").dxTagBox("instance").option('selectedItems').length !== 0) && ($("#Environment").dxTagBox("instance").option('selectedItems').length !== 0) && ($("#Backend").dxTagBox("instance").option('selectedItems').length !== 0)) {
        var get_ProposalId = localStorage.getItem('ProposalId');
        var set_ProposalId = "";
        if (get_ProposalId != "") {
            set_ProposalId = get_ProposalId;
        } else {
            ProposalSwal("OOPS!","PropsalId not found","error")
            return false;
        }
        var technology_title = $("#proposal-title-9").html();

        //For Title
        // var TechDetails = {
        //     "Title" : technology_title,
        //     "ProposalId": set_ProposalId,
        //     "SkillId": 0,
        //     "SkillVersionId": 0,
        //     "TechnologyandEnvironmentTypeId": 0
        // };

        // //console.log(TechDetails);

        // data = {
        //     "Method": "PostRFPTechnologyAndEnvironmentDetails",
        //     "Data": TechDetails
        // }

        // var postCall = PostDataCall(data);
        // if (postCall['IsSuccess'] == true) {
        //     //console.log(postCall['Message']);
        //     /*return true;*/
        // } else {
        //     //console.log(postCall);
        //     /*return true;*/
        // }

        let technologyData = $("#Technology").dxTagBox("instance").option('selectedItems');

        technologyData.forEach(data => {
            var TechDetails = {
                "Title" : technology_title,
                "ProposalId": set_ProposalId,
                "SkillId": data.SkillId,
                "SkillVersionId": data.SkillVersionId,
                "TechnologyandEnvironmentTypeId": data.TechnologyandEnvironmentTypeId
            };
    
            //console.log(TechDetails);
    
            data = {
                "Method": "PostRFPTechnologyAndEnvironmentDetails",
                "Data": TechDetails
            }
    
            var postCall = PostDataCall(data);
            if (postCall['IsSuccess'] == true) {
                //console.log(postCall['Message']);
                /*return true;*/
            } else {
                //console.log(postCall);
                /*return true;*/
            }
        });
        let envioronmentData = $("#Environment").dxTagBox("instance").option('selectedItems');
        envioronmentData.forEach(data => {
            var TechDetails = {
                "Title" : technology_title,
                "ProposalId": set_ProposalId,
                "SkillId": data.SkillId,
                "SkillVersionId": data.SkillVersionId,
                "TechnologyandEnvironmentTypeId": data.TechnologyandEnvironmentTypeId
            };
    
            //console.log(TechDetails);
    
            data = {
                "Method": "PostRFPTechnologyAndEnvironmentDetails",
                "Data": TechDetails
            }
    
            var postCall = PostDataCall(data);
            if (postCall['IsSuccess'] == true) {
                //console.log(postCall['Message']);
                /*return true;*/
            } else {
                //console.log(postCall);
                /*return true;*/
            }
        });
        let backEndData = $("#Backend").dxTagBox("instance").option('selectedItems');
        backEndData.forEach(data => {
            var TechDetails = {
                "Title" : technology_title,
                "ProposalId": set_ProposalId,
                "SkillId": data.SkillId,
                "SkillVersionId": data.SkillVersionId,
                "TechnologyandEnvironmentTypeId": data.TechnologyandEnvironmentTypeId
            };
    
            //console.log(TechDetails);
    
            data = {
                "Method": "PostRFPTechnologyAndEnvironmentDetails",
                "Data": TechDetails
            }
    
            var postCall = PostDataCall(data);
            if (postCall['IsSuccess'] == true) {
                //console.log(postCall['Message']);
                /*return true;*/
            } else {
                //console.log(postCall);
                /*return true;*/
            }
        });
        return true;
      
    // } else {
    //     if($("#Technology").dxTagBox("instance").option('selectedItems').length === 0) {
    //         $('.technology_error_message').html('Technology is Required');
    //     } else {
    //         $('.technology_error_message').html('')
    //     }
    //     if($("#Environment").dxTagBox("instance").option('selectedItems').length === 0) {
    //         $('.environment_error_message').html('Environment is Required')
    //     } else {
    //         $('.environment_error_message').html('') 
    //     }
    //     if($("#Backend").dxTagBox("instance").option('selectedItems').length === 0) {
    //         $('.backend_error_message').html('Backend is Required')
    //     } else {
    //         $('.backend_error_message').html('')
    //     }
    // }
    // var added_technology = new Array();
    // $('.added_technology').each(function () {
    //     added_technology.push({
    //         SkillId: $(this).val(),
    //         SkillVersionId: $(this).attr("versionId"),
    //         TechnologyandEnvironmentTypeId: $(this).attr("TE_Id")
    //     });
    // });

    //console.log(added_technology);

    // var added_environment = new Array();
    // $('.added_environment').each(function () {
    //     added_environment.push({
    //         SkillId: $(this).val(),
    //         SkillVersionId: $(this).attr("versionId"),
    //         TechnologyandEnvironmentTypeId: $(this).attr("TE_Id")
    //     });
    // });

    //console.log(added_environment);

    // var added_backend = new Array();
    // $('.added_backend').each(function () {
    //     added_backend.push({
    //         SkillId: $(this).val(),
    //         SkillVersionId: $(this).attr("versionId"),
    //         TechnologyandEnvironmentTypeId: $(this).attr("TE_Id")
    //     });
    // });

    //console.log(added_backend);

    // var err = 0;
    // if (added_technology.length == 0) {
    //     $('#technology').addClass('required_field');
    //     $("#technology").next("span").html('Please Select Technology.');
    //     err++;
    // } else {
    //     $('#technology').removeClass('required_field');
    //     $("#technology").next("span").html("");
    // }

    // if (added_environment.length == 0) {
    //     $('#environment').addClass('required_field');
    //     $("#environment").next("span").html('Please Select Environment.');
    //     err++;
    // } else {
    //     $('#environment').removeClass('required_field');
    //     $("#environment").next("span").html("");
    // }

    // if (added_backend.length == 0) {
    //     $('#backend').addClass('required_field');
    //     $("#backend").next("span").html('Please Select Backend.');
    //     err++;
    // } else {
    //     $('#backend').removeClass('required_field');
    //     $("#backend").next("span").html("");
    // }


    // if (err > 0) {
    //     return false;
    // } else {
    //     $('.TechError').removeClass("required_field");
    //     $('.error_message').html("");
    // }

    // var get_ProposalId = localStorage.getItem('ProposalId');
    // var set_ProposalId = "";
    // if (get_ProposalId != "") {
    //     set_ProposalId = get_ProposalId;
    // } else {
    //     alert("PropsalId not found");
    //     return false;
    // }

    // for (var i = 0; i < added_technology.length; i++) {


    //     var SkillId = added_technology[i]['SkillId'];
    //     var SkillVersionId = added_technology[i]['SkillVersionId'];
    //     var TechnologyandEnvironmentTypeId = added_technology[i]['TechnologyandEnvironmentTypeId'];

    //     //console.log(SkillId);

    //     var TechDetails = {
    //         "ProposalId": set_ProposalId,
    //         "SkillId": SkillId,
    //         "SkillVersionId": SkillVersionId,
    //         "TechnologyandEnvironmentTypeId": TechnologyandEnvironmentTypeId
    //     };

    //     //console.log(TechDetails);

    //     data = {
    //         "Method": "PostRFPTechnologyAndEnvironmentDetails",
    //         "Data": TechDetails
    //     }

    //     //console.log(data);

    //     var postCall = PostDataCall(data);
    //     if (postCall['IsSuccess'] == true) {
    //         //console.log(postCall['Message']);
    //         /*return true;*/
    //     } else {
    //         //console.log(postCall);
    //         /*return true;*/
    //     }

    // }


    // for (var i = 0; i < added_environment.length; i++) {
    //     var SkillId = added_environment[i]['SkillId'];
    //     var SkillVersionId = added_environment[i]['SkillVersionId'];
    //     var TechnologyandEnvironmentTypeId = added_environment[i]['TechnologyandEnvironmentTypeId'];

    //     var TechDetails = {
    //         "ProposalId": set_ProposalId,
    //         "SkillId": SkillId,
    //         "SkillVersionId": SkillVersionId,
    //         "TechnologyandEnvironmentTypeId": TechnologyandEnvironmentTypeId
    //     };

    //     //console.log(TechDetails);

    //     data = {
    //         "Method": "PostRFPTechnologyAndEnvironmentDetails",
    //         "Data": TechDetails
    //     }

    //     var postCall = PostDataCall(data);
    //     if (postCall['IsSuccess'] == true) {
    //         //console.log(postCall['Message']);
    //         /*return true;*/
    //     } else {
    //         //console.log(postCall);
    //         /*return true;*/
    //     }

    // }

    // for (var i = 0; i < added_backend.length; i++) {
    //     var SkillId = added_backend[i]['SkillId'];
    //     var SkillVersionId = added_backend[i]['SkillVersionId'];
    //     var TechnologyandEnvironmentTypeId = added_backend[i]['TechnologyandEnvironmentTypeId'];

    //     var TechDetails = {
    //         "ProposalId": set_ProposalId,
    //         "SkillId": SkillId,
    //         "SkillVersionId": SkillVersionId,
    //         "TechnologyandEnvironmentTypeId": TechnologyandEnvironmentTypeId
    //     };

    //     //console.log(TechDetails);

    //     data = {
    //         "Method": "PostRFPTechnologyAndEnvironmentDetails",
    //         "Data": TechDetails
    //     }

    //     var postCall = PostDataCall(data);
    //     if (postCall['IsSuccess'] == true) {
    //         //console.log(postCall['Message']);
    //         /*return true;*/
    //     } else {
    //         //console.log(postCall);
    //         /*return true;*/
    //     }

    // }

    // return true;

}


function getTech() {
// debugger
    var get_ProposalId = localStorage.getItem('ProposalId');
    var set_ProposalId = "";
    if (get_ProposalId != "") {
        set_ProposalId = get_ProposalId;
    } else {
        ProposalSwal("OOPS!","PropsalId not found","error")
        return false;
    }

    var filter_val = JSON.stringify({
        "IsActive": true,
        "ProposalId": set_ProposalId
    });
    var loadTechDataVal = callgetlist('GetRFPTechnologyAndEnvironmentDetails', filter_val);
    console.log('loadtechdata',loadTechDataVal)
    var technologyLoadData = [];
    var environmentLoadData = [];
    var backendLoadData = [];
    loadTechDataVal.forEach( (dataVal) => {
       
        if(dataVal.Names === "Language") {
            technologyLoadData.push(dataVal.SkillId)
        } else if(dataVal.Names === "OS") {
            environmentLoadData.push(dataVal.SkillId)

        } else if(dataVal.Names === "DataBase") {
            backendLoadData.push(dataVal.SkillId)

        } 
    })
    if(loadTechDataVal.length == 0){
        $("#proposal-title-9").html('Technology and Environment');
    }else{
        $("#proposal-title-9").html(loadTechDataVal[0]['HeaderTitle']);
    }
    $("#Technology").dxTagBox("instance").option('value', technologyLoadData);
    $("#Environment").dxTagBox("instance").option('value', environmentLoadData); 
    $("#Backend").dxTagBox("instance").option('value', backendLoadData);
    $("")
}




function deleteTech(deletedTag) {

    var deleteId = deletedTag;

    swal({
        title: "Are you sure?",
        text: "Do you want to delete?",
        icon: "warning",
        buttons: true,
      })
      .then((result) => {
        if (result) {
            data = {
                "Method": "DeleteRFPTechnologyAndEnvironment",
                "Data": {
                    "Id": deleteId,
                }
            }
            var postCall = PostDataCall(data);
            if (postCall['IsSuccess'] == true) {
                jQuery('#row_' + projectId).remove();
                ProposalSwal("Success!",postCall['Message'],"success");
            } else {
                ProposalSwal("OOPS!",postCall['Message'],"error");    
            }
        }
    });
}