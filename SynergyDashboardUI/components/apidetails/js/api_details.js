function getApiDetailsList() {

  var GetAPIsInfo = callgetlist('GetAPIsInfo');
  ////console.log('GetAPIsInfo' , GetAPIsInfo);
  var APIListHtml = APIDetailscomputeHTML(GetAPIsInfo);
  
  $('#DisplayAPIList').html(APIListHtml);
}


function APIDetailscomputeHTML(GetAPIsInfo) {

  var html = "";
  if (GetAPIsInfo.length == 0) {
    html += "<tr colspan='4'><td>No Data Found.!</td></tr>";
  } else {
    GetAPIsInfo.forEach(function (key, item) {
      sno = item + 1;
      html += "<tr>";
      html += "<td>" + sno + "</td>";
      html += "<td>" + key.API + "</td>";
      html += "<td>" + key.Params + "</td>";
      html += "</tr>";
    });

  }

  return html;
}



