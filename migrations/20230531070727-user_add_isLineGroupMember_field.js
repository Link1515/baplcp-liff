module.exports = {
  async up(db, client) {
    await db
      .collection('User')
      .updateMany({}, { $set: { isLineGroupMember: false } })
  },

  async down(db, client) {
    await db
      .collection('User')
      .updateMany({}, { $unset: { isLineGroupMember: '' } })
  },
}
