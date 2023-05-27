/* RFP Related queries*/
  
   $(document).ready(function () {
    $('#projectManagement_smartwizard').smartWizard({
       showStepURLhash: false,
       keyNavigation: false,
       anchorSettings: {
          anchorClickable: false,
       },
       toolbarSettings: {
          toolbarExtraButtons:
             [
                $('<button></button>').text('Preview')
                   .addClass('btn btn-info previewButton hidden-btn')
                   .attr('id', 'preview_btn')
                   .on('click', function () {
                      openRfpPdf();
                   }),

                $('<button></button>').text('Finish')
                   .addClass('btn btn-success finishButton hidden-btn')
                   .on('click', function () {
                      if (AddAssign()) {
                         var localStorageProposalId = localStorage.getItem('ProposalId');
                         var SetProposalId = "";
                         if (localStorageProposalId != "") {
                            SetProposalId = localStorageProposalId;
                         }

                         PostProposalStakeholders(SetProposalId, 0);
                         alert("Request for proposal details updated successfully");
                         $("#ProjectModal .close").click();
                      }
                   })
             ]
       }
    });

    $("#projectManagement_smartwizard").on("showStep", function (e, anchorObject, stepNumber, stepDirection) {
       if (stepNumber == 12) {
          $('.finishButton').removeClass('hidden-btn');
          $('.sw-btn-next').addClass('hidden-btn');

          $('.previewButton').removeClass('hidden-btn');
       } else {
          $('.finishButton').addClass('hidden-btn');
          $('.sw-btn-next').removeClass('hidden-btn');
          $('.previewButton').addClass('hidden-btn');
       }
    });

    $("#projectManagement_smartwizard").on("leaveStep", function (e, anchorObject, stepNumber, stepDirection, stepPosition) {
       // get proposal id from local storage
       var localStorageProposalId = localStorage.getItem('ProposalId');
       var SetProposalId = "";
       if (localStorageProposalId != "") {
          SetProposalId = localStorageProposalId;
       }

       // if user clicks on edit button , here we handling the condition //
       var editEnable = $('.edit_enable').val();
       if (editEnable == 1 && stepDirection == "forward") {
          $('.edit_enable').val(0);
          smartwizstep = $('.smartwizstep').val();
          RfpStepCallAction(Number(smartwizstep), SetProposalId);
          return true;
       }
       else {
          var currentStep = stepNumber + 1;
          if (stepDirection == "forward") {
             switch (stepNumber) {
                case 0:
                     displayProjectManagementContacts();
                   //var clientDetails = AddClientDetails();
                   //if (!clientDetails) {
                      //return false;
                   //}
                   //SetProposalId = localStorage.getItem('ProposalId');
                   //PostProposalStakeholders(SetProposalId, currentStep);
                   //GetEstimateCreators(SetProposalId);
                   return true;
                   break;

                case 1:
                     displayProjectPhase();
                   //PostProposalStakeholders(SetProposalId, currentStep);
                   return true;
                   break;

                case 2:
                  //  var userStory = AddUserStory();
                  //  if (!userStory) {
                  //     return false;
                  //  }
                  //  GetProjectPhases('project-phases');
                  //  displayProjectPhase();
                  //  PostProposalStakeholders(SetProposalId, currentStep);
                  return true;
                   break;

                case 3:
                  //  displayEstimateProjectDetails();
                  //  var checkEstimate = GetAddedProjectPhases();
                  //  if (checkEstimate.length == 0) {
                  //     alert("Please add atleast one project record!");
                  //     return false;
                  //  }
                  //  PostProposalStakeholders(SetProposalId, currentStep);
                  return true;
                   break;

                case 4:
                  //  var success_currency = displayEstimatePricing();
                  //  /*alert(success_currency);*/
                  //  GetCurrencies('currency');
                  //  $('.currency').val(success_currency);
                  //  PostProposalStakeholders(SetProposalId, currentStep);
                  return true;
                   break;

                case 5:
                  //  $("#pdf_EstimatePricing").html($("#displayEstimatePricing").html());
                  //  GetDefaultAssumptions();
                  //  var est_result = post_EstimatePricing();
                  //  //console.log(est_result);
                  //  if (!est_result) {
                  //     return false;
                  //  }
                  //  PostProposalStakeholders(SetProposalId, currentStep);
                  return true;
                   break;

                case 6:
                  //  var ass_valid = AddAssumptions();
                  //  if (!ass_valid) {
                  //     return false;
                  //  }
                  //  GetDefaultOutOfScope();
                  //  PostProposalStakeholders(SetProposalId, currentStep);
                  return true;
                   break;

                case 7:
                  //  var oos_valid = AddOutOfScope();
                  //  if (!oos_valid) {
                  //     return false;
                  //  }
                  //  techdata('technology', 'GetTechnology');
                  //  techdata('environment', 'GetEnvironment');
                  //  techdata('backend', 'GetBackend');
                  //  PostProposalStakeholders(SetProposalId, currentStep);
                  return true;
                   break;

                case 8:
                  //  var TechData = AddTechData();
                  //  if (!TechData) {
                  //     return false;
                  //  }
                  //  GetDefaultOtherNotes();

                  //  var get_pdf_Technology = $("#added_technology").html();
                  //  var get_pdf_Environment = $("#added_environment").html();
                  //  var get_pdf_Backend = $("#added_backend").html();
                  //  $("#pdf_Technology").html(get_pdf_Technology);
                  //  $("#pdf_Environment").html(get_pdf_Environment);
                  //  $("#pdf_BackEnd ").html(get_pdf_Backend);
                  //  PostProposalStakeholders(SetProposalId, currentStep);
                  return true;
                   break;
                default:

                   break;
             }
          }
          else if (stepDirection == "backward") {
             switch (stepNumber) {
                case 1:
                   //GetEstimateRFPDetails(SetProposalId)
                   return true;
                   break;

                case 2:
                   //GetEstimateCreators(SetProposalId);
                   return true;
                   break;

                case 3:
                   //GetUserStoryandUnderstand(SetProposalId);
                   return true;
                   break;

                case 4:
                  //  GetProjectPhases('project-phases');
                  //  displayProjectPhase();
                  return true;
                   break;

                case 5:
                  //  displayEstimateProjectDetails();
                  return true;
                   break;

                case 6:
                  //  var success_currency = displayEstimatePricing();
                  //  GetCurrencies('currency');
                  //  $('.currency').val(success_currency);
                  return true;
                   break;

                case 7:
                  //  GetDefaultAssumptions();
                  //  GetAssumptionForRFP(SetProposalId);
                  return true;
                   break;

                case 8:
                  //  GetDefaultOutOfScope();
                  //  GetOutofScopesForRFP(SetProposalId);
                  return true;
                   break;
                default:
                   break;
             }
          }
       }
    });

    $("#content-1, #content-2, #content-3, #content-4").mCustomScrollbar({
       theme: "minimal"
    });
 });

 function ProjectManagementModal() {
  localStorage.removeItem("ProposalId");
  $('.form-control').removeClass('required_field');
  $('.error_message').html('');

  $('#ProjectManagementModal').modal("show");
  GetRFPs('ProposalRfplist');
  $('.proposalError').val('');
  $('#address').val('');

  //Reset the RFP model step
  $("#projectManagement_smartwizard").smartWizard('reset');
}

function ResourceAvailabilityModal()
{
   $('#ResourceAvailabilityModal').appendTo('body').modal('show');
}

$(document).ready(function () {
   $('#sortableAssignedUsers,#sortableAvailableResources').sortable({
       connectWith: '#sortableAssignedUsers,#sortableAvailableResources'
   });

   $("#inputUsers").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#sortableAssignedUsers li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
      });

   $("#inputAvailableResource").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#sortableAvailableResources li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
      });
});

function ApprovalModal(){
   $('#ProjectApprovalModal').appendTo('body').modal('show');
}

function TimeSheetManagementModal(){
   $('#ProjectTimesheetModal').appendTo('body').modal('show');
}

function AnalysisModal(){
   $('#ProjectAnalysisModal').appendTo('body').modal('show');
}


