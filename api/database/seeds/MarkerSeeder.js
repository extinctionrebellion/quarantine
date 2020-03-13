'use strict'

/*
|--------------------------------------------------------------------------
| MarkerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class MarkerSeeder {
  async run () {
    const user = await Factory
      .model('App/Models/User')
      .createMany(100);

    const marker = await Factory
      .model('App/Models/Marker')
      .createMany(100);
  }
}

module.exports = MarkerSeeder
