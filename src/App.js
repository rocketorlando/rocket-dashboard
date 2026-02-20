import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar } from "recharts";

const MINISTRIES=[{id:"shine",name:"Rckt Shine",color:"#f472b6"},{id:"hero",name:"Rckt Hero",color:"#38bdf8"},{id:"music",name:"Rckt Music",color:"#4ade80"},{id:"bible",name:"Rckt Bible Club",color:"#92400e"},{id:"mission",name:"Rckt Mission",color:"#facc15"},{id:"media",name:"Rckt Midia",color:"#a855f7"},{id:"geral",name:"Evento Rocket Geral",color:"#fb923c"},{id:"pais",name:"Rocket Pais",color:"#ef4444"}];
const MIN_MAP=Object.fromEntries(MINISTRIES.map(m=>[m.id,m]));
const NBH_COLORS={"Windermere":"#6366f1","Dr. Phillips":"#8b5cf6","Millenia":"#a855f7","Davenport":"#ec4899","Winter Garden":"#f97316","Metrowest":"#14b8a6","Celebration":"#06b6d4","Lake Nona":"#3b82f6","Hunters Creek":"#22c55e","Clermont":"#eab308","Minneola":"#ef4444","Montverde":"#84cc16","Online":"#64748b"};
const DAYS_ORDER=["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"];
const DAY_COLORS={"Segunda":"#6366f1","Terça":"#8b5cf6","Quarta":"#14b8a6","Quinta":"#f97316","Sexta":"#ec4899","Sábado":"#facc15","Domingo":"#22c55e"};
const PASSWORDS=["4855","0622","1357"];
const INIT_GCS=[
  {id:"gc-1",name:"LION",leaderName:"Nicole Vassao",leaderPhone:"(689)253-4202",coLeaders:[],houseId:"",neighborhood:"Celebration",active:true,avgAttendance:0},
  {id:"gc-2",name:"BLUE",leaderName:"Gustavo Alves",leaderPhone:"(321)202-3664",coLeaders:[],houseId:"",neighborhood:"Clermont",active:true,avgAttendance:0},
  {id:"gc-3",name:"FREEDOM",leaderName:"Ana Carolina Silva",leaderPhone:"(321)330-8974",coLeaders:[],houseId:"",neighborhood:"Davenport",active:true,avgAttendance:0},
  {id:"gc-4",name:"ELAH",leaderName:"Ana Luiza Ferreira",leaderPhone:"(978)942-0314",coLeaders:[],houseId:"",neighborhood:"Davenport",active:true,avgAttendance:0},
  {id:"gc-5",name:"ESSENCIA",leaderName:"Rebeca Siedschlag",leaderPhone:"(863)508-0133",coLeaders:[],houseId:"",neighborhood:"Davenport",active:true,avgAttendance:0},
  {id:"gc-6",name:"FLOW",leaderName:"Rai Vetucci",leaderPhone:"(407)541-9871",coLeaders:[],houseId:"",neighborhood:"Davenport",active:true,avgAttendance:0},
  {id:"gc-7",name:"INTERLIGADOS",leaderName:"Nicoly Timachi",leaderPhone:"(407)577-4573",coLeaders:[],houseId:"",neighborhood:"Davenport",active:true,avgAttendance:0},
  {id:"gc-8",name:"ACTS",leaderName:"Julia Abreu",leaderPhone:"(407)259-7216",coLeaders:[],houseId:"",neighborhood:"Dr. Phillips",active:true,avgAttendance:0},
  {id:"gc-9",name:"REVELATION",leaderName:"Anne Lourenco",leaderPhone:"(407)820-9052",coLeaders:[],houseId:"",neighborhood:"Dr. Phillips",active:true,avgAttendance:0},
  {id:"gc-10",name:"YESHUA",leaderName:"Danielle Cidrao",leaderPhone:"+55 16 99456-7568",coLeaders:[],houseId:"",neighborhood:"Dr. Phillips",active:true,avgAttendance:0},
  {id:"gc-11",name:"GETHSEMANE",leaderName:"Lucca Diedrich",leaderPhone:"(321)438-5781",coLeaders:[],houseId:"",neighborhood:"Dr. Phillips",active:true,avgAttendance:0},
  {id:"gc-12",name:"CARMESIM",leaderName:"Vitor Mizrahy",leaderPhone:"(407)398-4403",coLeaders:[],houseId:"",neighborhood:"Dr. Phillips",active:true,avgAttendance:0},
  {id:"gc-13",name:"LABAREDA",leaderName:"Nicolle de Martino",leaderPhone:"(407)962-8726",coLeaders:[],houseId:"",neighborhood:"Hunters Creek",active:true,avgAttendance:0},
  {id:"gc-14",name:"EDIFY",leaderName:"Maria Habeskot",leaderPhone:"(561)668-3021",coLeaders:[],houseId:"",neighborhood:"Lake Nona",active:true,avgAttendance:0},
  {id:"gc-15",name:"FLECHAS",leaderName:"Breno Martins",leaderPhone:"(407)549-8198",coLeaders:[],houseId:"",neighborhood:"Lake Nona",active:true,avgAttendance:0},
  {id:"gc-16",name:"ALPHA",leaderName:"Raphaela Vitoria",leaderPhone:"(321)297-0898",coLeaders:[],houseId:"",neighborhood:"Metrowest",active:true,avgAttendance:0},
  {id:"gc-17",name:"BEYOND",leaderName:"Melissa Nunes",leaderPhone:"(689)266-3092",coLeaders:[],houseId:"",neighborhood:"Metrowest",active:true,avgAttendance:0},
  {id:"gc-18",name:"CANAA",leaderName:"Bianca Caroline",leaderPhone:"(407)675-8687",coLeaders:[],houseId:"",neighborhood:"Metrowest",active:true,avgAttendance:0},
  {id:"gc-19",name:"SAL DA TERRA",leaderName:"Pedro Segobia",leaderPhone:"(407)987-9304",coLeaders:[],houseId:"",neighborhood:"Metrowest",active:true,avgAttendance:0},
  {id:"gc-20",name:"LIFE",leaderName:"Gabriel Villas Boas",leaderPhone:"(407)453-7531",coLeaders:[],houseId:"",neighborhood:"Millenia",active:true,avgAttendance:0},
  {id:"gc-21",name:"TRUTH",leaderName:"Gabriela Matias",leaderPhone:"(774)427-8879",coLeaders:[],houseId:"",neighborhood:"Millenia",active:true,avgAttendance:0},
  {id:"gc-22",name:"WAY",leaderName:"Isys Victoria",leaderPhone:"(321)732-9751",coLeaders:[],houseId:"",neighborhood:"Millenia",active:true,avgAttendance:0},
  {id:"gc-23",name:"BRASA",leaderName:"Mateus Felix",leaderPhone:"(321)297-0898",coLeaders:[],houseId:"",neighborhood:"Millenia",active:true,avgAttendance:0},
  {id:"gc-24",name:"REVIVE",leaderName:"Rafaella Gonzalez",leaderPhone:"(689)261-9442",coLeaders:[],houseId:"",neighborhood:"Millenia",active:true,avgAttendance:0},
  {id:"gc-25",name:"WATER",leaderName:"Daniel Fayiz",leaderPhone:"(689)251-7346",coLeaders:[],houseId:"",neighborhood:"Minneola",active:true,avgAttendance:0},
  {id:"gc-26",name:"SINAI",leaderName:"Daniel Rocha",leaderPhone:"(321)350-5147",coLeaders:[],houseId:"",neighborhood:"Montverde",active:true,avgAttendance:0},
  {id:"gc-27",name:"BETHEL",leaderName:"Alice V.",leaderPhone:"(321)370-1686",coLeaders:[],houseId:"",neighborhood:"Windermere",active:true,avgAttendance:0},
  {id:"gc-28",name:"BLACK",leaderName:"Duda Rupf",leaderPhone:"(689)263-1217",coLeaders:[],houseId:"",neighborhood:"Windermere",active:true,avgAttendance:0},
  {id:"gc-29",name:"DIVINE",leaderName:"Gabriel Costa",leaderPhone:"(689)263-1217",coLeaders:[],houseId:"",neighborhood:"Windermere",active:true,avgAttendance:0},
  {id:"gc-30",name:"ENGLISH LILAC",leaderName:"Kauan Kerr",leaderPhone:"(689)290-5614",coLeaders:[],houseId:"",neighborhood:"Windermere",active:true,avgAttendance:0},
  {id:"gc-31",name:"LIVING WORD",leaderName:"Rafaella Gonzalez",leaderPhone:"(689)261-9442",coLeaders:[],houseId:"",neighborhood:"Windermere",active:true,avgAttendance:0},
  {id:"gc-32",name:"GREY",leaderName:"Enzo Gutemberg",leaderPhone:"(407)209-5490",coLeaders:[],houseId:"",neighborhood:"Windermere",active:true,avgAttendance:0},
  {id:"gc-33",name:"WHITE",leaderName:"Anna Lopes Nadu",leaderPhone:"(407)453-7046",coLeaders:[],houseId:"",neighborhood:"Windermere",active:true,avgAttendance:0},
  {id:"gc-34",name:"EDEN",leaderName:"Eduardo Brito",leaderPhone:"(321)370-5258",coLeaders:[],houseId:"",neighborhood:"Winter Garden",active:true,avgAttendance:0},
  {id:"gc-35",name:"GLORIFY",leaderName:"Joao Lucas Pina",leaderPhone:"(407)246-9483",coLeaders:[],houseId:"",neighborhood:"Winter Garden",active:true,avgAttendance:0},
  {id:"gc-36",name:"LIGHT",leaderName:"Pedro Caparelli",leaderPhone:"(689)250-6601",coLeaders:[],houseId:"",neighborhood:"Winter Garden",active:true,avgAttendance:0},
  {id:"gc-37",name:"YAHWED",leaderName:"Gabriel Fonseca",leaderPhone:"(407)683-1227",coLeaders:[],houseId:"",neighborhood:"Winter Garden",active:true,avgAttendance:0},
  {id:"gc-38",name:"OVERFLOW",leaderName:"Melissa Amorim",leaderPhone:"(407)881-2477",coLeaders:[],houseId:"",neighborhood:"Winter Garden",active:true,avgAttendance:0},
  {id:"gc-39",name:"STEEL ACO",leaderName:"Julia Savelli",leaderPhone:"+55 45 99984-9951",coLeaders:[],houseId:"",neighborhood:"Online",active:true,avgAttendance:0},
  {id:"gc-40",name:"STAND UP",leaderName:"Ana C. Andrade",leaderPhone:"(689)276-4463",coLeaders:[],houseId:"",neighborhood:"Winter Garden",active:true,avgAttendance:0},
  {id:"gc-41",name:"ATOS 2",leaderName:"Rafael Barbosa",leaderPhone:"(407)451-3360",coLeaders:[],houseId:"",neighborhood:"Winter Garden",active:true,avgAttendance:0},
  {id:"gc-42",name:"AGUA VIVA",leaderName:"Eduardo Nunes",leaderPhone:"(407)223-0954",coLeaders:[],houseId:"",neighborhood:"Metrowest",active:true,avgAttendance:0},
];

function waLink(p){const d=p.replace(/\D/g,"");const i=p.trim().startsWith("+")?d:d.length===10?`1${d}`:d;return`https://wa.me/${i}`;}
function fmtDate(s){if(!s)return"";return new Date(s+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});}
function fmtShort(s){if(!s)return"";return new Date(s+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"});}
function uid(){return`id-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;}
const SUPA_URL="https://pxuubpekzfvyfqlvkrdn.supabase.co";
const SUPA_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dXVicGVremZ2eWZxbHZrcmRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjUzMTAsImV4cCI6MjA4NzEwMTMxMH0.WriuTzeQWK62nuTr_Evz4Hvj0RR-EN6KZGsIM0tsO9M";
async function sGet(k){try{const r=await fetch(`${SUPA_URL}/rest/v1/data_store?key=eq.${k}&select=value`,{headers:{"apikey":SUPA_KEY,"Authorization":`Bearer ${SUPA_KEY}`}});const d=await r.json();return d[0]?JSON.parse(d[0].value):null;}catch{return null;}}
async function sSet(k,v){try{await fetch(`${SUPA_URL}/rest/v1/data_store`,{method:"POST",headers:{"apikey":SUPA_KEY,"Authorization":`Bearer ${SUPA_KEY}`,"Content-Type":"application/json","Prefer":"resolution=merge-duplicates"},body:JSON.stringify({key:k,value:JSON.stringify(v),updated_at:new Date().toISOString()})});}catch(e){console.error(e);}}

const Ico={
  Dash:()=><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  Cal:()=><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Users:()=><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Star:()=><svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Plus:()=><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Edit:()=><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  X:()=><svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Phone:()=><svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 5.55 5.55l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>,
  Archive:()=><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>,
  Undo:()=><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.11"/></svg>,
  Home:()=><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Filter:()=><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Lock:()=><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Unlock:()=><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
};

function Modal({title,onClose,children,wide}){return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",backdropFilter:"blur(5px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"16px"}}><div style={{background:"#0b1628",border:"1px solid #1e3560",borderRadius:"16px",padding:"24px",width:"100%",maxWidth:wide?"600px":"460px",maxHeight:"90vh",overflowY:"auto"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}><h3 style={{margin:0,fontSize:"15px",fontWeight:800,color:"#f1f5f9"}}>{title}</h3><button onClick={onClose} style={{background:"#1e3560",border:"none",borderRadius:"7px",width:"26px",height:"26px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#64748b"}}><Ico.X/></button></div>{children}</div></div>);}
function Inp({label,...p}){return(<div style={{marginBottom:"12px"}}>{label&&<label style={{display:"block",fontSize:"10px",fontWeight:700,color:"#3d5275",marginBottom:"5px",textTransform:"uppercase",letterSpacing:"0.07em"}}>{label}</label>}<input style={{width:"100%",background:"#112039",border:"1px solid #1e3560",borderRadius:"9px",padding:"8px 12px",color:"#e2e8f0",fontSize:"13px",outline:"none",boxSizing:"border-box"}} {...p}/></div>);}
function Sel({label,children,...p}){return(<div style={{marginBottom:"12px"}}>{label&&<label style={{display:"block",fontSize:"10px",fontWeight:700,color:"#3d5275",marginBottom:"5px",textTransform:"uppercase",letterSpacing:"0.07em"}}>{label}</label>}<select style={{width:"100%",background:"#112039",border:"1px solid #1e3560",borderRadius:"9px",padding:"8px 12px",color:"#e2e8f0",fontSize:"13px",outline:"none",boxSizing:"border-box"}} {...p}>{children}</select></div>);}
function Btn({children,v="primary",sm,...p}){const s={primary:{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none"},ghost:{background:"#112039",color:"#64748b",border:"1px solid #1e3560"},danger:{background:"#3b0a0a",color:"#fca5a5",border:"1px solid #7f1d1d"}};return <button style={{...s[v],borderRadius:"8px",padding:sm?"4px 10px":"8px 15px",fontSize:sm?"11px":"13px",fontWeight:700,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"5px"}} {...p}>{children}</button>;}
function Badge({children,color="#6366f1",sm}){return <span style={{display:"inline-flex",alignItems:"center",padding:sm?"2px 7px":"3px 9px",borderRadius:"99px",fontSize:sm?"10px":"11px",fontWeight:700,background:color+"22",color,border:`1px solid ${color}33`}}>{children}</span>;}
function WA({phone}){if(!phone)return<span style={{color:"#1a2d4e",fontSize:"12px"}}>-</span>;return<a href={waLink(phone)} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"4px",color:"#22c55e",fontSize:"11px",fontWeight:700,textDecoration:"none",background:"#052e16",padding:"3px 8px",borderRadius:"7px",border:"1px solid #14532d"}}><Ico.Phone/>{phone}</a>;}
function CTip({active,payload,label}){if(!active||!payload?.length)return null;return<div style={{background:"#0b1628",border:"1px solid #1e3560",borderRadius:"8px",padding:"9px 13px"}}><p style={{margin:"0 0 3px",fontSize:"10px",color:"#3d5275",fontWeight:700}}>{label}</p>{payload.map((p,i)=><p key={i} style={{margin:"2px 0",fontSize:"12px",color:p.color,fontWeight:700}}>{p.name}: {p.value}</p>)}</div>;}
function KPI({label,value,sub,goal,accent="#6366f1",icon}){const pct=goal?Math.min(100,Math.round((Number(value)||0)/goal*100)):null;return(<div style={{background:"#0b1628",border:"1px solid #1a2d4e",borderRadius:"13px",padding:"16px",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,${accent},transparent)`}}/><div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}><span style={{fontSize:"10px",fontWeight:700,color:"#3d5275",textTransform:"uppercase",letterSpacing:"0.07em"}}>{label}</span><span style={{color:accent,opacity:0.5}}>{icon}</span></div><div style={{fontSize:"32px",fontWeight:900,color:"#f1f5f9",lineHeight:1,marginBottom:"3px"}}>{value??"-"}</div>{sub&&<div style={{fontSize:"10px",color:"#3d5275",marginBottom:"4px"}}>{sub}</div>}{goal!=null&&<><div style={{display:"flex",justifyContent:"space-between",fontSize:"10px",color:"#2a3f60",marginBottom:"3px"}}><span>Goal: {goal}</span><span style={{color:pct>=100?"#22c55e":accent}}>{pct}%</span></div><div style={{height:"3px",background:"#112039",borderRadius:"99px",overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${accent},#a78bfa)`,borderRadius:"99px"}}/></div></>}</div>);}

function FilterPill({options,value,onChange}){return(
  <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
    {options.map(o=><button key={o.value} onClick={()=>onChange(o.value)} style={{padding:"3px 11px",borderRadius:"99px",fontSize:"11px",fontWeight:700,cursor:"pointer",border:`1px solid ${value===o.value?"#6366f1":"#1e3560"}`,background:value===o.value?"#6366f122":"#112039",color:value===o.value?"#a5b4fc":"#3d5275"}}>{o.label}</button>)}
  </div>
);}

function PinModal({onSuccess,onClose}){
  const [pin,setPin]=useState(["","","",""]);
  const [err,setErr]=useState(false);
  const refs=[useState(null)[0],useState(null)[0],useState(null)[0],useState(null)[0]];
  const inputRefs=[null,null,null,null].map(()=>{ const r={current:null}; return r; });
  function handleKey(i,val){
    if(!/^\d?$/.test(val))return;
    const next=[...pin];next[i]=val.slice(-1);setPin(next);setErr(false);
    if(val&&i<3)inputRefs[i+1].current?.focus();
    if(i===3&&val){const full=next.join("");if(PASSWORDS.includes(full)){onSuccess();}else{setErr(true);setPin(["","","",""]);setTimeout(()=>inputRefs[0].current?.focus(),50);}}
  }
  function handleKeyDown(i,e){if(e.key==="Backspace"&&!pin[i]&&i>0){inputRefs[i-1].current?.focus();}}
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"16px"}}>
      <div style={{background:"#0b1628",border:"1px solid #1e3560",borderRadius:"20px",padding:"36px 32px",width:"100%",maxWidth:"320px",textAlign:"center"}}>
        <div style={{width:"48px",height:"48px",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:"22px"}}>🔐</div>
        <div style={{fontSize:"16px",fontWeight:900,color:"#f1f5f9",marginBottom:"6px"}}>Edit Mode</div>
        <div style={{fontSize:"12px",color:"#3d5275",marginBottom:"24px"}}>Enter your PIN to enable editing</div>
        <div style={{display:"flex",gap:"10px",justifyContent:"center",marginBottom:"16px"}}>
          {pin.map((v,i)=>(
            <input key={i} ref={inputRefs[i]} value={v} onChange={e=>handleKey(i,e.target.value)} onKeyDown={e=>handleKeyDown(i,e)}
              inputMode="numeric" maxLength={1}
              style={{width:"52px",height:"60px",textAlign:"center",fontSize:"24px",fontWeight:900,background:err?"#3b0a0a":"#112039",border:`2px solid ${err?"#ef4444":v?"#6366f1":"#1e3560"}`,borderRadius:"12px",color:err?"#fca5a5":"#f1f5f9",outline:"none",caretColor:"transparent"}}
              autoFocus={i===0}
            />
          ))}
        </div>
        {err&&<div style={{fontSize:"12px",color:"#ef4444",fontWeight:700,marginBottom:"12px"}}>Senha incorreta. Tente novamente.</div>}
        <button onClick={onClose} style={{background:"none",border:"none",color:"#3d5275",fontSize:"12px",cursor:"pointer",marginTop:"4px"}}>Cancelar — continuar visualizando</button>
      </div>
    </div>
  );
}

export default function App(){
  const [tab,setTab]=useState("dashboard");
  const [weekly,setWeekly]=useState([]);
  const [events,setEvents]=useState([]);
  const [gcs,setGcs]=useState(INIT_GCS);
  const [leaders,setLeaders]=useState([]);
  const [houses,setHouses]=useState([]);
  const [loaded,setLoaded]=useState(false);
  const [wMod,setWMod]=useState(false);
  const [eMod,setEMod]=useState(false);
  const [gcMod,setGcMod]=useState(false);
  const [ldrMod,setLdrMod]=useState(false);
  const [houseMod,setHouseMod]=useState(false);
  const [deactMod,setDeactMod]=useState(null);
  const [editW,setEditW]=useState(null);
  const [editE,setEditE]=useState(null);
  const [editGC,setEditGC]=useState(null);
  const [editLdr,setEditLdr]=useState(null);
  const [editHouse,setEditHouse]=useState(null);
  const [deactReason,setDeactReason]=useState("");

  // Auth
  const [canEdit,setCanEdit]=useState(false);
  const [pinMod,setPinMod]=useState(false);

  // Filter states
  const [dashFilter,setDashFilter]=useState("all"); // all | 12m | 6m
  const [ldrMinFilter,setLdrMinFilter]=useState("all");
  const [evMinFilter,setEvMinFilter]=useState("all");

  const blankW={date:new Date().toISOString().split("T")[0],attendance:"",salvations:""};
  const blankE={name:"",date:new Date().toISOString().split("T")[0],attendance:"",ministryId:"geral"};
  const blankGC={name:"",leaderName:"",leaderPhone:"",coLeaders:[],houseId:"",neighborhood:"",meetingDay:"",avgAttendance:""};
  const blankLdr={name:"",phone:"",role:"head",ministryId:"shine"};
  const blankHouse={hostName:"",hostPhone:"",address:""};
  const [wF,setWF]=useState(blankW);
  const [eF,setEF]=useState(blankE);
  const [gcF,setGcF]=useState(blankGC);
  const [ldrF,setLdrF]=useState(blankLdr);
  const [houseF,setHouseF]=useState(blankHouse);
  const [coTemp,setCoTemp]=useState({name:"",phone:""});

  useEffect(()=>{async function load(){const w=await sGet("rk-w");const e=await sGet("rk-e");const g=await sGet("rk-g");const l=await sGet("rk-l");const h=await sGet("rk-h");if(w)setWeekly(w);if(e)setEvents(e);if(g)setGcs(g);if(l)setLeaders(l);if(h)setHouses(h);setLoaded(true);}load();},[]);
  useEffect(()=>{if(loaded)sSet("rk-w",weekly);},[weekly,loaded]);
  useEffect(()=>{if(loaded)sSet("rk-e",events);},[events,loaded]);
  useEffect(()=>{if(loaded)sSet("rk-g",gcs);},[gcs,loaded]);
  useEffect(()=>{if(loaded)sSet("rk-l",leaders);},[leaders,loaded]);
  useEffect(()=>{if(loaded)sSet("rk-h",houses);},[houses,loaded]);

  const sortW=[...weekly].sort((a,b)=>a.date.localeCompare(b.date));
  const activeGCs=gcs.filter(g=>g.active).length;
  const inactiveGCs=gcs.filter(g=>!g.active);
  const totalCoL=gcs.filter(g=>g.active).reduce((s,g)=>s+(g.coLeaders?.length||0),0);
  const openHouses=new Set(gcs.filter(g=>g.active&&g.houseId).map(g=>g.houseId)).size;
  const internships=leaders.filter(l=>l.role==="internship");
  const heads=leaders.filter(l=>l.role==="head");
  const totalSalv=weekly.reduce((s,r)=>s+(Number(r.salvations)||0),0);
  const lastRec=sortW[sortW.length-1];

  // Dashboard filter logic
  function filterByPeriod(records){
    if(dashFilter==="all")return records;
    const now=new Date();
    const months=dashFilter==="12m"?12:6;
    const cutoff=new Date(now.getFullYear(),now.getMonth()-months,now.getDate());
    return records.filter(r=>new Date(r.date+"T12:00:00")>=cutoff);
  }
  const filteredW=filterByPeriod(sortW);
  const bestAtt=filteredW.reduce((mx,r)=>Math.max(mx,Number(r.attendance)||0),0);

  // Last 12 saturdays for chart (always last 12 regardless of filter)
  const wChart=sortW.slice(-12).map(r=>({label:fmtShort(r.date),attendance:Number(r.attendance)||0,salvations:Number(r.salvations)||0}));

  const pieDat=Object.entries(gcs.filter(g=>g.active).reduce((a,g)=>{a[g.neighborhood]=(a[g.neighborhood]||0)+1;return a},{})).map(([name,value])=>({name,value})).sort((a,b)=>b.value-a.value);

  // Day of week pie chart for GCs
  const dayPieDat=DAYS_ORDER.map(day=>{const count=gcs.filter(g=>g.active&&g.meetingDay===day).length;return{name:day,value:count};}).filter(d=>d.value>0);

  const evByMin=MINISTRIES.map(m=>({...m,count:events.filter(e=>e.ministryId===m.id).length,total:events.filter(e=>e.ministryId===m.id).reduce((s,e)=>s+(Number(e.attendance)||0),0)}));

  // Events filtered by ministry
  const filteredEvents=evMinFilter==="all"?events:events.filter(e=>e.ministryId===evMinFilter);

  // Leaders filtered by ministry
  const filteredInternships=ldrMinFilter==="all"?internships:internships.filter(l=>l.ministryId===ldrMinFilter);
  const filteredHeads=ldrMinFilter==="all"?heads:heads.filter(l=>l.ministryId===ldrMinFilter);

  function saveW(){if(!wF.date||!wF.attendance)return;const r={...wF,id:editW?.id||uid(),attendance:Number(wF.attendance),salvations:Number(wF.salvations)||0};setWeekly(p=>editW?p.map(x=>x.id===r.id?r:x):[...p,r]);setWMod(false);setEditW(null);setWF(blankW);}
  function saveE(){if(!eF.name||!eF.date)return;const e={...eF,id:editE?.id||uid(),attendance:Number(eF.attendance)||0};setEvents(p=>editE?p.map(x=>x.id===e.id?e:x):[...p,e]);setEMod(false);setEditE(null);setEF(blankE);}
  function saveGC(){if(!gcF.name||!gcF.leaderName)return;const g={...gcF,id:editGC?.id||uid(),active:editGC?editGC.active:true,meetingDay:gcF.meetingDay||"",avgAttendance:Number(gcF.avgAttendance)||0,inactiveDate:editGC?.inactiveDate||"",inactiveReason:editGC?.inactiveReason||""};setGcs(p=>editGC?p.map(x=>x.id===g.id?g:x):[...p,g]);setGcMod(false);setEditGC(null);setGcF(blankGC);setCoTemp({name:"",phone:""});}
  function saveLdr(){if(!ldrF.name)return;const l={...ldrF,id:editLdr?.id||uid()};setLeaders(p=>editLdr?p.map(x=>x.id===l.id?l:x):[...p,l]);setLdrMod(false);setEditLdr(null);setLdrF(blankLdr);}
  function saveHouse(){if(!houseF.hostName)return;const h={...houseF,id:editHouse?.id||uid()};setHouses(p=>editHouse?p.map(x=>x.id===h.id?h:x):[...p,h]);setHouseMod(false);setEditHouse(null);setHouseF(blankHouse);}
  function doDeact(){if(!deactMod)return;setGcs(p=>p.map(g=>g.id===deactMod.id?{...g,active:false,inactiveReason:deactReason,inactiveDate:new Date().toISOString().split("T")[0]}:g));setDeactMod(null);setDeactReason("");}
  function reactivate(id){setGcs(p=>p.map(g=>g.id===id?{...g,active:true,inactiveReason:"",inactiveDate:""}:g));}
  function addCoL(){if(!coTemp.name)return;setGcF(p=>({...p,coLeaders:[...(p.coLeaders||[]),{id:uid(),...coTemp}]}));setCoTemp({name:"",phone:""});}
  function removeCoL(id){setGcF(p=>({...p,coLeaders:p.coLeaders.filter(c=>c.id!==id)}));}

  const card={background:"#0b1628",border:"1px solid #1a2d4e",borderRadius:"13px",padding:"16px"};
  const th={fontSize:"10px",fontWeight:700,color:"#2a3f60",textTransform:"uppercase",letterSpacing:"0.05em",padding:"8px 10px",textAlign:"left",borderBottom:"1px solid #1a2d4e"};
  const td={padding:"9px 10px",fontSize:"12px",color:"#64748b",borderBottom:"1px solid #0b1628"};
  const rBtn=(c)=>({background:"#112039",border:"none",borderRadius:"6px",padding:"4px 6px",cursor:"pointer",color:c,display:"inline-flex",alignItems:"center"});
  const NAV=[{id:"dashboard",label:"Dashboard",I:Ico.Dash},{id:"weekly",label:"Weekly",I:Ico.Cal},{id:"events",label:"Events",I:Ico.Star},{id:"gcs",label:"Rocket Crew (GC)",I:Ico.Users}];

  const periodOpts=[{value:"all",label:"All Time"},{value:"12m",label:"Last 12 Months"},{value:"6m",label:"Last 6 Months"}];
  const minFilterOpts=[{value:"all",label:"All"},...MINISTRIES.map(m=>({value:m.id,label:m.name}))];

  if(!loaded)return<div style={{minHeight:"100vh",background:"#060d1f",display:"flex",alignItems:"center",justifyContent:"center",color:"#1e3560"}}>Loading...</div>;

  return(
    <div style={{minHeight:"100vh",background:"#060d1f",color:"#f1f5f9",fontFamily:"system-ui,sans-serif"}}>
      <div style={{height:"52px",borderBottom:"1px solid #0f1e38",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#080f22"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <div style={{width:"28px",height:"28px",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",borderRadius:"7px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:"13px",color:"#fff"}}>R</div>
          <span style={{fontSize:"13px",fontWeight:900,color:"#a5b4fc"}}>ROCKET MINISTRY</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <span style={{fontSize:"10px",color:"#1e3560",fontWeight:700}}>LAGOINHA ORLANDO</span>
          <button onClick={()=>canEdit?setCanEdit(false):setPinMod(true)} title={canEdit?"Sair do modo edição":"Entrar no modo edição"} style={{display:"flex",alignItems:"center",gap:"5px",padding:"4px 10px",borderRadius:"8px",border:`1px solid ${canEdit?"#14532d":"#1e3560"}`,background:canEdit?"#052e16":"#112039",color:canEdit?"#22c55e":"#3d5275",cursor:"pointer",fontSize:"11px",fontWeight:700}}>
            {canEdit?<><Ico.Unlock/>Edit Mode</>:<><Ico.Lock/>View Only</>}
          </button>
        </div>
      </div>
      <div style={{display:"flex",padding:"0 16px",borderBottom:"1px solid #0f1e38",background:"#080f22",overflowX:"auto"}}>
        {NAV.map(({id,label,I})=><button key={id} onClick={()=>setTab(id)} style={{padding:"11px 13px",fontSize:"12px",fontWeight:700,cursor:"pointer",border:"none",background:"none",color:tab===id?"#a5b4fc":"#2a3f60",borderBottom:`2px solid ${tab===id?"#6366f1":"transparent"}`,display:"flex",alignItems:"center",gap:"5px",whiteSpace:"nowrap"}}><I/>{label}</button>)}
      </div>
      <div style={{padding:"20px 18px",maxWidth:"1100px",margin:"0 auto",boxSizing:"border-box"}}>

        {tab==="dashboard"&&<div>
          <div style={{fontSize:"18px",fontWeight:900,marginBottom:"16px"}}>Overview</div>

          {/* Period filter for Best Saturday & Attendance Goal */}
          <div style={{display:"flex",alignItems:"center",gap:"9px",marginBottom:"13px",flexWrap:"wrap"}}>
            <span style={{fontSize:"10px",fontWeight:700,color:"#3d5275",textTransform:"uppercase",letterSpacing:"0.07em",display:"flex",alignItems:"center",gap:"4px"}}><Ico.Filter/>Period</span>
            <FilterPill options={periodOpts} value={dashFilter} onChange={setDashFilter}/>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:"11px",marginBottom:"13px"}}>
            <KPI label="Active GCs" value={activeGCs} goal={55} accent="#6366f1" icon={<Ico.Users/>}/>
            <KPI label="Best Saturday" value={bestAtt||"-"} goal={400} sub={dashFilter==="all"?"all time":dashFilter==="12m"?"last 12 months":"last 6 months"} accent="#8b5cf6" icon={<Ico.Star/>}/>
            <KPI label="Last Saturday" value={lastRec?.attendance||"-"} goal={400} accent="#a855f7" icon={<Ico.Cal/>}/>
            <KPI label="Total Salvations" value={totalSalv} sub="all time" accent="#ec4899"/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"11px",marginBottom:"13px"}}>
            <div style={card}>
              <div style={{fontSize:"10px",fontWeight:700,color:"#2a3f60",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"9px"}}>GC Goal — 55 Active</div>
              <div style={{fontSize:"36px",fontWeight:900,color:"#6366f1",lineHeight:1,marginBottom:"6px"}}>{activeGCs}<span style={{fontSize:"14px",color:"#1e3560"}}>/55</span></div>
              <div style={{height:"4px",background:"#112039",borderRadius:"99px",overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(100,(activeGCs/55)*100)}%`,background:"linear-gradient(90deg,#6366f1,#8b5cf6)",borderRadius:"99px"}}/></div>
              <p style={{fontSize:"11px",color:"#2a3f60",marginTop:"5px",marginBottom:0}}>{activeGCs>=55?"Goal reached!":`${55-activeGCs} more to go`}</p>
            </div>
            <div style={card}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"9px"}}>
                <div style={{fontSize:"10px",fontWeight:700,color:"#2a3f60",textTransform:"uppercase",letterSpacing:"0.07em"}}>Attendance Goal — 400/Sat</div>
                <span style={{fontSize:"9px",color:"#3d5275",fontWeight:700}}>{dashFilter==="all"?"All Time":dashFilter==="12m"?"12 Months":"6 Months"}</span>
              </div>
              <div style={{fontSize:"36px",fontWeight:900,color:"#8b5cf6",lineHeight:1,marginBottom:"6px"}}>{bestAtt||0}<span style={{fontSize:"14px",color:"#1e3560"}}>/400</span></div>
              <div style={{height:"4px",background:"#112039",borderRadius:"99px",overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(100,((bestAtt||0)/400)*100)}%`,background:"linear-gradient(90deg,#8b5cf6,#ec4899)",borderRadius:"99px"}}/></div>
              <p style={{fontSize:"11px",color:"#2a3f60",marginTop:"5px",marginBottom:0}}>Best: {bestAtt} teens</p>
            </div>
          </div>

          {/* Ministry Leadership section on Dashboard */}
          <div style={{...card,marginBottom:"13px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px",flexWrap:"wrap",gap:"8px"}}>
              <div style={{fontSize:"10px",fontWeight:700,color:"#2a3f60",textTransform:"uppercase",letterSpacing:"0.07em"}}>Ministry Leadership</div>
              <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
                <FilterPill options={minFilterOpts} value={ldrMinFilter} onChange={setLdrMinFilter}/>
                {canEdit&&<Btn sm onClick={()=>{setEditLdr(null);setLdrF(blankLdr);setLdrMod(true);}}><Ico.Plus/>Add Leader</Btn>}
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"11px"}}>
              {[{role:"internship",label:"Internship",accent:"#6366f1",list:filteredInternships},{role:"head",label:"Head Leaders",accent:"#a855f7",list:filteredHeads}].map(({role,label,accent,list})=>(
                <div key={role} style={{background:"#060d1f",borderRadius:"10px",padding:"11px",border:"1px solid #1a2d4e"}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:"6px",marginBottom:"9px"}}>
                    <span style={{fontSize:"24px",fontWeight:900,color:"#f1f5f9"}}>{list.length}</span>
                    <span style={{fontSize:"10px",fontWeight:700,color:accent,textTransform:"uppercase",letterSpacing:"0.06em"}}>{label}</span>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"160px",overflowY:"auto"}}>
                    {list.length===0&&<span style={{fontSize:"11px",color:"#1e3560"}}>None yet</span>}
                    {list.map(l=>{const m=MIN_MAP[l.ministryId];return(
                      <div key={l.id} style={{display:"flex",alignItems:"center",gap:"5px",padding:"4px 7px",borderRadius:"6px",background:"#0b1628"}}>
                        <div style={{width:"6px",height:"6px",borderRadius:"50%",background:m?.color||"#475569",flexShrink:0}}/>
                        <span style={{fontSize:"11px",color:"#cbd5e1",flex:1,fontWeight:600}}>{l.name}</span>
                        <span style={{fontSize:"9px",color:m?.color||"#475569",fontWeight:700,whiteSpace:"nowrap"}}>{m?.name||""}</span>
                        {canEdit&&<button style={rBtn("#6366f1")} onClick={()=>{setEditLdr(l);setLdrF({name:l.name,phone:l.phone||"",role:l.role,ministryId:l.ministryId});setLdrMod(true);}}><Ico.Edit/></button>}
                        {canEdit&&<button style={rBtn("#ef4444")} onClick={()=>setLeaders(p=>p.filter(x=>x.id!==l.id))}><Ico.X/></button>}
                      </div>
                    );})}
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:"9px",display:"flex",flexWrap:"wrap",gap:"5px"}}>
              {MINISTRIES.map(m=><span key={m.id} style={{display:"inline-flex",alignItems:"center",gap:"4px",fontSize:"10px",color:m.color,background:m.color+"15",padding:"2px 8px",borderRadius:"99px",fontWeight:700,border:`1px solid ${m.color}33`}}><span style={{width:"5px",height:"5px",borderRadius:"50%",background:m.color,display:"inline-block"}}/>{m.name}</span>)}
            </div>
          </div>

          {/* Last 12 Saturdays chart */}
          {wChart.length>0&&<div style={card}>
            <div style={{fontSize:"10px",fontWeight:700,color:"#2a3f60",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"11px"}}>Last {wChart.length} Saturdays</div>
            <ResponsiveContainer width="100%" height={155}><LineChart data={wChart}><CartesianGrid strokeDasharray="3 3" stroke="#1a2d4e"/><XAxis dataKey="label" tick={{fill:"#2a3f60",fontSize:9}} axisLine={false} tickLine={false}/><YAxis tick={{fill:"#2a3f60",fontSize:9}} axisLine={false} tickLine={false}/><Tooltip content={<CTip/>}/><Legend wrapperStyle={{fontSize:"11px",color:"#3d5275"}}/><Line type="monotone" dataKey="attendance" stroke="#6366f1" strokeWidth={2} dot={{fill:"#6366f1",r:3}} name="Attendance"/><Line type="monotone" dataKey="salvations" stroke="#ec4899" strokeWidth={2} dot={{fill:"#ec4899",r:3}} name="Salvations"/></LineChart></ResponsiveContainer>
          </div>}
        </div>}

        {tab==="weekly"&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
            <div style={{fontSize:"18px",fontWeight:900}}>Saturday Records</div>
            {canEdit&&<Btn onClick={()=>{setEditW(null);setWF(blankW);setWMod(true);}}><Ico.Plus/>Add Saturday</Btn>}
          </div>
          <div style={card}>
            {weekly.length===0?<div style={{textAlign:"center",color:"#1a2d4e",padding:"48px",fontSize:"13px"}}>No records yet</div>:
            <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:"400px"}}>
              <thead><tr><th style={th}>Date</th><th style={th}>Attendance</th><th style={th}>Salvations</th><th style={th}></th></tr></thead>
              <tbody>{[...weekly].sort((a,b)=>b.date.localeCompare(a.date)).map(r=><tr key={r.id}>
                <td style={{...td,color:"#cbd5e1",fontWeight:700}}>{fmtDate(r.date)}</td>
                <td style={td}><Badge color="#6366f1">{r.attendance}</Badge></td>
                <td style={td}>{r.salvations?<Badge color="#ec4899">{r.salvations}</Badge>:"-"}</td>
                <td style={{...td,padding:"6px 10px"}}>{canEdit&&<button style={rBtn("#6366f1")} onClick={()=>{setEditW(r);setWF({date:r.date,attendance:r.attendance,salvations:r.salvations});setWMod(true);}}><Ico.Edit/></button>}</td>
              </tr>)}</tbody>
            </table></div>}
          </div>
        </div>}

        {tab==="events"&&<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"13px",flexWrap:"wrap",gap:"8px"}}>
            <div style={{fontSize:"18px",fontWeight:900}}>Events</div>
            {canEdit&&<Btn onClick={()=>{setEditE(null);setEF(blankE);setEMod(true);}}><Ico.Plus/>Add Event</Btn>}
          </div>

          {/* Ministry filter for Events */}
          <div style={{display:"flex",alignItems:"center",gap:"9px",marginBottom:"13px",flexWrap:"wrap"}}>
            <span style={{fontSize:"10px",fontWeight:700,color:"#3d5275",textTransform:"uppercase",letterSpacing:"0.07em",display:"flex",alignItems:"center",gap:"4px"}}><Ico.Filter/>Ministry</span>
            <FilterPill options={minFilterOpts} value={evMinFilter} onChange={setEvMinFilter}/>
          </div>

          {events.length>0&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:"9px",marginBottom:"16px"}}>
            {evByMin.filter(m=>m.count>0&&(evMinFilter==="all"||m.id===evMinFilter)).map(m=><div key={m.id} style={{...card,padding:"11px",borderTop:`2px solid ${m.color}`}}>
              <div style={{fontSize:"9px",fontWeight:700,color:m.color,textTransform:"uppercase",marginBottom:"3px"}}>{m.name}</div>
              <div style={{fontSize:"20px",fontWeight:900,color:"#f1f5f9"}}>{m.count}</div>
              <div style={{fontSize:"10px",color:"#2a3f60"}}>{m.total} attendees</div>
            </div>)}
          </div>}
          {filteredEvents.length===0?<div style={{...card,textAlign:"center",color:"#1a2d4e",padding:"56px",fontSize:"13px"}}>{events.length===0?"No events yet":"No events for this ministry"}</div>:
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"11px"}}>
            {[...filteredEvents].sort((a,b)=>b.date.localeCompare(a.date)).map(ev=>{const m=MIN_MAP[ev.ministryId];return(
              <div key={ev.id} style={{...card,position:"relative"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:"3px",background:m?.color||"#6366f1",borderRadius:"13px 13px 0 0"}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontSize:"14px",fontWeight:800,color:"#f1f5f9",marginBottom:"2px"}}>{ev.name}</div>
                    <div style={{fontSize:"10px",color:"#2a3f60",marginBottom:"5px"}}>{fmtDate(ev.date)}</div>
                    {m&&<Badge color={m.color} sm>{m.name}</Badge>}
                  </div>
                  {canEdit&&<div style={{display:"flex",gap:"4px"}}>
                    <button style={rBtn("#6366f1")} onClick={()=>{setEditE(ev);setEF({name:ev.name,date:ev.date,attendance:ev.attendance,ministryId:ev.ministryId||"geral"});setEMod(true);}}><Ico.Edit/></button>
                    <button style={rBtn("#ef4444")} onClick={()=>setEvents(p=>p.filter(x=>x.id!==ev.id))}><Ico.X/></button>
                  </div>}
                </div>
                <div style={{marginTop:"11px",display:"flex",alignItems:"baseline",gap:"4px"}}>
                  <span style={{fontSize:"26px",fontWeight:900,color:m?.color||"#f97316"}}>{ev.attendance}</span>
                  <span style={{fontSize:"11px",color:"#2a3f60"}}>attended</span>
                </div>
              </div>
            );})}
          </div>}
        </div>}

        {tab==="gcs"&&<div>
          <div style={{fontSize:"18px",fontWeight:900,marginBottom:"13px"}}>Rocket Crew (GC)</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(148px,1fr))",gap:"11px",marginBottom:"13px"}}>
            <KPI label="GC Leaders" value={activeGCs} goal={55} accent="#6366f1" icon={<Ico.Users/>}/>
            <KPI label="Co-Leaders" value={totalCoL} sub="across active GCs" accent="#8b5cf6" icon={<Ico.Users/>}/>
            <KPI label="Open Houses" value={openHouses} sub="hosting locations" accent="#14b8a6" icon={<Ico.Home/>}/>
          </div>
          {canEdit&&<div style={{display:"flex",gap:"8px",marginBottom:"13px",flexWrap:"wrap"}}>
            <Btn onClick={()=>{setEditGC(null);setGcF(blankGC);setCoTemp({name:"",phone:""});setGcMod(true);}}><Ico.Plus/>Add GC</Btn>
            <Btn v="ghost" onClick={()=>{setEditHouse(null);setHouseF(blankHouse);setHouseMod(true);}}><Ico.Home/>Add House</Btn>
          </div>}

          {/* Neighborhood + Day of Week pie charts */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"11px",marginBottom:"13px"}}>
            <div style={card}>
              <div style={{fontSize:"10px",fontWeight:700,color:"#2a3f60",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"11px"}}>By Neighborhood</div>
              <div style={{display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}}>
                <ResponsiveContainer width={160} height={160} style={{flex:"0 0 160px"}}>
                  <PieChart><Pie data={pieDat} cx="50%" cy="50%" innerRadius={35} outerRadius={75} paddingAngle={2} dataKey="value">{pieDat.map((e,i)=><Cell key={i} fill={NBH_COLORS[e.name]||"#475569"}/>)}</Pie><Tooltip formatter={(v,n)=>[`${v} GCs`,n]} contentStyle={{background:"#0b1628",border:"1px solid #1a2d4e",borderRadius:"8px",color:"#f1f5f9",fontSize:"12px"}}/></PieChart>
                </ResponsiveContainer>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:"3px"}}>
                  {pieDat.map((nd,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"5px"}}><div style={{width:"7px",height:"7px",borderRadius:"50%",background:NBH_COLORS[nd.name]||"#475569",flexShrink:0}}/><span style={{fontSize:"10px",color:"#475569",flex:1}}>{nd.name}</span><span style={{fontSize:"10px",fontWeight:800,color:"#f1f5f9"}}>{nd.value}</span></div>)}
                </div>
              </div>
            </div>
            <div style={card}>
              <div style={{fontSize:"10px",fontWeight:700,color:"#2a3f60",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"11px"}}>By Day of Week</div>
              {dayPieDat.length===0?<div style={{fontSize:"11px",color:"#1e3560",padding:"20px 0"}}>No days set — edit GCs to add</div>:
              <div style={{display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}}>
                <ResponsiveContainer width={160} height={160} style={{flex:"0 0 160px"}}>
                  <PieChart><Pie data={dayPieDat} cx="50%" cy="50%" innerRadius={35} outerRadius={75} paddingAngle={2} dataKey="value">{dayPieDat.map((e,i)=><Cell key={i} fill={DAY_COLORS[e.name]||"#6366f1"}/>)}</Pie><Tooltip formatter={(v,n)=>[`${v} GCs`,n]} contentStyle={{background:"#0b1628",border:"1px solid #1a2d4e",borderRadius:"8px",color:"#f1f5f9",fontSize:"12px"}}/></PieChart>
                </ResponsiveContainer>
                <div style={{flex:1,display:"flex",flexDirection:"column",gap:"3px"}}>
                  {dayPieDat.map((d,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"5px"}}><div style={{width:"7px",height:"7px",borderRadius:"50%",background:DAY_COLORS[d.name]||"#6366f1",flexShrink:0}}/><span style={{fontSize:"10px",color:"#475569",flex:1}}>{d.name}</span><span style={{fontSize:"10px",fontWeight:800,color:"#f1f5f9"}}>{d.value}</span></div>)}
                  {gcs.filter(g=>g.active&&!g.meetingDay).length>0&&<div style={{display:"flex",alignItems:"center",gap:"5px",marginTop:"3px"}}><div style={{width:"7px",height:"7px",borderRadius:"50%",background:"#1e3560",flexShrink:0}}/><span style={{fontSize:"10px",color:"#1e3560",flex:1,fontStyle:"italic"}}>Not set</span><span style={{fontSize:"10px",fontWeight:800,color:"#2a3f60"}}>{gcs.filter(g=>g.active&&!g.meetingDay).length}</span></div>}
                </div>
              </div>}
            </div>
          </div>

          {houses.length>0&&<div style={{...card,marginBottom:"13px"}}>
            <div style={{fontSize:"10px",fontWeight:700,color:"#2a3f60",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"11px"}}>Houses ({houses.length})</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"9px"}}>
              {houses.map(h=>{const gc=gcs.filter(g=>g.active&&g.houseId===h.id).length;return(
                <div key={h.id} style={{background:"#060d1f",borderRadius:"9px",padding:"11px",border:"1px solid #1a2d4e"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"6px"}}>
                    <div><div style={{fontSize:"13px",fontWeight:800,color:"#f1f5f9"}}>{h.hostName}</div><div style={{fontSize:"10px",color:"#2a3f60",marginTop:"1px"}}>{h.address||"No address"}</div></div>
                    <div style={{display:"flex",gap:"4px",alignItems:"center"}}>
                      {gc>0&&<Badge color="#14b8a6" sm>{gc} GC</Badge>}
                      {canEdit&&<button style={rBtn("#6366f1")} onClick={()=>{setEditHouse(h);setHouseF({hostName:h.hostName,hostPhone:h.hostPhone||"",address:h.address||""});setHouseMod(true);}}><Ico.Edit/></button>}
                      {canEdit&&<button style={rBtn("#ef4444")} onClick={()=>setHouses(p=>p.filter(x=>x.id!==h.id))}><Ico.X/></button>}
                    </div>
                  </div>
                  <WA phone={h.hostPhone}/>
                </div>
              );})}
            </div>
          </div>}
          <div style={{...card,marginBottom:"13px"}}>
            <div style={{fontSize:"10px",fontWeight:700,color:"#2a3f60",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"11px"}}>Active GCs ({activeGCs})</div>
            <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:"620px"}}>
              <thead><tr><th style={th}>GC</th><th style={th}>Leader</th><th style={th}>WhatsApp</th><th style={th}>Co-Leaders</th><th style={th}>House</th><th style={th}>Area</th><th style={th}>Dia</th><th style={th}>Avg</th><th style={th}></th></tr></thead>
              <tbody>{gcs.filter(g=>g.active).map(g=>{const house=houses.find(h=>h.id===g.houseId);return(
                <tr key={g.id}>
                  <td style={{...td,fontWeight:800,color:"#f1f5f9"}}>{g.name}</td>
                  <td style={{...td,color:"#94a3b8"}}>{g.leaderName}</td>
                  <td style={td}><WA phone={g.leaderPhone}/></td>
                  <td style={{...td,maxWidth:"130px"}}>{g.coLeaders?.length?<div style={{display:"flex",flexDirection:"column",gap:"2px"}}>{g.coLeaders.map(c=><div key={c.id} style={{fontSize:"11px",color:"#64748b"}}>{c.name}</div>)}</div>:"-"}</td>
                  <td style={td}>{house?<span style={{fontSize:"11px",color:"#14b8a6",fontWeight:600}}>{house.hostName}</span>:"-"}</td>
                  <td style={td}><Badge color={NBH_COLORS[g.neighborhood]||"#475569"} sm>{g.neighborhood}</Badge></td>
                  <td style={td}>{g.meetingDay?<Badge color={DAY_COLORS[g.meetingDay]||"#14b8a6"} sm>{g.meetingDay}</Badge>:"-"}</td>
                  <td style={{...td,fontWeight:700,color:g.avgAttendance?"#f1f5f9":"#1a2d4e"}}>{g.avgAttendance||"-"}</td>
                  <td style={{...td,padding:"6px 10px"}}>{canEdit&&<div style={{display:"flex",gap:"4px"}}>
                    <button style={rBtn("#6366f1")} onClick={()=>{setEditGC(g);setGcF({name:g.name,leaderName:g.leaderName,leaderPhone:g.leaderPhone||"",coLeaders:g.coLeaders||[],houseId:g.houseId||"",neighborhood:g.neighborhood,meetingDay:g.meetingDay||"",avgAttendance:g.avgAttendance||""});setCoTemp({name:"",phone:""});setGcMod(true);}}><Ico.Edit/></button>
                    <button style={rBtn("#f59e0b")} onClick={()=>{setDeactMod(g);setDeactReason("");}}><Ico.Archive/></button>
                  </div>}</td>
                </tr>
              );})}
              </tbody>
            </table></div>
          </div>
          {inactiveGCs.length>0&&<div style={{...card,borderColor:"#3b1515"}}>
            <div style={{fontSize:"10px",fontWeight:700,color:"#7f1d1d",textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"11px"}}>Archived GCs ({inactiveGCs.length})</div>
            <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",minWidth:"400px"}}>
              <thead><tr><th style={th}>GC</th><th style={th}>Leader</th><th style={th}>Closed</th><th style={th}>Reason</th><th style={th}></th></tr></thead>
              <tbody>{inactiveGCs.map(g=><tr key={g.id} style={{opacity:0.6}}>
                <td style={{...td,fontWeight:800,color:"#64748b",textDecoration:"line-through"}}>{g.name}</td>
                <td style={td}>{g.leaderName}</td>
                <td style={{...td,color:"#ef4444",fontSize:"11px"}}>{g.inactiveDate?fmtDate(g.inactiveDate):"-"}</td>
                <td style={{...td,fontSize:"11px",fontStyle:"italic"}}>{g.inactiveReason||"-"}</td>
                <td style={{...td,padding:"6px 10px"}}>{canEdit&&<button style={rBtn("#22c55e")} onClick={()=>reactivate(g.id)}><Ico.Undo/></button>}</td>
              </tr>)}
              </tbody>
            </table></div>
          </div>}
        </div>}
      </div>

      {pinMod&&<PinModal onSuccess={()=>{setCanEdit(true);setPinMod(false);}} onClose={()=>setPinMod(false)}/>}

      {wMod&&<Modal title={editW?"Edit Saturday":"Add Saturday"} onClose={()=>{setWMod(false);setEditW(null);}}>
        <Inp label="Date" type="date" value={wF.date} onChange={e=>setWF(p=>({...p,date:e.target.value}))}/>
        <Inp label="Attendance" type="number" placeholder="287" value={wF.attendance} onChange={e=>setWF(p=>({...p,attendance:e.target.value}))}/>
        <Inp label="Salvations" type="number" placeholder="5" value={wF.salvations} onChange={e=>setWF(p=>({...p,salvations:e.target.value}))}/>
        <div style={{display:"flex",gap:"7px",justifyContent:"flex-end"}}><Btn v="ghost" onClick={()=>{setWMod(false);setEditW(null);}}>Cancel</Btn><Btn onClick={saveW}>Save</Btn></div>
      </Modal>}

      {eMod&&<Modal title={editE?"Edit Event":"Add Event"} onClose={()=>{setEMod(false);setEditE(null);}}>
        <Inp label="Event Name" placeholder="Winter Camp 2025" value={eF.name} onChange={e=>setEF(p=>({...p,name:e.target.value}))}/>
        <Inp label="Date" type="date" value={eF.date} onChange={e=>setEF(p=>({...p,date:e.target.value}))}/>
        <Inp label="Attendance" type="number" placeholder="150" value={eF.attendance} onChange={e=>setEF(p=>({...p,attendance:e.target.value}))}/>
        <Sel label="Ministry" value={eF.ministryId} onChange={e=>setEF(p=>({...p,ministryId:e.target.value}))}>
          {MINISTRIES.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
        </Sel>
        <div style={{display:"flex",gap:"7px",justifyContent:"flex-end"}}><Btn v="ghost" onClick={()=>{setEMod(false);setEditE(null);}}>Cancel</Btn><Btn onClick={saveE}>Save</Btn></div>
      </Modal>}

      {gcMod&&<Modal title={editGC?"Edit GC":"Add GC"} onClose={()=>{setGcMod(false);setEditGC(null);}} wide>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
          <div style={{gridColumn:"1/-1"}}><Inp label="GC Name" placeholder="FIRE" value={gcF.name} onChange={e=>setGcF(p=>({...p,name:e.target.value}))}/></div>
          <Inp label="Leader Name" value={gcF.leaderName} onChange={e=>setGcF(p=>({...p,leaderName:e.target.value}))}/>
          <Inp label="Leader Phone" placeholder="(407) 000-0000" value={gcF.leaderPhone} onChange={e=>setGcF(p=>({...p,leaderPhone:e.target.value}))}/>
          <Inp label="Neighborhood" placeholder="Windermere" value={gcF.neighborhood} onChange={e=>setGcF(p=>({...p,neighborhood:e.target.value}))}/>
          <Sel label="Dia da Semana" value={gcF.meetingDay} onChange={e=>setGcF(p=>({...p,meetingDay:e.target.value}))}><option value="">Não definido</option><option>Segunda</option><option>Terça</option><option>Quarta</option><option>Quinta</option><option>Sexta</option><option>Sábado</option><option>Domingo</option></Sel>
          <Inp label="Avg Attendance" type="number" placeholder="12" value={gcF.avgAttendance} onChange={e=>setGcF(p=>({...p,avgAttendance:e.target.value}))}/>
        </div>
        <Sel label="Host House" value={gcF.houseId} onChange={e=>setGcF(p=>({...p,houseId:e.target.value}))}>
          <option value="">No house assigned</option>
          {houses.map(h=><option key={h.id} value={h.id}>{h.hostName}{h.address?` - ${h.address}`:""}</option>)}
        </Sel>
        <div style={{marginBottom:"12px"}}>
          <label style={{display:"block",fontSize:"10px",fontWeight:700,color:"#3d5275",marginBottom:"7px",textTransform:"uppercase",letterSpacing:"0.07em"}}>Co-Leaders</label>
          {gcF.coLeaders?.map(c=><div key={c.id} style={{display:"flex",alignItems:"center",gap:"7px",padding:"6px 9px",borderRadius:"7px",background:"#060d1f",marginBottom:"4px",border:"1px solid #1a2d4e"}}>
            <span style={{flex:1,fontSize:"12px",color:"#cbd5e1",fontWeight:600}}>{c.name}</span>
            {c.phone&&<span style={{fontSize:"11px",color:"#3d5275"}}>{c.phone}</span>}
            <button style={rBtn("#ef4444")} onClick={()=>removeCoL(c.id)}><Ico.X/></button>
          </div>)}
          <div style={{display:"flex",gap:"7px",alignItems:"flex-end"}}>
            <div style={{flex:1}}><Inp label="Name" placeholder="Co-leader name" value={coTemp.name} onChange={e=>setCoTemp(p=>({...p,name:e.target.value}))}/></div>
            <div style={{flex:1}}><Inp label="Phone" placeholder="(407) 000-0000" value={coTemp.phone} onChange={e=>setCoTemp(p=>({...p,phone:e.target.value}))}/></div>
            <div style={{marginBottom:"12px"}}><Btn v="ghost" sm onClick={addCoL}><Ico.Plus/>Add</Btn></div>
          </div>
        </div>
        <div style={{display:"flex",gap:"7px",justifyContent:"flex-end"}}><Btn v="ghost" onClick={()=>{setGcMod(false);setEditGC(null);}}>Cancel</Btn><Btn onClick={saveGC}>Save GC</Btn></div>
      </Modal>}

      {ldrMod&&<Modal title={editLdr?"Edit Leader":"Add Leader"} onClose={()=>{setLdrMod(false);setEditLdr(null);}}>
        <Inp label="Full Name" value={ldrF.name} onChange={e=>setLdrF(p=>({...p,name:e.target.value}))}/>
        <Inp label="Phone / WhatsApp" placeholder="(407) 000-0000" value={ldrF.phone} onChange={e=>setLdrF(p=>({...p,phone:e.target.value}))}/>
        <Sel label="Role" value={ldrF.role} onChange={e=>setLdrF(p=>({...p,role:e.target.value}))}>
          <option value="internship">Internship (Main Leader)</option>
          <option value="head">Head Leader</option>
        </Sel>
        <Sel label="Ministry" value={ldrF.ministryId} onChange={e=>setLdrF(p=>({...p,ministryId:e.target.value}))}>
          {MINISTRIES.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}
        </Sel>
        <div style={{display:"flex",gap:"7px",justifyContent:"flex-end"}}><Btn v="ghost" onClick={()=>{setLdrMod(false);setEditLdr(null);}}>Cancel</Btn><Btn onClick={saveLdr}>Save</Btn></div>
      </Modal>}

      {houseMod&&<Modal title={editHouse?"Edit House":"Add House"} onClose={()=>{setHouseMod(false);setEditHouse(null);}}>
        <Inp label="Host Name" value={houseF.hostName} onChange={e=>setHouseF(p=>({...p,hostName:e.target.value}))}/>
        <Inp label="Host Phone" placeholder="(407) 000-0000" value={houseF.hostPhone} onChange={e=>setHouseF(p=>({...p,hostPhone:e.target.value}))}/>
        <Inp label="Address" value={houseF.address} onChange={e=>setHouseF(p=>({...p,address:e.target.value}))}/>
        <div style={{display:"flex",gap:"7px",justifyContent:"flex-end"}}><Btn v="ghost" onClick={()=>{setHouseMod(false);setEditHouse(null);}}>Cancel</Btn><Btn onClick={saveHouse}>Save</Btn></div>
      </Modal>}

      {deactMod&&<Modal title={`Archive "${deactMod.name}"`} onClose={()=>setDeactMod(null)}>
        <p style={{fontSize:"13px",color:"#64748b",marginTop:0,lineHeight:1.6}}>GC moves to Archived. You can reactivate anytime.</p>
        <Inp label="Reason" placeholder="ex: Leader moved, merged with another GC..." value={deactReason} onChange={e=>setDeactReason(e.target.value)}/>
        <div style={{display:"flex",gap:"7px",justifyContent:"flex-end"}}><Btn v="ghost" onClick={()=>setDeactMod(null)}>Cancel</Btn><Btn v="danger" onClick={doDeact}><Ico.Archive/>Archive</Btn></div>
      </Modal>}
    </div>
  );
}
