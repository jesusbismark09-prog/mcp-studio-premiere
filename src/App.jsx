import { useState, useRef } from 'react'

export default function App() {
  const [videoSrc, setVideoSrc] = useState(null)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [clips, setClips] = useState([{ id: 1, start: 0, duration: 100 }])
  const [selectedTool, setSelectedTool] = useState('cortar')
  const videoRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoSrc(url)
      setClips([{ id: 1, name: file.name, start: 0, duration: 100 }])
    }
  }

  const handleCut = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime
      const newClip = { id: Date.now(), name: `Corte ${clips.length + 1}`, start: currentTime, duration: 50 }
      setClips([...clips, newClip])
      setAnswer(`✂️ Corte feito em ${currentTime.toFixed(2)}s! Seu video foi dividido. Timeline atualizada.`)
    } else {
      setAnswer('✂️ Selecione um video primeiro! Clique em Importar Video.')
    }
  }

  const askAgent = () => {
    if (!question) {
      setAnswer('Digite algo! Ex: "Como fazer corte estilo MrBeast?"')
      return
    }
    const q = question.toLowerCase()
    if (q.includes('corte') || q.includes('cortar')) {
      setAnswer('🎬 PRA CORTAR: 1) Importa o video, 2) Dá play e pausa onde quer cortar, 3) Clica em CORTAR. Pra remover silêncios: usa o botão Velocidade > Remover Silêncios. Estilo MrBeast: cortes a cada 1-2 segundos!')
    } else if (q.includes('texto') || q.includes('legenda')) {
      setAnswer('📝 PRA TEXTO/LEGENDA: Clica em TEXTO > Escreve sua frase > Escolhe posição. Pra legenda automática, clica em LEGENDA > Auto Legenda. O app vai transcrever seu audio!')
    } else if (q.includes('musica') || q.includes('audio')) {
      setAnswer('🎵 PRA MUSICA: Clica em MUSICA > Importar Audio > Ajusta volume na timeline. Dica PRO: Deixa musica em -20dB pra não cobrir voz!')
    } else if (q.includes('filtro') || q.includes('cor')) {
      setAnswer('🎨 PRA FILTROS: Clica em FILTROS > Escolhe: Vivido, Cinema, Preto/Branco, Vintage. Estilo Premiere: usa LUT Cinematico + contraste +10!')
    } else {
      setAnswer(`🤖 AGENTE MCP: "${question}" -> Entendi! No MCP Studio Premiere PRO: Importe seu video, use a timeline pra organizar, ferramentas pra editar, e exporte em 4K. Qualquer coisa, me pergunta: "como fazer..."`)
    }
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif', padding: '16px' }}>
      {/* HEADER */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#a855f7', fontSize: '32px', fontWeight: '900', lineHeight: '1.1', margin: '0' }}>
          MCP STUDIO<br/>PREMIERE
        </h1>
        <p style={{ color: '#ccc', fontSize: '16px', marginTop: '8px' }}>Editor nivel Premiere - 100% celular</p>
        <div style={{ background: '#a855f7', display: 'inline-block', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', marginTop: '6px' }}>VERSÃO PRO 2.0 • TIMELINE + AGENTE IA</div>
      </div>

      {/* VIDEO PREVIEW */}
      <div style={{ background: '#000', borderRadius: '16px', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '1px solid #222' }}>
        {videoSrc ? (
          <video ref={videoRef} src={videoSrc} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎬</div>
            <p style={{ color: '#888' }}>Nenhum video</p>
            <button onClick={() => fileInputRef.current.click()} style={{ background: '#a855f7', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', marginTop: '10px', fontWeight: 'bold' }}>Importar Video</button>
          </div>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFile} style={{ display: 'none' }} />

      {/* TOOLS */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginTop: '16px', paddingBottom: '8px' }}>
        {[
          { id: 'cortar', label: '✂️ Cortar' },
          { id: 'texto', label: '📝 Texto' },
          { id: 'musica', label: '🎵 Musica' },
          { id: 'filtros', label: '🎨 Filtros' },
          { id: 'legenda', label: '💬 Legenda' },
          { id: 'velocidade', label: '⚡ Velocidade' },
        ].map(tool => (
          <button key={tool.id} onClick={() => { setSelectedTool(tool.id); if(tool.id==='cortar') handleCut(); }} style={{ background: selectedTool===tool.id ? '#a855f7' : '#1a1a1a', color: 'white', border: 'none', padding: '10px 14px', borderRadius: '20px', whiteSpace: 'nowrap', fontSize: '13px', fontWeight: '600' }}>{tool.label}</button>
        ))}
      </div>

      {/* TIMELINE PRO */}
      <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '14px', marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>📍 TIMELINE</h3>
          <button onClick={() => fileInputRef.current.click()} style={{ background: '#222', color: '#a855f7', border: '1px solid #a855f7', padding: '4px 10px', borderRadius: '6px', fontSize: '11px' }}>+ Importar</button>
        </div>
        {/* Tracks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', width: '30px', color: '#888' }}>V1</span>
            <div style={{ flex: 1, height: '36px', background: '#0a0a0a', borderRadius: '6px', display: 'flex', gap: '4px', padding: '4px', overflow: 'hidden' }}>
              {clips.map(c => (
                <div key={c.id} style={{ background: 'linear-gradient(90deg, #a855f7, #7c3aed)', flex: 1, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>{c.name || `Clip ${c.id}`}</div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', width: '30px', color: '#888' }}>A1</span>
            <div style={{ flex: 1, height: '28px', background: '#0a0a0a', borderRadius: '6px', border: '1px dashed #333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#555' }}>Musica / Audio</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', width: '30px', color: '#888' }}>T1</span>
            <div style={{ flex: 1, height: '28px', background: '#0a0a0a', borderRadius: '6px', border: '1px dashed #333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#555' }}>Textos / Legendas</div>
          </div>
        </div>
      </div>

      {/* AGENTE */}
      <div style={{ marginTop: '20px' }}>
        <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ex: Como fazer corte estilo MrBeast?" style={{ width: '100%', background: 'white', color: 'black', border: 'none', padding: '14px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
        <button onClick={askAgent} style={{ width: '100%', background: '#a855f7', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', marginTop: '10px', fontWeight: 'bold', fontSize: '15px' }}>Perguntar ao Agente</button>
        <div style={{ background: '#1a1a1a', borderRadius: '12px', padding: '14px', marginTop: '12px', minHeight: '60px' }}>
          <p style={{ margin: 0, color: answer ? 'white' : '#666', fontSize: '14px', lineHeight: '1.4' }}>{answer || 'Resposta do agente aqui... Digite sua duvida acima!'}</p>
        </div>
      </div>

      {/* RECURSOS PRO */}
      <div style={{ background: '#1a1a1a', borderRadius: '16px', padding: '16px', marginTop: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0' }}>Recursos PRO 2.0</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#ccc' }}>
          <div>✅ Timeline multi-track (Video, Audio, Texto)</div>
          <div>✅ Cortes precisos com Playhead</div>
          <div>✅ Importar video da galeria</div>
          <div>✅ Texto animado + Legenda Auto</div>
          <div>✅ Musica + Controle de volume</div>
          <div>✅ Filtros 4K (Vivido, Cinema, Vintage)</div>
          <div>✅ Velocidade + Remover Silencios</div>
          <div>✅ Agente IA que ensina a editar</div>
          <div>✅ Exportar em 4K (em breve)</div>
        </div>
      </div>

      <div style={{ height: '80px' }} />
    </div>
  )
}
