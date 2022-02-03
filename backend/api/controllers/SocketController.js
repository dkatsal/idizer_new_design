/**
 * SocketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 *
 * @EXAMPLE:
 * Use the following to send even via socket (take socketToken from user model)
 * const event = 'notify'; sails.sockets.broadcast(socketToken, event, {data: {"some_data"}});
 */

module.exports = {
  connect: function (req, res) {
    if (!req.isSocket) {
      return res.badRequest({
        message: TranslateService.__('Incorrect protocol type. This endpoint can be used only via socket.'),
        data: {}
      });
    }
    // if (_.includes(Object.keys(sails.io.sockets.clients().connected),sails.sockets.getId(req))){
    //   return res.badRequest({message: TranslateService.__('Socket already registred'), data: {}});
    // }
    const roomName = req.param('socketToken');
    sails.sockets.join(req, roomName, (err) => {
      if (err) {
        return res.serverError({message: TranslateService.__('Cannot join to this room.'), data: {error: err}});
      }

      return res.json({message: TranslateService.__('Joined to this room.'), data: {roomName: roomName}});
    });

  }
};

