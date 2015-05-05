export default function(message, type = 'success') {
  /* jshint newcap: false */
  Messenger().post({
    message: message,
    type: type
  });
  /* jshint newcap: true */
}
