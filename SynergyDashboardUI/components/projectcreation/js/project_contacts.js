$(document).ready(function () {  
	get_projectContacts();
});

var textProjectDescriptionEditor = '';

function showProjectModal(workOrderId, projectId, IsProjectClosed = null) {
	textProjectDescriptionEditor = $('#textProjectDescription').dxHtmlEditor({
		height: 300,
		value: '',
		// readonly : true,
		toolbar: {
		items: [
			'undo', 'redo', 'separator',
			{
			name: 'size',
			acceptedValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
			},
			{
			name: 'font',
			acceptedValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
			},
			'separator', 'bold', 'italic', 'strike', 'underline', 'separator',
			'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'separator',
			'orderedList', 'bulletList', 'separator',
			{
			name: 'header',
			acceptedValues: [false, 1, 2, 3, 4, 5],
			}, 'separator',
			'color', 'background', 'separator',
			'link', 'image', 'separator',
			'clear', 'codeBlock', 'blockquote', 'separator',
			'insertTable', 'deleteTable',
			'insertRowAbove', 'insertRowBelow', 'deleteRow',
			'insertColumnLeft', 'insertColumnRight', 'deleteColumn',
		],
		},
		mediaResizing: {
		enabled: true,
		},
	}).dxHtmlEditor('instance');
	textProjectDescriptionEditor.option('toolbar.multiline', true);

	if(workOrderId == "null") {
		workOrderId = null;
	}
	if(projectId == "null") {
		projectId = null;
	}
	if(IsProjectClosed != null){
		$("#dlProjectIsClosed").val(IsProjectClosed);
	}else{
		$("#dlProjectIsClosed").val(0);
	}
	var filter_val = JSON.stringify({ "Token": localStorage.getItem('securityToken'),"ISActive": 1 });
	var fil_value = JSON.stringify({ "Token": localStorage.getItem('securityToken'),"IsActive": 1 });
	var GetProjectIndustry = callgetlist('GetProjectIndustries', filter_val);
	var GetProjectDomain = callgetlist('GetProjectDomain', fil_value);

	$("#dtpclientPlannedStartDate").dxDateBox({
		type: "date",
		displayFormat: "dd-MMM-yyyy",
		placeholder: "Select Date",
		value: new Date(),
	}).dxDateBox("instance");

	$("#dtpclientActualStartDate").dxDateBox({
		type: "date",
		displayFormat: "dd-MMM-yyyy",
		placeholder: "Select Date",
		value: new Date(),
	}).dxDateBox("instance");

	$("#dtpclientPlannedEndDate").dxDateBox({
		type: "date",
		displayFormat: "dd-MMM-yyyy",
		placeholder: "Select Date",
		value: new Date(),
	}).dxDateBox("instance");

	//show GetProjectIndustry list
	if (GetProjectIndustry.length > 0) {
	$('#dlProjectIndustry').html('<option value="0">Select Project Indutry</option>');
		GetProjectIndustry.forEach(function (GetProjectIndustry, i) {
			$('#dlProjectIndustry').append('<option value="' + GetProjectIndustry.Id +'">' + GetProjectIndustry.ProjectIndustry + '</option>');
		});
	} else {
		$('#dlProjectIndustry').append('<option value="0">No datas Found</option>');
	}
	
	//show GetProjectDomain list
	if (GetProjectDomain.length > 0) {
		$('#dlProjectDomain').html('<option value="0">Select Project Domain</option>');
		GetProjectDomain.forEach(function (GetProjectDomain, i) {
		$('#dlProjectDomain').append('<option value="' + GetProjectDomain.Id +'">' + GetProjectDomain.ProjectDomain + '</option>');
		});
	} else {
		$('#dlProjectDomain').append('<option value="0">No datas Found</option>');
	}

	//show GetDevelopmentModel  list
	var fil_value_for_DevModel = JSON.stringify({ "IsActive": 1 });
	var GetDevelopmentModel = callgetlist('GetDevModel', fil_value_for_DevModel);
	if (GetDevelopmentModel.length > 0) {
		$('#dlClientDevelopmentModel').html('<option value="0">Select Development Model</option>');
		GetDevelopmentModel.forEach(function (GetDevelopmentModel, i) {
			$('#dlClientDevelopmentModel').append('<option value="'+ GetDevelopmentModel.Id +'">' + GetDevelopmentModel.DevModel + '</option>');
		});
	} else {
		$('#dlClientDevelopmentModel').append('<option value="0">No datas Found</option>');
	}

	localStorage.setItem('ProjectId', projectId);
	// get skills
	var filter_val = JSON.stringify({ "Token": localStorage.getItem('securityToken') });
	var GetAllSkills = callgetlist('GetAllSkills',filter_val);
	window.GetAllSkills = GetAllSkills;

	$('.addSkill-tag-input').find('option').remove();
	GetAllSkills.forEach(function (item) {
	$('.addSkill-tag-input').append($("<option></option>").attr("value", item.Id).text(item.Name)).select2();
	});

	var AddSkill_Array = new Array();
	$('.addSkill-tag-input').val(AddSkill_Array);
	$('.addSkill-tag-input').select2();

	clearAndShow();

	var GetProjectTypeFilters = JSON.stringify({
		   "Token":Token,
		  "IsActive": true
	});
	var GetProjectType = callgetlist("GetProjectType", GetProjectTypeFilters);

	var GetProjectTechnologiesFilters = JSON.stringify({
		   "Token":Token,
		   "ProjectId": projectId,
		   "IsActive": true
	});
	var GetProjectTechnologies = callgetlist("GetProjectTechnologies",GetProjectTechnologiesFilters);
	//
	GetProjectTechnologies.forEach(function (item) {
		AddSkill_Array.push(item.SkillVersionId);
	});
	$('.addSkill-tag-input').val(AddSkill_Array);
	$('.addSkill-tag-input').select2();
	//
	$('#dlClientProjectType').find('option').remove();
	$('#dlClientProjectType').append($("<option value='0'>Select Project Type</option>"));
	GetProjectType.forEach(function (item) {
		$('#dlClientProjectType').append($("<option></option>").attr("value", item.Id).text(item.ProjectType));
	});

	
	if((workOrderId != null || projectId != null)){

		if($("#dlProjectIsClosed").val() == 1){
			$("#Project_Modal input").attr('disabled','disabled');
			$("select").attr('disabled','disabled');
			$(".add_contact").attr('disabled','disabled');
			$(".workorder_mapping").attr('disabled','disabled');
			$(".sub-products").attr('disabled','disabled');
			$(".add-project").attr('disabled','disabled');
			$("#addNewProjectModule").attr('disabled','disabled');
			textProjectDescriptionEditor.option("readOnly", true);
			$("#textProjectDescription").css("background","#eee");
		}else{
			$("#Project_Modal input").removeAttr('disabled');
			$("select").removeAttr('disabled');
			$(".add_contact").removeAttr('disabled');
			$(".workorder_mapping").removeAttr('disabled')
			$(".sub-products").removeAttr('disabled')
			$(".add-project").removeAttr('disabled')
			$("#addNewProjectModule").removeAttr('disabled')
			textProjectDescriptionEditor.option("readOnly", false);
			$("#textProjectDescription").css("background","transparent");
		}
		var fil_val = JSON.stringify({ "WorkOrderId": workOrderId, "ProjectId": projectId,"IsActive": 1 });
		var GetSignedWorkOrderByWorkOrderID = callgetlist('GetSignedWorkOrderByWorkOrderID',fil_val);

		// Form Title
		$("#cpm_form_title").html(GetSignedWorkOrderByWorkOrderID[0].ProjectName +'-'+ GetSignedWorkOrderByWorkOrderID[0].ClientName +'-'+ GetSignedWorkOrderByWorkOrderID[0].ProjectType);
		$('#ClientName').prop('disabled', true);
		$("#dlClientProjectName").val(GetSignedWorkOrderByWorkOrderID[0].ProjectName);
		$("#dlProjectId").val(GetSignedWorkOrderByWorkOrderID[0].ProjectId);
		$("#dlworkOrderID").val(GetSignedWorkOrderByWorkOrderID[0].WorkOrderId);
		$("#ClientName").css("display","block");
		$("#dlClientName").css("display","none");
		$(".select_hidden").val('1');
		$("#ClientName").val(GetSignedWorkOrderByWorkOrderID[0].ClientName);
		$("#dlClientDevelopmentModel").val(GetSignedWorkOrderByWorkOrderID[0].ProjectDevelopmentModelId);
		$("#dlClientProjectType option:contains(" + GetSignedWorkOrderByWorkOrderID[0].ProjectType + ")").attr('selected', 'selected');
		$("#dlProjectIndustry").val(GetSignedWorkOrderByWorkOrderID[0].ProjectIndustryId);
		$("#dlProjectDomain").val(GetSignedWorkOrderByWorkOrderID[0].ProjectDomainId);

		$("#ProjectTypeId").val(GetSignedWorkOrderByWorkOrderID[0].ProjectTypeId);
		(GetSignedWorkOrderByWorkOrderID[0].ProjectDescription != null) ? textProjectDescriptionEditor.option("value", GetSignedWorkOrderByWorkOrderID[0].ProjectDescription) :  textProjectDescriptionEditor.option("value", "");

		if(GetSignedWorkOrderByWorkOrderID[0].ActualStartDate != "1970-01-01T00:00:00" && GetSignedWorkOrderByWorkOrderID[0].ActualStartDate != null) {
			ActualStartDate = GetFormattedDate(GetSignedWorkOrderByWorkOrderID[0].ActualStartDate);
			$("#dtpclientActualStartDate").dxDateBox({ type: 'date', value: ActualStartDate, displayFormat: 'dd-MMM-yyyy'});
		}else{ 
			$("#dtpclientActualStartDate").dxDateBox("instance").option("value",'');
		}

		if(GetSignedWorkOrderByWorkOrderID[0].ActualEndDate != "1970-01-01T00:00:00" && GetSignedWorkOrderByWorkOrderID[0].ActualEndDate != null) {
			ActualEndDate = GetFormattedDate(GetSignedWorkOrderByWorkOrderID[0].ActualEndDate);
			$("#dtpclientActualEndDate").dxDateBox({ type: 'date', value: ActualEndDate, displayFormat: 'dd-MMM-yyyy'});
		}else{ 
			$("#dtpclientActualEndDate").dxDateBox("instance").option("value",'');
		}

		if(GetSignedWorkOrderByWorkOrderID[0].PlannedStartDate != "1970-01-01T00:00:00" && GetSignedWorkOrderByWorkOrderID[0].PlannedStartDate != null){
			if( typeof GetSignedWorkOrderByWorkOrderID[0].WOsignedDate !== 'undefined')
			{
				WOsignedDate = addDaysToDate(GetSignedWorkOrderByWorkOrderID[0].WOsignedDate, 1);
				$("#dtpclientPlannedStartDate").dxDateBox({ type: 'date', value: WOsignedDate, displayFormat: 'dd-MMM-yyyy'});
			}
			else
			{
				PlannedStartDate = GetFormattedDate(GetSignedWorkOrderByWorkOrderID[0].PlannedStartDate, 1);
				$("#dtpclientPlannedStartDate").dxDateBox({ type: 'date', value: PlannedStartDate, displayFormat: 'dd-MMM-yyyy'});
			}
		} else {
			PlannedStartDate = GetFormattedDate(GetSignedWorkOrderByWorkOrderID[0].PlannedStartDate, 1);
			$("#dtpclientPlannedStartDate").dxDateBox({ type: 'date', value: PlannedStartDate, displayFormat: 'dd-MMM-yyyy'});
		}

		if(GetSignedWorkOrderByWorkOrderID[0].PlannedEndDate != "1970-01-01T00:00:00" && GetSignedWorkOrderByWorkOrderID[0].PlannedEndDate != null){
			dtpclientPlannedEndDate = GetFormattedDate(GetSignedWorkOrderByWorkOrderID[0].PlannedEndDate);
			$("#dtpclientPlannedEndDate").dxDateBox({ type: 'date', value: dtpclientPlannedEndDate, displayFormat: 'dd-MMM-yyyy'});
		}else{
			if( typeof GetSignedWorkOrderByWorkOrderID[0].WOsignedDate !== 'undefined' && typeof GetSignedWorkOrderByWorkOrderID[0].Duration !== 'undefined')
			{
				dtpclientPlannedEndDate = addMonthsToDate(GetSignedWorkOrderByWorkOrderID[0].WOsignedDate, GetSignedWorkOrderByWorkOrderID[0].Duration);
				$("#dtpclientPlannedEndDate").dxDateBox({ type: 'date', value: dtpclientPlannedEndDate, displayFormat: 'dd-MMM-yyyy'});
			}
			else
			{
				dtpclientPlannedEndDate = GetFormattedDate(GetSignedWorkOrderByWorkOrderID[0].PlannedEndDate);
				$("#dtpclientPlannedEndDate").dxDateBox({ type: 'date', value: dtpclientPlannedEndDate, displayFormat: 'dd-MMM-yyyy'});
			}
		}
		// Skills
		if(GetSignedWorkOrderByWorkOrderID[0].ProjectTechnologyNotes) {
			var GetProjectTechnologyNotesId = GetSignedWorkOrderByWorkOrderID[0].ProjectTechnologyNotes;
			var GetProjectTechnologyNotesIdArray = GetProjectTechnologyNotesId.split(',');
			$('.addSkill-tag-input').val(GetProjectTechnologyNotesIdArray);
			$('.addSkill-tag-input').trigger('change');
		}

		// if Project Type was Retainer 
		if(GetSignedWorkOrderByWorkOrderID[0].ProjectTypeId == "99E78791-6C84-40AB-A6D3-6DA3E5A03AAB" ){
			$('#dtpclientPlannedEndDate').css({'pointer-events': 'none','background':'#eee'});//.prop('disabled',false);
			$('#dtpclientPlannedStartDate').css({'pointer-events': 'none','background':'#eee'});//.prop('disabled',true);	
		}

		// if Project Type was Package
		if(GetSignedWorkOrderByWorkOrderID[0].ProjectTypeId == "4BE9AC26-A99A-4265-8404-ECC93D5E14F6" || GetSignedWorkOrderByWorkOrderID[0].ProjectTypeId == "52997530-4E69-416B-847E-76BE921947EC"){
			$('#dtpclientPlannedEndDate').css({'pointer-events': 'none','background':'#eee'});//.prop('disabled',true);	
			$('#dtpclientPlannedStartDate').css({'pointer-events': 'none','background':'#eee'});//.prop('disabled',true);	
		}

		// if Project Type was Fixed Bid
		if(GetSignedWorkOrderByWorkOrderID[0].ProjectTypeId == "8317CC89-A2F9-421A-95B8-30B945F93545"){
			$("#dtpclientUta").show();
			if(GetSignedWorkOrderByWorkOrderID[0].UATStartDate != "1970-01-01T00:00:00" && GetSignedWorkOrderByWorkOrderID[0].UATStartDate != null){
				UATStartDate = GetFormattedDate(GetSignedWorkOrderByWorkOrderID[0].UATStartDate);
				$("#dtpclientUtaStartDate").dxDateBox({ type: 'date', value: UATStartDate, displayFormat: 'dd-MMM-yyyy'});
			}else{ 
				$("#dtpclientUtaStartDate").dxDateBox("instance").option("value",'');
			}

			if(GetSignedWorkOrderByWorkOrderID[0].UATEndDate != "1970-01-01T00:00:00" && GetSignedWorkOrderByWorkOrderID[0].UATEndDate != null){
				UATEndDate = GetFormattedDate(GetSignedWorkOrderByWorkOrderID[0].UATEndDate);
				$("#dtpclientUtaEndDate").dxDateBox({ type: 'date', value: UATEndDate, displayFormat: 'dd-MMM-yyyy'});
			}else{ 
				$("#dtpclientUtaEndDate").dxDateBox("instance").option("value",'');
			}

			$('#dtpclientUtaStartDate').css({'pointer-events': 'none','background':'#eee'});//.prop('disabled',true);	
			$('#dtpclientUtaEndDate').css({'pointer-events': 'none','background':'#eee'});//.prop('disabled',true);
			$('#dtpclientPlannedEndDate').css({'pointer-events': 'none','background':'#eee'});//.prop('disabled',true);	
			$('#dtpclientPlannedStartDate').css({'pointer-events': 'none','background':'#eee'});//.prop('disabled',true);	
		}

		// if Project Type was Package
		if(GetSignedWorkOrderByWorkOrderID[0].ProjectTypeId == "B2B93FB7-1C7B-4773-A0A4-9A2D3A09445F"){
			$("#dtpclientUta").hide();	
			$('#dtpclientPlannedEndDate').css({'pointer-events': 'none','background':'#eee'});//.prop('disabled',true);	
			$('#dtpclientPlannedStartDate').css({'pointer-events': 'none','background':'#eee'});//.prop('disabled',true);	
		}
		
		// if Project Type was Fixed Bid, Time & Material, Package, Retainer
		if(GetSignedWorkOrderByWorkOrderID[0].ProjectTypeId == "8317CC89-A2F9-421A-95B8-30B945F93545" || GetSignedWorkOrderByWorkOrderID[0].ProjectTypeId == "4BE9AC26-A99A-4265-8404-ECC93D5E14F6" 
			|| GetSignedWorkOrderByWorkOrderID[0].ProjectTypeId =="B2B93FB7-1C7B-4773-A0A4-9A2D3A09445F" || GetSignedWorkOrderByWorkOrderID[0].ProjectTypeId == "99E78791-6C84-40AB-A6D3-6DA3E5A03AAB") {
			
			// $('#dlClientProjectName').prop('disabled',true);
			$('#dlClientName').prop('disabled',true);
			$('#dlClientProjectType').prop('disabled',true);
			$('#dtpclientActualEndDate').css({'pointer-events': 'none','background':'#eee'});//.prop('disabled',true);				

			if(GetSignedWorkOrderByWorkOrderID[0].ActualStartDate) {
				ActualStartDate = GetFormattedDate(GetSignedWorkOrderByWorkOrderID[0].ActualStartDate);
				ActualEndDate = GetFormattedDate(GetSignedWorkOrderByWorkOrderID[0].ActualEndDate);
				// $("#dtpPhaseStartDate").dxDateBox({ type: 'date', value: ActualStartDate, displayFormat: 'dd-MMM-yyyy'});
				// $("#dtpPhaseEndDate").dxDateBox({ type: 'date', value: ActualEndDate, displayFormat: 'dd-MMM-yyyy'});
				$("#dtpPhaseStartDate").dxDateBox({
					dateFormat: 'dd-MMM-yyyy',
					constrainInput: true,
					firstDay: 1,
					hideIfNoPrevNext: true,
					beforeShow: function (input, inst) {
						inst.settings.minDate = ($("#dtpPhaseStartDate").dxDateBox("instance").option("value")) ? $("#dtpPhaseStartDate").val() : $("#dtpPhaseStartDate").dxDateBox({ type: 'date', value: ActualStartDate, displayFormat: 'dd-MMM-yyyy'});
						inst.settings.maxDate = ($("#dtpPhaseEndDate").dxDateBox("instance").option("value")) ? $("#dtpPhaseEndDate").val() : $("#dtpPhaseEndDate").dxDateBox({ type: 'date', value: ActualEndDate, displayFormat: 'dd-MMM-yyyy'});

					}
				});
				$("#dtpPhaseEndDate").dxDateBox({
					dateFormat: 'dd-MMM-yyyy',
					constrainInput: true,
					firstDay: 1,
					hideIfNoPrevNext: true,
					beforeShow: function (input, inst) {
						inst.settings.minDate = ($("#dtpPhaseStartDate").dxDateBox("instance").option("value")) ? $("#dtpPhaseStartDate").val() : $("#dtpPhaseStartDate").dxDateBox({ type: 'date', value: ActualStartDate, displayFormat: 'dd-MMM-yyyy'});
						inst.settings.maxDate = ($("#dtpPhaseEndDate").dxDateBox("instance").option("value")) ? $("#dtpPhaseEndDate").val() : $("#dtpPhaseEndDate").dxDateBox({ type: 'date', value: ActualEndDate, displayFormat: 'dd-MMM-yyyy'});
					}
				});
			} else {
				PhaseStartDate = addDaysToDate(GetSignedWorkOrderByWorkOrderID[0].WOsignedDate, 1);
				PhaseEndDate = addMonthsToDate(GetSignedWorkOrderByWorkOrderID[0].WOsignedDate, GetSignedWorkOrderByWorkOrderID[0].Duration);
			
				$("#dtpPhaseStartDate").dxDateBox({ type: 'date', value: PhaseStartDate, displayFormat: 'dd-MMM-yyyy'});
				$("#dtpPhaseEndDate").dxDateBox({ type: 'date', value: PhaseEndDate, displayFormat: 'dd-MMM-yyyy'});
			}
			
			$("#dtpclientPlannedStartDate").dxDateBox({
				dateFormat: 'dd-MMM-yyyy',
				constrainInput: true,
				firstDay: 1,
				hideIfNoPrevNext: true,
				beforeShow: function (input, inst) {
					inst.settings.minDate = GetFormattedDate(GetSignedWorkOrderByWorkOrderID[0].WOsignedDate);
				},
				onSelect: function(dateText) {               
					$(this).change();
				}
			}).on("change", function() {

				Durationdate = addMonthsToDate(this.value, GetSignedWorkOrderByWorkOrderID[0].Duration);
				$('#dtpclientPlannedEndDate').dxDateBox({ type: 'date', value: Durationdate, displayFormat: 'dd-MMM-yyyy'});
			});

			// $("#dtpclientActualStartDate").dxDateBox({
			// 	dateFormat: 'dd-MMM-yyyy',
			// 	constrainInput: true,
			// 	firstDay: 1,
			// 	hideIfNoPrevNext: true,
			// 	beforeShow: function (input, inst) {
			// 		inst.settings.minDate = GetFormattedDate(GetSignedWorkOrderByWorkOrderID[0].WOsignedDate);
			// 	},
			// 	onSelect: function(dateText) {               
			// 		$(this).change();
			// 	}
			// }).on("change", function() {
			// 	Durationdate = addMonthsToDate(this.value, GetSignedWorkOrderByWorkOrderID[0].Duration);
			// 	$('#dtpclientActualEndDate').dxDateBox({ type: 'date', value: Durationdate, displayFormat: 'dd-MMM-yyyy'});
			// });
		}
		// End -  Fixed Bid

		// if Project Type was Time and Material
		if(GetSignedWorkOrderByWorkOrderID[0].ProjectTypeId == "4BE9AC26-A99A-4265-8404-ECC93D5E14F6") {
			$("#dtpclientUta").hide();
			var fil_val_GetProjectContacts = JSON.stringify({ "Token": localStorage.getItem('securityToken'),"ProjectId": localStorage.getItem('ProjectId'), "IsActive":1 });
			var GetProjectContactsData = callgetlist('GetProjectContacts',fil_val_GetProjectContacts);

			renderProjectContactGrid(GetProjectContactsData);

			var filter_val = JSON.stringify({
				"ProjectId": localStorage.getItem('ProjectId'),
				"IsActive": true
			});
			var projectPhaseResult = callgetlist('GetProjectTasks', filter_val);
			renderProjectPhaseGrid(projectPhaseResult);
		}
		// }else{
		// 	$("#btnContactsSave").prop("disabled",true);
		// }
	}else {
		clearAndShow();
		// clientname_dropdown();
		$("#Project_Modal input").removeAttr('disabled');
		$("select").removeAttr('disabled');
		$(".add_contact").removeAttr('disabled');
		$(".workorder_mapping").removeAttr('disabled')
		$(".sub-products").removeAttr('disabled')
		$(".add-project").removeAttr('disabled')
		$("#addNewProjectModule").removeAttr('disabled')
		textProjectDescriptionEditor.option("readOnly", false);
		$("#textProjectDescription").css("background","transparent");
		$("#dlworkOrderID").val('');
		$("#dlProjectId").val('');
		$("#cpm_form_title").html("Add New Project");
		$('#dlClientName').prop('disabled', false);
		$('#dlClientProjectType').prop('disabled', false);
		$('#dtpclientActualEndDate').css({'pointer-events': 'none','background':'#eee'});//.prop('disabled', true);		
		$("#dtpclientUta").hide();
		$('#dtpclientPlannedEndDate').css({'pointer-events': 'initial','background':'initial'});//.prop('disabled',false);
		$('#dtpclientPlannedStartDate').css({'pointer-events': 'initial','background':'initial'});//.prop('disabled',false);
		$("#ClientName").css("display","none");
		$("#dlClientName").css("display","block");
		client_name();
		$("#ClientName").val("");
		$(".select_hidden").val('0');
		$("#dtpclientPlannedStartDate").dxDateBox({
			dateFormat: 'dd-MMM-yyyy',
			constrainInput: true,
			firstDay: 1,
		}).on("change", function() {
			PlannedDate = addDaysToDate(this.value, 1);
			$('#dtpclientPlannedEndDate').dxDateBox({ type: 'date', value: PlannedDate, displayFormat: 'dd-MMM-yyyy'});
		});

		$("#dtpclientActualStartDate").dxDateBox({
			dateFormat: 'dd-MMM-yyyy',
			constrainInput: true,
			firstDay: 1,
		}).on("change", function() {
			PlannedDate = addDaysToDate(this.value, 1);
			$('#dtpclientActualEndDate').dxDateBox({ type: 'date', value: PlannedDate, displayFormat: 'dd-MMM-yyyy'});
		});

	}
	$('#Project_Modal').modal("show");
}

function validateClientDetails() {
	let dlworkOrderID = $("#dlworkOrderID").val();
	let dlProjectID = $("#dlProjectId").val();
	let dlClientProjectName = $("#dlClientProjectName").val();
	let dlClientName = ($("#dlClientName option:selected").html())?$("#dlClientName option:selected").html():$("#ClientName").val();//$("#dlClientName").val();
	let dlClientProjectType = $("#dlClientProjectType").val();
	let dlClientDevelopmentModel = $("#dlClientDevelopmentModel").val();
	let dlProjectIndustry = $("#dlProjectIndustry").val();
	let dlProjectDomain = $("#dlProjectDomain").val();
	let dtpclientPlannedStartDate = $("#dtpclientPlannedStartDate").dxDateBox("instance").option("value");//.val();
	let dtpclientPlannedEndDate = $("#dtpclientPlannedEndDate").dxDateBox("instance").option("value");//.val();
	let dtpclientActualStartDate = $("#dtpclientActualStartDate").dxDateBox("instance").option("value");//.val();
	let dtpclientActualEndDate = $("#dtpclientActualEndDate").dxDateBox("instance").option("value");//.val();
	let dtpclientUtaStartDate = $("#dtpclientUtaStartDate").dxDateBox("instance").option("value");//.val();
	let dtpclientUtaEndDate = $("#dtpclientUtaEndDate").dxDateBox("instance").option("value");//.val();
	let textProjectDescription = textProjectDescriptionEditor.option("value");

	let textAreaProjectNotes_array = $('.addSkill-tag-input').val();
	let textAreaProjectNotes_value = textAreaProjectNotes_array.join();
	let err = 0;

	if ($("#dlClientProjectName").val() == "") {
		$(".dlClientProjectName_error").html('Project Name is required');
		err = 1;
	} else {
		$(".dlClientProjectName_error").html('');
	}

	if(textAreaProjectNotes_value == "")
	{
		$(".tag-textAreaProject_error").html('Project Technology Notes is required');
		err = 1;
	}
	else
	{
		$(".tag-textAreaProject_error").html('')
	}

	if (($("#dlClientName").val() == "0" || $("#dlClientName").val() == null) && $(".select_hidden").val() == 0 ) {
		$(".dlClientName_error").html('Client is required');
		err = 1;
	} else {
		$(".dlClientName_error").html('');
	}

	if ($("#dlClientProjectType").val() == "0" || $("#dlClientProjectType").val() == null) {
		$(".dlClientProjectType_error").html('Project Type is required');
		err = 1;
	} else {
		$(".dlClientProjectType_error").html('')
	}

	if ($("#dlClientDevelopmentModel").val() == "0") {
		$(".dlClientDevelopmentModel_error").html('Development Model is required');
		err = 1;
	} else {
		$(".dlClientDevelopmentModel_error").html('')
	}

	if ($("#dlProjectIndustry").val() == "0") {
		$(".dlProjectIndustry_error").html('Project Industry is required');
		err = 1;
	} else {
		$(".dlProjectIndustry_error").html('')
	}

	if ($("#dlProjectDomain").val() == "0") {
		$(".dlProjectDomain_error").html('Project Domain is required');
		err = 1;
	} else {
		$(".dlProjectDomain_error").html('')
	}

	if ($("#dtpclientPlannedStartDate").dxDateBox("instance").option("value") == "") {
		$(".dtpclientPlannedStartDate_error").html('Planned Start Date is required');
		err = 1;
	} else {
		$(".dtpclientPlannedStartDate_error").html('')
	}

	if ($("#dtpclientPlannedEndDate").dxDateBox("instance").option("value") == "") {
		$(".dtpclientPlannedEndDate_error").html('Planned End Date is required');
		err = 1;
	} else {
		$(".dtpclientPlannedEndDate_error").html('')
	}

	let dtp_project_description_val = textProjectDescription;

	if (dtp_project_description_val.length == 0) {
		$(".textProjectDescription_error").html('Project Description is required');
		err = 1;
	} else {
		$(".textProjectDescription_error").html('')
	}


	if (err == 1) {
		return false;
	 } else {
		if($("#dlProjectIsClosed").val() != 1){
			data = {
				"Method": "PostProject",
				"Data": {
					"Token": localStorage.getItem('securityToken'),
					"ProjectId" : (dlProjectID != null && dlProjectID != '') ? dlProjectID : null,
					"WorkOrderId" : (dlworkOrderID != null && dlworkOrderID != '') ? dlworkOrderID : null,
					"ClientId" : dlClientName,
					"Name" : $("#dlClientProjectName").val(),
					"ProjectStatusId" : null,
					"ProjectTypeId" : dlClientProjectType,
					"ProjectDevModelId" : dlClientDevelopmentModel,
					"ProjectIndustryId" : dlProjectIndustry,
					"ProjectDomainId" : dlProjectDomain,
					"PlannedStartDate" : (dtpclientPlannedStartDate != "" && dtpclientPlannedStartDate != null) ? dtpclientPlannedStartDate : null,
					"PlannedEndDate" : (dtpclientPlannedEndDate != "" && dtpclientPlannedEndDate != null) ? dtpclientPlannedEndDate : null,
					"ActualStartDate" : (dtpclientActualStartDate != "" && dtpclientActualStartDate != null) ? dtpclientActualStartDate : null,
					"ActualEndDate" : null,//(dtpclientActualEndDate != "" && dtpclientActualEndDate != null) ? dtpclientActualEndDate : null,
					"UATStartDate" : (dtpclientUtaStartDate != "" && dtpclientUtaStartDate != null) ? dtpclientUtaStartDate : null,
					"UATEndDate" : (dtpclientUtaEndDate != "" && dtpclientUtaEndDate != null) ? dtpclientUtaEndDate : null,
					"ProjectDescription" : dtp_project_description_val,
					"ProjectTechnologiesIds" : textAreaProjectNotes_value,
					"MoreInfo" : null,
					"IsActive" : 1,
					"Status": 1,
					"Message": ""
				}
			}

			var postCall = PostDataCall(data);
			if (postCall['IsSuccess'] == true) {
				if(postCall['Data'].length == 1) {
					var ProjectId = (postCall['Data'][0]['ProjectId']);
					$("#dlProjectId").val(ProjectId);
				}
				var swalEMRSucc = {
					title: 'Success!',
					text: postCall['Message'],
					icon: "success"
				}
				swalAlert(swalEMRSucc); 
				fn_GetSignedWorkOrdersForProjectCreation();
			} else {
				var swalEMRErr = {
					title: 'Warning!',
					text: postCall['Message'],
					icon: "error"
				}
				swalAlert(swalEMRErr);
				return false;
			} 
			
		}            
	}
	

}


function get_projectContacts() {

  	//show designation  list
    var fil_value_for_Designation = JSON.stringify({ "Token": localStorage.getItem('securityToken')});
    var GetProjectDesignation = callgetlist('GetDesignations', fil_value_for_Designation);
    if (GetProjectDesignation.length > 0) {
        $('#dlDesignation').html('<option value="0">Select Designation</option>');
        GetProjectDesignation.forEach(function (GetProjectDesignation, i) {
          $('#dlDesignation').append('<option value="'+ GetProjectDesignation.Id +'">' + GetProjectDesignation.Name + '</option>');
        });
    } else {
        $('#dlDesignation').append('<option value="0">No datas Found</option>');
    }

	//show GetProjectContactEmailById list
	var fil_val_for_ProjectContactEmailById = JSON.stringify({ "Token": localStorage.getItem('securityToken')});
	var GetProjectContactEmail = callgetlist('GetProjectContactEmailById', fil_val_for_ProjectContactEmailById);
	if (GetProjectContactEmail.length > 0) {
		$('#dlFromEmail').html('<option value="0">Select Project Contact Email ID</option>');
		GetProjectContactEmail.forEach(function (GetProjectContactEmail, i) {
		$('#dlFromEmail').append('<option value="'+ GetProjectContactEmail.CorporateEmailID +'">' + GetProjectContactEmail.CorporateEmailID + '</option>');
		});
	} else {
		$('#dlFromEmail').append('<option value="0">No datas Found</option>');
	}

	var fil_val_GetProjectContacts = JSON.stringify({ "Token": localStorage.getItem('securityToken'),"ProjectId": $("#dlProjectId").val(),"IsActive":1 });
	var GetProjectContactsData = callgetlist('GetProjectContacts',fil_val_GetProjectContacts);

  	renderProjectContactGrid(GetProjectContactsData);
}
var toggleContacts=true;

function updateProjectContacts(ProjectContactId) {
  toggleContacts=true;
  toggleProjectContacts();
  $("#add-project-contacts .error_message").html('');
  var filter_val = JSON.stringify({
    "Token": localStorage.getItem('securityToken'),
    "ProjectContactId": ProjectContactId
  });

  var GetProjectContactById = callgetlist('GetProjectContactById',filter_val);

  $("#hdnProjectContactId").val(GetProjectContactById[0].Id);
  $("#hdnProjectId").val(GetProjectContactById[0].ProjectId);
  $("#hdnClientContactId").val(GetProjectContactById[0].ClientContactId);

  $("#txtClientName").val(GetProjectContactById[0].ClientName);
  $("#txtEmailId").val(GetProjectContactById[0].EmailId);
  $("#txtPhoneNo1").val(GetProjectContactById[0].PhoneNo1);
  $("#txtPhoneNo2").val(GetProjectContactById[0].PhoneNo2);
  $("#dlDesignation").val(GetProjectContactById[0].Designation);
  $("#txtNotes").val(GetProjectContactById[0].Notes);
  $("#dlCountry").val(GetProjectContactById[0].CountryId);
  getStates(GetProjectContactById[0].CountryId);
  getCity(GetProjectContactById[0].StateId);
  setTimeout(function(){ 
    $("#dlState").val(GetProjectContactById[0].StateId);
    $("#dlCity").val(GetProjectContactById[0].CityId);
   }, 1000);
  
  $("#txtFaxNo").val(GetProjectContactById[0].FaxNo);
  $("#txtSkypeId").val(GetProjectContactById[0].SkypeId);
  $("#dlFromEmail").val(GetProjectContactById[0].FromEmailId);

 (GetProjectContactById[0].IsPrimary) ? $("#IsPrimary").prop('checked', true) : $('#IsPrimary').prop('checked', false);
 (GetProjectContactById[0].TimesheetTo) ? $("#TimesheetTo").prop('checked', true) : $('#TimesheetTo').prop('checked', false);
 (GetProjectContactById[0].TimesheetCC) ? $("#TimesheetCC").prop('checked', true) : $('#TimesheetCC').prop('checked', false);

}

function displayAddedProjectContacts(){
    var SavedProjectContacts = GetAddedProjectContacts();
    HTML = projectContacts(SavedProjectContacts);
    $("#displayProjectContacts").html(HTML);
}

function GetAddedProjectContacts() {
    var filter_val = JSON.stringify({
      "Token": localStorage.getItem('securityToken'),
      "ProjectId": "sampleProjectId",
      "IsActive": true,
      "ProjectId":"1",
      "ClientContactId" : null
    });

    var result = callgetlist('GetProjectContacts', filter_val);
    return result;
  
  }
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
	function btnAddContacts() {
		let err = 0;

		if ($('#txtClientName').val() == '') {
		$(".txtClientName_error").html('Client Contact Name is required');
		err = 1;
		} else {
		$(".txtClientName_error").html('');
		}
		if ($('#txtEmailId').val() == '') {
		$(".txtEmailId_error").html('Email ID is required');
		err = 1;
		}
		else if(!validateEmail($('#txtEmailId').val())){
			$(".txtEmailId_error").html('Invalid Email Id');
			err = 1;
		}
		else {
		$(".txtEmailId_error").html('');
		}

		if ($('#dlFromEmail').val() == 0) {
		$(".dlFromEmail_error").html('From Email is required');
		err = 1;
		} else {
		$(".dlFromEmail_error").html('');
		}

		if (err == 1) {
			return false;
		} else {
			$(".loader").show();
			if($("#dlProjectIsClosed").val() != 1){
				data = {
					"Method": "PostProjectContacts",
					"Data": {
						"Token": localStorage.getItem('securityToken'),
						"ProjectContactId": ($("#hdnProjectContactId").val() != '') ? $("#hdnProjectContactId").val() : null,
						"ProjectId": ($("#dlProjectId").val() != '' && $("#dlProjectId").val() != null) ? $("#dlProjectId").val() : null,
						"ClientContactId": ($('#txtClientName').val()!='') ? $('#txtClientName').val() : null,
						"ClientContactName": ($('#txtClientName').val()!='') ? $('#txtClientName').val() : null,
						"EmailId": ($('#txtEmailId').val() != '') ? $('#txtEmailId').val() : null,
						"PhoneNo1": ($('#txtPhoneNo1').val() != '') ?Number($('#txtPhoneNo1').val()):null,
						"PhoneNo2": ($('#txtPhoneNo2').val() != '') ? Number($('#txtPhoneNo2').val()) : null,
						"Designation": ($('#dlDesignation').val()!='')?$('#dlDesignation').val():null,
						"Notes": ($('#txtNotes').val()!='')?$('#txtNotes').val():null,
						"Country": ($('#dlCountry').val()!='')?$('#dlCountry').val():null,
						"State": ($('#dlState').val()!='')?$('#dlState').val():null,
						"City": ($('#dlCity').val()!='')?$('#dlCity').val():null,
						"FaxNo": ($('#txtFaxNo').val()!='')? Number($('#txtFaxNo').val()):null,
						"SkypeId": ($('#txtSkypeId').val()!='')?$('#txtSkypeId').val():null,
						"FromEmailId": $('#dlFromEmail').val(),
						"IsPrimary": ($('#IsPrimary').is(":checked")) ? 1 : 0,
						"TimesheetTo": ($('#TimesheetTo').is(":checked")) ? 1 : 0,
						"TimesheetCC": ($('#TimesheetCC').is(":checked")) ? 1 : 0,
						"IsActive": 1,
						"Status": "",
						"Message": "",
					}
				}
		
				var postCall = PostDataCall(data);
				$(".loader").hide();
				if (postCall['IsSuccess'] == true) {
					var swalEMRSucc = {
						title: 'Success!',
						text: postCall['Message'],
						icon: "success"
					}
					swalAlert(swalEMRSucc); 
					clearProjectContact();
					get_projectContacts();
				} else {
					var swalEMRErr = {
						title: 'Warning!',
						text: postCall['Message'],
						icon: "error"
					}
					swalAlert(swalEMRErr);
				}
			}
		}
	}

function projectContacts(SavedProjectContacts){
   var html = "<table id='tableProjectContacts' class='table table-striped table-hover'>";
   html += "<tr>";
   html += "<th>Client Contact Name</th>"
   html += "<th>Email ID</th>"
   html += "<th></th>"
   html += "</tr>";
   if (SavedProjectContacts.length == 0) {
     html += "<tr colspan='4'><td>No Data Found.!</td></tr>";
   } else {
    SavedProjectContacts.forEach(function (key, item) {
    
       html += "<td><input type='hidden' value='" + key.ClientContactId + "'>" + key.ClientContactName + "</td>"
       html += "<td><input type='hidden' value='" + key.EmailId + "'>" + key.EmailId  + "</td>"
       html +=" <td><div class='pull-right'><button class='btn btn-secondary btn-xs' type='button' onclick=updateProjectContacts('"+ key.ClientContactId +"')><i class='fas fa-pencil-alt'></i></button>"
       html +=" <button class='btn btn-danger btn-xs' type='button'><i class='fas fa-trash-alt'></i></button></div></td>"
       html += "</tr>";
     });
   }
   html += "</table>"
   return html;
}

$("#add-project-contacts").ready(function() 
{
	getCountries();
});

function getCountries(){
    let filter_val = JSON.stringify();
    let result = callgetlist('GetCountries', filter_val);
    let options = "<option value=''>Select Country</option>";
    for (let i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $("#dlCountry").html(options);
}
$("#dlCountry").on('change', function() {
    getStates(this.value)
});
function getStates(country){
    let filter_State_val = JSON.stringify({
		"Token": localStorage.getItem('securityToken'),
        "CountryId": country
    });
    let result = callgetlist('GetStates', filter_State_val);
    let options = "<option value=''>Select State</option>";
    for (let i = 0; i < result.length; i++) {
    	options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $("#dlState").html(options);
}
$("#dlState").on('change', function() {
	getCity(this.value)
});
function getCity(state){
    let filter_val = JSON.stringify({
		"Token": localStorage.getItem('securityToken'),
        "StateID": state
      });
    let result = callgetlist('GetCities', filter_val);
    let options = "<option value=''>Select City</option>";
    for (let i = 0; i < result.length; i++) {
    options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
    }
    $("#dlCity").html(options);
}

function clearProjectContact() {
    toggleProjectContacts();
    $('#add-project-contacts input').val('');
	$("#add-project-contacts input").prop("checked", false);
    // $("#add-project-contacts .error_message").html('');
    $("#add-project-contacts .dlerror_messgae").html('');
}

function toggleProjectContacts(){
  if(toggleContacts)
  {
    $('#add-project-contacts').collapse('show')
    toggleContacts = false;
  }
  else
  {
    $('#add-project-contacts').collapse('hide');
    toggleContacts = true;
  }

};

  function deleteProjectContacts(ProjectContactId) {
    // var WorkOrderId = $('#WorkOrderId').val();
    swal({
      title: "Delete",
      text: "Are you sure, Do you want to delete ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
		if($("#dlProjectIsClosed").val() != 1){
			if (willDelete) {
			var id = ProjectContactId;
			data = {
				"Method": "DeleteProjectContacts",
				"Data": {
				"ProjectContactId":id,       
				"Status": 1,
				"Message": ""
				}
			}

			var postCall = PostDataCall(data);
				if (postCall['IsSuccess'] == true) {
					clearProjectContact();
					get_projectContacts();
					swal({
						title: "Success!",
						text: "Deleted Successfully!",
						icon: "success",
						button: "ok!",
					})
				} else {
					alert(postCall['Message']);
				}
			
			}
		}
      })
  }

  function renderProjectContactGrid(data) {
		var ProjectDataGrid = $("#displayProjectContacts")
		.dxDataGrid({
			filterRow: {
			visible: true,
			applyFilter: "auto",
			},
			dataSource: data,
			export: {
			enabled: true,
			allowExportSelectedData: true,
			},
			searchPanel: {
			visible: true,
			width: 240,
			placeholder: "Search...",
			},
			headerFilter: {
			visible: true,
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
			onToolbarPreparing: function (e) {
				var dataGrid = e.component;
				e.toolbarOptions.items.unshift({
					location: "after",
					widget: "dxButton",
					options: {
						icon: "refresh",
						onClick: function () {
							get_projectContacts();
							dataGrid.refresh();
						}
					}
				});
			},
			rowAlternationEnabled: true,
			filterPanel: { visible: true },
			allowColumnReordering: true,
			allowColumnResizing: true,
			showBorders: true,
			columns: [
			{
				caption: "S.No",
				dataField: "sno",
				cssClass: "rno",
				allowGrouping: false,
				allowCollapsing: false,
				allReordering: false,
				width: 70,
				cellTemplate: function (container, options) {
				container.text(
					ProjectDataGrid.pageIndex() * ProjectDataGrid.pageSize() + options.rowIndex + 1
				);
				},
			},
			{
				caption: "Client Name",
				dataField: "ClientName",
			},
            {
				caption: "Designation",
				dataField: "Designation",
			},
			{
				caption: "Email ID",
				dataField: "EmailId",
			},
      		{
				caption: "Is Primary",
				dataField: "IsPrimary",
			},
			{
				caption: "Timesheet To",
				dataField: "TimesheetTo",
			},
			{
				caption: "Timesheet CC",
				dataField: "TimesheetCC",
			},
			{
				dataField: "",
				caption: "Action",
				width: 80,
				allowFiltering:false, 
				allowGrouping: false, 
				allowReordering: false, 
				allowSorting: false, 
				allowCollapsing: false, 
				allowExporting: false,
				cellTemplate: function (container, options) {
				var ProjectContactId = options.data["Id"];
				if($("#dlProjectIsClosed").val() == 0){
					var domActions = "";
					domActions +=
          			`<button class='btn btn-xs btn-primary edit-btn' onclick=updateProjectContacts("${ProjectContactId}");><i class='fas fa-pencil-alt'></i></button><button class='btn btn-xs btn-danger delete-btn' onclick=deleteProjectContacts("${ProjectContactId}");><i class='fas fa-trash-alt'></i></button>`;
				}
		  $("<div class='text-center'>")
					.append($(domActions))
					.appendTo(container);
				},
			},
			],
		})
		.dxDataGrid("instance");
}


// function clientname_dropdown(){
// 	$("#dlClientName").on({
// 		"select2:open": function () {
// 			$('body').on('keyup', '#Project_Modal input.select2-search__field', function () {
// 				var searchKey = $(this).val();
// 				if (searchKey == "") {
// 					let selectE1 = $("select#dlClientName");
// 					selectE1.empty();
// 					selectE1.select2('close');
// 					selectE1.select2('open');
// 				}else {
// 					setTimeout(function () {
// 						ProjectClientName(searchKey);
// 					}, 5000);
// 				}
// 			});
// 			$("select#dlClientName").on('change', function (e) {
// 				let parent = $(this);
// 				parent.children().each(function () {
// 					if ($(this).val() == $("#dlClientName").val()) {  
// 						$("#txtClientName").val($(this).attr("data-person"));
// 						$("#txtEmailId").val($(this).attr("data-email"));
// 						$("#ClientName").val($(this).attr("data-name"));
// 					}
// 				})
// 				$("#ClientName").val($("#dlClientName option:selected").attr("data-name"));
// 			})
// 		}
// 	}).select2({
// 		dropdownParent: $("#Project_Modal"),
// 		placeholder: "Select Client",
// 		// containerCssClass: "dlclient_Name"
// 	});
// }

// function ProjectClientName(keyword){
//     $("#dlClientName").empty();
//     var filter_val = JSON.stringify({
//       keyword: keyword,
//       User_Id: localStorage.getItem("EmployeeID")
//     });
//     var result = callgetlist("GetClientDetails", filter_val);
//     var options = "";
//     for (var i = 0 ; i < result.length; i++) { //Cgvak_Comh_Icode
//       options += "<option value='" + result[i].Cgvak_Comh_Name +"' data-person='" +
//       result[i].Cgvak_Comh_Person +
// 	  "' data-name='" +
//       result[i].Cgvak_Comh_Name +
//       "' data-email='" +
//       result[i].Cgvak_Comh_Person +">" + result[i].Cgvak_Comh_Name + "</option>";
//     }
//     $("#dlClientName").html(options);  
//     let selectEl = $("#dlClientName")
//     let val = selectEl.data("select2").dropdown.$search.val()
//     selectEl.val(null).trigger('change');
//     selectEl.select2('close');
//     selectEl.select2('open');
//     selectEl.data("select2").dropdown.$search.val(val)
//   }

function client_name(){
	var result = callgetlist('GetInternalClientDetails');
	var options = "";
	options += "<option value='0'>Select Client Name</option>"
	for (var i = 0 ; i < result.length; i++) { //Cgvak_Comh_Icode
	options += "<option value='" + result[i].Cgvak_Comh_Name +"' data-person='" +
	result[i].Cgvak_Comh_Person +
	"' data-name='" +
	result[i].Cgvak_Comh_Name +
	"' data-email='" +
	result[i].Cgvak_Comh_Person +"'>" + result[i].Cgvak_Comh_Name + "</option>";
	}
	$("#dlClientName").html(options);  
}