	$(document).ready(function () {
		// **** This section is hided temprory purpose > need to changed api ***/
	    // $.ajax({
	    //     type: "GET",
	    //     dataType: 'json',
	    //     url: 'http://172.16.2.214/SynergyWebAPI/api/swipe/GetUserSwipe',
	    //     success: function (data) {
	    //         //console.log(data.data);
	    //         var usedata = data.data;
	    //         $.each(usedata, function (key, item) {

	    //             $('#tblManual').append("<tr><td>" + item.userId + "</td>" + "<td>" + item.reportingTo + "</td>" + "<td>" + item.time + " </td>" + "<td>" + item.status + "</td>" + "<td><input type='button'  id=" + item.userId + " class='btn btn-info btn-xs ' onclick='manualmoredetails(" + item.userId + ")'value='More details' /></td><td><input type='button' id='" + item.userId + "' class='btn btn-xs btn-success'  onclick='approveswipe(" + item.userId + ")' value='Approve'/>&nbsp;<input type='button' class='btn btn-xs btn-danger' onclick='rejectswipe(" + item.userId + ")' value='Reject ' /></td></tr>");

	    //         })

	    //     }
	    // });
		// **** This section is hided temprory purpose > need to changed api ***/

	});

	function approveswipe(userId) {

	    var Id = userId;
	    var ApproverEmpId = 0;
	    var RequesterEMPID = 0;
	    var IsApprove = 1;
	    var Reason = "Approved";

	    $.ajax({
	        type: 'post',
	        url: 'http://172.16.2.214/SynergyWebAPI/api/swipe/SaveSwipeDetails',
	        data: {
	            Id: Id,
	            ApproverEmpId: ApproverEmpId,
	            RequesterEMPID: RequesterEMPID,
	            IsApprove: IsApprove,
	            Reason: Reason
	        },
	        success: function (msg) {
	            $('#approveswipe').html(msg);
	        }
	    });
	}

	function rejectswipe() {
	    $('#modal-rejectswipe #hidden-rrm-userid').val(0);
	    $("#modal-rejectswipe").modal('show');
	}


	function submitcomments() {
	    var Id = $('#modal-rejectswipe #hidden-swipe-userid').val();
	    var ApproverEmpId = 0;
	    var RequesterEMPID = 0;
	    var IsApprove = 0;
	    var Reason = $('#modal-rejectswipe #txt-swipe-Comments').val();
	    //console.log(Id,Reason);

	    $.ajax({
	        type: 'post',
	        url: 'http://172.16.2.214/SynergyWebAPI/api/swipe/SaveSwipeDetails',
	        data: {
	            Id: Id,
	            ApproverEmpId: ApproverEmpId,
	            RequesterEMPID: RequesterEMPID,
	            IsApprove: IsApprove,
	            Reason: Reason
	        },
	        success: function (msg) {
	            $('#approveswipe').html(msg);
	        }
	    });

	}


	function manualmoredetails(userId) {
	    $('#modal-ManualSwipeEmpDetails #hidden-emp-userid').val(0);
	    $("#modal-ManualSwipeEmpDetails").modal('show');

	}