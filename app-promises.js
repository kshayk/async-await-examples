const users = [{
    id: 1,
    name: 'shay',
    schoolId: 101
}, {
    id: 2,
    name: 'not shay',
    schoolId: 999
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 99
},{
    id: 2,
    schoolId: 999,
    grade: 60
}, {
    id: 3,
    schoolId: 101,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id === id);

        if(user) {
            resolve(user);
        } else {
            reject(`Unable to find user with ID of ${id}`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter(grade => grade.schoolId === schoolId))
    })
};

const getStatus = (userId) => {
    var user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId)
    }).then((grades) => {
        let average = 0;

        if(grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length
        }

        return average;
    });
};

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    let average = 0;

    if(grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length
    }

    return average;
};

getStatusAlt(1).then((name) => {
    //will print 'shay'
    console.log(name);
}).catch((e) => {
    //will print "an error has occurred
    console.log(e.message);
});

getUser(2).then((user) => {
    console.log(user);
}).catch((e) =>{
    console.log(e)
});

getGrades(101).then((grades) => {
    console.log(grades);
}).catch((e) =>{
    console.log(e)
});

getStatus(1).then((status) => {
    console.log(status);
}).catch((e) =>{
    console.log(e)
});