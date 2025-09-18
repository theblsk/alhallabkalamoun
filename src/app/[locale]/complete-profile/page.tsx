import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CompleteProfile from "@/components/CompleteProfile";
import { getLocale } from "next-intl/server";

export default async function CompleteProfilePage() {
  const { userId } = await auth();
  const locale = await getLocale();
  if (!userId) {
    redirect(`/${locale}/sign-in`);
  }
  const user = await currentUser();
  // Get email from Clerk session
  const email = user?.emailAddresses[0].emailAddress as string | undefined;

  if (!email) {
    redirect(`/${locale}/sign-in`);
  }

  return <CompleteProfile userEmail={email} />;
}
