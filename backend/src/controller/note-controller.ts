import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { OperationalError } from "../utils/errors/operationalError";

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
  try {
    const createdNote = await prisma.note.create({
      data: { title, text, userId: "6604d98a618e3af983e0f36c" },
    });
    res.status(201).send(createdNote);
  } catch (error) {
    const message = error instanceof Error ? error.message : " ";
    next(new OperationalError("Failed to Create Note " + message, 400));
  }
};

/**
 * @desc   Create note
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
 * @desc   Create note
 * @route  PUT /api/notes/:id
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

export {
   getNotes,
   getNoteById,
   createNote,
   updateNote,
   deleteNote
};
