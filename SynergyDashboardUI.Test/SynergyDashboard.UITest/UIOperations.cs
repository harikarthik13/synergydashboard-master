#region Name Space
using Newtonsoft.Json;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.IE;
using OpenQA.Selenium.Interactions;
using OpenQA.Selenium.Opera;
using OpenQA.Selenium.Safari;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text.RegularExpressions;
#endregion

namespace SynergyDashboard.Test
{
    public class UIOperations
    {
        #region Variable Declaration
        private IWebDriver driver = null;
        private string url = ConfigurationManager.AppSettings["TestUrl"];
        public List<string> ErrorList { get; set; }
        private int errorNumber = 1;
        public List<PreCompiledTests> PreCompliedTestList { get; set; }
        public string ScreenshotDirectory { get; set; }
        public string _borwserType = string.Empty;
        #endregion

        #region UI Operations
        /// <summary>
        /// Constructor for the UIOperations
        /// </summary>
        /// <param name="browserType"></param>
        public UIOperations(string browserType)
        {
            _borwserType = browserType;
        }
        #endregion

        #region UI Operation
        /// <summary>
        /// Run the test steps based on the action
        /// </summary>
        /// <param name="testSteps">TestSteps object as params</param>
        /// <param name="expectResult">ExpectResult as params</param>
        /// <param name="actualValue">ActualValue as params</param>
        /// <returns>Returns true if the UI action is successful</returns>
        public bool PerformUIAction(TestSteps testSteps, bool expectResult, out string actualValue)
        {
            bool result = expectResult == false ? true : false;
            actualValue = string.Empty;

            if (!string.IsNullOrEmpty(testSteps.Element) && testSteps.Action != "DragAndDrop" && testSteps.Action != "CheckIfNotPresent" && testSteps.Action != "ButtonIsEnabled" && testSteps.Action != "ButtonIsNotEnabled")
            {
                try
                {
                    IWebElement webElement = null;
                    var resultData = GetElementByElementType(testSteps.ElementType, testSteps.Element);
                    if (resultData != null)
                    {
                        webElement = resultData;
                        Actions actions = new Actions(driver);
                        actions.MoveToElement(webElement);
                        actions.Perform();
                    }
                }
                catch (Exception ex)
                {
                    // CloseBroswer();
                    string er = ex.Message;
                    return false;
                }
            }

            //bool result = false;
            if (testSteps.Action == "OpenBrowser")
            {
                OpenBroswer(url);
            }
            else if (testSteps.Action == "OpenCustomURL")
            {
                OpenBroswerWithCustomUrl(url + testSteps.Value);
            }
            else if (testSteps.Action == "OpenNewURL")
            {
                OpenBroswerWithCustomUrl(testSteps.Value);
            }
            else if (testSteps.Action == "CloseBrowser")
            {
                CloseBroswer();
            }
            else if (testSteps.Action == "Screenshot")
            {
                Screenshot(testSteps.TestCaseId, testSteps.CurrentLineNumber);
            }
            else if (testSteps.Action == "Input")
            {
                AssignFieldElement(testSteps.Element, testSteps.Value, testSteps.ElementType);
            }
            else if (testSteps.Action == "CheckIsEmpty")
            {
                result = CheckIsEmpty(testSteps.ElementType, testSteps.Element);
            }
            else if (testSteps.Action == "CheckIsNumber")
            {
                result = CheckIsNumber(testSteps.ElementType, testSteps.Element);
            }
            else if (testSteps.Action == "CheckIsDecimal")
            {
                result = CheckIsDecimal(testSteps.ElementType, testSteps.Element);
            }
            else if (testSteps.Action == "XPath")
            {
                FindElememtByXpath(testSteps.Element, testSteps.Value);
            }
            else if (testSteps.Action == "Click")
            {
                ClickFieldElement(testSteps.ElementType, testSteps.Element);
            }
            else if (testSteps.Action == "Wait")
            {
                Wait(Convert.ToInt32(testSteps.Value), driver, testSteps.Element);
            }
            else if (testSteps.Action == "ButtonIsEnabled")
            {
                result = IsElementEnabled(testSteps.ElementType, testSteps.Element);
            }
            else if (testSteps.Action == "ButtonIsNotEnabled")
            {
                result = IsElementNotEnabled(testSteps.ElementType, testSteps.Element);
            }
            else if (testSteps.Action == "CheckIfPresent")
            {
                result = IsElementExist(testSteps.ElementType, testSteps.Element);
            }
            else if (testSteps.Action == "CheckIfNotPresent")
            {
                result = IsElementNotExist(testSteps.ElementType, testSteps.Element);
            }
            else if (testSteps.Action == "CheckGridRowCount")
            {
                result = CheckGridRowCountCondition(testSteps.ElementType, testSteps.Element, testSteps.Value);
            }
            else if (testSteps.Action == "SelectGridRow")
            {
                SelectDevextremeGridRow(testSteps.Element);
            }
            else if (testSteps.Action == "EditGridRow")
            {
                EditDevextremeGridRow(testSteps.ElementType, testSteps.Element, testSteps.Value);
            }
            else if (testSteps.Action == "CheckValue")
            {
                result = CheckValueForControls(testSteps.ElementType, testSteps.Element, testSteps.Value);
            }
            else if (testSteps.Action == "PreCompiled")
            {
                var preCompiledId = testSteps.Value;
                result = ExecutePreCompliedTestById(preCompiledId);
            }
            else if (testSteps.Action == "Test")
            {
                result = TestFieldElement(testSteps, out actualValue);
            }
            else if (testSteps.Action == "DragAndDrop")
            {
                DragCardFromColumnToColumn(testSteps.Element);
            }
            else if (testSteps.Action == "Refresh")
            {
                driver.Navigate().Refresh();
            }

            return result;
        }

        /// <summary>
        /// Run the precompiled test steps
        /// </summary>
        /// <param name="preCompiledTestId">Gets the precompiled test id</param>
        /// <returns>Returns true if the precomplied test is executed for the expected value</returns>
        public bool ExecutePreCompliedTestById(string preCompiledTestId)
        {
            bool result = false;
            var testForPreCompile = PreCompliedTestList.Where(preCompile => preCompile.Id.Equals(preCompiledTestId)).FirstOrDefault();

            if (testForPreCompile != null)
            {
                foreach (var step in testForPreCompile.TestStepsList)
                {
                    bool expectResult = testForPreCompile.TestStepsList.Any(x => x.Action.Equals("Test"));
                    result = PerformUIAction(step, expectResult, out string actualValue);

                    if (!result)
                    {
                        ErrorList.Add("Failed     " + errorNumber++ + ". Test Case: " + step.TestCaseId + ", Expected Result: " + step.ExpectedResult + ", Actual Result:" + actualValue + ", Action: " + step.Action);
                        break;
                    }
                }
            }
            return result;
        }
        #endregion

        #region Private Methods
        /// <summary>
        /// Load the driver (for the sent browser)
        /// </summary>
        /// <param name="browserType">BrowserType as params</param>
        /// <returns>Returns WebDriver obj</returns>
        private IWebDriver LoadDriver(string browserType)
        {
            if (browserType == "chrome")
            {
                String driverPath = "/opt/selenium/";        
                String driverExecutableFileName = "chromedriver";
                ChromeOptions options = new ChromeOptions();
                options.AddArguments("headless");
                options.AddArguments("no-sandbox");        
                options.BinaryLocation = "/opt/google/chrome/chrome";            
                ChromeDriverService service = ChromeDriverService.CreateDefaultService(driverPath,driverExecutableFileName);         
                driver = new ChromeDriver(service,options,TimeSpan.FromSeconds(30));
                driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(40);
                driver.Manage().Window.Maximize();                   

                // ChromeOptions chromeOptions = new ChromeOptions();
                // chromeOptions.AddArgument("--window-size=1360,1000");

                return driver;
            }
            else if (browserType == "firefox")
            {
                return new FirefoxDriver();
            }
            else if (browserType == "edge")
            {
                return new EdgeDriver();
            }
            else if (browserType == "safari")
            {
                return new SafariDriver();
            }
            else if (browserType == "ie")
            {
                return new InternetExplorerDriver();
            }
            else if (browserType == "opera")
            {
                return new OperaDriver();
            }
            else
            {
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.AddArgument("--window-size=1360,768");

                return new ChromeDriver(chromeOptions);
            }
        }

        /// <summary>
        /// Opens the browser using the driver and browses the URL
        /// </summary>
        /// <param name="url">Gets the URL which must be browsed</param>
        private void OpenBroswer(string url)
        {
            driver = LoadDriver(_borwserType);
            driver.Navigate().GoToUrl(url);

        }

        /// <summary>
        /// Open Browser with Custom URL
        /// </summary>
        /// <param name="url">URL</param>
        private void OpenBroswerWithCustomUrl(string url)
        {
            //  driver = LoadDriver(_borwserType);
            driver.Navigate().GoToUrl(url);

        }
        /// <summary>
        /// Tacke a screenshot of the page
        /// </summary>
        /// <param name="testCaseId">TestCaseId as params</param>
        /// <param name="lineNo">LineNo as params</param>
        private void Screenshot(string testCaseId, string lineNo)
        {
            Screenshot ss = ((ITakesScreenshot)driver).GetScreenshot();

            string screenshot = ss.AsBase64EncodedString;
            byte[] screenshotAsByteArray = ss.AsByteArray;
            ss.SaveAsFile(ScreenshotDirectory + "/" + testCaseId + "_" + lineNo + ".png", ScreenshotImageFormat.Png); //use any of the built in image formating
        }

        /// <summary>
        /// Click (Edit or Delete) buttons in the devextreme grid row. 
        /// </summary>
        /// <param name="elementType">ElementType as params</param>
        /// <param name="element">ElementId as params</param>
        /// <param name="value">Value as params</param>
        private void EditDevextremeGridRow(string elementType, string element, string value)
        {
            string script;
            object dataKey;

            script = " return $('#" + element + "').dxDataGrid('instance').getKeyByRowIndex(0)";
            dataKey = ExecuteJavaScriptQuery(script);
            value = value + Convert.ToString(dataKey);
            ClickFieldElement(elementType, value);
        }

        /// <summary>
        /// Excution will stops for the provided time (seconds).
        /// </summary>
        /// <param name="seconds">Seconds as params</param>
        /// <param name="webDriver">WebDriver as params</param>
        /// <param name="element">Element as params</param>
        private static void Wait(int seconds, IWebDriver webDriver, string element)
        {
            WebDriverWait wait = new WebDriverWait(webDriver, new TimeSpan(0, 0, 50));
            //wait.Until(driver =>
            //{
            //    bool isAjaxFinished = (bool)((IJavaScriptExecutor)driver).
            //        ExecuteScript("return jQuery.active == 0");
            //    bool isLoaderHidden = (bool)((IJavaScriptExecutor)driver).
            //        ExecuteScript("return $('#loading').is(':visible') == false");
            //    return isAjaxFinished && isLoaderHidden;

            //    //return driver.FindElements(By.Id(element)).Count == 0;
            //});

            System.Threading.Thread.Sleep(seconds * 1000);
        }

        /// <summary>
        /// Closes the driver which was opened for testing
        /// </summary>
        /// <param name="driver">Gets the driver details</param>
        private void CloseBroswer()
        {
            try
            {
                if (driver != null)
                {
                    driver.Close();
                    driver.Dispose();
                }
            }
            catch (Exception)
            {

            }
        }

        /// <summary>
        /// Find the element in the page by XPATH and input the value
        /// </summary>
        /// <param name="element">Element XPATH as params</param>
        /// <param name="value">Value as params</param>
        private void FindElememtByXpath(string element, string value)
        {
            if (driver != null)
            {
                var elementName = driver.FindElement(By.XPath(element));
                elementName.Clear();
                elementName.Click();
                elementName.SendKeys(value);
            }
        }

        /// <summary>
        /// Check whether the input is number or not
        /// </summary>
        /// <param name="elementType">ElementType as params</param>
        /// <param name="element">ElementId as params</param>
        /// <returns>Return true if the input is number</returns>
        private bool CheckIsNumber(string elementType, string element)
        {
            try
            {
                Regex regex = new Regex("^[0-9]*$");
                var result = GetElementByElementType(elementType, element);
                if (result != null)
                {
                    string value = result.GetAttribute("value");
                    if (!string.IsNullOrEmpty(value))
                    {
                        if (regex.IsMatch(value))
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Check whether the input is empty or not
        /// </summary>
        /// <param name="elementType">ElementType as params</param>
        /// <param name="element">ElementId as params</param>
        /// <returns>Return true the input is null or empty</returns>
        private bool CheckIsEmpty(string elementType, string element)
        {
            try
            {
                string value;
                value = GetElementByElementType(elementType, element)?.GetAttribute("value");

                if (string.IsNullOrEmpty(value))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Check whether the input is decimal or not
        /// </summary>
        /// <param name="elementType">ElementType as params</param>
        /// <param name="element">ElementId as params</param>
        /// <returns>Return true if the input is true</returns>
        private bool CheckIsDecimal(string elementType, string element)
        {
            try
            {
                string value;
                decimal result;

                value = GetElementByElementType(elementType, element)?.GetAttribute("value");

                if (decimal.TryParse(value, out result))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Assign a value to the UI field
        /// </summary>
        /// <param name="driver">Gets the driver details</param>
        /// <param name="element">Gets the element details for which the value must be written</param>
        /// <param name="value">Gets the value which must be written in the UI element</param>
        /// <param name="elementType">Gets the element Type</param>
        private void AssignFieldElement(string element, string value, string elementType)
        {
            if (driver != null)
            {
                if (element.Substring(0, 1) == "/")
                {
                    var result = GetElementByElementType(elementType, element);
                    if (result != null)
                    {
                        IWebElement webElement = result;
                        webElement.Clear();
                        webElement.Click();
                        webElement.SendKeys(value);
                        ExecuteJavaScriptQuery("!!document.activeElement ? document.activeElement.blur() : 0");
                    }
                }
                else if (element.Substring(0, 2) == "gd")
                {
                    //Set input value for Devextreme controls
                    string script = DevextremeControlInputs(element, value);
                    ExecuteJavaScriptQuery(script);
                    ExecuteJavaScriptQuery("!!document.activeElement ? document.activeElement.blur() : 0");
                }
                else
                {
                    //Set input value for HTML controls
                    var result = GetElementByElementType(elementType, element);
                    if (result != null)
                    {
                        IWebElement elementName = result;

                        //Select the value for HTML drop down element.
                        if (element.Substring(2, 3) == "cmb")
                        {
                            var selectElement = new SelectElement(elementName);
                            selectElement.SelectByText(value);
                        }
                        else if (element.Substring(2, 3) == "rbt")
                        {
                            elementName.Click();
                        }
                        else
                        {
                            elementName.Clear();
                            elementName.Click();
                            elementName.SendKeys(value);
                            elementName.Click();
                        }
                        ExecuteJavaScriptQuery("!!document.activeElement ? document.activeElement.blur() : 0");
                    }
                }
            }
            else
            {
                ErrorList.Add("Failed: Driver not initalized at AssignFieldElement");
            }
        }

        /// <summary>
        /// Check the expected value matches the element value
        /// </summary>
        /// <param name="elementType">Gets the Element Type </param>
        /// <param name="element">Gets the UI Element </param>
        /// <param name="value">Gets the element value</param>
        /// <returns>Returns true if the condition is passed</returns>
        private bool CheckValueForControls(string elementType, string element, string value)
        {
            if (driver != null)
            {
                string actualValue = "";

                if (element.Substring(0, 2) == "gd")
                {
                    //Set input value for Devextreme controls
                    return CheckDevextremeControlValue(element, value);
                }
                else
                {
                    //Set input value for HTML controls
                    IWebElement webElement = null;
                    var result = GetElementByElementType(elementType, element);
                    if (result != null)
                    {
                        webElement = result;
                        actualValue = webElement.GetAttribute("value");
                    }
                }

                if (actualValue == value)
                    return true;
                else
                    return false;
            }
            else
            {
                ErrorList.Add("Failed: Driver not initalized at AssignFieldElement");
            }

            return false;
        }

        /// <summary>
        /// Clicks the field Element mentioned
        /// </summary>
        /// <param name="elementType">Element Type</param>
        /// <param name="element">Gets the UI element</param>
        private void ClickFieldElement(string elementType, string element)
        {
            if (driver != null)
            {
                IWebElement webElement = null;
                var result = GetElementByElementType(elementType, element);
                if (result != null)
                {
                    webElement = result;
                    Actions action = new Actions(driver);
                    action.MoveToElement(webElement).Perform();
                    webElement.Click();
                }
            }
            else
            {
                ErrorList.Add("Failed: Driver not initalized at ClickFieldElement");
            }
        }

        /// <summary>
        /// Check the devextreme grid row count with the expected value.
        /// </summary>
        /// <param name="elementType"ElementType as params></param>
        /// <param name="element">ElementId as params</param>
        /// <param name="value">Value as params</param>
        /// <returns>Returns true if the condition is satisfied</returns>
        private bool CheckGridRowCountCondition(string elementType, string element, string value)
        {
            if (driver != null)
            {
                try
                {
                    int actualValue = 0;
                    var condition = value.Split(':')[0];
                    int expectedValue = Convert.ToInt32(value.Split(':')[1]);
                    var result = GetRowElementsByElementType(element);
                    if (result != null)
                    {
                        var actualRows = result.Count;
                        //TODO: Temporart Fix - Devextreme grid has single hidden row in the grid, So we subtract 1 from the actual rows present in the grid.
                        actualValue = actualRows - 1;
                    }

                    return ApplyGridCountCondition(condition, actualValue, expectedValue);
                }
                catch (NoSuchElementException)
                {
                    return false;
                }
            }
            else
            {
                ErrorList.Add("Failed: Driver not initalized at ClickFieldElement");
                return false;
            }
        }

        /// <summary>
        /// Get the elements name
        /// </summary>
        /// <param name="element">ElementId as params</param>
        /// <returns>Return the elements name</returns>
        private IReadOnlyCollection<IWebElement> GetRowElementsByElementType(string element)
        {
            try
            {
                var actualRows = driver.FindElements(By.XPath("//*[@id='" + element + "']/div/div[6]/div/table/tbody/tr"));
                return actualRows;
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Apply the grid row count condition.
        /// </summary>
        /// <param name="condition">Grid condition</param>
        /// <param name="actualValue">Gets the actual value</param>
        /// <param name="expectedValue">Gets the expected value</param>
        /// <returns>Returns true if the condition is matched</returns>
        private bool ApplyGridCountCondition(string condition, int actualValue, int expectedValue)
        {
            if (condition == "=")
                return actualValue == expectedValue ? true : false;
            else if (condition == ">=")
                return actualValue >= expectedValue ? true : false;
            else if (condition == "<=")
                return actualValue <= expectedValue ? true : false;
            else if (condition == ">")
                return actualValue > expectedValue ? true : false;
            else if (condition == "<")
                return actualValue < expectedValue ? true : false;
            else if (condition == "!=")
                return actualValue != expectedValue ? true : false;
            else
                return false;
        }

        /// <summary>
        /// Check the given element is present in the page
        /// </summary>
        /// <param name="elementType">ElementType as params</param>
        /// <param name="element">ElementId as aparams</param>
        /// <returns>Return true if the element exist</returns>
        private bool IsElementExist(string elementType, string element)
        {
            if (driver != null)
            {
                try
                {
                    var result = GetElementByElementType(elementType, element);
                    if (result != null)
                    {
                        var elementName = result.Displayed;
                        return elementName;
                    }
                    else
                    {
                        return false;
                    }
                }
                catch (NoSuchElementException)
                {
                    return false;
                }
            }
            else
            {
                ErrorList.Add("Failed: Driver not initalized at ClickFieldElement");
                return false;
            }
        }

        /// <summary>
        /// Get the element name
        /// </summary>
        /// <param name="elementType">ElementType as params</param>
        /// <param name="element">ElementId as aparams</param>
        /// <returns>Return the element</returns>
        private IWebElement GetElementByElementType(string elementType, string element)
        {
            try
            {
                if (elementType == "Id")
                {
                    var elementName = driver.FindElement(By.Id(element));
                    return elementName;
                }
                else if (elementType == "Xpath")
                {
                    var elementName = driver.FindElement(By.XPath(element));
                    return elementName;
                }
                else
                {
                    var elementName = driver.FindElement(By.ClassName(element));
                    return elementName;
                }
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Check the given element is not present in the page
        /// </summary>
        /// <param name="elementType">ElementType as params</param>
        /// <param name="element">ElementId as params</param>
        /// <returns>Return false the element exist </returns>
        private bool IsElementNotExist(string elementType, string element)
        {
            if (driver != null)
            {
                try
                {
                    var result = GetElementByElementType(elementType, element);
                    if (result != null)
                    {
                        var elementName = result.Displayed;
                        if (elementName == true)
                        {
                            return false;
                        }
                        else
                        {
                            return true;
                        }
                    }
                    else
                    {
                        return true;
                    }
                }
                catch (NoSuchElementException)
                {
                    return true;
                }
            }
            else
            {
                ErrorList.Add("Failed: Driver not initalized at ClickFieldElement");
                return false;
            }
        }

        /// <summary>
        /// Check whether the control is enabled 
        /// </summary>
        /// <param name="elementType">ElementType as params</param>
        /// <param name="element">ElementId as params</param>
        /// <returns>Return true if the control is enabled</returns>
        private bool IsElementEnabled(string elementType, string element)
        {
            if (driver != null)
            {
                try
                {
                    var result = GetElementByElementType(elementType, element);
                    if (result != null)
                    {
                        var elementName = result.Enabled;
                        return elementName;
                    }
                    else
                    {
                        return false;
                    }
                }
                catch (NoSuchElementException)
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Check whether the control is not enabled 
        /// </summary>
        /// <param name="elementType">ElementType as params</param>
        /// <param name="element">ElementId as params</param>
        /// <returns>Returns true if the control is not enabled</returns>
        private bool IsElementNotEnabled(string elementType, string element)
        {
            if (driver != null)
            {
                try
                {
                    var result = GetElementByElementType(elementType, element);
                    if (result != null)
                    {
                        var elementName = result.Enabled;
                        if (elementName == true)
                        {
                            return false;
                        }
                        else
                        {
                            return elementName;
                        }
                    }
                    else
                    {
                        return true;
                    }
                }
                catch (NoSuchElementException)
                {
                    return false;
                }

            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Tests the field element
        /// </summary>
        /// <param name="driver">Gets the driver details</param>
        /// <param name="element">Element for which actual and expected value is to be compared</param>
        /// <param name="expectedResult">Gets the expected result for the current element</param>
        /// <param name="testCaseId">Gets the test case id</param>
        /// <param name="currentLineNumber">Gets the current line number for printing the actual result in the test report</param>
        /// <param name="result">Outputs the status after comparing the actual and the expected value</param>
        private bool TestFieldElement(TestSteps testSteps, out string actualValue)
        {
            actualValue = string.Empty;
            bool result = false;

            try
            {
                if (driver != null)
                {
                    var resultData = GetElementByElementType(testSteps.ElementType, testSteps.Element);
                    if (resultData != null)
                    {
                        actualValue = resultData.Text;
                    }

                    if (testSteps.ExpectedResult == actualValue)
                    {
                        //WriteResult(OledbConnectionString, testSteps.TestCaseId, testSteps.CurrentLineNumber, actualValue, "PASS");
                        result = true;
                    }
                    else
                    {
                        //WriteResult(OledbConnectionString, testSteps.TestCaseId, testSteps.CurrentLineNumber, actualValue, "FAIL");
                        ErrorList.Add("Failed     " + errorNumber++ + ". Test Case: " + testSteps.TestCaseId + ", Expected Result: " + testSteps.ExpectedResult + ", Actual Result:" + actualValue);
                    }
                }
                else
                {
                    //WriteResult(OledbConnectionString, testSteps.TestCaseId, testSteps.CurrentLineNumber, "", "FAIL");
                    ErrorList.Add("Failed     " + errorNumber++ + ". Test Case: " + testSteps.TestCaseId + ", Expected Result: " + testSteps.ExpectedResult + ", Actual Result:" + "" + "Message: Driver not initialized");
                }
            }
            catch (NoSuchElementException)
            {
                //WriteResult(OledbConnectionString, testSteps.TestCaseId, testSteps.CurrentLineNumber, " ", "FAIL");
                ErrorList.Add("Failed     " + errorNumber++ + ". Test Case: " + testSteps.TestCaseId + ", Expected Result: " + testSteps.ExpectedResult + ", Actual Result:" + " ");
            }

            return result;
        }

        /// <summary>
        /// Input the given value to the devextreme form controls.
        /// </summary>
        /// <param name="controlId">ControlId as params</param>
        /// <param name="value">Value as params</param>
        /// <returns>Returns script to be executed for devextreme controls</returns>
        private string DevextremeControlInputs(string controlId, string value)
        {
            string controlPrefix = controlId.Split('-')[0];


            string control = controlPrefix.Substring(2, controlPrefix.Length - 2);
            string controlName = string.Empty;
            string controlValue = string.Empty;

            string script = "jQuery(function($){$('#{0}').{1}({{2}});});";

            switch (control)
            {
                case "txt":
                    controlName = "dxTextBox";
                    controlValue = "'value':'" + value + "'";

                    break;
                case "dtp":
                    controlName = "dxDateBox";

                    //DateTime dt = Convert.ToDateTime(value);
                    controlValue = "'value':'" + value + "'";
                    //controlValue = "'value':new Date(" + dt.Year + ", " + dt.Month + ", " + dt.Day + ", " + dt.Hour + ", " + dt.Minute + ", " + dt.Second + ", " + dt.Millisecond + ")";

                    break;
                case "chk":
                    controlName = "dxCheckBox";

                    bool IsBoolValue = Utilities.CastToBoolean(value);
                    controlValue = "'value':" + IsBoolValue.ToString().ToLower();

                    break;
                case "num":
                    controlName = "dxNumberBox";
                    controlValue = "'value':" + value;
                    break;

                case "ddl":
                    controlName = "dxDropDownBox";

                    string getDDLValueScript = "function getValue(){var value;$('#" + controlId + "').dxDropDownBox('instance').getDataSource()._store._array.forEach(function (obj, index) { if(obj[$('#" + controlId + "').dxDropDownBox('instance').option('displayExpr')] == '" + value + "'){value = obj[$('#" + controlId + "').dxDropDownBox('instance').option('valueExpr')]}}); return value;};";

                    controlValue = "'value': getValue()";

                    script = getDDLValueScript + " " + script.Replace("{0}", controlId).Replace("{1}", controlName).Replace("{2}", controlValue);

                    return script;

                //break;
                case "cmb":
                    controlName = "dxSelectBox";

                    string getValueScript = "function getValue(){var value;$('#" + controlId + "').dxSelectBox('instance').getDataSource()._store._array.forEach(function (obj, index) { if(obj[$('#" + controlId + "').dxSelectBox('instance').option('displayExpr')] == '" + value + "'){value = obj[$('#" + controlId + "').dxSelectBox('instance').option('valueExpr')]}}); return value;};";

                    controlValue = "'value': getValue()";

                    script = getValueScript + " " + script.Replace("{0}", controlId).Replace("{1}", controlName).Replace("{2}", controlValue);

                    return script;

                //break;
                case "switch":
                    controlName = "dxSwitch";

                    bool IsSwitchValue = Utilities.CastToBoolean(value);
                    controlValue = "'value':" + IsSwitchValue.ToString().ToLower();

                    break;
                case "tag":
                    controlName = "dxTagBox";

                    string getTagValueScript = "function getValue(){var value = [];$('#" + controlId + "').dxTagBox('instance').getDataSource()._store._array.forEach(function (obj, index) { if('" + value + "'.split(',').find(item => item == obj[$('#" + controlId + "').dxTagBox('instance').option('displayExpr')])){value.push(obj[$('#" + controlId + "').dxTagBox('instance').option('valueExpr')])}}); return value;};";

                    controlValue = "'value': getValue()";
                    script = getTagValueScript + " " + script.Replace("{0}", controlId).Replace("{1}", controlName).Replace("{2}", controlValue);

                    return script;

                //controlValue = "'value':[" + value + "]";

                //break;
                case "rbt":
                    controlName = "dxRadioGroup";
                    controlValue = "'value':'" + value + "'";

                    break;
                case "txa":
                    controlName = "dxTextArea";
                    controlValue = "'value':'" + value + "'";

                    break;
            }

            script = script.Replace("{0}", controlId).Replace("{1}", controlName).Replace("{2}", controlValue);

            return script;
        }

        /// <summary>
        /// Check the expected value matches the 
        /// </summary>
        /// <param name="controlId">Gets the control id</param>
        /// <param name="expectedResultValue">Gets the expected result value</param>
        /// <returns>Returns true if the value is matched</returns>
        private bool CheckDevextremeControlValue(string controlId, string expectedResultValue)
        {
            string controlPrefix = controlId.Split('-')[0];


            string control = controlPrefix.Substring(2, controlPrefix.Length - 2);
            string controlName = string.Empty;
            string controlValue = string.Empty;
            string controlOption = string.Empty;
            object actualResultVal;
            bool result = false;

            string script = "return $('#{0}').{1}('instance').option('{2}')";

            switch (control)
            {
                case "txt":
                    controlName = "dxTextBox";
                    //controlValue = "'value':'" + value + "'";

                    break;
                case "dtp":
                    controlName = "dxDateBox";

                    //DateTime dt = Convert.ToDateTime(value);
                    //controlValue = "'value':new Date(" + dt.Year + ", " + dt.Month + ", " + dt.Day + ", " + dt.Hour + ", " + dt.Minute + ", " + dt.Second + ", " + dt.Millisecond + ")";

                    break;
                case "chk":
                    controlName = "dxCheckBox";

                    //bool IsBoolValue = CastToBoolean(value);
                    //controlValue = "'value':" + IsBoolValue.ToString().ToLower();

                    break;
                case "num":
                    controlName = "dxNumberBox";
                    //controlValue = "'value':" + value;
                    break;
                case "cmb":
                    controlName = "dxSelectBox";
                    controlOption = "text";
                    script = script.Replace("{0}", controlId).Replace("{1}", controlName).Replace("{2}", controlOption);
                    actualResultVal = ExecuteJavaScriptQuery(script);

                    result = Convert.ToString(actualResultVal) == expectedResultValue ? true : false;

                    //string getValueScript = "function getValue(){var value;$('#" + controlId + "').dxSelectBox('instance').getDataSource()._store._array.forEach(function (obj, index) { if(obj[$('#" + controlId + "').dxSelectBox('instance').option('displayExpr')] == '" + value + "'){value = obj[$('#" + controlId + "').dxSelectBox('instance').option('valueExpr')]}}); return value;};";

                    //controlValue = "'value': getValue()";

                    //script = getValueScript + " " + script.Replace("{0}", controlId).Replace("{1}", controlName).Replace("{2}", controlValue);

                    //return script;

                    break;
                case "switch":
                    controlName = "dxSwitch";
                    controlOption = "value";
                    script = script.Replace("{0}", controlId).Replace("{1}", controlName).Replace("{2}", controlOption);
                    script = script.Replace("{0}", controlId).Replace("{1}", controlName).Replace("{2}", controlOption);
                    actualResultVal = ExecuteJavaScriptQuery(script);

                    result = Utilities.CastToBoolean(Convert.ToString(actualResultVal)) == Utilities.CastToBoolean(expectedResultValue) ? true : false;


                    //bool IsSwitchValue = CastToBoolean(value);
                    //controlValue = "'value':" + IsSwitchValue.ToString().ToLower();

                    break;
                case "tag":
                    controlName = "dxTagBox";
                    //controlValue = "'value':[" + value + "]";

                    break;
                case "rbt":
                    controlName = "dxRadioGroup";
                    //controlValue = "'value':'" + value + "'";

                    break;
                case "txa":
                    controlName = "dxTextArea";
                    //controlValue = "'value':'" + value + "'";

                    break;
            }



            return result;
        }

        /// <summary>
        /// Execute the javacript on the page and return the result for the script.
        /// </summary>
        /// <param name="javaScriptQuery">jQuery string to be executed</param>
        /// <returns>Returns the obj if the driver is not null</returns>
        private object ExecuteJavaScriptQuery(string javaScriptQuery)
        {
            if (driver != null)
            {
                IJavaScriptExecutor js = (IJavaScriptExecutor)driver;
                var obj = js.ExecuteScript(javaScriptQuery);

                return obj;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// Drag card from column to column
        /// </summary>
        /// <param name="elementsAsJSON">Element JSON as string</param>
        private void DragCardFromColumnToColumn(string elementsAsJSON)
        {
            var dragAndDropElement = JsonConvert.DeserializeObject<DragAndDropElement>(elementsAsJSON);
            //var sourceElement = new Object();
            var sourceWebElement = new Object();
            var destinationWebElement = new Object();
            var elementToDragWebElement = new Object();

            if (dragAndDropElement.SourceElementType == "Id")
            {
                sourceWebElement = driver.FindElement(By.Id(dragAndDropElement.SourceElement));
            }
            else if (dragAndDropElement.SourceElementType == "ClassName")
            {
                sourceWebElement = driver.FindElement(By.ClassName(dragAndDropElement.SourceElement));
            }
            else if (dragAndDropElement.SourceElementType == "Xpath")
            {
                sourceWebElement = driver.FindElement(By.XPath(dragAndDropElement.SourceElement));
            }


            if (dragAndDropElement.DestinationElementType == "Id")
            {
                destinationWebElement = driver.FindElement(By.Id(dragAndDropElement.DestinationElement));
            }
            else if (dragAndDropElement.DestinationElementType == "ClassName")
            {
                destinationWebElement = driver.FindElement(By.ClassName(dragAndDropElement.DestinationElement));
            }
            else if (dragAndDropElement.DestinationElementType == "Xpath")
            {
                destinationWebElement = driver.FindElement(By.XPath(dragAndDropElement.DestinationElement));
            }


            if (dragAndDropElement.ElementToDragType == "Id")
            {
                elementToDragWebElement = driver.FindElement(By.Id(dragAndDropElement.ElementToDrag));
            }
            else if (dragAndDropElement.ElementToDragType == "ClassName")
            {
                elementToDragWebElement = driver.FindElement(By.ClassName(dragAndDropElement.ElementToDrag));
            }
            else if (dragAndDropElement.ElementToDragType == "Xpath")
            {
                elementToDragWebElement = driver.FindElement(By.XPath(dragAndDropElement.ElementToDrag));
            }


            IWebElement sourceElement = (IWebElement)sourceWebElement;
            IWebElement destinationElement = (IWebElement)destinationWebElement;
            IWebElement elementToDrag = (IWebElement)elementToDragWebElement;


            Actions builder = new Actions(driver);

            IAction dragAndDrop = builder.ClickAndHold(elementToDrag)
             //.MoveToElement(destinationElement)
             //  .Release(destinationElement)
               .Build();

            dragAndDrop.Perform();


            System.Threading.Thread.Sleep(500);

            dragAndDrop = builder
              .MoveToElement(destinationElement)
              //  .Release(destinationElement)
              .Build();

            dragAndDrop.Perform();

            System.Threading.Thread.Sleep(500);

            dragAndDrop = builder
             
               .Release(destinationElement)
             .Build();

            dragAndDrop.Perform();

        }

        /// <summary>
        /// Select the devextreme grid row
        /// </summary>
        /// <param name="element">Element to be selected</param>
        private void SelectDevextremeGridRow(string element)
        {
            string script;
            script = " $('#" + element + "').dxDataGrid('instance').selectRows($('#" + element + "').dxDataGrid('instance').getKeyByRowIndex(0))";
            ExecuteJavaScriptQuery(script);
        }
        #endregion
    }
}