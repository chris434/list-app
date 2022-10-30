  import { EMAIL_PATTERN } from '../regexPatens/pattens.js'
  export class UserFieldVerifier {
      constructor(email, name, password) {
          this.email = email;
          this.name = name;
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
          return !this.name.length > 25
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