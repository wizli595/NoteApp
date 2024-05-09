import { Router } from "express";
import * as NoteController from "../controller/note-controller";
import { validateNote } from "../middleware/validate-note";
import { protect } from "../middleware/authMiddleware";
import { validateSession } from "../middleware/validate-session";
const route = Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Note management and retrieval
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: A list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/prisma/schema.prisma'
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../prisma/schemas/Note'
 *     responses:
 *       201:
 *         description: The created note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../prisma/schemas/Note'
 *       400:
 *         description: Validation error
 */
route
  .route("/")
  .get(NoteController.getNotes)
  .post(protect, validateNote, NoteController.createNote);

route.route("/mine").get(validateSession,protect, NoteController.getMyNotes);

route
  .route("/:id")
  .get(NoteController.getNoteById)
  .put(protect, validateNote, NoteController.updateNote)
  .delete(protect, NoteController.deleteNote);

export default route;
