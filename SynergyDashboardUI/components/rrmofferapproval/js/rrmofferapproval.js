$(document).ready(function () {
    getOfferAprovalCandidates();
    getRRMList();
});
var offerIdForApproval  = ""
var candidateForApproval = ""
var rrmData = []
function getOfferAprovalCandidates(){
    var filterData = JSON.stringify({
        IsActive: true,
    });
    
    callGetListSync("GetOfferDispatchedCandidates", filterData, function (e) {
        bindOfferApprovedCandiadtesGrid(e)
    });   
}

function getRRMList(){
  rrmData = [];
  var rrmListfilterData = JSON.stringify({
      "IsActive": true
  });
  var rrmListList = callgetlist('GetRRM', rrmListfilterData);        
  if (rrmListList.length > 0) {
      rrmListList.forEach(function (i, index) {
          rrmData.push({
              'RRMId': i['RRMId'],
              'RRMName':i['RRMNo']+" - "+i['RequirementName']
          });
      });
  }
}

function bindOfferApprovedCandiadtesGrid(data){
    var offerApprovalGrid = $("#sdgd-rrmOfferApproval").dxDataGrid({
        dataSource:data,
        filterRow: {
          visible: true,
          applyFilter: "auto"
          },
          repaintChangesOnly: true,
          highlightChanges: true,
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
          allowColumnResizing:true,
          columnAutoWidth: true,
          grouping: {
              autoExpandAll: true,
          },
          pager: {
              showPageSizeSelector: true,
              allowedPageSizes: [5, 10, 20],
              showInfo: true
          },
          paging: {
              pageSize: 10
          },
          groupPanel: {
              visible: true,
              emptyPanelText: "Drag a column header here to group by that column"
          },
          sorting: {
              mode: "multiple"
          },
          selection: {
              mode: "multiple"
          },
          editing: {
              mode: "popup",
              allowAdding: false,
              allowUpdating: false,
              useIcons: true
          },
          columnChooser: {
              enabled: true,
              mode:"select"
          },
          summary: {
              totalItems: [{
                  column: "RRMNo",
                  summaryType: "count"
              }
              // ...
              ],
              groupItems: [{
                  column: "RRMNo",
                  summaryType: "count"
              }]
          },
          rowAlternationEnabled: true,
          columnChooser: {
              enabled: true,
              mode:"select"
          },
        onExporting: function (e) {
          var workbook = new ExcelJS.Workbook();
          var worksheet = workbook.addWorksheet("RRM Offer Approval");
    
          DevExpress.excelExporter
            .exportDataGrid({
              component: e.component,
              worksheet: worksheet,
              autoFilterEnabled: true,
              customizeCell: function (options) {
                var gridCell = options.gridCell;
                var excelCell = options.excelCell;
                if(!gridCell) {
                    return;
                }
                if (gridCell.rowType === "header") {
                    excelCell.font = { color: { argb: 'FFFFFF' } };
                    excelCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "757171" }, bgColor: { argb: "757171" } };
                    excelCell.alignment = { horizontal: 'left' };
                }
                if(gridCell.rowType === "data") {
                    if(gridCell.column.dataField === "IsConsultant") {
                        excelCell.font = { color: { argb: 'FFFFFF' } };
                        var dataVal = gridCell.data.IsConsultant;
                        if(dataVal === true){
                            excelCell.value = "Consultant"
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "337AB7" } };
                        }
                        if(dataVal === false){
                            excelCell.value = "Full Time"
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "5CB85C" } };
                        }
                    }
                    if(gridCell.column.dataField === "IsApprovedByHead") {

                     // if(gridCell.column.dataField === "IsOfferAccepted") {
                        excelCell.font = { color: { argb: 'FFFFFF' } };
                        var dataVal = gridCell.data.IsApprovedByHead;
                        if(dataVal === 0){
                            excelCell.value = "Yet to accept"
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "F0AD4E" } };
                        }
                        if(dataVal === 1){
                            excelCell.value = "Rejected"
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "D9534F" } };
                        }
                        if(dataVal === 2){
                            excelCell.value = "Accepted"
                            excelCell.fill = { type: 'pattern', pattern:'solid', fgColor: { argb: "5CB85C" } };
                        } 
                    }

                   
                }
              },
            })
            .then(function(dataGridRange) {
              setBorders( worksheet, dataGridRange);
              return Promise.resolve();
            }).then(function () {
              workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(
                  new Blob([buffer], { type: "application/octet-stream" }),
                  "RRMOfferApproval.xlsx"
                );
              });
            });
          e.cancel = true;
        },
        onToolbarPreparing: function (e) {
          var dataGrid = e.component;
          e.toolbarOptions.items.unshift({
            location: "after",
            widget: "dxButton",
            options: {
              icon: "refresh",
              onClick: function () {
                getOfferAprovalCandidates();
                dataGrid.refresh();
              },
            },
          });
        },
        columns: [
          {
            dataField: "Sno",
            caption: "#",
            alignment:"left",
            width:70
          },
          {
            dataField: "Id",
            caption: "Offer Id",
            visible: false
          },
          {
              dataField: "CandidateName",
              caption: "Candidate Name"
          },
          {
              dataField: "RRMNo",
              caption: "RRM No",
              cellTemplate: function (container, options) {  
                var domActions = "";
                domActions += "<a style='cursor:pointer' class='rrmdetailOfferApproval' data-rrmid =" + options.data.RRMId + ">"+options.data.RRMNo+"</a>";
                $("<div class='text-left'>").append($(domActions)).appendTo(container);
              }
          },
          {
              dataField: "RequirementName",
              caption: "Requirement Name",
              cellTemplate: function (container, options) {  
                var domActions = "";
                domActions += "<a style='cursor:pointer' class='rrmdetailOfferApproval' data-rrmid =" + options.data.RRMId + ">"+options.data.RRMNo+"</a>";
                $("<div class='text-left'>").append($(domActions)).appendTo(container);
              }
          }, 
          {
            dataField: "OfferedDate",
            caption: "Offered Date",
            allowFiltering: true,
            dataType :"date",
            format : "dd-MMM-yyyy"
        },      
          {
              dataField: "ExpectedJoiningDate",
              caption: "Expected Joining Date",
              allowFiltering: true,
              dataType :"date",
              format : "dd-MMM-yyyy"
          },
          {
            dataField: "IsConsultant",
            caption: "Full Time/Consultant",
            falseText: "No",
            trueText: "Yes",
            cellTemplate: function(container, options) {
              var fieldData = options.data.IsConsultant;
              if (fieldData == true) {
                  var html = "<label class='label label-primary m-l-sm'>Consultant</label>";
              }
              else if(fieldData == false) {
                  var html = "<label class='label label-success m-l-sm'>Full Time</label>";
              }
              $(html).appendTo(container);
            }
          },
          {
               dataField: "IsApprovedByHead",
             // dataField: "IsOfferAccepted",
              
              caption: "Approval Status",
              alignment:"left",
              cellTemplate: function (container, options) {
                  var fieldData = options.data.IsApprovedByHead;
                  if (fieldData == 0) {
                      var html = "<label class='label label-warning m-l-sm'>Yet to accept</label>";
                  }
                  else if(fieldData == 1) {
                      var html = "<label class='label label-danger m-l-sm'>Rejected</label>";
                  }
                  else if(fieldData == 2){
                      var html = "<label class='label label-success m-l-sm'>Accepted</label>";
                  }
                  $(html).appendTo(container);
              }, fixedPosition: "right"

          },
          {
            dataField: "Id",
            caption: "Action",
            allowGrouping: false,
            width:80,
            allowCollapsing: false,
            allReordering:false,
            allowFiltering: false,
            fixedPosition: "right", allowExporting: false,
            cellTemplate: function (container, options) {
                var fieldData = options.data.Id; 
                var candiateId = options.data.CandidateId;
                var rrmId = options.data.RRMId; 
                var candidateName = options.data.CandidateName;
                if(options.data.IsApprovedByHead == 0){
                  var  html = "<button class='btn btn-xs btn-primary edit-btn' onclick=editOfferApproval('"+fieldData+"','"+candiateId+"','"+rrmId+"')><i title='Edit Offer' class='fas fa-edit'></i></button>";
                 } 
                 else{
                  var  html = "<button class='btn btn-xs btn-primary edit-btn' onclick=viewOfferApproval('"+fieldData+"','"+candiateId+"','"+rrmId+"')><i title='View Offer' class='fas fa-eye'></i></button>";
                       html += "<button class='btn btn-xs btn-primary edit-btn' onclick=deleteOfferApproval('"+fieldData+"')><i title='Delete Offer' class='fas fa-trash'></i></button>";
                 } 
                             
                  html += "<button class='btn btn-xs btn-primary edit-btn rrmApproval-candidate-tracker' data-rrmId = '"+rrmId+"' data-candidateId = '"+candiateId+"' data-candidateName = '"+candidateName+"'><i title='Summary' class='fa fa-list'></i></button >";
                 
                 $(html).appendTo(container);       
            }, fixedPosition: "right", allowExporting:false
          }
        ]
      }).dxDataGrid("instance");
}

function initializeDevExtremeControlsForOfferApproval(){    
    $("#sdtxt-CurrentForOfferApproval").dxNumberBox({
        placeholder: "Current",
        readOnly:false,
        min:1,
        value:1
    });
    $("#sddb-OfferDateOfferApproval").dxDateBox({
      type: "date",
      displayFormat:"dd MMM yyyy",
      //value: new Date(),
      acceptCustomValue: false,
      readOnly:true
  
  }).dxDateBox("instance");

  //   $("#sdtxt-ApproximateCTCForOfferApproval").dxNumberBox({
  //     placeholder: "Expected",
  //     readOnly:false,
  //     min:1,
  //     value:1
  // });
    $("#sddb-ExpectedJoiningDateOfferApproval").dxDateBox({
        type: "date",
        displayFormat:"dd MMM yyyy",
        //value: new Date(),
        acceptCustomValue: false,
        readOnly:false
    
    }).dxDateBox("instance");

    $("#sdchk-IsConsultantOfferApproval").dxSwitch({
     //value: false,
     //value : $("#sdchk-IsConsultantOfferApproval").dxSwitch("instance").option("value"),
      switchedOnText:"Yes",
      switchedOffText:"No",
      readOnly:false,
      onValueChanged(data) {        
          ConsultantfunctionforOfferApproval (data.value);    
     
        // else
        // {
        //   $("#sdr-ConsultantType").dxRadioGroup("instance").option("visible",false);
        //  $("#ConsultantHoursdiv").hide();
        //  $("#ssdr-ConsultantHours").dxNumberBox("instance").option("visible",false);
       
        // }
      },
    }).dxSwitch("instance");

   function ConsultantfunctionforOfferApproval(dataValue)
   {
    if(dataValue == true) {
      $("#sdr-ConsultantType").dxRadioGroup("instance").option("visible",true);
      $("#ConsultantHoursdiv").show();
      $("#sdr-ConsultantHours").dxNumberBox("instance").option("visible",true);
      $(".ExpectedCTCdiv").hide();
      $("#sdtxt-ExpectedCTCForOfferApproval").dxNumberBox("instance").option("visible",false);    
    }
    else 
    {
      $("#sdr-ConsultantType").dxRadioGroup("instance").option("visible",false);
     $("#ConsultantHoursdiv").hide();
     $("#sdr-ConsultantHours").dxNumberBox("instance").option("visible",false);
     $(".ExpectedCTCdiv").show();
     $("#sdtxt-ExpectedCTCForOfferApproval").dxNumberBox("instance").option("visible",true);   
    
    }
   }
    var IsConsultantValue = $("#sdchk-IsConsultantOfferApproval").dxSwitch("instance").option("value");
  
    $("#sdtxt-ExpectedCTCForOfferApproval").dxNumberBox({
        placeholder: "Expected",
        readOnly:false,
        min:1,
        value:1,
        visible : IsConsultantValue == false ? true : false , 
    });

    const ConsultantType = [
      { id: true, text: 'FullTime Consultant' },
      { id: false, text: 'PartTime Consultant' }
    ];
  
      if(IsConsultantValue == false)
      {
        $("#ConsultantHoursdiv").hide();
        $(".ExpectedCTCdiv").show();
      }
      else
      {
        $("#ConsultantHoursdiv").show();
        $(".ExpectedCTCdiv").hide();
      }
  
      $("#sdr-ConsultantType").dxRadioGroup({
        items: ConsultantType,
        layout: 'horizontal',   
        visible: IsConsultantValue == false ? false : true ,    
        valueExpr: 'id',
        displayExpr: 'text', 
     }).dxRadioGroup('instance');
  
     $("#sdr-ConsultantHours").dxNumberBox({
      placeholder: "Hours",
      readOnly:false,
       min:1,
       value:'Hours',
       visible:IsConsultantValue == false ? false : true,
      }).dxNumberBox('instance');




    $("#sdtxt-NotesOfferApproval").dxHtmlEditor({
        height: 300,
        toolbar: {
            items: [
                "undo", "redo", "separator",
                {
                    formatName: "size",
                    formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"] },
                {
                    formatName: "font",
                    formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
                },
                "separator", "bold", "italic", "strike", "underline", "separator",
                "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
                "orderedList", "bulletList", "separator",
                {
                    formatName: "header",
                    formatValues: [false, 1, 2, 3, 4, 5]
                }, "separator",
                "color", "background", "separator",
                "link", "image", "separator",
                "clear", "codeBlock", "blockquote",
                {
                  widget: "dxButton",
                  options: {
                      elementAttr: {
                        id: "sdbtn_offerNotesSave",
                        class: "btn btn-success btn-xs"
                      },
                      stylingMode: "contained",
                      text: "Save Notes",
                      type: "success",
                      onClick: function() {
                        saveOfferApprovalNotes()
                      }
                  }
              }
            ]
        },
        mediaResizing: {
            enabled: true
        },
        value:"",
        mentions: [
        {
            dataSource: rrmData,
            searchExpr: "RRMName",
            displayExpr: "RRMName",
            valueExpr: "RRMId",
            marker:"#"
        }],
        readOnly:false
    });
    $("#sdtxt-OfferDetailsOfferApproval").dxHtmlEditor({
      height: 400,
      toolbar: {
          items: [
              "undo", "redo", "separator",
              {
                  formatName: "size",
                  formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"] },
              {
                  formatName: "font",
                  formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
              },
              "separator", "bold", "italic", "strike", "underline", "separator",
              "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
              "orderedList", "bulletList", "separator",
              {
                  formatName: "header",
                  formatValues: [false, 1, 2, 3, 4, 5]
              }, "separator",
              "color", "background", "separator",
              "link", "image", "separator",
              "clear", "codeBlock", "blockquote"
          ]
      },
      mediaResizing: {
          enabled: true
      },
      value:"",
      readOnly:false
  });

  var listWidget = $("#sdlist-DefaultOfferDetails").dxList({
    dataSource: tasks,
    showSelectionControls: true,
    selectionMode: "all",
    height: 400,
  }); 
  //HR NOTES
  $("#sdtxt-OfferApprovalHrNotes").dxHtmlEditor({
    height: 300,
    toolbar: {
        items: [
            "undo", "redo", "separator",
            {
                formatName: "size",
                formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"] },
            {
                formatName: "font",
                formatValues: ["Arial", "Courier New", "Georgia", "Impact", "Lucida Console", "Tahoma", "Times New Roman", "Verdana"]
            },
            "separator", "bold", "italic", "strike", "underline", "separator",
            "alignLeft", "alignCenter", "alignRight", "alignJustify", "separator",
            "orderedList", "bulletList", "separator",
            {
                formatName: "header",
                formatValues: [false, 1, 2, 3, 4, 5]
            }, "separator",
            "color", "background", "separator",
            "link", "image", "separator",
            "clear", "codeBlock", "blockquote"
        ]
    },
    mediaResizing: {
        enabled: true
    },
    value:"",
    readOnly:true
});
}

function editOfferApproval(id,candidateId,rrmId){
  $('#RRMOfferApprovalModal').appendTo("body").modal("show");
  initializeDevExtremeControlsForOfferApproval();
  $("#rrm_OfferApprovalTab").click();
  $("#btnUpdateOfferApproval").show();
  getRRMDetailsForOfferApproval(rrmId);
  var filterData = JSON.stringify({
    OfferId:id,
    IsActive: true
  });
  var encryptedColumns = JSON.stringify(["CurrentCTC", "ApproximateCTC", "Notes", "ExpectedCTC"])

  //initializeDevExtremeControlsForOfferApproval();
  callGetDecryptedListSync("GetOfferDispatchedCandidatesById", filterData,encryptedColumns, function (e) {
    var data = e[0];
    try{
      $("#sdd-CandidateForOfferApproval").dxDropDownBox("dispose")
    }
    catch(e){
      
    }
    $("#sdd-CandidateForOfferApproval").dxTextBox({
      readOnly:true,
      value:data.RRMNo+"--->"+data.CandidateName
    })
    // if(data.IsConsultant == true){
    //  // $("#sdtxt-ApproximateCTCForOfferApproval").dxNumberBox("instance").option("value",data.ApproximateHourlyPay);
    //   $("#sdtxt-ExpectedCTCForOfferApproval").dxNumberBox("instance").option("value",data.ExpectedHourlyPay);
    // }
    if(data.IsConsultant == false){
    //  $("#sdtxt-ApproximateCTCForOfferApproval").dxNumberBox("instance").option("value",data.ApproximateCTC);
      $("#sdtxt-ExpectedCTCForOfferApproval").dxNumberBox("instance").option("value",data.ExpectedCTC);
    }
    $("#sdtxt-OfferApprovalHrNotes").dxHtmlEditor("instance").option("value",data.Notes);
    
    $("#sdtxt-CurrentForOfferApproval").dxNumberBox("instance").option("value",data.CurrentCTC);
    $("#sddb-OfferDateOfferApproval").dxDateBox("instance").option("value",data.OfferedDate);
    $("#sddb-ExpectedJoiningDateOfferApproval").dxDateBox("instance").option("value",data.ExpectedJoiningDate);
    $("#sdchk-IsConsultantOfferApproval").dxSwitch("instance").option("value",data.IsConsultant);
    $("#sdr-ConsultantHours").dxNumberBox("instance").option("value",data.ConsultantHours);
    $("#sdr-ConsultantType").dxRadioGroup("instance").option("value",data.IsFullTimeConsultant);

    if(data.IsApprovedByHead == 0){
      $("#OfferApprovalStatus").html("<button type='button' class='btn btn-success btn-sm' onclick='offerApproveAlert()'>Accept</button>&nbsp;<button type = 'button' class='btn btn-danger btn-sm' onclick='offerRejectAlert()'>Reject</button>")
    }
    if(data.IsApprovedByHead == 2){
      $("#OfferApprovalStatus").html("<div class='alert alert-success' role='alert'><b>Accepted</b></div>")
    }
    if(data.IsApprovedByHead == 1){
      $("#OfferApprovalStatus").html("<div class='alert alert-danger' role='alert'><b>Rejected</b></div>")
    }


    offerIdForApproval = data.Id
    candidateForApproval = data.CandidateName
    getOfferNotesHistory();
  });  
  var filterData2 = JSON.stringify({
    "CandidateId":candidateId,
    "IsActive": true
  }); 
  callGetListSync("GetInterviewHistoryDetails", filterData2, function (data) {
    mapOfferApprovalPreviousInterviews(data)
  }); 
}

function rrmOfferApprovalSwal(data){
  swal({
    title: data.title,
    text: data.text,
    icon: data.icon,
    button:"OK"
  });   
}

function offerApproveAlert(){
    var ExpectedCTC = $("#sdtxt-ExpectedCTCForOfferApproval").dxNumberBox("instance").option("value");
    var candidateName = candidateForApproval
    swal({
        title: "Are you sure?",
        text: "You are accepting the offer for "+candidateName+"  with "+ExpectedCTC+". Once accepted it cannot be edited. Please confirm",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willAssign) => {
        if (willAssign) {
            approveOrRejectOffer(2)
        }
    });
}

function offerRejectAlert(){
  var candidateName = candidateForApproval
    swal({
        title: "Are you sure?",
        text: "You are rejecting the offer for "+candidateName+". Once rejected it cannot be edited. Please confirm",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willAssign) => {
      if (willAssign) {
        approveOrRejectOffer(1)
    }
    });
}

function approveOrRejectOffer(status){
  var ExpectedCTC = $("#sdtxt-ExpectedCTCForOfferApproval").dxNumberBox("instance").option("value");
 // var approximateCTC = $("#sdtxt-ApproximateCTCForOfferApproval").dxNumberBox("instance").option("value");
  var currentCTC = $("#sdtxt-CurrentForOfferApproval").dxNumberBox("instance").option("value");
  var expectedJoiningDate = $("#sddb-ExpectedJoiningDateOfferApproval").dxDateBox("instance").option("value");
  var offeredDate = $("#sddb-OfferDateOfferApproval").dxDateBox("instance").option("value");
  
  var isConsultant = $("#sdchk-IsConsultantOfferApproval").dxSwitch("instance").option("value");
  
  var IsFullTimeConsultant = $("#sdr-ConsultantType").dxRadioGroup("instance").option("value");

  if(IsFullTimeConsultant == true)
  {
    IsFullTimeConsultant = true
  }
  else
  {
    IsFullTimeConsultant = false;
  }

  var ConsultantHours = $("#sdr-ConsultantHours").dxNumberBox("instance").option("value");
  // if(ExpectedCTC == null || ExpectedCTC == undefined || ExpectedCTC == ""){
  //   if(ExpectedCTC == null || ExpectedCTC == undefined || ExpectedCTC == ""){
  //     $("#err-ExpectedCTCOfferApproval").html("Please enter Expected")
  //   }
  // }
  // else{
    $("#err-CandidateOfferApproval").html("") 
    $("#err-ExpectedCTCOfferApproval").html("")
    var RRMOfferApprovalSaveData = {
      Id:offerIdForApproval,
      RRMId:null,
      CandidateId:null,
      InterviewScheduleId:null,
      // ApproximateCTC: approximateCTC,
      // CurrentCTC: currentCTC,
      // ExpectedCTC: ExpectedCTC,
      ExpectedJoiningDate: expectedJoiningDate,
      IsOfferApproved: status,
      IsConsultant : isConsultant,
      IsFullTimeConsultant : IsFullTimeConsultant,
      ConsultantHours: ConsultantHours,
      IsActive:1,
    };
    
    var RRMOfferApprovalSavePostCallData = {
        Method: "PostCandidateOfferApproval",
        Data: RRMOfferApprovalSaveData,
        EncryptData:{
          CurrentCTC: currentCTC,
          ApproximateCTC: 0,
          ExpectedCTC: ExpectedCTC,
        }
    };
    
    var RRMOfferApprovalPostResult = PostDataCall(RRMOfferApprovalSavePostCallData);
    if(RRMOfferApprovalPostResult["IsSuccess"] != true){
      var RRMOfferApprovalPostSwal = {
        title: "OOPS",
        text: RRMOfferApprovalPostResult['Message'],
        icon: 'error'
      }
    }
      
    if(RRMOfferApprovalPostResult["IsSuccess"] == true){
      var RRMOfferApprovalPostSwal = {
        title: "Success",
        text: RRMOfferApprovalPostResult['Message'],
        icon: 'success'
      }      
    }
    rrmOfferApprovalSwal(RRMOfferApprovalPostSwal);
    $('#RRMOfferApprovalModal').modal("hide");
    getOfferAprovalCandidates();
    resetOfferApproval()
  //}
}

function updateOfferApproval(){
  var ExpectedCTC =  $("#sdtxt-ExpectedCTCForOfferApproval").dxNumberBox("instance").option("value") == null ? 0 : $("#sdtxt-ExpectedCTCForOfferApproval").dxNumberBox("instance").option("value");
  //var approximateCTC = $("#sdtxt-ApproximateCTCForOfferApproval").dxNumberBox("instance").option("value");
  var currentCTC = $("#sdtxt-CurrentForOfferApproval").dxNumberBox("instance").option("value") == null ? 0 : $("#sdtxt-CurrentForOfferApproval").dxNumberBox("instance").option("value");
  var expectedJoiningDate = $("#sddb-ExpectedJoiningDateOfferApproval").dxDateBox("instance").option("value");
  var isConsultant = $("#sdchk-IsConsultantOfferApproval").dxSwitch("instance").option("value");
  var IsFullTimeConsultant = $("#sdr-ConsultantType").dxRadioGroup("instance").option("value");
  
  if(IsFullTimeConsultant == true)
  {
    IsFullTimeConsultant = true
  }
  else
  {
    IsFullTimeConsultant = false;
  }

  var ConsultantHours = $("#sdr-ConsultantHours").dxNumberBox("instance").option("value");

  // if(ExpectedCTC == null || ExpectedCTC == undefined || ExpectedCTC == ""){
  //   if(ExpectedCTC == null || ExpectedCTC == undefined || ExpectedCTC == ""){
  //     $("#err-ExpectedCTCOfferApproval").html("Please enter Expected")
  //   }
  // }
  // else{
    $("#err-CandidateOfferApproval").html("") 
    $("#err-ExpectedCTCOfferApproval").html("")
    var RRMOfferApprovalSaveData = {
      Id:offerIdForApproval,
      RRMId:null,
      CandidateId:null,
      InterviewScheduleId:null,
      // ApproximateCTC: approximateCTC,
      // CurrentCTC: currentCTC,
      // ExpectedCTC: ExpectedCTC,
      ExpectedJoiningDate: expectedJoiningDate,
      IsOfferApproved: 0,
      IsConsultant : isConsultant,
      IsFullTimeConsultant : IsFullTimeConsultant,
      ConsultantHours: ConsultantHours,
      IsActive:1
    };

    
    var RRMOfferApprovalSavePostCallData = {
        Method: "PostCandidateOfferApproval",
        Data: RRMOfferApprovalSaveData,
        EncryptData:{
          CurrentCTC: currentCTC,
          ApproximateCTC: 0,
          ExpectedCTC: ExpectedCTC,
        }
    };
    
    var RRMOfferApprovalPostResult = PostDataCall(RRMOfferApprovalSavePostCallData);
    if(RRMOfferApprovalPostResult["IsSuccess"] != true){
      var RRMOfferApprovalPostSwal = {
        title: "OOPS",
        text: RRMOfferApprovalPostResult['Message'],
        icon: 'error'
      }
    }
      
    if(RRMOfferApprovalPostResult["IsSuccess"] == true){
      var RRMOfferApprovalPostSwal = {
        title: "Success",
        text: RRMOfferApprovalPostResult['Message'],
        icon: 'success'
      }      
    }
    rrmOfferApprovalSwal(RRMOfferApprovalPostSwal);
    $('#RRMOfferApprovalModal').modal("hide");
    getOfferAprovalCandidates();
    resetOfferApproval()
 // }
}

function resetOfferApproval(){
  $("#offerId").html("");
  offerIdForApproval = null
  candidateForApproval = ""
}

function viewOfferApproval(id,candidateId,RRMId){
  editOfferApproval(id,candidateId,RRMId);
  $("#btnUpdateOfferApproval").hide();
  $("#sdtxt-CurrentForOfferApproval").dxNumberBox("instance").option("readOnly",true);
 // $("#sdtxt-ApproximateCTCForOfferApproval").dxNumberBox("instance").option("readOnly",true);
  $("#sdtxt-ExpectedCTCForOfferApproval").dxNumberBox("instance").option("readOnly",true);
  $("#sddb-ExpectedJoiningDateOfferApproval").dxDateBox("instance").option("readOnly",true); 	
  $("#sddb-OfferDateOfferApproval").dxDateBox("instance").option("readOnly",true); 
  $("#sdchk-IsConsultantOfferApproval").dxSwitch("instance").option("disabled",true);
  $("#sdr-ConsultantHours").dxNumberBox("instance").option("readOnly",true);
  $("#sdr-ConsultantType").dxRadioGroup("instance").option("readOnly",true);
}

$('ul#rrmApprovalTabs li').click(function(e)
{            
    var tab_details = $(this).attr("id");
    var currentTab = $("#"+tab_details + " > a ").attr("aria-controls");            
    $('ul#rrmApprovalTabs li').removeClass("active");
    $(this).addClass("active");
    $("#rrmOfferApprovalDetails .tab-pane").removeClass("active");
    $("#" + currentTab).addClass("active");
    new SimpleBar(document.getElementById('rrmOfferApprovalModalBody'));
});

function mapOfferApprovalPreviousInterviews(data){
  var result = data.reduce(function (r, a) {
    r[a.RRMNo] = r[a.RRMNo] || [];
    r[a.RRMNo].push(a);
    return r;
}, Object.create(null));

  var interviewCompletedState = false;
  var html = ""
  if(data != undefined && data.length > 0){
    $.each(result,function(id,items){

      if(items[0].SortOrder != null && items[0].SortOrder != ""){
        if(items[0].SortOrder == "2" || items[0].SortOrder =="3" || items[0].SortOrder == "6"){
            html += "<div>"
            html += "<div ><strong>"+ id +"</strong></div> <br>"
        }
    }

      items.forEach(function (key, item) {
        
        if(key.SortOrder == "2" || key.SortOrder == "3" || key.SortOrder == "6"){
          if(key.SortOrder == "2"){
              html += "<div class='panel panel-success'>"
          }
          if(key.SortOrder == "3"){
              html += "<div class='panel panel-danger'>"
          }
          if(key.SortOrder == "6"){
              html += "<div class='panel panel-warning'>"
          }
          html += "<div class='panel-heading' data-toggle='collapse' data-parent='#rrm_OfferApprovalInterviewHistoryAccordian' href='#collapseOfferApproval"+key.Id+"' onclick=rrmOfferApprovalPanelClick('sdgd-RRMOfferAprovalInterviewHistory-"+key.Id+"') style='cursor:pointer'>"
          html += "<h3 class='panel-title'>"
          html += "<a data-toggle='collapse' data-parent='#rrm_OfferApprovalInterviewHistoryAccordian' href='#collapseOfferApproval"+key.Id+"'>"
          if(key.SortOrder == "2"){
              html += key.RRMNo+"&nbsp;"+key.TypeName +"-"+key.RowNum+"</a> &nbsp;<label class='label label-success m-l-sm'>Passed</label><span style='float:right'>"+key.InterviewerName+"</span>"
          }
          if(key.SortOrder == "3"){
              html += key.RRMNo+"&nbsp;"+key.TypeName +"-"+key.RowNum+"</a> &nbsp;<label class='label label-danger m-l-sm'>Failed</label><span style='float:right'>"+key.InterviewerName+"</span>"
          }
          if(key.SortOrder == "6"){
              html += key.RRMNo+"&nbsp;"+key.TypeName +"-"+key.RowNum+"</a> &nbsp;<label class='label label-warning m-l-sm'>On-Hold</label><span style='float:right'>"+key.InterviewerName+"</span>"
          }                
          html += "</h3>"
          html += "</div>"
          html += "<div id='collapseOfferApproval"+key.Id+"' class='panel-collapse collapse'>"
          html += "<div class='panel-body' style='overflow-y:scroll;height:300px;'>"
          html += "<div id='sdgd-RRMOfferAprovalInterviewHistory-"+key.Id+"'></div>"
          html += "<br><div><b>Remarks:</b></div>"
          html += "<div class='row'><div class='col-md-12' id='rrm-remarks-offer-approval'>"+key.Comments+"</div></div>"
          html +="</div>"
          html += "</div>"
          html += "</div> <br>"                
          interviewCompletedState = true;
         
          
      }
      })
      html += "</div>"
      })     
  }
  if(interviewCompletedState == true){
    $("#rrm_OfferApprovalInterviewHistoryAccordian").html(html);
    
        $.each(result,function(id,items){
           
          items.forEach(function (key, item) {
           
              var dataOnRRMId = [];
                if(key.SortOrder == "2" || key.SortOrder == "3" || key.SortOrder == "6"){
                    dataOnRRMId.push(key);
                    binDataGridsForOfferApprovalInterviewHistory(dataOnRRMId,"#sdgd-RRMOfferAprovalInterviewHistory-"+key.Id)
                }
            })
        });
  }  
  else{
      $("#rrm_OfferApprovalInterviewHistoryAccordian").html("<h3>No Previous Interview available for this candidate</h3>");
  } 
}

function binDataGridsForOfferApprovalInterviewHistory(data,Id){
  rrmOfferApprovalInterviewHistoryGrid(data,Id);
}

function rrmOfferApprovalInterviewHistoryGrid(interviewStages,id){   
  $(id).dxDataGrid({
      dataSource:interviewStages,
      repaintChangesOnly: true,
      highlightChanges: true,
      searchPanel: {
        visible: false
      },
      allowColumnReordering: true,
      showBorders: true,
      columnAutoWidth: true,
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
      sorting: {
        mode: "multiple",
      },    
      rowAlternationEnabled: true,
      allowColumnReordering: true,
      allowColumnResizing: true,
      showBorders: true,  
      columns: [
        {
          dataField: "ProfilePicture",
          caption: "",
          allowGrouping: false,
          allowCollapsing: false,
          allReordering:false,
          allowFiltering: false,
          width:70,
          cellTemplate: function (container, options) {
              
            $("<div class='text-center'>")
            .append("<img id='imgRRMOfferApprovalInterviewHistory-"+options.data.Id+"' src='"+options.data.ProfilePicture+"' class='img-circle interviewer-image' width='25px' height='25px'></img><div id='imageTooltipRRMOfferApprovalInterviewHistory"+options.data.Id+"'></div>")
            .appendTo(container);
            prepareImageTooltipForRRMOfferApprovalInterviewHistory(options.data.Id,options.data.ProfilePicture,options.data.InterviewerName)
          }
        },
        {
          dataField: "RRMNo",
          caption: "RRM No."
        },
        {
          dataField: "RRMName",
          caption: "RRM Name"
        },
        {
          dataField: "InterviewerName",
          caption: "Interviewer"
        },
        {
          dataField: "Status",
          caption: "Status",
          width:180,
          cellTemplate: function (container, options) {
              $("<div>")
            .append("<span>"+options.data.TypeName+"-"+options.data.RowNum+" "+options.data.StatusName+"</span>")
            .appendTo(container);
          }
        },      
        {
          dataField: "ModeName",
          caption: "Mode"
        },
        {
          dataField: "InterviewDate",
          caption: "Date"
        },
        {
          dataField: "InterviewTime",
          caption: "Time"
        },
        {
          dataField: "Comments",
          caption: "Remarks",
          visible:false
        },
        {
          dataField: "InterviewDetails",
          caption: "Interview Details"
        },
        {
            dataField:"OverallMark",
            caption:"Score",
            width:180,
            cellTemplate:function(container, options){
                var meterhtml = "";
              if(options.data.OverallMark <= 4){
                  meterhtml += "<span class='scoremeter'><meter class='redmeter' min='0' max='10' value='"+options.data.OverallMark+"' tooltip='10' width='5px'></meter><b> "+options.data.OverallMark+"/10</b></span>"
              } 
              if(options.data.OverallMark < 8 && options.data.OverallMark >4){
                  meterhtml += "<span class='scoremeter'><meter class='orangemeter' min='0' max='10' value='"+options.data.OverallMark+"' tooltip='10' width='5px'></meter><b> "+options.data.OverallMark+"/10</b></span>"
              }
              if(options.data.OverallMark > 8){
                  meterhtml += "<span class='scoremeter'><meter class='greenmeter' min='0' max='10' value='"+options.data.OverallMark+"' tooltip='10' width='5px'></meter><b> "+options.data.OverallMark+"/10</b></span>"
              }  
              $(meterhtml).appendTo(container);  
            }
        }
      ]
    });
}

function prepareImageTooltipForRRMOfferApprovalInterviewHistory(Id,ProfilePicture,InterviewerName){
  $("#imageTooltipRRMOfferApprovalInterviewHistory"+Id).dxTooltip({
    target: "#imgRRMOfferApprovalInterviewHistory-"+Id,
    showEvent: "mouseenter",
    hideEvent: "mouseleave",
    closeOnOutsideClick: false,
    position: "right",
    contentTemplate: function(data) {
        data.html("<img width='150' height='150' src='"+ProfilePicture+"'><br/><b>"+InterviewerName+"</b>");
    }
});
}

function rrmOfferApprovalPanelClick(id){
  $("#"+id).dxDataGrid("instance").refresh();
  setTimeout(function(){
      new SimpleBar(document.getElementById('InterviewModalBody'));
  }, 1000);    
}

$(document).on("click", ".rrmRemarksOfferApproval", function (e) {
  var comments =  $(this).attr("data-comments");
  if(comments =="" && comments == null){
      comments = "Comments Not Avalilable";
  }
  else{
   $("#rrm-remarks-offer-approval").html("");
   $("#rrm-remarks-offer-approval").html(comments);
  }
});

function deleteOfferApproval(id){
  swal({
    title: "Are you sure?",
    text: "You want to delete this record?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willAssign) => {
    if (willAssign) {
      var DeleteOfferApproval = {
        Id:id
      };
      var DeleteOfferApprovalPostCallData = {
          Method: "DeleteCandidateOfferDispatch",
          Data: DeleteOfferApproval
      };
      var DeleteOfferApprovalPostResult = PostDataCall(DeleteOfferApprovalPostCallData);
      if(DeleteOfferApprovalPostResult["IsSuccess"] != true){
        var DeleteOfferApprovalPostSwal = {
          title: "OOPS",
          text: DeleteOfferApprovalPostResult['Message'],
          icon: 'error'
        }
      }
        
      if(DeleteOfferApprovalPostResult["IsSuccess"] == true){
        var DeleteOfferApprovalPostSwal = {
          title: "Success",
          text: DeleteOfferApprovalPostResult['Message'],
          icon: 'success'
        }      
      }

      rrmOfferApprovalSwal(DeleteOfferApprovalPostSwal);
      getOfferAprovalCandidates();
    }
  });
}

function saveOfferApprovalNotes(){
  var Notes = $("#sdtxt-NotesOfferApproval").dxHtmlEditor("instance").option("value");
  if(Notes.trim() != ""){
    var RRMOfferApprovalSaveData = {
      OfferId:offerIdForApproval,
      // Notes:Notes,
      IsActive:1
    };
    
    var offerNotesPostCallData = {
        Method: "PostCandidateOffersNotes",
        Data: RRMOfferApprovalSaveData,
        EncryptData:{
          Notes: Notes
        }
    };
    var result = PostDataCall(offerNotesPostCallData);
      if(result["IsSuccess"] == true){
        $("#sdtxt-NotesOfferApproval").dxHtmlEditor("instance").option("value","")
        getOfferNotesHistory();
      }
  }
  else{
    swal({
      title: "OOPS",
      text: "Please enter notes",
      icon: "error",
      button:"OK"
    }); 
  }
}

function getOfferNotesHistory(){
  var filter_val = JSON.stringify({
    "OfferId": offerIdForApproval,
    "IsActive": true
  });
  var encryptedColumns = JSON.stringify(["Notes"])
  callGetDecryptedListSync('GetCandidateOffersNotes', filter_val, encryptedColumns, function (getNotesHistory) {
      var offer_notes_history_html = ""; 
      getNotesHistory.forEach(function (item) {
          var plan_created_date = new Date(item.CreatedDate);
          var plan_date_month_year = plan_created_date.toLocaleDateString();
          var plan_time = plan_created_date.toLocaleTimeString();

          offer_notes_history_html += "<div style='width:100%;display:flow-root'><div class='message dx-theme-background-color'>"
          offer_notes_history_html += "<div class='name'>"+item.CreatedByName+"</div>"
          offer_notes_history_html += "<div class='date'>"+ plan_date_month_year+" " + plan_time +"</div>"
          offer_notes_history_html += "<div class='text'>"+item.Notes+"</div></div></div>";
        

      });
      $("#offerApprovalNotesHistory").show();
      $("#offerApprovalNotesHistory").html(offer_notes_history_html);
      // var div = document.getElementById('offerApprovalNotesHistory');
      // div.scrollTop = div.scrollHeight - div.clientHeight;
  })
}

function getRRMDetailsForOfferApproval(rrmId){
  var filterData2 = JSON.stringify({
    IsActive: true,
    ResourceRequirementId : rrmId
  });

  callGetListSync("GetRRMById", filterData2, function (RRMData) {
      mapRRMDetailsForOfferApproval(RRMData[0])
  })
}

function mapRRMDetailsForOfferApproval(data){
  if(data.RRMNo != null && data.RRMNo != ""){
      $("#lbl_offerApprovalRRMNumberTab").html(data.RRMNo);
  }
  else{
      $("#lbl_offerApprovalRRMNumberTab").html("Not Available");
  }
  if(data.RequirementName != null && data.RequirementName != ""){
      $("#lbl_offerApprovalRRMNameTab").html(data.RequirementName)
  }
  else{
      $("#lbl_offerApprovalRRMNameTab").html("Not Available")
  }
  if(data.RequiredFor != null && data.RequiredFor != ""){
      $("#lbl_offerApprovalRRMRequiredFor").html(data.RequiredFor)
  }
  else{
      $("#lbl_offerApprovalRRMRequiredFor").html("Not Available")
  }
  if(data.Department != null && data.Department != ""){
      $("#lbl_offerApprovalRRMDepartment").html(data.Department)
  }
  else{
      $("#lbl_offerApprovalRRMDepartment").html("Not Available")
  }
  if(data.Designation != null && data.Designation != ""){
      $("#lbl_offerApprovalRRMDesignation").html(data.Designation)
  }
  else{
      $("#lbl_offerApprovalRRMDesignation").html("Not Available")
  }
  if(data.ExperiencerequiredInYrs != null && data.ExperiencerequiredInYrs != ""){
      $("#lbl_offerApprovalRRMExperience").html(data.ExperiencerequiredInYrs)
  }
  else{
      $("#lbl_offerApprovalRRMExperience").html("Not Available")
  }
  if(data['PlanA-SkillPlanInfo'] != null && data['PlanA-SkillPlanInfo'] != ""){
      $("#lbl_offerApprovalRRMPlanA").html(data['PlanA-SkillPlanInfo'])
  }
  else{
      $("#lbl_offerApprovalRRMPlanA").html("Not Available")
  }
  if(data['PlanB-SkillPlanInfo'] != null && data['PlanB-SkillPlanInfo'] != ""){
      $("#lbl_offerApprovalRRMPlanB").html(data['PlanB-SkillPlanInfo'])
  }
  else{
      $("#lbl_offerApprovalRRMPlanB").html("Not Available")
  }
  getRRMSkillDataGridForOfferApproval(data.RRMId)
}

function getRRMSkillDataGridForOfferApproval(RRMId){
  var filterData = JSON.stringify({
      "ResourceRequirementId": RRMId,
      "IsActive": true,
  });        

  callGetListAsync('GetResourceRequrirementSkill', filterData, function (e) {
      var GetSkillList = e;
      $("#sdgd_offerApprovalRRMSkillsGrid").dxDataGrid({
          dataSource: GetSkillList,
          showBorders: true,
          paging: {
              enabled: false
          },
          columns: [
              {
                  dataField:"SkillFamily",
                  caption:"Skill Family"
              },
              {
                  dataField:"Skill",
                  caption:"Skill"
              },
              {
                  dataField:"SkillVersion",
                  caption:"Skill Version"
              }
          ],
      });
  })
}

function setBorderCell(worksheet, row, column, borderValue) {
  const excelCell = worksheet.getCell(row, column);

  if(!excelCell.border) {
    excelCell.border = {};
  }

  Object.assign(excelCell.border, borderValue);
}

function setBorders( worksheet, cellsRange) {
  var borderStylePattern = { style: 'thin', color: { argb: 'FF7E7E7E' } };
  for(let i = cellsRange.from.row; i < cellsRange.to.row; i++) {
    for(let j = cellsRange.from.column; j <= cellsRange.to.column; j++) {
      setBorderCell(worksheet, i, j, { bottom: borderStylePattern });
      setBorderCell(worksheet, i, j, { right: borderStylePattern }); 
    }
  }
  for(let i = cellsRange.from.column; i <= cellsRange.to.column; i++) {
    setBorderCell(worksheet, cellsRange.from.row, i, { top: borderStylePattern });
  }
  for(let i = cellsRange.from.row; i <= cellsRange.to.row; i++) {
    setBorderCell(worksheet, i, cellsRange.from.column, { left: borderStylePattern });
  }
  for(let i = cellsRange.from.row; i <= cellsRange.to.row; i++) {
    setBorderCell(worksheet, i, cellsRange.to.column, { right: borderStylePattern });
  }
  for(let i = cellsRange.from.column; i <= cellsRange.to.column; i++) {
    setBorderCell(worksheet, cellsRange.to.row, i, { bottom: borderStylePattern });
  }
}

var tasks = ["Prepare 2016 Financial","Prepare 2016 Marketing Plan","Update Personnel Files","Review Health Insurance Options Under the Affordable Care Act","New Brochures","2016 Brochure Designs","Brochure Design Review","Website Re-Design Plan","Rollout of New Website and Marketing Brochures",
    "Update Sales Strategy Documents","Create 2012 Sales Report","Direct vs Online Sales Comparison Report","Review 2012 Sales Report and Approve 2016 Plans","Deliver R&D Plans for 2016",
    "Create 2016 R&D Plans","2016 QA Strategy Report","2016 Training Events","Approve Hiring of John Jeffers","Non-Compete Agreements","Update NDA Agreement","Update Employee Files with New NDA","Sign Updated NDA",
    "Submit Questions Regarding New NDA","Submit Signed NDA","Update Revenue Projections","Review Revenue Projections","Comment on Revenue Projections","Provide New Health Insurance Docs",
    "Review Changes to Health Insurance Coverage"];

function showImportOfferModal(){
  
}

function applyImportOfferDetails(){
  var informations = $("#sdlist-DefaultOfferDetails").dxList("instance").option("selectedItems").toString();
  var previousDetails = $("#sdtxt-OfferDetailsOfferApproval").dxHtmlEditor("instance").option("value");
  var newDetails = informations + previousDetails;
  $("#sdtxt-OfferDetailsOfferApproval").dxHtmlEditor("instance").option("value",newDetails);
}



$(document).on("click", ".rrmApproval-candidate-tracker", function (e) {
  var rrmId = $(e.currentTarget).data("rrmid");
  var candiadteId = $(e.currentTarget).data("candidateid");  

  var filterData1 = JSON.stringify({
      "CandidateId":candiadteId,
      "RRMId":rrmId,
      "IsActive": true
  }); 
  var interviewStages = callgetlist("GetInterviewDetailsForCandidatesTracker", filterData1);
  var interviewStagestimeline = callgetlist("GetInterviewDetailsForCandidatesTrackerTimeline", filterData1);
  $("#RRMApprovalCandidateTrackerModal").appendTo("body").modal("show");
 $("#SummarycandidateName").html( $(e.currentTarget).data("candidatename"));
  openCandidateTrackerApproval(interviewStages);
  var profileRRMDetails = callgetlist("GetProfileAndRRMDetailsForTracker",filterData1);
  mapCandidateTimeLineRRMApproval(interviewStagestimeline,profileRRMDetails);
  setTimeout(function(){
      new SimpleBar(document.getElementById('RRMApprovalCandidatetrackerModalBody'));
  }, 1000);
});

function openCandidateTrackerApproval(interviewStages){    
  var datagrid = $("#sdgd-rrmApprovalCandidateTracker").dxDataGrid({
      dataSource:interviewStages,
      repaintChangesOnly: true,
      highlightChanges: true,
      searchPanel: {
        visible: true,
        width: 240,
        placeholder: "Search...",
      },
      allowColumnReordering: true,
      showBorders: true,
      columnAutoWidth: true,
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
      sorting: {
        mode: "multiple",
      },    
      rowAlternationEnabled: true,
      allowColumnReordering: true,
      allowColumnResizing: true,
      showBorders: true,
      wordWrapEnabled: true,  
      columns: [
        {
          dataField: "ProfilePicture",
          caption: "",
          allowGrouping: false,
          allowCollapsing: false,
          allReordering:false,
          allowFiltering: false,
          width:70,
          cellTemplate: function (container, options) {
              
            $("<div class='text-center'>")
            .append("<img id='imgCandidateTrackerRRMApproval-"+options.data.Id+"' src='"+options.data.ProfilePicture+"' class='img-circle interviewer-image' width='25px' height='25px'></img><div id='imageTooltipRRMApprovalCandidateTracker"+options.data.Id+"'></div>")
            .appendTo(container);
            prepareImageTooltipForCandidateRRMApprovalTracker(options.data.Id,options.data.ProfilePicture,options.data.InterviewerName)
          }
        },
        {
          dataField: "InterviewerName",
          caption: "Interviewer"
        },
        {
          dataField: "Status",
          caption: "Status",
          width:180,
          cellTemplate: function (container, options) {
              if(options.data.OfferStatus == ""){
                  var html ="";
                  if(options.data.StatusId == "3C532499-6A0E-4EC7-8D51-08E14D28C686"){
                      html+= "<span>"+options.data.TypeName+"-"+options.data.RowNum+" <label class='label label-info m-l-sm'>"+options.data.StatusName+"</span>"
                  }
                  else if(options.data.StatusId == "564466B4-869B-45EB-A75E-0FB1E8D63161"){
                      html+= "<span>"+options.data.TypeName+"-"+options.data.RowNum+" <label class='label label-success m-l-sm'>"+options.data.StatusName+"</span>"
                  }
                  else if(options.data.StatusId == "CB3068AF-6E5B-4325-A66E-E20AC1F915EB"){
                      html+= "<span>"+options.data.TypeName+"-"+options.data.RowNum+" <label class='label label-danger m-l-sm'>"+options.data.StatusName+"</span>"
                  }
                  else if(options.data.StatusId == "D09C3FAA-1EE4-49F2-9CAD-25982A6034E4"){
                      html+= "<span>"+options.data.TypeName+"-"+options.data.RowNum+" <label class='label label label-default'>"+options.data.StatusName+"</span>"
                  }
                  else if(options.data.StatusId == "D44D0312-0396-4031-80C8-D5D9B36924D0"){
                      html+= "<span>"+options.data.TypeName+"-"+options.data.RowNum+" <label class='label label-primary m-l-sm'>"+options.data.StatusName+"</span>"
                  }
                  else if(options.data.StatusId == "44B51491-3791-485D-98F3-B0F884F0F5EC"){
                      html+= "<span>"+options.data.TypeName+"-"+options.data.RowNum+" <label class='label label-warning m-l-sm'>"+options.data.StatusName+"</span>"
                  }
                  $(html).appendTo(container);
              }
              else{
                  var html ="";
                  if(options.data.OfferStatus == "0"){
                      html+= "<span><b>OFFERED </b><label class='label label-info m-l-sm'>Yet To Approve</span>"
                  }
                  else if(options.data.OfferStatus == "1"){
                      html+= "<span><b>OFFERED </b><label class='label label-danger m-l-sm'>Rejected</span>"
                  }
                  else if(options.data.OfferStatus == "2"){
                      html+= "<span><b>OFFERED </b><label class='label label-success m-l-sm'>Approved</span>"
                  }
                  $(html).appendTo(container);
              }
          }
        },      
        {
          dataField: "ModeName",
          caption: "Mode"
        },
        {
          dataField: "InterviewDate",
          caption: "Date"
        },
        {
          dataField: "InterviewTime",
          caption: "Time"
        },
        {
            dataField:"OverallMark",
            caption:"Score",
            width:130,
            cellTemplate:function(container, options){
                var meterhtml = "";
                  if(options.data.OfferStatus == ""){
                      if(options.data.OverallMark <= 4){
                          meterhtml += "<span class='scoremeter'><meter class='redmeter' min='0' max='10' value='"+options.data.OverallMark+"' tooltip='10' width='5px'></meter><b> "+options.data.OverallMark+"/10</b></span>"
                      } 
                      if(options.data.OverallMark < 8 && options.data.OverallMark >4){
                          meterhtml += "<span class='scoremeter'><meter class='orangemeter' min='0' max='10' value='"+options.data.OverallMark+"' tooltip='10' width='5px'></meter><b> "+options.data.OverallMark+"/10</b></span>"
                      }
                      if(options.data.OverallMark > 8){
                          meterhtml += "<span class='scoremeter'><meter class='greenmeter' min='0' max='10' value='"+options.data.OverallMark+"' tooltip='10' width='5px'></meter><b> "+options.data.OverallMark+"/10</b></span>"
                      }  
                  }
              $(meterhtml).appendTo(container);  
            }
        },
        {
          dataField: "Comments",
          caption: "Remarks",
          cellTemplate: function (container, options) {
              if(options.data.OfferStatus == ""){
                  if(options.data.Comments != null && options.data.Comments.replace(" ","") != ""){
                      $("<div>")
                      .append("<a id='rrm_Approval_remarksId' rrm_Approval_remarks='"+options.data.Comments+"' style='cursor:pointer;text-decoration:underline;'>Remarks</a>")
                      .appendTo(container);
                  }     
                  else{
                      $("<div>")
                      .append("No Remarks Yet")
                      .appendTo(container);
                  } 
              }    
          }
        }
      ]
    });
}

function mapCandidateTimeLineRRMApproval(interviewStages,profileRRMDetails){
  debugger
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  var timeLineHtml ="";
  timeLineHtml +="<div class='Timeline'>" 
  if(profileRRMDetails != undefined && profileRRMDetails.length >0){
      var createdDate = new Date(profileRRMDetails[0].ProfileCreatedDate)
      timeLineHtml +="<svg height='5' width='50' class='timelineline1'>"
      timeLineHtml +="<line x1='0' y1='0' x2='50' y2='0' style='stroke:#004165;stroke-width:5' />"
      timeLineHtml +="</svg>"
      timeLineHtml +="<div class='event1'>"
      timeLineHtml +="<div class='event1Bubble'>"
      timeLineHtml +="<div class='eventTime'>"
      timeLineHtml +="<div class='DayDigit'>"+createdDate.getDate()+"</div>"
      timeLineHtml +="<div class='Day'>"
      timeLineHtml +=days[createdDate.getDay()]
      timeLineHtml +="<div class='MonthYear'>"+monthNames[createdDate.getMonth()]+" "+createdDate.getFullYear()+"</div>"
      timeLineHtml += "</div>"
      timeLineHtml +="<img src='./components/rrminterviewschedule/Images/profilepicture1.jpg' width='25px' height='25px' class='img-circle timelineimage'>"
      timeLineHtml +="</div>"
      timeLineHtml +="<div class='eventTitle'>Profile Created</div>"
      timeLineHtml +="</div>"
      timeLineHtml +="<div class='event1Author'>by "+profileRRMDetails[0].ProfileCreatedBy+"</div>"
      createdDate.setHours(0,0,0,0)
      var currentDate = new Date();
      currentDate.setHours(0,0,0,0)
      if(currentDate == createdDate){
          timeLineHtml += "<div class='now'"
          timeLineHtml += "Today"
          timeLineHtml += "</div>"
      }
      else{
          timeLineHtml +="<svg height='20' width='20'>"
          timeLineHtml +="<circle cx='10' cy='11' r='5' fill='#004165' />"
          timeLineHtml +="</svg>"
      }
      timeLineHtml +="</div>"
  }   
  var number = 1;    
  if(interviewStages != undefined && interviewStages.length >0){     
      interviewStages.forEach(function(key,item){
          number += 1;
          var classnumber = "";
          if((number%2)==0){
              classnumber = "2"
          }
          else{
              classnumber = "1"
          }
          var interviewDate = new Date(key.InterviewDateOr)
          interviewDate.setHours(0,0,0,0);
          var currentDate = new Date()
          currentDate.setHours(0,0,0,0)
          if(interviewDate > currentDate){
              timeLineHtml +="<svg height='5' width='300' class='timelineline'>"
              timeLineHtml +="<line x1='0' y1='0' x2='300' y2='0' style='stroke:rgba(162, 164, 163, 0.37);stroke-width:5' />"
              timeLineHtml +="</svg>"
              timeLineHtml +="<div class='event"+classnumber+"'>"
              if(key.OfferStatus == ""){
                  timeLineHtml +="<div class='event"+classnumber+"Bubble futureOpacity '>"
              }
              else{
                  if(key.OfferStatus == "0"){
                      timeLineHtml +="<div class='event"+classnumber+"Bubble futureOpacity offered'>"
                  }
                  if(key.OfferStatus == "2"){
                      timeLineHtml +="<div class='event"+classnumber+"Bubble futureOpacity offerapproved'>"
                  }
                  if(key.OfferStatus == "1"){
                      timeLineHtml +="<div class='event"+classnumber+"Bubble futureOpacity offerrejected'>"
                  }
              } 
              timeLineHtml +="<div class='eventTime'>"
              timeLineHtml +="<div class='DayDigit'>"+interviewDate.getDate()+"</div>"
              timeLineHtml +="<div class='Day'>"
              timeLineHtml +=days[interviewDate.getDay()]
              timeLineHtml +="<div class='MonthYear'>"+monthNames[interviewDate.getMonth()]+" "+interviewDate.getFullYear()+"</div>"
              timeLineHtml += "</div>"
              if(key.ProfilePicture != null && key.ProfilePicture != ""){
                  timeLineHtml +="<img src='"+key.ProfilePicture+"' width='25px' height='25px' class='img-circle timelineimage'>"
              }
              timeLineHtml +="</div>"
              if(key.OfferStatus == ""){
                  timeLineHtml +="<div class='eventTitle'>"+key.TypeName+"-"+key.RowNum+"</div>"                                        
                  if(key.StatusId == "3C532499-6A0E-4EC7-8D51-08E14D28C686"){
                      timeLineHtml += "<label class='label label-info m-l-sm timelinelabel'>"+key.StatusName+"</label>";
                  }
                  else if(key.StatusId == "564466B4-869B-45EB-A75E-0FB1E8D63161"){
                      timeLineHtml += "<label class='label label-success m-l-sm timelinelabel'>"+key.StatusName+"</label>";
                  }
                  else if(key.StatusId == "CB3068AF-6E5B-4325-A66E-E20AC1F915EB"){
                      timeLineHtml += "<label class='label label-danger m-l-sm timelinelabel'>"+key.StatusName+"</label>";
                  }
                  else if(key.StatusId == "D09C3FAA-1EE4-49F2-9CAD-25982A6034E4"){
                      timeLineHtml += "<label class='label label-default m-l-sm timelinelabel'>"+key.StatusName+"</label>";
                  }
                  else if(key.StatusId == "D44D0312-0396-4031-80C8-D5D9B36924D0"){
                      timeLineHtml += "<label class='label label-primary m-l-sm timelinelabel'>"+key.StatusName+"</label>";
                  }
                  else if(key.StatusId == "44B51491-3791-485D-98F3-B0F884F0F5EC"){
                      timeLineHtml += "<label class='label label-warning m-l-sm timelinelabel'>"+key.StatusName+"</label>";
                  }   
                  else if(key.StatusId == "0"){
                      timeLineHtml += "<div class='eventTitle'>"+key.StatusName+"</div>";
                  }
              }
              else{
                  timeLineHtml +="<div class='eventTitle'>OFFERED</div>"
                  if(key.OfferStatus == "0"){
                      timeLineHtml += "<label class='label label-warning m-l-sm timelinelabel'>Yet to approve</label>";
                  }
                  else if(key.OfferStatus == "1"){
                      timeLineHtml += "<label class='label label-danger m-l-sm timelinelabel'>Rejected</label>";
                  }
                  else if(key.OfferStatus == "2"){
                      timeLineHtml += "<label class='label label-success m-l-sm timelinelabel'>Approved</label>";
                  }
              }
              timeLineHtml +="</div>"
              if(key.InterviewerName != null && key.InterviewerName != ""){
                  timeLineHtml +="<div class='event"+classnumber+"Author'>by "+key.InterviewerName+"</div>"
              } 
              timeLineHtml +="<svg height='20' width='20'>"
              timeLineHtml +="<circle cx='10' cy='11' r='5' fill='rgba(162, 164, 163, 0.37)' />"
              timeLineHtml +="</svg>"               
              timeLineHtml +="</div>" 
          }
          else{
              timeLineHtml +="<svg height='5' width='300' class='timelineline'>"
              timeLineHtml +="<line x1='0' y1='0' x2='300' y2='0' style='stroke:#004165;stroke-width:5' />"
              timeLineHtml +="</svg>"
              timeLineHtml +="<div class='event"+classnumber+"'>"
              if(key.OfferStatus == ""){
                  timeLineHtml +="<div class='event"+classnumber+"Bubble'>"
              }
              else{
                  if(key.OfferStatus == "0"){
                      timeLineHtml +="<div class='event"+classnumber+"Bubble offered'>"
                  }
                  if(key.OfferStatus == "2"){
                      timeLineHtml +="<div class='event"+classnumber+"Bubble offerapproved'>"
                  }
                  if(key.OfferStatus == "1"){
                      timeLineHtml +="<div class='event"+classnumber+"Bubble offerrejected'>"
                  }
              }                
              timeLineHtml +="<div class='eventTime'>"
              timeLineHtml +="<div class='DayDigit'>"+interviewDate.getDate()+"</div>"
              timeLineHtml +="<div class='Day'>"
              timeLineHtml +=days[interviewDate.getDay()]
              timeLineHtml +="<div class='MonthYear'>"+monthNames[interviewDate.getMonth()]+" "+interviewDate.getFullYear()+"</div>"
              timeLineHtml += "</div>"
              if(key.ProfilePicture != null && key.ProfilePicture != ""){
                  timeLineHtml +="<img src='"+key.ProfilePicture+"' width='25px' height='25px' class='img-circle timelineimage'>"
              }               
              timeLineHtml +="</div>"
              if(key.OfferStatus == ""){
                  timeLineHtml +="<div class='eventTitle'>"+key.TypeName+"-"+key.RowNum+"</div>"                                        
                  if(key.StatusId == "3C532499-6A0E-4EC7-8D51-08E14D28C686"){
                      timeLineHtml += "<label class='label label-info m-l-sm timelinelabel'>"+key.StatusName+"</label>";
                  }
                  else if(key.StatusId == "564466B4-869B-45EB-A75E-0FB1E8D63161"){
                      timeLineHtml += "<label class='label label-success m-l-sm timelinelabel'>"+key.StatusName+"</label>";
                  }
                  else if(key.StatusId == "CB3068AF-6E5B-4325-A66E-E20AC1F915EB"){
                      timeLineHtml += "<label class='label label-danger m-l-sm timelinelabel'>"+key.StatusName+"</label>";
                  }
                  else if(key.StatusId == "D09C3FAA-1EE4-49F2-9CAD-25982A6034E4"){
                      timeLineHtml += "<label class='label label-default m-l-sm timelinelabel'>"+key.StatusName+"</label>";
                  }
                  else if(key.StatusId == "D44D0312-0396-4031-80C8-D5D9B36924D0"){
                      timeLineHtml += "<label class='label label-primary m-l-sm timelinelabel'>"+key.StatusName+"</label>";
                  }
                  else if(key.StatusId == "44B51491-3791-485D-98F3-B0F884F0F5EC"){
                      timeLineHtml += "<label class='label label-warning m-l-sm timelinelabel'>"+key.StatusName+"</label>";
                  }   
                  else if(key.StatusId == "0"){
                      timeLineHtml += "<div class='eventTitle'>"+key.StatusName+"</div>";
                  }
              }
              else{
                  timeLineHtml +="<div class='eventTitle'>OFFERED</div>"
                  if(key.OfferStatus == "0"){
                      timeLineHtml += "<label class='label label-warning m-l-sm timelinelabel'>Yet to approve</label>";
                  }
                  else if(key.OfferStatus == "1"){
                      timeLineHtml += "<label class='label label-danger m-l-sm timelinelabel'>Rejected</label>";
                  }
                  else if(key.OfferStatus == "2"){
                      timeLineHtml += "<label class='label label-success m-l-sm timelinelabel'>Approved</label>";
                  }
              }
              timeLineHtml +="</div>"
              if(key.InterviewerName != null && key.InterviewerName != ""){
                  timeLineHtml +="<div class='event"+classnumber+"Author'>by "+key.InterviewerName+"</div>"
              }               
              timeLineHtml +="<svg height='20' width='20'>"
              timeLineHtml +="<circle cx='10' cy='11' r='5' fill='#004165' />"
              timeLineHtml +="</svg>"
              timeLineHtml +="</div>" 
          }
      });

      timeLineHtml +="<svg height='5' width='175' class='timelineline2'>"
      timeLineHtml +="<line x1='0' y1='0' x2='175' y2='0' style='stroke:rgba(162, 164, 163, 0.37);stroke-width:5'/>"
      timeLineHtml +="</svg>"
      timeLineHtml +="<svg height='20' width='42' class='timelineline3'>"
      timeLineHtml +="<line x1='1' y1='0' x2='1' y2='20' style='stroke:rgba(162, 164, 163, 0.37);stroke-width:2'/>"
      timeLineHtml +="<circle cx='11' cy='10' r='3' fill='rgba(162, 164, 163, 0.37)' />"
      timeLineHtml +="<circle cx='21' cy='10' r='3' fill='rgba(162, 164, 163, 0.37)' />"  
      timeLineHtml +="<circle cx='31' cy='10' r='3' fill='rgba(162, 164, 163, 0.37)' />"
      timeLineHtml +="<line x1='41' y1='0' x2='41' y2='20' style='stroke:rgba(162, 164, 163, 0.37);stroke-width:2' />"
      timeLineHtml +="</svg>"
  }
                  
  timeLineHtml +="</div>"
  $("#candidateTimeLineRRMApproval").html(timeLineHtml)
}


  
function prepareImageTooltipForCandidateRRMApprovalTracker(Id,ProfilePicture,InterviewerName){
  $("#imageTooltipRRMApprovalCandidateTracker"+Id).dxTooltip({
    target: "#imgCandidateTrackerRRMApproval-"+Id,
    showEvent: "mouseenter",
    hideEvent: "mouseleave",
    closeOnOutsideClick: false,
    position: "right",
    contentTemplate: function(data) {
        data.html("<img width='150' height='150' src='"+ProfilePicture+"'><br/><b>"+InterviewerName+"</b>");
    }
});
}


$(document).on("click", "#rrm_Approval_remarksId", function (e) {
  var remark =$(this).attr('rrm_Approval_remarks');
  $('#rrm_Approval_remarks').appendTo("body").modal("show");
  $("#remarksBodyRRMApproval").empty();
  $("#remarksBodyRRMApproval").html(remark);
})

function closeRRMApprove(){
  $('#rrm_Approval_remarks').modal("hide");
  $("#remarksBodyRRMApproval").empty();
}

function closeRRMApproveCandidateTracker(){
  $("#RRMApprovalCandidateTrackerModal").modal('hide');
}