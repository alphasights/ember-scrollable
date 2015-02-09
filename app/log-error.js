export default function (error) {
  Honeybadger.notify(error);
  console.assert(false, error);
}
