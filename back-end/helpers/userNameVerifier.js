export class UserNameVerifier {
    constructor(userName) {
        this.userName = userName;
    }
    hasUserName() {
        return this.userName != false
    }
    userName() {}
}