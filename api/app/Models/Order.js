'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {

  helped () {
    return this.belongsTo('App/Models/User', 'helped_id', 'id')
  }

  helper () {
    return this.belongsTo('App/Models/User', 'helper_id', 'id')
  }
}

module.exports = Order
