function trackCandidatesRRMHrHead(rrmId){    
    getRRMTrackerHrHead(rrmId);
    $("#RRMEntryPointHrHeadTrackerModal").appendTo("body").modal("show");
}

function getRRMTrackerHrHead(rrmId){    
    $("#rrmHrHeadCandidatesTrackerTree").html("");
    var filterData = JSON.stringify({
        "RRMId":rrmId,
        "IsActive": true
    });
    callGetListAsync('GetCardDetailsForTracker',filterData,function(data){
        if(data!=undefined && data.length>0){
            $("#cardCandidateRRMHrHead").html(data[0].Candidates);
            $("#cardOfferedRRMHrHead").html(data[0].Offered);
            $("#cardPendingRRMHrHead").html((data[0].Candidates-data[0].Offered));
            $("#cardOnBoardRRMHrHead").html(data[0].OnBoard);
        }
    });
    callGetListAsync('GetAllRRMCountByRRMId', filterData, function (data) {
        if(data!=undefined && data.length>0){
            $("#l1InterviewsScheduledRRMHrHeadCard").html(data[0].L1InterviewScheduled);
            $("#l1InterviewsConductedRRMHrHeadCard").html(data[0].L1InterviewConducted);
            $("#l2InterviewsScheduledRRMHrHeadCard").html(data[0].L2InterviewScheduled);
            $("#l2InterviewsConductedRRMHrHeadCard").html(data[0].L2InterviewConducted);                
            $("#offerMadeRRMHrHeadCard").html(data[0].OfferMade);
            $("#offerAcceptedRRMHrHeadCard").html(data[0].offerAccepted);
        }
    });

    callGetListAsync('GetCandidatesForRRMTracker', filterData, function (e) {
        if(e.length == 0){
            $("#rrmHrHeadCandidatesTrackerTree").html("<h3>No Data Available</h3>");
        }
        var trackerhtml = "";
        var length = ((e.length*10)+35)+"em";        
        e.forEach(function (key, item) {
            trackerhtml += "<div class='tree' style='width:"+length+"'>"
            trackerhtml += "<ul>"
            trackerhtml += "<li class='resource-list'>"
            trackerhtml += "<a href='#' class='resource-card'><img src='./components/rrminterviewschedule/Images/profilepicture1.jpg' width='70' height='70'><span>"+key.CandidateName+"</span></a>"
            if(key.OfferStatus == "0"){
                trackerhtml += "<div class='ribbon blue'><span>Offered</span></div>"
            }
            else if(key.OfferStatus == "1"){
                trackerhtml += "<div class='ribbon red'><span>Offered</span></div>"
            }
            else if(key.OfferStatus == "2"){
                trackerhtml += "<div class='ribbon'><span>Offered</span></div>"
            }
            trackerhtml += "<ul>"
            trackerhtml += "<li>"
            var recruiterpicture;
            if(key.RecruiterProfilePicture != "" && key.RecruiterProfilePicture != undefined && key.RecruiterProfilePicture != null){
                recruiterpicture = key.RecruiterProfilePicture;
            }
            else{
                recruiterpicture = "./components/rrminterviewschedule/Images/profilepicture.png"
            }
            trackerhtml += "<a href='#' class='recruiter-card'><img src='"+recruiterpicture+"' alt='Recruiter' width='70' height='70'><span>"+key.RecruiterName+"</span></a>"
            var filterData1 = JSON.stringify({
                "CandidateId":key.CandidateId,
                "RRMId":rrmId,
                "IsActive": true
            });
            var interviewStages = callgetlist("GetInterviewDetailsForCandidates", filterData1);
            trackerhtml += "<ul>"
            if(interviewStages.length == 0){
                trackerhtml += "<li><a href='#' class='stages rescheduled'>"
                trackerhtml += "<p class='emp-name'>Yet to Schedule Interviews</p>"
                trackerhtml += "</img>"
                trackerhtml += "</a></li>"
            }
            else{
                interviewStages.forEach(function(key1,item){
                    var profilepicture;
                    if(key1.ProfilePicture != "" && key1.ProfilePicture != undefined && key1.ProfilePicture != null){
                        profilepicture = key1.ProfilePicture;
                    }
                    else{
                        profilepicture = "./components/rrminterviewschedule/Images/profilepicture.png"
                    }
                    if(key1.OfferStatus == ""){
                        var statusName;
                        if(key1.StatusName.includes("Interview")){
                            statusName = key1.StatusName.split(' ')[1].charAt(0).toUpperCase()+key1.StatusName.split(' ')[1].slice(1);
                        }
                        else{
                            statusName = key1.StatusName
                        }
                        var statusClass;
                        if(key1.StatusId == "3C532499-6A0E-4EC7-8D51-08E14D28C686"){
                            statusClass = "scheduled"
                        }
                        else if(key1.StatusId == "564466B4-869B-45EB-A75E-0FB1E8D63161"){
                            statusClass = "passed"
                        }
                        else if(key1.StatusId == "CB3068AF-6E5B-4325-A66E-E20AC1F915EB"){
                            statusClass = "failed"
                        }
                        else if(key1.StatusId == "D09C3FAA-1EE4-49F2-9CAD-25982A6034E4"){
                            statusClass = "rescheduled"
                        }
                        else if(key1.StatusId == "D44D0312-0396-4031-80C8-D5D9B36924D0"){
                            statusClass = "notresponding"
                        }
                        else if(key1.StatusId == "44B51491-3791-485D-98F3-B0F884F0F5EC"){
                            statusClass = "onhold"
                        }
                        trackerhtml += "<li><a href='#' class='stages "+statusClass+"'>"
                        trackerhtml += "<img class='interviewer-img' width='30' height='30' src='"+profilepicture+"' alt=''>"
                        trackerhtml += "<p class='emp-name'>"+key1.InterviewerName+"</p>"
                        trackerhtml += "<p class='interview-mode'>"+key1.TypeName+"</p>"                
                        trackerhtml += "<p class='interview-mode'><b><u>Status</u>: </b>"+statusName+"</p>"
                        if(key1.StatusId == "564466B4-869B-45EB-A75E-0FB1E8D63161" || key1.StatusId == "CB3068AF-6E5B-4325-A66E-E20AC1F915EB"){
                            if(key1.OverallMark <= 4){
                                trackerhtml += "<span class='scoremeter'><meter class='redmeter' min='0' max='10' value='"+key1.OverallMark+"' tooltip='10' width='5px'></meter><b> "+key1.OverallMark+"/10</b></span>"
                            } 
                            if(key1.OverallMark < 8 && key1.OverallMark >4){
                                trackerhtml += "<span class='scoremeter'><meter class='orangemeter' min='0' max='10' value='"+key1.OverallMark+"' tooltip='10' width='5px'></meter><b> "+key1.OverallMark+"/10</b></span>"
                            }
                            if(key1.OverallMark > 8){
                                trackerhtml += "<span class='scoremeter'><meter class='greenmeter' min='0' max='10' value='"+key1.OverallMark+"' tooltip='10' width='5px'></meter><b> "+key1.OverallMark+"/10</b></span>"
                            }                        
                        }
                        trackerhtml += "</img>"
                        trackerhtml += "</a></li>"
                    }     
                    else{
                        var statusClass;
                        if(key1.OfferStatus == "0"){
                            statusClass = "scheduled"
                            statusName = "Yet to approve"
                        }
                        else if(key1.OfferStatus == "2"){
                            statusClass = "passed"
                            statusName = "Approved"
                        }
                        else if(key1.OfferStatus == "1"){
                            statusClass = "failed"
                            statusName = "Rejected"
                        }
                        trackerhtml += "<li><a href='#' class='stages "+statusClass+"'>"
                        trackerhtml += "<img class='interviewer-img' width='30' height='30' src='"+profilepicture+"' alt=''>"
                        trackerhtml += "<p class='emp-name'>"+key1.InterviewerName+"</p>"
                        trackerhtml += "<br>"                
                        trackerhtml += "<p class='interview-mode'><b>OFFERED</b></p>"
                        trackerhtml += "</img>"
                        trackerhtml += "</a></li>"
                    }               
                })
            }
            trackerhtml + "</ul>"
            trackerhtml += "</li>"
            trackerhtml += "</ul>"
            trackerhtml += "</li>"
            trackerhtml += "</ul>"
            trackerhtml +="</div>"
            $("#rrmHrHeadCandidatesTrackerTree").html(trackerhtml);        
        });        
    });
}

function closeRRMTrackerHrHead(){
    $("#RRMEntryPointHrHeadTrackerModal").modal("hide");
}

$(document).on("click", ".rrmHrHead-candidate-tracker", function (e) {
    var rrmId = $(e.currentTarget).data("rrmid");
    var candiadteId = $(e.currentTarget).data("candidateid");  
    var filterData1 = JSON.stringify({
        "CandidateId":candiadteId,
        "RRMId":rrmId,
        "IsActive": true
    });
    var interviewStages = callgetlist("GetInterviewDetailsForCandidatesTracker", filterData1);
    var interviewStagestimeline = callgetlist("GetInterviewDetailsForCandidatesTrackerTimeline", filterData1);
    $("#RRMHrHeadCandidateTrackerModal").appendTo("body").modal("show");
    openCandidateTrackerHrHead(interviewStages);
    var profileRRMDetails = callgetlist("GetProfileAndRRMDetailsForTracker",filterData1);
    mapCandidateTimeLineRRMHrHead(interviewStagestimeline,profileRRMDetails);
    setTimeout(function(){
        new SimpleBar(document.getElementById('RRMHrHeadCandidatetrackerModalBody'));
    }, 1000);
});

function openCandidateTrackerHrHead(interviewStages){    
    var datagrid = $("#sdgd-rrmHrHeadCandidateTracker").dxDataGrid({
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
              .append("<img id='imgCandidateTrackerRRMHrHead-"+options.data.Id+"' src='"+options.data.ProfilePicture+"' class='img-circle interviewer-image' width='25px' height='25px'></img><div id='imageTooltipRRMHrHeadCandidateTracker"+options.data.Id+"'></div>")
              .appendTo(container);
              prepareImageTooltipForCandidateRRMHrHeadTracker(options.data.Id,options.data.ProfilePicture,options.data.InterviewerName)
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
                        .append("<a id='rrm_hrhead_remarksId' rrm_remarks='"+options.data.Comments+"' style='cursor:pointer;text-decoration:underline;'>Remarks</a>")
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

function generatePopoverForRRMHrHeadCandidatetrackerRemark(data){
    $("#remarksTooltipRRMHrHeadCandidateTracker_"+data.Id).dxTooltip({
        target: "#remarksForRRMHrHeadCandidateTracker_"+data.Id,
        showEvent: "mouseenter",
        hideEvent: "mouseleave",
        closeOnOutsideClick: false,
        position: "left",
        contentTemplate: function(e) {
            e.html(data.Comments);
        }
    });
}

$(document).on("click", "#rrm_hrhead_remarksId", function (e) {
    var remark =$(this).attr('rrm_remarks');
    $('#rrm_hrhead_remarks').appendTo("body").modal("show");
    $("#remarksBodyRRMHrHead").empty();
    $("#remarksBodyRRMHrHead").html(remark);
  })
  
  function closeRRMHrHead(){
    $('#rrm_hrhead_remarks').modal("hide");
    $("#remarksBodyRRMHrHead").empty();
  }

  
function prepareImageTooltipForCandidateRRMHrHeadTracker(Id,ProfilePicture,InterviewerName){
    $("#imageTooltipRRMHrHeadCandidateTracker"+Id).dxTooltip({
      target: "#imgCandidateTrackerRRMHrHead-"+Id,
      showEvent: "mouseenter",
      hideEvent: "mouseleave",
      closeOnOutsideClick: false,
      position: "right",
      contentTemplate: function(data) {
          data.html("<img width='150' height='150' src='"+ProfilePicture+"'><br/><b>"+InterviewerName+"</b>");
      }
  });
}

function mapCandidateTimeLineRRMHrHead(interviewStages,profileRRMDetails){
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
    $("#candidateTimeLineRRMHrHead").html(timeLineHtml)
}

function closeRRMHrHeadCandidateTracker(){
    $("#RRMHrHeadCandidateTrackerModal").modal('hide');
}