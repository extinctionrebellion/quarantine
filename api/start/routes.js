'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Marker = use('App/Models/Marker')
const User = use('App/Models/User')
const Mail = use('Mail')
const Database = use('Database')

Route.get('/api/v1/markers', async ({response}) => {
  let items = await Marker.all();
  response.send(items.toJSON());
});

Route.get('/api/v1/search', async ({request, response}) => {
  let items = await Database.raw('SELECT *, (acos(sin(?) * sin(lat) + cos(?) * cos(lat) * cos(lng - (?))) * 6371) as distance from markers WHERE lat IS NOT NULL ORDER BY distance ASC ', [request.input('lat'), request.input('lat'), request.input('lng')]);
  response.send(items[0]);
});

Route.post('/api/v1/markers', async ({response, request}) => {

  console.log('POST', request);
  const item = await Marker.create(request.only(['message', 'email', 'name', 'phone', 'address', 'lat', 'lng']));

  console.log('Email', request.input('email'));

  let user = await User.findBy('email', request.input('email'));

  if (!user) {
    user = await new User;
  }

  user.username = request.input('name');
  user.email = request.input('email');
  user.password = Math.random().toString(36).substr(2, 9);
  user.save();

  if (request.get('type') === 'quarantine') {
    item.creator_id = user.id;
    item.save();
  } else {
    item.helper_id = user.id;
    item.save();
  }

  item.status = 'active';
  item.save();

  // Send email
  await Mail.send('emails.welcome', user.toJSON(), (message) => {

    console.log('Email', user.email);

    message
      .to(user.email)
      .from('info@allforclimate.earth')
      .subject('Welcome to Covid Solidarity !')
  });

  response.send(item);
});

Route.get('/api/v1/users', async ({response}) => {
  const items = await User.all(['id', 'username'])
  response.send(items)
});

Route.get('facebook', async ({ ally }) => {
  await ally.driver('facebook').redirect();
});

Route.get('facebook/authenticated', async ({ ally }) => {
  const user = await ally.driver('facebook').getUser()

  return user;
});
