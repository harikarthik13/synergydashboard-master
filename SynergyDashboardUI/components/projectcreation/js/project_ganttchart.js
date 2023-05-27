
$(function () {  
    
    var tasks = [{
        'id': 1,
        'parentId': 0,
        'title': 'System Requirement Analysis',
        'start': new Date('2020-11-18T05:00:00.000Z'),
        'end': new Date('2020-11-20T12:00:00.000Z'),
        'progress': 31
    }, {
        'id': 2,
        'parentId': 1,
        'title': 'UI development',
        'start': new Date('2020-11-20T05:00:00.000Z'),
        'end': new Date('2020-11-25T09:00:00.000Z'),
        'progress': 60
    }, {
        'id': 3,
        'parentId': 2,
        'title': 'Application Development',
        'start': new Date('2020-11-25T05:00:00.000Z'),
        'end': new Date('2020-11-31T09:00:00.000Z'),
        'progress': 100
    }, {
        'id': 4,
        'parentId': 3,
        'title': 'System and Functional Testing',
        'start': new Date('2020-11-31T10:00:00.000Z'),
        'end': new Date('2020-12-03T09:00:00.000Z'),
        'progress': 100
    }, {
        'id': 5,
        'parentId': 4,
        'title': 'UAT',
        'start': new Date('2020-12-03T10:00:00.000Z'),
        'end': new Date('2020-12-06T09:00:00.000Z'),
        'progress': 60
    }];
     
    var dependencies = [{
        "id": 1,
        "predecessorId": 3,
        "successorId": 4,
        "type": 0
    }, {
        "id": 2,
        "predecessorId": 4,
        "successorId": 5,
        "type": 0
    }, {
        "id": 3,
        "predecessorId": 5,
        "successorId": 6,
        "type": 0
    }, {
        "id": 4,
        "predecessorId": 6,
        "successorId": 7,
        "type": 0
    }, {
        "id": 5,
        "predecessorId": 7,
        "successorId": 9,
        "type": 0
    }
    ];
     
    var resources = [{
        'id': 1,
        'text': 'Management'
    }, {
        'id': 2,
        'text': 'Project Manager'
    }, {
        'id': 3,
        'text': 'Analyst'
    }, {
        'id': 4,
        'text': 'Developer'
    }, {
        'id': 5,
        'text': 'Testers'
    }
    ];        
     
    var resourceAssignments = [{
        'id': 0,
        'taskId': 3,
        'resourceId': 1
    }, {
        'id': 1,
        'taskId': 4,
        'resourceId': 1
    }, {
        'id': 2,
        'taskId': 5,
        'resourceId': 2
    }, {
        'id': 3,
        'taskId': 6,
        'resourceId': 2
    }, {
        'id': 4,
        'taskId': 9,
        'resourceId': 3
    }, {
        'id': 5,
        'taskId': 10,
        'resourceId': 3
    }
    ];

    $("#displayGanttChart").dxGantt({
        tasks: {
            dataSource: tasks
        },
        dependencies: {
            dataSource: dependencies
        },
        resources: {
            dataSource: resources
        },
        resourceAssignments: {
            dataSource: resourceAssignments
        },
        editing: {
            enabled: true
        },
        validation: {
            autoUpdateParentTasks: true
        },
        toolbar: {
            items: [
                "undo",
                "redo",
                "separator",
                "collapseAll",
                "expandAll",
                "separator",
                "addTask",
                "deleteTask",
                "separator",
                "zoomIn",
                "zoomOut"
            ]
        },
        columns: [{
            dataField: "title",
            caption: "Subject",
            width: 300
        }, {
            dataField: "start",
            caption: "Start Date"
        }, {
            dataField: "end",
            caption: "End Date"
        }],
        scaleType: "weeks",
        taskListWidth: 500
    });
});














