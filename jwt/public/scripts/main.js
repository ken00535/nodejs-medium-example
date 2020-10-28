
async function login(user, password) {
    try {
        let res = await axios.post('http://192.168.99.92:8080/login', {
            user: user,
            password: password,
        })
        res = await axios.get('http://192.168.99.92:8080/content', {
            headers: {
                'Authorization': `Bearer ${res.data.token}`
            },
        })
        window.location = res.data.location
    } catch (e) {
        console.log(e)
    }
}