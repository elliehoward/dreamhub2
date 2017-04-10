window.helpers = (function () {
  function newDream(attrs = {}) {
    const dream = {
      title: attrs.title || 'Timer',
      description: attrs.description || 'Description',
      id: uuid.v4(), // eslint-disable-line no-undef
      dreamImg: attrs.dreamImg || '',
      date: attrs.date,
      votes: attrs.votes
    };

    return dream;
  }


  function findById(array, id, cb) {
    array.forEach((el) => {
      if (el.id === id) {
        cb(el);
        return;
      }
    });
  }

  function pad(numberString, size) {
    let padded = numberString;
    while (padded.length < size) padded = `0${padded}`;
    return padded;
  }

  return {
    newDream,
    findById,
  };
}());
