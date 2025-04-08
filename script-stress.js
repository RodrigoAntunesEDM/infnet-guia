import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Trend, Rate } from 'k6/metrics';

const custom_counter = new Counter('custom_counter_total');
const custom_duration = new Trend('custom_response_time_ms');
const custom_rate = new Rate('custom_success_rate');

export const options = {
  vus: 10,
  duration: '30s',
  tags: {
    test_type: 'stress',
  },
};

export default function () {
  const start = Date.now();
  const res = http.get('http://127.0.0.1:3000');

  const success = res.status === 200;

  check(res, {
    'status is 200': () => success,
  });

  const duration = Date.now() - start;
  custom_counter.add(1);
  custom_duration.add(duration);
  custom_rate.add(success);

  sleep(1);
}
