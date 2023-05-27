function defaulters_select_projects(argument) {

    // 1-> Projects
    $("#defaulters-projects-edit").removeClass("hidden");
    $("#defaulters-tasks-edit").removeClass("hidden");

    var filter_val = JSON.stringify({
        "IsActive": true
    });

    var result = callgetlist('GetProjectsOfTheLoggedUser', filter_val);
   
    var options = "<option value=''>Select Project</option>";
    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].ID + "'>" + result[i].Name + "</option>";
    }
    $(".defaulters-projectsList").html(options);
}

// ========================== Submit post call 445 ============================ /

function AddPostDataProjectsDefaulters(argument) {
    var counter = 0;

    // 1-> Projects
    if ($('#defaulters-Project-edit').val() == "") {
        $('#defaulters-Project-edit').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-Project-edit').removeClass("redClass");
    }

    if ($('#defaulters-Task-edit').val() == "") {
        $('#defaulters-Task-edit').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-Task-edit').removeClass("redClass");
    }

    if ($('#defaulters-ActualHours').val() == "" || $('#defaulters-ActualHours').val() == 0) {
        $('#defaulters-ActualHours').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-ActualHours').removeClass("redClass");
    }

    if ($('#defaulters-BillableHours').val() == "" || $('#defaulters-BillableHours').val() == 0) {
        $('#defaulters-BillableHours').addClass("redClass");
        counter++;
    } else {
        $('#defaulters-BillableHours').removeClass("redClass");
    }

    if (parseInt($('#defaulters-BillableHours').val()) > parseInt($('#defaulters-ActualHours').val())) {
        $('#defaulters-hours-response').html("Billable hours shouldn't exceed balance hour.");
        return false;
    } else {
        $('#defaulters-hours-response').html("");
    }

    if (counter > 0) {
        $('#error-response').html("Require Fields are Missing");
        return false;
    } else {
        $('#error-response').html("");
    }

    request = {
        "Method": "PostProjectTaskLog",
        "Data": {
            "ProjectId": parseInt($('#defaulters-Project-edit').val()),
            "TaskId": parseInt($('#defaulters-Task-edit').val()),
            "Comments": $('.defaulters-actionComment').val(),
            "ActualHours": parseInt($('#defaulters-ActualHours').val()),
            "BillableHours": parseInt($('#defaulters-BillableHours').val())
        }
    }
    var result = PostDataCall(request);
    $('#sucess-response').html(result.Message);
    // ////console.log(result.Data[0].TotalHoursLoggedForToday);

    $('#LoggedHoursToday').html(result.Data[0].TotalHoursLoggedForToday);
    $('#BillableHoursToday').html(result.Data[0].TotalBillableHoursLoggedForToday);

    $('#LoggedHoursMonth').html(result.Data[0].TotalHoursLoggedForTheMonth);
    $('#BillableHoursMonth').html(result.Data[0].TotalBillableHoursLoggedForTheMonth);
    $('#ApprovedHoursMonth').html(result.Data[0].TotalApprovedHoursForTheMonth);

    $('#LoggedHoursYear').html(result.Data[0].TotalHoursLoggedForTheYear);
    $('#BillableHoursYear').html(result.Data[0].TotalBillableHoursLoggedForTheYear);
    $('#ApprovedHoursYear').html(result.Data[0].TotalApprovedHoursForTheYear);

    // Highlighting Div //
    $('.billabilityDiv').css("background-color", "#8fbc8f");
    setTimeout(function () {
        $('.billabilityDiv').css("background-color", "#fff");
    }, 2000);
    // Highlighting Div //

    $("#defaulters-ActualHours").val(0);
    $("#defaulters-BillableHours").val(0);
    $(".defaulters-actionComment").val("");
    getchartdata('#defaulters-Project-edit');
}

// ========================== project Hide Show Fields ============================ /

function projectHideShowFields(argument) {
    $('#defaulters-displayTaskHrs').html('');
    $(".defaulters-taskChart").addClass("hidden");
    $("#defaulters-tasks-edit").addClass("hidden");
    $("#defaulters-Project-edit").prop('selectedIndex', 0);
    $(".defaulters-taskList").prop('selectedIndex', 0);

    $(".modealExpand").removeClass("modal-lg");
    if ($(".defaulters-actionForm").hasClass("col-md-6")) {
        $(".defaulters-actionForm").removeClass("col-md-6");
    }
    if ($(".defaulters-actionForm").hasClass("col-md-4")) {
        $(".defaulters-actionForm").removeClass("col-md-4");
    }

    $(".defaulters-actionForm").addClass("col-md-12");

    if ($(".defaulters-actionChartSidebar").hasClass("hidden") != true) {
        $(".defaulters-actionChartSidebar").addClass("hidden");
    }
}

// ========================== project Chart ============================ /

function select_Default_project_OnChange(e) {
    $("#defaulters-chart3").hide();
    var selectedValue = $(e).val();
    var filter_val = JSON.stringify({
        "IsActive": true
    });
    myres = callgetlist('GetProjectsOfTheLoggedUser', filter_val);
    for (var i = 0; i < myres.length; i++) {
        if (myres[i]['ID'] == selectedValue) {
            var startDate = myres[i]['StartDate'];
            var EndDate = myres[i]['EndDate']
        }
    }
    // ////console.log('startDate'+startDate)
    // ////console.log('EndDate'+EndDate)

    $('#defaulters-project_start_date').html(startDate);
    $('#defaulters-project_end_date').html(EndDate);
    // getting graph data for selected project
    var selectedText = $("option:selected", e).html();
    var filter_val = JSON.stringify({
        "IsActive": true,
        "ProjectID": selectedValue
    });


    //var result = JSON.parse(callgetlist('TaskList',selectedValue));
    var result = callgetlist('GetTasksforaproject', filter_val);
    var options = "<option value=''>Select Task</option>";

    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "' data-balbillhours = '" + result[i].BalanceBillableHours + "' data-esthours='" + result[i].EstimatedHours + "' >" + result[i].Name + "</option>";
    }

    $(".defaulters-taskList").html(options);

    if (selectedValue != "") {
        $(".defaulters-actionChartSidebar").removeClass("hidden");
        $(".defaulters-actionForm").removeClass("col-md-12");
        $(".defaulters-actionForm").addClass("col-md-4");
        $(".modealExpand").addClass("modal-lg");
        $("#defaulters-tasks-edit").removeClass("hidden");

    }


    var graph_data = callgetlist('GetProjectProgressGraphChart', filter_val);
    var label_data = [];
    var estimated = [];
    var burnt = [];
    var billed = [];

    for (var i = 0; i <= graph_data.length - 1; i++) {
        label_data.push(graph_data[i]['Phase']);
        estimated.push(graph_data[i]['Estimated']);
        burnt.push(graph_data[i]['Burnt']);
        billed.push(graph_data[i]['Billed']);
    }

    // ////console.log('Bar chart data -------------- Start');
    // ////console.log(label_data);
    // ////console.log(estimated);
    // ////console.log(burnt);
    // ////console.log(billed);
    // ////console.log('Bar chart data -------------- End');

    var estimateBackgroundColor = [];
    var burntBackgroundColor = [];
    var billedBackgroundColor = [];
    var estimateBorderColor = [];
    var burntBorderColor = [];
    var billedBorderColor = [];
    for (var i = 0; i < estimated.length; i++) {
        estimateBackgroundColor.push("rgba(255, 99, 132, 0.8)");
        estimateBorderColor.push("rgba(255, 99, 132, 1)");
    }
    for (var i = 0; i < burnt.length; i++) {
        burntBackgroundColor.push("rgba(54, 162, 235, 0.8)");
        burntBorderColor.push("rgba(54, 162, 235, 1)");
    }
    for (var i = 0; i < billed.length; i++) {
        billedBackgroundColor.push("rgba(255, 206, 86, 0.8)");
        billedBorderColor.push("rgba(255, 206, 86, 1)");
    }

    var ctx = document.getElementById("defaulters-chart1").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label_data,
            datasets: [{
                    label: 'Estimated',
                    data: estimated,
                    backgroundColor: estimateBackgroundColor,
                    borderColor: estimateBorderColor,
                    borderWidth: 1
                },
                {
                    label: 'Burnt',
                    data: burnt,
                    backgroundColor: burntBackgroundColor,
                    borderColor: burntBorderColor,
                    borderWidth: 1
                },
                {
                    label: 'Billed',
                    data: billed,
                    backgroundColor: billedBackgroundColor,
                    borderColor: billedBorderColor,
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // Chart2

    var graph_data = callgetlist('GetMyContributionGraphChart', filter_val);
    // ////console.log(graph_data)
    var label_data = [];
    var estimated = [];
    var burnt = [];
    var billed = [];

    for (var i = 0; i <= graph_data.length - 1; i++) {

        label_data.push(graph_data[i]['Phase']);
        estimated.push(graph_data[i]['Estimated']);
        burnt.push(graph_data[i]['Burnt']);
        billed.push(graph_data[i]['Billed']);
    }

    // ////console.log('Bar chart2 data -------------- Start');
    // ////console.log(label_data);
    // ////console.log(estimated);
    // ////console.log(burnt);
    // ////console.log(billed);
    // ////console.log('Bar chart2 data -------------- End');
    var estimateBackgroundColor = [];
    var burntBackgroundColor = [];
    var billedBackgroundColor = [];
    var estimateBorderColor = [];
    var burntBorderColor = [];
    var billedBorderColor = [];
    for (var i = 0; i < estimated.length; i++) {
        estimateBackgroundColor.push("rgba(255, 99, 132, 0.8)");
        estimateBorderColor.push("rgba(255, 99, 132, 1)");
    }
    for (var i = 0; i < burnt.length; i++) {
        burntBackgroundColor.push("rgba(54, 162, 235, 0.8)");
        burntBorderColor.push("rgba(54, 162, 235, 1)");
    }
    for (var i = 0; i < billed.length; i++) {
        billedBackgroundColor.push("rgba(255, 206, 86, 0.8)");
        billedBorderColor.push("rgba(255, 206, 86, 1)");
    }

    var ctx = document.getElementById("defaulters-chart2").getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label_data,
            datasets: [{
                    label: 'Estimated',
                    data: estimated,
                    backgroundColor: estimateBackgroundColor,
                    borderColor: estimateBorderColor,
                    borderWidth: 1
                },
                {
                    label: 'Burnt',
                    data: burnt,
                    backgroundColor: burntBackgroundColor,
                    borderColor: burntBorderColor,
                    borderWidth: 1
                },
                {
                    label: 'Billed',
                    data: billed,
                    backgroundColor: billedBackgroundColor,
                    borderColor: billedBorderColor,
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // Chart3

    var graph_data = callgetlist('GetMyTaskProgressGraphChart', filter_val);

    var label_data = ['Estimated', 'Burnt', 'Billed'];

    var estimated = [];
    var burnt = [];
    var billed = [];
    var phase = [];

    var final_array = [];
    var response = [];
    //response += "[";
    var color;
    for (var i = 0; i <= graph_data.length - 1; i++) {

        //label_data.push(graph_data[i]['Phase']);

        var myarray = [];

        var labelname = graph_data[i]['Phase'];
        myarray.push(graph_data[i]['Estimated']);
        myarray.push(graph_data[i]['Burnt']);
        myarray.push(graph_data[i]['Billed']);
        if (i != 0) {
            myarray[0] = null;
        }

        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);

        color = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.8)';

        response.push({
            label: labelname,
            data: myarray,
            backgroundColor: ['' + color + '', '' + color + '', '' + color + '', '' + color + ''],
            borderColor: ['' + color + '', '' + color + '', '' + color + '', '' + color + ''],
            borderWidth: 1
        })
        // ////console.log(response);
    }

    var ctx = document.getElementById("defaulters-chart3").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {

            labels: label_data,
            datasets: response
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}
// ========================== on change select project ============================ /

// ========================== After project responses ============================ /

function getchartdata(e) {

    var selectedValue = $(e).val();
    // getting graph data for selected project
    var selectedText = $("option:selected", e).html();
    var filter_val = JSON.stringify({
        "IsActive": true,
        "ProjectID": selectedValue
    });


    //   //var result = JSON.parse(callgetlist('TaskList',selectedValue));
    var result = callgetlist('GetTasksforaproject', filter_val);
    var options = "<option value=''>Select Task</option>";

    for (var i = 0; i < result.length; i++) {
        options += "<option value='" + result[i].Id + "' data-balbillhours = '" + result[i].BalanceBillableHours + "' data-esthours='" + result[i].EstimatedHours + "' >" + result[i].Name + "</option>";
    }

    var graph_data = callgetlist('GetProjectProgressGraphChart', filter_val);

    var label_data = [];
    var estimated = [];
    var burnt = [];
    var billed = [];

    for (var i = 0; i <= graph_data.length - 1; i++) {
        label_data.push(graph_data[i]['Phase']);
        estimated.push(graph_data[i]['Estimated']);
        burnt.push(graph_data[i]['Burnt']);
        billed.push(graph_data[i]['Billed']);
    }

    // ////console.log('Bar chart data -------------- Start');
    // ////console.log(label_data);
    // ////console.log(estimated);
    // ////console.log(burnt);
    // ////console.log(billed);
    // ////console.log('Bar chart data -------------- End');

    var ctx = document.getElementById("defaulters-chart1").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label_data,
            datasets: [{
                    label: 'Estimated',
                    data: estimated,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 99, 132, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Burnt',
                    data: burnt,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Billed',
                    data: billed,
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // Chart2

    var graph_data = callgetlist('GetMyContributionGraphChart', filter_val);

    var label_data = [];
    var estimated = [];
    var burnt = [];
    var billed = [];

    for (var i = 0; i <= graph_data.length - 1; i++) {
        label_data.push(graph_data[i]['Phase']);
        estimated.push(graph_data[i]['Estimated']);
        burnt.push(graph_data[i]['Burnt']);
        billed.push(graph_data[i]['Billed']);
    }

    // ////console.log('Bar chart2 data -------------- Start');
    // ////console.log(label_data);
    // ////console.log(estimated);
    // ////console.log(burnt);
    // ////console.log(billed);
    // ////console.log('Bar chart2 data -------------- End');

    var ctx = document.getElementById("defaulters-chart2").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label_data,
            datasets: [{
                    label: 'Estimated',
                    data: estimated,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 99, 132, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Burnt',
                    data: burnt,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Billed',
                    data: billed,
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // Chart3

    var graph_data = callgetlist('GetMyTaskProgressGraphChart', filter_val);

    var label_data = [];
    var estimated = [];
    var burnt = [];
    var billed = [];

    for (var i = 0; i <= graph_data.length - 1; i++) {
        label_data.push(graph_data[i]['Phase']);
        estimated.push(graph_data[i]['Estimated']);
        burnt.push(graph_data[i]['Burnt']);
        billed.push(graph_data[i]['Billed']);
    }

    // ////console.log('Bar chart3 data -------------- Start');
    // ////console.log(label_data);
    // ////console.log(estimated);
    // ////console.log(burnt);
    // ////console.log(billed);
    // ////console.log('Bar chart3 data -------------- End');

    var ctx = document.getElementById("defaulters-chart3").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: label_data,
            datasets: [{
                    label: 'Estimated',
                    data: estimated,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 99, 132, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)',
                        'rgba(255,99,132,1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Burnt',
                    data: burnt,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Billed',
                    data: billed,
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}

// ========================== on change Task ============================ /
function task_DefaultersOnChange(e) {
    $("#defaulters-chart3").show();
    var selectedValue = $(e).val();
    //var resultdata = callgetlist(selectedValue);

    var balbillhours = $("option:selected", e).data('balbillhours');
    var esthours = $("option:selected", e).data('esthours');

    if (selectedValue != "") {
        var text = '';
        text += '<p><strong>Balance Billable Hours:</strong> ' + balbillhours + '</p>';
        text += '<p><strong>Estimated Hours:</strong> ' + esthours + '</p>';
        $('#defaulters-displayTaskHrs').html(text);
        $(".defaulters-taskChart").removeClass("hidden");
        $("#defaulters-tasks-edit").removeClass("hidden");
        $("#defaulters-commentsDiv").removeClass("hidden");
        //$("#billableDiv").removeClass("hidden");
        // $("#hoursDiv").removeClass("hidden");
    }

}

// ========================== Project Fields Hide Show ============================ /
function validation_defaulters_project_hide_show(selectedValue) {
    if (selectedValue != 'projects') {
        jQuery("#defaulters-billableDiv").addClass('hidden');
    } else {
        if (jQuery("#defaulters-billableDiv").hasClass('hidden')) {
            jQuery("#defaulters-billableDiv").removeClass('hidden');
        }
    }
}