import React, { useState, useRef } from 'react'

export default function App(){
  const [videos, setVideos] = useState([])
  const [playing, setPlaying] = useState(false)
  const fileRef = useRef(null)
  const videoRef = useRef(null)

  const onFiles = (e)=>{
    const files = Array.from(e.target.files)
    const newV = files.map(f=>({id:Date.now()+Math.random(), name:f.name, url:URL.createObjectURL(f)}))
    setVideos(v=>[...v,...newV])
  }

  return (
    <div style={{background:'#0a0a0a', minHeight:'100vh', color:'white', fontFamily:'sans-serif', display:'flex', flexDirection:'column'}}>
      {/* HEADER */}
      <div style={{background:'#111', padding:'12px 16px', borderBottom:'1px solid #222', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <div style={{width:32, height:32, background:'#a855f7', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold'}}>M</div>
          <b>MCP STUDIO PREMIERE PRO</b>
          <span style={{background:'#a855f7', padding:'2px 8px', borderRadius:10, fontSize:10}}>V3 PRO</span>
        </div>
        <button onClick={()=>fileRef.current.click()} style={{background:'#a855f7', color:'white', border:0, padding:'8px 14px', borderRadius:8, fontWeight:'bold'}}>＋ IMPORTAR</button>
        <input ref={fileRef} type="file" accept="video/*" multiple hidden onChange={onFiles} />
      </div>

      {/* MAIN */}
      <div style={{flex:1, display:'flex', flexDirection:'column', padding:12, gap:12}}>
        {/* PREVIEW */}
        <div style={{background:'#111', borderRadius:12, aspectRatio:'16/9', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #222', overflow:'hidden', position:'relative'}}>
          {videos.length>0? (
            <video ref={videoRef} src={videos[0].url} style={{width:'100%', height:'100%'}} controls />
          ) : (
            <div style={{textAlign:'center', color:'#666'}}>
              <div style={{fontSize:40}}>🎬</div>
              <p>Nenhum vídeo</p>
              <p style={{fontSize:12}}>Clique em IMPORTAR</p>
            </div>
          )}
        </div>

        {/* CONTROLS */}
        <div style={{background:'#111', borderRadius:12, padding:12, border:'1px solid #222', display:'flex', gap:8, alignItems:'center'}}>
          <button onClick={()=>{ if(videoRef.current){ playing? videoRef.current.pause() : videoRef.current.play(); setPlaying(!playing) }}} style={{background:'white', color:'black', border:0, width:40, height:40, borderRadius:20, fontWeight:'bold'}}>{playing? '⏸' : '▶'}</button>
          <div style={{flex:1, height:4, background:'#222', borderRadius:2}}><div style={{width:'30%', height:'100%', background:'#a855f7', borderRadius:2}}></div></div>
          <span style={{fontSize:12, color:'#888'}}>00:00 / 00:15</span>
        </div>

        {/* TIMELINE */}
        <div style={{background:'#111', borderRadius:12, padding:12, border:'1px solid #222', minHeight:120}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
            <b style={{fontSize:12}}>TIMELINE</b>
            <span style={{fontSize:10, color:'#888'}}>{videos.length} clipes</span>
          </div>
          <div style={{display:'flex', gap:8, overflowX:'auto'}}>
            {videos.map(v=>(
              <div key={v.id} style={{minWidth:100, background:'#1a1a1a', borderRadius:8, padding:8, border:'1px solid #333'}}>
                <div style={{width:'100%', height:50, background:'#222', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center'}}>🎥</div>
                <p style={{fontSize:9, marginTop:6, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{v.name}</p>
              </div>
            ))}
            {videos.length===0 && <div style={{color:'#444', fontSize:12, padding:20}}>Timeline vazia - importe vídeos</div>}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:'#111', padding:8, textAlign:'center', fontSize:10, color:'#555', borderTop:'1px solid #222'}}>
        MCP STUDIO V3 • BUILD FUNCIONANDO ✅ • Agora é só editar!
      </div>
    </div>
  )
}
