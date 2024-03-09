export async function pause(timeout: number = 250) {
  let timeoutRef: NodeJS.Timeout | null = null;
  await new Promise((resolve, reject) => {
    timeoutRef = setTimeout(() => {
      resolve(true);
    }, timeout);
  });
  timeoutRef && clearTimeout(timeoutRef);
}
