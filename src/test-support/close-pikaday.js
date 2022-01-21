import { getRootElement, click } from '@ember/test-helpers';

export default async function closePikaday() {
  const root = await getRootElement();

  await click(root);
}
