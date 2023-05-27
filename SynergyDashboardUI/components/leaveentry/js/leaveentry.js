
var Leave_Id;


// The below function will trigger while clicking the updateleaveentry button then it
//  sends the leaveid and leavehours to the updateleaveentry function
function UpdateLeave() {
    //;
    var Update_Leave = [];
    var i;
    var errormsgcount = 0;
    for (i = 1; i == i; i++) {
        if (!$(".date-" + i).attr("id")) break;
        if($(`#CompensationRequired-${i}`).is(':checked')) {
            var isChecked = 1;
            if($(`#CompensationDate-${i}`).dxDateBox('instance').option('value') == null) {
                $(`#CompensationDate_error_message-${i}`).html('This field is required');
                errormsgcount++;
            } else {
                $(`#CompensationDate_error_message-${i}`).html('');
                   
            }
        } else {
            var isChecked = 0;
        }
        var LeaveDetails = {
            "LeaveId": $("#id-" + i).attr("class"),
            "LeaveHours": $("#hour-" + i).val(),
            "CompensationRequired": isChecked,
            "CompensationDate": getFormattedLeaveDate($(`#CompensationDate-${i}`).dxDateBox('instance').option('value')),
            "LeaveDetailsID":$(`.LeaveDetailsID-${i}`).val()
        }; 
        Update_Leave.push(LeaveDetails);
       
    }

    if(errormsgcount == 0) {
        updateLeaveEntry(Update_Leave);
    } 
}
// The below function will returns the list of leaves that was applied by that employee
// Then sends the data to the mapEmployeeleaveEntry function
function GetEmployeeLeaveEntry() {
    var filter_val = JSON.stringify({

    });

    var result = callgetlist('GetEmployeeLeaveSummary', filter_val);
    result.forEach(function (key, item) {
        // ;
        var date = new Date(key.From);
        var day = date.getDate();
        var month = date.getMonth() + 1;

        if (day < 10) {
            day = "0" + (day);
        }
        if (month < 10) {
            month = "0" + (month);
        }
        var year = date.getUTCFullYear();

        key.From = (month + "/" + day + "/" + year);

        var date = new Date(key.To);
        var day = date.getDate();
        var month = date.getMonth() + 1;

        if (day < 10) {
            day = "0" + (day);
        }
        if (month < 10) {
            month = "0" + (month);
        }
        var year = date.getUTCFullYear();

        key.To = (month + "/" + day + "/" + year);
    });
    renderLeaveEntryGrid(result);
}

fromDateArrayData = []
toDateArrayData = []
function renderLeaveEntryGrid(data){
    var assignleaveEntryCard = $("#sddgd-leaveEntryCard").dxDataGrid({
        dataSource: data,
        filterRow: {
            visible: true,
            applyFilter: "auto"
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
        paging: {
            pageSize: 10
        },  
        pager: {
            visible: true,
            allowedPageSizes: [5, 10, 'all'],
            showPageSizeSelector: true,
            showInfo: true,
            showNavigationButtons: true,
        },
        groupPanel: {
            visible: true
        },
        sorting: {
            mode: "multiple"
        },
        onToolbarPreparing: function (e) {
            var dataGrid = e.component;
            e.toolbarOptions.items.unshift({
              location: "after",
              widget: "dxButton",
              options: {
                icon: "refresh",
                onClick: function () {
                    GetEmployeeLeaveEntry();
                    dataGrid.refresh();
                },
              },
            });
        },
        columns: [
            {
              caption:"From", 
              dataField:"From",
              dataType :"date",
              format : "dd-MMM-yyyy",
            },
            {
              caption:"To",
              dataField:"To",
              dataType :"date",
              format : "dd-MMM-yyyy",
            },
            {
              caption:"Total Days", 
              dataField:"TotalDays",
              width:100
            },
            {
              caption:"Status", 
              dataField:"Status",
              cellTemplate:function(container,options){
                var domActions = "";
                var leaveStatus = options.data.Status;
                if(leaveStatus == "Rejected"){
                  domActions += "<span class='label label-danger pull-left' style='font-size:7pt !important'>Rejected</span>";
                }
                if(leaveStatus=="Pending"){
                    domActions += "<span class='label label-warning pull-left' style='font-size:7pt !important'>Pending</span>";
                }
                if(leaveStatus=="Approved"){
                    domActions += "<span class='label label-success pull-left' style='font-size:7pt !important'>Approved</span>";
                }
                if(leaveStatus=="Partially Approved"){
                    domActions += "<span class='label label-info pull-left' style='font-size:7pt !important'>Partially Approved</span>";
                }
                               
                $("<div class='text-center'>").append($(domActions)).appendTo(container);
              }
            },
            {
              dataField: "",
              caption: "Action",
              width: 50,
              cellTemplate: function (container, options) {
                  var leaveId=options.data.LeaveId;
                  var domActions = "";
                  domActions += "<button class='btn btn-xs btn-primary edit-btn' onclick=fnGetEmpLeaveDetails('"+leaveId+"')><i class='fas fa-edit'></i></button>";
                  $("<div class='text-center'>").append($(domActions)).appendTo(container);
              },
            }           
        ]
    }).dxDataGrid("instance");
  }
// The below function get tha data from GetEmployeeLeaveEntry function and map that data as a table data
// then returns the table data to GetEmployeeLeaveEntry method 
// function MapEmployeeLeaveEntry(result) {
//     var html = "";

//     if (result == "") {
//         html += "<tr><td colspan='6'>No Data Found.!</td></tr>";
//     }
//     else {

//         result.forEach(function (key, item) {
//             var RCount = item + 1;

//             var date = new Date(key.From);
//             var day = date.getDate();
//             var month = date.getMonth() + 1;

//             if (day < 10) {
//                 day = "0" + (day);
//             }
//             if (month < 10) {
//                 month = "0" + (month);
//             }
//             var year = date.getUTCFullYear();

//             var FromDate = (month + "/" + day + "/" + year);

//             var date = new Date(key.To);
//             var day = date.getDate();
//             var month = date.getMonth() + 1;

//             if (day < 10) {
//                 day = "0" + (day);
//             }
//             if (month < 10) {
//                 month = "0" + (month);
//             }
//             var year = date.getUTCFullYear();

//             var ToDate = (month + "/" + day + "/" + year);

//             html += "<tr class='myRow' id='row_" + RCount + "'>";
//             html += "<td>" + FromDate + "</td>";
//             html += "<td>" + ToDate + "</td>";
//             html += "<td>" + key.TotalDays + "</td>";
//             html += "<td>" + key.Status + "</td>";
//             html += "<td><button style='float: right;' type='button' class='LeaveDetailButton btn btn-default btn-xs cmn-modal-ex-btn' onclick=fnGetEmpLeaveDetails(\'" + key.LeaveId + "\')><i class='fa fa-expand'></i></button></td>"
//             html += "</tr>";
//         });
//     }
//     return html;
// }
// The below function will returns the list of leaves that was applied by that employee
// Then sends the data to the mapEmployeeleavedetails function
function fnGetEmpLeaveDetails(leave_id) {
    
    var filter_val1 = JSON.stringify({
        LeaveId: leave_id
    });
    var leaveresult = callgetlist('GetEmployeeLeaveDetails', filter_val1);
    var LeaveId = leave_id;
    var leave_id_value = JSON.stringify({ LeaveId });
    var filter_value1 = JSON.stringify({
        LeaveId: leave_id_value
    });
    var commenthistorydata = callgetlist('GetEmployeeLeaveComments', filter_value1);
    commentHistory(commenthistorydata);
    var filter_val2 = JSON.stringify({
        LeaveId: leave_id
    });
    var result = callgetlist('GetEmployeeLeaveApprovers', filter_val2);
    leaveresult.forEach(element =>
        leaveresult.map(item => { item.result = result; })
    );

    var editor = CKEDITOR.instances.leaveadetailsreason;
    if (editor) {
        editor.destroy(true);
    }
    CKEDITOR.replace('leaveadetailsreason');
    var mapEmployeeLeave = MapEmployeeLeaveDetails(leaveresult, leave_id);
    $('#leavedetails').html(mapEmployeeLeave);

    $(`.CompensationDateGroup`).hide();
    // $(`.CompensationDate`).datepicker('setDate', null);
    $(".CompensationDate").dxDateBox({
        type: 'date',
        width: 135,
   }).dxDateBox("instance");
    // $(`.CompensationDate`).datepicker({
    //     autoclose: true,
    //     todayHighlight: true
    // }).on('changeDate', function (ev) {
    //     $(this).datepicker('hide');
    // });
    var Rcount = $('#leavedetails tr').length;
    
    for(i=1;i<=Rcount;i++) {
        var compensationDate=leaveresult[i-1].CompensationDate;
        if($(`#CompensationRequired-${i}`).is(':checked')) {
            $(`#CompensationDateGroup-${i}`).show();
             $(`#CompensationDate-${i}`).dxDateBox('instance').option('value',new Date(compensationDate));
            // $(`#CompensationDate-${i}`).attr('disabled',true);
            // $(`#CompensationRequired-${i}`).attr('disabled',true);
        }
    }
    
    $(`.CompensationRequired`).on('click', function() {
        // 
        var id = $(this).attr('id').split('-')[1];
        if($(`#CompensationRequired-${id}`).is(':checked')){
            $(`#CompensationDateGroup-${id}`).show();
            $(`#CompensationDate_error_message-${id}`).show();
        } else {
            // $(`#CompensationDate-${id}`).datepicker('setDate', null);
            $(`#CompensationDateGroup-${id}`).hide();
            $(`#CompensationDate_error_message-${id}`).hide();
        }
    });
    var reasondata = (leaveresult.length !== 0) ? leaveresult[0]["Reason"] : '';
    CKEDITOR.instances['leaveadetailsreason'].setData(reasondata);
    $('#EmployeeLeaveDetail').appendTo("body").modal('show');
}
// The below function get tha data from GetEmployeeLeaveDetails function and map that data as a table data
// then returns the table data to GetEmployeeLeaveDetails method 
function MapEmployeeLeaveDetails(leaveResult, leave_id) {
    
    Leave_Id = leave_id;
    var html = "";
    if (leaveResult.length == 0) {
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
            var year = date.getUTCFullYear();

            var LeaveDate = (month + "/" + day + "/" + year);
            if(key.CompensationDate) {
                var date = new Date(key.CompensationDate);
                var day = date.getDate();
                var month = date.getMonth() + 1;

                if (day < 10) {
                    day = "0" + (day);
                }
                if (month < 10) {
                    month = "0" + (month);
                }
                var year = date.getUTCFullYear();

                // var CompensationDate = (month + "/" + day + "/" + year);
                var CompensationDate = (year + "," + month + "/" + day);
            } else {
                var CompensationDate = '';
            }
            if(key.CompensationRequired) {
                if((key.DisableCompensationDate) && (key.IsCompensationApproved)){
                    var notificationstatus = 'Approved';
                    var colorcode = 'bg-success';
                } else if((key.DisableCompensationDate)) {
                    var notificationstatus = 'Pending';
                    var colorcode = 'bg-warning';
                } else {
                    var notificationstatus = 'Applied';
                    var colorcode = 'bg-warning';
                }
            } else {
                var notificationstatus = '';
                var colorcode = '';
            }
            html += "<tr class='myRow' id='row_" + RCount + "'>";
            html +="<input type='hidden' class='LeaveDetailsID-"+RCount+"' value='"+key.LeaveDetailsID+"' />";
            html += "<input type='hidden' name='leavedate_id' id='id-" + RCount + "' class='" + key.LeaveId + "'>";
            html += "<td class='date-" + RCount + "' id='" + key.LeaveDate + "'>" + LeaveDate + "</td>";
            html += `<td><input  style="width: 60%;" ${key.Status === 'Pending'? '': 'disabled'} id='hour-${RCount}' type='text' value="${key.LeaveHours}" name="${key.LeaveHours}" class="${key.LeaveHours}"></td>`;
            html += `<td>
            
                        <input type="checkbox" id="CompensationRequired-${RCount}" ${key.Status === 'Pending'? '': 'disabled'} ${key.DisableCompensationDate? 'disabled': ''}
                        class="CompensationRequired" ${key.CompensationRequired? 'checked': ''} >
                        ${key.DisableCompensationDate? '<small></small>': ''}
                        <small class="${colorcode}">${notificationstatus}</small>
                    </td>`;
            html += `<td>
                        <div class="input-group CompensationDateGroup" id="CompensationDateGroup-${RCount}">
                        <div style="padding: 0;" class="form-control CompensationDate" id="CompensationDate-${RCount}"></div>
                        </div>
                        <small class="text-danger CompensationDate_error_message" id="CompensationDate_error_message-${RCount}"></small>
                   </td>`;
            html += "<td>";
            html += key.Status;
            html += "</td>";
            html += "<td>";
            html += "<div class='selectBox' onclick='showCheckboxes(" + RCount + ")''>";
            html += `<select ${key.Status === 'Pending'? '': 'disabled'} >`;
            if (key.ApprovedBy) {
                html += "<option>" + key.ApprovedBy + "...</option>";
            } else {
                html += "<option>None</option>";
            }
            html += "</select>";
            html += "<div class='overSelect'></div>";
            html += "</div>";
            html += "<div style='display: none; border: 1px #dadada solid;' id='checkboxes" + RCount + "'>";
            var i = 0;

            key.result.forEach(function (key2, item) {
                // 
                html += "<label style='display: block;' for='" + key2.Approvers + "'>";
                html += "<input ";
                var appprovedby = key.ApprovedBy != null ? key.ApprovedBy.split(',').map((data) => data.trim()) : [];

                if (appprovedby.includes(key2.Approvers))
                    html += " checked ";
                html += " type='checkbox' id='" + key2.Approvers + "' disabled/>" + key2.Approvers + "</label>";
            });
            html += "</div>";
            
            html += "</td>";
            html += "<td>";
            key.ApprovedDate ? html += key.ApprovedDate : html += "";
            html += "</td>";
            if(key.Status === "Pending") {
                html += "<td> <button onclick=deleteLeaveEntry(\'" + key.LeaveId + "\',\'row_" + RCount + "\') id='deleteLeave' type='button' class='btn btn-danger'>Delete</button> </td>";
            } else {
                html += "<td></td>";
            }
            html += "</tr>";
        });
    }
    return html;
}

$("body")
    .on(
        "click",
        function (e) {
            if (e.target.id != "custom-select"
                && $(e.target).attr("class") != "custom-select-option") {
                $("#custom-select-option-box").hide();
            }
        });
// The below function will deletes the leaves
function deleteLeaveEntry(Leave_Id, rowId) {
    // ;
    if (confirm('Are you sure to delete this?')) {
        // ;
        var LeaveDetails = {
            "LeaveId": Leave_Id
        };

        var data = {
            "Method": "PostEmployeeLeaveDelete",
            "Data": {
                "LeaveDetails": JSON.stringify(LeaveDetails)
            },
            "Status": "",
            "Message": ""
        };
        var postCall = PostDataCall(data);
        if (postCall['IsSuccess'] == true) {
            swal("Success..!", postCall['Message'], "success");
            $("#leavedetails #" + rowId).remove();
            GetEmployeeLeaveEntry();
            loadLeaveApprovalEntry();
        } else {
            swal("Warning..!", postCall['Message'], "warning");
        }
    }
    else
        return false;
}
// The below function will apply style for status field in leave entry list table
function listLeaveEntryTableStyle() {
    var Rcount = $('#leave tbody tr').length;
    for (var i = 0; i < Rcount; i++) {
        var status = $('#leave tbody tr').eq(i).find('td').eq(3).text();

        if (status == "Approved") {
            $('#leave tbody tr').eq(i).find('td').eq(3).css('background-color', '#83D475');

        } else if (status == "Rejected") {
            $('#leave tbody tr').eq(i).find('td').eq(3).css('background-color', '#F07470');
        } else {
            $('#leave tbody tr').eq(i).find('td').eq(3).css('background-color', '#FD9346');
        }
        $('#leave tbody tr').eq(i).find('td').eq(3).css('border-radius', '20px');
        $('#leave tbody tr').eq(i).find('td').eq(3).css({
            "padding": "16px 8px"
        });
        $('#leave tbody tr').eq(i).find('td').eq(3).css('width', '15px');
    }
}
// The below function will update the updated leaves into server
function updateLeaveEntry(leave_details) {
    // ;
    var data = {
        "Method": "PostEmployeeLeaveUpdate",
        "Data": {
            "LeaveDetails": JSON.stringify(leave_details)
        },
        "Status": "",
        "Message": ""
    };
    var postCall = PostDataCall(data);
    if (postCall['IsSuccess'] == true) {
        swal("Success..!", postCall['Message'], "success");
        GetEmployeeLeaveEntry();
        $("#EmployeeLeaveDetail").modal("hide");
    } else {
        swal("Warning..!", postCall['Message'], "warning");
    }
}
// The below function will Appends the list of approvers in leave entry model
function MapEmployeeLeaveApprovers(result) {
    var html = "";
    var ApproverName = [];
    if (result != "") {
        result.forEach(function (key, item) {
            ApproversName = key.Approvers;

            html += "<span class='avatar-wrapper mt-2 avatar-wrapper-overlap'>";
            html += "<img class=\"img-circle profileImage\" src=\"components/common/images/appraisal.png\">&nbsp;&nbsp;" + ApproversName + "</img>";
            html += "</span>";

        });
    }
    return html;
}
function saveLeaveEntryDocuments() {
    // ;
    // var files = $('#leaveentry_document_upload').get(0).dropzone.getAcceptedFiles();


}
function leaveentry_dropzone_remove_files() {
    // ;
    Dropzone.forElement("#leaveentry_document_upload").removeAllFiles(true);
}

function getFormattedLeaveDate(dt){
    dt = new Date(dt);
    yr = dt.getFullYear();
    mn = dt.getMonth() + 1;
    mn = mn > 9 ? mn : '0' + mn;
    dy = dt.getDate();
    dy = dy > 9 ? dy : '0' + dy;
    return yr + '-' + mn + '-' + dy;
}