const db = require("../models");
const Tutorial = db.tutorials;

exports.create = (req, res) => {
  //Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }
  //Save a tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  //Save tutorial
  tutorial
    .save(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial",
      });
    });
};
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Tutorial.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while find the Tutorial",
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found tutorial with id " + id });
      } else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error Error retrieving Tutorial with id=" + id });
    });
};
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update can not be empty." });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorials was not found!`,
        });
      } else res.send({ message: "Tutorials was updated successfully!" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error updating Tutorial with id=" + id } || err);
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorials with id=${id}. Maybe Tutorial was not found!`,
        });
      } else {
        res.send({ message: "Tutorials was deleted successfully!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Couldn't delete Tutorials with id=${id}` });
    });
};
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while retrieving the tutorial.",
        });
    });
};
