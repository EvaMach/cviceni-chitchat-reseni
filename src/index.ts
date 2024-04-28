import './styles.css';
import { Channels, Messages, ThreadMessages } from './data-model';

const IMAGE_PATH = "http://localhost:4000/assets/users/"

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const currentChannel = urlParams.get('channel') || 0;
const currentMessage = urlParams.get('message') || 0;

const channelsResponse = await fetch('http://localhost:4000/api/channels');
const channelsJson = await channelsResponse.json()
const channels = channelsJson.data as Channels;

const messagesResponse = await fetch(`http://localhost:4000/api/messages?filter=channelId:eq:${currentChannel}`);
const messagesJson = await messagesResponse.json()
const messages = messagesJson.data as Messages;

const threadResponse = await fetch(`http://localhost:4000/api/thread-messages?filter=parentId:eq:${currentMessage}`);
const threadsJson = await threadResponse.json()
const threads = threadsJson.data as ThreadMessages;

const channelsContainer = document.querySelector('.channels');
if (channelsContainer !== null) {
  channels.forEach((channel) => {
    const channelLink =
      `<a class="channel ${channel.id === Number(currentChannel) ? 'active' : ''}" href="?channel=${channel.id}">
        <h3 class="channel-name">${channel.name}</h3>
        <p class="channel-meta">${channel.members} members</p>
      </a>`;
    channelsContainer.innerHTML += channelLink;
  });
}

const messagesContainer = document.querySelector('.messages');
if (messagesContainer !== null) {
  messages.forEach((message) => {
    const messageElement = `
      <div class="message ${message.id === Number(currentMessage) ? 'active' : ''}">
        <img class="message-avatar" src="${IMAGE_PATH}${message.user.avatarFilename}" alt=${message.user.avatarFilename} />
        <div class="message-content">
          <div class="message-head">
            <div class="message-user">${message.user.name} - ${message.user.role}</div>
            <div class="message-time">${message.time}</div>
          </div>
          <div class="message-text">${message.content}</div>
          <a href="?channel=${currentChannel}&message=${message.id}" class="message-thread-link">${message.threadMessages} messages in thread</a>
        </div>
      </div>`;
    messagesContainer.innerHTML += messageElement;
  });
}

const threadContainer = document.querySelector('.thread');
if (threadContainer !== null) {
  const parentMessage = messages.find((message) => message.id === Number(urlParams.get('message')));

  if (parentMessage !== undefined) {
    const parentThread = `
      <div class="message">
        <img class="message-avatar" src="${IMAGE_PATH}${parentMessage.user.avatarFilename}" alt=${parentMessage.user.avatarFilename} />
        <div class="message-content">
          <div class="message-head">
            <div class="message-user">${parentMessage.user.name} - ${parentMessage.user.role}</div>
            <div class="message-time">${parentMessage.time}</div>
          </div>
          <div class="message-text">${parentMessage.content}</div>
        </div>
      </div>`;
    threadContainer.innerHTML += parentThread;

    threads.forEach((thread) => {
      const threadMessage = `
        <div class="thread-messages">
          <div class="message thread-message">
            <img class="message-avatar" src="${IMAGE_PATH}${thread.user.avatarFilename}" alt="${thread.user.avatarFilename}" />
            <div class="message-content">
              <div class="message-head">
                <div class="message-user">${thread.user.name} - ${thread.user.role}</div>
                <div class="message-time">${thread.time}</div>
              </div>
              <div class="message-text">${thread.content}</div>
            </div>
          </div>
        </div>`;
      threadContainer.innerHTML += threadMessage;
    });
  }
}
