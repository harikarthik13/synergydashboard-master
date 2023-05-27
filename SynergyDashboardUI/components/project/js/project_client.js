var TechnologyTags=0;
function getWorkOrderDetails(){
	// let filter_val = JSON.stringify({
	// 	"ProposalId": "FFD87BD3-5C7D-4524-BC14-F9787FD21810",
	// 	"IsActive": true
	//   });
	// let result = callgetlist('GetWorkOrder', filter_val);
	let options = "<option value=''>Select Work Order</option>";
	// for (let i = 0; i < result.length; i++) {
	// options += "<option value='" + result[i].WorkOrderId + "'>" + result[i].ProjectName + "</option>";
	// }
	options += "<option value='1'>Zulu</option>"
	options += "<option value='2'>Cauldron</option>"
	$("#dlclientWorkOrder").html(options);
}

function getProjectClientDetails(workorderid){

	if(workorderid != "")
	{
		if(TechnologyTags>0)
		{
			$('.text-tags').remove();
			$('.text-prompt').remove();
		}
		let ProjectTechnologyNotes=[];
		let filter_val = JSON.stringify({"IsActive":0,"WorkOrderId": workorderid});
		let ProjectClientDetails = callgetlist('GetProjectClientDetails', filter_val);
		ProjectClientDetails.forEach(function (key, item) {
		if(key.ActivityStatus==true)
		{
			$("#ProjectActivityStatus").prop( "checked", true );
		}
		else if(key.ActivityStatus==false)
		{
			$("#ProjectActivityStatus").prop( "checked", false );
		}
		$("#dlClientProjectName").val(key.ProjectName);
		$("#dlClientName :selected").text(key.ClientName);
		$("#dlClientName :selected").val(key.ClientId);
		$("#dlClientProjectType :selected").text(key.ProjectType);
		$("#dlClientProjectType :selected").val(key.ProjectTypeId);
		$("#dlClientDevelopmentModel :selected").text(key.DevelopmentModel);
		$("#dlClientDevelopmentModel :selected").val(key.DevelopmentModelID);
		$("#dlProjectIndustry :selected").text(key.ProjectIndustry);
		$("#dlProjectIndustry :selected").val(key.ProjectIndustryId);
		$("#dlProjectDomain :selected").text(key.ProjectDomain);
		$("#dlProjectDomain :selected").val(key.ProjectDomainId);
		$("#textProjectDescription").text(key.ProjectDescription);
		$("#dtpclientPlannedStartDate").val(key.PlannedStartDate);
		$("#dtpclientPlannedEndDate").val(key.PlannedEndDate);
		ProjectTechonologynotes = key.ProjectTechonologynotes.split(',');
		TechnologyTags++;
		});
		$('#tag-textAreaProject').textext({
			plugins : 'tags prompt',
			tagsItems : ProjectTechonologynotes,
			prompt : 'Add one...',
		});		  
			
	}	
}

function InsertUpdateClientDetails()
{
	let TechnologyNotes="";
	$(".text-label").each(function(){
		TechnologyNotes += $(this).html()+",";
	})
	let ProjectActivityStatus
    if($("#ProjectActivityStatus").prop( "checked") == true)
    {
		ProjectActivityStatus=true;
    }
    else
    {
		ProjectActivityStatus=false;
    }
	let filter_val = JSON.stringify({
	"IsActive":0,
	"ProjectClientActivityStatus":ProjectActivityStatus,
	"WorkOrderId":$("#dlclientWorkOrder").val(),
	"ProjectId":"1",
	"ClientId":$("#dlClientName").val(),
	"ProjectTypeId":$("#dlClientProjectType").val(),
	"DevelopmentModelId":$("#dlClientDevelopmentModel").val(),
	"ProjectIndustryId":$("#dlProjectIndustry").val(),
	"ProjectDomainId":$("#dlProjectDomain").val(),
	"ProjectPlannedStartDate":$("#dtpclientPlannedStartDate").val(),
	"ProjectPlannedEndDate":$("#dtpclientPlannedEndDate").val(),
	"ProjectActualStartDate":$("#dtpclientActualStartDate").val(),
	"ProjectActualEndDate":$("#dtpclientActualEndDate").val(),
	"ProjectUTAStartDate":$("#dtpclientUtaStartDate").val(),
	"ProjectUTAEndDate":$("#dtpclientUtaStartDate").val(),
	"ProjectDescription":$("#textProjectDescription").text(),
	"ProjectTechnologyNotes":TechnologyNotes
	});
	let ProjectClientDetails = callgetlist('PostProjectClientDetails', filter_val);	
	return ProjectClientDetails;
}

