module.exports = {
  fields = formatFields,
  entries = formatEntries
}

function formatFields(body) {
  return body.Fields
          .map(function (field, index) {
            return field.Title
          });
}

function formatEntries(body) {
  return body.Entries
          .map(function (el) {
            return _.values(el);
          });
}
