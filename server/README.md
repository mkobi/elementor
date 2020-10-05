## Elementor server 

This entire project is dockerized and deploy-ready using `docker compose`.
This means that you'd have to have docker engine on your machine in order to run the server along with the local database.

**It's simple though!** simply run (in the `/server` directory):
#### `yarn` or `npm install`
and then:
#### `yarn up` or `npm run up`

This would run both the server container and the MySql DB. <br />

#### Ports:
- localhost server port: **5050**
- MySql DB port: **3306** 

> **_NOTE_**: All of the port can be overridden either by the orchestrator (e.g: Kubernetes) environment variables or by changing the `docker-compose.yml` file