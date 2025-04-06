import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 50 }, // ramp up to 50 users
    { duration: '1m', target: 50 },  // stay at 50 users
    { duration: '30s', target: 0 },  // ramp down to 0 users
  ],
};

export default function () {
  const res = http.get('http://infnet-app-service:3000');
  
  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  sleep(1);
}
