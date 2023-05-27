 $(document).ready(function () {

            if (!localStorage.getItem('login_securityToken')) {
                window.location.href = 'index.html';
            }

            /*$('#log_out').click(function () {
                localStorage.removeItem('login_securityToken');
                localStorage.removeItem('securityToken');
                window.location.href = 'index.html';
            })*/

            $('body').on('click', '.modalExpanding', function (e) {
                //alert('test');
                var e = $(this),
                    windowStatus = e.attr("data-ws");
                if (windowStatus == 'maximized') {
                    e.attr("data-ws", "minimized");
                    e.parent().parent().removeClass("modal-expand");
                }
                else {
                    e.attr("data-ws", "maximized");
                    e.parent().parent().addClass("modal-expand");
                }
                //$('.modal-content').toggleClass("modal-expand");
            });
        })

        $("#addAnActionForm").validate({
            rules: {
                // simple rule, converted to {required:true}
                Action: "required",
                // compound rule
                Project: {
                    required: function (element) {
                        if ($("#Action").val() == "1") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                Task: {
                    required: function (element) {
                        if ($("#Action").val() == "1") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
         
});

$("#addAnActionFormDefaulters").validate({
    rules: {
        // simple rule, converted to {required:true}
        Action: "required",
        // compound rule
        Project: {
            required: function (element) {
                if ($("#defaultersEntryAction").val() == "1") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        Task: {
            required: function (element) {
                if ($("#defaultersEntryAction").val() == "1") {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
 
});

       var chart = AmCharts.makeChart("project_estimated_hours", {
            "type": "serial",
            "theme": "none",
            "dataProvider": [{
                "country": "USA",
                "visits": 2025
            }, {
                "country": "India",
                "visits": 984
            }, {
                "country": "South Korea",
                "visits": 443
            }, {
                "country": "Canada",
                "visits": 441
            }, {
                "country": "Brazil",
                "visits": 395
            }],
            "valueAxes": [{
                "gridColor": "#FFFFFF",
                "gridAlpha": 0.2,
                "dashLength": 0
            }],
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillAlphas": 0.8,
                "lineAlpha": 0.2,
                "type": "column",
                "valueField": "visits"
            }],
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "country",
            "categoryAxis": {
                "gridPosition": "start",
                "gridAlpha": 0,
                "tickPosition": "start",
                "tickLength": 20
            },
            "export": {
                "enabled": true
            }

        });
        var chart = AmCharts.makeChart("task_hours_and_burnt", {
            "type": "serial",
            "theme": "none",
            "dataProvider": [{
                "country": "USA",
                "visits": 2025
            }, {
                "country": "India",
                "visits": 984
            }, {
                "country": "South Korea",
                "visits": 443
            }, {
                "country": "Canada",
                "visits": 441
            }, {
                "country": "Brazil",
                "visits": 395
            }],
            "valueAxes": [{
                "gridColor": "#FFFFFF",
                "gridAlpha": 0.2,
                "dashLength": 0
            }],
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillAlphas": 0.8,
                "lineAlpha": 0.2,
                "type": "column",
                "valueField": "visits"
            }],
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "country",
            "categoryAxis": {
                "gridPosition": "start",
                "gridAlpha": 0,
                "tickPosition": "start",
                "tickLength": 20
            },
            "export": {
                "enabled": true
            }

        });
        var chart = AmCharts.makeChart("logged_users_hours", {
            "type": "serial",
            "theme": "none",
            "dataProvider": [{
                "country": "USA",
                "visits": 2025
            }, {
                "country": "India",
                "visits": 984
            }, {
                "country": "South Korea",
                "visits": 443
            }, {
                "country": "Canada",
                "visits": 441
            }, {
                "country": "Brazil",
                "visits": 395
            }],
            "valueAxes": [{
                "gridColor": "#FFFFFF",
                "gridAlpha": 0.2,
                "dashLength": 0
            }],
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillAlphas": 0.8,
                "lineAlpha": 0.2,
                "type": "column",
                "valueField": "visits"
            }],
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "country",
            "categoryAxis": {
                "gridPosition": "start",
                "gridAlpha": 0,
                "tickPosition": "start",
                "tickLength": 20
            },
            "export": {
                "enabled": true
            }

        });


        $(document).ready(function () {

            $("#rrm-Mode-Phone").hide();
            $("#rrm-Mode-Skype").hide();
            $("#rrm-Mode-Gtm").hide();
            $("#interview-save").hide();
            $("#rrm-status-1").hide();
            $("#rrm-status-2").hide();
            $("#rrm-status-3").hide();
            $("#rrm-status-button-1").show();
            $("#rrm-status-button-2").show();
            $("#rrm-status-button-3").show();
            $("#txt-rrm-CandidatePhoneNumber").hide();
            $("#txt-rrm-CandidateSkypeId").hide();
            $("#txt-rrm-CandidateGtmId").hide();
            $("#div-rrm-Interview-card-detail").hide();
            $("#button-hide-menuOut").hide();

            $("#txt-rrm-Interview-Datetime").focus(function () {
                $(this).attr({
                    type: 'datetime-local'
                });
            });
        });


        $("#cmb-rrm-InterviewMode").on('change', function () {

            if (this.value == 'Telephone') {

                $("#rrm-Mode-Phone").show();
                $("#rrm-Mode-Skype").hide();
                $("#rrm-Mode-Gtm").hide();
                $("#txt-rrm-CandidatePhoneNumber").show();
                $("#txt-rrm-CandidateSkypeId").hide();
                $("#txt-rrm-CandidateGtmId").hide();

            } else if (this.value == 'Skype' || this.value == 'Machine') {
                $("#rrm-Mode-Phone").hide();
                $("#rrm-Mode-Skype").show();
                $("#rrm-Mode-Gtm").hide();
                $("#txt-rrm-CandidatePhoneNumber").hide();
                $("#txt-rrm-CandidateSkypeId").show();
                $("#txt-rrm-CandidateGtmId").hide();
            } else if (this.value == 'GTM') {
                $("#rrm-Mode-Phone").hide();
                $("#rrm-Mode-Skype").hide();
                $("#rrm-Mode-Gtm").show();
                $("#txt-rrm-CandidatePhoneNumber").hide();
                $("#txt-rrm-CandidateSkypeId").hide();
                $("#txt-rrm-CandidateGtmId").show();
            } else {
                $("#rrm-Mode-Phone").hide();
                $("#rrm-Mode-Skype").hide();
                $("#rrm-Mode-GTM").hide();
                $("#txt-rrm-CandidatePhoneNumber").hide();
                $("#txt-rrm-CandidateSkypeId").hide();
                $("#txt-rrm-CandidateGtmId").hide();
            }
        });

        function btn_rfpAssignOnClick() {
            var rfpassignedlead = $("#cmb-rfpAssign").val()
            var selectedRfp = $("#hdn-selectedRfpid").val()
            if (rfpassignedlead != 1) {
                $("#rfp_" + selectedRfp).remove()
            } else {
                $("#rfpstatus_" + selectedRfp).text("Assigned");
            }
            $("#modal-Assignrfp").modal('hide');
        }

        $(document).ready(function () {
            $(".assignRfp").click(function () {
                var selectedrfp = $(this).attr("data-rfpid")
                $("#hdn-selectedRfpid").val(selectedrfp)
                $("#modal-Assignrfp").modal('show');
            })
        })

        $(document).ready(function () {
            $(".assignRrm").click(function () {
                var selectedrrmp = $(this).attr("data-rrmid")
                $("#hdn-selectedRrm").val(selectedrrmp)
                $("#modal-Assignrrm").modal('show');
            })
        })

        $(document).ready(function () {
            $(".assignRrm").click(function () {
                $("#modal-Assignrrm").modal('show');
                var selectRfp = $(this).attr("data-rrmid");
                var client_name = $("#rfp_" + selectRfp + " .clientname").html();
                var BDE = $("#rfp_" + selectRfp + " .bde").html();
                var BDE_lead = $("#rfp_" + selectRfp + " .bde_Lead").html();
                $(".clientInput").val(client_name);
                $(".bdeInput").val(BDE).fadeOut;
                $(".bde_LeadInput").val(BDE_lead).fadeOut;

                var clientvalue = $(".clientInput").val();
                if (clientvalue != null) {
                    $(".clientInput").attr("disabled", true);
                }
                if (clientvalue != null) {
                    $(".BDEInput").attr("disabled", true);
                }
                if (clientvalue != null) {
                    $(".BDE_LeadInput").attr("disabled", true);
                }

            })
        })

        function btn_rrmAssignOnClick() {
            var selectrrm = $("#hdn-selectedRrm").val()
            if (selectrrm > 0) {
                $("#rfpstatus_" + selectrrm).text("RRM");
            }
            $("#modal-Assignrrm").modal('hide');
        }

        $(document).ready(function () {
            $(".submitproposal").click(function () {
                $("#modal-submitproposal").modal('show');
            })
        })

        function btn_submitOnClick() {
            $("#modal-submitproposal").modal('hide');
            alert("Proposal is submitted successfully.");
            $(".assignRfp").attr("disabled", true);


        }
 
        var chartdataarr = [];
        var NoOfHours = 0;

        renderchart();
        $("#btn-SubmitAction").click(function () {
            renderchart();
            $('#NoOfHours').val('');
        });

        function renderchart() {
            var loopvar = 0;

            var TaskActionVariable = $("#Action").val();
            var TaskHoursVariable = $("#NoOfHours").val();
            NoOfHours = NoOfHours + parseFloat(TaskHoursVariable);

            for (var i = 0; i < chartdataarr.length; i++) {
                if (chartdataarr[i].sector == "No task") {
                    chartdataarr.splice(i, 1);
                    chartdataarr.push({
                        "sector": "No task",
                        "size": remtask
                    });
                }
            }
            if (TaskHoursVariable > 0) {
                chartdataarr.push({
                    "sector": TaskActionVariable,
                    "size": TaskHoursVariable
                });
            }
            ////console.log(chartdataarr);


            var chart = AmCharts.makeChart("chartContainer", {
                "hideCredits": true,
                "type": "pie",
                "theme": "light",
                "dataProvider": [],
                "valueField": "size",
                "titleField": "sector",
                "startDuration": 0,
                "innerRadius": 80,
                "labelsEnabled": false,
                "pullOutRadius": 20,
                "marginTop": 10,
                "legend": {
                    "markerType": "circle",
                    "position": "right",
                    "autoMargins": true,
                    "position": "static",
                    "truncateLabels": 25,
                    divId: "legenddiv"
                },
                "titles": [{
                    "text": ""
                }],
                "allLabels": [{
                    "y": "54%",
                    "align": "center",
                    "size": 25,
                    "bold": true,
                    "text": NoOfHours,
                    "color": "#555"
                }, {
                    "y": "49%",
                    "align": "center",
                    "size": 15,
                    "text": "Worked Hours",
                    "color": "#555"
                }],
                "listeners": [{
                    "event": "init",
                    "method": function (e) {
                        var chart = e.chart;

                        function getCurrentData() {
                            var data = chartdataarr;
                            return data;
                        }

                        function loop() {
                            var data = getCurrentData();
                            chart.animateData(data, {
                                duration: 1000,
                                complete: function () {
                                    if (loopvar == 0) {
                                        loop();
                                        loopvar = 1;
                                    }
                                }
                            });
                        }
                        loop();
                    }
                }],
                "export": {
                    "enabled": true
                }
            });

        }

        function ListOfAction() {
            html1 = '<div class="table-responsive"> ';
            html1 = '<table class="table table-striped"> ';
            html1 += '<thead>';
            html1 += '<tr>';
            html1 += '<td>';
            html1 += 'S.No';
            html1 += '</td>';
            html1 += '<td>';
            html1 += 'Action';
            html1 += '</td>';
            html1 += '<td>';
            html1 += 'Time in Hours';
            html1 += '</td>';
            html1 += '<td>';
            html1 += 'Edit / Delete';
            html1 += '</td>';
            html1 += '</tr>';
            html1 += '</thead>';
            html1 += '</table>';
            html1 += '</div>';

            $("#div-ListOfActions-Modal").html(html1);
        }
  
        $("#btn-QuickAction-list").click(function () {
            $("#div-QuickActions-List").modal('show');
        });

       
        // ================== timesheet popup ========/
        function getTimesheet() {
            $("#modal-timesheet").modal('show');
        }
        // ================== /timesheet popup ========/

    
        $(function () {
            var d = new Date(),
                h = d.getHours(),
                m = d.getMinutes(),
                myday = d.getDate(),
                mymonth = d.getMonth() + 1,
                myyear = d.getFullYear();
            var ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12;
            h = h ? h : 12;
            if (h < 10) h = '0' + h;
            if (m < 10) m = '0' + m;
            $('.end').each(function () {
                $(this).attr({
                    'value': h + ':' + m + " " + ampm
                });
            });

            var day = ("0" + myday).slice(-2);
            var month = ("0" + (mymonth)).slice(-2);
            var today = (day) + "/" + (month) + "/" + d.getFullYear();


            if (mymonth < 10)
                mymonth = '0' + mymonth.toString();
            if (myday < 10)
                myday = '0' + myday.toString();
            var maxDate = myday + '/' + mymonth + '/' + myyear;
            $('.date-field').attr('max', maxDate);
            $('.date-field').attr('value', today);

        });


        var today = new Date();
        var beforedate = new Date();
        var priorDate = new Date(new Date().setDate(beforedate.getDate() - 30));

        $('.date-field').datepicker({
            format: 'dd/mm/yyyy',
            startDate: priorDate,
            endDate: 'today',
        });


        $('#FromTo-time .time').timepicker({
            step: 1,
            showDuration: true,
            timeFormat: 'g:i A',
            defaultTime: '10',
            startTime: '10',
            dynamic: false,
            dropdown: true,
            scrollbar: true,
        });

        var timeOnlyExampleEl = document.getElementById('FromTo-time');
        var timeOnlyDatepair = new Datepair(timeOnlyExampleEl);


        $('#FromTo-Time2 .time').timepicker({
            step: 1,
            showDuration: true,
            timeFormat: 'g:ia',
            defaultTime: '10',
            startTime: '10',
            dynamic: false,
            dropdown: true,
            scrollbar: true,
        });

        var timeOnlyExampleEl = document.getElementById('FromTo-Time2');
        var timeOnlyDatepair = new Datepair(timeOnlyExampleEl);

        // var profilePic = GetEmployeeProfilePicture();
        var Employee_id = localStorage.getItem("EmployeeID");
        var Employee_profilepic = imageFilesPath+Employee_id+'.png';
        if (Employee_profilepic != null) {
            $(".profile-pic").css("background-image", "url(" + Employee_profilepic + ")");
        }

        // Function call on expand div with common modal
function ResignDet(params) {
            // clone the html for modal
            let newhtml = $(params).parents("div").clone()
            let modalTitle = newhtml.find(".card-detail-title")[0].innerHTML
            newhtml.find(".modal-not-include").remove();
            newhtml.find(".expand-status").removeClass('expand-div');
            $('.common-modal-title').html(modalTitle) // Header of the Modal
            $('.common-modal-body').html(newhtml.html()) // Body of the modal
            $("#modal-commonModal").modal("show"); // Show Modal
        }

        function swal_confirm(config,cb){
            swal({
                title: config.title || "",
                text: config.text || "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        // console.log(true)
                        cb(true)
                    } else {
                        // console.log(false)
                        cb(false)
                    }
                });
        }


    /* Image Resize or Compress functionality 445 */
    //handleFiles(FileImagesource, quality, width, height, "jpeg or png", callbackfunction)
    /*handleFiles(this, 70, 400, 300, 'png', (dataUrl) => {
            document.getElementById('profile-img-tag1').src = dataUrl;
        });*/
    function handleFiles(source_img_obj, quality, maxWidth, maxHeight, output_format,cb)
    {
        var mime_type = "image/jpeg";
        if(typeof output_format !== "undefined" && output_format=="png"){
            mime_type = "image/png";
        }

        //var filesToUpload = document.getElementById('profile-img').files;
        //var file = filesToUpload[0];
        var file = source_img_obj.files[0];
        // Create an image
        var img = document.createElement("img");
        // Create a file reader
        var reader = new FileReader();
        // Set the image once loaded into file reader
        reader.onload = function(e)
        {
            img.src = e.target.result;

            var canvas = document.createElement("canvas");
            //var canvas = $("<canvas>", {"id":"testing"})[0];
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            var MAX_WIDTH = (maxWidth != "" ) ? maxWidth : 400;
            var MAX_HEIGHT = (maxHeight != "" ) ? maxHeight : 300;
            var width = img.width;
            var height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            var dataurl = canvas.toDataURL(mime_type, quality/100);

            cb(dataurl)
        }

        // Load files into file reader
        reader.readAsDataURL(file);
    }

    /* Image Resize or Compress functionality 445 */
