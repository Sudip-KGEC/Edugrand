import { cn } from "@/lib/utils";

export function Container({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)} {...rest}>
      {children}
    </div>
  );
}
