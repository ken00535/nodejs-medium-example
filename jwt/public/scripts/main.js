

function login(user, password) {
    // fetch('http://192.168.99.92:8080/login')
    //     .then(function (response) {
    //         console.log(response.status);
    //         console.log(response.data);
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //         console.log(error.response);
    //     })
    console.log(user, password);
    axios.post('http://192.168.99.92:8080/login', {
        user: user,
        password: password,
    })
        .then(function (response) {
            console.log(response.status);
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
            console.log(error.response);
        })
}