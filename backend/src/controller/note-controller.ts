import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { OperationalError } from "../utils/errors/operationalError";
import { CustomRequest } from "../middleware/authMiddleware";

const prisma = new PrismaClient();

/**
 * @description get All Notes
 * @route GET /api/notes
 * @access Public
 * @param req 
 * @param res 
 * @param next 
 * 
 */

const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await prisma.note.findMany();
    res.send(notes);
  } catch (error) {
    const message = error instanceof Error ? error.message : " ";
    next(new OperationalError("Failed to retrieve notes " + message, 402));
  }
};
/**
 * @desc   get note By ID
 * @route  GET /api/notes
 * @access Public
 * @param req 
 * @param res 
 * @param next 
 */

const getNoteById: RequestHandler = async (req, res, next) => {
  const { id: noteID } = req.params;
  try {
    const noteById = await prisma.note.findUniqueOrThrow({
      where: { id: noteID },
    });
    res.status(200).send(noteById);
  } catch (error) {
    const message = error instanceof Error ? error.message : " ";
    next(new OperationalError("Failed to retrieve notes " + message, 404));
  }
};



/**
 * @desc   Create note
 * @route  POST /api/notes 
 * @access Private
 * @param req 
 * @param res 
 * @param next 
 */

const createNote: RequestHandler = async (req, res, next) => {
  const { title, text } = req.body;
  const userId = ((req as CustomRequest)?.user as { id: string })?.id;
  try {
    const createdNote = await prisma.note.create({
      data: { title, text, userId},
    });
    res.status(201).send(createdNote);
  } catch (error) {
    const message = error instanceof Error ? error.message : " ";
    next(new OperationalError("Failed to Create Note " + message, 400));
  }
};

/**
 * @desc   update note
 * @route  PUT /api/notes/:id
 * @access Private
 * @param req 
 * @param res 
 * @param next 
 */

const updateNote: RequestHandler = async (req, res, next) => {
  const { id: noteID } = req.params;
  const { title, text } = req.body;
  try {
    const updatedNote = await prisma.note.update({
      where: { id: noteID },
      data: { title, text },
    });
    res.status(201).send(updatedNote);
  } catch (error) {
    const message = error instanceof Error ? error.message : " ";
    next(new OperationalError("Failed to Update Note " + message, 400));
  }
};

/**
 * @desc   Delete note
 * @route  Delete /api/notes/:id
 * @access Private
 * @param req 
 * @param res 
 * @param next 
 */

const deleteNote: RequestHandler = async (req, res, next) => {
  const { id: noteID } = req.params;
  try {
    const deletedNote = await prisma.note.delete({
      where: { id: noteID },
    });
    res.status(203).send(deletedNote);
  } catch (error) {
    const message = error instanceof Error ? error.message : " ";
    next(new OperationalError("Failed to Delete Note " + message, 400));
  }
};

/**
 * @description get My Notes
 * @route GET /api/notes/mine
 * @access Private
 * @param req 
 * @param res 
 * @param next 
 * @returns Promise<Response>
 */
const getMyNotes: RequestHandler = async (req, res, next) => {
  const userId = ((req as CustomRequest)?.user as { id: string })?.id;
  try {
    // alternative way to get notes
    // await prisma.user.findUnique({ where: { id: userId } }).notes();
    const notes = await prisma.note.findMany({
      where: { userId },
    });
    res.send(notes);
  } catch (error) {
    const message = error instanceof Error ? error.message : " ";
    next(new OperationalError("Failed to retrieve notes " + message, 402));
  }
};

export {
   getNotes,
   getNoteById,
   createNote,
   updateNote,
   deleteNote,
  getMyNotes
};
