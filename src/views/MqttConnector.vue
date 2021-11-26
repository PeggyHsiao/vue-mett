<template>
  <div>
    <h2>MQTT Connector</h2>

    <!-- Settings Connection -->
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
    <button
      v-if="client.connected"
      @click="disconnection"
    >
      Disconnect
    </button>

    <!-- Subsscriber / Unsubscriber -->
    <h3>Subscriber</h3>
    <p>Topic</p>
    <input
      v-model="subscriber.topic"
      type="text"
    >

    <p>Qos</p>
    <select v-model="subscriber.qos">
      <option
        v-for="item in qosList"
        :key="item"
        :value="item"
      >
        {{ item }}
      </option>
    </select>
    <br>

    <button
      @click="clickSubscriber"
    >
      Subscriber
    </button>
    <button
      v-if="subscribeSuccess"
      @click="clickUnsubscriber"
    >
      Unsubscriber
    </button>
    <span>{{ `status:${subscribeSuccess}` }}</span>

    <!-- Publish -->
    <h3>Publish</h3>
    <p>Topic</p>
    <input
      v-model="publish.topic"
      type="text"
    >

    <p>Qos</p>
    <select v-model="publish.qos">
      <option
        v-for="item in qosList"
        :key="item"
        :value="item"
      >
        {{ item }}
      </option>
    </select>

    <p>Send Message</p>
    <input
      v-model="publish.msg"
      type="text"
    >
    <br>

    <button
      @click="clickPublish"
    >
      Publish
    </button>

    <h3>Respons Message</h3>
    <textarea
      v-model="responseMsg"
      cols="30"
      rows="10"
    />
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
      subscriber: {
        topic: '',
        qos: 0,
      },
      publish: {
        topic: '',
        qos: 0,
        msg: 'Hello World',
      },
      responseMsg: '',
      qosList: [0, 1, 2],
      subscribeSuccess: false,
    };
  },
  methods: {
    createConnection() {
      const {
        host, port, ...options
      } = this.connection;
      const connectUrl = `ws://${host}:${port}`;

      this.client = mqtt.connect(connectUrl, options);

      this.client.on('message', (topic, message) => {
        this.responseMsg = this.responseMsg.concat(message);
      });
    },
    clickSubscriber() {
      const { topic, qos } = this.subscriber;

      this.client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log(error);
          return;
        }
        this.subscribeSuccess = true;
      });
    },
    clickUnsubscriber() {
      const { topic } = this.subscriber;

      this.client.unsubscribe(topic, (error) => {
        if (error) {
          console.log(error);
          return;
        }
        this.subscribeSuccess = false;
      });
    },
    clickPublish() {
      const { topic, qos, msg } = this.publish;

      this.client.publish(topic, msg, qos, (error) => {
        if (error) {
          console.log(error);
        }
      });
    },
    disconnection() {
      this.client.end();
      this.client = { connected: false };
    },
  },
};
</script>

<style scoped>
p { margin: 20px 0 1px 0; }
button { margin-top: 30px; }
</style>
