export default function(message, type = 'success') {
  new Messenger().post({
    message: message,
    type: type
  });
}
