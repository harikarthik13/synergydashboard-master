EditRRMOnBoardForProfileEntryPoint = (function () {
    var _editRRMOnBoardForProfileEntry = {};
    var _addRRMForProfileEntry = {};
    //var CandidateProfileId;
    var ReturnCandidateId = null;
    var aadhar_number = null;
    var relocate_result = null;   
    //bind data
    _editRRMOnBoardForProfileEntry.RRMEntryProfileForm = function (CandidateProfileIdParam) {
        loadcandidatedetailsforms(rrmId);
        GetRRMMaritalStatusMaster();
        loadcountries();
        CandidateProfileId = CandidateProfileIdParam;
        callGetListAsync('GetCandidateProfilebyId', '{"IsActive":"True","CandidateProfilebyId":"' + CandidateProfileId + '","Token":"' + Token + '"}', function (getProfileData) {
            _editRRMOnBoardForProfileEntry.mapupdaterrmProfileListcomputeHTML(getProfileData);
        })
    }

    //bind data
    _editRRMOnBoardForProfileEntry.mapupdaterrmProfileListcomputeHTML = function (getProfileData) {
        if (getProfileData[0].Mobile == "") {

        }
        else {
            getProfileData.forEach(function (key, item) {
                CandidateId = key.CandidateId;
                if(key.IsFlagged){
                    $("#rrmonboardprofile-flaggedprofilereason").text(key.FlagReason)
                    $("#rrmonboardprofile-bannedprofilewarning").removeClass("hidden")
                    $("a.btnNext").hide();
                }
                else{
                    $("#btnOnBoardbanprofile").show();
                    $("#rrmonboardprofile-bannedprofilewarning").addClass("hidden")
                    $("#rrmonboardprofile-flaggedprofilereason").text(" ")
                    $("a.btnNext").show();
                }
                
                if(key.FirstName !=null){
                    $("#modelText").text("OnBoard - " + key.FirstName);
                }
                else{
                    $("#modelText").text("OnBoard");
                }
                $("#rrm_onboard_candidatename").dxTextBox("instance").option('value', key.FirstName);
                $("#rrm_onboard_candidatereferral").dxTextBox("instance").option('value',key.Referral);
                $("#rrm_onboard_candidatenoticeperiod").dxNumberBox("instance").option('value',key.NoticePeriod);
                $("#rrm_onboard_candidateTotalExperience").dxNumberBox("instance").option('value',key.TotalExperience);;
                $("#rrm_onboard_candidateemail").dxTextBox("instance").option('value', key.EmailId);
                $("#rrm_onboard_candidatephoneno").dxNumberBox("instance").option('value', key.Mobile);
                $("#rrm_onboard_candidatepassportno").dxTextBox("instance").option('value', key.PassPortNo);
                $("#rrm_onboard_candidateaadharno").dxNumberBox("instance").option('value', key.Aadhar);
                $("#rrm_onboard_candidatepanno").dxTextBox("instance").option('value', key.PANNo);
                $("#rrm_onboard_candidatewilling").dxSelectBox("instance").option('value', key.Relocate);
                var candidatewilling = $("#rrm_onboard_candidatewilling").dxSelectBox("instance");
                if (key.Relocate == true) {
                    relocate_result = 1;
                }
                else if(key.Relocate == false) {
                    relocate_result = 0;
                }
                candidatewilling.option("value", relocate_result);
                $("#rrm_onboard_candidatecommunication").dxSelectBox("instance").option('value', key.CommunicationRatingHR);
                var communication = $("#rrm_onboard_candidatecommunication").dxSelectBox("instance");
                communication.option("value", key.CommunicationRatingHR);
                 
                $("#rrm_onboard_native").dxTextBox("instance").option('value', key.Native);
                //address details
                $("#rrm_onboard_candidateaddress").dxTextBox("instance").option('value', key.Address);
                $("#rrm_onboard_candidatecountry").dxSelectBox("instance").option('value', key.CountryId);
                var candidatecountry = $("#rrm_onboard_candidatecountry").dxSelectBox("instance");
                candidatecountry.option("value", key.CountryId);
                if (key.CountryId)
                {
                    loadRRMstate(key.CountryId);
                }
                $("#rrm_onboard_candidatepstate").dxSelectBox("instance").option('value', key.StateId);
                var candidatepstate = $("#rrm_onboard_candidatepstate").dxSelectBox("instance");
                candidatepstate.option("value", key.StateId);
                if (key.StateId)
                {
                    loadRRMcities(key.StateId);
                }
                $("#rrm_onboard_candidatecity").dxSelectBox("instance").option('value', key.CityId);
                var candidatepcity = $("#rrm_onboard_candidatecity").dxSelectBox("instance");
                candidatepcity.option("value", key.CityId);

                $("#rrm_onboard_candidatepincode").dxTextBox("instance").option('value', key.PostalCode);
                //document upload
                //$("#banonboardtxtareaComments").dxHtmlEditor("instance").option('value', key.Comments);
                //additional information 
                $("#rrm_onboard_candidateskype").dxTextBox("instance").option('value', key.Skype);
                $("#rrm_onboard_candidatelinkedin").dxTextBox("instance").option('value', key.LinkedIn);
                $("#rrm_onboard_candidategithub").dxTextBox("instance").option('value', key.GitHub);
                $("#rrm_onboard_candidateurl").dxTextBox("instance").option('value', key.Url);
                $("#rrm_onboard_candidatefathername").dxTextBox("instance").option('value', key.FatherName);
                $("#rrm_onboard_candidatedob").dxDateBox("instance").option('value', key.DateOfBirth);
                $("#rrm_onboard_candidatemaritalstatus").dxSelectBox("instance").option('value', key.MaritalStatusId); 
                var candidatemaritalstatus = $("#rrm_onboard_candidatemaritalstatus").dxSelectBox("instance");
                candidatemaritalstatus.option("value", key.MaritalStatusId);
                if (key.MaritalStatusId)
                {
                    GetRRMMaritalStatusMaster(key.MaritalStatusId);
                }
                
               

                if(key.DocumentId){
                    $("#rrm_onboard_profile-divShowFileUploader").addClass("hidden");
                    $("#rrm_onboard_profile-divShowResumeDownloader").removeClass("hidden");
                    resumeDownload = "<button class='btn btn-md btn-default' id='RRMOnBoardcandidateresumedownload' onclick=downloadProfileResume('"+key.DocumentId+"')><span>Download Resume  &nbsp;</span><i class='fa fa-download' aria-hidden='true'></i></button> &nbsp;&nbsp;<button type='button' onclick='RemoveReplaceResume()' class='btn btn-xs btn-danger'><span class='fa fa-close'></span></button>"
                    $("#rrm_onboard_profile-existingResumeDownload").html(resumeDownload);
                }
                else{
                    $("#rrm_onboard_profile-divShowFileUploader").removeClass("hidden");
                    $("#rrm_onboard_profile-divShowResumeDownloader").addClass("hidden");
                    $("#rrm_onboard_profile-existingResumeDownload").html("");
                }
            });
        }
    }

    //tab next click function
    _editRRMOnBoardForProfileEntry.toggleTabRRMOnBoardProfile = function () {
        var activeTab = $('#rrmonboardprofiletab').find('li.active').attr('id');
        //conatact details  
        if (activeTab == "rrm_onboard_candidatecontactTab") {
            //UI Values
            CandidateName = $("#rrm_onboard_candidatename").dxTextBox("instance").option('value');
            candidateEmailId = $("#rrm_onboard_candidateemail").dxTextBox("instance").option('value');
            candidatePhoneNo = $("#rrm_onboard_candidatephoneno").dxNumberBox("instance").option('value');
            candidateAadharNo = $("#rrm_onboard_candidateaadharno").dxNumberBox("instance").option('value');
            candidatePanNo = $("#rrm_onboard_candidatepanno").dxTextBox("instance").option('value');
            candidatePassportNo = $("#rrm_onboard_candidatepassportno").dxTextBox("instance").option('value');
            willingtorelocate = $("#rrm_onboard_candidatewilling").dxSelectBox("instance").option('value');
            commuunication = $("#rrm_onboard_candidatecommunication").dxSelectBox("instance").option('value');
            candidateNoticePeriod = $("#rrm_onboard_candidatenoticeperiod").dxNumberBox("instance").option('value'); 
            candidateReferral = $("#rrm_onboard_candidatereferral").dxTextBox("instance").option('value');
            candidateTotalExperience = $("#rrm_onboard_candidateTotalExperience").dxNumberBox("instance").option('value');
            native = $("#rrm_onboard_native").dxTextBox("instance").option('value');
            //validate not null fields
            if (CandidateId == "" || CandidateId == undefined) {
                CandidateId = null;
            }
            if (candidateEmailId == "" || candidatePhoneNo == "" || candidatePhoneNo == null|| ((candidatePassportNo == "" ||candidatePassportNo == null) && (candidateAadharNo == "" || candidateAadharNo == null)&&(candidatePanNo == "" ||candidatePanNo == null)) ||candidatePanNo == "0" || CandidateName == "" || willingtorelocate === " " || commuunication == null || candidateNoticePeriod == null || candidateNoticePeriod == ""|| candidateTotalExperience==="" || candidateTotalExperience==null) {
                if (CandidateName == "" || CandidateName == undefined) {
                    $('#rrm_onboard_candidatename').addClass('input-error');
                    $('#rrm_onboard_candidatenameerror').html("Candidate Name is required");
                }
                else {
                    $('#rrm_onboard_candidatename').removeClass('input-error');
                    $('#rrm_onboard_candidatenameerror').html("");
                }
                if (candidateEmailId == "" || candidateEmailId == undefined) {
                    $('#rrm_onboard_candidateemail').addClass('input-error');
                    $('#rrm_onboard_candidateemailerror').html("Email is required");
                }
                else {
                    $('#rrm_onboard_candidateemail').removeClass('input-error');
                    $('#rrm_onboard_candidateemailerror').html("");
                }
                if (candidatePhoneNo == "" || candidatePhoneNo == undefined) {
                    $('#rrm_onboard_candidatephoneno').addClass('input-error');
                    $('#rrm_onboard_candidatephonenoerror').html("Phone Number is required");
                }
                else {
                    $('#rrm_onboard_candidatephoneno').removeClass('input-error');
                    $('#rrm_onboard_candidatephonenoerror').html("");
                }
                // if (candidateAadharNo == "" || candidateAadharNo == undefined) {
                //     $('#rrm_onboard_candidateaadharno').addClass('input-error');
                //     $('#rrm_onboard_candidateaadharnoerror').html("Please Enter Candidate Aadhar Number");
                // }
                // else {
                //     $('#rrm_onboard_candidateaadharno').removeClass('input-error');
                //     $('#rrm_onboard_candidateaadharnoerror').html("");
                // }
                if (willingtorelocate == "" || willingtorelocate == undefined) {
                    $('#rrm_onboard_candidatewilling').addClass('input-error');
                    $('#rrm_onboard_candidatewillingerror').html("Please Select Yes/ No in Willing to Relocate");
                }
                else {
                    $('#rrm_onboard_candidatewilling').removeClass('input-error');
                    $('#rrm_onboard_candidatewillingerror').html("");
                }
                debugger;
                if((candidatePassportNo == "" ||  candidatePassportNo == null|| candidatePassportNo == undefined)
                 && (candidateAadharNo == null || candidateAadharNo == "" || candidateAadharNo == undefined) 
                 && (candidatePanNo == null || candidatePanNo == "" || candidatePanNo == undefined)){
                    $('#rrm_onboard_candidateaadharno').addClass('input-error');
                    $('#rrm_onboard_candidatepassportnoerror').html("Please Enter Candidate Passport number/Pan number/Aadhar number");
                }
                else {
                    $('#rrm_onboard_candidateaadharno').removeClass('input-error');
                    $('#rrm_onboard_candidatepassportnoerror').html("");
                }
                if (willingtorelocate === " " || willingtorelocate == undefined) {
                    $('#rrm_onboard_candidatewilling').addClass('input-error');
                    $('#rrm_onboard_candidatewillingerror').html("Choose an option");
                 }
                 else {
                     $('#rrm_onboard_candidatewilling').removeClass('input-error');
                     $('#rrm_onboard_candidatewillingerror').html("");
                }
                    if (commuunication == "" || commuunication == undefined) {
                        $('#rrm_onboard_candidatecommunication').addClass('input-error');
                        $('#rrm_onboard_candidatecommunicationerror').html("Choose an option");
                    }
                    else {
                        $('#rrm_onboard_candidatecommunication').removeClass('input-error');
                        $('#rrm_onboard_candidatecommunicationerror').html("");
                    }
                    if (candidateNoticePeriod == "" || candidateNoticePeriod == null) {
                        $('#rrm_onboard_candidatenoticeperiod').addClass('input-error');
                        $('#rrm__onboardcandidatenoticeperioderror').html("Notice period is required");
                    }
                    else {
                        $('#rrm_onboard_candidatecommunication').removeClass('input-error');
                        $('#rrm__onboardcandidatenoticeperioderror').html("");
                    }

                    if (candidateTotalExperience===""||candidateTotalExperience === " " || candidateTotalExperience == null) {
                        $('#rrm_onboard_candidateTotalExperience').addClass('input-error');
                        $('#rrm_onboard_candidateTotalExperienceerror').html("Total Experience is required");
                    }
                    else {
                        $('#rrm_onboard_candidateTotalExperiencederror').removeClass('input-error');
                        $('#rrm_onboard_candidateTotalExperienceerror').html("");
                    }
                $('.nav-tabs a[href="#rrm_OnBoardCandidateContactDetails"]').tab("show");
                $(".btnPrevious").hide();
                $(".saveFamilyBtn").hide();
                $("a.btnNext").show();
            }
            else {
                $(".error_message").html("");
                dataResource = {
                    "Method": "PostRRMOnBoardCandidates",
                    "Data": {
                        "Token": Token,
                        "CandidateName": CandidateName,
                        "CandidateId": CandidateId,
                        "Aadhar": candidateAadharNo,
                        "Mobile": candidatePhoneNo,
                        "EmailID": candidateEmailId,
                        "PassPortNo": candidatePassportNo,
                        "PANNo": candidatePanNo,
                        "ReturnCandidateId": ReturnCandidateId,
                        "NoticePeriod":candidateNoticePeriod,
                        "Referral":candidateReferral,
                        "TotalExperience":candidateTotalExperience,
                        "Tags": null,
                        "Native": native,
                        "Relocate": willingtorelocate,
                        "CommunicationRatingHR": commuunication,
                        "IsActive": "True"
                    }
                }

                //var resultResorce = PostDataCall(dataResource);
                PostDataCallAsync(dataResource, function (resultResorce) {
                    if (resultResorce.IsSuccess == true) {
                        if (resultResorce.Data[0] != undefined) {
                            if (resultResorce.Data[0].CandidateId != "" || resultResorce.Data[0].CandidateId != undefined) {
                                CandidateId = resultResorce.Data[0].CandidateId;
                            }
                        }
                        $('.nav-tabs a[href="#rrm_OnBoardcandidateinformationTab"]').tab("show");
                        $(".btnPrevious").show();
                        $("a.btnSaveAndContinue").show();
                        $("a.saveFamilyBtn").hide();
                        $("a.btnNext").show();
                    }
                    if (resultResorce.IsSuccess == false) {
                        if(resultResorce.Message.includes("UK_Candidates_Mobile")){
                            swal({
                                title: "Phone Number already exist...",
                                text: "Please Change the Phone Number",
                                icon: "info",
                                buttons: true,
                                dangerMode: true,
                            })
                        }
                        else if(resultResorce.Message.includes("UK_Candidates_Aadhar")){
                            swal({
                                title: "Aadhar Number already exist...",
                                text: "Aadhar Number is already present in the database",
                                icon: "info",
                                buttons: true,
                                dangerMode: true,
                            })
                        }
                        else if(resultResorce.Message.includes("UK_Candidates_EmailId")){
                            swal({
                                title: "Email already exist...",
                                text: "Email is already present in the database",
                                icon: "info",
                                buttons: true,
                                dangerMode: true,
                            })
                        }
                        else if(resultResorce.Message.includes("UK_Candidates_PaNNo")){
                            swal({
                                title: "Pan Number already exist...",
                                text: "Pan Number is already present in the database",
                                icon: "info",
                                buttons: true,
                                dangerMode: true,
                            })
                        }
                        else if(resultResorce.Message.includes("UK_Candidates_PassPortNo")){
                            swal({
                                title: "Passport Number already exist...",
                                text: "Passport Number is already present in the database",
                                icon: "info",
                                buttons: true,
                                dangerMode: true,
                            })
                        }
                        else if(resultResorce.Message !=null){
                            swal({
                                title: resultResorce.Message,
                                text: resultResorce.Message,
                                icon: "info",
                                buttons: true,
                                dangerMode: true,
                            })
                        }
                        else{
                            var data = resultResorce.Message;
                            var getid = data.split(':')[1];
                            if (getid != null || getid != "" || getid != undefined) {
                                getid = getid.replace(/[$$]/g, '');
                                swal({
                                    title: "User already exist...",
                                    text: "Given Information exists in our records! Click above link to show the recored!...",
                                    icon: "info",
                                    buttons: true,
                                    dangerMode: true,
                                })
                                $("#bindexistingcandidates").html("<a href='#'>Given Information exists in our records! Click here to show the recored!...</a>");
                                $("#bindexistingcandidates").val(getid);
                                $("#bindexistingcandidates").removeClass("hidden");
                            }
                        }
                       
                    }
                });

            }
        }
        //additional information
        if (activeTab == "rrm_onboard_candidateinfoTab") {
            var readyForSave = true
            Skype = $("#rrm_onboard_candidateskype").dxTextBox("instance").option('value');
            LinkedIn = $("#rrm_onboard_candidatelinkedin").dxTextBox("instance").option('value');
            GitHub = $("#rrm_onboard_candidategithub").dxTextBox("instance").option('value');
            Url = $("#rrm_onboard_candidateurl").dxTextBox("instance").option('value');
            Father = $("#rrm_onboard_candidatefathername").dxTextBox("instance").option('value');
            DateOfBirth = $("#rrm_onboard_candidatedob").dxDateBox("instance").option('value');
            maritalstatusid = $("#rrm_onboard_candidatemaritalstatus").dxSelectBox("instance").option('value');

            if(maritalstatusid == null)
            {
                $("#rrm_onboard_candidatemaritalstatuserror").html("Please Select Marital Status");
                readyForSave = false;
               return;
            }
            else
            {
                $("#rrm_onboard_candidatemaritalstatuserror").html("");
                readyForSave = true;
            }
            if(DateOfBirth == null)
            {
                $("#rrm_onboard_candidatemaritaldoberror").html("Please Select Date of Birth");
                readyForSave = false;
                return;
            }
            else
            {
                
                $("#rrm_onboard_candidatemaritaldoberror").html("");
                readyForSave = true;
            }
            
           
            //if (AlternateMobile == undefined && AlternateEmail == undefined) {
            //    AlternateMobile = null;
            //    AlternateEmail = null;
            //}
            AlternateMobile = null;
            AlternateEmail = null;
            if(readyForSave == true){
            dataResource = {
                "Method": "PostRRMOnBoardCandidateAdditionalInformation",
                "Data": {
                    "Token": Token,
                    "CandidateId": CandidateId,
                    "AlternateMobile": AlternateMobile,
                    "AlternateEmail": AlternateEmail,
                    "Skype": Skype,
                    "GitHub": GitHub,
                    "LinkedIn": LinkedIn,
                    "Url": Url,
                    "maritalstatusid": maritalstatusid,
                    "DateOfBirth": DateOfBirth,
                    "Father": Father,
                    "IsActive": "True"
                }
            }

            //var resultResorce = PostDataCall(dataResource);
            PostDataCallAsync(dataResource, function (resultResorce) {
                // 
            });
            _editRRMOnBoardForProfileEntry.savedocsComments();
            // _editRRMOnBoardForProfileEntry.saveaudiofile();
            _editRRMOnBoardForProfileEntry.saveimagefile();
            $('.nav-tabs a[href="#rrm_OnBoardcandidateaddressdetail"]').tab("show");
            $(".btnPrevious").show();
            $("a.btnSaveAndContinue").show();
            $("a.saveFamilyBtn").hide();
            $("a.btnNext").show();
        }
    }
        //address tab
        if (activeTab == "rrm_onboard_candidateaddressTab") {
            Address = $("#rrm_onboard_candidateaddress").dxTextBox("instance").option('value');
            if ($("#rrm_onboard_candidatecity").dxSelectBox("instance").option('value') != null) {
                CityId = $("#rrm_onboard_candidatecity").dxSelectBox("instance").option('value');
            }
            else {
                CityId = null;
            }
            if ($("#rrm_onboard_candidatepstate").dxSelectBox("instance").option('value') != null) {
                StateId = $("#rrm_onboard_candidatepstate").dxSelectBox("instance").option('value');
            }
            else {
                StateId = null;
            }
            if ($("#rrm_onboard_candidatecountry").dxSelectBox("instance").option('value') != null) {
                CountryId = $("#rrm_onboard_candidatecountry").dxSelectBox("instance").option('value');
            }
            else {
                CountryId = null;
            }
            PostalCode = $("#rrm_onboard_candidatepincode").dxTextBox("instance").option('value');


            if (Address == null || Address == '') {
                $("#rrm_onboard_candidateaddresserror").html("Please enter Address")
                readyForSave = false;
            }
            else {
                $("#rrm_onboard_candidateaddresserror").html("")
                readyForSave = true;
            }

            if (CountryId == null) {
                $("#rrm_onboard_candidatecountryerror").html("Please Select Country")
                readyForSave = false;
            }
            else {
                $("#rrm_onboard_candidatecountryerror").html("")
                readyForSave = true;
            }

            if (StateId == null) {
                $("#rrm_onboard_candidatestateerror").html("Please Select State")
                readyForSave = false;
            }
            else {
                $("#rrm_onboard_candidatestateerror").html("")
                readyForSave = true;
            }

            if (CityId == null ) {
                $("#rrm_onboard_candidatecityerror").html("Please Select City")
                readyForSave = false;
            }
            else {
                $("#rrm_onboard_candidatecityerror").html("")
                readyForSave = true;
            }

            if (readyForSave == true) {
            dataResource = {
                "Method": "PostRRMOnBoardCandidateAddress",
                "Data": {
                    "Token": Token,
                    "CandidateId": CandidateId,
                    "Name": Address,
                    "Address": Address,
                    "CountryId": CountryId,
                    "StateId": StateId,
                    "CityId": CityId,
                    "PostalCode": PostalCode,
                    "IsActive": "True"
                }
            }

            //var resultResorce = PostDataCall(dataResource);
            PostDataCallAsync(dataResource, function (resultResorce) {
                if(resultResorce['IsSuccess'] == false)
                {
                    swal({
                    title: "Error",
                    text:  resultResorce['Message'],
                    icon: "error",
                    buttons: true,
                })
            }else{
                $('.nav-tabs a[href="#rrm_OnBoardEmployerDetails"]').tab("show");
                $(".btnPrevious").show();
                $("a.btnSaveAndContinue").show();
                $("a.saveFamilyBtn").hide();
                $("a.btnNext").show();
                _editRRMOnBoardForProfileEntry.GetPreviousEmployersForCandidate();
            }

            });
        }
        }
        //employer details
        if (activeTab == "rrm_onboard_employerdetailsTab") {
            var workHistorydata = $("#onboard_gridContainer").dxDataGrid("instance").option("dataSource");
            // if (workHistorydata.length == 0) {
            //     $(".gridContainer_status").addClass("data_error");
            //     //$(".gridContainer_status").html("Please Add Employer Details");
            //     swal({
            //         title: "Warning!",
            //         text: "Please Add Employer Details",
            //         icon: "warning",
            //         button: "ok!",
            //     })
            // }
            // else {
                $(".gridContainer_status").removeClass("data_error");
                $(".gridContainer_status").html("");
                nextFlag = true;
                $('.nav-tabs a[href="#rrm_OnBoardCandidateCareerDetails"]').tab("show");
                $(".btnPrevious").show();
                $("a.btnNext").show();
                $("a.btnSaveAndContinue").show();
                $(".saveFamilyBtn").hide();
                _editRRMOnBoardForProfileEntry.getSkillsDetails();
            // }
        }
        //career details
        if (activeTab == "rrm_onboard_candidateCareerTab") {
            var griddata = $("#onboard_display_Skillsprofile").dxDataGrid("instance").option("dataSource");
            //validate not null fields

            if (griddata.length == 0) {
                $('.skillset_status').addClass('data_error');
                $('.display_Skillsprofile_status').addClass('data_error');
                swal({
                    title: "Warning!",
                    text: "Please Add Skillset Details",
                    icon: "warning",
                    button: "ok!",
                })
            }else {
                $('.nav-tabs a[href="#rrm_OnBoardEmployeeProfile"]').tab("show");
                $("a.btnNext").hide();
                $("a.btnPrevious").show();
                $("a.btnSaveAndContinue").show();
                $(".saveFamilyBtn").hide();
            }
        }
        if (activeTab == "rrm_OnBoard_EmployeeProfileTab") {
            // $('.nav-tabs a[href="#rrm_OnBoardDetails"]').tab("show");
            $("a.btnNext").hide();
            $("a.btnPrevious").show();
            $("a.btnSaveAndContinue").hide();
            $(".saveFamilyBtn").hide();
        }
        
        resetSimpleBarProfileEntryPoints();
    }

    //uploade employeer details in grid
    _editRRMOnBoardForProfileEntry.GetPreviousEmployersForCandidate = function () {

        var filter_val = JSON.stringify({
            "CandidateId ": CandidateId,
            "IsActive": "True",
            "Token": Token
        });

        callGetListAsync('GetPreviousEmployersForRRMOnBoardCandidateByCandidateId', filter_val, function (e) {
            GetPreviousEmployer = e;
            _editRRMOnBoardForProfileEntry.renderemployerGrid(GetPreviousEmployer);
        })
    }

    //uploade employeer details in grid source
    _editRRMOnBoardForProfileEntry.renderemployerGrid = function () {
        var dataGrid = $("#onboard_gridContainer").dxDataGrid({
            dataSource: GetPreviousEmployer
        });
    }

    //get candidate skilldetails
    _editRRMOnBoardForProfileEntry.getSkillsDetails = function () {
        var filter_val = JSON.stringify({
            "CandidateId ": CandidateId,
            "IsActive": "True",
            "Token": Token
        });

        callGetListAsync('GetRRMOnBoardCandidateSkillMappingsbyCandidateId', filter_val, function (e) {
            GetCandidateSkillList = e;
            _editRRMOnBoardForProfileEntry.renderaddskillGrid(GetCandidateSkillList);
        })

    }
    //uploade employeer details in grid source
    _editRRMOnBoardForProfileEntry.renderaddskillGrid = function (GetCandidateSkillList) {
    //    $("#onboard_display_Skillsprofile").dxDataGrid('instance').option('dataSource',GetCandidateSkillList);
        $("#onboard_display_Skillsprofile").dxDataGrid({
            dataSource: GetCandidateSkillList,
            keyExpr: "CandidateSkillMappingId",
            showBorders: true,
            paging: {
                enabled: false
            },
           
            columns: [
                {
                    dataField: "CandidateSkillMappingId",
                    visible: false,
                    // allowEditing: true,
                    // allowAdding: true
                },
                {
                    caption: "Grade", dataField: "SkillGradeName"
                    
                },
                {
                    dataField: "SkillFamilieName",
                    caption: "Family",
                   
                },
                {
                    caption: "Skills", dataField: "skillName",
                  
                },
                {
                    caption: "Versions", dataField: "SkillVersion",

                },
                {
                    caption: "Exp (in years)",
                    dataField: "SkillExperience",
                    dataType: "number"
                },
                {
                    caption: "Rating",
                    dataField: "Rating",
                    dataType: "number"
                },
            ],
        
        });


    }

  
    //tab previous click function 
    _editRRMOnBoardForProfileEntry.toggleTabRRMOnBoardPrevious = function () {
        var activeTab = $('#rrmonboardprofiletab').find('li.active').attr('id')
        
        if (activeTab == "rrm_onboard_candidateinfoTab") {
            $('.nav-tabs a[href="#rrm_OnBoardCandidateContactDetails"]').tab("show");
            $(".btnPrevious").hide();
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
            $("a.btnSaveAndContinue").hide();
        }
        if (activeTab == "rrm_onboard_candidateaddressTab") {
            $('.nav-tabs a[href="#rrm_OnBoardcandidateinformationTab"]').tab("show");
            $(".btnPrevious").show();
            $("a.btnNext").show();
            $("a.saveFamilyBtn").hide();
            $("a.btnSaveAndContinue").hide();
        }
        if (activeTab == "rrm_onboard_employerdetailsTab") {
            $('.nav-tabs a[href="#rrm_OnBoardcandidateaddressdetail"]').tab("show");
            $(".btnPrevious").show();
            $("a.btnNext").show();
            $("a.saveFamilyBtn").hide();
            $("a.btnSaveAndContinue").hide();
        }
        if (activeTab == "rrm_onboard_candidateCareerTab") {
            $('.nav-tabs a[href="#rrm_OnBoardEmployerDetails"]').tab("show");
            $("a.btnPrevious").show();
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
            $("a.btnSaveAndContinue").hide();
        }
        if (activeTab == "rrm_OnBoard_EmployeeProfileTab") {
            $('.nav-tabs a[href="#rrm_OnBoardCandidateCareerDetails"]').tab("show");
            $("a.btnPrevious").show();
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
            $("a.btnSaveAndContinue").hide();
        }
        // if (activeTab == "rrm_onboardTab") {
        //     $('.nav-tabs a[href="#rrm_OnBoardEmployeeProfile"]').tab("show");
        //     $("a.btnPrevious").show();
        //     $("a.btnNext").show();
        //     $(".saveFamilyBtn").hide();
        //     $("a.btnSaveAndContinue").hide();
        // }
       
        resetSimpleBarProfileEntryPoints();
    }

    //post employer details
    _editRRMOnBoardForProfileEntry.saveEmployer = function (details) {
        var EmployerId;
        if(details.data.EmployerId == undefined || details.data.EmployerId == null){
            EmployerId = null;
        }
        else{
            EmployerId = details.data.EmployerId
        }
        dataSourceSaveEmployer = {
            "Method": "PostRRMOnBoardPreviousEmployersForCandidate",
            "Data": {
                "Token": Token,
                "CandidateId": CandidateId,    
                "EmployerId":EmployerId,            
                "EmployerName": details.data.EmployerName,
                "FromDate": details.data.FromDate,
                "ToDate": details.data.ToDate,
                "Experience": null,
                "Designation": details.data.Designation,
                "Location": details.data.Location,
                "ReasonForLeaving": details.data.ReasonForLeaving,
                "IsActive": true
            }
        }
        // var resultResorce = PostDataCall(dataResource);
        PostDataCallAsync(dataSourceSaveEmployer, function (e) {
            candidateIdForSkillAndWorkExperience = CandidateId;
            getRRMRRMProfileEntryEmployerTables();
        })
        
    }

    //post employer details
    _editRRMOnBoardForProfileEntry.updateEmployer = function (details) {
        var EmployerId;
        if(details.data.EmployerId == undefined || details.data.EmployerId == null){
            EmployerId = null;
        }
        else{
            EmployerId = details.data.EmployerId
        }
        dataSourceSaveEmployer = {
            "Method": "PostRRMOnBoardPreviousEmployersForCandidate",
            "Data": {
                "Token": Token,
                "CandidateId": CandidateId,    
                "EmployerId":EmployerId,            
                "EmployerName": details.data.EmployerName,
                "FromDate": details.data.FromDate,
                "ToDate": details.data.ToDate,
                "Experience": null,
                "Designation": details.data.Designation,
                "Location": details.data.Location,
                "ReasonForLeaving": details.data.ReasonForLeaving,
                "IsActive": true
            }
        }
        // var resultResorce = PostDataCall(dataResource);
        PostDataCallAsync(dataSourceSaveEmployer, function (e) {
            candidateIdForSkillAndWorkExperience = CandidateId;
            getRRMRRMProfileEntryEmployerTables();
        })
    }

    //delete post employer details
    _editRRMOnBoardForProfileEntry.deleteEmployer = function (details) {
        dataSourceSaveEmployer = {
            "Method": "DeletePreviousEmployersFORRRMOnBoardCandidate",
            "Data": {
                "Token": Token,
                "EmployerId": details.data.EmployerId,
                "IsActive": false
            }
        }
        // var resultResorce = PostDataCall(dataResource);
        PostDataCallAsync(dataSourceSaveEmployer, function (e) {
            candidateIdForSkillAndWorkExperience = CandidateId;
            getRRMRRMProfileEntryEmployerTables();
        })
    }


    //post candidate skill details
    _editRRMOnBoardForProfileEntry.uploadSkill = function (details) {
        var skill_version = details.data.SkillVersionId;
        if (skill_version == "") { skill_version = null }
        var family = details.data.SkillFamilieId;
        var skill = details.data.skillId;
        var skillGrade = details.data.SkillGradeId;
        var CandidateSkillMappingId = null;
        var SkillExperience = details.data.SkillExperience;
        var Rating = details.data.Rating;

        if(details.data.CandidateSkillMappingId != null && details.data.CandidateSkillMappingId != undefined){
            CandidateSkillMappingId = details.data.CandidateSkillMappingId
        }
        if (family == "" || skill == "") {

            if (family == "") {
                $('#familyprofile_error').html("Select Family");
                $('#familyprofile').addClass('input-error');
            } else {
                $('#familyprofile_error').html("");
                $('#familyprofile').removeClass('input-error');
            }
            if (skill == "") {
                $('#skillprofile_error').html("Select Skills");
                $('#skillprofile').addClass('input-error');
            } else {
                $('#skillprofile_error').html(" ");
                $('#skillprofile').removeClass('input-error');
            }
        }

        if (family != "" && skill != "") {
            $('#familyprofile_error').html("");
            $('#familyprofile').removeClass('input-error');
            $('#skillprofile_error').html(" ");
            $('#skillprofile').removeClass('input-error');

            var data = [];
            {
                data = {
                    "Method": "PostRRMOnBoardCandidatesSkills",
                    "Data":
                    {
                        "Token": Token,
                        "CandidateId": CandidateId,
                        "CandidateSkillMappingId": CandidateSkillMappingId,
                        "SkillFamilyId ": family,
                        "SkillId": skill,
                        "SkillVersionId ": skill_version,
                        "SkillGradeId": skillGrade,
                        "Experience": SkillExperience,
                        "Rating":Rating
                    }
                }
            }

            candidateIdForSkillAndWorkExperience = CandidateId

            // var postCall = PostDataCall(data);
            PostDataCallAsync(data, function (postCall) {
                $(".skillset_status").attr("class", "skillset_status");
                $(".skillset_status").html("");
                $(".skillset_status").show();
                if(postCall['IsSuccess'] == false)
                {
                    swal({
                    title: "Error",
                    text:  postCall['Message'],
                    icon: "error",
                    buttons: true,
                    
                });
                getRRMRRMProfileEntrySkillTables();
            }else{
                getRRMRRMProfileEntrySkillTables();
            }

                // if (postCall['IsSuccess'] == true) {

                //     //_addRRMForProfileEntry.getSkillsDetails();
                // }
                
            });
            setTimeout(function () {
                $(".skillset_status").fadeOut("slow", function () {
                    $(".skillset_status").html("");
                });
            }, 10);
        }
        else {
            // not yet dsidded 
        }
    }
    
    _editRRMOnBoardForProfileEntry.deleteSkill = function(details){
        data = {
            "Method": "DeleteCandidateSkillMappingForRRMOnBoard",
            "Data": {
                "CandidateSkillId": details.data.CandidateSkillMappingId,
                "Token": Token,
                "IsActive": 0

            }
        }
        PostDataCallAsync(data, function (postCall) {
            candidateIdForSkillAndWorkExperience = CandidateId
            getRRMRRMProfileEntrySkillTables();
        });
    }

    //editskillmapping function
    $(document).on("click", ".editSkillMappingRRMProfile", function (e) {
        var skillId = $(e.currentTarget).data("rrmskillid");
        if (skillId != "" || skillId != undefined) {
            _addRRMForProfileEntry.editRow_SkillMapping(skillId);
        }
    })

    //deleteskillmapping function
    $(document).on("click", ".deleteSkillMappingRRMinadd", function (e) {
        var skillId = $(e.currentTarget).data("rrmskillid");
        if (skillId != "" && skillId != undefined) {
            _addRRMForProfileEntry.deleteRow_SkillMapping(skillId);
        }
    })

    //delete skill details
    _editRRMOnBoardForProfileEntry.deleteRow_SkillMapping = function (SkillId) {
        var localget = localStorage.getItem("UserCheckRes");
        var jsonData = JSON.parse(localget);
        Token = jsonData.Data[0].Token;
        if (confirm('Are you sure do you want to delete?')) {
            var skillId = SkillId;
            if ($("#SkillsetsBtnEntry").attr("data-id")) {
                var dataId = $("#SkillsetsBtnEntry").attr("data-id");
                if (dataId == skillId) {
                    if ($.trim($("#familyentry")) != "") {
                        $("#familyentry").val("");
                    }
                    if ($.trim($("#skillentry")) != "") {
                        $("#skillentry").val("");
                    }
                    if ($.trim($("#skillversionentry")) != "") {
                        $("#skillversionentry").val("");
                    }
                    jQuery("#SkillsetsBtnEntry").attr("onclick", "insert_SkillInfoEntry('" + skillId + "')");
                    jQuery("#SkillsetsBtnEntry").attr("data-id", "");
                }
            }
            data = {
                "Method": "DeleteResourceRequrirementSkill",
                "Data": {
                    "ResourceRequirementSkillId": SkillId,
                    "Token": Token,
                    "IsActive": 0

                }
            }
            PostDataCallAsync(data, function (postCall) {
                jQuery(".status").attr("class", "status");
                jQuery(".status").html("");
                jQuery(".status").show();
                if (postCall['IsSuccess'] == true) {
                    _addRRMEntryPoint.getSkillsDetails();
                }
                else {
                    jQuery(".status").addClass("data_error");
                    jQuery(".status").html(postCall['Message']);
                }
            });
            setTimeout(function () {
                $(".status").fadeOut("slow", function () {
                    $(".status").html("");
                });
            }, 2500);
        }
    }
    //upload CV
    _editRRMOnBoardForProfileEntry.savedocsComments = function () {
        var DocumentFiles = $("#onboardfile-uploader").dxFileUploader("instance").option('value');
        if (DocumentFiles.length > 0) {
            for (i = 0; i < DocumentFiles.length; i++) {
                var FileExtension = DocumentFiles[i].name.slice((Math.max(0, DocumentFiles[i].name.lastIndexOf(".")) || Infinity) + 1);
                var FileType = DocumentFiles[i].type;
                var FileName = DocumentFiles[i].name.substr(0, DocumentFiles[i].name.lastIndexOf("."));
                var DocumentsFormData = new FormData();
                var uploadfile = DocumentFiles[i];
                var FileSize = DocumentFiles[i].size / 1024 / 1024; // in MB
                if (FileSize <= 5) {
                    DocumentsFormData.append('content', uploadfile);
                    var contentdetails =
                        [{
                            "DocumentTypeId": CandidateId,
                            "DocumentType": "RRMP",
                            "DocumentName": FileName,
                            "Extension": FileExtension,
                            "ContentType": FileType
                        }]

                    DocumentsFormData.append('contentDetails', JSON.stringify(contentdetails));
                    var SaveAssignRfpDocumentsResult = postFileGeneric(DocumentsFormData);
                }
            }
        }
    }


    //upload CV
    _editRRMOnBoardForProfileEntry.saveaudiofile = function () {

        var DocumentFiles = $("#audio-uploader").dxFileUploader("instance").option('value');
        if (DocumentFiles.length > 0) {
            for (i = 0; i < DocumentFiles.length; i++) {
                AudioExtension = DocumentFiles[i].name.slice((Math.max(0, DocumentFiles[i].name.lastIndexOf(".")) || Infinity) + 1);
                AudioFileType = DocumentFiles[i].type;
                AudioFileName = DocumentFiles[i].name.substr(0, DocumentFiles[i].name.lastIndexOf("."));
                DocumentsFormData = new FormData();
                uploadfile = DocumentFiles[i];
                AudioFileSize = DocumentFiles[i].size / 1024 / 1024; // in MB

            }
            var data = [];
            {
                data = {
                    "Method": "PostCandidateAudioFiles",
                    "Data":
                    {
                        "Token": Token,
                        "CandidateId": CandidateId,
                        "AudioFileName": AudioFileName,
                        "Extension": AudioExtension,
                        "Type": AudioFileType,
                        "ContentPath": ""
                    }
                }
            }
            PostDataCallAsync(data, function (result) {
                //
            });
        }
    }

    //upload image
    _editRRMOnBoardForProfileEntry.saveimagefile = function () {
        var DocumentFiles = $("#onboardphoto-uploader").dxFileUploader("instance").option('value');
        if (DocumentFiles.length > 0) {
            for (i = 0; i < DocumentFiles.length; i++) {
                var FileExtension = DocumentFiles[i].name.slice((Math.max(0, DocumentFiles[i].name.lastIndexOf(".")) || Infinity) + 1);
                var FileType = DocumentFiles[i].type;
                var FileName = DocumentFiles[i].name.substr(0, DocumentFiles[i].name.lastIndexOf("."));
                var DocumentsFormData = new FormData();
                var uploadfile = DocumentFiles[i];
                var FileSize = DocumentFiles[i].size / 1024 / 1024; // in MB
                if (FileSize <= 5) {
                    DocumentsFormData.append('content', uploadfile);
                    var contentdetails =
                        [{
                            "DocumentTypeId": CandidateId,
                            "DocumentType": "RRMPImage",
                            "DocumentName": FileName,
                            "Extension": FileExtension,
                            "ContentType": FileType
                        }]

                    DocumentsFormData.append('contentDetails', JSON.stringify(contentdetails));
                    var SaveAssignRfpDocumentsResult = postFileGeneric(DocumentsFormData);

                }
            }
        }
    }


    return _editRRMOnBoardForProfileEntry;
});

function loadcountries() {
    var filter_val = JSON.stringify({
        "Token": Token
    });
    callGetListAsync('GetCountries', filter_val, function (result) {
        for (var i = 0; i < result.length; i++) {
            getcountry.push({
                "Id": result[i].Id,
                "Name": result[i].Name
            });
        }
    })
};