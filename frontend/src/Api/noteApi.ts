import axios from "axios";
import { Note } from "@prisma/client";
export type NoteData   = {
  title: string;
  text: string;

};

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

/**
 * @description Fetch My Notes
 * @endpoint /api/notes/mine
 * @return Promise<Note[]>
 */

const getMyNotes = async (): Promise<Note[]> => {
  try {
    const response = await axios.get<Note[]>("/api/notes/mine");
    const notes = response.data;
    return notes;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
/**
 * @description Create Note
 * @endpoint /api/notes
 * @param Note
 * @return Promise<Note>
*/
const createNote = async (noteData: NoteData): Promise<Note> => {
  try {
    const response = await axios.post<Note>("/api/notes", noteData);
    const note = response.data;
    return note;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
type editNote = {
  id: string;
  noteData: NoteData;

};
/**
 * @description Update Note
 * @endpoint /api/notes/:id
 * @param id
 * @param NoteData
 * @return Promise<Note>
 */

const updateNote = async ({id, noteData}:editNote): Promise<Note> => {
  try {
    const response = await axios.put<Note>("/api/notes/"+id, noteData);
    const note = response.data;
    return note;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * @description Delete Note
 * @endpoint /api/notes/:id
 * @param id
 * @return Promise<Note>
 */
const deleteNote = async (id: string): Promise<Note> => {
  try {
    const response = await axios.delete<Note>("/api/notes/" + id);
    const note = response.data;
    return note;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export { getAllNotes, getNoteById, getMyNotes, createNote, updateNote ,deleteNote};
