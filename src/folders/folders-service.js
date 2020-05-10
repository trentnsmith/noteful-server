const FoldersService = {
    getAllFolders(db) {
        return db
            .select('*')
            .from('noteful_folders');
    },

    getById(db, id) {
        return db
            .select('*')
            .from('noteful_folders')
            .where('id', id)
            .first();
    },

    deleteFolder(db, id) {
        return db
            .select('*')
            .from('noteful_folders')
            .where('id', id)
            .delete();
    },

    updateFolder(db, id, updateFields) {
        return db
            .select('*')
            .from('noteful_folders')
            .where('id', id)
            .update(updateFields);
    },

    createFolder(db, folder) {
        return db
            .insert(folder)
            .into('noteful_folders')
            .returning('*')
            .then((rows) => {
                return rows[0]
            });
    },
}

module.exports = FoldersService