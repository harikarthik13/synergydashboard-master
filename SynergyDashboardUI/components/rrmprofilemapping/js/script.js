$(document).ready(function(){   
    table1=$("#RRMProfileMapTableList").dataTable( {
        "destroy": true,
        "pageLength" : 5,
        "ordering": false,
        "info":     false,
        "oLanguage": { "sSearch": '<a class="btn searchBtn" id="rrmprofileentrypointsearchBtn"><i class="fa fa-search"></i></a>' }
    }); 
});