import { HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ isDark = false }: { isDark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <HeartPulse className={cn("h-7 w-7", isDark ? "text-primary" : "text-primary")} />
      <h1 className={cn("text-xl font-bold tracking-tight", isDark ? "text-sidebar-foreground" : "text-foreground")}>
        AgendaSaúde
      </h1>
    </div>
  );
}
