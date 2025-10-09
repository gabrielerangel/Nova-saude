import { HeartPulse } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <HeartPulse className="h-7 w-7 text-primary" />
      <h1 className="text-xl font-bold text-primary-foreground tracking-tight">
        AgendaSaúde
      </h1>
    </div>
  );
}
