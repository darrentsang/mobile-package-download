

function getAuthFromLocal() {
    return window.localStorage.getItem('auth')
}

function setAuthFromLocal(auth) {
    window.localStorage.setItem('auth', auth)
}

module.exports = {getAuthFromLocal, setAuthFromLocal}