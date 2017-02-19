angular.module('myNotes.noteStore', [])
  .factory('NoteStore', function () {

    var notes = angular.fromJson(window.localStorage['notes'] || '[]');

    function persist() {
      window.localStorage['notes'] = angular.toJson(notes);
    }

    return {
      list: function () {
        return notes;
      },
      get: function (noteId) {
        return notes.find(function (note) {
          return note.id === noteId;
        });
      },
      create: function (note) {
        notes.push(note);
        persist();
      },
      update: function (someNote) {
        var noteToUpdate = notes.find(function (note) {
          return note.id === someNote.id;
        });

        if (noteToUpdate) {
          var noteIndex = notes.indexOf(noteToUpdate);
          notes[noteIndex] = someNote;
          persist();
        }
      },
      move: function (note, fromIndex, toIndex) {
        notes.splice(fromIndex, 1);
        notes.splice(toIndex, 0, note);
        persist();
      },
      remove: function (noteId) {
        var itemToRemove = notes.find(function (note) {
          return note.id === noteId;
        });
        var indexOfNote = notes.indexOf(itemToRemove);
        notes.splice(indexOfNote, 1);
        persist();
      }
    };
  });
