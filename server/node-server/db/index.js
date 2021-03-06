const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: "password",
    user: "root",
    database: "planner",
    host: "localhost",
    port: "3306",
});

let plannerdb = {};

plannerdb.all = () => {

    return new Promise((resolve, reject) => {
        pool.query(`SELECT * from planner.Plans;`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });

};

plannerdb.createNewPlan = (planName) => {

    return new Promise((resolve, reject) => {
        // console.log(planData);
        // check if entry exists;
        pool.query(`INSERT INTO Plans (planId) VALUES ('${planName}');`, (err, results) => {
            if(err) {
                console.log("Plan already exists!");
                return reject(err);
            }
            return resolve(results);
        });
    });

};

plannerdb.retrievePlans = (User) => {

    return new Promise((resolve, reject) => {
        // console.log(planData);
        // check if entry exists;
        pool.query(`SELECT * from planner.Plans;`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });

};

plannerdb.deletePlan = (planId) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM planner.Plans WHERE planId = "${planId}";`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

plannerdb.getAllTasksFromPlan = (planId) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT Tasks.state as taskState, subTaskId, SubTasks.state as subTaskState, Tasks.taskId FROM planner.SubTasks
        INNER JOIN Tasks 
            ON Tasks.taskId=SubTasks.taskId
        INNER JOIN Plans 
            ON Tasks.planId=Plans.planId
            WHERE Plans.planId="${planId}";`, (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

plannerdb.getSubTasksFromTask = (taskId) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM planner.SubTasks
                    INNER JOIN Tasks 
                        ON Tasks.taskId=SubTasks.taskId
                        WHERE Tasks.taskId="${taskId}";`, 
                        (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

//-- INSERT INTO Tasks (planId, taskId, state) VALUES
//-- ('masters', 'nyu', 'todo');
plannerdb.createNewTask = (planId, taskId) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO Tasks (planId, taskId, state) VALUES
                    ('${planId}','${taskId}','todo')`, 
                        (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

plannerdb.createNewSubTask = (planId, taskId, subTaskId) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO SubTasks (planId, taskId, subTaskId, state) VALUES
                    ('${planId}','${taskId}', '${subTaskId}','todo');`, 
                        (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};


// UPDATE SubTasks 
// SET 
//     state = 'done'
// WHERE
//     planId = 'masters' AND taskId = 'nyu' AND subTaskId = 'recs';

// SELECT * FROM planner.SubTasks;

plannerdb.updateSubTask = (planId, taskId, subTaskId, state) => {
    return new Promise((resolve, reject) => {
        console.log(planId, taskId, subTaskId, state);
        pool.query(`UPDATE SubTasks SET state = '${state}' 
                    WHERE planId = '${planId}' 
                    AND taskId = '${taskId}' AND subTaskId = '${subTaskId}';`,
        (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};


module.exports = plannerdb;
