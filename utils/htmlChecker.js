const htmlChecker = (text) => {
  const pattern = new RegExp(/^[A-Za-z0-9\s\-_,\.;:()]+$/);
  const textChecking = text.match(pattern).join('');

  if (textChecking.length === text.length) {
    return true;
  } else {
    return false;
  }
};

module.exports = htmlChecker;