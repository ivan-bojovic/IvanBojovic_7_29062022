export default {
    userData: undefined,
    setUserData(userdata) {
        this.userData = userdata;
        localStorage.setItem('userdata', userdata);
    } 
}