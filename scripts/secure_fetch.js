export async function secure_fetch(path, options) {
  try {
    return fetch(path, options);
  } catch (error) {
    return -9999;
  }
}
