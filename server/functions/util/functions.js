// eslint-disable-next-line import/prefer-default-export
exports.hasTag = (stringifiedTags, tags) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const tag of tags) {
    if (stringifiedTags.includes(tag)) {
      return true;
    }
  }
  return false;
};
