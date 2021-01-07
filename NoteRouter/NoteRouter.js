const express = require("express");

class NoteRouter {
  constructor(noteService) {
    this.noteService = noteService;
  }

  // /api/requests in :place
  router() {
    let router = express.Router();

    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));

    return router;
  }

  get(req, res) {
    console.log(req.user.username);
    
    return this.noteService
      .list(req.user.username, 1) // ??????
      .then((requests) => {
        res.json(requests);
      })
      .catch((err) => res.status(500).json(err));
  }

  post(req, res) {
    // console.log(req.body)
    return this.noteService
      .add(req.user.username, req.body.title, req.body.date, req.body.content)
      .then(() => this.noteService.list(req.user, req.params.place))
      .then((requests) => res.json(requests))
      .catch((err) => res.status(500).json(err));
  }
}

module.exports = NoteRouter;
