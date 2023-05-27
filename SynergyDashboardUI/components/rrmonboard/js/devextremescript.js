
function renderProfilePopup() {
    $("#rrm_onboard_candidatename").dxTextBox({
    placeholder: "Name",
    showClearButton: true,
    onInitialized: function (e) {  
        setTimeout(function () {  
            e.component.focus();  
        }, 0);  
    } 
  });
    $("#rrm_onboard_candidatenoticeperiod").dxNumberBox({
        placeholder:"Notice Period in days",
        showClearButton:true,
        showSpinButtons:true,
        showClearButton:true,
        min:0,
        hint:"Notice period in days, for immediate joinee enter 0"
    })
    $("#rrm_onboard_candidatereferral").dxTextBox({
        placeholder:"Referral",
        showClearButton:true
    })

    $("#rrm_onboard_candidateTotalExperience").dxNumberBox({
        placeholder:"Total Experience",
        showClearButton:true,
        showSpinButtons:true,
        showClearButton:true,
        min:0,
        hint:"Total Experience",

    }); 

    $("#sd_popover_RRMmentions").dxPopover({
        showEvent: "mouseenter",
        //hideEvent: "mouseleave",
        closeOnOutsideClick: true,
        position: "top"        
    });

    $("#rrm_onboard_candidateemail").dxTextBox({
        placeholder: "Email",
        showClearButton: true,
        onValueChanged: function (e) {
            const candidateEmail = e.value;
            if(candidateEmail==" " || candidateEmail == null || candidateEmail == undefined|| candidateEmail==""){
                $(".candidateAlreadyExist").addClass('hidden');
                $(".newCandidateForm").addClass('hidden');
                $("a.btnNext").addClass('hidden');
            }
            else{
                if((CandidateId==null || CandidateId ==undefined || CandidateId ==" ") && rrmProfileType=="add"){
                    checkIfCandidateExist(candidateEmail)
                }
                else{
                    $(".candidateAlreadyExist").addClass('hidden');
                    $(".newCandidateForm").removeClass('hidden');
                    $("a.btnNext").removeClass('hidden');
                }
            }
        }
    }).dxValidator({
        name: "Enter Valid Mail address", 
        validationRules: [{
            type: "email"
        }]
    }); 

    function checkIfCandidateExist(emailId) {   
        var filterData = JSON.stringify({
            "IsActive": true,
            "EmailId": emailId,
            "CandidateId": CandidateId
        });
        callGetListAsync('CheckIfCandidateProfileExists', filterData, function (e) {
            $("#rrm_onboard_existingcandidateByEmail").dxDataGrid({ dataSource: e })
            if(e.length>0){
                $(".candidateAlreadyExist").removeClass('hidden');
                $(".newCandidateForm").addClass('hidden');
                $("a.btnNext").addClass('hidden');
            }
            else{
                $(".candidateAlreadyExist").addClass('hidden');
                $(".newCandidateForm").removeClass('hidden');
                $("a.btnNext").removeClass('hidden');
            }
            
        })
    }

    rrm_ExistingCandidateProfile();
    function rrm_ExistingCandidateProfile() {
        
        var dataGrid = $("#rrm_onboard_existingcandidateByEmail").dxDataGrid({
             filterRow: {
               visible: true,
               applyFilter: "auto"
            },
            repaintChangesOnly: true,
            highlightChanges: true,
          
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
            emptyPanelText:"Drag a column"
            },
           sorting: {
               mode: "multiple"
           },
           selection: {
            mode: "multiple"
        },
           summary: {
            totalItems: [{
                column: "sno",
                summaryType: "count"
            }
            // ...
            ],
            groupItems: [{
                column: "sno",
                summaryType: "count"
            }]
        },
            editing: {
                allowAdding: false,
                allowUpdating: false,
                useIcons: true
                },
            columnChooser: {
                enabled: true
            },
            columnFixing: {
                enabled: true
            },
            rowAlternationEnabled:true,
            filterPanel: { visible: true },
            allowColumnReordering: false,
            allowColumnResizing: true,
            showBorders: true,
            
            onToolbarPreparing: function (e) {
                var dataGrid = e.component;
                e.toolbarOptions.items.unshift({
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "refresh",
                        onClick: function () {
                            getRRMProfileEntryTables();
                            dataGrid.refresh();
                        }
                    }
                });
            },
            columns: [
                {
                    dataField: "Sno",
                    caption: "#",
                    alignment:"left",
                    width:70
                },
                //{ caption: "Candidate Profile Id", dataField: "CandidateProfileId" },
                { caption: "Name", dataField: "CandidateName" },
                { caption: "Skill Name", dataField: "SKillName", cssClass: 'profileEntryWrappedColumn', width:220},
                { caption: "Phone", dataField: "Mobile" },
                {
                    caption: "Email", dataField: "EmailId",
                    cellTemplate: function (container, options) {
                        var fieldData = options.data.EmailId;
                        if (fieldData == "" || fieldData == null || fieldData == undefined) {
                            var html = "";
                        }
                        else {
                            var html = "<span><a href='mailto:" + fieldData + "' target='_blank'><i class='fas fa-envelope'></i></a> &nbsp;" + fieldData + "</span>";
                        }
                        $(html).appendTo(container);
                    }
                },
                
                { caption: "Experience", dataField: "TotalExperience",
                    cellTemplate:function(container,options){
                        var html = " ";
                        if(options.data.TotalExperience!=null)
                            html = "<span class='' style='font-size:14px;font-weight:bold;'>"+options.data.TotalExperience+"</span> ";
                        $(html).appendTo (container)
                    }
            
            },
                {
                    caption: "Skype", dataField: "Skype",
                    cellTemplate: function (container, options) {
                        var fieldData = options.data.Skype;
                        if (fieldData == "" || fieldData == null || fieldData == undefined) {
                            var html = "";
                        }
                        else {
                            var html = "<span><a href='skype:" + fieldData + "?chat'><i class='fab fa-skype'></i></a> &nbsp;" + fieldData + "</span>";
                        }
                        $(html).appendTo(container);
                    }
                },
                { caption: "Age", dataField: "Age",
                cellTemplate: function(container,options){
                    var fieldData = options.data.Age;
                    if(fieldData == null || fieldData == undefined){
                        var html = "<span></span>";
                    }
                    else{
                        var html = "<span>"+fieldData+"</span>"
                    }
                    $(html).appendTo(container);
                }
            },
                 
            ],
            onRowPrepared(e) { 
                if (e.rowType == 'data') { 
                    if (e.data.DocumentId != "" && e.data.DocumentId != null && e.data.DocumentId != undefined) {  
                        e.rowElement.css("background-color", "rgb(225, 247, 223)");
                        e.rowElement.removeClass("dx-row-alt");  
                    }
                    if (e.data.IsFlagged == true) {  
                        e.rowElement.css("background-color", "rgb(230, 143, 140)");  
                        e.rowElement.removeClass("dx-row-alt");
                    }
                }
            }
        }).dxDataGrid("instance");
    }

    $("#rrm_onboard_candidatephoneno").dxNumberBox({
        format: "#",
        placeholder: "Phone Number",
        showClearButton: true,
        maxLength: 15,
        value:"",
    });
    $("#rrm_onboard_candidatepassportno").dxTextBox({
        placeholder: "Passport Number",
        showClearButton: true,
        maxLength: 15
    });
    $("#rrm_onboard_candidateaadharno").dxNumberBox({
        format: "#",
        placeholder: "Aadhar Number",
        showClearButton: true,
        maxLength: 12,
        value:""        
    });
    $("#rrm_onboard_candidatepanno").dxTextBox({
        placeholder: "Pan Number",
        showClearButton: true,
        maxLength: 20
    });
    //carrer details tab
    $("#rrm_onboard_currentcompany").dxTextBox({
        placeholder: "Current Company",
        showClearButton: true,
    });
    $("#rrm_onboard_currentdesignation").dxTextBox({
        placeholder: "Designation",
        showClearButton: true,
    });
    $("#rrm_onboard_expinyears").dxTextBox({
        placeholder: "Experience in Year",
        showClearButton: true,
    });
    $("#rrm_onboard_currentlocation").dxTextBox({
        placeholder: "Current Loaction",
        showClearButton: true,
    });
    $("#rrm_onboard_native").dxTextBox({
        placeholder: "Native",
        showClearButton: true,
    });

    //additional inforamtion tab forms

    $("#rrm_onboard_candidateskype").dxTextBox({
        placeholder: "Skype",
        showClearButton: true,
    });
    $("#rrm_onboard_candidatelinkedin").dxTextBox({
        placeholder: "LinkedIn",
        showClearButton: true,
    });
    $("#rrm_onboard_candidategithub").dxTextBox({
        placeholder: "GitHub",
        showClearButton: true,
    });
    $("#rrm_onboard_candidateurl").dxTextBox({
        placeholder: "URL",
        showClearButton: true,
    });
    $("#rrm_onboard_candidatefathername").dxTextBox({
        placeholder: "Father Name",
        showClearButton: true,
    });
    
    $("#rrm_onboard_candidatemaritalstatus").dxSelectBox({
        displayExpr: "Name",
        valueExpr: "ID",
        dataSource: maritalstatus,
        searchEnabled: true
    });
    
    var maximumDate = new Date();
    maximumDate.setFullYear(maximumDate.getFullYear() - 18);
    var minimumDate = new Date()
    minimumDate.setFullYear(minimumDate.getFullYear()-58)
    $("#rrm_onboard_candidatedob").dxDateBox({
        placeholder: "Date of Birth ",
        type: "date",
        value: null,
        showClearButton: true,
        displayFormat: "dd MMM yyyy",
        max: maximumDate,
        min:minimumDate  
    }).dxDateBox("instance");

    //address details
    $("#rrm_onboard_candidateaddress").dxTextBox({
        placeholder: "Address",
        showClearButton: true,
    });
    $("#rrm_onboard_candidatecity").dxSelectBox({
        displayExpr: "Name",
        dataSource: getcities,
        valueExpr:"Id",
        searchEnabled: true,
        showClearButton: true
    });
    $("#rrm_onboard_candidatepstate").dxSelectBox({
        displayExpr: "Name",
        dataSource: getstate,
        valueExpr:"Id",
        searchEnabled: true,
        showClearButton: true,
        onItemClick: function (e) {
            $("#rrm_onboard_candidatecity").dxSelectBox("instance").option("value","");
            loadRRMcities(e.itemData.Id);
        }
    });
    $("#rrm_onboard_candidatecountry").dxSelectBox({
        displayExpr: "Name",
        dataSource: getcountry,
        valueExpr:"Id",
        searchEnabled: true,
        showClearButton: true,
        onItemClick: function (e) {
            $("#rrm_onboard_candidatepstate").dxSelectBox("instance").option("value","");
            loadRRMstate(e.itemData.Id);
        }
    });
    $("#rrm_onboard_candidatepincode").dxTextBox({
        placeholder: "Pin Code",
        showClearButton: true,
    });

    $("#rrm_onboard_bancandidate").dxSelectBox({
        displayExpr: "Name",
        valueExpr: "Id",
        dataSource: flagreason,
        searchEnabled: true,
        showClearButton: true
    });
    var editor = $("#banonboardtxtareaComments").dxHtmlEditor({
        height: 400,
        toolbar: {
            items: [
                "undo", "redo", "separator",
                {
                    formatName: "size",
                    formatValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"]
                },
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
        }
    });
$("#close_BL").dxButton({
stylingMode: "contained",
text: "Close",
type: "danger",
width: 120,
onClick: function() {

popup.hide();
}
}).dxButton("instance");


}

//Check Validation
jQuery.fn.extend({

  CheckFormValidation: function (validationGroup) {
      for (var i = 0; i < validationGroup.validators.length; i++) {
          validationGroup.validators[i].validate();
          if (validationGroup.validators[i]._options.isValid === false) {
              return false;
          }
      }
      return true;
  }
});