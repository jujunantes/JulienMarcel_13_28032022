![CreatedBy](https://img.shields.io/static/v1?label=Created%20by&message=Julien%20MARCEL&color&style=flat)
![BuiltWith](https://img.shields.io/static/v1?label=Built%20with&message=React_v17.0.2&color=blue&style=flat&logo=createreactapp)

# Argent Bank : an authentication system for a bank
Argent bank is an front-end interface that allows a user to log to a back-end, access his data and edit his name.
![ScreenShot](https://github.com/jujunantes/JulienMarcel_13_28032022/raw/master/src/medias/capture.png)

## 1. Prerequisites
In order to get this project running you'll first need to make sure that the following packages are installed on your computer :
- NodeJS [(version 12.18 or newer)](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- Optionnaly, if you need to read or edit this project's files, you'll need to use a good text editor like [Sublime Text](https://www.sublimetext.com/) or [Atom](https://atom.io/). This project was developped using the excellent IDE [Visual Code](https://code.visualstudio.com/).

This project also uses the following dependencies, but they'll get installed automatically later on (see part #3) :
- react-router and react-router-dom: [v6.2.1](https://reactrouter.com/)
- react-bootstrap: [v5.1.3](https://react-bootstrap.github.io/)
- react-redux: [v7.2.8](https://react-redux.js.org/)
- redux toolkit: [v1.8.1](https://redux-toolkit.js.org/)
- axios: [v0.26.1](https://github.com/axios/axios)

## 2. Installing the backend
Argent Bank makes use of a REST API that you first need to install. In order to do so:
- download the sources from [its github repository](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API).
- then, in a console, enter the following commands :
```sh
cd <Your Path>\Project-10-Bank-API-master
# Install dependencies
npm install
# Start local dev server
npm run dev:server
# Populate database with two users
npm run populate-db
```
The REST API will then get served locally on your computer at port 3001.
You can then visit [its documentation](http://localhost:3001/api-docs) to learn about its endpoints

## 3. Installing Argent Bank
Argent Bank's installation is straightforward :
- download the sources from [its github repository](https://github.com/jujunantes/JulienMarcel_13_28032022).
- then, in a console, enter the following commands :
```sh
cd <Your Path>\JulienMarcel_13_28032022-master
yarn
yarn start
```

Alternatively, you can enter the following commands :
```sh
cd <Your Path>\JulienMarcel_13_28032022-master
npm install
npm run start
```

## 4. Using Argent Bank

### 4.1 Features
Argent banks implements the features listed in [the back-end API's issues section](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API/tree/master/.github/ISSUE_TEMPLATE):
- the user can navigate to the home page (/) and see all placeholder data from mockup;
- the user can navigate to the login page (/login), fill out credentials, login to the back-end API with JWT tokens for authentication, and successfully navigate to a profile page (/profile);
- the user can see the logout button when logged in, click the logout button, be returned to the home page (/);
- After successfully logging in, the user can see his profile page, see his first name on the profile page, see placeholder bank account information;
- The React app contains an implementation of Redux for state management that has a store to manage all of the data, action(s) for sending information, reducer(s) for handling application state changes;
- The user can edit his profile (first name and last name, this data being persisted into ythe database).

### 4.2 Loging in

When at the home page you can click on the log-in button and enter any of those two credentials :
#### Tony Stark

- Email: `tony@stark.com`
- Password: `password123`

#### Steve Rogers

- Email: `steve@rogers.com`,
- Password: `password456`

The chosen user's mocked data will then be displayed.
You can edit the user's first and last names by clicking on the "edit name" button.