'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments();
      table.string('phone', 60).nullable();
      table.string('name', 60).nullable();
      table.text('detail').nullable();
      table.string('email', 60).nullable();
      table.string('type', 60).nullable();
      table.string('status', 60).nullable();
      table.integer('helped_id', 60).nullable();
      table.integer('helper_id', 60).nullable();
      table.string('address', 60).nullable();
      table.string('lat', 60).nullable();
      table.string('lng', 60).nullable();
      table.string('transaction_id', 256).nullable();
      table.string('transaction_type', 60).nullable();
      table.string('transaction_status', 60).nullable();
      table.string('transaction_link', 60).nullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
