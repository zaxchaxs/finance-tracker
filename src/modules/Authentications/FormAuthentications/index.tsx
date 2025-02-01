import TextInputControler from "@/components/inputControler/TextInputControler";
import { Button } from "@/components/ui/button";
import DescriptionSection from "@/components/ui/Description";
import { Form, FormField } from "@/components/ui/form";
import useToast from "@/hooks/useToast";
import { loginWithEmailAndPassword } from "@/libs/firestoreMethods";
import { signInSchema } from "@/types/authenticationModel";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignInForm() {
      const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {pushToast, updateToast} = useToast();

    
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    reValidateMode: "onSubmit",
    shouldFocusError: true,
  });

  const handleSignIn = async () => {
    setLoading(true);
    const toastId = pushToast({
        message: "Loading...",
        isLoading: true
    });

    try {
      const email = form.getValues("email");
      const password = form.getValues("password");
      await loginWithEmailAndPassword(email, password);
      updateToast({
          toastId,
        message: "",
      })
      router.push("/dashboard");
    } catch (error) {
        updateToast({
          toastId,
          message: "Incorrect Email or Password",
          isError: true,
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full rounded-t-5xl p-6 bg-primary/40">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSignIn)}
          className="flex flex-col gap-6 items-center justify-center h-full text-primary"
        >
          <div className="flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <TextInputControler
                  {...field}
                  label="Email"
                  placeholder="Email"
                  className="text-primary"
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <TextInputControler
                  {...field}
                  label="Password"
                  placeholder="Password"
                  className="text-primary"
                  type="password"
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <Button disabled={loading} normalBtn className="w-fit">Sign In</Button>
            <DescriptionSection>Or login with</DescriptionSection>
            <div className="flex gap-4 items-center">
              <Button disabled={loading} normalBtn variant={"destructive"}>Google</Button>
              <Button disabled={loading} normalBtn variant={"secondary"}>Github</Button>
            </div>
            <Link href={"signUp"}>
              <DescriptionSection className="text-blue-600 underline">
                Need an account?
              </DescriptionSection>
            </Link>
          </div>
        </form>
      </Form>
      <div className="h-screen" />
    </div>
  );
}