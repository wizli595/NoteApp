import { Router } from "express";
import * as NoteController from "../controller/note-controller";
import { validateNote } from "../middleware/validate-note";
const route = Router();

route
  .route("/")
  .get(NoteController.getNotes)
  .post(validateNote, NoteController.createNote);

route
  .route("/:id")
  .get(NoteController.getNoteById)
  .put(NoteController.updateNote)
  .delete(NoteController.deleteNote);

export default route;
