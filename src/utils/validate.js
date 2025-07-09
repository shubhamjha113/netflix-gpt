export const cheakValidData = (isSignInForm,name,email,password)=>{
    if(!isSignInForm){
        const isValidName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
        if(!isValidName) return "Name is not valid";
    }
    
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
    if(!isEmailValid) return "Email Id is not valid";
    if(!isPasswordValid) return "Password is not valid";

    return null;

}