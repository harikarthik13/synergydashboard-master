
function getInvestmentAccountsList() {
    var filter_val = JSON.stringify({
     
    });
    var result = callgetlist("GetInvestmentDetailsForAccount", filter_val);
    if(result != null)
    {
        incometax_getReportData(result);
    }    
    else{
        result = [];
        incometax_getReportData(result);
    }
  }

  function refreshInvestmentAccountsGrid(){
    var filter_val = JSON.stringify({
     
    });
    var result = callgetlist("GetInvestmentDetailsForAccount", filter_val);
    if(result != null)
    {
        $("#incometax_reportGrid").dxDataGrid({dataSource:result});
    }
  }

    function incometax_getReportData(data) {
        
    var attendee = $("#incometax_reportGrid").dxDataGrid({
            dataSource: data,
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
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
                            getInvestmentAccountsList();
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
            { caption: "Employee ID", dataField: "EmployeeId", visible:false },
            { caption: "Employee Number", dataField: "EmployeeNumber", visible:false  },
            { caption: "Financial Year", dataField: "FinancialYear"},
                { caption: "Employee Name", dataField: "DisplayName" },
                { caption: "Total Investments", dataField: "InvestedAmount" },
                {
                    dataField: "",
              caption: "Action",
              columnResizingMode: 'nextColumn',
              columnMinWidth: 50,
              columnAutoWidth: true,
              cellTemplate: function (container, options) {
                 
                    var EmployeeId=options.data.EmployeeId;
                    var name = options.data.DisplayName;
                    var financialYear = options.data.FinancialYear;
                    var EmployeeName = name;
                    var EmployeeNumber = options.data.EmployeeNumber;
                  var domActions = "";
                  domActions += "<button class='btn btn-xs btn-primary' title='Details' onclick=ShowDetails('" +
                  EmployeeId +"','"+EmployeeNumber+"','"+financialYear+"')><i class='glyphicon glyphicon-list'></i></button>  </button> ";
                                        $("<div class='text-center'>").append($(domActions)).appendTo(container);
                    }
                }
            ]
        }).dxDataGrid("instance");
    }

function ShowDetails(EmployeeId,EmployeeNumber,financialYear){
    $("#incometax_reportGrid .modal-title").text("Investment Details - " + EmployeeNumber);
    $('#AccountDetailsModal').appendTo("body").modal('show');
    
    var filter_val = JSON.stringify({
        EmployeeId : EmployeeId,
        FinYear:financialYear
    });
    var result = callgetlist("GetEmployeeInvestmentDetailsById", filter_val);
    if(result != null)
    {
        incomeTaxAccountPopup(result);
    }    
    else{
        result = [];
        incomeTaxAccountPopup(result);
    }

   
}

function incomeTaxAccountPopup(data){
    var accounts = $("#incometaxAccountsPopup_reportGrid").dxDataGrid({
            dataSource: data,
            repaintChangesOnly: true,
            highlightChanges: true,
            rowAlternationEnabled: true,
            filterRow: {
                visible: true,
                applyFilter: "auto"
            },
            export: {
                enabled: false,
                allowExportSelectedData: false
            },
            searchPanel: {
                visible: false
            },
            headerFilter: {
                visible: false
            },
            filterPanel: { visible: true },
            allowColumnReordering: false,
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
            sorting: {
                mode: "multiple"
            },
            columns: [
                { caption: "Id", dataField: "Id",visible:false },
                { caption: "FileName", dataField: "FileName",visible:false  },
                { caption: "FileType", dataField: "FileType",visible:false  },
                { caption: "Investment Name", dataField: "Name" },
                { caption: "Remarks", dataField: "Remarks" },
                { caption: "Amount", dataField: "InvestedAmount"  },
                {
                    dataField: "",
              caption: "Actions",
              columnResizingMode: 'nextColumn',
              columnMinWidth: 50,
              columnAutoWidth: true,
              cellTemplate: function (container, options) {
                  var Id = options.data.Id;
                  var fileName = options.data.FileName;
                  var fileType = options.data.FileType;
                  var domActions = "";
                  domActions += "<div class='col-md-12'>"
                  domActions += "<div class='row'>"
                  domActions += "<div class='col-md-1'> "

                if(fileName !=null && fileName != undefined){
                    domActions += "<button type='button' FileName='"+fileName+"'; class='btn btn-success btn-xs' EmployeeInvestmentId='"+Id+"'; onclick='downloadInvestmentAccountsDocument(this)'; multiple><i class='fas fa-download'></i></button>";
                  }
                  domActions += "</div>"

                  domActions += "<div class='col-md-1'>"
                  domActions += " &nbsp; <div data-id='"+Id+"' id='incometaxaccountsview_accepted_switch_"+Id+"'></div>"

                  domActions += "</div>"

                  domActions += "</div>"
                  domActions += "</div>"
                 
                  $("<div class='text-center'>").append($(domActions)).appendTo(container);
              }
            }
            ],
            onCellPrepared: function(e) {
                
                if (e.rowType == "data") {
                   
                    var id = e.row.data.Id;
                    var isApproved = e.row.data.IsApproved;
                    var financialYear = e.row.data.FinancialYear;
                    // var disabled = false;

                    // if(isApproved == true){
                    //     disabled = true;
                    // }
                    
                    investmentSwitchcolor(isApproved,id);

                    $('#incometaxaccountsview_accepted_switch_'+id+'').dxSwitch({
                        switchedOnText:"A",
                        switchedOffText:"U",
                        value:isApproved,
                        // disabled: disabled,
                        onValueChanged(e) {
                           
                           // debugger;
                           // var  investmentId = e.event.currentTarget.getAttribute("data-id");
                            var investmentId = id;
                            investmentSwitchcolor(e.value,id);
                            ApproveInvestmentDetails(investmentId,e.value,financialYear);
                           
                          }
                    });
                }
            }
        }).dxDataGrid("instance");
        
}

function investmentSwitchcolor(status,id){
    
    if (status == true) {
        $('head').append('<style> #incometaxaccountsview_accepted_switch_'+id+' .dx-switch-handle:before{background-color:#5cb85c !important;}</style>');

    } else {
        $('head').append('<style> #incometaxaccountsview_accepted_switch_'+id+' .dx-switch-handle:before{background-color:#dd2c36 !important;}</style>');
    }
}  

function ApproveInvestmentDetails(EmployeeInvestmentDetailsId,approved,financialYear){

    var token =  localStorage.getItem("securityToken");

    var ApproveInvestmentDetailsData = {
        Token:token,
        EmployeeInvestmentDetailsId: EmployeeInvestmentDetailsId,
        Approved : approved
      };

      PostData = {
        Method: "ApproveInvestmentDetails",
        Data: ApproveInvestmentDetailsData
      };

      var iteResult = PostDataCall(PostData);
      if (iteResult['IsSuccess'] == true) {
         
          var EmployeeID =  iteResult['Message']
          var filter_val = JSON.stringify({
            EmployeeId : EmployeeID,
            FinYear:financialYear
        });

        callGetListSync("GetEmployeeInvestmentDetailsById", filter_val, function (e) {
            $("#incometaxAccountsPopup_reportGrid").dxDataGrid({dataSource:e});
          });
      }
}

function downloadInvestmentAccountsDocument(data){
    var employeeInvestmentId = data.attributes["employeeinvestmentid"].value;
    var file = data.attributes["FileName"].value;
    var token =  localStorage.getItem("securityToken");
    if(file == "null" || file == null || file == "undefined" || file == ""){
        swal({
            title: "Info!",
            text: "Document doesnt exists for the particular investment account",
            icon: "info",
            buttons: true,
            dangerMode: true,
        })
    }
    else{
        window.open(SynergyAPIURL + "DownloadFile?query=GetDownloadInvestmentDocument&filters={'EmployeeInvestmentId':'" + employeeInvestmentId + "'}&Token=" + token, '_blank');
    }
}