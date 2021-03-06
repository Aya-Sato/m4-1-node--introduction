const messageInput = document.querySelector('#user-input');
const conversationElem = document.querySelector('#conversation-container');

const handleFocus = () => {
  messageInput.focus();
};

const updateConversation = (message) => {
  const { author, text } = message;
  const messageElem = document.createElement('p');

  messageElem.classList.add('message', author);
  messageElem.innerHTML = `<span>${text}</span>`;
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;

  if (author === 'user') messageInput.value = '';
  handleFocus();
};

const sendMessage = (event) => {
  event.preventDefault();

  const message = { author: 'user', text: messageInput.value };
  updateConversation(message);

  fetch(`/bot-message/?usertext=${message.text}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateConversation(data.message);
    });
};

handleFocus();
