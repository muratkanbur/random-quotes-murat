import { auth0 } from "@/lib/auth0";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export async function TopNavigation() {
  const session = await auth0.getSession();

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 mx-auto">
        <NavigationMenu className="max-w-none">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href="/" />}
                className={navigationMenuTriggerStyle()}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            {!!session ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<Link href="/user/quotes/liked" />}
                    className={navigationMenuTriggerStyle()}
                  >
                    Liked Quotes
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<Link href="/user/profile" />}
                    className={navigationMenuTriggerStyle()}
                  >
                    Profile
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<a href="/auth/logout" />}
                    className={navigationMenuTriggerStyle()}
                  >
                    Log out
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<a href="/auth/login" />}
                    className={navigationMenuTriggerStyle()}
                  >
                    Log in
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<a href="/auth/login?screen_hint=signup" />}
                    className={navigationMenuTriggerStyle()}
                  >
                    Sign up
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <ThemeToggle />
      </div>
    </header>
  );
}
