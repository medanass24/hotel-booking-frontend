import React, { useState } from "react";

export default function ImageGallery({ images = [] }) {
  const thumbs = images.length ? images : ["/assets/room1.jpg","/assets/room2.jpg","/assets/sample3.jpg"];
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="image-gallery">
        {thumbs.slice(0,6).map((s,i) => (
          <img key={i} src={s} alt={`img-${i}`} loading="lazy" onClick={() => setActive(i)} />
        ))}
      </div>

      {active !== null && (
        <div onClick={() => setActive(null)} style={{
          position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
          background:"rgba(2,6,23,0.7)",zIndex:140,padding:20
        }}>
          <div style={{maxWidth:1100, width:"95%", display:"flex", gap:10, alignItems:"center"}}>
            <img src={thumbs[active]} alt="preview" style={{width:"100%",height:"70vh",objectFit:"cover",borderRadius:12,boxShadow:"0 30px 60px rgba(2,6,23,0.6)"}} />
          </div>
        </div>
      )}
    </>
  );
}
