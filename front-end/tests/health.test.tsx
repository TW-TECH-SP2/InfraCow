import { describe, it, expect } from 'vitest';

describe('Healthcheck do backend', () => {
  it('deve retornar status 200 em /health', async () => {
    const response = await fetch('http://localhost:4000/health');
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toContain('OK');
  });
});
