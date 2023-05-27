$(document).ready(function () {
    GetEmailTemplates();
    getEmailTemplateType();
});
var emailTemplateUrl = SynergyAPIURL;
var emailTemplateSecurityToken = localStorage.getItem("securityToken");

var elements;
var templateTypeId;
var updateTemplateId;

function emailTemplate() {
    getEmailTemplateType();
    $("#emailTemplate_mailSubject").val("");
    $(".error_message").html("");
    $('#email_template_modal').appendTo('body').modal('show');
    $("#btn_emailTemplate_save").show();
    $("#btn_emailTemplate_update").hide();
    $("#select_emailTemplateType").show();
    $("#emailTemplate_showType").hide();
    $("#emailTemplate_mailTo").tagsinput('removeAll');
    $("#emailTemplate_mailCcTo").tagsinput('removeAll');
    $("#emailTemplate_mailBccTo").tagsinput('removeAll');

    
    $('#emailTemplate_mailTo').tagsinput({

    });

    $('#emailTemplate_mailCcTo').tagsinput({

    });
    $('#emailTemplate_mailBccTo').tagsinput({

    });

    $("input").on('beforeItemAdd', function(event) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
        if (regex.test(event.item)) {
            event.cancel = false;
        } else {
            event.cancel = true;
        }
    });

    try {
        CKEDITOR.instances['email_template_comments'].destroy();
    } catch (e) {
    }

    var email_template_comments = CKEDITOR.replace(
        "email_template_comments",
        {});
    email_template_comments.on("paste", function (evt) {
        if (evt.data.dataTransfer.getFilesCount() > 0) {
            var emailTemplateDescriptionFile = evt.data.dataTransfer.getFile(0);
            var emailTemplateDescriptionReader = new FileReader();
            emailTemplateDescriptionReader.onload = function (evt) {
                var emailTemplateDescriptionPictureElement = email_template_comments.document.createElement(
                    "img",
                    {
                        attributes: {
                            src: evt.target.result
                        }
                    }
                );

                setTimeout(function () {
                    email_template_comments.insertElement(
                        emailTemplateDescriptionPictureElement
                    );
                }, 0);
            };
            emailTemplateDescriptionReader.readAsDataURL(emailTemplateDescriptionFile);
        }
    });
    CKEDITOR.instances['email_template_comments'].on('change', function () {
        $("#email_template_commentsError").html("");
    });
    CKEDITOR.instances.email_template_comments.setData("");
    $(".text-tags div").remove();
    // $(".text-tags a.text-remove").trigger("click");
}

function email_template_helpModal() {
    $('#email_template_modal').modal('hide');
    $('#helpEmail_template_modal').appendTo('body').modal('show');
}

function GetEmailTemplates() {
    var filter_val = JSON.stringify({

    });

    var result = callgetlist('GetEmailTemplates', filter_val);
    renderEmailTemplareGrid(result);
}

function renderEmailTemplareGrid(data) {
    var renderEmailTemplareGrid = $("#sddgd-emailTemplateCard").dxDataGrid({
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
        groupPanel: {
            visible: true
        },
        sorting: {
            mode: "multiple"
        },
        paging: {
            pageSize: 10
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true,
        },
        summary: {
            totalItems: [
                {
                    column: "Id",
                    summaryType: "count",
                },
            ],
            groupItems: [
                {
                    column: "Id",
                    summaryType: "count",
                },
            ],
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
                        GetEmailTemplates();
                        dataGrid.refresh();
                    }
                }
            });
        },
        columns: [
            {
                caption: "Email Template Type",
                dataField: "TemplateType"
            },
            {
                caption: "Subject",
                dataField: "Subject"
            },
            {
                dataField: "",
                caption: "Action",
                width: 100,
                cellTemplate: function (container, options) {
                    var templateId = options.data.Id;
                    var domActions = "";
                    domActions += "<button class='btn btn-xs btn-primary' onclick=preview_emailTemplate('" + templateId + "')><i class='fas fa-eye'></i></button>";
                    domActions += "<button class='btn btn-xs btn-primary ' onclick=openEditEmailTemplateModal('" + templateId + "')><i class='fas fa-pencil-alt'></i></button>";
                    domActions += "<button class='btn btn-xs btn-danger' onclick=delete_emailTemplate('" + templateId + "')><i class='fas fa-trash-alt'></i></button>";
                    $("<div class='text-center'>").append($(domActions)).appendTo(container);
                },
            }
        ]
    }).dxDataGrid("instance");
}

function preview_emailTemplate(templateId) {
    $('#previewEmail_template_modal').appendTo('body').modal('show');
    var filter_val = JSON.stringify({
        IdOrType: templateId
    });
    var previewEmailTemplates = callgetlist("GetEmailTemplateById", filter_val);
    if (previewEmailTemplates != null) {
        $("#preview_templateType").html(previewEmailTemplates[0].TemplateType);
        $("#emailTemplate_preview_body").html(previewEmailTemplates[0].Template);
        var year = new Date().getFullYear();
        $("#email_template_year").html(year);
    }
}

function getEmailTemplateType() {
    var filter_val = JSON.stringify({

    });
    var result = callgetlist("GetEmailTemplatesTypes", filter_val);
    $('#select_emailTemplateType').html("<option value='0'>------Select Email Template Type------</option>");
    result.forEach(function (item) {
        $("#select_emailTemplateType").append($("<option></option>").attr("value", item.Id).text(item.TemplateType));
    });
}

$("#select_emailTemplateType").change(function (event) {
    templateTypeId = $("#select_emailTemplateType").val();
    var filter_val = JSON.stringify({
        Id: $("#select_emailTemplateType").val()
    });
    var result = callgetlist("GetEmailTemplatesTypeById", filter_val);
    elements = result[0].Attribute.split(",");
});

$('#email_template_comments').textcomplete([{
    match: /#(\w*)$/,
    search: function (term, callback) {
        callback($.map(elements, function (element) {
            return element.indexOf(term) === 0 ? element : null;
        }));
    },
    index: 1,
    replace: function (element) {
        return '#' + element + '# ';
    }
}]);

$("#btn_emailTemplate_save").on("click", function () {

    if ($("#select_emailTemplateType").val() == 0) {
        $("#select_emailTemplateTypeError").html("Please Select Email Template Type");
        $("#select_emailTemplateType").focus();
    }
    if ($("#emailTemplate_mailSubject").val() == "") {
        $("#emailTemplate_mailSubjectError").html("Please Enter the Mail Subject");
        $("#emailTemplate_mailSubject").focus();
    }
    if (CKEDITOR.instances.email_template_comments.getData() == "") {
        $("#email_template_commentsError").html("Please Enter the Email Template Format");
        $("#email_template_comments").focus();
    }

    if ($("#select_emailTemplateType").val() != "0" && $("#emailTemplate_mailSubject").val() != "" && CKEDITOR.instances.email_template_comments.getData() != "") {
        swal({
            title: "Are you sure?",
            text: "You want to Create Email Template",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willSaveEmailTemplate) => {
                if (willSaveEmailTemplate) {
                    SaveEmailTemplate()
                }
            });
    }
});



$("#select_emailTemplateType,#emailTemplate_mailSubject").change(function (event) {
    var id = event.currentTarget.id;
    $('#' + id + 'Error').empty();
});

function SaveEmailTemplate() {
    var to = null;
    var cc = null;
    var bcc = null;

    var tagsTo = $('#emailTemplate_mailTo').tagsinput('items');
    var tagsCc = $('#emailTemplate_mailCcTo').tagsinput('items');
    var tagsBcc = $('#emailTemplate_mailBccTo').tagsinput('items');

    to = tagsTo.toString();
    cc = tagsCc.toString();
    bcc = tagsBcc.toString();

    var saveEmailTemplate = {
        Id: null,
        TemplateTypeId: templateTypeId,
        Subject: $("#emailTemplate_mailSubject").val(),
        To: to,
        Cc: cc,
        Bcc: bcc,
        Template: CKEDITOR.instances.email_template_comments.getData(),
        IsActive: true
    };

    PostCreateOrUpdateEmail = {
        Method: "PostCreateOrUpdateEmail",
        Data: saveEmailTemplate
    };
    var PostCreateOrUpdateEmailResult = PostDataCall(PostCreateOrUpdateEmail);

    if (PostCreateOrUpdateEmailResult['IsSuccess'] == false) {
        var PostCreateOrUpdateEmailSwalError = {
            title: "Error",
            text: PostCreateOrUpdateEmailResult['Message'],
            icon: 'error'
        }
        EmailTemplateSwalMessage(PostCreateOrUpdateEmailSwalError);
    }
    else {
        swal({
            title: "Success",
            text: "Email Template Created Successfully !!!",
            icon: "success",
        });
        GetEmailTemplates();
        getEmailTemplateType();
        $("#emailTemplate_mailSubject").val("");
        CKEDITOR.instances.email_template_comments.setData("");
        $("#emailTemplate_mailTo").tagsinput('removeAll');
        $("#emailTemplate_mailCcTo").tagsinput('removeAll');
        $("#emailTemplate_mailBccTo").tagsinput('removeAll');
        $("#email_template_modal").trigger("click");
    }
}

function openEditEmailTemplateModal(templateId) {
    updateTemplateId = templateId;
    $('#email_template_modal').modal('show');
    $("#btn_emailTemplate_save").hide();
    $("#btn_emailTemplate_update").show();
    $(".error_message").html("");
    $("#select_emailTemplateType").hide();
    $("#emailTemplate_showType").show();
    $("#emailTemplate_mailTo").tagsinput('removeAll');
    $("#emailTemplate_mailCcTo").tagsinput('removeAll');
    $("#emailTemplate_mailBccTo").tagsinput('removeAll');
    var mailTo = [];
    var mailCc;
    var mailBcc;

    $("input").on('beforeItemAdd', function(event) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
        if (regex.test(event.item)) {
            event.cancel = false;
        } else {
            event.cancel = true;
        }
    });
    var filter_val = JSON.stringify({
        IdOrType: templateId
    });
    var getEmailTemplates = callgetlist("GetEmailTemplateById", filter_val);
    if (getEmailTemplates != null) {

        $('#emailTemplate_mailTo').tagsinput();
        mailTo = getEmailTemplates[0].To.split(',');
        for (i = 0; i < mailTo.length; i++) {
            $('#emailTemplate_mailTo').tagsinput('add', mailTo[i]);
        }

        $('#emailTemplate_mailCcTo').tagsinput();
        mailCc = getEmailTemplates[0].CC.split(',');
        for (i = 0; i < mailTo.length; i++) {
            $('#emailTemplate_mailCcTo').tagsinput('add', mailCc[i]);
        }

        $('#emailTemplate_mailBccTo').tagsinput();
        mailBcc = getEmailTemplates[0].BCC.split(',');
        for (i = 0; i < mailTo.length; i++) {
            $('#emailTemplate_mailBccTo').tagsinput('add', mailBcc[i]);
        }

        $("#emailTemplate_showType").html(getEmailTemplates[0].TemplateType);
        $("#emailTemplate_mailSubject").val(getEmailTemplates[0].Subject);
        //$("#email_template_comments").html(getEmailTemplates[0].Template);


        try {
            CKEDITOR.instances['email_template_comments'].destroy();
        } catch (e) {
        }

        var email_template_comments = CKEDITOR.replace(
            "email_template_comments",
            {});
        email_template_comments.on("paste", function (evt) {
            if (evt.data.dataTransfer.getFilesCount() > 0) {
                var emailTemplateDescriptionFile = evt.data.dataTransfer.getFile(0);
                var emailTemplateDescriptionReader = new FileReader();
                emailTemplateDescriptionReader.onload = function (evt) {
                    var emailTemplateDescriptionPictureElement = email_template_comments.document.createElement(
                        "img",
                        {
                            attributes: {
                                src: evt.target.result
                            }
                        }
                    );

                    setTimeout(function () {
                        email_template_comments.insertElement(
                            emailTemplateDescriptionPictureElement
                        );
                    }, 0);
                };
                emailTemplateDescriptionReader.readAsDataURL(emailTemplateDescriptionFile);
            }
        });
        CKEDITOR.instances.email_template_comments.setData(getEmailTemplates[0].Template);
        CKEDITOR.instances['email_template_comments'].on('change', function () {
            $("#email_template_commentsError").html("");
        });

    }
}

$("#btn_emailTemplate_update").on("click", function () {

    // if ($("#select_emailTemplateType").val() == 0) {
    //     $("#select_emailTemplateTypeError").html("Please Select Email Template Type");
    //     $("#select_emailTemplateType").focus();
    // }
    if ($("#emailTemplate_mailSubject").val() == "") {
        $("#emailTemplate_mailSubjectError").html("Please Enter the Mail Subject");
        $("#emailTemplate_mailSubject").focus();
    }
    if (CKEDITOR.instances.email_template_comments.getData() == "") {
        $("#email_template_commentsError").html("Please Enter the Email Template Format");
        $("#email_template_comments").focus();
    }

    if ($("#emailTemplate_mailSubject").val() != "" && CKEDITOR.instances.email_template_comments.getData() != "") {
        swal({
            title: "Are you sure?",
            text: "You want to Update Email Template",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willUpdateEmailTemplate) => {
                if (willUpdateEmailTemplate) {
                    UpdateEmailTemplate()
                }
            });
    }
});

function UpdateEmailTemplate() {
    var to = null;
    var cc = null;
    var bcc = null;

    var tagsTo = $('#emailTemplate_mailTo').tagsinput('items');
    var tagsCc = $('#emailTemplate_mailCcTo').tagsinput('items');
    var tagsBcc = $('#emailTemplate_mailBccTo').tagsinput('items');

    to = tagsTo.toString();
    cc = tagsCc.toString();
    bcc = tagsBcc.toString();

    var updateEmailTemplate = {
        Id: updateTemplateId,
        //TemplateTypeId: '6673FF63-C05F-4A0F-B7E0-4DE2D6057D75',
        Subject: $("#emailTemplate_mailSubject").val(),
        To: to,
        Cc: cc,
        Bcc: bcc,
        Template: CKEDITOR.instances.email_template_comments.getData(),
        IsActive: true
    };

    PostCreateOrUpdateEmails = {
        Method: "PostCreateOrUpdateEmail",
        Data: updateEmailTemplate
    };
    var PostUpdateEmailResult = PostDataCall(PostCreateOrUpdateEmails);
    if (PostUpdateEmailResult['IsSuccess'] == false) {
        var PostUpdateEmailSwalError = {
            title: "Error",
            text: Message['Message'],
            icon: 'error'
        }
        EmailTemplateSwalMessage(PostUpdateEmailSwalError);
    }
    else {
        swal({
            title: "Success",
            text: "Email Template Updated Successfully !!!",
            icon: "success",
        });
        GetEmailTemplates();
        getEmailTemplateType();
        $("#emailTemplate_mailSubject").val("");
        CKEDITOR.instances.email_template_comments.setData("");
        $("#emailTemplate_mailTo").tagsinput('removeAll');
        $("#emailTemplate_mailCcTo").tagsinput('removeAll');
        $("#emailTemplate_mailBccTo").tagsinput('removeAll');
        $("#email_template_modal").trigger("click");
    }
}

$("#btn_emailTemplate_close").on("click", function () {
    getEmailTemplateType();
    $("#emailTemplate_mailSubject").val("");
    CKEDITOR.instances.email_template_comments.setData("");
    $("#emailTemplate_mailTo").tagsinput('removeAll');
    $("#emailTemplate_mailCcTo").tagsinput('removeAll');
    $("#emailTemplate_mailBccTo").tagsinput('removeAll');
});


function delete_emailTemplate(templateId) {
    swal({
        title: "Are you sure?",
        text: "You want to Delete Email Template",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDeleteEmailTemplate) => {
            if (willDeleteEmailTemplate) {
                deleteTemplateById(templateId)
            }
        });
}
function deleteTemplateById(templateId) {
    var deleteEmailTemplate = {
        Id: templateId
    };

    PostDeleteEmails = {
        Method: "DeleteEmailTemplateById",
        Data: deleteEmailTemplate
    };
    var PostDeleteEmailResult = PostDataCall(PostDeleteEmails);

    if (PostDeleteEmailResult['IsSuccess'] == false) {
        var PostDeleteEmailSwalError = {
            title: "Error",
            text: Message['Message'],
            icon: 'error'
        }
        EmailTemplateSwalMessage(PostDeleteEmailSwalError);
    }
    else {
        swal({
            title: "Success",
            text: "Email Template Deleted Successfully !!!",
            icon: "success",
        });
        GetEmailTemplates();
    }
}

function EmailTemplateSwalMessage(data) {
    swal({
        title: data.title,
        text: data.text,
        icon: data.icon,
        button: "OK"
    });
}
