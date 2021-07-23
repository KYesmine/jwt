function UserException(message, type) {
    this.message = message
    this.type = type
    this.name = 'UserLoginException'
}

module.exports = UserException