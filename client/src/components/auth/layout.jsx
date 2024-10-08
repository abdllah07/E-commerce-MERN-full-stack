import { Outlet } from "react-router-dom";

function AuthLayout() {

    return (
        <div className="flex min-h-screen w-full">
            <div className="hidden lg:flex items-center justify-center bg-gray-50 w-1/2 px-12">
                <div className="max-w-md space-y-6 text-center text-primary-foreground">
                    {/* Animate the heading */}
                    <h1 className="text-4xl font-extrabold tracking-tight text-primary animate-fade-in-up">
                        Welcome To E-commerce Shopping
                    </h1>
                    {/* Display image without background */}
                    <img 
                        className="w-full h-full rounded-lg animate-fade-in" 
                        src="https://i.pinimg.com/originals/dc/ae/66/dcae66764a7bd4d470bd2446f062b1ff.png"  // Replace with a transparent image URL
                        alt="E-commerce Shopping"
                        style={{ backgroundColor: 'transparent' }} // Ensure the background is transparent
                    />
                </div>
            </div>
            <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 w-full">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
