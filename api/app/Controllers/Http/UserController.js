'use strict';

const User = use('App/Models/User');
const Mail = use('Mail');
const auth = use('Mail');

class UserController {
  /**
   * User registration process
   *
   * @param auth
   * @param response
   * @param request
   * @returns {Promise<void>}
   */
  async store({auth, response, request}) {

    let user = await new User;
    user.first_name = request.input('firstName');
    user.last_name = request.input('lastName');
    user.username = user.first_name + user.last_name;
    user.email = request.input('email');
    user.password = request.input('password');
    user.save();

    /**
     * Send an email only when people is a new one
     */
    await Mail.send('emails.welcome', user.toJSON(), (message) => {

      console.log('Email', user.email);

      message
        .to(user.email)
        .from('info@allforclimate.earth')
        .subject('Welcome to Covid Solidarity !')
    });

    await auth.login(user).remember(true);

    response.send(item);
  }

  async login({auth, response, request}) {

    let user = await auth.attempt(request.input('email'), request.input('password')).remember();

    response.send(user);
  }
}

module.exports = UserController;
