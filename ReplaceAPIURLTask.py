import os
synergyAPIURL = 'http://203.223.189.45:85/synergydashboardapi_dev/api/Synergy/'
defaultWorkingDirectory = 'SynergyDashboardUI/js/callapi.js'
replaceText = 'var SynergyAPIURL = "' + synergyAPIURL + '" ; // var SynergyAPIURL'
print(synergyAPIURL)
print(defaultWorkingDirectory)

# Read in the file
with open(defaultWorkingDirectory, 'r') as file :
  filedata = file.read()

# Replace the target string
filedata = filedata.replace('var SynergyAPIURL', replaceText)

# Write the file out again
with open(defaultWorkingDirectory, 'w') as file:
  file.write(filedata)