import Vue from 'vue';
import VueRouter from 'vue-router';
import MQTTConnector from '../views/MqttConnector';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MQTTConnector',
    component: MQTTConnector,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
