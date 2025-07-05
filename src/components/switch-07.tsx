"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils";
import { MoonIcon, SunMediumIcon } from "lucide-react";

// Replace the `Switch` component in `@components/ui/switch` with below component and use it here to support this customization.
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    icon?: React.ReactNode;
    thumbClassName?: string;
  }
>(({ className, icon, thumbClassName, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none flex h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 items-center justify-center",
        thumbClassName
      )}
    >
      {icon ? icon : null}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const {theme, setTheme} = useTheme();

  React.useEffect(() => {
    if(isDarkMode){
      setTheme("dark")
    } else {
      setTheme("light")
    }
  },[isDarkMode])

  return (
    <Switch
      icon={
        isDarkMode ? (
          <MoonIcon className="h-4 w-4" />
        ) : (
          <SunMediumIcon className="h-4 w-4" />
        )
      }
      checked={isDarkMode}
      onCheckedChange={setIsDarkMode}
      className="h-7 w-12 hidden md:block"
      thumbClassName="h-6 w-6 data-[state=checked]:translate-x-5"
    />
  );
};

export default ThemeSwitch;
