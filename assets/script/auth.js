(() => {
const $=id=>document.getElementById(id);
const loginTab=$("login-tab"),signupTab=$("signup-tab"),loginForm=$("login-form"),signupForm=$("signup-form"),message=$("auth-message"),signedInPanel=$("signed-in-panel");
function showMessage(text,type=""){message.textContent=text;message.className="auth-message"+(type?" "+type:"");}
function setMode(mode){
 const login=mode==="login";
 loginForm.hidden=!login;signupForm.hidden=login;
 loginTab.classList.toggle("active",login);signupTab.classList.toggle("active",!login);
 loginTab.setAttribute("aria-selected",String(login));signupTab.setAttribute("aria-selected",String(!login));
 $("auth-title").textContent=login?"Welcome back":"Join DIVISION";
 $("auth-subtitle").textContent=login?"Sign in to continue to your games.":"Create an account to start building your player profile.";
 showMessage("");
}
function setBusy(form,busy,label){
 const button=form.querySelector('button[type="submit"]');
 if(!button.dataset.originalLabel)button.dataset.originalLabel=button.textContent;
 button.disabled=busy;button.textContent=busy?label:button.dataset.originalLabel;
}
function showSignedIn(user){
 loginForm.hidden=true;signupForm.hidden=true;document.querySelector(".auth-tabs").hidden=true;
 signedInPanel.hidden=false;$("signed-in-email").textContent=user.email||"Signed-in player";
 $("auth-title").textContent="You're signed in";$("auth-subtitle").textContent="Your DIVISION account is ready.";showMessage("");
}
async function initialize(){
 if(!window.divisionSupabase){
  showMessage("DIVISION couldn't load its Supabase connection. Refresh and try again.","error");
  loginForm.querySelector('button[type="submit"]').disabled=true;signupForm.querySelector('button[type="submit"]').disabled=true;return;
 }
 const {data:{session},error}=await window.divisionSupabase.auth.getSession();
 if(error){showMessage(error.message,"error");return;}
 if(session?.user)showSignedIn(session.user);
 window.divisionSupabase.auth.onAuthStateChange((event,nextSession)=>{
  if(event==="SIGNED_IN"&&nextSession?.user)showSignedIn(nextSession.user);
 });
}
loginTab.addEventListener("click",()=>setMode("login"));
signupTab.addEventListener("click",()=>setMode("signup"));
loginForm.addEventListener("submit",async event=>{
 event.preventDefault();const email=loginForm.elements.email.value.trim(),password=loginForm.elements.password.value;
 setBusy(loginForm,true,"Signing in...");
 const {data,error}=await window.divisionSupabase.auth.signInWithPassword({email,password});
 setBusy(loginForm,false);
 if(error){showMessage(error.message,"error");return;}if(data.user)showSignedIn(data.user);
});
signupForm.addEventListener("submit",async event=>{
 event.preventDefault();const username=signupForm.elements.username.value.trim(),email=signupForm.elements.email.value.trim(),password=signupForm.elements.password.value;
 if(!/^[A-Za-z0-9_]{3,20}$/.test(username)){showMessage("Username must be 3–20 characters using letters, numbers or underscores.","error");return;}
 if(password.length<8){showMessage("Use a password with at least 8 characters.","error");return;}
 setBusy(signupForm,true,"Creating account...");
 const {data,error}=await window.divisionSupabase.auth.signUp({email,password,options:{data:{username},emailRedirectTo:new URL("./index.html",window.location.href).href}});
 setBusy(signupForm,false);
 if(error){showMessage(error.message,"error");return;}
 if(data.session&&data.user)showSignedIn(data.user);
 else{setMode("login");showMessage("Account created. Check your email for the confirmation link before signing in.","success");}
});
$("signout-button").addEventListener("click",async()=>{
 const button=$("signout-button");button.disabled=true;
 const {error}=await window.divisionSupabase.auth.signOut();button.disabled=false;
 if(error){showMessage(error.message,"error");return;}
 signedInPanel.hidden=true;document.querySelector(".auth-tabs").hidden=false;setMode("login");showMessage("You've signed out.","success");
});
initialize();
})();