# Elementor - Team Lead Code Interview 

#### Here you can find the app [Demo](https://streamable.com/xg94z2)

I chose to implement this using `Node.js + Typescript` in the backend, and `React` in the frontend. 

This project is dockerized and **deploy-ready** using `docker compose`.
This means that you'd have to have docker engine on your machine in order to run the server along with the local database.

**It's simple though!** simply run the following steps: 
___________________________________________________
## Server: (in the `/server` directory):
#### `yarn` or `npm install`
and then:
#### `yarn up` or `npm run up`

This would run both the server container and the MySql DB (First time could take a while).<br />

#### Ports:
- localhost server port: **5050**
- MySql DB port: **3306** 

> **_NOTE_**: All of the ports can be overridden either by the orchestrator (_e.g_: `Kubernetes`), environment variables, or by changing the `docker-compose.yml` file

___________________________________________________
## Client: (in the `/client` directory):
#### `yarn` or `npm install`
and then:
#### `yarn start` or `npm run start`

This would run the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
