import { SignIn } from "@clerk/clerk-react";

function Login() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
      <SignIn
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
