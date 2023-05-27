var SecurityToken = localStorage.getItem("securityToken");
var RFP_ICode = '';
function GetAssignDropdown(clientclassname) {
  var filter_val = JSON.stringify({
    "IsActive": true
  });
  var result = callgetlist('GetAssign', filter_val);
  
  // var SetProposalId = localStorage.getItem('ProposalId');
  // console.log(SetProposalId + "GetAssign");
  // var proposal = GetEstimateRFPDetails(SetProposalId);
 
  var options = "<option value=''>Select </option>";
  var selected = " ";
  for (var i = 0; i < result.length; i++) {
  
    options += "<option value='" + result[i].ID +"'>" + result[i].Action + "</option>";
  }
  $("." + clientclassname).html(options);
}


$('#Assign').change(function () {
  var id = $(this).val();
  // if (id == "8B07B09B-6862-4FBE-99E2-E34807CA4E36") {
  //   GetEmployeesByDesignation('ba', 'employees_list');
  // } else if (id == "7AF2D744-B400-41DF-8C2C-E0A931CDDB37") {
  //   GetEmployeesByDesignation('developer', 'employees_list');
  // } else if (id == "84F89F05-CD87-4EAC-8828-8374483D2889") {
  //   GetEmployeesByDesignation('lead', 'employees_list');
  // } else {
  //   //console.log('Id value doesn"t match');
  // }
  GetEmployeesByAssignType(id, 'employees_list');
});



function AddAssign() {
  // debugger
  var Assign_type = $('#Assign').val();
  var AssignedTo = $('#assign_employee').val();
  RFP_Icode  = $('#RFPI_Code').html();
  if (Assign_type == '') {
    $("#assign_err").html('Please select a option to assign ');
    return false;
  } else {
    $("#assign_err").html('');
  }

  if (AssignedTo == '') {
    $("#assign_emplyoee_err").html('Please select assign Employee.');
    return false;
  } else {
    $("#assign_emplyoee_err").html('');
  }

  if (Assign_type == "7AF2D744-B400-41DF-8C2C-E0A931CDDB37") {
    type = "E";
  } else if (Assign_type == "84F89F05-CD87-4EAC-8828-8374483D2889") {
    type = "R";
  } else if (Assign_type == "8B07B09B-6862-4FBE-99E2-E34807CA4E36") {
    type = "P";
  } else if (Assign_type == "2F57EF6B-D14C-4E30-9990-357B8DA17160") {
    // if (RFP_ClientAndMarketingSubmissionValidation() === false) {
    //   return false;
    // }
    type = "C";
  } else if (Assign_type = "8B047E29-9E33-4846-8AD4-FF5169DD4E5C") {
    // if (RFP_ClientAndMarketingSubmissionValidation() === false) {
    //   return false;
    // }
    type = "M";
  }

  var get_ProposalId = localStorage.getItem('ProposalId');
  var set_ProposalId = "";
  if (get_ProposalId != "") {
    set_ProposalId = get_ProposalId;
  } else {
    ProposalSwal("OOPS!","PropsalId not found","error")
    return false;
  }


  var Assign_obj = {
    "AssignedTo": AssignedTo,
    "ProposalId": set_ProposalId,
    "Type": type,
    "StageNumber": 13
  };

  data = {
    "Method": "PostRFPAssign",
    "Data": Assign_obj
  }

  var postCall = PostDataCall(data);
  if (postCall['IsSuccess'] == true) {
    if (Assign_type = "8B047E29-9E33-4846-8AD4-FF5169DD4E5C") {
      OldRFPStatusdata = {
        "Method": "PostOldRFPStatusForWorkOrder",
        "Data": {
          "RFPICode": RFP_Icode,
          "RFPStatus": 3,
          "Message": "",
          "Status": "",
        }
      }

      var postCallOldRFPStatus = PostDataCall(OldRFPStatusdata);
    }

    var localStorageProposalId = localStorage.getItem('ProposalId');
    AssignProposalSwal("Success!","RFP assigned successfully","success");
    var SetProposalId = "";
    if (localStorageProposalId != "") {
      SetProposalId = localStorageProposalId;
    }

    $("#RfpModal .close").click();
    return true;
  } else {
    return true;
  }
}


//Get values onclick of Preview Button - PDF
function setPdfdetailsforPreview(){
  stepNumber = localStorage.getItem('edit_step_number');
  if(stepNumber == 13){
    SetProposalId = localStorage.getItem('ProposalId');
    GetEstimateRFPDetails(SetProposalId);
    GetEstimateCreators(SetProposalId);
    GetUserStoryandUnderstand(SetProposalId);
    displayProjectPhase();
    displayEstimateProjectDetails();
    var success_currency = displayEstimatePricing();
    GetCurrencies('currency');
    $('.currency').val(success_currency);
    GetAssumptionForRFP(SetProposalId);
    GetOutofScopesForRFP(SetProposalId);
    displayEstimateHeader(SetProposalId);
    techdata('technology', 'GetTechnology');
    techdata('environment', 'GetEnvironment');
    techdata('backend', 'GetBackend');
    getTech();
    GetOtherNotesForRFP(SetProposalId);
    GetSuggestionsForRFP(SetProposalId);
    displayDeliverableProjectPhase();
  }
}

//PDF Preview Button (PRINT)
$('#proposal_preview_btn').click(function() {
  generatePdf();
  //var myPath = "content" + ".pdf";

  var win = window.open('','printwindow');
  win.document.body.innerHTML = '';
  //To save default file name
  var proposalPdfClientName="";
  if($('#name_inproposal').val()==""){
    proposalPdfClientName = $('#client-name').val()
  }else{
proposalPdfClientName = $('#name_inproposal').val()
  }
  var proposal_document_name = $('#document_name').val();
  var proposal_client_name = proposalPdfClientName;
  var proposal_proposal_date = $('#proposalDate').val();
  var tempTitle = proposal_document_name +"/"+ proposal_client_name +"/"+ proposal_proposal_date;
  var myjs = '<script src="./js/library/jquery-1.11.1.min.js"></script>';
  win.document.write(myjs + $("#pdf_content").html());
  //To save default file name
  win.document.title = tempTitle;
});


function generateProposalPdf(){
  generatePdf();
  //var myPath = "content" + ".pdf";

  var win = window.open('','printwindow');
  win.document.body.innerHTML = '';
  //To save default file name
   var proposal_document_name = $('#document_name').val();
  var proposal_client_name = $('#client-name').val();
  var proposal_proposal_date = $('#proposalDate').val();
  var tempTitle = proposal_document_name +"/"+ proposal_client_name +"/"+ proposal_proposal_date;
  var myjs = '<script src="./js/library/jquery-1.11.1.min.js"></script>';
  win.document.write(myjs + $("#pdf_content").html());
  //To save default file name
  win.document.title = tempTitle;
}

//Onclick of Preview button for PDF generate values
function generatePdf(){
  /** General deatils **/
  SetProposalId = localStorage.getItem('ProposalId');
  var BdeId,AssignedTo,DocVersion,DocType;
  var filter_val = JSON.stringify({
    IsActive: true,
    ProposalId: SetProposalId,
  });
  var result = callgetlist("GetEstimateRFPDetails", filter_val);

  var assign_list = JSON.stringify({
    IsActive: true,
    AssignType: "2F57EF6B-D14C-4E30-9990-357B8DA17160", //Client Submission
  });

  
  var employees_list = callgetlist("GetEmployeesByAssignType", assign_list);
  // console.log(employees_list);
    BdeId = result[0]["BDEid"];
    $("#bde_id").text(BdeId);

    DocType = result[0]["DocumentType"];
    $("#doc_type").text(DocType);

    RFPICode = result[0]["RFPICode"];
    $("#RFP_ICode").text(RFPICode);

    DocVersion = result[0]["DocumentVersion"];
    $("#version_no").text(DocVersion);

    AssignedTo = result[0]["AssignedToID"]
    employees_list.forEach(function (key, item) {
      // console.log(key.Id);
        if(key.Id == AssignedTo){
          $("#assignedto").text(key.Id );
          // console.log(key.Id,'AssignedTo');
        }else{
          $("#assignedto").text();
        }
    })
    var proposalPdfClientName="";
    var proposalPdfAddress="";
    if($('#client-name_inproposal').val()==""){
      proposalPdfClientName = $('#client-name').val();
    }else{
  proposalPdfClientName = $('#client-name_inproposal').val();
    }
    if($('#address_inproposal').val()==""){
      proposalPdfAddress = $('#address').val();
    }else{
      proposalPdfAddress = $('#address_inproposal').val();
    }
  var proposal_estimation_number = $('#estimate_number').val();
  var proposal_document_name = $('#document_name').val();
  var proposal_client_name = proposalPdfClientName;
  var proposal_contact_person = $('#contact-person').val();
  var proposal_proposal_date = $('#proposalDate').val();
  var proposal_address = proposalPdfAddress;
  var total_value_estimate = $('#total_Total').html();
  var selected_currency = $('#proposalCurrency option:selected').html();
  var selected_currency_val = $('#proposalCurrency option:selected').val();
  var userstory_title = $("#proposal-title-3").html();
  var estimate_title = $("#proposal-title-6").html();
  var othernotes_title = $("#proposal-title-10").html();
  var outofscope_title = $("#proposal-title-8").html();
  var assumptions_title = $("#proposal-title-7").html();
  var suggestions_title = $("#proposal-title-11").html();

  $("#pdf_estimation_number").html(proposal_estimation_number);
  $(".pdf_document_name").html(proposal_document_name);
  $("#pdf_client_name").html(proposal_client_name);
  $("#pdf_contact_person").html(proposal_contact_person);
  $("#pdf_proposal_date").html(proposal_proposal_date);
  $("#pdf_proposal_address").html(proposal_address);
  $(".total_value_estimate").html(total_value_estimate);
  $(".selected_currency_value").html(selected_currency);
  $("#pdf_UserStoryHeading").html(userstory_title);
  $("#pdf_EstimationTable").html(estimate_title);
  $("#Estimation_pricing").html(estimate_title);
  $("#othernote_pdf").html(othernotes_title);
  $("#outOfScope_pdf").html(outofscope_title);
  $("#assumptions_pdf").html(assumptions_title);
  $("#suggestions_pdf").html(suggestions_title);

   var Revision_history = $("#step-2 .step-title").find("p").html();
   $("#Revision_history_title").html(Revision_history);

   var Prepared_by = $("#step-2 .prepared-by").find("label").html();
   $("#Prepared_by").html(Prepared_by);

   var Estimated_by = $("#step-2 .estimated-by").find("label").html();
   $("#Estimated_by").html(Estimated_by);

   var Reviewed_by = $("#step-2 .reviewed-by").find("label").html();
   $("#Reviewed_by").html(Reviewed_by);
   if(DocType != 'U'){
    var Estimation_pricing = $("#step-6 .step-title").find("h3 span").html();
    $("#Estimation_pricing").html(estimate_title);
   }
   var User_story = $("#step-3 .step-title").find("h3 span").html();
   $("#User_story").html(User_story);

   var Feature_list = $("#step-5 .step-title").find("p").html();
   $("#Feature_list").html(Feature_list);

   var Assumptions = $("#step-7 .step-title").find("h3 span").html();
   $("#Assumptions").html(assumptions_title);

   var Out_of_scope = $("#step-8 .step-title").find("h3 span").html();
   $("#Out_of_scope").html(outofscope_title);

   var Technology_environment = $("#step-9 .step-title").find("h3 span").html();
   $("#Technology_environment").html(Technology_environment);

    var technology_title = $("#step-9 .technology_title").find("label").html();
   $("#technology_title").html(technology_title);

   var environment_title = $("#step-9 .environment_title").find("label").html();
   $("#environment_title").html(environment_title);

   var backend_title = $("#step-9 .backend_title").find("label").html();
   $("#backend_title").html(backend_title);

   var Other_notes = $("#step-10 .step-title").find("h3 span").html();
   $("#Other_notes").html(othernotes_title);

   var Suggestion = $("#step-11 .step-title").find("h3 span").html();
   $("#Suggestion").html(suggestions_title);

   var Project_deliverable = $("#step-12 .step-title").find("h3 span").html();
   $("#Project_deliverable").html(Project_deliverable);


  /** Step 1 **/
  var get_pdf_PreparedBy = $("#GetPreparedBy_1").html();
    if(get_pdf_PreparedBy == "")
    {
      get_pdf_PreparedBy = "Not yet Prepared";
    }
  var get_pdf_EstimatedBy = $("#GetPreparedBy_2").html();
    if(get_pdf_EstimatedBy == "")
    {
      get_pdf_EstimatedBy = "Not yet Estimated";
      $(".estimatedby").hide();
    }
  var get_pdf_ReviewedBy = $("#GetPreparedBy_3").html();
    if(get_pdf_ReviewedBy == "")
    {
      get_pdf_ReviewedBy = "Not yet Reviewed";
    }

  $(".pdf_PreparedBy").html(get_pdf_PreparedBy);
  $("#pdf_EstimatedBy").html(get_pdf_EstimatedBy);
  $("#pdf_ReviewedBy ").html(get_pdf_ReviewedBy);

  var show_estimation = $("#EstimationTable").val();
  
  /** Step 2 **/
  if(show_estimation == '0' && estimate_pricingDxEditor.option("value") == ""){
    $('.estimation').hide();
    $('#Estimation_pricing').hide();

  }else if(show_estimation == '0' && estimate_pricingDxEditor.option("value") != ""){
    $('.estimation').show();
    $('#Estimation_pricing').show();
    $('#pdf_EstimatePricing').hide();
    $('.estimation_content').show();
    $('.estimation_content').html(estimate_pricingDxEditor.option("value"));

  }else if(show_estimation == '1' && estimate_pricingDxEditor.option("value") == ""){
    $('.estimation').show();
    $('#Estimation_pricing').show();
    $('#pdf_EstimatePricing').show();
    $('.estimation_content').hide();
    var $orginal = $('#pdf_EstimatePricing');
    $orginal.find('select').find('option').remove().end().replaceWith(`<input type="text" value="${selected_currency}">`);

  }else if( show_estimation == '1' || show_estimation == null) {
    $('.estimation').show();
    $('#Estimation_pricing').show();
    $('#pdf_EstimatePricing').show();
    $('.estimation_content').show();
    $('.estimation_content').html(estimate_pricingDxEditor.option("value"));
    var $orginal = $('#pdf_EstimatePricing');
    $orginal.find('select').find('option').remove().end().replaceWith(`<input type="text" value="${selected_currency}">`);
    
  }


  /** Step 3 **/
  if(userStoryDxEditor.option("value") == ""){
    $(".user_story_block").hide();
    $("#User_story").hide();
  }else{
    $("#pdf_UserStory").html(userStoryDxEditor.option("value"));
  }
 


  /** Step 4 **/


  
  /** Step 5 **/
  
    if(assumptionsDxEditor.option("value") == ""){
      $(".assumptions_block").hide();
      $("#Assumptions").hide();
    }else{
      $("#pdf_Assumptions").html(assumptionsDxEditor.option("value"));
    }


  /** Step 6 **/
  
  if(out_of_scopeDxEditor.option("value") == ""){
    $(".outofscope_block").hide();
    $("#Out_of_scope").hide();
  }else{
    $("#pdf_OutOfScope").html(out_of_scopeDxEditor.option("value"));
  }


  /** Step 7 **/

  var tech_val = "";
  tech_val += "<ul>";
  var technologyforpdf = $("#Technology").dxTagBox("instance").option('selectedItems');
  if(technologyforpdf.length>0){
    $(technologyforpdf).each(function(item,key){
      tech_val += "<li>"+key.Skill+"</li>";
    })
  }
  // $('#added_technology').find('input').each(function(){
  //     var tech_name = $(this).attr('tech_name');
  //     if(tech_name != undefined)
  //     {tech_val += "<li>"+tech_name+"</li>";}
  // });
  tech_val += "</ul>";
  ////console.log(tech_val);

  var envi_val = "";
  envi_val += "<ul>";
  var environmentforpdf = $("#Environment").dxTagBox("instance").option('selectedItems');
  if(environmentforpdf.length>0){
    $(environmentforpdf).each(function(item,key){
      envi_val += "<li>"+key.Skill+"</li>";
    })
  }
  // $('#added_environment').find('input').each(function(){
  //     var envi_name = $(this).attr('tech_name');
  //     if(envi_name != undefined)
  //     {envi_val += "<li>"+envi_name+"</li>";}
  // });
  envi_val += "</ul>";
  ////console.log(tech_val);

  var backend_val = "";
  backend_val += "<ul>";
  var backendforpdf = $("#Backend").dxTagBox("instance").option('selectedItems');
  if(backendforpdf.length>0){
    $(backendforpdf).each(function(item,key){
      backend_val += "<li>"+key.Skill+"</li>";
    })
  }
  // $('#added_backend').find('input').each(function(){
  //     var backend_name = $(this).attr('tech_name');
  //     if(backend_name != undefined)
  //     {backend_val += "<li>"+backend_name+"</li>";}
  // });
  backend_val += "</ul>";

  if(technologyforpdf == ""){
    $(".technology_block").hide();
    $("#technology_title").hide();
  }else{
    $("#pdf_Technology").html(tech_val);
  }
  
  if(environmentforpdf == ""){
    $(".environment_block").hide();
    $("#environment_title").hide();
  }else{
    $("#pdf_Environment").html(envi_val);
  }
  
  if(backendforpdf == ""){
    $(".backend_block").hide();
    $("#backend_title").hide();
  }else{
    $("#pdf_BackEnd ").html(backend_val);
  }

  if(technologyforpdf == "" && environmentforpdf == "" && backendforpdf == ""){
    $("#Technology_environment").hide();
    $(".technology_environment_block").hide();
  }
  

  /** Step 8 **/
  
    if(other_notesDxEditor.option("value") == ""){
      $(".other_notes_block").hide();
      $("#Other_notes").hide();
    }else{
      $("#pdf_OtherNotes").html(other_notesDxEditor.option("value"));
    }

  /** Step 9 **/
  
    if(suggestionsDxEditor.option("value") == ""){
      $(".suggestions_block").hide();
      $("#Suggestion").hide();
    }else{
      $("#pdf_Suggestions").html(suggestionsDxEditor.option("value"));
    }

  /** Step 10 **/
  return true;
} 



function PostProposalStakeholders(ProposalId, StageNumber, Type) {
  // debugger
  var localget = localStorage.getItem("UserCheckRes");
  var jsonData = JSON.parse(localget);
  var AssignedTo = $('#assign_employee').val();
  //alert('Type' , Type);
  if (StageNumber != 13) {
    data = {
      "Method": "PostProposalStakeholders",
      "Data": {
        "ProposalId": ProposalId,
        "Type": Type,
        "Viewed": 0,
        "Reviewed": 0,
        "AssignedTo": jsonData['Data'][0]['EmployeeID'],
        "StageNumber": StageNumber
      }
    }
  } else {
    var Assign_type = $('#Assign').val();
    data = {
      "Method": "PostProposalStakeholders",
      "Data": {
        "ProposalId": ProposalId,
        "Type": Type,
        "Viewed": 0,
        "Reviewed": 0,
        "AssignedTo": AssignedTo,
        "StageNumber": 13
      }
    }
  }

  var postCall = PostDataCall(data);
  if (postCall['IsSuccess'] == true) {
    //console.log(postCall['Message']);
  } else {
    //console.log(postCall['Message']);

  }
}

function PostProposalStakeholdersAssign(ProposalId, StageNumber, Type) {
  // debugger
  var AssignedTo = $('#assignProposalEmployeeDropDown').val();
  data = {
    "Method": "PostProposalStakeholders",
    "Data": {
      "ProposalId": ProposalId,
      "Type": Type,
      "Viewed": 0,
      "Reviewed": 0,
      "AssignedTo": AssignedTo,
      "StageNumber": StageNumber
    }
  }
  var postCall = PostDataCall(data);
  if (postCall['IsSuccess'] == true) {
    $("#assignProposalModal").modal("hide");    
    AssignProposalSwal("Success!","RFP assigned successfully","success");
    $(".error_message").html("");
  } else {
    //console.log(postCall['Message']);
  }
  new SimpleBar(document.getElementById('RfpModalBody'));
}

function AssignProposalSwal(titleParam,textParam,iconParam){
  var data = {
    title: titleParam,
    text: textParam,
    icon: iconParam
  }
  swal({
  title: data.title,
  text: data.text,
  icon: data.icon,
  button:"OK"
  });   
}


function IsDownload(){
  var SetProposalId = localStorage.getItem('ProposalId');
  var Token = localStorage.getItem("securityToken");

  var filter_val = JSON.stringify({
    IsActive: true,
    ProposalId: SetProposalId,
  });
  var result = callgetlist("GetEstimateRFPDetails", filter_val);

  var RFPIcode  = result[0]["RFPICode"];

  var _Data = {
    "Token": Token,
    "ProposalId": SetProposalId
  };
  var Download_data = {
    "Method"         : "PostUpdateDownloadStatus", 
    "Data"           : _Data
  }

  var Download_pdf = PostDataCall(Download_data);

  if(Download_pdf){
    OldRFPStatusdata = {
      "Method": "PostOldRFPStatusForWorkOrder",
      "Data": {
        "RFPICode": RFPIcode,
        "RFPStatus": 4,
        "Message": "",
        "Status": "",
      }
    }

    var postCallOldRFPStatus = PostDataCall(OldRFPStatusdata);
  }
  console.log(Download_pdf,"Download_pdf");
}