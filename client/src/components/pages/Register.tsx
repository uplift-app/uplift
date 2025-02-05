import { SignUp } from "@clerk/clerk-react";

function Login() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
      <h1 className="text-3xl font-bold mb-6" />
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "hsl(199,100%,33%)",
            borderRadius: "0.5rem",
            colorBackground: "#ffffff80",
            colorText: "#06324b",
          },
          elements: {
            headerTitle: {
              fontFamily: "Comfortaa",
              fontWeight: 800,
            },
          },
        }}
      />
    </div>
  );
}

export default Login;
