$(document).ready(function () {
    // **** This section is hided temprory purpose > need to changed api ***/
    // $.ajax({
    //     type: "GET",
    //     dataType: 'json',
    //     url: 'http://172.16.2.214/SynergyWebAPI/api/Leave/GetUserLeave',
    //     success: function (data) {
    //         //console.log(data.data);
    //         var usedata = data.data;
    //         $.each(usedata, function (key, item) {
    //             //console.log(item.userId);
    //             $('#tblLeaveentry').append("<tr><td>" + item.userId + "</td>" + "<td>" + item.userName + "</td>" + "<td>" + item.totalDays + "</td>" + "<td><input type='button' id=" + item.userId + " class='btn btn-info btn-xs ' onclick='moredetails(" + item.userId + ")'value='More details' />&nbsp;</td><td> <input type='button' id='" + item.userId + "' class='btn btn-xs btn-success'  onclick='approveleave(" + item.userId + ")' value='Approve'/>&nbsp;<input type='button' class='btn btn-xs btn-danger' onclick='rejectleave	(" + item.userId + ")' value='Reject ' /></td></tr>");

    //         })
    //     }
    // });

    // $.ajax({
    //     type: "GET",
    //     dataType: 'json',
    //     url: 'http://172.16.2.214/SynergyWebAPI/api/Leave/GetUserLeave',
    //     success: function (data) {
    //         //console.log(data.data);
    //         var usedata = data.data;
    //         $.each(usedata, function (key, item) {
    //             //console.log(item.userId);
    //             $('#tblListingemp').append("<tr><td>" + item.userId + "</td>" + "<td>" + item.userName + "</td>" + "<td>" + item.fromDate + "</td>" + "<td>" + item.toDate + "</td>" + "<td>" + item.totalDays + "</td>" + "<td>" + item.totalsHours + "</td>" + " <td>" + item.leaveReason + "</td>" + "<td>" + item.approvedBy + "</td>" + "<td><input type='button' id=" + item.userId + " class='btn btn-info btn-xs ' onclick='moredetails(" + item.userId + ")'value='More details' />&nbsp;</td><td> <input type='button' id='" + item.userId + "' class='btn btn-xs btn-success'  onclick='approveleave(" + item.userId + ")' value='Approve'/>&nbsp;<input type='button' class='btn btn-xs btn-danger' onclick='rejectleave	(" + item.userId + ")' value='Reject ' /></td></tr>");

    //         })
    //     }
    // });
    // **** This section is hided temprory purpose > need to changed api ***/



    $("#txt-rrm-Interview-Datetime").focus(function () {
        $(this).attr({
            type: 'datetime-local'
        });
    });

    $('#toggle-one').bootstrapToggle({
        off: "No",
        on: "Yes"
    });

    $("#toggle-one").change(function () {
        changeCompensationReq();
    });

    changeCompensationReq();
});

function changeCompensationReq() {
    if ($("#toggle-one").is(":checked"))
        $("#divCompensationDate").show();
    else
        $("#divCompensationDate").hide();
}

function approveleave(userId) {
    var id = userId;
    var approverempid = 0;
    var requesterempid = 0;
    var isapprove = 1;
    var reason = "not a valid reason";
    $.ajax({
        type: 'post',
        url: 'http://172.16.2.214/synergywebapi/api/leave/approveorrejectuserleave',
        data: {
            id: id,
            approverempid: approverempid,
            requesterempid: requesterempid,
            isapprove: isapprove,
            reason: reason
        },
        success: function (msg) {
            $('#approveswipe').html(msg);
        }
    });
}


function rejectleave(userId) {
    $('#modal-rejectleave #hidden-leave-userid').val(0);
    $("#modal-rejectleave").modal('show');
}

function submitcomments() {
    var id = $('#modal-rejectleave #hidden-leave-userid').val();
    var approverempid = 0;
    var requesterempid = 0;
    var isapprove = 1;
    var reason = $('#modal-rejectleave #txt-leave-Comments').val();
    //console.log(id, reason);
    $.ajax({
        type: 'post',
        url: 'http://172.16.2.214/synergywebapi/api/leave/approveorrejectuserleave',
        data: {
            id: id,
            approverempid: approverempid,
            requesterempid: requesterempid,
            isapprove: isapprove,
            reason: reason
        },
        success: function (msg) {
            $('#approveswipe').html(msg);
        }
    });
}

function moredetails(userId) {
    $('#modal-EmpDetails #hidden-emp-userid').val(0);
    $("#modal-EmpDetails").modal('show');

}

function btnListingemp() {
    $("#modal-Listingemp").modal("show");
}