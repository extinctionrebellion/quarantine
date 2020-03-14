'use strict';

const Marker = use('App/Models/Marker');
const User = use('App/Models/User');
const Mail = use('Mail');

class MarkerController {
  /**
   * Store the marker into the databse and create an user if he doesn't exists in the database
   *
   * @param response
   * @param request
   * @returns {Promise<void>}
   */
  async store({response, request}) {

    const item = await Marker.create(request.only(['message', 'email', 'name', 'phone', 'address', 'lat', 'lng']));

    let user = await User.findBy('email', request.input('email'));
    let isNew = false;

    if (!user) {
      user = await new User;
      isNew = true;
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

    /**
     * Send an email only when people is a new one
     */
    if (isNew) {
      await Mail.send('emails.welcome', user.toJSON(), (message) => {

        console.log('Email', user.email);

        message
          .to(user.email)
          .from('info@allforclimate.earth')
          .subject('Welcome to Covid Solidarity !')
      });
    }

    response.send(item);
  }
}

module.exports = MarkerController;
