<template>
  <div>
    <h2>MQTT Connector</h2>

    <p>Host</p>
    <input
      v-model="connection.host"
      type="text"
    >

    <p>Port</p>
    <input
      v-model="connection.port"
      type="text"
    >

    <p>Protocol</p>
    <input
      type="text"
      value="websocket"
      disabled
    >

    <p>User Name</p>
    <input
      v-model="connection.username"
      type="text"
    >

    <p>Password</p>
    <input
      v-model="connection.password"
      type="password"
    >

    <br>

    <button
      @click="createConnection"
    >
      Connect
    </button>
  </div>
</template>

<script>
import mqtt from 'mqtt';

export default {
  name: 'MqttConnector',
  data() {
    return {
      connection: {
        host: '172.16.8.16',
        port: 51328, // use websocket
        username: 'admin',
        password: '111',
      },
      client: {
        connected: false,
      },
    };
  },
  methods: {
    createConnection() {
      const {
        host, port, ...options
      } = this.connection;
      const connectUrl = `ws://${host}:${port}`;

      this.client = mqtt.connect(connectUrl, options);
    },
    clickSubscriber() {

    },
  },
};
</script>

<style scoped>
p { margin: 20px 0 1px 0; }
button { margin-top: 30px; }
</style>
