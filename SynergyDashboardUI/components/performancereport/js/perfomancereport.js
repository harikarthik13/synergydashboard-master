function getNreList() {

  $('.error_message').html("");
  $('input[type=text]').removeClass("required_field");
  $('select').removeClass("required_field");
  $('textarea').removeClass("required_field");

  var EmployeeID = localStorage.getItem("EmployeeID");

  var filter_val = JSON.stringify({
    "IsActive": true,
    "UserId": EmployeeID
  });
  var GetProposals = callgetlist('GetProposals', filter_val);
  //console.log(GetProposals);
  var ProposalListHtml = NreListcomputeHTML(GetProposals);

  $('#DisplayNreList').html(ProposalListHtml);
}


function NreListcomputeHTML(GetProposals) {

  var html = "";
  if (GetProposals.length == 0) {
    html += "<tr colspan='4'><td>No Data Found.!</td></tr>";
  } else {
    GetProposals.forEach(function (key, item) {
      sno = item + 1;
      ProposalId = key.ProposalId;
      stageNumber = key.Order;
      var proposal_date = new Date(key.Date),
        yr = proposal_date.getFullYear(),
        month = proposal_date.getMonth() < 10 ? '0' + proposal_date.getMonth() : proposal_date.getMonth(),
        day = proposal_date.getDate() < 10 ? '0' + proposal_date.getDate() : proposal_date.getDate(),
        newproposalDate = day + '-' + month + '-' + yr;

      html += "<tr class='row_" + item + "' id='row_" + ProposalId + "'>";
      html += "<td>" + sno + "</td>";
      html += "<td>" + key.EstimationNumber + "</td>";
      html += "<td>" + key.DocumentName + "</td>";
      html += "<td>" + newproposalDate + "</td>";
      html += "<td>Pending</td>";
      html += "<td><button class='btn btn-xs btn-primary edit-btn' onclick=editProposalData(\'" + ProposalId + "\',\'" + stageNumber + "\')><i class='fas fa-pencil-alt'></i></button>"
      html += "<button class='btn btn-xs btn-danger delete-btn' onclick=DeleteProposalData('" + ProposalId + "')><i class='fas fa-trash-alt'></i></button></td>"
      html += "</tr>";
    });

  }

  return html;
}






