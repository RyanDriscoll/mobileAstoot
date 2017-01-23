import * as firebase from 'firebase';
import secret from './secret';
import axios from 'axios';

const ApiKey = require('./secret').ctaKey;
const ctaApiPrefix = 'http://www.ctabustracker.com/bustime/api/v2/';
const format = '&format=json';

firebase.initializeApp(secret.config);
const database = firebase.database();

export default async function getRoutesAsync() {
  const ApiKey = require('./secret').ctaKey;
  const ctaApiPrefix = 'http://www.ctabustracker.com/bustime/api/v2/';
  const format = '&format=json';
  let arrayOfRoutes = []
  let routes = await axios.get(`${ctaApiPrefix}getroutes?key=${ApiKey}${format}`)
  routes = routes.data['bustime-response'].routes

  let promArray = await Promise.all(routes.map(async route => {
    let directions = await axios.get(`${ctaApiPrefix}getdirections?key=${ApiKey}&rt=${route.rt}${format}`)
    directions = directions.data['bustime-response'].directions.map(dirObj => dirObj.dir);
    let stopObj = {};
    let stops = await Promise.all(directions.map(async direction => {
      let stops = await axios.get(`${ctaApiPrefix}getstops?key=${ApiKey}&rt=${route.rt}&dir=${direction}${format}`)
      let objOfStops = {};
      stops.data['bustime-response'].stops.forEach(stop => objOfStops[stop.stpid] = {
        name: stop.stpnm,
        stopId: stop.stpid,
        lat: stop.lat,
        lon: stop.lon
      });
      stopObj[direction] = objOfStops;
    }))
    let routeObj = {
        routeNum: route.rt,
        name: route.rtnm,
        color: route.rtclr,
        directions: stopObj
      }
    arrayOfRoutes.push(routeObj);
  }))
  arrayOfRoutes.forEach(route => {
    database.ref(`/routes/${route.routeNum}`).set(route)
  })
  console.log('database seeded!')
}

// getRoutesAsync();
