import Form from "@/components/common/form";
import { loginFormControls, registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { KeyRound, LogIn } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  Link } from "react-router-dom";


const initialState =  {
    email : '',
    password : '', 
}


export default function AuthLogin() {
    
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const {toast} = useToast()
    const OnSubmit = (event) => {

        event.preventDefault();

        dispatch(loginUser(formData)).then(data => {
            if(data?.payload?.success) {
                toast({
                    title : data?.payload?.message
                })
            }else {
                toast({
                    title : data?.payload?.message,
                    variant : 'destructive'
                })
            }
        })
        
    }



    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="flex items-center justify-center">
                <LogIn className="w-20 h-20 text-purple-950 animate-fade-in-up" />
            </div>
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-foreground">Sign In to your account </h1>
          
            <p className="mt-2">Don't have an account ?  
                <Link className="font-medium text-primary hover:underline" to="/auth/register"> Register</Link>
            </p>
        </div>

        <Form 
            formControls={loginFormControls}
            buttonText={"Sign Up"}
            formData={formData}
            setFormData={setFormData}
            onSubmit={OnSubmit}
            icon={<KeyRound />}
        />
    </div>
    )
}
