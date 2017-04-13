window.helpers = (function () {
  function newDream(attrs = {}) {
    const dream = {
      title: attrs.title || 'Dream title',
      description: attrs.description || 'Description',
      id: uuid.v4(), // eslint-disable-line no-undef
      dream_image_url: attrs.dreamImg || '',
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
