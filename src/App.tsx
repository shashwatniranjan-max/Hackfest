import { useState } from 'react'
import { Activity, AudioLines, Bell, Camera, Check, CheckCheck, ChevronDown, CircleHelp, Clock3, Command, Copy, Info, MessageCircle, Mic, MicOff, MoreHorizontal, Paperclip, PhoneOff, Play, RotateCcw, Send, Settings2, Sparkles, Subtitles, ThumbsDown, ThumbsUp, Users, Video, VideoOff, Volume2, X } from 'lucide-react'

type Message = { text: string; time: string; mine?: boolean }

const messages: Message[] = [
  { text: 'Hey Maya! I can see you clearly.', time: '10:42 AM', mine: true },
  { text: 'Great! I’m ready to practice.', time: '10:42 AM' },
  { text: 'Your signing looks really clear today.', time: '10:43 AM', mine: true },
  { text: 'Thank you! I’m working on my speed.', time: '10:43 AM' },
]

function App() {
  const [screen, setScreen] = useState<'landing' | 'call'>('call')
  const [camera, setCamera] = useState(true)
  const [mic, setMic] = useState(true)
  const [captions, setCaptions] = useState(true)
  const [recognition, setRecognition] = useState(true)
  const [tts, setTts] = useState(false)
  const [tab, setTab] = useState<'chat' | 'history'>('chat')
  const [sent, setSent] = useState('')
  const [chat, setChat] = useState(messages)
  const [ended, setEnded] = useState(false)

  if (screen === 'landing') return <Landing onStart={() => setScreen('call')} />

  return <div className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={() => setScreen('landing')} aria-label="Go to home"><span className="brand-mark"><Sparkles size={16} /></span><span>sign<span className="brand-accent">bridge</span></span></button>
      <div className="call-meta"><span className="live-dot" /> <span>Live call</span><span className="meta-separator" /> <span className="muted">Room</span><code>SB-2841</code><button className="icon-button tiny" aria-label="Copy room code"><Copy size={14} /></button></div>
      <div className="top-actions"><span className="demo-pill"><span className="pulse" /> DEMO MODE</span><button className="icon-button" aria-label="Notifications"><Bell size={17} /></button><button className="icon-button" aria-label="Settings"><Settings2 size={17} /></button><div className="avatar avatar-you">JD</div></div>
    </header>

    <main className="workspace">
      <section className="video-column">
        <div className="section-heading"><div><p className="eyebrow">VIDEO WORKSPACE</p><h1>Practice room <span className="live-badge">● LIVE</span></h1></div><div className="participant-count"><Users size={15} /> 2 participants</div></div>
        <div className="video-stage">
          <div className="video-main"><div className="video-grid" /><div className="remote-person"><div className="person-avatar">MC</div><strong>Maya Chen</strong><span>Camera connected</span></div><div className="video-label"><span className="status-bar" /><span>Maya Chen</span><span className="speaking">Speaking</span></div>{captions && <div className="caption-overlay"><span className="caption-label"><Subtitles size={13} /> LIVE CAPTION</span><p>“Your signing looks really clear today.”</p></div>}<div className="quality-chip"><Activity size={13} /> Excellent connection</div></div>
          <div className="self-preview"><div className="self-video"><div className="self-grid" /><div className="self-avatar">JD</div>{!camera && <div className="camera-off"><VideoOff size={19} /><span>Camera off</span></div>}<span className="self-label">You <span className="mic-status"><Mic size={11} /></span></span></div></div>
        </div>
        <div className="controls"><ControlButton active={mic} onClick={() => setMic(!mic)} icon={mic ? <Mic /> : <MicOff />} label={mic ? 'Mute' : 'Unmute'} /><ControlButton active={camera} onClick={() => setCamera(!camera)} icon={camera ? <Video /> : <VideoOff />} label={camera ? 'Camera' : 'Camera'} /><ControlButton active={captions} onClick={() => setCaptions(!captions)} icon={<Subtitles />} label="Captions" /><ControlButton active={recognition} onClick={() => setRecognition(!recognition)} icon={<Activity />} label="Recognition" /><ControlButton active={tts} onClick={() => setTts(!tts)} icon={<Volume2 />} label="Text to speech" /><button className="end-call" onClick={() => setEnded(true)}><PhoneOff size={18} /> End call</button><button className="icon-button control-more" aria-label="More call options"><MoreHorizontal size={19} /></button></div>
        <div className="privacy-note"><Info size={14} /> Your camera and recognition data stay private in this demo.</div>
      </section>

      <aside className="right-column">
        <RecognitionPanel active={recognition} />
        <div className="communication-card"><div className="tabs"><button className={tab === 'chat' ? 'tab active' : 'tab'} onClick={() => setTab('chat')}><MessageCircle size={15} /> Chat <span className="count">4</span></button><button className={tab === 'history' ? 'tab active' : 'tab'} onClick={() => setTab('history')}><Clock3 size={15} /> Recognition history</button></div>{tab === 'chat' ? <><div className="messages">{chat.map((message, index) => <div className={message.mine ? 'message-row mine' : 'message-row'} key={index}><div className={message.mine ? 'message-bubble mine-bubble' : 'message-bubble'}>{message.text}<div className="message-footer"><span>{message.time}</span>{message.mine && <CheckCheck size={13} />}{!message.mine && <button className="speak-button" aria-label="Speak message"><Volume2 size={13} /></button>}</div></div></div>)}</div><form className="message-form" onSubmit={(e) => { e.preventDefault(); if (sent.trim()) { setChat([...chat, { text: sent.trim(), time: 'Now', mine: true }]); setSent('') }}}><button type="button" className="attach" aria-label="Attach file"><Paperclip size={17} /></button><input value={sent} onChange={(e) => setSent(e.target.value)} placeholder="Type a message..." aria-label="Message" /><button className="send" aria-label="Send message"><Send size={16} /></button></form></> : <History />}</div>
      </aside>
    </main>
    {ended && <div className="modal-backdrop"><div className="confirm-modal"><button className="modal-close" onClick={() => setEnded(false)} aria-label="Close"><X /></button><div className="modal-icon"><PhoneOff size={21} /></div><h2>End this call?</h2><p>You’ll leave the practice room and return to the home screen.</p><div className="modal-actions"><button className="secondary-button" onClick={() => setEnded(false)}>Stay in call</button><button className="danger-button" onClick={() => { setEnded(false); setScreen('landing') }}>End call</button></div></div></div>}
  </div>
}

function Landing({ onStart }: { onStart: () => void }) { return <div className="landing"><div className="landing-orb orb-one" /><div className="landing-orb orb-two" /><header className="landing-nav"><div className="brand"><span className="brand-mark"><Sparkles size={16} /></span><span>sign<span className="brand-accent">bridge</span></span></div><span className="demo-pill"><span className="pulse" /> DEMO MODE</span></header><main className="hero"><div className="hero-kicker"><span /> REAL-TIME COMMUNICATION, REIMAGINED</div><h1>Meet in the<br /><em>same language.</em></h1><p>SignBridge brings sign language recognition, live captions, and conversation together in one thoughtful communication space.</p><button className="start-button" onClick={onStart}>Start a call <Play size={16} fill="currentColor" /></button><div className="hero-note"><div className="mini-avatars"><span>MC</span><span>JD</span><span>+</span></div><span>Designed for clearer conversations</span></div></main><footer className="landing-footer"><span><Sparkles size={14} /> A private, accessible workspace</span><span>Frontend demo · Recognition is simulated</span></footer></div> }

function ControlButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) { return <button className={active ? 'control-button active' : 'control-button'} onClick={onClick} aria-pressed={active}>{icon}<span>{label}</span></button> }

function RecognitionPanel({ active }: { active: boolean }) { return <div className="recognition-card"><div className="card-header"><div><p className="eyebrow">SIGN RECOGNITION</p><h2><span className={active ? 'tracking-indicator' : 'off-indicator'} />{active ? 'Tracking signs' : 'Recognition paused'}</h2></div><span className="demo-tag">DEMO</span></div>{active ? <><div className="prediction"><div className="prediction-top"><span className="label">LATEST PREDICTION</span><span className="prediction-time">just now</span></div><div className="prediction-phrase">“Thank you”</div><div className="confidence"><div className="confidence-label"><span>Confidence</span><strong>94%</strong></div><div className="progress"><span style={{ width: '94%' }} /></div></div><div className="prediction-actions"><button className="confirm"><Check size={15} /> Confirm</button><button aria-label="Correct prediction"><RotateCcw size={15} /></button><button aria-label="Dismiss prediction"><ThumbsDown size={15} /></button></div></div><div className="recognition-footer"><span>Recent predictions</span><button>View all <ChevronDown size={14} /></button></div><div className="recent-list"><div><span className="recent-phrase">Good morning</span><span className="recent-confidence">88%</span></div><div><span className="recent-phrase">Nice to meet you</span><span className="recent-confidence">91%</span></div></div></> : <div className="paused-state"><Activity size={22} /><p>Turn on recognition to translate signs in real time.</p></div>}</div> }

function History() { return <div className="history-list"><div className="history-item"><span className="history-time">10:43:12</span><span>Thank you</span><b>94%</b></div><div className="history-item"><span className="history-time">10:42:58</span><span>Good morning</span><b>88%</b></div><div className="history-item"><span className="history-time">10:42:31</span><span>Nice to meet you</span><b>91%</b></div><div className="history-note"><Info size={14} /> Demo predictions are not generated by a live model.</div></div> }

export default App
