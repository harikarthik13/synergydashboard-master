#region Name Space
using System.Collections.Generic;
#endregion

namespace SynergyDashboard.Test
{
    /// <summary>
    /// Test Case Master class with list of test steps
    /// </summary>
    public class TestCaseMaster
    {
        public string Id { get; set; }
        public string CurrentLineNumber { get; set; }
        public string TestName { get; set; }
        public List<TestSteps> TestStepsList { get; set; }
        public bool Skip { get; set; }
    }

    /// <summary>
    /// Gets PreCompiled test with list of test steps
    /// </summary>
    public class PreCompiledTests
    {
        public string Id { get; set; }
        public string CurrentLineNumber { get; set; }
        public string TestName { get; set; }
        public List<TestSteps> TestStepsList { get; set; }
    }

    /// <summary>
    /// Test steps with excel columns as props
    /// </summary>
    public class TestSteps
    {
        public string CurrentLineNumber { get; set; }
        public string Element { get; set; }
        public string ElementType { get; set; }
        public string Action { get; set; }
        public string Value { get; set; }
        public string ExpectedResult { get; set; }
        public string ActualResult { get; set; }
        public string PassFail { get; set; }
        public string TestCaseId { get; set; }
    }

    /// <summary>
    /// Test Result Class that holds the test case id, name and status
    /// </summary>
    public class TestResult
    {
        public string TestCaseId { get; set; }
        public string Name { get; set; }
    }

    /// <summary>
    /// Class exclusive for drag and drop elements
    /// </summary>
    public class DragAndDropElement
    {
        public string SourceElement { get; set; }
        public string SourceElementType { get; set; }
        public string DestinationElement { get; set; }
        public string DestinationElementType { get; set; }
        public string ElementToDrag { get; set; }
        public string ElementToDragType { get; set; }
    }

    /// <summary>
    /// Test file detail
    /// </summary>
    public class TestFileDetail
    {
        public string TestCaseFileName { get; set; }
        public string TestCaseRootName { get; set; }
        public string TestResultReportPath { get; set; }
        public string TestResultScreenshotPath { get; set; }
    }
}
