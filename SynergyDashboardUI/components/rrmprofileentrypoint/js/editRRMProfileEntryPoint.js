EditRRMForProfileEntryPoint = (function () {
    var _editRRMForProfileEntry = {};
    //var CandidateProfileId;
    var ReturnCandidateId = null;
    var aadhar_number = null;
    var relocate_result = null;
    //bind data
    _editRRMForProfileEntry.RRMEntryProfileForm = function (CandidateProfileIdParam) {
        loadcandidatedetailsform();
        CandidateProfileId = CandidateProfileIdParam;
        callGetListAsync('GetCandidateProfilebyId', '{"IsActive":"True","CandidateProfilebyId":"' + CandidateProfileId + '","Token":"' + Token + '"}', function (getProfileData) {
            _editRRMForProfileEntry.mapupdaterrmProfileListcomputeHTML(getProfileData);
        })
    }

    //bind data
    _editRRMForProfileEntry.mapupdaterrmProfileListcomputeHTML = function (getProfileData) {
        if (getProfileData[0].Mobile == "") {

        }
        else {
            getProfileData.forEach(function (key, item) {
                CandidateId = key.CandidateId;
                if (key.IsFlagged) {
                    $("#rrmprofile-flaggedprofilereason").text(key.FlagReason)
                    $("#rrmprofile-bannedprofilewarning").removeClass("hidden")
                    $("a.btnNext").hide();
                }
                else {
                    $("#btnbanprofile").show();
                    $("#rrmprofile-bannedprofilewarning").addClass("hidden")
                    $("#rrmprofile-flaggedprofilereason").text(" ")
                    $("a.btnNext").show();
                }

                if (key.FirstName != null) {
                    $("#modelText").text("Edit " + key.FirstName);
                }
                else {
                    $("#modelText").text("Edit ");
                }
                $("#rrm_candidatename").dxTextBox("instance").option('value', key.FirstName);
                $("#rrm_candidatereferral").dxTextBox("instance").option('value', key.Referral);
                $("#rrm_candidatenoticeperiod").dxNumberBox("instance").option('value', key.NoticePeriod);
                $("#rrm_candidateTotalExperience").dxNumberBox("instance").option('value', key.TotalExperience);;
                $("#rrm_candidateemail").dxTextBox("instance").option('value', key.EmailId);
                $("#rrm_candidatephoneno").dxNumberBox("instance").option('value', key.Mobile);
                $("#rrm_candidatepassportno").dxTextBox("instance").option('value', key.PassPortNo);
                $("#rrm_candidateaadharno").dxNumberBox("instance").option('value', key.Aadhar);
                $("#rrm_candidatepanno").dxTextBox("instance").option('value', key.PANNo);
                $("#rrm_candidatewilling").dxSelectBox("instance").option('value', key.Relocate);
                var candidatewilling = $("#rrm_candidatewilling").dxSelectBox("instance");
                if (key.Relocate == true) {
                    relocate_result = 1;
                }
                else if (key.Relocate == false) {
                    relocate_result = 0;
                }
                candidatewilling.option("value", relocate_result);
                $('#rrm_rrmNumber').dxSelectBox("instance").option('value', key.ResourceRequirementNo);
                $("#rrm_candidatecommunication").dxSelectBox("instance").option('value', key.CommunicationRatingHR);
                var communication = $("#rrm_candidatecommunication").dxSelectBox("instance");
                communication.option("value", key.CommunicationRatingHR);

                $("#rrm_native").dxTextBox("instance").option('value', key.Native);
                //address details
                $("#rrm_candidateaddress").dxTextBox("instance").option('value', key.Address);
                $("#rrm_candidatecountry").dxSelectBox("instance").option('value', key.CountryId);
                var candidatecountry = $("#rrm_candidatecountry").dxSelectBox("instance");
                candidatecountry.option("value", key.CountryId);
                if (key.CountryId) {
                    loadstate(key.CountryId);
                }
                $("#rrm_candidatepstate").dxSelectBox("instance").option('value', key.StateId);
                var candidatepstate = $("#rrm_candidatepstate").dxSelectBox("instance");
                candidatepstate.option("value", key.StateId);
                if (key.StateId) {
                    loadcities(key.StateId);
                }
                $("#rrm_candidatecity").dxSelectBox("instance").option('value', key.CityId);
                var candidatepcity = $("#rrm_candidatecity").dxSelectBox("instance");
                candidatepcity.option("value", key.CityId);

                $("#rrm_candidatepincode").dxTextBox("instance").option('value', key.PostalCode);
                //document upload
                $("#txtareaComments").dxHtmlEditor("instance").option('value', key.Comments);
                //additional information 
                $("#rrm_candidateskype").dxTextBox("instance").option('value', key.Skype);
                $("#rrm_candidatelinkedin").dxTextBox("instance").option('value', key.LinkedIn);
                $("#rrm_candidategithub").dxTextBox("instance").option('value', key.GitHub);
                $("#rrm_candidateurl").dxTextBox("instance").option('value', key.Url);
                $("#rrm_candidatefathername").dxTextBox("instance").option('value', key.FatherName);
                $("#rrm_candidatedob").dxDateBox("instance").option('value', key.DateOfBirth);
                $("#rrm_candidatemaritalstatus").dxSelectBox("instance").option('value', key.MaritalStatusId);
                var candidatemaritalstatus = $("#rrm_candidatemaritalstatus").dxSelectBox("instance");
                candidatemaritalstatus.option("value", key.MaritalStatusId);


                if (key.DocumentId) {
                    $("#rrmprofile-divShowFileUploader").addClass("hidden");
                    $("#rrmprofile-divShowResumeDownloader").removeClass("hidden");
                    resumeDownload = "<button class='btn btn-md btn-default' id='candidateresumedownload' onclick=downloadProfileResume('" + key.DocumentId + "')><span>Download Resume  &nbsp;</span><i class='fa fa-download' aria-hidden='true'></i></button> &nbsp;&nbsp;<button type='button' onclick='RemoveReplaceResume()' class='btn btn-xs btn-danger'><span class='fa fa-close'></span></button>"
                    $("#rrmprofile-existingResumeDownload").html(resumeDownload);
                }
                else {
                    $("#rrmprofile-divShowFileUploader").removeClass("hidden");
                    $("#rrmprofile-divShowResumeDownloader").addClass("hidden");
                    $("#rrmprofile-existingResumeDownload").html("");
                }
            });
            $('#rrm_rrmNumber').removeClass('input-error');
            $('#rrm_rrmNumbererror').html("");
        }
    }

    //tab next click function
    _editRRMForProfileEntry.toggleTabRRMEntry = function () {
        var activeTab = $('#rrmprofiletab').find('li.active').attr('id')
        //conatact details  
        if (activeTab == "rrm_candidatecontactTab") {
            //UI Values
            CandidateName = $("#rrm_candidatename").dxTextBox("instance").option('value');
            candidateEmailId = $("#rrm_candidateemail").dxTextBox("instance").option('value');
            candidatePhoneNo = $("#rrm_candidatephoneno").dxNumberBox("instance").option('value');
            candidateAadharNo = $("#rrm_candidateaadharno").dxNumberBox("instance").option('value');
            candidatePanNo = $("#rrm_candidatepanno").dxTextBox("instance").option('value');
            candidatePassportNo = $("#rrm_candidatepassportno").dxTextBox("instance").option('value');
            willingtorelocate = $("#rrm_candidatewilling").dxSelectBox("instance").option('text');
            commuunication = $("#rrm_candidatecommunication").dxSelectBox("instance").option('value');
            candidateNoticePeriod = $("#rrm_candidatenoticeperiod").dxNumberBox("instance").option('value');
            candidateReferral = $("#rrm_candidatereferral").dxTextBox("instance").option('value');
            candidateTotalExperience = $("#rrm_candidateTotalExperience").dxNumberBox("instance").option('value');
            rrmNumber = $('#rrm_rrmNumber').dxSelectBox("instance").option('value');
            native = $("#rrm_native").dxTextBox("instance").option('value');
            //validate not null fields
            if (CandidateId == "" || CandidateId == undefined) {
                CandidateId = null;
            }
            if (candidateEmailId == "" || candidatePhoneNo == "" || rrmNumber == "" || rrmNumber == null || candidatePhoneNo == null || CandidateName == "" || willingtorelocate === " " || commuunication == null || candidateNoticePeriod == null || candidateNoticePeriod == "" || candidateTotalExperience === "" || candidateTotalExperience == null) {
                if (CandidateName == "" || CandidateName == undefined) {
                    $('#rrm_candidatename').addClass('input-error');
                    $('#rrm_candidatenameerror').html("Candidate Name is required");
                }
                else {
                    $('#rrm_candidatename').removeClass('input-error');
                    $('#rrm_candidatenameerror').html("");
                }
                if (candidateEmailId == "" || candidateEmailId == undefined) {
                    $('#rrm_candidateemail').addClass('input-error');
                    $('#rrm_candidateemailerror').html("Email is required");
                }
                else {
                    $('#rrm_candidateemail').removeClass('input-error');
                    $('#rrm_candidateemailerror').html("");
                }
                if (candidatePhoneNo == "" || candidatePhoneNo == undefined) {
                    $('#rrm_candidatephoneno').addClass('input-error');
                    $('#rrm_candidatephonenoerror').html("Phone Number is required");
                }
                else {
                    $('#rrm_candidatephoneno').removeClass('input-error');
                    $('#rrm_candidatephonenoerror').html("");
                }
                if (rrmNumber == "" || rrmNumber == undefined) {
                    $('#rrm_rrmNumber').addClass('input-error');
                    $('#rrm_rrmNumbererror').html("Choose an RRM");
                }
                else {
                    $('#rrm_rrmNumber').removeClass('input-error');
                    $('#rrm_rrmNumbererror').html("");
                }
                // if (candidateAadharNo == "" || candidateAadharNo == undefined) {
                //     $('#rrm_candidateaadharno').addClass('input-error');
                //     $('#rrm_candidateaadharnoerror').html("Please Enter Candidate Aadhar Number");
                // }
                // else {
                //     $('#rrm_candidateaadharno').removeClass('input-error');
                //     $('#rrm_candidateaadharnoerror').html("");
                // }
                // if (willingtorelocate == "" || willingtorelocate == undefined) {
                //     $('#rrm_candidatewilling').addClass('input-error');
                //     $('#rrm_candidatewillingerror').html("Please Enter Candidate Aadhar Number");
                // }
                // else {
                //     $('#rrm_candidatewilling').removeClass('input-error');
                //     $('#rrm_candidatewillingerror').html("");
                // }
                // if((candidatePassportNo == "" ||  candidatePassportNo == null|| candidatePassportNo == undefined) && (candidateAadharNo == null || candidateAadharNo == "" || candidateAadharNo == undefined) && (candidatePanNo == null || candidatePanNo == "" || candidatePanNo == undefined)){
                //     $('#rrm_candidateaadharno').addClass('input-error');
                //     $('#rrm_candidatepassportnoerror').html("Please Enter Candidate Passport number/Pan number/Aadhar number");
                // }
                // else {
                //     $('#rrm_candidateaadharno').removeClass('input-error');
                //     $('#rrm_candidateaadharnoerror').html("");
                // }
                if (willingtorelocate === " " || willingtorelocate == undefined) {
                    $('#rrm_candidatewilling').addClass('input-error');
                    $('#rrm_candidatewillingerror').html("Choose an option");
                }
                else {
                    $('#rrm_candidatewilling').removeClass('input-error');
                    $('#rrm_candidatewillingerror').html("");
                }
                if (commuunication == "" || commuunication == undefined) {
                    $('#rrm_candidatecommunication').addClass('input-error');
                    $('#rrm_candidatecommunicationerror').html("Choose an option");
                }
                else {
                    $('#rrm_candidatecommunication').removeClass('input-error');
                    $('#rrm_candidatecommunicationerror').html("");
                }
                if (candidateNoticePeriod == "" || candidateNoticePeriod == null) {
                    $('#rrm_candidatenoticeperiod').addClass('input-error');
                    $('#rrm_candidatenoticeperioderror').html("Notice period is required");
                }
                else {
                    $('#rrm_candidatecommunication').removeClass('input-error');
                    $('#rrm_candidatecommunicationerror').html("");
                }

                if (candidateTotalExperience === "" || candidateTotalExperience === " " || candidateTotalExperience == null) {
                    $('#rrm_candidateTotalExperience').addClass('input-error');
                    $('#rrm_candidateTotalExperienceerror').html("Total Experience is required");
                }
                else {
                    $('#rrm_candidateTotalExperiencederror').removeClass('input-error');
                    $('#rrm_candidateTotalExperienceerror').html("");
                }
                $('.nav-tabs a[href="#rrm_CandidateContactDetails"]').tab("show");
                $(".btnPrevious").hide();
                $(".saveFamilyBtn").hide();
                $("a.btnNext").show();
            }
            else {
                $(".error_message").html("");
                willingtorelocate = (willingtorelocate == "Yes") ? 1 : 0;

                dataResource = {
                    "Method": "PostCandidates",
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
                        "NoticePeriod": candidateNoticePeriod,
                        "Referral": candidateReferral,
                        "TotalExperience": candidateTotalExperience,
                        "ResourceRequirementNo": rrmNumber,
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
                        $('.nav-tabs a[href="#rrm_candidateinformationTab"]').tab("show");
                        $(".btnPrevious").show();
                        $("a.btnSaveAndContinue").show();
                        $("a.saveFamilyBtn").hide();
                        $("a.btnNext").show();
                    }

                    if (resultResorce.IsSuccess == false) {
                        if (resultResorce.Message.includes("UK_Candidates_Mobile")) {
                            swal({
                                title: "Phone Number already exist...",
                                text: "Please Change the Phone Number",
                                icon: "info",
                                buttons: true,
                                dangerMode: true,
                            })
                        }
                        else if (resultResorce.Message.includes("UK_Candidates_Aadhar")) {
                            swal({
                                title: "Aadhar Number already exist...",
                                text: "Aadhar Number is already present in the database",
                                icon: "info",
                                buttons: true,
                                dangerMode: true,
                            })
                        }
                        else if (resultResorce.Message.includes("UK_Candidates_EmailId")) {
                            swal({
                                title: "Email already exist...",
                                text: "Email is already present in the database",
                                icon: "info",
                                buttons: true,
                                dangerMode: true,
                            })
                        }
                        else if (resultResorce.Message.includes("UK_Candidates_PaNNo")) {
                            swal({
                                title: "Pan Number already exist...",
                                text: "Pan Number is already present in the database",
                                icon: "info",
                                buttons: true,
                                dangerMode: true,
                            })
                        }
                        else if (resultResorce.Message.includes("UK_Candidates_PassPortNo")) {
                            swal({
                                title: "Passport Number already exist...",
                                text: "Passport Number is already present in the database",
                                icon: "info",
                                buttons: true,
                                dangerMode: true,
                            })
                        }
                        else {
                            if (resultResorce.Message != null && resultResorce.Message != "") {
                                var data = resultResorce.Message;
                                if (data.includes(":")) {
                                    var getid = data.split(':')[1];
                                    if (getid != null || getid != "" || getid != "undefined") {
                                        getid = getid.replace(/[$$]/g, '');
                                        swal({
                                            title: "User already exist...",
                                            text: "Given Information exists in our records! Click above link to show the recored!...",
                                            icon: "info",
                                            buttons: true,
                                            dangerMode: true,
                                        })
                                        $("#bindexistingcandidate").html("<a href='#'>Given Information exists in our records! Click here to show the recored!...</a>");
                                        $("#bindexistingcandidate").val(getid);
                                        $("#bindexistingcandidate").removeClass("hidden");
                                    }
                                }
                            }
                        }
                    }
                });

            }
        }
        //additional information
        if (activeTab == "rrm_candidateinfoTab") {
            _editRRMForProfileEntry.saveimagefile();
            $.when(_editRRMForProfileEntry.savedocsComments()).then(
                additionalRRM()

            );

            function additionalRRM() {
                Skype = $("#rrm_candidateskype").dxTextBox("instance").option('value');
                LinkedIn = $("#rrm_candidatelinkedin").dxTextBox("instance").option('value');
                GitHub = $("#rrm_candidategithub").dxTextBox("instance").option('value');
                Url = $("#rrm_candidateurl").dxTextBox("instance").option('value');
                Father = $("#rrm_candidatefathername").dxTextBox("instance").option('value');
                DateOfBirth = $("#rrm_candidatedob").dxDateBox("instance").option('value');
                maritalstatusid = $("#rrm_candidatemaritalstatus").dxSelectBox("instance").option('value');
                rrmNumbers = $('#rrm_rrmNumber').dxSelectBox("instance").option('value');

                //if (AlternateMobile == undefined && AlternateEmail == undefined) {
                //    AlternateMobile = null;
                //    AlternateEmail = null;
                //}
                AlternateMobile = null;
                AlternateEmail = null;

                dataResource = {
                    "Method": "PostCandidateAdditionalInformation",
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

                // _editRRMForProfileEntry.saveaudiofile();
                $('.nav-tabs a[href="#rrm_candidateaddressdetail"]').tab("show");
                $(".btnPrevious").show();
                $("a.btnSaveAndContinue").show();
                $("a.saveFamilyBtn").hide();
                $("a.btnNext").show();
            }

        }
        //address tab
        if (activeTab == "rrm_candidateaddressTab") {
            Address = $("#rrm_candidateaddress").dxTextBox("instance").option('value');
            if ($("#rrm_candidatecity").dxSelectBox("instance").option('value') != null) {
                CityId = $("#rrm_candidatecity").dxSelectBox("instance").option('value');
            }
            else {
                CityId = null;
            }
            if ($("#rrm_candidatepstate").dxSelectBox("instance").option('value') != null) {
                StateId = $("#rrm_candidatepstate").dxSelectBox("instance").option('value');
            }
            else {
                StateId = null;
            }
            if ($("#rrm_candidatecountry").dxSelectBox("instance").option('value') != null) {
                CountryId = $("#rrm_candidatecountry").dxSelectBox("instance").option('value');
            }
            else {
                CountryId = null;
            }
            PostalCode = $("#rrm_candidatepincode").dxTextBox("instance").option('value');

            if (Address == null || Address == '') {
                $("#rrm_candidateaddresserror").html("Please enter Address")
                readyForSave = false;
            }
            else {
                $("#rrm_candidateaddresserror").html("")
                readyForSave = true;
            }

            if (CountryId == null) {
                $("#rrm_candidatecountryerror").html("Please Select Country")
                readyForSave = false;
            }
            else {
                $("#rrm_candidatecountryerror").html("")
                readyForSave = true;
            }

            if (StateId == null) {
                $("#rrm_candidatestateerror").html("Please Select State")
                readyForSave = false;
            }
            else {
                $("#rrm_candidatestateerror").html("")
                readyForSave = true;
            }

            if (CityId == null ) {
                $("#rrm_candidatecityerror").html("Please Select City")
                readyForSave = false;
            }
            else {
                $("#rrm_candidatecityerror").html("")
                readyForSave = true;
            }

            if (readyForSave == true) {
                dataResource = {
                    "Method": "PostCandidateAddress",
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

                PostDataCallAsync(dataResource, function (resultResorce) {
                    if (resultResorce['IsSuccess'] == false) {
                        swal({
                            title: "Error",
                            text: resultResorce['Message'],
                            icon: "error",
                            buttons: true,
                        })
                    } else {
                        $('.nav-tabs a[href="#rrm_EmployerDetails"]').tab("show");
                        $(".btnPrevious").show();
                        $("a.btnSaveAndContinue").show();
                        $("a.saveFamilyBtn").hide();
                        $("a.btnNext").show();
                        _editRRMForProfileEntry.GetPreviousEmployersForCandidate();
                    }
                });
            }
        }

        //employer details
        if (activeTab == "rrm_employerdetailsTab") {
            var data = $("#gridContainer").dxDataGrid("instance").option("dataSource");
            if (data.length == 0) {
                $(".gridContainer_status").addClass("data_error");
                //$(".gridContainer_status").html("Please Add Employer Details");
                swal({
                    title: "Warning!",
                    text: "Please Add Employer Details",
                    icon: "warning",
                    button: "ok!",
                })
            }
            else {
                $(".gridContainer_status").removeClass("data_error");
                $(".gridContainer_status").html("");
                nextFlag = true;
                $('.nav-tabs a[href="#rrm_CandidateCareerDetails"]').tab("show");
                $("a.btnNext").show();
                $("a.btnSaveAndContinue").show();
                $(".saveFamilyBtn").hide();
                _editRRMForProfileEntry.getSkillsDetails();
            }
        }
        //career details
        if (activeTab == "rrm_candidateCareerTab") {
            var griddata = $("#display_Skillsprofile").dxDataGrid("instance").option("dataSource");
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
            }
            else {
                $('.nav-tabs a[href="#rrm_CandidateDocuments"]').tab("show");
                resetSimpleBarProfileEntryPoint();
                $("a.btnNext").hide();
                $("a.btnPrevious").show();
                $("a.btnSaveAndContinue").show();
                $(".saveFamilyBtn").show();
            }
        }
        resetSimpleBarProfileEntryPoint();
    }

    //uploade employeer details in grid
    _editRRMForProfileEntry.GetPreviousEmployersForCandidate = function () {

        var filter_val = JSON.stringify({
            "CandidateId ": CandidateId,
            "IsActive": "True",
            "Token": Token
        });

        callGetListAsync('GetCandidatePreviousEmployersByCandidateId', filter_val, function (e) {

            GetPreviousEmployer = e;
            _editRRMForProfileEntry.renderemployerGrid(GetPreviousEmployer);
        })
    }

    //uploade employeer details in grid source
    _editRRMForProfileEntry.renderemployerGrid = function () {
        var dataGrid = $("#gridContainer").dxDataGrid({
            dataSource: GetPreviousEmployer
        });
    }

    //get candidate skilldetails
    _editRRMForProfileEntry.getSkillsDetails = function () {
        var filter_val = JSON.stringify({
            "CandidateId ": CandidateId,
            "IsActive": "True",
            "Token": Token
        });

        callGetListAsync('GetCandidateSkillsbyCandidateId', filter_val, function (e) {
            GetCandidateSkillList = e;
            _editRRMForProfileEntry.renderaddskillGrid(GetCandidateSkillList);
        })

    }
    //uploade employeer details in grid source
    _editRRMForProfileEntry.renderaddskillGrid = function (GetCandidateSkillList) {
        $("#display_Skillsprofile").dxDataGrid('instance').option('dataSource', GetCandidateSkillList);
    }

    //post comments
    _editRRMForProfileEntry.saveCandidateComment = function () {
        var finalComments = $("#txtareaComments").dxHtmlEditor("instance").option('value');

        if (finalComments != "" || finalComments != undefined) {
            dataComments = {
                "Method": "PostCommentsInCandidates",
                "Data": {
                    "Token": Token,
                    "CandidateCommentId": null,
                    "CandidateId": CandidateId,
                    "Comments": finalComments,
                    "IsActive": 'True'
                }
            }

            //var resultComments = PostDataCall(dataComments);
            PostDataCallAsync(dataComments, function (resultComments) {
                swal({
                    title: "Success!",
                    text: "Saved Successfully!",
                    icon: "success",
                    button: "ok!",
                });
            });
        }
        $('#RRMProfileEntryPointTableModel').modal("hide");
    }

    _editRRMForProfileEntry.saveCandidateCommentAndClose = function () {

        var candidateNotes = $("#txtareaComments").dxHtmlEditor("instance").option('value');
        if (candidateNotes == null || candidateNotes == "" || candidateNotes == undefined) {
            swal({
                title: "Error",
                text: "Fill Notes",
                icon: "error",
                buttons: true,
            })
        }

        if (candidateNotes != null && candidateNotes != "" && candidateNotes != undefined) {
            if (candidateNotes.trim() != "" && candidateNotes.trim() != undefined) {
                dataComments = {
                    "Method": "PostCandidateNotes",
                    "Data": {
                        "CandidateId": CandidateId,
                        "Notes": candidateNotes,
                        "IsActive": true
                    }
                }

                //var resultComments = PostDataCall(dataComments);
                PostDataCallAsync(dataComments, function (resultComments) {

                    if (resultComments['IsSuccess'] == true) {
                        swal({
                            title: "Success!",
                            text: "Saved Successfully!",
                            icon: "success",
                            button: "ok!",
                        })
                        $("#txtareaComments").dxHtmlEditor("instance").option('value', "");
                    }
                });

            }
            $('#RRMProfileEntryPointTableModel').modal("hide");
        }


    }

    _editRRMForProfileEntry.saveCandidateComment = function () {
        var candidateNotes = $("#txtareaComments").dxHtmlEditor("instance").option('value');
        if (candidateNotes == null || candidateNotes == "" || candidateNotes == undefined) {
            swal({
                title: "Error",
                text: "Fill Notes",
                icon: "error",
                buttons: true,
            })
        }
        if (candidateNotes != null && candidateNotes != "" && candidateNotes != undefined) {
            if (candidateNotes.trim() != "" && candidateNotes.trim() != undefined) {
                dataComments = {
                    "Method": "PostCandidateNotes",
                    "Data": {
                        "CandidateId": CandidateId,
                        "Notes": candidateNotes,
                        "IsActive": true
                    }
                }

                //var resultComments = PostDataCall(dataComments);
                PostDataCallAsync(dataComments, function (resultComments) {

                    getCandidateNotesHistory(CandidateId);
                    $("#txtareaComments").dxHtmlEditor("instance").option('value', "");
                });
            }
        }
    }

    //tab previous click function 
    _editRRMForProfileEntry.toggleTabRRMPrevious = function () {
        var activeTab = $('#rrmprofiletab').find('li.active').attr('id')
        if (activeTab == "rrm_candidateinfoTab") {
            $('.nav-tabs a[href="#rrm_CandidateContactDetails"]').tab("show");
            $(".btnPrevious").hide();
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
            $("a.btnSaveAndContinue").hide();
        }
        if (activeTab == "rrm_candidateaddressTab") {
            $('.nav-tabs a[href="#rrm_candidateinformationTab"]').tab("show");
            $(".btnPrevious").show();
            $("a.btnNext").show();
            $("a.saveFamilyBtn").hide();
            $("a.btnSaveAndContinue").hide();
        }
        if (activeTab == "rrm_employerdetailsTab") {
            $('.nav-tabs a[href="#rrm_candidateaddressdetail"]').tab("show");
            $(".btnPrevious").show();
            $("a.btnNext").show();
            $("a.saveFamilyBtn").hide();
            $("a.btnSaveAndContinue").hide();
        }
        if (activeTab == "rrm_candidateCareerTab") {
            $('.nav-tabs a[href="#rrm_EmployerDetails"]').tab("show");
            $("a.btnPrevious").show();
            $("a.btnNext").show();
            $(".saveFamilyBtn").hide();
            $("a.btnSaveAndContinue").hide();
        }
        if (activeTab == "rrm_candidatedocumentTab") {
            $("a.btnSaveAndContinue").show();
            $("a.btnNext").show();
            $("a.btnSaveAndContinue").hide();
            $("a.btnNext").show();
            $(".btnPrevious").show();
            $(".saveFamilyBtn").hide();
            $('.nav-tabs a[href="#rrm_CandidateCareerDetails"]').tab("show");
        }
        resetSimpleBarProfileEntryPoint();
    }

    //post employer details
    _editRRMForProfileEntry.saveEmployer = function (details) {
        var EmployerId;
        if (details.data.EmployerId == undefined || details.data.EmployerId == null) {
            EmployerId = null;
        }
        else {
            EmployerId = details.data.EmployerId
        }
        dataSourceSaveEmployer = {
            "Method": "PostPreviousEmployersForCandidate",
            "Data": {
                "Token": Token,
                "CandidateId": CandidateId,
                "EmployerId": EmployerId,
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
            getRRMRRMProfileEntryEmployerTable();
        })

    }

    //post employer details
    _editRRMForProfileEntry.updateEmployer = function (details) {
        var EmployerId;
        if (details.data.EmployerId == undefined || details.data.EmployerId == null) {
            EmployerId = null;
        }
        else {
            EmployerId = details.data.EmployerId
        }
        dataSourceSaveEmployer = {
            "Method": "PostPreviousEmployersForCandidate",
            "Data": {
                "Token": Token,
                "CandidateId": CandidateId,
                "EmployerId": EmployerId,
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
            getRRMRRMProfileEntryEmployerTable();
        })
    }

    //delete post employer details
    _editRRMForProfileEntry.deleteEmployer = function (details) {
        dataSourceSaveEmployer = {
            "Method": "DeletePreviousEmployersForCandidate",
            "Data": {
                "Token": Token,
                "EmployerId": details.data.EmployerId,
                "IsActive": false
            }
        }

        // var resultResorce = PostDataCall(dataResource);
        PostDataCallAsync(dataSourceSaveEmployer, function (e) {
            candidateIdForSkillAndWorkExperience = CandidateId;
            getRRMRRMProfileEntryEmployerTable();
        })
    }


    //post candidate skill details
    _editRRMForProfileEntry.uploadSkill = function (details) {
        var skill_version = details.data.SkillVersionId;
        if (skill_version == "") { skill_version = null }
        var family = details.data.SkillFamilieId;
        var skill = details.data.skillId;
        var skillGrade = details.data.SkillGradeId;
        var CandidateSkillMappingId = null;
        var SkillExperience = details.data.SkillExperience;
        var Rating = details.data.Rating;

        if (details.data.CandidateSkillMappingId != null && details.data.CandidateSkillMappingId != undefined) {
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
                    "Method": "PostCandidatesSkills",
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
                        "Rating": Rating
                    }
                }
            }

            candidateIdForSkillAndWorkExperience = CandidateId

            // var postCall = PostDataCall(data);
            PostDataCallAsync(data, function (postCall) {
                $(".skillset_status").attr("class", "skillset_status");
                $(".skillset_status").html("");
                $(".skillset_status").show();
                if (postCall['IsSuccess'] == false) {
                    swal({
                        title: "Error",
                        text: postCall['Message'],
                        icon: "error",
                        buttons: true,
                    });
                    _editRRMForProfileEntry.getSkillsDetails();
                } else {
                    _editRRMForProfileEntry.getSkillsDetails();
                    // getRRMRRMProfileEntrySkillTables();
                }

                // if (postCall['IsSuccess'] == true) {

                //     //_addRRMForProfileEntry.getSkillsDetails();
                // }
                // getRRMRRMProfileEntrySkillTable();
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

    _editRRMForProfileEntry.deleteSkill = function (details) {
        data = {
            "Method": "DeleteCandidateSkillMapping",
            "Data": {
                "CandidateSkillId": details.data.CandidateSkillMappingId,
                "Token": Token,
                "IsActive": 0

            }
        }
        PostDataCallAsync(data, function (postCall) {
            candidateIdForSkillAndWorkExperience = CandidateId;
            if (postCall['IsSuccess'] == false) {
                swal({
                    title: "Error",
                    text: postCall['Message'],
                    icon: "error",
                    buttons: true,
                })
            } else {
                getRRMRRMProfileEntrySkillTable();
            }

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
    _editRRMForProfileEntry.deleteRow_SkillMapping = function (SkillId) {
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
    _editRRMForProfileEntry.savedocsComments = function () {
        var DocumentFiles = $("#file-uploader").dxFileUploader("instance").option('value');
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
    _editRRMForProfileEntry.saveaudiofile = function () {

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
    _editRRMForProfileEntry.saveimagefile = function () {
        var DocumentFiles = $("#photo-uploader").dxFileUploader("instance").option('value');
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


    return _editRRMForProfileEntry;
});