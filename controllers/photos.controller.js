const Photo = require('../models/photo.model');
const Voter = require('../models/Voter.model');
const htmlChecker = require('../utils/htmlChecker');
const emailChecker = require('../utils/emailChecker');

/****** SUBMIT PHOTO ********/

exports.add = async (req, res) => {

  try {
    const { title, author, email } = req.fields;
    const file = req.files.file;
    const acceptedExtensions = ['jpg', 'png', 'gif'];
    const fileName = file.path.split('/').slice(-1)[0]; // get only filename from full path
    const fileExt = fileName.split('.').slice(-1)[0].toLowerCase();

    if (title && author && email && file && acceptedExtensions.includes(fileExt) && emailChecker(email) && htmlChecker(title) && htmlChecker(author)) { // if fields are not empty...
      const newPhoto = new Photo({ title, author, email, src: fileName, votes: 0 });
      await newPhoto.save(); // ...save new photo in DB
      res.json(newPhoto);

    } else {
      throw new Error('Wrong input!');
    }

  } catch(err) {
    res.status(500).json(err);
  }

};

/****** LOAD ALL PHOTOS ********/

exports.loadAll = async (req, res) => {

  try {
    res.json(await Photo.find());
  } catch(err) {
    res.status(500).json(err);
  }

};

/****** VOTE FOR PHOTO ********/

exports.vote = async (req, res) => {

  const { id } = req.params;

  try {
    let voter = await Voter.findOne({ user: req.clientIp });
    
    if (!voter) {
      voter = new Voter({ user: req.clientIp, votes: [id] });
      voter.save();
    } else {

      if (!voter.votes.includes(id)){
        voter.votes.push(id);
        voter.save();

        const photoToUpdate = await Photo.findOne({ _id: req.params.id });

        if (!photoToUpdate) {
          res.status(404).json({ message: 'Not found' });
        } else {
          photoToUpdate.votes++;
          photoToUpdate.save();
          res.send({ message: 'OK' });
        }
      } else {
        throw new Error('User already voted for this photo.');
      }
    }
  } catch(err) {
    res.status(500).json(err);
  }
};
