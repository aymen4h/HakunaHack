import loginStyle from "./Login.module.css";
import { useState, useEffect } from "react";
import { loginCall, registerCall } from '../../store/ApiCalls';
import { useNavigate  } from 'react-router-dom';
import logo from '../navbar/logo.jpg';

function Login(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [user, setUser] = useState(false);
    const navigate = useNavigate();



    const  handleLogin = async (e)=>{
        e.preventDefault();
        const data = await loginCall({
            email:email,
            password:password,
        });
        if (data.flag){
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/");
        }
        else{
            console.log("login erreur");
        }
    }
    const  handleRegister = async (e)=>{
        e.preventDefault();
        const data = await registerCall({
            name : name,
            email : email,
            password : password,
            confirmpassword : confirmpassword,
        });
        if (data.flag){
            console.log("ok");
            toSignin();
        }
    }

    function toSignup(){
        document.getElementById(loginStyle.h1in).innerText = "sign up";
        document.getElementsByClassName(loginStyle.comment)[0].style.setProperty("animation-name", loginStyle.frame1);
        

    }
    function toSignin(){
        document.getElementById(loginStyle.h1in).innerText = "sign in";
        document.getElementsByClassName(loginStyle.comment)[0].style.setProperty("animation-name", loginStyle.frame3);        
    }

  
    return(
        <div className={loginStyle.we} >
            <img id={loginStyle.logo} src={logo} alt="erreur" width="450px" height="450px" />
            <div className={loginStyle.index}>
                <main id={loginStyle.mainSign}> 
                
                    <div className={loginStyle.in}>
                        <form className={loginStyle.formsign} onSubmit={handleLogin}>
                            <div className={loginStyle.indata}>
                                <div><input type="text" name={email} id={loginStyle.iduserIn} placeholder="email" onChange={(e) => setEmail(e.target.value)}/></div>
                                <div><input type="password" id={loginStyle.passwordIn} name={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/></div>
                            </div>
                            <div><button name="button" value="in" id={loginStyle.btnIn} >sign in</button></div>
                        </form>
                        <h2 onClick={toSignup} id={loginStyle.h2in}>sign up</h2>
                    </div>
                    <div className={loginStyle.comment}>
                        <h1 id={loginStyle.h1in}>Sign in</h1>
                    </div>
                    <div className={loginStyle.up}>
                        <form className={loginStyle.formsign} onSubmit={handleRegister}>
                            <div className={loginStyle.updata}>

                                <div><input type="text" 
                                    name={name} id={loginStyle.iduserUp} required placeholder="name" onChange={(e) => setName(e.target.value)}
                                /></div>

                                <div><input type="text" 
                                    name={email} id={loginStyle.iduserUp} required placeholder="email" onChange={(e) => setEmail(e.target.value)}
                                /></div>

                                <div><input type="password"
                                    id={loginStyle.passwordUp} required name={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                                 /></div>

                                <div><input type="password" 
                                    id={loginStyle.confirmpasswordUp} required name={confirmpassword} placeholder="Confirm Password"  onChange={(e) => setConfirmpassword(e.target.value)}
                                /></div>


                            </div>
                            <div><button name="button" value="up" id={loginStyle.btnUp} >sign up</button></div>
                        </form>
                        <h2 onClick={toSignin}id={loginStyle.h2up}>sign in</h2>
                    </div>
                </main>
            </div>
        </div>
      
    )
}
export default Login;
