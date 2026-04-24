import { useState } from "react";
import "./login.css"
import { loginUser } from "../api/auth";
import { useChatNavigation } from "../hooks/createNewChat";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { createNewChat } = useChatNavigation();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const res = await loginUser({email,password}); //  API call
    console.log("Login success:", res);
  // Optional: redirect after login
    createNewChat();
    setSuccess(true);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{
      minHeight: "100vh", width: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse at 20% 20%, #1a0a3c 0%, #0d0d1f 40%, #060612 100%)",
      position: "relative", overflow: "hidden",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      
    }}>
     

      {/* Orbs */}
      <div style={{position:"absolute",top:"-80px",left:"-80px",width:"420px",height:"420px",borderRadius:"50%",background:"radial-gradient(circle,rgba(120,60,220,0.35) 0%,transparent 70%)",animation:"orbFloat1 8s ease-in-out infinite",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"-60px",right:"-60px",width:"360px",height:"360px",borderRadius:"50%",background:"radial-gradient(circle,rgba(6,182,212,0.22) 0%,transparent 70%)",animation:"orbFloat2 10s ease-in-out infinite",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"60%",right:"10%",width:"220px",height:"220px",borderRadius:"50%",background:"radial-gradient(circle,rgba(99,60,180,0.12) 0%,transparent 70%)",animation:"orbFloat1 14s ease-in-out infinite reverse",pointerEvents:"none"}}/>

      {/* Stars */}
      {[...Array(20)].map((_,i)=>(
        <div key={i} style={{
          position:"absolute",
          width: i%3===0?"2px":"1px", height: i%3===0?"2px":"1px",
          borderRadius:"50%", background:"rgba(255,255,255,0.5)",
          top:`${(i*17+7)%93}%`, left:`${(i*23+9)%93}%`,
          animation:`dotPulse ${2+(i%3)}s ease-in-out infinite`,
          animationDelay:`${i*0.25}s`, pointerEvents:"none",
        }}/>
      ))}

      {/* Card wrapper */}
      <div style={{position:"relative",zIndex:10,width:"100%",maxWidth:"430px",margin:"0 25px",animation:"fadeSlideUp 0.55s ease forwards"}}>

        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"20px", marginTop:"40px"}}>
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
          borderRadius:"22px", padding:"40px 32px",
          backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)",
          boxShadow:"0 24px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07)",
          
        }}>

          {/* Badge */}
          <div style={{display:"flex",justifyContent:"center",marginBottom:"22px"}}>
            <span style={{
              display:"inline-flex",alignItems:"center",gap:"7px",
              padding:"5px 14px",borderRadius:"999px",
              background:"rgba(6,182,212,0.09)",border:"1px solid rgba(6,182,212,0.28)",
              color:"#22d3ee",fontSize:"12px",animation:"badgePulse 2.5s ease-in-out infinite",
            }}>
              <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#22d3ee",animation:"dotPulse 1.5s ease-in-out infinite"}}/>
              12,000+ knowledge workers trust AI Brain
            </span>
          </div>

          <h1 style={{color:"#fff",fontSize:"25px",fontWeight:"600",textAlign:"center",margin:"0 0 6px",letterSpacing:"-0.3px"}}>
            Welcome back
          </h1>
          <p style={{color:"rgba(255,255,255,0.38)",fontSize:"14px",textAlign:"center",margin:"0 0 28px"}}>
            Sign in to your second brain
          </p>

          {success ? (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 0",gap:"14px"}}>
              <div style={{width:"64px",height:"64px",borderRadius:"50%",background:"rgba(34,211,238,0.1)",border:"1.5px solid rgba(34,211,238,0.4)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p style={{color:"#fff",fontWeight:"500",fontSize:"16px"}}>Welcome back!</p>
              <p style={{color:"rgba(255,255,255,0.38)",fontSize:"13px"}}>Redirecting to your Brain...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div style={{marginBottom:"16px"}}>
                <label style={{display:"block",color:"rgba(255,255,255,0.42)",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.09em",marginBottom:"8px"}}>
                  Email address
                </label>
                <input className="ai-input" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
              </div>

              {/* Password */}
              <div style={{marginBottom:"10px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                  <label style={{color:"rgba(255,255,255,0.42)",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.09em"}}>Password</label>
                  <span className="ai-forgot">Forgot password?</span>
                </div>
                <div style={{position:"relative"}}>
                  <input className="ai-input" type={showPass?"text":"password"} placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required style={{paddingRight:"46px"}}/>
                  <button type="button" onClick={()=>setShowPass(p=>!p)} style={{position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",padding:0,color:"rgba(255,255,255,0.3)",display:"flex"}}>
                    {showPass
                      ? <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"24px"}}>
                <input type="checkbox" id="remember" style={{accentColor:"#7c3aed",width:"14px",height:"14px",cursor:"pointer"}}/>
                <label htmlFor="remember" style={{color:"rgba(255,255,255,0.36)",fontSize:"13px",cursor:"pointer"}}>Remember me for 30 days</label>
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
                      Signing in...
                    </span>
                  : "✦  Sign In"
                }
              </button>

              {/* Divider */}
              {/* <div style={{display:"flex",alignItems:"center",gap:"12px",margin:"20px 0"}}>
                <div style={{flex:1,height:"1px",background:"rgba(255,255,255,0.08)"}}/>
                <span style={{color:"rgba(255,255,255,0.22)",fontSize:"12px"}}>or continue with</span>
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
                Continue with Google
              </button> */}
            </form>
          )}
        </div>

        <p style={{textAlign:"center",color:"rgba(255,255,255,0.28)",fontSize:"13px",marginTop:"20px"}}>
          Don't have an account?{" "}
          <a href="/signup" className="ai-link">Create one free →</a>
        </p>
      </div>
    </div>
  );
}
