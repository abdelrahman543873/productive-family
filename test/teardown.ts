export default async function(): Promise<void> {
  await global['__MONGOD__'].stop();
}
