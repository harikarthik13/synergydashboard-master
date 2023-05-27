		function ValidatenewCredentials(parent_fieldset,callbk) {
			readTextFile('./files/password_validate.txt',function(password_data){
			var ForgotToken = "statictoken";
			var OldSynergyUserNewPassword = parent_fieldset.find('input[id="new_user_password"]').val();
			var OldSynergyUserNewConfirmPassword = parent_fieldset.find('input[id="new_user_confirm_password"]').val();

			//var check_value = ["g2tech", "g2tech123", "India@123", "g2tech@123", "g2tech1234", "India@1234", "g2tech@1234"];
			var password_lowercase = OldSynergyUserNewPassword.toLowerCase();
			var firstFiveCharacter = password_lowercase.substring(0, 5);
			var common = false; 
			// if(firstFiveCharacter == "g2tech"){
			// 	common = true;
			// } else if(firstFiveCharacter == "india"){
			// 	common = true;
			// }
			let passwordArr = password_data.split(',');
			passwordArr = passwordArr.map(elem => {
				return elem.trim();
			})
			common = passwordArr.includes(OldSynergyUserNewPassword.trim())
			//var isInArray = check_value.includes(OldSynergyUserNewPassword);
			////console.log(isInArray);
			if (OldSynergyUserNewPassword == "" || OldSynergyUserNewConfirmPassword == "") {
				if (OldSynergyUserNewPassword == "") {
					$('#password-error').html("Enter password");
					$('#OldSynergyUserNewPassword').addClass('input-error');
					callbk(false)
				} else if (OldSynergyUserNewConfirmPassword == "") {
					$('#password-error').html("Enter confirm password");
					$('#OldSynergyUserNewConfirmPassword').addClass('input-error');
					callbk(false)
				}
			} else if (common) {
				$('#password-error').html("The password you chose is too common. Please enter different/strong password.");
				$('#OldSynergyUserNewPassword').addClass('input-error');
				callbk(false)
			} else if (OldSynergyUserNewPassword != "" && OldSynergyUserNewConfirmPassword != "") {
				var allLetters = /[A-Z]/;
				var letter = /[a-zA-Z]/;
				var number = /[0-9]/;

				if (!letter.test(OldSynergyUserNewPassword)) {
					$('#password-error').html("Password should contain atleast one string value");
					$('#OldSynergyUserNewPassword').addClass('input-error');
					callbk(false)
				} else if (!allLetters.test(OldSynergyUserNewPassword)) {
					$('#password-error').html("Password should contain atleast one upper case");
					$('#OldSynergyUserNewPassword').addClass('input-error');
					callbk(false)
				} else if (!number.test(OldSynergyUserNewPassword)) {
					$('#password-error').html("Password should contain numeric value");
					$('#OldSynergyUserNewPassword').addClass('input-error');
					callbk(false)
				} else if (OldSynergyUserNewPassword.length < 8 || OldSynergyUserNewPassword.length > 15) {
					$('#password-error').html("Password should be in between 8 to 15 characters");
					$('#OldSynergyUserNewPassword').addClass('input-error');
					callbk(false)
				} else if (OldSynergyUserNewPassword != OldSynergyUserNewConfirmPassword) {
					$('#password-error').html("Password doesnt match");
					$('#OldSynergyUserNewPassword').addClass('input-error');
					$('#OldSynergyUserNewConfirmPassword').addClass('input-error');
					callbk(false)
				} else if (OldSynergyUserNewPassword == OldSynergyUserNewConfirmPassword) {

					parent_fieldset.find('input[id="new_user_password"]').val(EncryptPassword(OldSynergyUserNewPassword));
					parent_fieldset.find('input[id="new_user_confirm_password"]').val(EncryptPassword(OldSynergyUserNewPassword));
					var OldSynergyUserNewPassword = $("#new_user_password").val();
					var localget = localStorage.getItem("UserCheckRes");
					var jsonData = JSON.parse(localget);
					// ////console.log(jsonData['Data'][0]);

					var OldSynergyUserNewConfirmPassword = parent_fieldset.find('input[id="new_user_confirm_password"]').val();
					parent_fieldset.find('input[id="new_user_confirm_password"]').removeClass('input-error');
					var data = []
					data = {
						"Method": "RegisterNewPassword",
						"Data": {
							"EmployeeID": jsonData['Data'][0]['EmployeeID'],
							"ForgotPasswordToken": jsonData['Data'][0]['ForgotPasswordToken'],
							"NewSecret": OldSynergyUserNewPassword
						}
					}

					callbk(data)
				} else {
					//alert("password and confirm password should be same");
					callbk(false)
				}
			} else {
				//alert("Enter all fields");
				callbk(false)
			}
		})

		}



		function validationSuccess_password(postCall) {
			//localStorage.setItem("UserCheckRes",JSON.stringify(postCall));
			localStorage.setItem("PasswordFieldRes", JSON.stringify(postCall));
			localStorage.setItem("securityToken", postCall.Data[0].AuthorizeToken);
			next_step = true;
			var result = callgetlist('GetCationsForPage', '{"Page":"personaldetails"}');
			var caption_info = result[0].Info;
			if (result) {
				$('#personaldetails-caption').html(caption_info);
			} else {
				$('#personaldetails-caption').html("To use our new synergy application, login with your existing credentials");
			}
			////console.log('in')
		}