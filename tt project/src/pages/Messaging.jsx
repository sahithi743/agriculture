import { useState, useEffect } from 'react'
import Header from '../components/Header'
import api from '../utils/api'
import './Messaging.css'

export default function Messaging() {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      const response = await api.get('/messages/conversations')
      setConversations(response.data.conversations || [])
    } catch (error) {
      console.log('[v0] Failed to fetch conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation)
    try {
      const response = await api.get(`/messages/conversation/${conversation.id}`)
      setMessages(response.data.messages || [])
    } catch (error) {
      console.log('[v0] Failed to fetch messages:', error)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    try {
      await api.post('/messages', {
        receiver_id: selectedConversation.other_user_id,
        message: newMessage
      })
      setNewMessage('')
      handleSelectConversation(selectedConversation)
    } catch (error) {
      console.log('[v0] Failed to send message:', error)
    }
  }

  return (
    <div className="messaging-page">
      <Header />
      
      <div className="messaging-container">
        <h1>Messages</h1>

        <div className="messaging-layout">
          <div className="conversations-panel">
            <h2>Conversations</h2>
            {loading ? (
              <p className="loading">Loading...</p>
            ) : conversations.length === 0 ? (
              <p className="empty">No conversations yet</p>
            ) : (
              <div className="conversations-list">
                {conversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className="conversation-header">
                      <h3>{conversation.other_user_name}</h3>
                      <span className="time">{new Date(conversation.last_message_time).toLocaleDateString()}</span>
                    </div>
                    <p className="last-message">{conversation.last_message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="chat-panel">
            {!selectedConversation ? (
              <div className="no-conversation">
                <p>Select a conversation to start messaging</p>
              </div>
            ) : (
              <>
                <div className="chat-header">
                  <h2>{selectedConversation.other_user_name}</h2>
                </div>

                <div className="messages-container">
                  {messages.length === 0 ? (
                    <p className="empty">No messages yet</p>
                  ) : (
                    messages.map(msg => (
                      <div key={msg.id} className={`message ${msg.sender_id === msg.current_user_id ? 'sent' : 'received'}`}>
                        <div className="message-content">
                          <p>{msg.text}</p>
                          <span className="timestamp">{new Date(msg.created_at).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="message-input-form">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    disabled={!selectedConversation}
                  />
                  <button type="submit" disabled={!newMessage.trim()}>
                    Send
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
