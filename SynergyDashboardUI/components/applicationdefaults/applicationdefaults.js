var isEdit = false;
var adId = '';
var isFileCleared = true;
var isTypeSelected = false;
var fileValue= ""; 
function openAddDefaults() {
    $('#open_add_defaults_model').appendTo('body').modal('show');
    $('.application_defaults_type').val('label');
    $('#application_defaults_label').prop('checked', true);
    $("#ad_text").show();
    isTypeSelected = true;
    $("#code").removeAttr("disabled");
    $('.application_defaults_type').removeAttr("disabled");
}

function getAdData() {
//   debugger
    Ad_response = callgetlist('GetApplicationDefaults');
    renderAdGrid(Ad_response);
  }
  
function renderAdGrid(data) {
var adCard = $("#ad_grid_list").dxDataGrid({
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
    onToolbarPreparing: function (e) {
        var dataGrid = e.component;
        e.toolbarOptions.items.unshift({
            location: "after",
            widget: "dxButton",
            options: {
                icon: "refresh",
                onClick: function () {                            
                    getAdData();
                }
            }
        });
      },
    grouping: {
        autoExpandAll: true,
    },
    paging: {
        pageSize: 10
    },  
    groupPanel: {
        visible: true
    },
    sorting: {
        mode: "multiple"
    },
    columns: [
        {
        caption:"CustomizationCode", 
        dataField:"CustomizationCode"
        },
        {
        caption:"Type",
        dataField:"Type"
        },
        {
        dataField: "",
        caption: "Action",
        width: 100,
        cellTemplate: function (container, options) {
            var id=options.data.Id;
            var domActions = "";
            domActions += "<button class='btn btn-xs btn-primary edit-btn' onclick=editApplicationsDefaults('"+id+"')><i class='fas fa-edit'></i></button>";
            domActions += "<button class='btn btn-xs btn-primary p-5 delete-btn' onclick=deleteApplicationsDefaults('"+id+"')><i class='fas fa-trash'></i></button>";
            $("<div class='text-center'>").append($(domActions)).appendTo(container);
        },
        }           
    ]
}).dxDataGrid("instance");
}
function editApplicationsDefaults(id) {
    // debugger
    $('#open_add_defaults_model').appendTo('body').modal('show');

    var data_json = JSON.stringify({
    "id": id
    });
    var ad_data = callgetlist("GetApplicationDefaultById", data_json);
    debugger
    console.log('idval',ad_data[0]);
    $("#code").val(ad_data[0].CustomizationCode);
    isEdit = true;
    adId = id;
    if(ad_data[0].Type === "F") {
        $('.edit_ad_file_wraper').show();
        isFileCleared = false;
        $('.application_defaults_type').val('file');        
        $("#ad_text").hide();
        $('#application_defaults_file').prop('checked', true);
        $(`.edit_ad_file`).attr('id', ad_data[0].Value);
        $('.edit_ad_file').html(`${ad_data[0].Value} <i class="fas fa-download"></i>`);
        fileValue = ad_data[0].Value;
        $("#code").attr("disabled", "disabled");
        $('.application_defaults_type').attr('disabled', "disabled");

        if(ad_data[0].Value == null)
        {
            clearUploadedFile();
        }
        else{           
            $("#ad_file").hide();
        }

        // $(`.edit_ad_file`).attr('download', `${ad_data[0].Value}`);
        // $('.edit_ad_file').html(`X${ad_data[0].Value}`);
    } else {
        $('.application_defaults_type').val('label');
        $("#ad_text").show();
        $("#ad_file").hide();
        $('#application_defaults_label').prop('checked', true);
        $("#ad_text_value").val(ad_data[0].Value);
        $("#code").attr("disabled", "disabled");
        $('.application_defaults_type').attr('disabled', "disabled");
        $('.edit_ad_file_wraper').hide();
    }
    // CKEDITOR.instances.ad_desc.setData(`<p>${ad_data[0].Description}</p>`);
    ad_desc.option("value",ad_data[0].Description);
//     CreatedBy: "5ED72D3F-3832-4CF0-8EBF-C6EAFFD58439"
// CreatedDate: "2021-05-26T22:47:37.667"
// CustomizationCode: "DVSdsfsdf"
// Description: "dsfsdfsdf\n"
// Id: "12E44923-401C-43AF-8F9C-9626EB81BEB9"
// IsActive: true
// ModifiedBy: null
// ModifiedDate: null
// Type: "F"
// Value: "DVSdsfsdf.jpg"
}
function deleteApplicationsDefaults(id) {
    swal({
        title: "Are you sure?",
        text: "You want to Delete Application Defaults",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDeleteApplicationDefaults) => {
            if (willDeleteApplicationDefaults) {
               var deleteDataParams = {
                    Method:"DeleteApplicationDefaultsById",
                    Data:{
                        Id: id
                    }
                }
                var PostDeleteApplicationDefaultsResult = PostDataCall(deleteDataParams);
                if (PostDeleteApplicationDefaultsResult['IsSuccess'] == false) {
                    swal({
                        title: "Error",
                        text:  Message['Message'],
                        icon: "error",
                    });
                }
                else {
                    swal({
                        title: "Success",
                        text: "Application Defaults Deleted Successfully !!!",
                        icon: "success",
                    });
                    getAdData();
                }
            }
        });
}
function ad_uploadFile() {
    
}
function postAdDefaults(isFileType,postData) {
 if(postData) {
     var formData = new FormData();
     if(isEdit === true) {
        formData.append('id',postData.id);
     }
     formData.append('customizationCode',postData.code);
     formData.append('description',postData.desc);
     formData.append('type',postData.type);
     if(isFileType === true) {
         if(isEdit === true) {
             if(isFileCleared === true) {
                 if(postData.file == undefined)
                 {
                    formData.append('value',fileValue);
                 }
                 else if(postData.file != undefined){
                    formData.append('file',postData.file);
                 }                
             }
             else{
                if(postData.file == undefined)
                {
                   formData.append('value',fileValue);
                }
                else if(postData.file != undefined){
                   formData.append('file',postData.file);
                } 
             }
         } else  {
            formData.append('file',postData.file);
         }
     } else {
        formData.append('value',postData.value);
     }
    var postAdDataResult = postCompanyCustamiziation(formData);
    if(postAdDataResult['IsSuccess'] == false) {
        swal({
            title: "Error",
            text:  Message['Message'],
            icon: "error",
        });
    }
    else {
        if(isEdit === true) {
            swal({
                title: "Success",
                text: "Defaults Updated Successfully !!!",
                icon: "success",
            });  
        } else {
            swal({
                title: "Success",
                text: "Defaults Added Successfully !!!",
                icon: "success",
            });
        }
        getAdData();
        resetAdDefaultsModel();
        $('#open_add_defaults_model').modal('hide');
    }
    console.log(postAdDataResult);
 }
}
function resetAdDefaultsModel() {
    // debugger
    $("#code").val('');
    $('.ad_code_error_msg').html('');
    // CKEDITOR.instances.ad_desc.setData("");
    ad_desc.option("value", null);
    $('.ad_desc_error_msg').html('');
    isTypeSelected = false;
    $('input[name="application_defaults_type"]').prop('checked', false);
    $('.ad_type_error_msg').html('');
    $("#ad_file_upload").val('');
    $("#ad_file_upload").dxFileUploader('instance').reset();
    $('.ad_value_error_msg').html('');
    $("#ad_text_value").val()
    $('.ad_text_value_error_msg').html('');
    $("#ad_text").hide();
    $("#ad_text_value").val('');
    $("#ad_file").hide();
    $('.edit_ad_file_wraper').hide();

}

function clearUploadedFile() {
    isFileCleared = true;
    $('.edit_ad_file_wraper').hide();
    $("#ad_file").show();
}

$(document).ready(function () {
    $("#ad_text").hide();
    $("#ad_file").hide();
    $('.edit_ad_file_wraper').hide();
    getAdData();
    $("#ad_file_upload").dxFileUploader({
        multiple: false,
        uploadMode: "useButtons",
        uploadUrl: "https://js.devexpress.com/Demos/NetCore/FileUploader/Upload",
        maxFileSize: 5000000,
        onValueChanged: function(e) {
            var files = e.value;
            if(files.length > 0) {
                $('.ad_value_error_msg').html('');
                $("#ad_file_upload").val(files[0]);
            } else {
                $('.ad_value_error_msg').html('Value File is Required');
                 $("#ad_file_upload").val('');
            }
        }
    });
    $('.application_defaults_type').click( function(res) {
        // debugger
        if($(this).attr('id') === 'application_defaults_file') {
            $('.application_defaults_type').val('file')
        } else {
            $('.application_defaults_type').val('label')
        }
        isTypeSelected = true;
        if(res.target.value === "label") {
            $("#ad_text").show();
            $("#ad_file").hide();
            $('.edit_ad_file_wraper').hide();
        } else if(res.target.value === "file") {
            $("#ad_text").hide();
            if(isFileCleared === true) {
                $("#ad_file").show();
                $('.edit_ad_file_wraper').hide();
            } else {
                $("#ad_file").hide();
                $('.edit_ad_file_wraper').show();
            }
        }
    })
    $('.ad_submit').click( res => {
        debugger
        if(isEdit === true) {
            isTypeSelected = true;
        }
        if($("#code").val() && ad_desc.option("value") && isTypeSelected === true) {
            if($(".application_defaults_type").val() === "label") {
                $('.ad_desc_error_msg').html('');
                $('.ad_code_error_msg').html('');
                if($("#ad_text_value").val()) {
                    $('.ad_text_value_error_msg').html('');
                  if(isEdit === true) {
                    let postData = {
                        id: adId,
                        code: $("#code").val(),
                        desc: (ad_desc.option("value")).replace(/<\/?[^>]+(>|$)/g, ""),
                        type: 'L',
                        value: $("#ad_text_value").val()
                    }
                    postAdDefaults(false,postData);
                  } else {
                    let postData = {
                        code: $("#code").val(),
                        desc: (ad_desc.option("value")).replace(/<\/?[^>]+(>|$)/g, ""),
                        type: 'L',
                        value: $("#ad_text_value").val()
                    }
                    postAdDefaults(false,postData);
                  }
                   
                } else {
                    $('.ad_text_value_error_msg').html('Value Text is Required');
                }
                $('.ad_value_error_msg').html('');
            }
            if($(".application_defaults_type").val() === "file") {
                if($("#ad_file_upload").val() || (isFileCleared === false && isEdit === true)) {
                    $('.ad_value_error_msg').html('');
                  
                    if(isEdit === true) {
                        if(isFileCleared === false) {
                            let postData = {
                                id: adId,
                                code: $("#code").val(),
                                desc: (ad_desc.option("value")).replace(/<\/?[^>]+(>|$)/g, ""),
                                type: 'F'
                            }
                            postAdDefaults(true,postData);
                        } else {
                            let postData = {
                                id: adId,
                                code: $("#code").val(),
                                desc: (ad_desc.option("value")).replace(/<\/?[^>]+(>|$)/g, ""),
                                type: 'F',
                                file: $("#ad_file_upload").val()
                            }
                            postAdDefaults(true,postData);
                        }
                    } else {
                        let postData = {
                            code: $("#code").val(),
                            desc: (ad_desc.option("value")).replace(/<\/?[^>]+(>|$)/g, ""),
                            type: 'F',
                            file: $("#ad_file_upload").val()
                        }
                        postAdDefaults(true,postData);
                    }
                } else {
                    $('.ad_value_error_msg').html('Value File is Required');
                }
                $('.ad_text_value_error_msg').html('');
            }
            $('.ad_type_error_msg').html('');
            
        } else {
            if($("#code").val()) {
                $('.ad_code_error_msg').html('');
            } else {
                $('.ad_code_error_msg').html('Code is Required');
            }
            if(ad_desc.option("value") != null && ad_desc.option("value") != '') {
                $('.ad_desc_error_msg').html('');
            } else {
                $('.ad_desc_error_msg').html('Description is Required');
            }
            if($(".application_defaults_type").val() && isTypeSelected === true) {
                $('.ad_type_error_msg').html('');
            } else {
                $('.ad_type_error_msg').html('Type is Required');
            }
        }
    })
   $('.edit_ad_file').click( function(res) {
       var download_file_name = $(this).attr('id');
        window.open(`${companyFilesPath}/${download_file_name}`, '_blank');
   })
   
})

