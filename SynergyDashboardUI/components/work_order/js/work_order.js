$(document).ready(function(){
    displayWorkOrderCardDetails();
    datatableview();
    $('input[type="radio"][name="workOrderType"]').change(function(){
        displayWorkOrderCardDetails();
        datatableview();
    })
});

function datatableview()
{
    table=$("#tbl_workordercard").dataTable( {
        "destroy":true,
        "pageLength" : 5,
        "ordering": false,
        "info":     false,
        "oLanguage": { "sSearch": '<a class="btn searchBtn" id="searchBtn"><i class="fa fa-search"></i></a>' }
    });
}

function displayWorkOrderCardDetails(){
    let WorkOrderCard;
    let WorkOrderTableNew;
    let WorkOrderTableExisting;
    if($('input[type="radio"][id="NewWorkOrder"]').prop("checked")==true)
    {
        WorkOrderCard = GetWorkOrderCard(); 
        WorkOrderTableNew = generateWorkOrderCardNew(WorkOrderCard);
        $("#WorkOrderCard").html(WorkOrderTableNew);
    }
    else if($('input[type="radio"][id="ExistingWorkOrder"]').prop("checked")==true)
    {
        WorkOrderCard = GetWorkOrderCard(); 
        WorkOrderTableExisting = generateWorkOrderCardExisting(WorkOrderCard);
        $("#WorkOrderCard").html(WorkOrderTableExisting)
    }
}

function GetWorkOrderCard() {
    let result;
    if($('input[type="radio"][id="NewWorkOrder"]').prop("checked")==true)
    {
        let filter_val = JSON.stringify({
            "IsActive": true
            });
        
         result = callgetlist('GetWorkOrderCard', filter_val);
    }
    else if($('input[type="radio"][id="ExistingWorkOrder"]').prop("checked")==true)
    {
        let filter_val = JSON.stringify({
            "IsActive": true
            });
        
            let result = callgetlist('GetProjectCard', filter_val);
            return result;
    }
    return result
}

function generateWorkOrderCardNew(WorkOrderCard) {
    let html = "<table id='tbl_workordercard' class='table table-striped'>"
    html += "<thead>";
    html += "<tr>"
    html += "<td>Id</td>"
    html += "<td>Client</td>"
    html += "<td>Project</td>"
    html += "<td>Date</td>"
    html += "<td>Action</td>"
    html += "<td>Status</td>"
    html += "</tr>"
    html += "</thead>"
    html +="<tbody>"
    if (WorkOrderCard.length == 0) {
        html += "<tr colspan='5'><td>No Data Found.!</td></tr>";
    } else {
        WorkOrderCard.forEach(function (key, item) {
        html += "<tr>"
        html += "<td>"+key.WorkOrderId+"</td>"
        html += "<td>"+key.ClientName+"</td>"
        html += "<td>"+key.ProjectName+"</td>"
        html += "<td>"+key.WorkOrderDate+"</td>"
        html += "<td><button class='btn btn-xs  btn-primary' title='View Proposal'><i class='fa fa-eye'></i></button><button class='btn btn-xs btn-primary' title='View WO Details'><i class='fa fa-eye'></i></button><button class='btn btn-xs btn-primary' onclick='ProjectModal();'><i class='glyphicon glyphicon-plus'></i></button></td>"
        html += "<td>"+key.WorkorderStatus+"</td>"
    });
    html += "</tbody></table>"
  }  
  return html;
}

function generateWorkOrderCardExisting(WorkOrderCard) {
    let html = "<table id='tbl_workordercard' class='table table-striped'>";
    html += "<thead>"
    html += "<tr>"
    html += "<td>Id</td>"
    html += "<td>Client</td>"
    html += "<td>Project</td>"
    html += "<td>Date</td>"
    html += "<td>Action</td>"
    html += "<td>Status</td>"
    html += "</tr>"
    html += "</thead>"
    html += "<tbody>"
    if (WorkOrderCard.length == 0) {
        html += "<tr colspan='5'><td>No Data Found.!</td></tr>";
    } else {
        WorkOrderCard.forEach(function (key, item) {
        html += "<tr>"
        html += "<td>"+key.ProjectId+"</td>"
        html += "<td>"+key.ClientName+"</td>"
        html += "<td>"+key.ProjectName+"</td>"
        html += "<td>"+key.ProjectDate+"</td>"
        html += "<td><button class='btn btn-xs btn-primary' title='View Proposal'><i class='fa fa-eye'></i></button><button class='btn btn-xs btn-primary' title='View WO Details'><i class='fa fa-eye'></i></button><button class='btn btn-xs btn-primary' onclick='ProjectModal();'><i class='glyphicon glyphicon-plus'></i></button></td>"
        html += "<td>"+key.ProjectStatus+"</td>"
    });
  }  
  html += "</tbody></table>";
  return html;
}