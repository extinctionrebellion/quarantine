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

Route.get('/api/v1/markers', async ({ response }) => {
  let items = await Marker.all();
  response.send(items.toJSON());
});

Route.post('/api/v1/markers', async ({ response, request }) => {
  console.log('POST', request);
  const item = await Marker.create(request.only(['message', 'email', 'name', 'phone', 'addresss', 'lat', 'lng']));
  item.status = 'active';
  item.save();
  response.send(item)
});

Route.get('/api/v1/users', async ({ response }) => {
  const items = await User.all(['id', 'username'])
  response.send(items)
});
