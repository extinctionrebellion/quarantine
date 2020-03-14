'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Marker extends Model {

  static get computed () {
    return ['point']
  }

  static get hidden () {
    return ['email', 'name', 'creator_id', 'helper_id']
  }

  getPoint({ lat, lng }) {
    return {
      type: 'point',
      coordinates: [lat, lng]
    }
  }
}

module.exports = Marker;
