
    $('#from_date_leave_approval').datepicker({
        autoclose: true
      });
      $('#to_date_leave_approval').datepicker({
        autoclose: true
      });
function saveLeaveApprovalDocuments() {
    
}
function leaveapproval_dropzone_remove_files() {
    // debugger;
    Dropzone.forElement("#leaveapproval_document_upload").removeAllFiles(true);
}

// The below function returns the leaveapproval list data from the server
function GetEmployeeLeaveApproval(employeeName,leaveStatus,leaveApprovalFromDate,leaveApprovalToDate)
{      
    // debugger;  
    if(employeeName == "")
        employeeName=null;
    if(employeeName == null && leaveStatus == null && leaveApprovalFromDate == null && leaveApprovalToDate == null) 
    {
        employeeName = null
        leaveStatus = null
        fromDate = null
        toDate = null
    } else {
        if(leaveApprovalFromDate != null) {
            var ApprovalFromDate = new Date(leaveApprovalFromDate);
             var day = ApprovalFromDate.getDate();
            var month = ApprovalFromDate.getMonth() + 1;
            if (day < 10) {
                day = "0" + (day);
            }
            if (month < 10) {
                month = "0" + (month);
            }
            var year = ApprovalFromDate.getFullYear();
            var fromDate = (month + "/" + day + "/" + year);
        } else {
            var fromDate = null;
        }
        if(leaveApprovalFromDate != null) {
            var ApprovalToDate = new Date(leaveApprovalToDate);
            var day = ApprovalToDate.getDate();
            var month = ApprovalToDate.getMonth() + 1;
            if (day < 10) {
                day = "0" + (day);
            }
            if (month < 10) {
                month = "0" + (month);
            }
            var year = ApprovalToDate.getFullYear();
            var toDate =(month + "/" + day + "/" + year);
        } else {
            var toDate = null;
        }

    }
    
    var LeaveDetails = JSON.stringify({        
        EmployeeName: employeeName,
        Status: leaveStatus,    
        FromDate: fromDate,
        ToDate: toDate
    });

    var filter_val = JSON.stringify({        
        LeaveDetails: LeaveDetails
        
    });

    var result = callgetlist('GetEmployeeApprovalSummary', filter_val);   
    renderleaveApprovelist(result);     
    // var mapleaveApproval = MapEmployeeApprovalSummary(result);    
    // $('#leaveApprovalList').html(mapleaveApproval);  
    var Rcount = $('#tblLeaveApprovalentry tbody tr').length;
      for (var i = 0; i < Rcount; i++) {
        var status = $('#tblLeaveApprovalentry tbody tr').eq(i).find('td').eq(4).text();

        if (status == "Approved") {
            $('#tblLeaveApprovalentry tbody tr').eq(i).find('td').eq(4).css('background-color', '#83D475');
        } else if(status == "Rejected") {
          $('#tblLeaveApprovalentry tbody tr').eq(i).find('td').eq(4).css('background-color', '#F07470');
        } else {
            $('#tblLeaveApprovalentry tbody tr').eq(i).find('td').eq(4).css('background-color', '#FD9346');
        }
        $('#tblLeaveApprovalentry tbody tr').eq(i).find('td').eq(4).css('border-radius', '20px');
        $('#tblLeaveApprovalentry tbody tr').eq(i).find('td').eq(4).css({
            "padding": "16px 8px"
        });
        $('#tblLeaveApprovalentry tbody tr').eq(i).find('td').eq(4).css('width', '15px');
      }
    
}
// The below function will get tha data and
//  return the data as a html table rows to the getemployeeleaveapprovalist function
function MapEmployeeApprovalSummary(result)
{             
    var html = "";  
    if(result == null)
        result = "";
      
        if (result == "") {
            html += "<tr ><td colspan='6'>No Data Found.!</td></tr>";
        }
        else
        {            
            result.forEach(function (key, item) {     
           
            var RCount = item + 1;
                        
            var date = new Date(key.From);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            
            if(day < 10){
                day = "0" + (day);
            }
            if(month < 10){
                month = "0" + (month);
            }
            var year = date.getFullYear();
            
            var FromDate = (month + "/" + day + "/" + year);
            
            var date = new Date(key.To);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            
            if(day < 10){
                day = "0" + (day);
            }
            if(month < 10){
                month = "0" + (month);
            }
            var year = date.getFullYear();
            
            var ToDate =(month + "/" + day + "/" + year);

            if(key.Status == "1")
                Status = "Approved";
            else if(key.Status == "2")    
                Status = "Rejected";  
            else if(key.Status == "4")
                Status = "Partially Approved"  
            else
                Status = "Applied";

            html += "<tr class='myRow' id='row_" + RCount + "'>";
            html += "<td>" + key.EmployeeName + "</td>";                   
            html += "<td>" + FromDate + "</td>";
            html += "<td>" + ToDate + "</td>";
            html += "<td>" + key.TotalDays + "</td>";
            html += "<td>" + Status + "</td>";            
            html += "<td><button style='float: right;' type='button' class='LeaveDetailButton btn btn-default btn-xs cmn-modal-ex-btn' onclick=fnGetLeaveApprovalDetails(\'"+ key.LeaveId +"\')><i class='fa fa-expand'></i></button></td>"
            html += "</tr>"; 
        });                      
        
    }
    return html;
}

var leaveaapprovalreasonEditor = '';
// The below function gets the leaveapprovaldetails from server
function fnGetLeaveApprovalDetails(LeaveId) {    

$('.leaveaapprovalreason_error_msg').html('');
    var LeaveId = JSON.stringify({LeaveId});
    var filter_val = JSON.stringify({
        LeaveId: LeaveId
    });
    var commenthistorydata = callgetlist('GetEmployeeLeaveComments', filter_val);
    leaveapproval_commentHistory(commenthistorydata);
    var leaveresult = callgetlist('GetEmployeeLeaveApprovalDetails', filter_val);            
    // var editor = CKEDITOR.instances.leaveaapprovalreason;

    // if (editor) {
    //     editor.destroy(true);
    // }
    // CKEDITOR.replace('leaveaapprovalreason');

    leaveaapprovalreasonEditor = $('#leaveaapprovalreason').dxHtmlEditor({
		height: 500,
		value: '',
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
	leaveaapprovalreasonEditor.option('toolbar.multiline', true);

    var Status = [];
    leaveresult.forEach(function (key, item) {

        if(key.Status == "Applied")   
                Status[item + 1] = "Requested";
            else
                Status[item + 1] = key.Status;

    });

    var mapEmployeeLeave = MapEmployeeLeaveApprovalDetails(leaveresult);        
    $('#leaveapprovaldetails').html(mapEmployeeLeave);
    
    var filedata = leaveresult[0]["LeaveFile"];
    
    $('#EmployeeLeaveApprovalDetail').appendTo("body").modal('show');
    
}
// the below function map the employeeleaveapprovaldetails 
function MapEmployeeLeaveApprovalDetails(leaveResult) {
//    debugger;
    var html = "";

    if (leaveResult == "") {
        html += "<tr><td colspan='5'>No Data Found.!</td></tr>";
    }
    else {
        leaveResult.forEach(function (key, item) {
                              
            var RCount = item + 1;
            var date = new Date(key.LeaveDate);
            var day = date.getDate();
            var month = date.getMonth() + 1;

            if (day < 10) {
                day = "0" + (day);
            }
            if (month < 10) {
                month = "0" + (month);
            }
            var year = date.getFullYear();
            var LeaveDate =(month + "/" + day + "/" + year);                        
            var ApprovedDate;

            if(key.ApprovedDate == null)
                ApprovedDate = "";
            else 
                ApprovedDate = key.ApprovedDate;

            var ApproverName;
            if(key.ApproverName == null)
                ApproverName = "";
            else
                ApproverName=key.ApproverName;
                    
            var Status = "";
            var Status1 = "";
            var Status2 = "";
            var Status3 = "";

            if(key.Status == "Applied")   
                Status = "Requested";
            else
                Status = key.Status;
            
            if(Status == "Approved")
                Status1 = "selected";
            else  if (Status == "Rejected")    
                Status2 = "selected";
            else
                Status3 = "selected";


            if(key.CompensationDate != null) {
                var date = new Date(key.CompensationDate);
                var day = date.getDate();
                var month = date.getMonth() + 1;
    
                if (day < 10) {
                    day = "0" + (day);
                }
                if (month < 10) {
                    month = "0" + (month);
                }
                var year = date.getFullYear();
                var CompensationDate =(month + "/" + day + "/" + year);    
            } else {
                var CompensationDate = '';
            }

            html += "<tr class='myRow' id='row_" + RCount + "'>";
            html += "<input type='hidden' id='LeaveDetailsID_" + RCount + "' value='" + key.LeaveApproveId + "'>" + key.LeaveApproveId;
            html += "<td class='date-" + RCount + "' id='LeaveDate_" + key.LeaveDate + "'>" + LeaveDate + "</td>";
            html += "<td><input id='LeaveHours_" + RCount + "' type='text' value=" + key.LeaveHours + " name=" + key.LeaveHours + " disabled /></td>";
            html += `<td><p>${CompensationDate}</p></td>`;
            html += `<td>${key.CompensationRequired? `<input type="checkbox" id="ApproveCompensation-${RCount}" class="ApproveCompensation"  ${key.IsCompensationApproved? 'checked': ''} >`: ''}</td>`;
            html += "<td><select class='form-control' id='status_"+ RCount +"'><option value='1' "+ Status1 +">Approved</option><option value='2' "+ Status2 +">Rejected</option><option value='0' "+ Status3 +">Requested</option></select>"            
            html += "<td class='date-" + RCount + "' id='approvedBy_" + RCount + "'>" + ApproverName + "</td>";  
            html += "<td class='date-" + RCount + "' id='ApprovedDate_" + RCount + "'>" + ApprovedDate + "</td>";                 
            html += "</td>";                                
            html += "</tr>";
        });

    }
    return html;
}
$('.leaveaapprovalreason_error_msg').html('');
// The belwo function updates the leave status to the server
function ApprovedLeave() {    
    var Update_Leave= [];
    var curstatus;
    var Rcount = $('#leaveapprovaldetails tr').length;
    var leaveApproverReason = leaveaapprovalreasonEditor.option("value");
    // var leaveApproverReason = CKEDITOR.instances.leaveaapprovalreason.getData();
    if(leaveApproverReason != '') {
        $('.leaveaapprovalreason_error_msg').html('');
        for (var i = 1; i <= Rcount; i++) {
        curstatus = $("#status_" + i).val()
    
            if($(`#ApproveCompensation-${i}`).is(':checked')) {
                var CompensationApproved = 1;
            } else {
                var CompensationApproved = 0;
            }
            var LeaveDetails = {
                "LeaveHours": $("#LeaveHours_" + i).val(),
                "IsApproved": curstatus,
                "LeaveId": $("#LeaveDetailsID_" + i).val(),
                "IsCompensationApproved": CompensationApproved
            };
            Update_Leave.push(LeaveDetails);        
        }
        
        
        var data = {
            "Method": "PostEmployeeLeaveApproval",
            "Data": {
                "LeaveDetails": JSON.stringify(Update_Leave),
                "Reason": leaveApproverReason
            },
            "Status": "",
            "Message": ""
        };

        var postCall = PostDataCall(data);
        
        if (postCall['IsSuccess'] == true) {
        

            var LeaveApproval_FileDetails = $('#leaveapproval_document_upload').get(0).dropzone.getAcceptedFiles();
        
            if (LeaveApproval_FileDetails.length > 0) {
            
                for (i = 0; i < LeaveApproval_FileDetails.length; i++) {
                    
                    var FileExtensions = LeaveApproval_FileDetails[i].name.slice((Math.max(0, LeaveApproval_FileDetails[i].name.lastIndexOf(".")) || Infinity) + 1);
                    
                    var FileTypes = LeaveApproval_FileDetails[i].type;
                    
                    var FileNames = LeaveApproval_FileDetails[i].name.substr(0, LeaveApproval_FileDetails[i].name.lastIndexOf("."));
                
                    var LeaveApprovalFileFormData = new FormData();
                
                    LeaveApprovalFileFormData.append('file', LeaveApproval_FileDetails[i]);
                
                    var Contentdetails =

                        [{

                            "DocumentTypeId": "LEAVE",

                            "DocumentType": "LEAVE",

                            "DocumentName": FileNames,

                            "Extension": FileExtensions,

                            "ContentType": FileTypes

                    
                        }]

                    
                        LeaveApprovalFileFormData.append('Contentdetails', JSON.stringify(Contentdetails));
                
                        var SaveLeaveApprovalDocumentsResult = postFileGeneric(LeaveApprovalFileFormData);
            
                    }
        
                }

            
                swal("Success..!",postCall['Message'] , "success");
            
                leaveapproval_dropzone_remove_files();
            
                LeaveApproval_FileDetails = [];
            
                $('.leaveapproval_fileList').html('');
            
                $("#EmployeeLeaveApprovalDetail").modal('hide');
            
                loadLeaveApprovalEntry()
            
                GetEmployeeLeaveEntry()

    
        } else {
        
                swal("Warning..!",postCall['Message'] , "warning");
        
        }
    } else {
        $('.leaveaapprovalreason_error_msg').html('Reason field is required');
    }
        
    // $("#EmployeeLeaveApprovalDetail").modal('hide');


  
}

//The below function returns the number of days in a given from date and to date
function noofdayscount(start, end) {
    var startdate = new Date(start);
    var enddate = new Date(end);
    // end - start returns difference in milliseconds 
    var diff = new Date(enddate - startdate);

    // get days
    var days = diff / 1000 / 60 / 60 / 24;
    return days;
}


function renderleaveApprovelist(data) {
    var employeeName = $('#employeename').val() != '' ? $('#employeename').val(): null;
    var leaveStatus = $('#leavestatus').val() != '-1' ? $('#leavestatus').val(): null;
    var leaveApprovalFromDate = $('#from_date_leave_approval').val() != '' ? $('#from_date_leave_approval').val(): null;
    var leaveApprovalToDate = $('#to_date_leave_approval').val() != '' ? $('#to_date_leave_approval').val(): null;
    var ProjectDataGrid = $("#leaveApprovalList")
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
                        GetEmployeeLeaveApproval(employeeName, leaveStatus, leaveApprovalFromDate, leaveApprovalToDate);
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
            caption: "Employee Name",
            dataField: "EmployeeName",
        },
        {
            caption: "From",
            dataField: "From",
            dataType :"date",
            format : "dd-MMM-yyyy"
        },
        {
            caption: "To",
            dataField: "To",
            dataType :"date",
            format : "dd-MMM-yyyy"
        },
          {
            caption: "Today Days",
            dataField: "TotalDays",
        },
        {
            caption: "Status",
            dataField: "Status",
            cellTemplate: function (container, options) {
                var domActions = "";
                if(options.data.Status == "1")
                {
                    domActions += "<span class='label label-success pull-left'>Approved</span>";
                }else if(options.data.Status == "2"){

                    domActions += "<span class='label label-danger pull-left'>Rejected</span>";
                }else if(options.data.Status == "4"){

                    domActions += "<span class='label label-info pull-left'>Partially Approved</span>";
                }else{

                    domActions += "<span class='label label-warning pull-left'>Applied</span>";
                }
                $("<div class='text-center'>")
                .append($(domActions))
                .appendTo(container);
            },
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
            var LeaveId = options.data["LeaveId"];
            var domActions = "";
            domActions +=
                `<button style='float: right;' type='button' class='LeaveDetailButton btn btn-default btn-xs cmn-modal-ex-btn' onclick=fnGetLeaveApprovalDetails("${LeaveId}")><i class='fa fa-expand'></i></button>`;
        
      $("<div class='text-center'>")
                .append($(domActions))
                .appendTo(container);
            },
        },
        ],
    })
    .dxDataGrid("instance");
}
