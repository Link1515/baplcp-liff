module.exports = {
  async up(db, client) {
    await db.collection('User').updateMany({}, { $set: { isChecked: false } })
  },

  async down(db, client) {
    await db.collection('User').updateMany({}, { $unset: { isChecked: '' } })
  },
}
