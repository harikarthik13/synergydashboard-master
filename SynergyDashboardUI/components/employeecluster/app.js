var circleRadius = "5"
var imageSize = "10"
// var SynergyAPIURL = "http://172.16.2.30:88/synergydashboardapi/api/Synergy/";
var synergyProfileImageURL = SynergyAPIURL.replace("api/Synergy/", "");
synergyProfileImageURL = `${synergyProfileImageURL}images/`;

height = 200;
width = 300;

nodeData = callgetlist("GetNodesForChart", "")
linkData = callgetlist("GetLinksForChart", "")

data = {
    "nodes": nodeData,
    "links": linkData
}

loadBasciInfo = function(){
    const basic = document.createElement('div');
    basic.innerHTML = '<div id="basicInfo"> <img src = "components/employeecluster/pageundercon.png" style="height: 500px; width: 800px;" /> </div>';
    swal({
        title: 'Basic Information!',
        content: basic,        
        className: "employeeClusterSwal"
      })
}

loadBillingInfo = function(){
    const billing = document.createElement('div');
    billing.innerHTML = '<div id="billingInfo"> <img src = "components/employeecluster/pageundercon.png" style="height: 500px; width: 800px;" /></div>';
    swal({
        title: 'Billing and Plan Detials',
        content: billing,
        className: "employeeClusterSwal"       
      })
}

loadSkillsInfo = function(){
    const skills = document.createElement('div');
    skills.innerHTML = '<div id="skillInfo"> <img src = "components/employeecluster/pageundercon.png" style="height: 500px; width: 800px;" /></div>';
    swal({
        title: 'Skill Detials',
        content: skills,
        className: "employeeClusterSwal" 
      })
}


loadProjects = function(){
    const projects = document.createElement('div');
    projects.innerHTML = '<div id="repochart"> </div>';
    swal({
        title: 'Projects!',
        content: projects ,
        className: "employeeClusterSwal"
      })

    $.ajax({
        url:"components/employeecluster/repoactivity.html",
        type:'get',
        success: function(data){
            $("#repochart").html(data);
        }
      });
}


$(document).ready(function () {
    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d));

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    const svg = d3.create("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);

    const line = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.5)

    const link = line
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", 0.5);

    const circle = svg.append("g").attr("stroke", "#fff")
        .attr("stroke-width", 0)

    const node = circle
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("class", "employeecircle")
        .attr("data-id", d=>d.id)
        .attr("r", circleRadius)
        .attr("fill", function (d) { return "url(#image" + d.id + ")" })
        .call(drag(simulation));

    svg.selectAll("defs").data(nodes).join("defs").append("pattern").attr("id", function (d) { return "image" + d.id }).attr("height", imageSize).attr("width", imageSize).append("image").attr("x", "0").attr("y", "0").attr("height", imageSize).attr("width", imageSize).attr("xlink:href",function(d){return synergyProfileImageURL + d.img;})

    node.append("title")
        .text(d => d.name);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });

    svg.call(d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([1, 8])
        .on("zoom", zoomed));

    function zoomed() {
        circle.attr("transform", d3.event.transform);
        line.attr("transform", d3.event.transform);
    }

    $("#div-cluster-map").html(svg.node())
});

drag = simulation => {
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}

//  function callgetlisttest(selectedData, filterData = "") {
//     var result;
//     console.log(SynergyAPIURL + "GetData?query=" + selectedData + "&filters=" + filterData);
//     $.ajax({
//         url: SynergyAPIURL + "GetData?query=" + selectedData + "&filters=" + filterData,
//         type: "GET",
//         dataType: 'json',
//         async: false,
//         headers: {
//             "SecurityToken": localStorage.getItem("securityToken"),
//         }
//         //headers: myHeaders,

//     })
//         .done(function (data) {
//             //console.log(data)
//             result = data.Data;
//         })
//         .fail(function () {
//             alert("fail");
//         });

//     return result;
// }

var onClick = function(e) {

    var clicked = function() { alert('Item clicked!') }

    var items = [
        { title: 'Basic Information', icon: 'ion-person', fn: loadBasciInfo },
        { title: 'Skills', icon: 'ion-arrow-up-a', fn: loadSkillsInfo },
        { title: 'Project', icon: 'ion-person', fn: loadProjects },
        { title: 'Billing and Plans', icon: 'ion-person', fn: loadBillingInfo },
    ]

    basicContext.show(items, e)

}

$(document).on("contextmenu", ".employeecircle", onClick)