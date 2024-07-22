const emailChecker = (text) => {
  const emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"\!]+(\.[^<>()[\]\\.,;:\s@\"\!]+)*)|(\"[^\"\!]+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const htmlPattern = /<[^>]*>/;

  const isEmail = emailPattern.test(text);
  const containsHTML = htmlPattern.test(text);

  return isEmail && !containsHTML;
};

module.exports = emailChecker;