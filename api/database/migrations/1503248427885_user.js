'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique();
      table.string('email', 254).notNullable().unique();
      table.string('thumb', 254).nullable();
      table.string('password', 60).nullable();
      table.string('name', 256).nullable();
      table.string('first_name', 256).nullable();
      table.string('phone', 256).nullable();
      table.string('address', 256).nullable();
      table.string('lat', 60).nullable();
      table.string('lng', 60).nullable();
      table.string('type', 60).nullable();
      table.string('status', 60).nullable();
      table.string('notes', 256).nullable();
      table.string('represented_by', 256).nullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
