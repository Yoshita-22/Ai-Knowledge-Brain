import { useState } from "react";
import "./signup.css"
import { signupUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
function StrengthBar({ password }) {
  const getScore = (p) => {
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) s++;
    if (/[^a-zA-Z0-9]/.test(p)) s++;
    return s;
  };
  const score = getScore(password);
  const segColors = ["#ef4444","#f97316","#eab308","#22d3ee"];
  const labels = ["","Weak","Fair","Good","Strong"];
  const labelColors = ["","#ef4444","#f97316","#eab308","#22d3ee"];
  return (
    <div style={{marginTop:"15px"}}>
      <div style={{display:"flex",gap:"5px",marginBottom:"5px"}}>
        {[0,1,2,3].map(i=>(
          <div key={i} style={{flex:1,height:"3px",borderRadius:"99px",background:i<score?segColors[score-1]:"rgba(255,255,255,0.1)",transition:"background 0.35s"}}/>
        ))}
      </div>
      {password && <p style={{fontSize:"11px",color:labelColors[score],margin:0,letterSpacing:"0.03em"}}>{labels[score]}</p>}
    </div>
  );
}

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [agreed, setAgreed] = useState(false);

const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });



const handleSubmit = async (e) => {
  e.preventDefault();

  if (!agreed) {
    alert("Please accept terms");
    return;
  }
  try {
    setLoading(true);
    const res = await signupUser(form); //  API call
    console.log("Signup success:", res);
    setSuccess(true);
    // Optional: redirect after signup
    navigate("/login");
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{
      minHeight:"100vh", width:"100%",
      display:"flex", alignItems:"center", justifyContent:"center",
      background:"radial-gradient(ellipse at 80% 10%, #1a0a3c 0%, #0d0d1f 40%, #060612 100%)",
      position:"relative", overflow:"hidden",
      fontFamily:"'Segoe UI', system-ui, sans-serif",
      padding:"90px 0",
    }}>
     

      {/* Orbs */}
      <div style={{position:"absolute",top:"-80px",right:"-80px",width:"420px",height:"420px",borderRadius:"50%",background:"radial-gradient(circle,rgba(120,60,220,0.32) 0%,transparent 70%)",animation:"orbFloat1 8s ease-in-out infinite",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-60px",left:"-60px",width:"360px",height:"360px",borderRadius:"50%",background:"radial-gradient(circle,rgba(6,182,212,0.2) 0%,transparent 70%)",animation:"orbFloat2 10s ease-in-out infinite",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"30%",left:"8%",width:"200px",height:"200px",borderRadius:"50%",background:"radial-gradient(circle,rgba(99,60,180,0.12) 0%,transparent 70%)",animation:"orbFloat2 12s ease-in-out infinite reverse",pointerEvents:"none"}}/>

      {/* Stars */}
      {[...Array(20)].map((_,i)=>(
        <div key={i} style={{
          position:"absolute",
          width:i%3===0?"2px":"1px",height:i%3===0?"2px":"1px",
          borderRadius:"50%",background:"rgba(255,255,255,0.5)",
          top:`${(i*19+5)%93}%`,left:`${(i*27+11)%93}%`,
          animation:`dotPulse ${2+(i%3)}s ease-in-out infinite`,
          animationDelay:`${i*0.22}s`,pointerEvents:"none",
        }}/>
      ))}

      {/* Card wrapper */}
      <div style={{position:"relative",zIndex:10,width:"100%",maxWidth:"440px",margin:"0 16px",animation:"fadeSlideUp 0.55s ease forwards"}}>

        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"28px"}}>
          <div style={{
            width:"44px",height:"44px",borderRadius:"13px",
            background:"linear-gradient(135deg,#7c3aed 0%,#0ea5e9 100%)",
            display:"flex",alignItems:"center",justifyContent:"center",
            boxShadow:"0 8px 28px rgba(124,58,237,0.5)",
            animation:"logoFloat 3s ease-in-out infinite",
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <span style={{color:"#fff",fontSize:"21px",fontWeight:"600",letterSpacing:"-0.3px"}}>AI Brain</span>
        </div>

        {/* Glass card */}
        <div style={{
          background:"rgba(255,255,255,0.04)",
          border:"1px solid rgba(255,255,255,0.10)",
          borderRadius:"22px",padding:"36px 32px",
          backdropFilter:"blur(28px)",WebkitBackdropFilter:"blur(28px)",
          boxShadow:"0 24px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}>

          {/* Badge */}
          <div style={{display:"flex",justifyContent:"center",marginBottom:"22px"}}>
            <span style={{
              display:"inline-flex",alignItems:"center",gap:"7px",
              padding:"5px 14px",borderRadius:"999px",
              background:"rgba(139,92,246,0.1)",border:"1px solid rgba(139,92,246,0.28)",
              color:"#a78bfa",fontSize:"12px",animation:"badgePulse 2.5s ease-in-out infinite",
            }}>
              <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#a78bfa",animation:"dotPulse 1.5s ease-in-out infinite"}}/>
              Now in Public Beta · Free plan forever
            </span>
          </div>

          <h1 style={{color:"#fff",fontSize:"25px",fontWeight:"600",textAlign:"center",margin:"0 0 6px",letterSpacing:"-0.3px"}}>
            Build your second brain
          </h1>
          <p style={{color:"rgba(255,255,255,0.38)",fontSize:"14px",textAlign:"center",margin:"0 0 28px"}}>
            No credit card required · Setup in 60 seconds
          </p>

          {success ? (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 0",gap:"14px"}}>
              <div style={{width:"64px",height:"64px",borderRadius:"50%",background:"rgba(34,211,238,0.1)",border:"1.5px solid rgba(34,211,238,0.4)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p style={{color:"#fff",fontWeight:"500",fontSize:"16px"}}>Brain created! 🎉</p>
              <p style={{color:"rgba(255,255,255,0.38)",fontSize:"13px"}}>Setting up your knowledge engine...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Name row */}
             
                <div style={{marginBottom:"16px"}}>
                <label style={{display:"block",color:"rgba(255,255,255,0.42)",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:"8px"}}>Name</label>
                <input className="ai-input" type="text" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required/>
              </div>


              {/* Email */}
              <div style={{marginBottom:"16px"}}>
                <label style={{display:"block",color:"rgba(255,255,255,0.42)",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:"8px"}}>Email address</label>
                <input className="ai-input" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required/>
              </div>

              {/* Password */}
              <div style={{marginBottom:"16px"}}>
                <label style={{display:"block",color:"rgba(255,255,255,0.42)",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:"8px"}}>Password</label>
                <div style={{position:"relative"}}>
                  <input className="ai-input" type={showPass?"text":"password"} name="password" placeholder="Create a strong password" value={form.password} onChange={handleChange} required style={{paddingRight:"46px"}}/>
                  <button type="button" onClick={()=>setShowPass(p=>!p)} style={{position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0,color:"rgba(255,255,255,0.3)",display:"flex"}}>
                    {showPass
                      ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
                <StrengthBar password={form.password}/>
              </div>

              {/* Terms */}
              <div style={{display:"flex",alignItems:"flex-start",gap:"9px",marginBottom:"22px"}}>
                <input type="checkbox" id="terms" checked={agreed} onChange={e=>setAgreed(e.target.checked)} required style={{accentColor:"#7c3aed",width:"15px",height:"15px",cursor:"pointer",marginTop:"2px",flexShrink:0}}/>
                <label htmlFor="terms" style={{color:"rgba(255,255,255,0.36)",fontSize:"13px",cursor:"pointer",lineHeight:"1.5"}}>
                  I agree to the{" "}
                  <a href="#" className="ai-link" style={{fontSize:"13px"}}>Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="ai-link" style={{fontSize:"13px"}}>Privacy Policy</a>
                </label>
              </div>

              {/* CTA */}
              <button type="submit" disabled={loading} className="ai-cta" style={{
                width:"100%",padding:"14px",
                background:"linear-gradient(135deg,#7c3aed 0%,#0ea5e9 100%)",
                border:"none",borderRadius:"13px",
                color:"#fff",fontSize:"15px",fontWeight:"600",
                cursor:loading?"not-allowed":"pointer",
                opacity:loading?0.75:1,
                position:"relative",overflow:"hidden",
                boxShadow:"0 4px 24px rgba(124,58,237,0.42)",
                fontFamily:"inherit",letterSpacing:"0.01em",
              }}>
                {!loading && <span style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)",animation:"shimmer 2.5s infinite"}}/>}
                {loading
                  ? <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{animation:"spinAnim 0.8s linear infinite"}}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                      Creating your Brain...
                    </span>
                  : "✦  Create Account — It's Free"
                }
              </button>

              {/* Divider */}
              {/* <div style={{display:"flex",alignItems:"center",gap:"12px",margin:"20px 0"}}>
                <div style={{flex:1,height:"1px",background:"rgba(255,255,255,0.08)"}}/>
                <span style={{color:"rgba(255,255,255,0.22)",fontSize:"12px"}}>or sign up with</span>
                <div style={{flex:1,height:"1px",background:"rgba(255,255,255,0.08)"}}/>
              </div> */}

              {/* Google */}
              {/* <button type="button" className="ai-google-btn" style={{
                width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",
                padding:"13px",borderRadius:"13px",
                border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.05)",
                color:"rgba(255,255,255,0.6)",fontSize:"14px",cursor:"pointer",fontFamily:"inherit",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                  <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
                  <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
                  <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
                </svg>
                Sign up with Google
              </button> */}
            </form>
          )}
        </div>

        {/* Stats strip */}
        <div style={{
          display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px",
          marginTop:"16px",padding:"16px 20px",
          background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",
          borderRadius:"14px",backdropFilter:"blur(12px)",
        }}>
          {[["50M+","Docs Processed"],["12K+","Active Users"],["<0.3s","Response Time"]].map(([val,label])=>(
            <div key={label} style={{textAlign:"center"}}>
              <p style={{color:"#a78bfa",fontSize:"16px",fontWeight:"700",margin:"0 0 2px",letterSpacing:"-0.3px"}}>{val}</p>
              <p style={{color:"rgba(255,255,255,0.28)",fontSize:"11px",margin:0}}>{label}</p>
            </div>
          ))}
        </div>

        <p style={{textAlign:"center",color:"rgba(255,255,255,0.28)",fontSize:"13px",marginTop:"16px"}}>
          Already have an account?{" "}
          <a href="/login" className="ai-link">Sign in →</a>
        </p>
      </div>
    </div>
  );
}
