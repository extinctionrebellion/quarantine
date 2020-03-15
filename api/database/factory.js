'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker) => {

  const type = faker.pickone(['helped', 'helper']);

  return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make('azerty'),
    type: type,
    phone: faker.phone(),
    name: faker.name(),
    first_name: faker.name(),
    thumb: type === 'helper' ? 'https://greendestinations.org/wp-content/uploads/2019/05/avatar-exemple.jpg' : 'https://cdn4.iconfinder.com/data/icons/occupation-and-people-avatar-vol-2-1/128/woman_avatar_user_old_people_female_elderly-512.png',
    notes: faker.sentence(),
    represented_by: faker.sentence(),
    status: faker.pickone(['waiting', 'ready', 'selected', 'done']),
    address: faker.address(),
    lat: faker.latitude({min: 49.7, max: 52.9}),
    lng: faker.longitude({min: 3.7, max: 4.9})
  }
});

Factory.blueprint('App/Models/Order', (faker) => {
  return {
    phone: faker.phone(),
    name: faker.name(),
    detail: faker.sentence(),
    email: faker.email(),
    type: faker.pickone(['order']),
    status: faker.pickone(['waiting', 'ready', 'selected', 'done']),
    address: faker.address(),
    lat: faker.latitude({min: 49.7, max: 52.9}),
    lng: faker.longitude({min: 3.7, max: 4.9}),
    helped_id: 1,
    helper_id: 2
  }
});

Factory.blueprint('App/Models/Marker', (faker) => {
  return {
    phone: faker.phone(),
    email: faker.email(),
    name: faker.name(),
    message: faker.sentence(),
    address: faker.address(),
    type: faker.pickone(['quarantine', 'help']),
    status: faker.pickone(['complete', 'active']),
    creator_id: null,
    helper_id: null,
    lat: faker.latitude({min: 49.7, max: 52.9}),
    lng: faker.longitude({min: 3.7, max: 4.9}),
  }
});
