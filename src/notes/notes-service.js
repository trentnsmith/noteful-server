const NotesService = {
    getAllNotes(db) {
        return db
            .select('*')
            .from('noteful_notes');
    },

    getById(db, id) {
        return db
            .select('*')
            .from('noteful_notes')
            .where('id', id)
            .first();
    },

    deleteFolder(db, id) {
        return db
            .select('*')
            .from('noteful_notes')
            .where('id', id)
            .delete();
    },

    updateFolder(db, id, updateFields) {
        return db
            .select('*')
            .from('noteful_notes')
            .where('id', id)
            .update(updateFields);
    },

    createFolder(db, note) {
        return db
            .insert(note)
            .into('noteful_notes')
            .returning('*')
            .then((rows) => {
                return rows[0]
            });
    },
}

module.exports = NotesService