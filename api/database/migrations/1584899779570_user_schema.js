'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.renameColumn('name', 'last_name')
    })
  }

  down () {
    this.table('users', (table) => {
      table.renameColumn('last_name', 'name')
    })
  }
}

module.exports = UserSchema
