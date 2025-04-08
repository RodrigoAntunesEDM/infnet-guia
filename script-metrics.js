import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter, Gauge, Trend, Rate } from 'k6/metrics';

// Métricas personalizadas
const myCounter = new Counter('custom_counter_total');
const myGauge = new Gauge('custom_gauge_value');
const myTrend = new Trend('custom_response_time_ms');
const myRate = new Rate('custom_success_rate');

export const options = {
  vus: 10,
  duration: '30s',
  tags: { test_type: 'custom_metrics' },
};

export default function () {
  const start = Date.now();
  const res = http.get('http://127.0.0.1:3000'); // Substituir pelo endpoint real
  const duration = Date.now() - start;

  // Incrementa contador
  myCounter.add(1);

  // Atualiza gauge com o tempo de resposta
  myGauge.add(duration);

  // Registra no trend
  myTrend.add(duration);

  // Marca como sucesso ou falha (para calcular taxa)
  const success = res.status === 200;
  myRate.add(success);

  check(res, {
    'status is 200': () => success,
  });

  sleep(1);
}