import { Button } from "@/components/ui/button";
import { logout } from "@/libs/auth";

export default function SettingPageModule () {
    return (
      <main className="min-h-screen text-base relative w-full flex flex-col gap-3">
        <div className="w-full p-4 flex flex-col items-center gap-4 relative z-10">
            <Button onClick={logout} variant={"destructive"}>Logout</Button>
        </div>
      </main>
    );
}