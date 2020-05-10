const path = require('path');
const express = require('express');
const NotesService = require('./notes-service');
const notesRouter = express.Router();
const jsonParser = express.json();

notesRouter
    .route('/')
    .get((req, res, next) => {
        NotesService.getAllNotes(req.app.get('db'))
            .then(note => {
                res.json(note)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { note_name, content, folder_id } = req.body
        const newNote = { note_name, content, folder_id }

        for (const [key, value] of Object.entries(newNote)) {
            if (!value) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body`}
                })
            }
        }

        NotesService.insertNote(
            req.app.get('db'),
            newNote
        )
        .then(note => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${note.id}`))
                .json(note)
        })
        .catch(next)
    })


notesRouter
    .route('/:note_id')
    .all((req, res , next) => {
        NotesService.getById(
            req.app.get('db'),
            req.params.note_id
        )
        .then(note => {
            if (!note) {
                return res.status(404).json({
                    error: { message: `Note doesn't exist` }
                })
            }
            res.note = note
            next()
        })
    })
    .get((res, res, next) => {
        res.json(res.note)
    })    