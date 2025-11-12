import React, { useEffect, useRef, useState } from 'react';
import './style.css';

const roomDescriptions = {
  '🎓 Exam Stress Support': 'Share worries about exams and get encouragement.',
  '🌙 Sleep & Relaxation': 'Discuss sleep problems and calming techniques.',
  '⚖ Work-Life Balance': 'Talk about managing studies, work, and personal life.',
  '💚 Anxiety Relief': 'A safe space to talk about anxiety and coping strategies.'
};

function formatTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MindEaseChatroom() {
  const [nickname, setNickname] = useState('Guest');
  const [view, setView] = useState('featured'); // 'featured' | 'support' | 'account' | 'chat'
  const [currentRoom, setCurrentRoom] = useState('');
  const [messagesMap, setMessagesMap] = useState({}); // { roomName: [ {user, text, time}, ... ] }
  const [input, setInput] = useState('');
  const [fullscreen, setFullscreen] = useState(false);

  const messagesEndRef = useRef(null);

  // Load saved nickname & messages from localStorage once
  useEffect(() => {
    try {
      const savedName = localStorage.getItem('mindease_nickname');
      if (savedName) setNickname(savedName);

      const saved = localStorage.getItem('mindease_messages_map');
      if (saved) setMessagesMap(JSON.parse(saved));
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
  }, []);

  // Persist messages and nickname when they change
  useEffect(() => {
    try {
      localStorage.setItem('mindease_messages_map', JSON.stringify(messagesMap));
    } catch (e) {
      console.warn('Could not save messages to localStorage', e);
    }
  }, [messagesMap]);

  useEffect(() => {
    try {
      localStorage.setItem('mindease_nickname', nickname);
    } catch (e) {
      console.warn('Could not save nickname to localStorage', e);
    }
  }, [nickname]);

  // Scroll to bottom when messages or room changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesMap, currentRoom]);

  function openChat(room) {
    setCurrentRoom(room);
    setView('chat');

    // If room has no messages, add a system welcome
    setMessagesMap((prev) => {
      if (prev[room] && prev[room].length > 0) return prev;
      const welcome = {
        user: 'System',
        text: `Welcome ${nickname} to ${room}`,
        time: new Date().toISOString()
      };
      return { ...prev, [room]: [welcome] };
    });
  }

  function handleSend() {
    const text = input.trim();
    if (!text || !currentRoom) return;

    const newMsg = { user: nickname, text, time: new Date().toISOString() };
    setMessagesMap((prev) => {
      const roomMsgs = prev[currentRoom] ? [...prev[currentRoom]] : [];
      return { ...prev, [currentRoom]: [...roomMsgs, newMsg] };
    });
    setInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }

  // UI for the left pane depending on view
  function renderLeftPane() {
    if (view === 'support') {
      return (
        <>
          <h2>1:1 Support</h2>
          <p>Private chats with a peer or mentor will appear here.</p>
        </>
      );
    }

    if (view === 'account') {
      return (
        <>
          <h2>Your Account</h2>
          <p>
            Nickname: <strong>{nickname}</strong>
          </p>
          <div style={{ marginTop: 8 }}>
            <label style={{ fontSize: 13 }}>Change nickname</label>
            <input
              style={{ display: 'block', width: '100%', marginTop: 6, padding: 8, borderRadius: 6, border: '1px solid #cce3d5' }}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter nickname"
            />
          </div>
          <p style={{ marginTop: 8 }}>[Profile Picture: upload option coming soon]</p>
        </>
      );
    }

    // Default: Featured
    return (
      <>
        <h2>Featured Rooms</h2>
        {Object.keys(roomDescriptions).map((room) => (
          <div
            key={room}
            className="room-card"
            onClick={() => openChat(room)}
            style={{ userSelect: 'none' }}
          >
            {room}
          </div>
        ))}
      </>
    );
  }

  const currentMessages = currentRoom && messagesMap[currentRoom] ? messagesMap[currentRoom] : [];

  return (
    <div className="">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">🌿 MindEase</div>
        <nav>
          <button onClick={() => { setView('featured'); setCurrentRoom(''); }}>Community Rooms</button>
          <button onClick={() => { setView('support'); setCurrentRoom(''); }}>1:1 Support</button>
          <button onClick={() => { setView('account'); setCurrentRoom(''); }}>Account</button>
        </nav>
      </header>

      {/* Main layout */}
      <div className="main">
        {/* Left side */}
        <section className="rooms" id="roomSection">
          {renderLeftPane()}
        </section>

        {/* Right side: Chat */}
        <section className={`chat ${fullscreen ? 'fullscreen' : ''}`} id="chatSection">
          {!currentRoom ? (
            <div className="chat-placeholder" id="chatPlaceholder">
              <p>Select a room to start chatting</p>
            </div>
          ) : (
            <div className="chat-window" id="chatWindow">
              <div className="chat-header">
                <div>
                  <h2 id="chatRoomName">{currentRoom}</h2>
                  <p id="chatRoomDesc">{roomDescriptions[currentRoom] || ''}</p>
                </div>
                <div>
                  <button id="fullscreenBtn" onClick={() => setFullscreen((s) => !s)}>⛶</button>
                </div>
              </div>

              <div className="messages" id="messages">
                {currentMessages.map((m, i) => (
                  <div
                    key={i}
                    className={`bubble ${m.user === nickname ? 'user' : m.user === 'System' ? 'other' : 'other'}`}
                  >
                    <div style={{ fontSize: 13, marginBottom: 4, opacity: 0.9 }}>
                      {m.user === 'System' ? 'System' : m.user} {m.time ? `· ${formatTime(m.time)}` : ''}
                    </div>
                    <div>{m.text}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="input-box">
                <input
                  type="text"
                  id="msgInput"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button id="sendBtn" onClick={handleSend}>➤</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
