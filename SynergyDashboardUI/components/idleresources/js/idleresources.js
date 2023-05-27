var fullBenchData;
var partBenchData;

$( document ).ready(function() {
    var sheetID = "1URop7XuHOWaGbOhEbNyh0KorjNCvCY802BK9V5HNkvw";
    fullBenchrange = "BenchSummary2!W:X";
    fullBenchData =  callgetSpreadSheetData(sheetID,fullBenchrange);
    var fullTime = 0;
    var partTime = 0;
    var totalTime = 0;
    for(let i=1;i<fullBenchData['Data'].length;i++){
        fullTime = fullTime+Number(fullBenchData['Data'][i][1]);
    }
    partBenchrange = "BenchSummary2!z:AA";
    partBenchData = callgetSpreadSheetData(sheetID,partBenchrange);
    for(let j=1;j<partBenchData['Data'].length;j++){
        partTime = partTime+Number(partBenchData['Data'][j][1])
    }
    totalTime = fullTime + partTime;
    $('#resourceTbl').find('#fullTime')[0]['textContent'] = fullTime;
    $('#resourceTbl').find('#partTime')[0]['textContent'] = partTime;
    $('#resourceTbl').find('#totalTime')[0]['textContent'] = totalTime;
}); 

function open_model_idle(benchType) {
    var title = "";
    var result;
    var contentHtml ="";
    var rowData ="";
    var total =0.00;
    var resourceItems;
    $("#benchTbl tbody").empty();
    if(benchType == "full"){
        title = "Full Time Bench Count";       
        result = fullBenchData;
    }
    else if(benchType == "part"){
        title = "Part Time Bench Count";
        result = partBenchData;
    }
    else if(benchType == "total"){
        title = "Total Bench Count";
        var a = fullBenchData['Data'];
        var b = partBenchData['Data'];
        var arrayList1 = a.map(function(v) {return v[0];});
        arrayList1.shift();
        var arrayList2 = b.map(function(v) {return v[0];});
        arrayList2.shift();
        var c = arrayList1.concat(arrayList2);
        resourceItems = c.filter((item, pos) => c.indexOf(item) === pos)
    }
    
    if(benchType != "total" && result['Data']){
        $("#benchTbl thead").empty();
        var thead1 = '<tr><th colspan="3" style="text-align: center;" id="tblTitle">Full Time Bench Resources</th></tr>';
        $("#benchTbl thead").append(thead1);
        var count = 0;
        for(let i=1;i<result['Data'].length;i++){
            if(result['Data'][i][0] != ""){
                count = count+1;
                rowStart = "<tr>";
                rowEnd = "</tr>";
                td = "<td>"+count+"</td>";
                var onclickData = "onclick=open_submodel('"+benchType+"','"+encodeURIComponent(result['Data'][i][0])+"')";
                td1 = "<td><a "+onclickData+">"+result['Data'][i][0]+"</a></td>";
                td2 = "<td>"+result['Data'][i][1]+"</td>";
                total = total+Number(result['Data'][i][1]);
                rowData += rowStart+td+td1+td2+rowEnd;
            }
        }
        totalRow = "<tr style='background: #dedddd;'><td colSpan='2'>Total</td><td>"+total+"</td></tr>"
        contentHtml = rowData+totalRow;        
    }
    else{
        $("#benchTbl thead").empty();
        var thead1 = '<tr><th colspan="4" style="text-align: center;" id="tblTitle">Full Time Bench Resources</th></tr>';
        var thead2 = "<tr><th></th><th>Full Time</th><th>Part Time</th><th>Total</th></tr>";
        $("#benchTbl thead").append(thead1+thead2);
        var rowElemnt = "";
        var ttfullValue =0;
        var ttpartValue = 0;
        var ttValue =0;
        resourceItems.forEach(function(element){
            if(element != ""){
                var rowStart = "<tr>";
                var rowEnd = "</tr>";
                var col1 = "<td>"+element+"</td>";
                var fullValue = 0;
                
                var partValue = 0;
                var totalValue = 0;
                var full = fullBenchData['Data'].filter(function(item) {
                    if(item[0] == element){
                        return item;
                    }            
                });
                var part = partBenchData['Data'].filter(function(item) {
                    if(item[0] == element){
                        return item;
                    }            
                });
                var col2;
                if(full.length >0){
                    var onclickData = "onclick=open_submodel('full','"+encodeURIComponent(element)+"')"
                    col2 ="<td><a "+onclickData+">"+full[0][1]+"</a></td>";
                    fullValue = Number(full[0][1]);

                }
                else{
                    col2 = "<td></td>";
                    fullValue = 0;
                }
                var col3;
                if(part.length >0){
                    var onclickData = "onclick=open_submodel('part','"+encodeURIComponent(element)+"')"
                    col3 ="<td><a "+onclickData+">"+part[0][1]+"</a></td>";
                    partValue = Number(part[0][1]);

                }
                else{
                    col3 = "<td></td>";
                    partValue = 0;
                }
                ttfullValue = ttfullValue+fullValue;
                ttpartValue = ttpartValue+partValue;
                totalValue = fullValue+partValue;
                ttValue = ttValue+totalValue;
                var col4 = "<td>"+totalValue.toFixed(2)+"</td>"

                rowElemnt+= rowStart+col1+col2+col3+col4+rowEnd;
        }
        });
        var footer = "<tr style='background: #e8e8e8;'><td></td><td>"+ttfullValue+"</td><td>"+ttpartValue+"</td><td>"+ttValue+"</td></tr>";
        contentHtml = rowElemnt+footer;

    }
    $("#benchTbl tbody").append(contentHtml);
    $('#benchmodel').find('#tblTitle')[0]['textContent'] = title;
    $('#benchmodel').appendTo("body").modal('show');
}

function open_submodel(benchType,type) {
    var subtitle = decodeURIComponent(type);
    var sheetID = "1URop7XuHOWaGbOhEbNyh0KorjNCvCY802BK9V5HNkvw";
    var range = "";
    if(benchType == "full"){
        range = "BenchSummary2!A:G";      
    }
    else if(benchType == "part"){
        range = "BenchSummary2!J:S";
    }    
    var result =  callgetSpreadSheetData(sheetID,range);
    var newArray = result['Data'].filter(function(item) {
        if(item[0] == subtitle){
            return item;
        }            
      });
    $("#benchsubTbl").find('#normalHeader').empty();
    $("#benchsubTbl tbody").empty();
    var header = "<tr>";
    var headerComplete = "";
    var tbodyHtml ="";
    for(var i=0;i<result['Data'][0].length;i++){
        header+="<th>"+result['Data'][0][i]+"</th>"
    }
    for(var k=0;k<newArray.length;k++){
        var tbStart = "<tr>";
        var tbEnd = "</tr>";
        var tdHtml = "";
        newArray[k].forEach(function(element){
            tdHtml += "<td>"+element+"</td>";
          });
        tbodyHtml += tbStart+tdHtml+tbEnd;
    }
    $('#benchsubTbl').find('#subtblTitle')[0]['textContent'] = subtitle+" Resources";
    headerComplete = header+"</tr>";
    $("#benchsubTbl").find('#normalHeader').append(headerComplete);
    $("#benchsubTbl tbody").append(tbodyHtml);
    $('#benchsubmodel').appendTo("body").modal('show');
}