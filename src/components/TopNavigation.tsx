import { auth0 } from "@/lib/auth0";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export async function TopNavigation() {
  const session = await auth0.getSession();

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-3 sm:px-4">
        <NavigationMenu className="max-w-none flex-none justify-start">
          <NavigationMenuList className="flex-none justify-start">
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href="/" />}
                className={`${navigationMenuTriggerStyle()} !px-2 !text-base sm:!px-4`}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            {!!session ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="!px-2 !text-base sm:!px-4">
                    Quotes
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-48">
                    <ul className="flex list-none flex-col gap-1 p-0">
                      <li>
                        <NavigationMenuLink
                          render={<Link href="/user/quotes/liked" />}
                          className="w-full justify-start"
                        >
                          Liked Quotes
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          render={<Link href="/quotes/new" />}
                          className="w-full justify-start"
                        >
                          Add New Quotes
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<Link href="/user/profile" />}
                    className={`${navigationMenuTriggerStyle()} !px-2 !text-base sm:!px-4`}
                  >
                    Profile
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<a href="/auth/logout" />}
                    className={`${navigationMenuTriggerStyle()} !px-2 !text-base sm:!px-4`}
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
                    className={`${navigationMenuTriggerStyle()} !px-2 !text-base sm:!px-4`}
                  >
                    Log in
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    render={<a href="/auth/login?screen_hint=signup" />}
                    className={`${navigationMenuTriggerStyle()} !px-2 !text-base sm:!px-4`}
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
