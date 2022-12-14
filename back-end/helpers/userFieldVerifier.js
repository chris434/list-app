  import { EMAIL_PATTERN } from '../regexPatens/pattens.js'
  export class UserFieldVerifier {
      constructor(email, username, password) {
          this.email = email;
          this.username = username;
          this.password = password
      }
      hasField(field) {
          console.log(this[field])
          return !this[field]
      }
      emailIsValid() {
          const regex = new RegExp(EMAIL_PATTERN)
          return !regex.test(this.email)
      }
      nameLength() {
          return !this.username.length > 25
      }

      passwordLength() {
          return this.password.length < 8
      }
      passwordHasCapitalChar() {
          return !this.password.match(/\D/)
      }
      passwordHasNumber() {
          return !this.password.match(/\d/)
      }
      passwordHasSpecialChar() {
          return !this.password.match(/\W/)
      }
  }