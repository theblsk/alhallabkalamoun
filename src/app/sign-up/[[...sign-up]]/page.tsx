import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      path="/sign-up"
      forceRedirectUrl="/complete-profile"
      fallbackRedirectUrl="/complete-profile"
    />
  );
}


