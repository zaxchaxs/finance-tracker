import TextInputControler from "@/components/inputControler/TextInputControler";
import { Button } from "@/components/ui/button";
import DescriptionSection from "@/components/ui/Description";
import { Form, FormField } from "@/components/ui/form";
import useToast from "@/hooks/useToast";
import { loginWithEmailAndPassword, registerWithGithub, registerWithGoogle } from "@/libs/firestoreMethods";
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

  const { pushToast, updateToast } = useToast();

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
      isLoading: true,
    });

    try {
      const email = form.getValues("email");
      const password = form.getValues("password");
      await loginWithEmailAndPassword(email, password);
      updateToast({
        toastId,
        message: "",
      });
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

  const handleSignInWithGoole = async () => {
    setLoading(true);
    const toastId = pushToast({
      message: "Loading...",
      isLoading: true,
    });
    
    try {
      await registerWithGoogle();
      updateToast({
        toastId,
        message: "Login with Google successfully",
      });
      router.push("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something wrong!"
      updateToast({
        toastId,
        message,
        isError: true 
      })
    } finally {
      setLoading(false);
    }
  }

  const handleSignInWithGithub = async () => {
    setLoading(true);
    const toastId = pushToast({
      message: "Loading...",
      isLoading: true,
    });
    
    try {
      await registerWithGithub();
      updateToast({
        toastId,
        message: "Login with Github successfully",
      });
      router.push("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something wrong!"
      updateToast({
        toastId,
        message,
        isError: true 
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full rounded-t-5xl p-6 bg-primary/40 flex flex-col gap-4">
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
          <Button disabled={loading} normalBtn className="w-fit">
          Sign In
        </Button>
        </form>
      </Form>
      <div className="flex flex-col gap-4 items-center">
        <DescriptionSection>Or login with</DescriptionSection>
        <div className="flex gap-4 items-center">
          <Button disabled={loading} normalBtn variant={"destructive"} onClick={handleSignInWithGoole}>
            Google
          </Button>
          <Button className="bg-gray-800 group-hover:bg-gray-700" disabled={loading} normalBtn variant={"default"} onClick={handleSignInWithGithub}>
            Github
          </Button>
        </div>
        <Link href={"/signUp"}>
          <DescriptionSection className="text-blue-600 underline">
            Need an account?
          </DescriptionSection>
        </Link>
      </div>
      <div className="h-screen" />
    </div>
  );
}
