# Quarantine.help

In quarantine for #covid19? Share what you need and find rebels that can help you.

We are rebelling against extinction and we won't leave anyone behind.
If you are in quarantine for the coronavirus and you need anything, use this app to let the community know.

If you are in good health and you can help, check out the app to find people near you that need your help. It will mean the world to them.

Stay safe.

## How it works

### If you are in quarantine
- Go to https://quarantine.help
- Share what you need (groceries, bread, medicines, anything)
- Enter your address to pin point where you are on the map
- Enter your name, email and phone number. Those won't be shared publicly (see below)

### If you are here to help someone in quarantine
- Go to https://quarantine.help
- See around you what people need
- Once you find someone that you can help, click on "offer my help"
- Enter your name and some info about you, including a way to contact you
- We will send an email to the person who was asking for help with your contact info

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

- [ ] Continue the Form for asking help and for help (W.I.P)
- [ ] Clustering markers
- [ ] Localization (en|fr|nl)
- [ ] Add a popover for each markers (need to be discussed)
- [ ] Cleaning stuff inside separate components
- [ ] Document Api

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

### Contributors :

- [Daniel Sum](daniel@cherrypulp.com)

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Contribute
The best way to contribute is by offering help to people in your community.
But you can also contribute by improving this code. Pull requests are very welcome. We use a javascript stack. We also welcome financial contributions to help us hire a developer to maintain this app ([Donate](https://opencollective.com/quarantine)).

