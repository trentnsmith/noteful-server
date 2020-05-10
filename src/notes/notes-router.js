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