function GetRFP(classname) {
	var filter_val = JSON.stringify({
		"IsActive": true
	});
	var result = callgetlist('GetRFP', filter_val);
	var options = "<option value=''>Select RFP</option>";
	for (var i = 0; i < result.length; i++) {
		options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
	}
	$("." + classname).html(options);
}

function GetClients(clientclassname) {
	var filter_val = JSON.stringify({
		"IsActive": true
	});
	var result = callgetlist('GetClients', filter_val);
	var options = "<option value=''>Select Client</option>";
	for (var i = 0; i < result.length; i++) {
		options += "<option value='" + result[i].Id + "'>" + result[i].Client + "</option>";
	}
	$("." + clientclassname).html(options);
}

function GetEmployeesByDesignation(desgination, clientclassname) {
	var filter_val = JSON.stringify({
		"IsActive": true,
		"Designation": desgination
	});
	var result = callgetlist('GetEmployeesByDesignation', filter_val);
	var options = "<option value=''>Select Employee</option>";
	for (var i = 0; i < result.length; i++) {
		options += "<option value='" + result[i].Id + "'>" + result[i].RFPCreator + "</option>";
	}
	$("." + clientclassname).html(options);
}