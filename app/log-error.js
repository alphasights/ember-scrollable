export default function (error) {
  Honeybadger.notify(error);
  console.error(error);
}
