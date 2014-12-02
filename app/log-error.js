export default function (error) {
  Raven.captureException(error);
  console.error(error);
}
