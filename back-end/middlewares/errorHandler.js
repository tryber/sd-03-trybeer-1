const errors = {
  invalid_user: { message: 'Email or password not valid', status: 401 },
  // invalid_entries: { message: 'Invalid entries. Try again.', status: 400 },
};

function makeError(err) {
  return {
    status: errors[err].status,
    payload: { message: errors[err].message },
  };
}

module.exports = (err, _req, res, _next) => {
  console.log('erre', err);
  const error = makeError(err);
  // ternário top do Herbert https://github.com/tryber/sd-03-store-manager/pull/4/files
  return error
    ? res.status(error.status).json(error.payload)
    : res.status(500).json({ message: 'Internal error' });
};
