var dataResource = [];
var accountsId;

function getInvestmentsList() {
    data = [];
    var filter_val = JSON.stringify({
     
    });
    var result = callgetlist("GetEmployeeInvestmentDetails", filter_val);
    if(result != null)
    {
        incometaxEmployeeView_getReportData(result);
    }   
    else{
        result = [];
        incometaxEmployeeView_getReportData(result);
    } 
  }

function incometaxEmployeeView_getReportData(data) {
   
    var attendee = $("#incometaxEmployeeView_reportGrid").dxDataGrid({
                dataSource: data,
                repaintChangesOnly: true,
                highlightChanges: true,
                rowAlternationEnabled: true,
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
                    placeholder: "Search...",
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
                groupPanel: {
                    visible: true
                },
                editing: {
                    mode: "popup",
                    allowAdding: false,
                    allowUpdating: false,
                    useIcons: true,
                  },
                  onToolbarPreparing: function (e) {
                    var dataGrid = e.component;
                    e.toolbarOptions.items.unshift({
                        location: "after",
                        widget: "dxButton",
                        options: {
                            icon: "refresh",
                            onClick: function () {                            
                                getInvestmentsList();
                            }
                        }
                    });
                  },
                  columnChooser: {
                    enabled: true,
                  },
                sorting: {
                    mode: "multiple"
                },
                columns: [
                    { caption: "Id", dataField: "Id",visible:false },
                    { caption: "FileName", dataField: "FileName",visible:false  },
                    { caption: "FileType", dataField: "FileType",visible:false  },
                    { caption: "Financial Year", dataField: "FinancialYear" },
                    { caption: "Investment Name", dataField: "Name" },
                    { caption: "Remarks", dataField: "Remarks" },
                    { caption: "Amount", dataField: "Amount" },
                    {
                        dataField: "",
                  caption: "Actions",
                  columnResizingMode: 'nextColumn',
                  columnMinWidth: 50,
                  columnAutoWidth: true,
                  cellTemplate: function (container, options) {
                      var Id=options.data.Id;
                      var approved = options.data.IsApproved;

                      var fileName=options.data.FileName;
                      var domActions = "";
                      domActions += "<div class='col-md-12'>"
                      domActions += "<div class='row'>"
                      domActions += "<div class='col-md-1'> "
                      if(fileName !=null && fileName != undefined){
                        domActions += "<button type='button' FileName='"+fileName+"'; class='btn btn-success btn-xs' EmployeeInvestmentId='"+Id+"'; onclick='downloadIncomeTaxDocument(this)'; multiple><i class='fas fa-download'></i></button>";
                      }
                      domActions += "</div>"

                      if(approved == false){
                        domActions += "<div class='col-md-1'>"
                        domActions += " &nbsp;<button type='button'  class='btn btn-danger btn-xs' EmployeeInvestmentId='"+Id+"'; onclick='deleteIncomeTaxDetailsEmployee(this)';><i class='fas fa-trash-alt'></i></button>";
                        domActions += "</div>"
                     }
                    domActions += "</div>"
                    domActions += "</div>"

                      $("<div class='text-center'>").append($(domActions)).appendTo(container);
                  }
                    }
                ]
            }).dxDataGrid("instance");
    }

    function downloadIncomeTaxDocument(data){
        var employeeInvestmentId = data.attributes["employeeinvestmentid"].value;
        var file = data.attributes["FileName"].value;
        var token =  localStorage.getItem("securityToken");
        if(file == "null" || file == null || file == "undefined" || file == ""){
            swal({
                title: "Info!",
                text: "Document doesnt exists for the particular account",
                icon: "info",
                buttons: true,
                dangerMode: true,
            })
        }
        else{
            window.open(SynergyAPIURL + "DownloadFile?query=GetDownloadInvestmentDocument&filters={'EmployeeInvestmentId':'" + employeeInvestmentId + "'}&Token=" + token, '_blank');
        }
    }
 
function deleteIncomeTaxDetailsEmployee(data) {
    
    var employeeInvestmentId = data.attributes["employeeinvestmentid"].value;

    swal({
        title: "Delete",
        text: "Are you sure, Do you want to delete?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                
                var token =  localStorage.getItem("securityToken");

                var deleteInvestmentDetailsData = {
                    Token:token,
                    EmployeeInvestmentDetailsId: employeeInvestmentId
                  };

                PostData = {
                    Method: "DeleteInvestmentDetails",
                    Data: deleteInvestmentDetailsData
                  };
            
                var result = PostDataCall(PostData);

                if (result['IsSuccess'] == true) {
                    swal({
                        title: "Success!",
                        text: "Deleted Successfully!",
                        icon: "success",
                        button: "ok!",
                    })

                    getInvestmentsList();

                }
                else {
                    swal({
                        title: "Error!",
                        text: result["Message"],
                        icon: "danger",
                        button: "ok!",
                    })
                }
            }
        })
}

$(document).on('click','#iteSave',function(){
    
   var itePolicy= $('#itePolicy').dxSelectBox("instance").option("value");
   var iteYear= $('#iteYear').val();
   var amount = $("#iteAmount").dxTextBox("instance").option("value");

   if(iteYear == ""){
    $('#iteiteYearerror').addClass('input-error');
    $('#iteiteYearerror').html("Please Select Financial Year");
   }

   if(itePolicy == "" || itePolicy == null || itePolicy == undefined){
    $('#iteInvestmenterror').addClass('input-error');
    $('#iteInvestmenterror').html("Please Select Investments");
   }

   if(amount == null || amount == ""){
    $('#iteAmounterror').addClass('input-error');
    $('#iteAmounterror').html("Please Enter Amount");
   }else if(amount <= 0 || amount == 0){

    $('#iteAmounterror').addClass('input-error');
    $('#iteAmounterror').html("Enter Valid Amount");

   }
   else{
    $('#iteAmounterror').removeClass('input-error');
    $('#iteAmounterror').html("");
    saveAccountDetails();
   }
});

function saveAccountDetails(){
    
    var financialYear = $("#iteYear").val();
    var investments = $('#itePolicy').dxSelectBox("instance").option("value");
    var amount = $("#iteAmount").dxTextBox("instance").option("value");
    var remarks = $("#iteRemarks").val();

    var AccountDetailsData = {
        FinancialYear: financialYear,
        InvestmentId: investments,
        Amount: amount,
        Remarks: remarks
      };

      PostData = {
        Method: "PostEmployeeInvestmentDetails",
        Data: AccountDetailsData
      };

      var iteResult = PostDataCall(PostData);
      if (iteResult['IsSuccess'] == true) {
        //   debugger;
        accountsId = iteResult.Message;
        PostAccountsFiles(accountsId,iteResult.Message);
       
        $('#iteYear option:eq(2)').prop("selected",true);
        $("#itePolicy").dxSelectBox("instance").option("value","");
      }
}

function PostAccountsFiles(accountsId,result){
    var DocumentFiles = $("#file-uploader-accounts").dxFileUploader("instance").option('value');
        if (DocumentFiles.length > 0) {
            for (i = 0; i < DocumentFiles.length; i++) {
                var FileExtension = DocumentFiles[i].name.slice((Math.max(0, DocumentFiles[i].name.lastIndexOf(".")) || Infinity) + 1);
                var FileType = DocumentFiles[i].type;
                var FileName = DocumentFiles[i].name.substr(0, DocumentFiles[i].name.lastIndexOf("."));
                var DocumentsFormData = new FormData();
                var uploadfile = DocumentFiles[i];
                var FileSize = DocumentFiles[i].size / 1024 / 1024; // in MB
                // if (FileSize <= 5) {
                    DocumentsFormData.append('content', uploadfile);
                    var contentdetails =
                        [{
                            "DocumentTypeId": accountsId,
                            "DocumentType": 'IVD',
                            "DocumentName": FileName,
                            "Extension": FileExtension,
                            "ContentType": FileType
                        }]

                    DocumentsFormData.append('contentDetails', JSON.stringify(contentdetails));
                    var Result = postFileGeneric(DocumentsFormData);
               //}
            }
        }
        refreshFields();
        getInvestmentsList();
        if(result != null && result != undefined){
            swal({
                title: "Success",
                text: "Investment Details Saved successfully",
                icon: "success",
              })
        }
}


function checkAmount(e){
   if(e.value == null || e.value == ""){
    $('#iteAmounterror').addClass('input-error');
    $('#iteAmounterror').html("Enter Amount");

   }else if(e.value <= 0 || e.value == 0){

    $('#iteAmounterror').addClass('input-error');
    $('#iteAmounterror').html("Enter Valid Amount");

   }else{
    $('#iteAmounterror').removeClass('input-error');
    $('#iteAmounterror').html("");
   }
}

function refreshFields(){
    $("#iteYear").val('2022-2023');
    $("#itePolicy").val('0');
    $("#iteRemarks").val("");
    $("#iteAmount").dxTextBox("instance").option("value","");
    $("#file-uploader-accounts").dxFileUploader("instance").reset();
    $('#iteAmounterror').removeClass('input-error');
    $('#iteAmounterror').html("");
    accountsId = null;
}