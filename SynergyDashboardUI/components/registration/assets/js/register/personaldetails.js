// Profile image on change function //

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			resizeThumb(e.target.result)
			// $('#profile-img-tag').attr('src', e.target.result);
			// $('#profile-img-tag').attr('data-src', e.target.result);
			// $("#image_upload_error").html("");
		}
		reader.readAsDataURL(input.files[0]);
	}
}
$("#profile-img").change(function () {
	readURL(this);
});
// Profile image on change function //



function resizeThumb(base64Url) {
	let img = new Image();
	img.onload = () => {
		var oc = document.createElement('canvas'),
			octx = oc.getContext('2d');
		oc.width = 150;
		oc.height = 150;
		octx.drawImage(img, 0, 0, oc.width, oc.height);
		////console.log('oc ->  ', oc.toDataURL());
		ResizeURL = oc.toDataURL();

		$('#profile-img-tag').attr('src', ResizeURL);
		$('#profile-img-tag').attr('data-src', ResizeURL);
		$("#image_upload_error").html("");

		//return oc.toDataURL();
	}
	img.onerror = () => {
		//console.log('Error in rendering image');
		return false;
	}

	img.src = base64Url;


}

function Validatepersonaldetails(parent_fieldset, dashboard = false, profile_image = null) {
	var FatherName = parent_fieldset.find('input[id="father-name"]').val();
	var PfNumber = parent_fieldset.find('input[id="pf-no"]').val();
	var Dob = parent_fieldset.find('input[id="dob"]').val();
	var EsiNumber = parent_fieldset.find('input[id="esi-no"]').val();
	var DateOfJoining = parent_fieldset.find('input[id="date-of-joining"]').val();
	var CorporateEmail = parent_fieldset.find('input[id="cop-email"]').val();
	var GitLabName = parent_fieldset.find('input[id="gitlab-name"]').val();
	var MartialStatus = parent_fieldset.find('select[id="marital_status"]').val();
	var BloodGroup = parent_fieldset.find('select[id="blood-group"]').val();
	var PanNumber = parent_fieldset.find('input[id="Pan-no"]').val();
	var passportNum = parent_fieldset.find('input[id="passport_no"]').val();
	if (profile_image == null) {
		var fileInput = document.getElementById("profile-img");
		var imgSrc = $(".profile-img-tag").attr("data-src");
	} else {
		var fileInput = document.getElementById("profile-img-dashboard");
		var imgSrc = $(".profile-img-tag").attr("src");
	}

	//console.log("profile-img-tag", imgSrc);

	var ImagetoUpload;

	var cor_email = document.getElementById('cop-email').value;
	var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;

	var doj_year = moment(DateOfJoining).format("YYYY");

	var dob_year = moment(Dob).format("YYYY");

	var newdate = new Date();

	var current_year = moment(newdate).format("YYYY");
	//alert(current_year);

	var next_step = true;

	if (fileInput.files.length > 0) {
		for (var i = 0; i <= fileInput.files.length - 1; i++) {

			var fsize = fileInput.files.item(i).size;
			var file = Math.round((fsize / 1024));
			// alert(fsize);
			// The size of the file. 
			if (file > 100) {
				$('.image_upload_error').html("Please upload Image below 100kb");
				next_step = false;
			}
			else {
				$('.image_upload_error').html(" ");
				next_step = true;
			}
		}
	}

	var min_date = "1940-01-01";
	var min_year = moment(min_date).format("YYYY");
	//[a-zA-Z_-.]+@((hotmail)|(yahoo))\.[a-z]{2,4}

	if (FatherName == "" || Dob == "" || DateOfJoining == "" || CorporateEmail == "" ||
		MartialStatus == "" || BloodGroup == "" || doj_year < 1996 || doj_year > current_year ||
		dob_year < min_year || dob_year > current_year || imgSrc == "" || FatherName.length <= 3) {
		if (FatherName == "") {
			$('#father-name').addClass('input-error');
			$('#father_name_error').html("Enter Father name");
			next_step = false;
		} else if (FatherName.length <= 3) {
			$('#father-name').addClass('input-error');
			$('#father_name_error').html('Atleast add more than 3 characters');
		} else {
			$('#father-name').removeClass('input-error');
			$('#father_name_error').html("");
		}


		if (DateOfJoining == "") {
			$('#date-of-joining').addClass('input-error');
			$('#doj_error').html("Enter date of joining");
			next_step = false;
		} else if (doj_year < 1996) {
			$('#date-of-joining').addClass('input-error');
			$('#doj_error').html("Please select date of joining after 1996");
			next_step = false;
		} else if (doj_year > current_year) {
			$('#date-of-joining').addClass('input-error');
			$('#doj_error').html("Please ensure your date of joining");
			next_step = false;
		} else {
			$('#date-of-joining').removeClass('input-error');
			$('#doj_error').html("");
		}



		// if (doj_year < 1996 || doj_year > current_year) {
		// 	$('#date-of-joining').addClass('input-error');
		// 	$('#doj_error').html("Please select date of joining after 1996");
		// 	next_step = false;
		// }

		// else
		// {
		// 	$('#date-of-joining').removeClass('input-error');
		// 	$('#doj_error').html("");
		// } 
		if (Dob == "") {
			$('#dob').addClass('input-error');
			$('#dob_error').html("Enter date of birth");
			next_step = false;
		} else if (dob_year < min_year) {
			$('#dob').addClass('input-error');
			$('#dob_error').html("Select correct date of birth");
			next_step = false;
		} else if (dob_year > current_year) {
			$('#dob').addClass('input-error');
			$('#dob_error').html("Select correct date of birth");
			next_step = false;
		} else {
			$('#dob').removeClass('input-error');
			$('#dob_error').html("");
		}


		// if (dob_year < min_year) {
		// 	$('#dob').addClass('input-error');
		// 	$('#dob_error').html("Select correct date of birth");
		// 	next_step = false;
		// }

		// else
		// {
		// 	$('#dob').removeClass('input-error');
		// 	$('#dob_error').html("");
		// }

		if (MartialStatus == "") {
			$('#marital_status').addClass('input-error');
			$('#marital_status_error').html("Enter marital status");
			next_step = false;
		} else {
			$('#marital_status').removeClass('input-error');
			$('#marital_status_error').html("");
		}
		if (BloodGroup == "") {
			$('#blood-group').addClass('input-error');
			$('#blood_group_error').html("Enter blood group");
			next_step = false;
		} else {
			$('#blood-group').removeClass('input-error');
			$('#blood_group_error').html("");
		}
		if (CorporateEmail == "") {
			$('#cop-email').addClass('input-error');
			$('#corporate_email_id_error').html("Enter corporate email id");
			next_step = false;
		} else {
			$('#cop-email').removeClass('input-error');
			$('#corporate_email_id_error').html("");
		}
		if (imgSrc == "") {
			$('#image_upload_error').html("Please upload Image");
			next_step = false;
		} else {
			$('#image_upload_error').html("");
		}


	} else if (cor_email !== "" || PanNumber != "" || PfNumber != "" || EsiNumber != "" || passportNum != "") {
		if (PanNumber != "" || PfNumber != "" || EsiNumber != "" || passportNum != "") {
			// if (GitLabName == "") {
			// 	$('#gitlab-name').addClass('input-error');
			// 	$('#gitlab_name_error').html("Enter valid UserName");
			// 	next_step = false;
			// } else {
			// 	$('#gitlab-name').removeClass('input-error');
			// 	$('#gitlab_name_error').html("");
			// }

			if (PanNumber != "" && PanNumber.length != 10) {
				$('#pan-no').addClass('input-error');
				$('#pan_error').html("Enter valid 10 Digit PAN Number");
				next_step = false;
			} else {
				$('#pan-no').removeClass('input-error');
				$('#pan_error').html("");
			}
			
			if (PfNumber != "" && (PfNumber.length < 16 || PfNumber.length >= 50)) {
				$('#pf-no').addClass('input-error');
				$('#pf_error').html("Enter Valid PF Number");
				next_step = false;
			} else {
				$('#pf-no').removeClass('input-error');
				$('#pf_error').html("");
			}
			if (EsiNumber != "" && (EsiNumber.length < 17 || EsiNumber.length >= 22)) {

				$('#esi-no').addClass('input-error');
				$('#esi_error').html("Enter Valid ESI Number");
				next_step = false;
			} else {
				$('#esi-no').removeClass('input-error');
				$('#esi_error').html("");
			}
			if (passportNum != "" && passportNum.length != 8) {
				$('#passport-no').addClass('input-error');
				$('#passport_error').html("Enter Valid 8 Digit Passport Number");
				next_step = false;
			} else {
				$('#passport-no').removeClass('input-error');
				$('#passport_error').html("");
			}

		}

        if (next_step != false) {
            var savedata = false;
            if (re.test(cor_email)) {
                if (window.location.href.indexOf("cgvak.com") > -1) {
                    if (!(cor_email.indexOf('@cgvakindia.com', cor_email.length - '@cgvakindia.com'.length) !== -1) &&
                        !(cor_email.indexOf('@cgvak.com', cor_email.length - '@cgvakindia.com'.length) !== -1)) {
                        $('#cop-email').addClass('input-error');
                        $('#corporate_email_id_error').html('Email must be in (your.name@cgvak.com ( or ) your.name@cgvakindia.com).');
                        next_step = false;
                        /*//post api*/
                    }
                    else {
                        savedata = true;
                    }
                }
                else if (window.location.href.indexOf("g2techsoft.com") > -1) {

                    if (!(cor_email.indexOf('@g2tsolutions.com', cor_email.length - '@g2tsolutions.com'.length) !== -1) &&
                        !(cor_email.indexOf('@g2techsoft.com', cor_email.length - '@g2tsolutions.com'.length) !== -1)) {
                        $('#cop-email').addClass('input-error');
                        $('#corporate_email_id_error').html('Email must be in (your.name@g2tsolutions.com ( or ) your.name@g2techsoft.com).');
                        next_step = false;
                        /*//post api*/
                    }
                    else {
                        savedata = true;
                    }
                }
                else {
                    savedata = true;
                }
                if (savedata == true) {

					next_step = true;
					$('#father-name').removeClass('input-error');
					$('#father_name_error').html("");
					$('#date-of-joining').removeClass('input-error');
					$('#doj_error').html("");
					$('#dob').removeClass('input-error');
					$('#dob_error').html("");
					$('#marital_status').removeClass('input-error');
					$('#marital_status_error').html("");
					$('#blood-group').removeClass('input-error');
					$('#blood_group_error').html("");
					$('#cop-email').removeClass('input-error');
					$('#corporate_email_id_error').html("");

					//if (file.length > 0) {
					if (fileInput.files.length > 0) {
						////console.log('image present');
						////console.log(file);
						var imgup = encodeImagetoBase64(fileInput)
						function encodeImagetoBase64(element) {
							var file = element.files[0];
							////console.log(file);
							var reader = new FileReader();
							reader.onloadend = function () {
								ImagetoUpload = reader.result
								postapi();
							}
							reader.readAsDataURL(file);
						}
					} else {
						ImagetoUpload = null;
						if (imgSrc != '') {
							ImagetoUpload = imgSrc;
						}
						////console.log("no image")
						next_step = postapi();

					}

					//postapi
					function postapi() {						
						//console.log("postapi - ImagetoUpload", ImagetoUpload);
						var localget = localStorage.getItem("UserCheckRes");
						var jsonData = JSON.parse(localget);
						var data = []
						data = {
							"Method": "PostPersonalDetails",
							"Data": {
								"EmployeeId": "",
								"FatherName": FatherName,
								"PFNo": PfNumber,
								"DateOfBirth": Dob,
								"ESINo": EsiNumber,
								"DateOfJoining": DateOfJoining,
								"CorporateEmail": CorporateEmail,
								"GitlabUsername": GitLabName,
								"MaritalStatusId": MartialStatus,
								"BloodGroupID": BloodGroup,
								"PANNo": PanNumber,
								"PassPortNo": passportNum,
								"ProfilePicture": ImagetoUpload
							}
						}


						var postCall = PostDataCall(data);
						// console.log(postCall);
						if (postCall['IsSuccess'] == true) {
							callgetlist('GenerateEmployeeProfilePictures', '{}');
							var Employee_id = localStorage.getItem("EmployeeID");
							var ProfilePicture = imageFilesPath+Employee_id+'.png';
							$(".profile-pic").css("background-image", "url(" + ImagetoUpload + ")");
							
							validationSuccess_details(postCall);
							if (dashboard == true) {
								$("#personal-details .text-green").html(postCall['Message']);
							}
							next_step = true;
							presonalData = {
								"Method": "UpdateStageCompleted",
								"Data": {
									"StageNumber": 3
								}
							}
							var postCall = PostDataCall(presonalData);
						} else {
							next_step = false;
							//alert(postCall['Message']);
							if (dashboard == true) {
								$("#personal-details .text-red").html(postCall['Message']);
							}
						}
						return next_step;
					}

				}
			} else {

				$('#corporate_email_id_error').html('Not a valid e-mail address.');
				next_step = false;
			}
		}
	}
	return next_step;
}

//

function validationSuccess_details(postCall) {
	next_step = true;
	var result = callgetlist('GetCationsForPage', '{"Page":"previousemployer"}');
	var caption_info = result[0].Info;
	if (result) {
		$('#previousemployer-caption').html(caption_info);
	} else {
		$('#previousemployer-caption').html("To use our new synergy application, login with your existing credentials");
	}
	////console.log('validationSuccess_details');
}

//Get Personal Employee details
function getPersonalEmployeedetails() {
	var filter_val = '';
	var result = callgetlist('GetBloodMaster', filter_val);
	var options = "<option value=''>Select Blood Group</option>";
	if(result != null){
		for (var i = 0; i < result.length; i++) {
			options += "<option value='" + result[i].Id + "'>" + result[i].Name + "</option>";
		}
	}
	$("#blood-group").html(options);

	// api to get personal-details

	var filter_val = '';
	var result = callgetlist('GetMaritalStatusMaster', filter_val);
	var options = "<option value=''>Select Martial Status</option>";
	if(result != null){
		for (var i = 0; i < result.length; i++) {
			options += "<option value='" + result[i].Id + "'>" + result[i].Status + "</option>";
		}
	}
	$("#marital_status").html(options);

	var filter_val = JSON.stringify({
		"IsActive": true
	});
	var result = callgetlist('GetEmployeePersonalDetails', '');
	$("#father-name").val(result[0]['FatherName']);
	var dob = result[0]['DateOfBirth'];
	var date = result[0]['DateOfJoining'];
	var DateOfJoining = moment(date).format("YYYY-MM-DD");
	var dob = moment(dob).format("YYYY-MM-DD");
	$("#dob").attr("value", dob);
	$("#date-of-joining").attr("value", DateOfJoining);
	$("#blood-group").val(result[0]['BloodGroupID']);
	$("#marital_status").val(result[0]['MaritalStatusId']);
	$("#cop-email").val(result[0]['CorporateEmailID']);	
	$("#gitlab-name").val(result[0]['GitlabUsername']);	
	
	$("#Pan-no").val(result[0]['PANNo']);
	$("#pf-no").val(result[0]['PFNo']);
	$("#esi-no").val(result[0]['ESINo']);
	$("#passport_no").val(result[0]['PassPortNo']);

	$("#profile-img-tag").attr("data-src", "");
	var Employee_id = localStorage.getItem("EmployeeID");
    var ProfilePicture = imageFilesPath+Employee_id+'.png';
	if (ProfilePicture != null) {
		$("#profile-img-tag").attr("src", ProfilePicture);
		$("#profile-img-tag").attr("data-src", ProfilePicture);
	}
}