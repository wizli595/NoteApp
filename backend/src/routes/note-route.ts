import { Router } from "express";
import * as NoteController from "../controller/note-controller";
import { validateNote } from "../middleware/validate-note";
import { protect } from "../middleware/authMiddleware";
const route = Router();

route
  .route("/")
  .get(NoteController.getNotes)
  .post(validateNote, NoteController.createNote);

route.route("/mine").get(protect,NoteController.getMyNotes);

route
  .route("/:id")
  .get(NoteController.getNoteById)
  .put(NoteController.updateNote)
  .delete(NoteController.deleteNote);


export default route;
