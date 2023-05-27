// $.getScript('../scripts/callapi.js', function(){});

var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9/crypto-js.js');
document.head.appendChild(jQueryScript);

if (localStorage.getItem('LandingNumberFront')) {
	var LandingNumberFront = localStorage.getItem('LandingNumberFront');
	if (LandingNumberFront == 3) {
		getPersonalEmployeedetails();
		$(".person-previous").attr("disabled", "disabled");
	} else if (LandingNumberFront == 4) {
		var dataEmployee1 = GetPreviousEmployerDetails();
		messageBox.innerHTML = computeHTML(dataEmployee1);
		//$(".employer-previuos").attr("disabled", "disabled");
	} else if (LandingNumberFront == 5) {
		var dataEmployeeAddress = GetEmployeeAddress();
		messageBox3.innerHTML = computeHTML_Address(dataEmployeeAddress);
		//$(".address-previous").attr("disabled", "disabled");
	} else if (LandingNumberFront == 6) {
		var dataEmployeeContact_show = GetContactInfo();
		messageBox1.innerHTML = computeHTML_ContactInfo(dataEmployeeContact_show);
		//$(".contact-previous").attr("disabled", "disabled");
	} else if (LandingNumberFront == 7) {
		clearAndShow_SkillInfo();
		//$(".skillSet-previous").attr("disabled", "disabled");
	}
}

function scroll_to_class(element_class, removed_height) {
	var scroll_to = $(element_class).offset().top - removed_height;
	if ($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({
			scrollTop: scroll_to
		}, 0);
	}
}

function readTextFile(file,cb) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				// alert(allText);
				//console.log('allText',allText)
				// return allText;
				cb(allText)
			}
		}
	}
	rawFile.send(null);
}


function bar_progress(progress_line_object, direction) {
	var number_of_steps = progress_line_object.data('number-of-steps') + 1;
	var now_value = progress_line_object.data('now-value');
	var new_value = 0;
	if (direction == 'right') {
		new_value = now_value + (100 / number_of_steps);
	} else if (direction == 'left') {
		new_value = now_value - (100 / number_of_steps);
	}
	progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}


jQuery(document).ready(function () {
	var next_step = null;
	var OldSynergyUserIdVal = null;
	var fieldSetClasses = ['login_fieldset', 'password_fieldset', 'personal-details', 'employee_fieldset', 'address_fieldset', 'contact_fieldset', 'skill_fieldset'];
	/*

        Fullscreen background
    */
	// $.backstretch("assets/img/backgrounds/1.jpg");

	$('#top-navbar-1').on('shown.bs.collapse', function () {
		$.backstretch("resize");
	});
	$('#top-navbar-1').on('hidden.bs.collapse', function () {
		$.backstretch("resize");
	});

	/*
	    Form
	*/
	$('.f1 fieldset:first').fadeIn('slow');

	$('.f1 input[type="text"], .f1 input[type="password"], .f1 textarea').on('focus', function () {
		$(this).removeClass('input-error');
	});

	// next step

	$('.f1 .btn-next').on('click', function () {
		var thisbtn = this;
		var parent_fieldset = $(this).parents('fieldset');
		// navigation steps / progress steps
		var current_active_step = $(this).parents('.f1').find('.f1-step.active');
		var progress_line = $(this).parents('.f1').find('.f1-progress-line');


		error = false;

		if (!error) {
			//api call
			next_step = true;
			// 1st Step api call
			if ($(thisbtn).hasClass('checkuser')) {
				$(thisbtn).prop('disabled', true);
				var data = ValidateoldCredentials(parent_fieldset);
				next_step = false;
				if (data != "") {
					var postCall = PostDataCall(data);
					if (postCall['IsSuccess'] == true) {						
						validationSuccess(postCall);
						//postCall.Data[0].LandingPageNumber = 2;
						var landingNumber = postCall.Data[0].LandingPageNumber;
						landing(landingNumber, progress_line, thisbtn, current_active_step, fieldSetClasses);

					} else {
						$(thisbtn).prop('disabled', false);
						next_step = false;
						$('#login-error').html(postCall['Message'] + ". Please <a href='./'>Click Here</a> to go Login page");
						////console.log(postCall['Message']);
					}
				} else {
					$(thisbtn).prop('disabled', false);
					next_step = false;

				}

			}

			// 2nd Step api call
			else if ($(thisbtn).hasClass('checkpass')) {
				$(thisbtn).prop('disabled', true);
				ValidatenewCredentials(parent_fieldset,function(data){
					//console.log('val data',data)
					if (data && data != "" && data != undefined) {
						var postCall = PostDataCall(data);
						if (postCall['IsSuccess'] == true) {
							
							validationSuccess_password(postCall);
							////console.log(postCall['Message']);
						} else {
							$(thisbtn).prop('disabled', false);
							next_step = false;
							////console.log(postCall['Message']);
						}
					} else {
						$(thisbtn).prop('disabled', false);
						next_step = false;
						// $('#password-error').html(postCall['Message']);
					}					
				})


			}
			// 3rd Step api call
			else if ($(thisbtn).hasClass('check-details')) {
				next_step = Validatepersonaldetails(parent_fieldset)
				clearAndShow();

			}
			//4th step 
			else if ($(thisbtn).hasClass('employer-details')) {

				clearAndShow_Address();
				var result = callgetlist('GetCationsForPage', '{"Page":"addressinfo"}');
				var caption_info = result[0].Info;
				if (result) {
					$('#address-caption').html(caption_info);
				} else {
					$('#address-caption').html("To use our new synergy application, login with your existing credentials");
				}

				var perviousEmpDetails = [];
				perviousEmpDetails.push(GetPreviousEmployerDetails())

				$('#name').removeClass('input-error');
				$('#previous_employer_name_error').html("");
				$('#fdate').removeClass('input-error');
				$('#fdate_error').html("");
				$('#tdate').removeClass('input-error');
				$('#tdate_error').html("");

				data = {
					"Method": "UpdateStageCompleted",
					"Data": {
						"StageNumber": 4
					}
				}
				var postCall = PostDataCall(data);
				////console.log(postCall);

				/*if (perviousEmpDetails[0].length <= 0) {
					alert('Please add atleast one Previous Employer')
					next_step = false;
				} else {
					next_step = true;
				}*/
			} else if ($(thisbtn).hasClass('address-details')) {
				clearAndShow_ContactInfo();
				var result = callgetlist('GetCationsForPage', '{"Page":"contactinfo"}');
				var caption_info = result[0].Info;
				if (result) {
					$('#contactinfo-caption').html(caption_info);
				} else {
					$('#contactinfo-caption').html("To use our new synergy application, login with your existing credentials");
				}

				var AddressDetails = [];
				AddressDetails.push(GetEmployeeAddress());

				var permanent_addr = 0;

				for (var i = 0; i < AddressDetails[0].length; i++) {

					if (AddressDetails[0][i].Name == "Permanent address") {
						permanent_addr++;
					}

				}


				if (AddressDetails[0].length <= 0) {
					alert('Please add atleast one Address')
					next_step = false;
				}
				else if (permanent_addr == 0) {
					alert('Permanent address is manditory ')
					next_step = false;
				} else {
					data = {
						"Method": "UpdateStageCompleted",
						"Data": {
							"StageNumber": 5
						}
					}
					var postCall = PostDataCall(data);
					next_step = true;
				}

				$('#address').removeClass('input-error');
				$('#address_error').html("");
				$('#landmark').removeClass('input-error');
				$('#landmark_error').html("");
				$('#state').removeClass('input-error');
				$('#state_error').html("");
				$('#city').removeClass('input-error');
				$('#city_error').html("");
				$('#postal_code').removeClass('input-error');
				$('#postal_code_error').html("");

			} else if ($(thisbtn).hasClass('contact-info')) {
				clearSkill_Info();
				//var result = callgetlist('GetCationsForPage', '{"Page":"skillset"}');

				var result = callgetlist('GetCustimzedContentFor', '{"ContentCode":"102"}');
				var caption_info = result[0].Content;

				if (result) {
					$('#skill-caption').html(caption_info);
				} else {
					$('#skill-caption').html("To use our new synergy application, login with your existing credentials");
				}


				var ContactDetails = [];
				ContactDetails.push(GetContactInfo());
				var primaryNo = 0;
				var secondaryNo = 0;

				for (var i = 0; i < ContactDetails[0].length; i++) {

					if (ContactDetails[0][i].RelationshipId == "C5C769D1-4CDC-4378-8EF2-D7519714AC9B") {
						primaryNo++;
					}

					if (ContactDetails[0][i].RelationshipId == "1DF7201B-597A-4C7C-9360-C21C10A78108") {
						secondaryNo++;
					}
				}

				/*if(checkBro > 0 && checkDad > 0){
					alert("no error");
				}
				else{
					alert('Brother and Father mobile number is manditory');
					next_step = false;
				}*/


				if (ContactDetails[0].length <= 0) {
					alert('Please add atleast one Contact Details')
					next_step = false;
				} else if (primaryNo == 0 || secondaryNo == 0) {
					alert("Primary and Secondary mobile number is manditory");
					next_step = false;
				} else {
					data = {
						"Method": "UpdateStageCompleted",
						"Data": {
							"StageNumber": 6
						}
					}
					var postCall = PostDataCall(data);
					$("#orResume").prop('hidden', true);
					$("#grResume").prop('hidden', true);
					var result = callgetlist('GetEmployeeResumes', '');
					////console.log(result);
					for (var i = 0; i < result.length; i++) {
						if (result[i].FileId) {
							if (result[i].DocumentType == 'OR') {
								$("#orResume").removeAttr("hidden");
								$("#resume").removeClass('no-resume');
							} else if (result[i].DocumentType == 'GR') {
								$("#grResume").removeAttr("hidden");
								$("#resumeg2").removeClass('no-resume');
							}
						}
					}
					next_step = true;

				}

				$('#relationship').removeClass('input-error');
				$('#relationship_error').html("");
				$('#Contactname').removeClass('input-error');
				$('#Contactname_error').html("");
				$('#phno').removeClass('input-error');
				$('#phno_error').html("");
				$('#email').removeClass('input-error');
				$('#email_error').html("");
			} else if ($(thisbtn).hasClass('skillSetNext')) {

				// location.href = '../index1.html';
				var skill = parent_fieldset.find('input[id="skill"]').val();
				var family = parent_fieldset.find('input[id="family"]').val();

				var data = [{
					"Method": "NewSyngeryskillset",
					"Data": {
						"skill": skill,
						"family": family
					}
				}];

				var postCall = PostDataCall(data);
				if (postCall['IsSuccess'] == true) {
					next_step = true;
					data = {
						"Method": "UpdateStageCompleted",
						"Data": {
							"StageNumber": 7
						}
					}
					var postCall = PostDataCall(data);

				} else {
					next_step = false;
					alert(postCall['Message']);
				}

				$('#skill_grade_error').html("");
				$('#skill_grade').removeClass('input-error');
				$('#family_error').html("");
				$('#family').removeClass('input-error');
				$('#skill_error').html(" ");
				$('#skill').removeClass('input-error');
				$('#skillversion_error').html(" ");
				$('#skillversion').removeClass('input-error');


			}
		} else {
			next_step = false;
		}
		// fields validation
		if (next_step) {
			parent_fieldset.fadeOut(400, function () {

				// change icons
				current_active_step.removeClass('active').addClass('activated').next().addClass('active');
				// progress bar
				bar_progress(progress_line, 'right');
				// show next step
				var currentfield = $(this).next();
				////console.log(currentfield);
				if ($(currentfield).hasClass('personal-details')) {

					// var filter_val = '';
					// var result = callgetlist('GetBloodMaster', filter_val);
					// var options = "<option value=''>Select Blood Group</option>";
					// for (var i = 0; i < result.length; i++) {
					// 	options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
					// }
					// $("#blood-group").html(options);
					// // api to get personal-details

					// var filter_val = '';
					// var result = callgetlist('GetMaritalStatusMaster', filter_val);
					// var options = "<option value=''>Select Martial Status</option>";
					// for (var i = 0; i < result.length; i++) {
					// 	options += "<option value='" + result[i].Id + "'>" + result[i].Status + "</option>";
					// }
					// $("#marital_status").html(options);

					// var filter_val = JSON.stringify({
					// 	"IsActive": true
					// });
					// var result = callgetlist('GetPersonalDetails', filter_val);

					// var localget = localStorage.getItem("PasswordFieldRes");
					// var jsonData = JSON.parse(localget);
					// var result = jsonData['Data'][0];

					// $("#father-name").val(result['FatherName']);
					// $("#dob").val(result['DateOfBirth']);
					// $("#date-of-joining").val(result['DateOfJoining']);
					// $("#blood-group").val(result['BloodGroupID']);
					// $("#marital_status").val(result['MaritalStatusId']);
					// $("#cop-email").val(result['CorporateEmailID']);
					// $("#Pan-no").val(result['PANNo']);
					// $("#pf-no").val(result['PFNo']);
					// $("#esi-no").val(result['ESINo']);
					// $("#passport_no").val(result['PassPortNo']);

					// $("#profile-img-tag").attr("data-src", "");
					// var ProfilePicture = GetEmployeeProfilePicture();
					// if(ProfilePicture != null) {
					// 	$("#profile-img-tag").attr("src", ProfilePicture);
					// 	$("#profile-img-tag").attr("data-src", ProfilePicture);
					// }

					getPersonalEmployeedetails();

					//$("#profile-img-tag").attr("src",result['ProfilePicture']);
					//$("#profile-img").val(result['ProfilePicture']);
				}

				if ($(currentfield).hasClass('addressFieldset')) {

					var dataEmployeeAddress1 = GetEmployeeAddress();
					messageBox3.innerHTML = computeHTML_Address(dataEmployeeAddress1);
				}

				if ($(currentfield).hasClass('skillsetField')) {

					clearAndShow_SkillInfo();

					//Grade api call
					var filter_val = JSON.stringify();
					var result = callgetlist('GetSkillGrades', filter_val);

					var options = "<option value=''>Select Grade</option>";
					for (var i = 0; i < result.length; i++) {
						options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
					}
					$("#skill_grade").html(options);

					// Api call to set Family in skillset
					var filter_val = JSON.stringify();
					var result = callgetlist('GetSkillFamilies', filter_val);

					var options = "<option value=''>Select Family</option>";
					if(result){
						for (var i = 0; i < result.length; i++) {
							options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
						}
						$("#family").html(options);
					}

					// Api call to set skills in skillset
					// $("#family").change(function () {
					// 	var family_id = $("#family").val();
					// 	var filter_val = JSON.stringify({
					// 		"FamilyId": family_id
					// 	});
					// 	var result = callgetlist('GetSkills', filter_val);

					// 	var options = "<option value=''>Select skill</option>";
					// 	for (var i = 0; i < result.length; i++) {
					// 		options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
					// 	}
					// 	$("#skill").html(options);
					// });

					//Skill version
					// Api call to set Family in skillset
					// $("#skill").change(function () {
					// 	var skill_id = $("#skill").val();
					// 	var filter_val = JSON.stringify({
					// 		"SkillId": skill_id
					// 	});
					// 	var result = callgetlist('GetSkillVersions', filter_val);

					// 	var options = "<option value=''>Select Skill Version</option>";
					// 	for (var i = 0; i < result.length; i++) {
					// 		options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
					// 	}
					// 	$("#skillversion").html(options);

					// });
				}

				if ($(currentfield).hasClass('previous_employer_field')) {
					var dataEmployee = GetPreviousEmployerDetails();

					// clearAndShow();
					messageBox.innerHTML = computeHTML(dataEmployee);
				}

				if ($(currentfield).hasClass('contact_info')) {

					var dataEmployeeContact = GetContactInfo();
					messageBox1.innerHTML = computeHTML_ContactInfo(dataEmployeeContact);
				}
				var currentfield = $(this).next();


				$(this).next().fadeIn();
				// scroll window to beginning of the form
				scroll_to_class($('.f1'), 20);

			});
		}

	});

	// previous step
	$('.f1 .btn-previous').on('click', function () {

		$('#name').removeClass('input-error');
		$('#previous_employer_name_error').html("");
		$('#fdate').removeClass('input-error');
		$('#fdate_error').html("");
		$('#tdate').removeClass('input-error');
		$('#tdate_error').html("");
		$('#address').removeClass('input-error');
		$('#address_error').html("");
		$('#landmark').removeClass('input-error');
		$('#landmark_error').html("");
		$('#state').removeClass('input-error');
		$('#state_error').html("");
		$('#city').removeClass('input-error');
		$('#city_error').html("");
		$('#postal_code').removeClass('input-error');
		$('#postal_code_error').html(" ");
		$('#relationship').removeClass('input-error');
		$('#relationship_error').html("");
		$('#Contactname').removeClass('input-error');
		$('#Contactname_error').html("");
		$('#phno').removeClass('input-error');
		$('#phno_error').html("");
		$('#email').removeClass('input-error');
		$('#email_error').html("");

		$('#skill_grade_error').html("");
		$('#skill_grade').removeClass('input-error');
		$('#family_error').html("");
		$('#family').removeClass('input-error');
		$('#skill_error').html(" ");
		$('#skill').removeClass('input-error');
		$('#skillversion_error').html(" ");
		$('#skillversion').removeClass('input-error');

		if ($(this).hasClass('employer-previous')) {
			getPersonalEmployeedetails();
			$(".person-previous").attr("disabled", "disabled");
		} else if ($(this).hasClass('address-previous')) {
			var dataEmployee1 = GetPreviousEmployerDetails();
			messageBox.innerHTML = computeHTML(dataEmployee1);
			clearAndShow();
		} else if ($(this).hasClass('contact-previous')) {
			var dataEmployeeAddress = GetEmployeeAddress();
			messageBox3.innerHTML = computeHTML_Address(dataEmployeeAddress);
			clearAndShow_Address();
		} else if ($(this).hasClass('skillSet-previous')) {
			var dataEmployeeContact_show = GetContactInfo();
			messageBox1.innerHTML = computeHTML_ContactInfo(dataEmployeeContact_show);
			clearAndShow_ContactInfo();
		}

		// navigation steps / progress steps
		var current_active_step = $(this).parents('.f1').find('.f1-step.active');
		var progress_line = $(this).parents('.f1').find('.f1-progress-line');

		$(this).parents('fieldset').fadeOut(400, function () {
			// change icons
			current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
			// progress bar
			bar_progress(progress_line, 'left');
			// show previous step
			$(this).prev().fadeIn();
			// scroll window to beginning of the form
			scroll_to_class($('.f1'), 20);
		});
	});

	// submit
	$('.f1').on('submit', function (e) {

		// fields validation
		$(this).find('input[type="text"], input[type="password"], textarea').each(function () {
			if ($(this).val() == "") {
				e.preventDefault();
				if ($(this).attr("id") != "Pan-no" && $(this).attr("id") != "pf-no" && $(this).attr("id") != "esi-no" && $(this).attr("id") != "passport_no") {
					$(this).addClass('input-error');
				}
			} else {
				$(this).removeClass('input-error');
			}
		});
		// fields validation

	});
});


// Get login screen caption on page load 445 code //
$(document).ready(function () {
	LandingNumberFront = localStorage.getItem("LandingNumberFront");
	LandingStageFront = localStorage.getItem("LandingStageFront");

	if (LandingNumberFront && LandingStageFront) {
		var fieldSetClasses = ['login_fieldset', 'password_fieldset', 'personal-details', 'employee_fieldset', 'address_fieldset', 'contact_fieldset', 'skill_fieldset'];
		var thisbtn = ".f1 .btn-next";
		var parent_fieldset = $(".f1 .btn-next").parents('fieldset');
		// navigation steps / progress steps
		var current_active_step = $(".f1 .btn-next").parents('.f1').find('.f1-step.active');
		var progress_line = $(".f1 .btn-next").parents('.f1').find('.f1-progress-line');
		landing(LandingNumberFront, progress_line, thisbtn, current_active_step, fieldSetClasses);

		localStorage.removeItem('LandingNumberFront');
		localStorage.removeItem('LandingStageFront');
	} else {
		var result = callgetlist('GetCationsForPage', '{"Page":"oldsynergylogin"}');
		var caption_info = result[0].Info;
		if (result) {
			$('#login-caption').html(caption_info);
		} else {
			$('#login-caption').html("To use our new synergy application, login with your existing credentials");
		}
	}

});
// Get login screen caption on page load 445 code //

//Enter Click page redirection
$(document).keypress(function (e) {
	var key = e.which;
	if (key == 13) // the enter key code
	{
		$(".f1-step").each(function () {
			if ($(this).hasClass("active")) {
				if ($(this).hasClass("oldSynergy")) {
					$(".checkuser").click();
					return false;
				} else if ($(this).hasClass("changePass")) {
					$(".checkpass").click();
					return false;
				} else if ($(this).hasClass("personalDetails")) {
					$(".check-details").click();
					return false;
				}
				// else if($(this).hasClass("previousEmployer")) {
				//     $(".employer-details").click();  
				//     return false;
				// } else if($(this).hasClass("address")) {
				//     $(".address-details").click();  
				//     return false;
				// } else if($(this).hasClass("contactInfo")) {
				//     $(".contact-info").click();   
				//     return false;
				// } else if($(this).hasClass("skillset")) {
				//     $(".skillSetNext").click(); 
				//     return false; 
				// } 
			}
		});
	}
});