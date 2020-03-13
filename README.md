# Quarantine.help App

Collaborating map to help people during the Covid-19 Crisis.

## Installation

Install [NodeJS](https://nodejs.org/en/).

###  Run the Front-End App :

```bash
npm install && npm run dev
```

This app use [NextJS](https://nextjs.org/docs/getting-started).

###  Run the Api :

First, copy-paste the .env.exemple to .env and change the Database settings to your needs :

Install AdonisJS CLI :

```bash
npm i -g @adonisjs/cli
```

Then run inside the api folder :

```bash
cd api
adonis migration:run
adonis seed
adonis serve
```

## Usage

This app use Next.JS for the front-end App and Adonis for the Api part.

Database structure :

Markers
- id
- phone (private)
- email (private)
- name (private)
- message (public)
- address (public)
- type
- status
- creator_id
- helper_id
- lat
- lng

User
- id
- email
- password (v2)

### TODOS

[ ] Continue the Form for asking help and for help (W.I.P)
[ ] Localization
[ ] Add a popover for each markers (need to be discussed)
[ ] Cleaning stuff inside components

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

### Contributors :

- [Daniel Sum](daniel@cherrypulp.com)

## License

[MIT](https://choosealicense.com/licenses/mit/)
