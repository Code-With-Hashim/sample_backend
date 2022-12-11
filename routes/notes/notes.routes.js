const express = require('express')

const { notesModals } = require("../../modals/notes/notes.modals")
const { authenticate } = require("../../middlewares/authenticate")

const NotesRoutes = express.Router()
NotesRoutes.use(authenticate)


NotesRoutes.get("/", async (req, res) => {

    const { UserID } = req.body

    try {

        const Notes = await notesModals.find({ UserID })
        res.send(Notes)

    } catch (error) {
        res.status(404).send({
            msg: 'Something went worng, please try again'
        })
    }
})

NotesRoutes.post("/create", async (req, res) => {
    const payload = req.body

    try {

        const Notes = new notesModals(payload)
        await Notes.save()
        res.send({
            msg: 'Notes create Successfully'
        })

    } catch (error) {
        res.status(404).send({
            msg: 'Something went worng, please try again'
        })
    }
})

NotesRoutes.patch("/:NoteId", async (req, res) => {
    const { NoteId } = req.params
    const UpdateNotes = req.body
    const UserID = req.body.UserID

    try {

        const Notes = await notesModals.findById({ _id: NoteId })

        if (UserID !== Notes.UserID) {
            res.send({
                msg: 'Not Authorised'
            })
        } else {
            await notesModals.findByIdAndUpdate({ _id: NoteId }, UpdateNotes)
            res.send({
                msg: 'Notes Update Successfully'
            })
        }

    } catch (error) {
        res.status(404).send({
            msg: 'Something went worng, please try again'
        })
    }
})


NotesRoutes.delete("/:NoteId", async (req, res) => {
    const { NoteId } = req.params
    const UserID = req.body.UserID

    try {

        const Notes = await notesModals.findById({ _id: NoteId })

        if (UserID !== Notes.UserID) {
            res.send({
                msg : 'Not Authorised'
            })
        } else {
            await notesModals.findByIdAndDelete({ _id: NoteId })
            res.send({
                msg: 'Notes Delete Successfully'
            })
        }

    } catch (error) {
        res.status(404).send({
            msg: 'Something went worng, please try again'
        })
    }
})

module.exports = { NotesRoutes }