#region Name Space
//using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
#endregion

namespace SynergyDashboard.Test
{
    /// <summary>
    /// Synergy SynergyDashboard UI Test Class.
    /// </summary>
    //[TestClass]
    public class SynergyUITest
    {
        #region Variable Declaration
        ParseExcelTestCase parseExcelTestCase = new ParseExcelTestCase();
        private int errorNumber = 1;
        private List<string> _passList;
        private List<string> _skipList;
        #endregion
        
        #region Property Declaration
        private List<string> PassList
        {
            get
            {
                int passNumber = 1;
                _passList = new List<string>();
                if (PassedTestList != null && PassedTestList.Count > 0)
                    PassedTestList.ForEach(x => _passList.Add("Passed   " + passNumber++ + ". " + x.TestCaseId + " " + x.Name));
                return _passList;
            }
        }
        private List<string> SkipList
        {
            get
            {
                int skipNumber = 1;
                _skipList = new List<string>();
                if (SkippedTestList != null && SkippedTestList.Count > 0)
                    SkippedTestList.ForEach(x => _skipList.Add("Skipped " + skipNumber++ + ". " + x.TestCaseId + " " + x.Name));
                return _skipList;
            }
        }
        private List<PreCompiledTests> PreCompliedTestList { get; set; }
        private List<TestCaseMaster> TestCaseMasterList { get; set; }

        private List<TestResult> PassedTestList { get; set; }
        private List<TestResult> SkippedTestList { get; set; }
        private List<string> ErrorList { get; set; }
        private List<string> TotalErrorList { get; set; }
        #endregion

        #region UI Tests

        [Test]
        public void SampleTest()
        {
            Console.WriteLine("SampleTest passed!!!!!!!!!!!!!!!!!!!!!!!!!!");
            Assert.IsTrue(true);
        }

        /// <summary>
        /// SynergyDashboard UI Tests gets the test case excel from Blob executes and pushes the output in the blob
        /// </summary>
        /// <returns>Async Task</returns>
        [Test]
        public async Task SynergyDashboardUITests()
        {
            string[] resultToBeWrittenInSheet = { "Test", "CheckIfPresent", "CheckGridRowCount", "CheckValue", "CheckIfNotPresent", "ButtonIsEnabled", "ButtonIsNotEnabled", "CheckIsNumber", "CheckIsDecimal", "CheckIsEmpty" };

            ParseExcelTestCase parseExcelTestCase = new ParseExcelTestCase();
            UIOperations uIOperations = new UIOperations("chrome");

            List<TestFileDetail> testFileDetails = parseExcelTestCase.GetTestCaseFiles();
            bool testCaseResult = true;
            TotalErrorList = new List<string>();

            foreach (var testFile in testFileDetails)
            {
                PassedTestList = new List<TestResult>();
                uIOperations.ErrorList = new List<string>();

                await parseExcelTestCase.PrepareTestCases(testFile);
                TestCaseMasterList = parseExcelTestCase.TestCaseMasterList;
                uIOperations.PreCompliedTestList = parseExcelTestCase.PreCompliedTestList;
                SkippedTestList = parseExcelTestCase.SkippedTestList;
                uIOperations.ScreenshotDirectory = testFile.TestResultScreenshotPath;

                if (TestCaseMasterList != null && TestCaseMasterList.Count > 0)
                {
                    foreach (var testCases in TestCaseMasterList)
                    {
                        TestResult testResult = new TestResult();
                        if (testCases.Skip)
                        {
                            SkippedTestList.Add(testResult);
                        }
                        else
                        {
                            //Test the Cases
                            foreach (var item in testCases.TestStepsList)
                            {
                                try
                                {
                                    bool result = uIOperations.PerformUIAction(item, false, out string actualValue);

                                    if (result == false)
                                    {
                                        testCaseResult = false;
                                    }

                                    if (resultToBeWrittenInSheet.Contains(item.Action))
                                    {
                                        if (result)
                                        {
                                            parseExcelTestCase.WriteResult(testCases.CurrentLineNumber, item.CurrentLineNumber, actualValue, "PASS");
                                        }
                                        else
                                        {
                                            parseExcelTestCase.WriteResult(testCases.CurrentLineNumber, item.CurrentLineNumber, actualValue, "FAIL");
                                        }
                                    }

                                    if (!result && resultToBeWrittenInSheet.Contains(item.Action))
                                    {
                                        parseExcelTestCase.WriteResult(testCases.CurrentLineNumber, item.CurrentLineNumber, actualValue, "FAIL");
                                        break;
                                    }
                                }
                                catch (Exception ex)
                                {
                                    throw ex;

                                }
                            }

                            if (testCaseResult)
                            {
                                PassedTestList.Add(new TestResult { Name = testCases.TestName, TestCaseId = testCases.Id });
                            }
                            else
                            {
                                uIOperations.ErrorList.Add("Failed     " + errorNumber++ + ". Test Case: " + testCases.Id);
                            }
                        }

                        testCaseResult = true;
                    }
                }

                ErrorList = uIOperations.ErrorList;
                TotalErrorList.InsertRange(0, ErrorList);
                ConsoleWrite(testFile.TestCaseFileName);
            }

            //await parseExcelTestCase.UploadTestReport(testFileDetails.FirstOrDefault());


            if (TotalErrorList.Count == 0)
            {
                //Assert.AreEqual(true, true, string.Join(Environment.NewLine, PassList));
                Assert.AreEqual(true, true);
            }
            else
            {
                Assert.IsTrue(false, Environment.NewLine + string.Join(Environment.NewLine, TotalErrorList));
            }
        }

        /// <summary>
        /// Writes the output in the console
        /// </summary>
        /// <param name="testCaseFileName">Gets the test case file name</param>
        private void ConsoleWrite(string testCaseFileName)
        {
            Console.WriteLine("--------------------------------------------------------------------------------------------");
            Console.WriteLine("Test Result Summary for " + testCaseFileName);
            Console.WriteLine("--------------------------------------------------------------------------------------------");

            if (PassList.Count > 0)
            {
                Console.Write(string.Join(Environment.NewLine, PassList));
                Console.WriteLine();
                Console.WriteLine();
            }
            if (ErrorList.Count > 0)
            {
                Console.Write(string.Join(Environment.NewLine, ErrorList));
                Console.WriteLine();
                Console.WriteLine();
            }
            if (SkipList.Count > 0)
            {
                Console.Write(string.Join(Environment.NewLine, SkipList));
                Console.WriteLine();
                Console.WriteLine();
            }

            Console.Write(Environment.NewLine + string.Join(Environment.NewLine, "Total Tests: " + Convert.ToInt32(PassList.Count + ErrorList.Count + SkipList.Count) + " Passed: " + PassList.Count + " Failed: " + ErrorList.Count + " Skipped: " + SkipList.Count));

            Console.WriteLine(Environment.NewLine);
        }
        #endregion
    }
}
