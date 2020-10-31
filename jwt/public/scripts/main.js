
async function login(user, password) {
    try {
        // modify address to your hostname
        let res = await axios.post('http://192.168.99.83:8080/login', {
            user: user,
            password: password,
        })
        res = await axios.get('http://192.168.99.83:8080/content', {
            headers: {
                'Authorization': `Bearer ${res.data.token}`
            },
        })
        window.location = res.data.location
    } catch (e) {
        console.log(e)
    }
}