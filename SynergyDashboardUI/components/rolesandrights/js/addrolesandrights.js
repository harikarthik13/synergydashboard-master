function open_rolesrights() {
    $('.rolepostSuccess').hide()
    $('.rolepostdanger').hide()
	$("#role_name_err").html('');
	$("#role_description_err").html('');
    $('#roleandrightsetmodel').appendTo("body").modal('show');
}

function open_group() {
    $('.grouppostSuccess').hide()
    $('.grouppostdanger').hide()
	$('#group_name').val('');
	$('#group_description').val('');
	$("#group_name_err").html('');
	$("#group_description_err").html('');
    $('#groupsetmodel').appendTo("body").modal('show');
}

function getRolesList(){
    var filter_val = {
        "IsActive": 1,
        "Status": true,
        "Message": ""
    }
    var result = callgetlist('GetDashBoardRoles', filter_val);
}

function SaveRolesandRights() {
	var role_name = $('#role_name').val(); 
	var role_description = $('#role_description').val(); 
	if (role_name == '') {
        $("#modal_role_name_err").html('Please Enter Role Name.');
        return false;
    } else {
        $("#modal_role_name_err").html('');
    }
	
	if (role_description == '') {
        $("#modal_role_description_err").html('Please Enter Description.');
        return false;
    } else {
        $("#modal_role_description_err").html('');
    }
	
    let rolesandrights = {
        "Name": role_name,
        "Description" : role_description,
        "IsActive": 1,
        "Status": true,
        "Message": ""
    };
    data = {
        "Method": "PostDashBoardRoles",
        "Data": rolesandrights,
    }
    var postCall = PostDataCall(data);
    /* //console.log('Here I have set ProjectId 1 as default for temprory solution.');*/
    //console.log('postCall',postCall)
    if (postCall['IsSuccess'] == true) {
        //console.log(postCall['Message']);
        //$('.rolepostSuccess').show()
        //$('.rolepostSuccess').html(postCall['Message'])
        var swalRolesSucc = {
            title : "Success",
            text : postCall['Message'],
            icon : 'success'                               
        }
        swalAlert(swalRolesSucc);
        $('#role_name').val("");
        $('#role_description').val("");

        refreshRoleSelect();
    } else {
        $('.rolepostdanger').show()
        $('.rolepostdanger').html(postCall['Message'])
        //console.log(postCall['Message']);
    }
}


function SaveGroup() {
    $("#group_name_err").html('');
    $("#group_description_err").html('');
	var group_name = $('#group_name').val(); 
	var group_description = $('#group_description').val(); 
	if (group_name == '') {
        $("#group_name_err").html('Please Enter Group Name.');
        return false;
    } else {
        $("#group_name_err").html('');
    }
	
	if (group_description == '') {
        $("#group_description_err").html('Please Enter Description.');
        return false;
    } else {
        $("#group_description_err").html('');
    }
	
    // var groupDetails = {
    //     "Name": group_name,
    //     "Description" : group_description
    // };
    // alert("Name:" + group_name +", Description:" +group_description);
    let groupData = {
        "Name": group_name,
        "Description" : group_description,
        "IsActive": 1,
        "Status": true,
        "Message": ""
    };
    data = {
        "Method": "PostDashBoardGroups",
        "Data": groupData,
    }
    var postCall = PostDataCall(data);
    //console.log('postCall',postCall)
    if (postCall['IsSuccess'] == true) {
        //console.log(postCall['Message']);
        $('.grouppostSuccess').show()
        $('.grouppostSuccess').html(postCall['Message'])
        $('#group_name').val("");
        $('#group_description').val("");
    } else {
        $('.grouppostdanger').show()
        $('.grouppostdanger').html(postCall['Message'])
        //console.log(postCall['Message']);
    }
}


var dispFileInput = document.getElementById("editMenuIconImg");    
var iconImg = document.getElementById("iconImg");
var iconEditBtn = document.getElementById("iconEditBtn");
var btnImage = document.getElementById("btnImage");

function menuRightsEdit(MenuId) {
    $('#menuEditModel').appendTo('body').modal('show')
    var filval = JSON.stringify({
        "Id": MenuId,
        "Status":"",
        "Message":""
    });
    menuResult = callgetlist('GetMenuDetailsById', filval);

    var getFileDirectoriesList = callgetDirectoryList();

    //show folder list 
    if (getFileDirectoriesList.length > 0) {
        $('#editMenuFolder').html('<option value="0">Select Folder</option>');
        getFileDirectoriesList.forEach(function (directoriesVal, i) {
            $('#editMenuFolder').append('<option value="' + directoriesVal +'">' + directoriesVal + '</option>');
        });
       
    } else {
        $('#editMenuFolder').append('<option value="0">No datas Found</option>');
    }
    //end

    $('#editMenuName').val(menuResult[0].Name);
    $('#editMenuFolder').val(menuResult[0].Folder);
    $('#editPriority').val(menuResult[0].PriorityType);
    $('#editAIKey').val(menuResult[0].AIKey);
    $('#editMenuId').val(menuResult[0].Id);
    $('#editMenuIconSrc').val(menuResult[0].Icon);

    // console.log("Get Result", menuResult);
   
    dispFileInput.style.display="none";
    iconImg.style.display="none";
    iconEditBtn.style.display="none";
    btnImage.classList.remove('fa-pencil-alt');
    btnImage.classList.remove('fa-times');
    btnImage.classList.add('fa-pencil-alt');

    var iconSrc  = document.getElementById("editMenuIconSrc").value;  

    if(iconSrc == "") {
        dispFileInput.style.display="block";
        iconImg.style.display="none";
        iconEditBtn.style.display="none";
    }else {
        iconImg.src = iconSrc;
        // iconImg.src = 'data:image/jpeg;base64,' + btoa(iconSrc);
        // console.log("icon",iconImg.src);
        dispFileInput.style.display="none";
        iconImg.style.display="block";
        iconEditBtn.style.display="block";
    }

    
}

function editIcon() {
        if(btnImage.classList.contains('fa-pencil-alt')) {
            dispFileInput.style.display="block";
            iconImg.style.display="none";
            btnImage.classList.remove('fa-pencil-alt');
            btnImage.classList.add('fa-times');
        } else {
            dispFileInput.style.display="none";
            iconImg.style.display="block";
            btnImage.classList.add('fa-pencil-alt');
            btnImage.classList.remove('fa-times');
            dispFileInput.value = dispFileInput.defaultValue;
        }
}

function fileDefault() {
    dispFileInput.value = dispFileInput.defaultValue;
    btnImage.classList.remove('fa-times');
    btnImage.classList.add('fa-pencil-alt');
}
