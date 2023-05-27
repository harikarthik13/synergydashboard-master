#region Name Space
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
#endregion

namespace SynergyDashboard.Test
{
    public class ParseExcelTestCase
    {
        #region Variable Declaration
        private string _blobAccountName = Convert.ToString(ConfigurationManager.AppSettings["BlobAccountName"]);
        private string _blobAccountKey = Convert.ToString(ConfigurationManager.AppSettings["BlobAccountKey"]);
        private string _blobContainerName = Convert.ToString(ConfigurationManager.AppSettings["BlobContainerName"]);
        private string _testCaseMasterPath = Convert.ToString(ConfigurationManager.AppSettings["TestCaseMasterPath"]);
        private string _testReportsPath = Convert.ToString(ConfigurationManager.AppSettings["TestReportsPath"]);
        private string _oledbConnectionString = Convert.ToString(ConfigurationManager.AppSettings["OledbConnectionString"]);

        private string _screenshotDirectory = string.Empty;
        private string reportPath = string.Empty;
        private string fileName = string.Empty;

        public List<TestCaseMaster> TestCaseMasterList { get; set; }
        public List<PreCompiledTests> PreCompliedTestList { get; set; }
        public List<TestResult> SkippedTestList { get; set; }

        public List<TestFileDetail> TestFileDetails { get; set; }

        private string OledbConnectionString
        {
            get
            {
                return string.Format(_oledbConnectionString, reportPath);
            }
        }
        public string ScreenshotDirectory
        {
            get
            {
                return _screenshotDirectory;
            }
        }
        #endregion

        #region Test Case File
        /// <summary>
        /// Download the test case files from BLOB
        /// </summary>
        /// <returns>Return the List of TestFileDetail details</returns>
        public List<TestFileDetail> GetTestCaseFiles()
        {
            GetTestCaseFileFromFTP();

            CreateTestReport();

            return TestFileDetails;
        }
        #endregion

        #region Prepare Test cases
        /// <summary>
        /// Prepare the test cases.
        /// </summary>
        public async Task PrepareTestCases(TestFileDetail testFileDetail)
        {
            reportPath = testFileDetail.TestResultReportPath;
            await GetTestCaseMaster();
            await GetPreCompiledTestMaster();
        }


        private static DataTable GetDataTableFromExcel(string path, bool hasHeader = true, string sheetName = "")
        {
            using (var pck = new OfficeOpenXml.ExcelPackage())
            {
                using (var stream = File.OpenRead(path))
                {
                    pck.Load(stream);
                }
                var ws = pck.Workbook.Worksheets.First(sheet => sheet.Name == sheetName);
                DataTable tbl = new DataTable();
                foreach (var firstRowCell in ws.Cells[1, 1, 1, ws.Dimension.End.Column])
                {
                    tbl.Columns.Add(hasHeader ? firstRowCell.Text : Convert.ToString(firstRowCell.Start.Column));
                }
                var startRow = hasHeader ? 2 : 1;
                for (int rowNum = startRow; rowNum <= ws.Dimension.End.Row; rowNum++)
                {
                    var wsRow = ws.Cells[rowNum, 1, rowNum, ws.Dimension.End.Column];
                    DataRow row = tbl.Rows.Add();
                    foreach (var cell in wsRow)
                    {
                        row[cell.Start.Column - 1] = cell.Text;
                    }
                }
                return tbl;
            }
        }

        /// <summary>
        /// Prepare the test cases from the Master sheet
        /// </summary>
        /// <returns>Returns async Task</returns>
        public async Task GetTestCaseMaster()
        {

            DataTable result = GetDataTableFromExcel(reportPath, true, "TestCaseMaster");


            //OleDbConnection MyConnection;
            //DataSet DtSet;
            //OleDbDataAdapter MyCommand;

            SkippedTestList = new List<TestResult>();
            TestCaseMasterList = new List<TestCaseMaster>();

            //MyConnection = new OleDbConnection(OledbConnectionString);
            //MyCommand = new OleDbDataAdapter("SELECT * FROM [TestCaseMaster$]", MyConnection);
            //MyCommand.TableMappings.Add("Table", "TestTable");
            //DtSet = new DataSet();
            //MyCommand.Fill(DtSet);

            //// Loop through all Sheets to get data
            //foreach (DataTable item in DtSet.Tables)
            //{
            TestCaseMaster testCaseMaster = new TestCaseMaster();

            try
            {
                //Loop through each row inside the sheet
                foreach (DataRow dr in result.Rows)
                {
                    if (testCaseMaster != null && testCaseMaster.Skip && string.IsNullOrEmpty(Utilities.GetDBString(dr["TestCaseId"])))
                        continue;
                    //When testcase id is present open the browser and browse the site url
                    if (!string.IsNullOrEmpty(Utilities.GetDBString(dr["TestCaseId"])))
                    {
                        testCaseMaster = new TestCaseMaster
                        {
                            Id = Utilities.GetDBString(dr["TestCaseId"]),
                            TestName = Utilities.GetDBString(dr["TestName"]),
                            CurrentLineNumber = Utilities.GetDBString(dr["SNo"]),
                            Skip = Utilities.GetDBBool(dr["Skip"]),
                            TestStepsList = new List<TestSteps>()
                        };
                        if (testCaseMaster.Skip)
                        {
                            SkippedTestList.Add(new TestResult { Name = testCaseMaster.TestName, TestCaseId = testCaseMaster.Id });
                        }
                        continue;
                    }
                    //When Action is End, close the browser and dispose the driver object
                    if (!string.IsNullOrEmpty(Utilities.GetDBString(dr["Action"])) && Utilities.GetDBString(dr["Action"]) == "End")
                    {
                        if (!testCaseMaster.Skip)
                        {
                            TestCaseMasterList.Add(testCaseMaster);
                        }

                        continue;
                    }
                    else
                    {
                        if (!testCaseMaster.Skip)
                        {
                            TestSteps testSteps = new TestSteps
                            {
                                TestCaseId = testCaseMaster.Id,
                                CurrentLineNumber = Utilities.GetDBString(dr["SNo"]),
                                Element = Utilities.GetDBString(dr["Element"]),
                                ElementType = Utilities.GetDBString(dr["ElementType"]),
                                Action = Utilities.GetDBString(dr["Action"]),
                                Value = Utilities.GetDBString(dr["Value"]),
                                ExpectedResult = Utilities.GetDBString(dr["ExpectedResult"]),
                            };
                            testCaseMaster.TestStepsList.Add(testSteps);
                        }
                        else
                        {
                            continue;
                        }
                    }
                }
                //}
            }
            catch (Exception ex)
            {

                throw;
            }

            //MyConnection.Close();
            await Task.FromResult(0);
        }

        /// <summary>
        /// Prepare the test cases from the precompiled sheet
        /// </summary>
        /// <returns>Async Task</returns>
        public async Task GetPreCompiledTestMaster()
        {
            DataTable result = GetDataTableFromExcel(reportPath, true, "PreCompiled");

            //OleDbConnection MyConnection;
            //DataSet DtSet;
            //OleDbDataAdapter MyCommand;

            PreCompliedTestList = new List<PreCompiledTests>();

            //MyConnection = new OleDbConnection(OledbConnectionString);
            //MyCommand = new OleDbDataAdapter("SELECT * FROM [PreCompiled$]", MyConnection);
            //MyCommand.TableMappings.Add("Table", "TestTable");
            //DtSet = new DataSet();
            //MyCommand.Fill(DtSet);

            // Loop through all Sheets to get data
            //foreach (DataTable item in DtSet.Tables)
            //{
            PreCompiledTests preCompiledTests = new PreCompiledTests();

            //Loop through each row inside the sheet
            foreach (DataRow dr in result.Rows)
            {
                //When testcase id is present open the browser and browse the site url
                if (!string.IsNullOrEmpty(Utilities.GetDBString(dr["PreCompiledTestId"])))
                {
                    preCompiledTests = new PreCompiledTests
                    {
                        Id = Utilities.GetDBString(dr["PreCompiledTestId"]),
                        TestName = Utilities.GetDBString(dr["TestName"]),
                        CurrentLineNumber = Utilities.GetDBString(dr["SNo"]),
                        TestStepsList = new List<TestSteps>()
                    };

                    continue;
                }
                //When Action is End, close the browser and dispose the driver object
                if (!string.IsNullOrEmpty(Utilities.GetDBString(dr["Action"])) && Utilities.GetDBString(dr["Action"]) == "End")
                {
                    PreCompliedTestList.Add(preCompiledTests);
                    continue;
                }
                else
                {
                    TestSteps testSteps = new TestSteps
                    {
                        CurrentLineNumber = Utilities.GetDBString(dr["SNo"]),
                        Element = Utilities.GetDBString(dr["Element"]),
                        ElementType = Utilities.GetDBString(dr["ElementType"]),
                        Action = Utilities.GetDBString(dr["Action"]),
                        Value = Utilities.GetDBString(dr["Value"]),
                        ExpectedResult = Utilities.GetDBString(dr["ExpectedResult"]),
                    };
                    preCompiledTests.TestStepsList.Add(testSteps);
                }
            }
            //}

            //MyConnection.Close();
            await Task.FromResult(0);
        }
        #endregion

        #region Blob and Excel Operations
        /// <summary>
        /// Create a new test report based on the test case master to write the current test pass/fail status
        /// </summary>
        /// <returns>Returns the test report path where the pass/fail status must be written</returns>
        public void CreateTestReport()
        {
            DateTime dateTime = DateTime.UtcNow;
            string testSourcePath = Environment.CurrentDirectory + @"/TestCase/";
            string destinationDirectory = Environment.CurrentDirectory + @"/TestReport";

            string testRootDirectory = "Report_" + dateTime.ToLongDateString().ToString().Replace(" ", "_").Replace(":", "_") + "_" + dateTime.ToLongTimeString().ToString().Replace(" ", "_").Replace(":", "_");
            destinationDirectory = destinationDirectory + "/" + testRootDirectory;
            string destinationFileName = "";
            TestFileDetails = new List<TestFileDetail>();
            var files = Directory.EnumerateFiles(testSourcePath).Where(fileName => fileName.Contains(".xlsx") && fileName.Contains("UI_"))
                     .OrderBy(filename => filename);

            foreach (var file in files)
            {
                FileInfo fileInfo = new FileInfo(file);
                destinationFileName = fileInfo.Name;
                string destinationPath = destinationDirectory + "\\" + destinationFileName;
                reportPath = destinationPath;
                _screenshotDirectory = destinationDirectory + "\\ScreenShot_" + destinationFileName.Replace(".xlsx", "");

                if (!Directory.Exists(destinationDirectory))
                {
                    Directory.CreateDirectory(destinationDirectory);
                }

                File.Copy(file, destinationPath);

                if (!Directory.Exists(_screenshotDirectory))
                {
                    Directory.CreateDirectory(_screenshotDirectory);
                }

                TestFileDetails.Add(new TestFileDetail { TestCaseFileName = destinationFileName, TestResultReportPath = reportPath, TestResultScreenshotPath = _screenshotDirectory, TestCaseRootName = testRootDirectory });
            }
        }

        public void GetTestCaseFileFromFTP()
        {
            string testSourcePath = Environment.CurrentDirectory + @"/TestCase/";
            string fileName = "UI_003_Synergy_RolesAndRights_TestCases.xlsx";
            string ftp = "ftp://172.16.2.30/synergydashboard_dev/";
            string ftpFolder = "TestCases/";
            try
            {
                //Create FTP Request.
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftp + ftpFolder + fileName);
                request.Method = WebRequestMethods.Ftp.DownloadFile;

                //Enter FTP Server credentials.
                request.Credentials = new NetworkCredential("sd_dev", "sdev@123");
                request.UsePassive = true;
                request.UseBinary = true;
                request.EnableSsl = false;

                //Fetch the Response and read it into a MemoryStream object.
                FtpWebResponse response = (FtpWebResponse)request.GetResponse();
                using (Stream responseStream = response.GetResponseStream())
                {
                    using (Stream fileStream = new FileStream(testSourcePath + fileName, FileMode.CreateNew))
                    {
                        responseStream.CopyTo(fileStream);
                    }
                }
            }
            catch (WebException ex)
            {
                throw new Exception((ex.Response as FtpWebResponse).StatusDescription);
            }
        }

        /// <summary>
        /// Opens the Excel and updates the sheet with the corresponding result
        /// </summary>
        /// <param name="connectionstring">Gets the connection string for the excel where the test report is present</param>
        /// <param name="testCaseId">Test Case id for printing pass/fail value</param>
        /// <param name="currentLineNumber">Gets the current line number for printing the actual result</param>
        /// <param name="actualResult">Gets the actual result</param>
        /// <param name="passOrFail">Gets the Pass/Fail status</param>
        public void WriteResult(string testCaseId, string currentLineNumber, string actualResult, string passOrFail)
        {
            var fileinfo = new FileInfo(reportPath);
            if (fileinfo.Exists)
            {
                using (ExcelPackage pack = new ExcelPackage(fileinfo))
                {
                    int checkLineNumber = Convert.ToInt32(currentLineNumber) + 1;
                    int heeaderLineNumber = Convert.ToInt32(testCaseId) + 1;
                    var ws = pack.Workbook.Worksheets.First(sheet => sheet.Name == "TestCaseMaster");
                    ws.Cells[heeaderLineNumber, 10].Value = passOrFail;
                    ws.Cells[checkLineNumber, 10].Value = passOrFail;
                    ws.Cells[checkLineNumber, 10].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    ws.Cells[checkLineNumber, 10].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(184, 204, 228));
                    ws.Cells[checkLineNumber, 10].Style.Font.Italic = true;
                    pack.Save();
                }
            }

            //using (OleDbConnection conn = new OleDbConnection(OledbConnectionString))
            //{
            //    try
            //    {
            //        conn.Open();
            //        OleDbCommand cmd = new OleDbCommand
            //        {
            //            Connection = conn,
            //            CommandText = "UPDATE [TestCaseMaster$] SET [AcutalResult] = '" + actualResult + "' WHERE [SNo] = " + currentLineNumber + ";"
            //        };
            //        cmd.ExecuteNonQuery();
            //        cmd.CommandText = "UPDATE [TestCaseMaster$] SET [Pass/Fail] = '" + passOrFail + "' WHERE [SNo] = " + currentLineNumber + ";";
            //        cmd.ExecuteNonQuery();

            //        cmd.CommandText = "UPDATE [TestCaseMaster$] SET [Pass/Fail] = '" + passOrFail + "' WHERE [TestCaseId] = '" + testCaseId + "';";
            //        cmd.ExecuteNonQuery();

            //    }
            //    catch (Exception)
            //    {

            //        //exception here
            //    }
            //    finally
            //    {
            //        conn.Close();
            //        conn.Dispose();
            //    }
            //}
        }

        ///// <summary>
        ///// Archive the test results.
        ///// </summary>
        ///// <param name="zipFilePath">Zip file path where the zip file should be stored</param>
        ///// <param name="sourceDir">Source directory</param>
        ///// <param name="withSubdirs">With sub directory</param>
        //public static void ZipTestResults(string zipFilePath, string sourceDir, bool withSubdirs)
        //{
        //    FastZip fz = new FastZip();

        //    fz.CreateZip(zipFilePath, sourceDir, withSubdirs, null);
        //}
        #endregion

        #region Test DB Reset
        /// <summary>
        /// Restet the test DB.
        /// </summary>
        //private bool ResetTestDataBase()
        //{
        //    string sqlConnectionString = ConfigurationManager.AppSettings["SQLConnectionStringToRunTest"];
        //    string pathStoreProceduresFile = Environment.CurrentDirectory.Substring(0, Environment.CurrentDirectory.IndexOf("bin")) + @"ResetGenysysDB.sql";

        //    try
        //    {
        //        string script = File.ReadAllText(pathStoreProceduresFile);

        //        // split script on GO command
        //        IEnumerable<string> commandStrings = Regex.Split(script, @"^\s*GO\s*$",
        //                                 RegexOptions.Multiline | RegexOptions.IgnoreCase);
        //        using (SqlConnection connection = new SqlConnection(sqlConnectionString))
        //        {
        //            connection.Open();
        //            foreach (string commandString in commandStrings)
        //            {
        //                if (commandString.Trim() != "")
        //                {
        //                    using (var command = new SqlCommand(commandString, connection))
        //                    {
        //                        try
        //                        {
        //                            command.ExecuteNonQuery();
        //                        }
        //                        catch (SqlException)
        //                        {
        //                            string spError = commandString.Length > 100 ? commandString.Substring(0, 100) + " ...\n..." : commandString;

        //                            return false;
        //                        }
        //                    }
        //                }
        //            }
        //            connection.Close();
        //        }
        //        return true;
        //    }
        //    catch (Exception)
        //    {
        //        return false;
        //    }
        //}
        #endregion
    }
}
