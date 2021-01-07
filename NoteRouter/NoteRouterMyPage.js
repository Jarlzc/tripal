const express = require("express");

class NoteRouterMyPage {
  constructor(noteService) {
    this.noteService = noteService;
  }

  // /api/myPage/requests in /myPage

  router() {
    let router = express.Router();

    router.get("/", this.getUser.bind(this));
    router.put("/:id", this.put.bind(this));
    router.delete("/:id", this.delete.bind(this)); // We should think about the endpoint

    return router;
  }

  getUser(req, res) {
    return this.noteService
      .listUserRequests(req.user.username) // ??????
      .then((requests) => res.json(requests))
      .catch((err) => res.status(500).json(err));
  }

  put(req, res) {
    return this.noteService
      .update(req.params.id, req.body.content, req.user)
      .then(() => this.noteService.listUserRequests(req.user))
      .then((requests) => res.json(requests))
      .catch((err) => res.status(500).json(err));
  }

  delete(req, res) {
    return this.noteService
      .remove(req.params.id, req.user)
      .then(() => this.noteService.listUserRequests(req.user))
      .then((requests) => res.json(requests))
      .catch((err) => res.status(500).json(err));
  }
}

module.exports = NoteRouterMyPage;
