$(document).ready(() => {
  const socket = io.connect();

  // Keep track of the current user
  let currentUser;

  $('#create-user-btn').click((e) => {
    e.preventDefault();
    if ($('#username-input').val().length > 0) {
      socket.emit('new user', $('#username-input').val());
      currentUser = $('#username-input').val();
      $('.username-form').remove();
      $('.main-container').css('display', 'flex');
    }
  });

  $('#send-chat-btn').click((e) => {
    e.preventDefault();
    let message = $('#chat-input').val();
    if (message.length > 0) {
      socket.emit('new message', {
        sender: currentUser,
        message: message,
      });
      $('#chat-input').val("");
    }
  });

  // Socket listeners
  socket.on('new user', (username) => {
    console.log(`${username} has joined the chat`);
    $('.users-online').append(`<div class="user-online">${username}</div>`);
  });

  socket.on('new message', (data) => {
    $('.message-container').append(`
      <div class="message">
        <p class="message-user">${data.sender}: </p>
        <p class="message-text">${data.message}</p>
      </div>
    `);
  });
});