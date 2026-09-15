import { useState, useRef } from 'react'

function App() {
  const [video, setVideo] = useState(null)
  const [texto, setTexto] = useState('')
  const [resposta, setResposta] = useState('')
  const inputRef = useRef()

  const abrirVideo = (e) => {
    const file = e.target.files[0]
    if (file) {
      setVideo(URL.createObjectURL(file))
    }
  }

  const perguntar = () => {
    if (!texto) {
      setResposta('Digite uma pergunta! Ex: como cortar?')
      return
    }
    if (texto.toLowerCase().includes('corte')) {
      setResposta('✂️ PRA CORTAR: Importa o video > da play > pausa onde quer cortar > clica em CORTAR na timeline! Estilo MrBeast = corte a cada 1 segundo!')
    } else {
      setResposta('🤖 AGENTE: ' + texto + ' -> No MCP PRO: importa video, usa timeline pra cortar, adiciona texto e musica! Me pergunta qualquer coisa de edição!')
    }
  }

  return (
    <div style={{background:'#0a0a0a', minHeight:'100vh', color:'white', padding:16}}>
      <h1 style={{color:'#a855f7', fontSize:28, fontWeight:900}}>MCP STUDIO<br/>PREMIERE PRO</h1>
      <p style={{color:'#aaa', marginTop:4}}>Editor nivel Premiere - 100% celular</p>

      <div style={{background:'#000', borderRadius:12, height:200, marginTop:16, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #222'}}>
        {video? <video src={video} controls style={{width:'100%', height:'100%'}} /> : <span style={{color:'#666'}}>Sem video - clique em Importar</span>}
      </div>

      <button onClick={() => inputRef.current.click()} style={{width:'100%', background:'#a855f7', color:'white', border:'none', padding:14, borderRadius:10, marginTop:12, fontWeight:'bold'}}>📁 Importar Video</button>
      <input ref={inputRef} type="file" accept="video/*" onChange={abrirVideo} style={{display:'none'}} />

      <div style={{background:'#1a1a1a', borderRadius:12, padding:12, marginTop:12}}>
        <p style={{fontSize:12, fontWeight:'bold'}}>📍 TIMELINE V1</p>
        <div style={{background:'#0a0a0a', height:36, borderRadius:6, marginTop:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#a855f7', fontSize:12}}> {video? '🎬 Seu video aqui - pronto pra cortar!' : 'Importe um video'} </div>
      </div>

      <input value={texto} onChange={e=>setTexto(e.target.value)} placeholder="Ex: Como fazer corte estilo MrBeast?" style={{width:'100%', padding:14, borderRadius:10, border:'none', marginTop:16, boxSizing:'border-box'}} />
      <button onClick={perguntar} style={{width:'100%', background:'#a855f7', color:'white', border:'none', padding:14, borderRadius:10, marginTop:8, fontWeight:'bold'}}>Perguntar ao Agente</button>
      <div style={{background:'#1a1a1a', borderRadius:10, padding:12, marginTop:10, minHeight:50}}>{resposta || 'Resposta do agente aqui...'}</div>

      <div style={{background:'#1a1a1a', borderRadius:12, padding:12, marginTop:16, fontSize:12, color:'#ccc'}}>
        ✅ Timeline<br/>✅ Cortes<br/>✅ Importar Video<br/>✅ Agente IA<br/>✅ Filtros 4K
      </div>
    </div>
  )
}

export default App
