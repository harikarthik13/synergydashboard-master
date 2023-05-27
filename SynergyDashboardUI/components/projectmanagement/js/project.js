/* RFP Related queries*/
    Dropzone.autoDiscover = false;
    var nextClick = false;
    var saveNewModule = false;
    var documentUploaded = false;
    var uploadDocumentModule = false;
    var contactSave = false;
    var projectSave = false;
    var memberSave = false;
    var subProjectSave = false;

   $(document).ready(function () {   
        displayProjectCardDetails();
        projectdatatableView();
        var myAwesomeDropzone = new Dropzone("form#demo-upload", {
        maxFiles: 1,
        addRemoveLinks: true,
        init            : function() {
            this.on("success", function(file, responseText) {
                documentUploaded=true;
                validateUploadDocuments();
            });
            this.on("removedfile", function (file){
                documentUploaded=false;
                validateUploadDocuments();
            });
        }
     });

    $('.generate_daily').hide();

    // $('#tag-textAreaProject').textext({
    //     plugins: 'tags prompt',
    //     prompt: 'Add one...'
    // });


    $('#projectsmartwizard').smartWizard({
        showStepURLhash: false,
        keyNavigation: false,
        anchorSettings: {
            anchorClickable: false,
        },
        toolbarSettings: {
            toolbarExtraButtons: [
                $('<button></button>').text('Preview')
                .addClass('btn btn-info previewButton hidden-btn')
                .attr('id', 'preview_btn')
                .on('click', function() {
                    openRfpPdf();
                }),

                $('<button></button>').text('Finish')
                .addClass('btn btn-success finishButton hidden-btn')
                .on('click', function() {
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

    $("#projectsmartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection) {
        if (stepNumber == 2) {
            $('.finishButton').removeClass('hidden-btn');
            $('.sw-btn-next').addClass('hidden-btn');

            $('.previewButton').removeClass('hidden-btn');
        } else {
            $('.finishButton').addClass('hidden-btn');
            $('.sw-btn-next').removeClass('hidden-btn');
            $('.previewButton').addClass('hidden-btn');
        }
    });

    $("#projectsmartwizard").on("leaveStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
        // get proposal id from local storage
        var localStorageProposalId = localStorage.getItem('ProposalId');
        var SetProposalId = "";
        if (localStorageProposalId != "") {
            SetProposalId = localStorageProposalId;
        }

        // if user clicks on edit button , here we handling the condition //
        var editEnable = $('.edit_enable').val();
        if (editEnable == 1 && stepDirection == "forward") {
            //$('.edit_enable').val(0);
            //smartwizstep = $('.smartwizstep').val();
            //RfpStepCallAction(Number(smartwizstep), SetProposalId);
            return true;
        } else {
            var currentStep = stepNumber + 1;
            if (stepDirection == "forward") {
                switch (stepNumber) {
                    case 0:
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
            } else if (stepDirection == "backward") {
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

    $('.project-fourth-step').find('#new-project-module #btnSaveProjectModule').on("click", function(){
        saveNewModule=true;
        validateNewProjectModule();
    });

    $('.project-fourth-step').children("#new-project-module").find('input').change(function(){
        validateNewProjectModule();
    })

    $('.project-fourth-step').children("#new-project-module").find('input').on("input",function(){
        validateNewProjectModule();
    })

    $('.project-fourth-step').children("#new-project-module").find('textarea').on("input",function(){
        validateNewProjectModule();
    })

    $('.project-seventh-step').children().find('input').click(function(){
        validateProjectTimesheet();
    })

    $('.project-sixth-step').find('#upload-documents #btnUploadProjectDocument').on("click",function(){
        uploadDocumentModule=true;
        let ValidateDocument=validateUploadDocuments();
        if(ValidateDocument)
        {
            saveProjectDocument();
        }
        
    })

    $('.project-sixth-step').find('#upload-documents input[type=text]').on("input",function(){
        validateUploadDocuments();
    })

    $('.project-sixth-step').find('#upload-documents textarea').on("input",function(){
        validateUploadDocuments();
    })

    $('.project-first-step').find('#dlclientWorkOrder').on("change",function(){
        let selectedWorkOrder = $(this).val();
        getProjectClientDetails(selectedWorkOrder);
    })

    $('.project-second-step').find('#dlCountry').on("change",function(){
        let country = $(this).val()
        getStates(country);
    })

    $('.project-second-step').find('#dlState').on("change",function(){
        let state = $(this).val()
        getCity(state);
    })

   
});



function toggle(className, obj) {
    var $input = $(obj);
    if ($input.prop('checked')) $(className).show();
    else $(className).hide();
}

function validateProjectModules(){
    let errFlag = false;
    let cnt = 0;
    if(nextClick){
        $('.project-fourth-step').children('#projectModule').find('input').each(function(){
            
            if ($(this).val() == "") {
                cnt++
                let span = $('<span />').addClass('error_message').html('Field required');
                if( $(this).parents('.txtEstimatedHours').find('.error_message').length)
                {       
                    $(this).parents('.txtEstimatedHours').find('.error_message').html('');
                    $(this).parents('.txtEstimatedHours').append(span)
                }
                else
                {
                    $(this).parents('.txtEstimatedHours').append(span)
                } 
            }
            else {
                $(this).parents('.txtEstimatedHours').find('.error_message').html('');
            }
        })
    }
    errFlag = (cnt > 0) ? false : true;
    return errFlag;
}

function validateProjectTimesheet(){
    let errFlag = false;
    let cnt = 0;   
    let cntflag =false; 
    let radiocheck = true;
    let timesheetchecked = 0;
    let reportChecked=0;
    if(nextClick)
    {
        $('.project-seventh-step').children().find('input[type=radio]').each(function(){
            let name = $(this).attr("name");
            if($("input:radio[name="+name+"]:checked").length == 0){
                radiocheck = false;
            }
            if (radiocheck) {
    
                $(this).parents('div .project-seventh-step').find('#error_1 .error_message').html('')
                cnt=0
            }
            else {
                cnt++
                $(this).parents('div .project-seventh-step').find('#error_1 .error_message').html('Please Select Timesheet Duration .')
            }
        })
    
        $('.project-seventh-step ').children().find('input[type="checkbox"][name="TimesheetTemplate"]').each(function(){
            if($(this).prop("checked") == true){
                timesheetchecked++
            }
            if (timesheetchecked>0) {
                $(this).parents('div .project-seventh-step').find('#error_2 .error_message').html('')
                cnt=0
            }
            else {
                cnt++
                $(this).parents('div .project-seventh-step').find('#error_2 .error_message').html('Please Select TimesheetTemplate option.')
                cntflag = true
            }
        })

        $('.project-seventh-step ').children().find('input[type="checkbox"][name="Reports"]').each(function(){
            let generateDailyCheck = 0;
            if($('input[type="checkbox"][id="autoGenerate"]').prop("checked")==true)
            {
                $(this).parents('div .project-seventh-step').find('#error_3 .error_message').html('');
                cnt=0;
            }
            else
            {
                cnt++;
                $(this).parents('div .project-seventh-step').find('#error_3 .error_message').html('Please Select Report option.');
            }
            if($('input[type="checkbox"][id="generateReport"]').prop("checked")==true)
            {
                $('input[type="checkbox"][name="generateDaily"]').each(function(){
                    if($(this).prop("checked") == true){
                        generateDailyCheck++
                    }

                })
                if(generateDailyCheck>0)
                {
                    $(this).parents('div .project-seventh-step').find('#error_3 .error_message').html('');
                    cnt=0;
                }
                else
                {
                    cnt++;
                    $(this).parents('div .project-seventh-step').find('#error_3 .error_message').html('Please Select Report option.');
                }
            } 
        })        
    }
   
    errFlag = (cnt > 0) ? false : true;
    return errFlag;
}

function validateNewProjectModule() {
    let errFlag = false;
    let cnt = 0;
    if(saveNewModule)
    {
        $('.project-fourth-step').children('#new-project-module').find('input').each(function () {
            if ($(this).val() == "") {
                cnt++
                $(this).parents('div .txtModule').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .txtModule').find('.error_message').html('')
            }
        })

        $('.project-fourth-step').children('#new-project-module').find('textarea').each(function () {

            if ($(this).val() == "") {
                cnt++
                $(this).parents('div .txtModule').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .txtModule').find('.error_message').html('')
            }
        })
    }            
    errFlag = (cnt > 0) ? false : true;
    return errFlag;
}

function validateUploadDocuments(){
    let errFlag = false;
    let cnt = 0;
    if(uploadDocumentModule)
    {
        $('.project-sixth-step').find('#upload-documents input[type=text]').each(function () {
            if ($(this).val() == "") {
                cnt++
                $(this).parents('div .txtDocument').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .txtDocument').find('.error_message').html('')
            }
        })

        $('.project-sixth-step').find('#upload-documents textarea').each(function () {

            if ($(this).val() == "") {
                cnt++
                $(this).parents('div .txtDocument').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .txtDocument').find('.error_message').html('')
            }
        })

        if(!documentUploaded)
        {
            cnt++
            $('.project-sixth-step').find('#upload-documents .error_upload').html('Upload a document')
        }
        else
        {
            $('.project-sixth-step').find('#upload-documents .error_upload').html('')
        }
    }
    errFlag = (cnt > 0) ? false : true;
    return errFlag;
}

function ProjectModal() {  
    getWorkOrderDetails();
    localStorage.removeItem("ProposalId");
    $('.form-control').removeClass('required_field');
    $('.error_message').html('');

    $('#ProjectModal').modal("show");
    GetRFPs('ProposalRfplist');
    $('.proposalError').val('');
    $('#address').val('');

    //Reset the RFP model step
    $("#projectsmartwizard").smartWizard('reset');
}


$($('.project-first-step').children().find("select")).change(function() {
    validateClientDetails()
})

$($('.project-first-step').children().find('input')).change(function() {
    validateClientDetails()
})
$($('.project-second-step').children().find("select")).change(function() {
    validateAddContacts()
})
$($('.project-second-step').children().find("input")).change(function() {
    validateAddContacts()
})
$($('.project-second-step').children().find("textarea")).change(function() {
    validateAddContacts()
})
$($('.project-third-step').children().find("select")).change(function() {
    validateNewProject()
})
$($('.project-third-step').children().find('input')).change(function() {
    validateNewProject();
})
$($('.project-fifth-step').children().find("select")).change(function() {
    validateProjectMembers()
})
$($('.project-fifth-step').children().find('input')).change(function() {
    validateProjectMembers()
})
// $($('.project-eighth-step').children().find("select")).change(function() {
//     validate_SubProject()
// })
// $($('.project-eighth-step').children().find('input')).change(function() {
//     validate_SubProject()
// })

$('#dtpPhaseEndDate').change(function(){
    $('#txtHours').val(calculateEstimateHours());
})



function validateClientDetails() {
    let errFlag = false;
    let cnt = 0;
    if (nextClick) {
        $('.project-first-step').children().find("select").each(function() {
            if ($(this).val() == 0) {
                cnt++
                $(this).parents('div .dlClient').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .dlClient').find('.error_message').html('')
            }
        })

        $('.project-first-step').children().find("#dlClientProjectName").each(function() {
            if ($(this).val() == 0) {
                cnt++
                $(this).parents('div .dlClient').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .dlClient').find('.error_message').html('')
            }
        })
        $('.project-first-step').children().find(".date-validator").each(function() {
            if ($(this).val() == "") {
                cnt++
                $(this).parents('div .dtpClient').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .dtpClient').find('.error_message').html('')
            }
        })
    }
    errFlag = (cnt > 0) ? false : true;
    return errFlag;
}

function validateAddContacts() {
    let errFlag = false;
    let cnt = 0;
    if (contactSave) {
        $('.project-second-step').children().find(" #add-project-contacts select").each(function() {
            if ($(this).val() == 0) {
                cnt++
                $(this).parents('div .dlContacts').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .dlContacts').find('.error_message').html('')
            }
        })
        $('.project-second-step').children().find(" #add-project-contacts  input[type=text]").each(function() {
            if ($(this).val() == "") {
                cnt++
                $(this).parents('div .txtContacts').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .txtContacts').find('.error_message').html('')
            }
        })
        $('.project-second-step').children().find(" #add-project-contacts  textarea").each(function() {
            if ($(this).val() == "") {
                cnt++
                $(this).parents('div .txtContacts').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .txtContacts').find('.error_message').html('')
            }
        })
    }
    errFlag = (cnt > 0) ? false : true;
    return errFlag;
}

function validateNewProject() {
    let errFlag = false;
    let cnt = 0;
    if (projectSave) {
        $('.project-third-step').children().find(" #add-project-phases  input[type=text]").each(function() {
            if ($(this).val() == "") {
                cnt++
                $(this).parents('div .txtPhaseHeaderTitle').find('.error_message').html('Please Enter the Header Title')
            } else {
                $(this).parents('div .txtPhaseHeaderTitle').find('.error_message').html('')
            }
        })
        $('.project-third-step').children().find(" #add-project-phases  input[type=text]").each(function() {
            if ($(this).val() == "") {
                cnt++
                $(this).parents('div .txtPhaseName').find('.error_message').html('Please Enter Phase Name')
            } else {
                $(this).parents('div .txtPhaseName').find('.error_message').html('')
            }
        })
        $('.project-third-step').children().find("#add-project-phases .phaseDateValidator").each(function() {
            if ($(this).val() == "") {
                cnt++
                $(this).parents('div .dtpPhase').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .dtpPhase').find('.error_message').html('')
            }
        })
    }
    errFlag = (cnt > 0) ? false : true;
    return errFlag;
}

function validateProjectMembers() {
    let errFlag = false;
    let cnt = 0;
    if (memberSave) {
        $('.project-fifth-step').children().find(" #add-project-members select").each(function() {
            if ($(this).val() == 0) {
                cnt++
                $(this).parents('div .dlNewMember').find('.error_message').html('Please Select this field')
            } else {
                $(this).parents('div .dlNewMember').find('.error_message').html('')
            }
        })
        $('.project-fifth-step').children().find("#add-project-members .memberDateValidator").each(function() {
            if ($(this).val() == "") {
                cnt++
                $(this).parents('div .dtpAssignedDate').find('.error_message').html('This field is required')
            } else {
                $(this).parents('div .dtpAssignedDate').find('.error_message').html('')
            }
        })
    }
    errFlag = (cnt > 0) ? false : true;
    return errFlag;
}

// function validate_SubProject() {
//     let errFlag = false;
//     let cnt = 0;
//     if (subProjectSave) {
//         $('.project-eighth-step').children().find("#new-sub-project select").each(function() {
//             if ($(this).val() == 0) {
//                 cnt++
//                 $(this).parents('div .dlSubProject').find('.error_message').html('This field is required')
//             } else {
//                 $(this).parents('div .dlSubProject').find('.error_message').html('')
//             }
//         })
//         $('.project-eighth-step').children().find("#new-sub-project  input[type=text]").each(function() {
//             if ($(this).val() == "") {
//                 cnt++
//                 $(this).parents('div .txtSubProject').find('.error_message').html('This field is required')
//             } else {
//                 $(this).parents('div .txtSubProject').find('.error_message').html('')
//             }
//         })
//         $('.project-eighth-step').children().find("#new-sub-project .subProjectDate").each(function() {
//             if ($(this).val() == "") {
//                 cnt++
//                 $(this).parents('div .dtpSubProjectDate').find('.error_message').html('This field is required')
//             } else {
//                 $(this).parents('div .dtpSubProjectDate').find('.error_message').html('')
//             }
//         })
//     }
//     errFlag = (cnt > 0) ? false : true;
//     return errFlag;
// }

function calculateEstimateHours()
{
    var startDate=new Date($('#dtpPhaseStartDate').val());
    var endDate=new Date($('#dtpPhaseEndDate').val());
    var diff=endDate-startDate;
    var diffDays = diff/86400000;
    var estimatedHours= (diffDays+1)*8;
    return estimatedHours;
}

function displayProjectCardDetails(){
    let ProjectCard = GetProjectCard(); 
    generateProjectCard(ProjectCard);
    // let HTMLDesign = generateProjectCard(ProjectCard);
    // $("#ProjectCardDetails").html(HTMLDesign);
}

function GetProjectCard() {
    let filter_val = JSON.stringify({
        "Token":localStorage.getItem('securityToken')
    });
    let result = callgetlist('GetMyProjects', filter_val);
     console.log(result);
    return result;
}



function generateProjectCard(ProjectCard) {

    var renderProjectCardDetailsGrid = $("#ProjectCardDetails").dxDataGrid({
        dataSource: ProjectCard,
        keyExpr: 'ProjectId',
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        selection: {
            mode: 'multiple',
          },
        export: {
            enabled: true,
            allowExportSelectedData: true
        },
        searchPanel: {
            visible: true,
            width: 240,
            placeholder: "Search..."
        },
        headerFilter: {
            visible: true
        },
        filterPanel: { visible: true },
        allowColumnReordering: true,
        showBorders: true,
        grouping: {
            autoExpandAll: true,
        },
        groupPanel: {
            visible: true
        },
        sorting: {
            mode: "multiple"
        },
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true,
        },
        summary: {
            totalItems: [
                {
                    column: "ProjectId",
                    summaryType: "count",
                },
            ],
            groupItems: [
                {
                    column: "ProjectId",
                    summaryType: "count",
                },
            ],
        },
        columnChooser: {
            enabled: true,
        },
        onToolbarPreparing: function (e) {
            var dataGrid = e.component;
            e.toolbarOptions.items.unshift({
                location: "after",
                widget: "dxButton",
                options: {
                    icon: "refresh",
                    onClick: function () {
                        displayProjectCardDetails();
                        dataGrid.refresh();
                    }
                }
            });
        },
        columns: [
            {
                caption: "Project",
                dataField: "Name"
            },
            {
                caption: "Client",
                dataField: "ClientId"
            },
            {
                caption : "Project Type",
                dataField : "ProjectType"
            },
            {
                caption: "Status",
                dataField: "Status"
            },
            {
                dataField: "",
                caption: "Action",
                cellTemplate: function (container, options) {
                    var projectId = options.data.ProjectId;
                    var domActions = "";
                    if(options.data.ShowResourceAllocation){
                        domActions += "<button class='btn btn-xs' onclick=ResourceModal() title='Resource Management'><i class='fa fa-users'></i></button>"
                    }
                    domActions += "<button class='btn btn-xs' onclick=DocumentManagementModal() title='Document Management'><i class='fa fa-file-upload'></i></button>"
                    if(options.data.ShowTaskApproval){
                        domActions += "<button class='btn btn-xs' onclick=ApprovalModal() title='Approvals'><i class='fas fa-file'></i></button>"
                    }
                     if(options.data.ShowTaskManagement){
                        domActions += "<button class='btn btn-xs' onclick=TimeSheetManagementModal() title='Time Sheet Management'><i class='fas fa-file'></i></button>"
                     }
                    if(options.data.ShowProjectPlan){
                        domActions += "<button class='btn btn-xs' onclick=AnalysisModal() title='Analysis'><i class='fas fa-file'></i></button>"
                    }
                    domActions += `<button class='btn btn-xs' title='Project Contacts' onclick='project_contacts("${options.data.ProjectId}","${options.data.Name}","${options.data.ProjectType}","${options.data.ClientId}")'><i class="fa fa-address-book" aria-hidden="true"></i></button>`
                    domActions += `<button class='btn btn-xs' title='Add Member' onclick='Project_member("${options.data.ProjectId}","${options.data.Name}","${options.data.ProjectType}","${options.data.ClientId}")'><i class="fa fa-user-plus"></i></button>`
                    if(options.data.ProjectType == "Fixed Bid" || options.data.ProjectType == "RandD"){
                        domActions += `<button class='btn btn-xs' title='Project Phases' onclick='Project_phases("${options.data.ProjectId}","${options.data.Name}","${options.data.ProjectType}","${options.data.ClientId}")'><img src="components/projectmanagement/images/project_phases.png" style="height: 19px;"></button>`
                        domActions += `<button class='btn btn-xs' title='Project Sub Task' onclick='Project_sub_task("${options.data.ProjectId}","${options.data.Name}","${options.data.ProjectType}","${options.data.ClientId}")'><img src="components/projectmanagement/images/sub-task2.png" style="height: 19px;width:12px;"></button>`
                    }                    
                    if(options.data.ProjectType == "Retainer" || options.data.ProjectType == "Package" || options.data.ProjectType == "Time and Material"){
                        domActions += `<button class='btn btn-xs' title='Sub Project' onclick='project_sub_project("${options.data.ProjectId}","${options.data.Name}","${options.data.ProjectType}","${options.data.ClientId}")'><img src="components/projectmanagement/images/sub-project.png" style="height: 19px;"></button>`
                    }
                    if(options.data.ProjectType == "Retainer"){
                        domActions += `<button class='btn btn-xs' title='WorkOrder Mapping' onclick='WorkOrderMapping("${options.data.ProjectId}","${options.data.Name}","${options.data.ProjectType}","${options.data.ClientId}")'><i class="fas fa-link"></i></button>`
                    }
                    if((options.data.Status=="Pending" ||options.data.Status=="Approved") && options.data.ShowProjectClosure){
                        domActions += `<button class='btn btn-xs btn-secondary' onclick='ClosureModal("${options.data.ProjectId}","${options.data.Name}")'><i class='fas fa-trash'></i></button>`
                    }
                    $("<div style='text-align: left;'>").append($(domActions)).appendTo(container);
                },
            }
        ]
    }).dxDataGrid("instance");
}

function projectdatatableView()
{
    $("#tb_projectCard").dataTable({
        "destroy":true,
        "pageLength" : 5,
        "ordering": false,
        "info":     false,
        "oLanguage": { "sSearch": '<a class="btn searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>' }
    });
}

