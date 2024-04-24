import axios from "axios";
import { Note } from "@prisma/client";

/**
 * @description Fetch All Notes
 * @endpoint  /api/notes
 * @return Promise<Note[]>
 */

const getAllNotes = async (): Promise<Note[]> => {
  try {
    const response = await axios.get<Note[]>("/api/notes");
    const notes = response.data;
    return notes;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * @description Get Note By Id
 * @endpoint /api/notes/:id
 * @requires id
 * @return Promise<Note>
 */
const getNoteById = async (id: string): Promise<Note> => {
  try {
    const response = await axios.get<Note>("/api/notes/" + id);
    const note = response.data;
    return note;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { getAllNotes, getNoteById };
