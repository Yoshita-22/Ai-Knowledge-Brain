export async function retry(fn, attempts = 5) {
    const retryTime = 1; 
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      if (e.status === 503 && i < attempts - 1) {
        retryTime*2000;
        await new Promise(r => setTimeout(r,retryTime ));
        continue;
      }
      throw e;
    }
  }
}
