
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { CalendarCheck, History, Wallet, Stethoscope } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm">
        <Link href="/" className="flex items-center justify-center">
            <Logo />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
             <Link href="/login">Acessar Plataforma</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
               <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Sua saúde, organizada em um só lugar.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    O AgendaSaúde simplifica o gerenciamento de suas consultas médicas, permitindo que você agende, acompanhe e pague tudo de forma fácil e segura.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                   <Button size="lg" asChild>
                     <Link href="/login">Comece agora</Link>
                   </Button>
                </div>
              </div>
              <img
                src="https://picsum.photos/seed/landing/600/400"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="medical professional computer"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Funcionalidades para facilitar sua vida</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tudo o que você precisa para ter controle total sobre seus compromissos médicos.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              <div className="grid gap-1 text-center">
                 <div className="flex justify-center items-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                       <CalendarCheck className="h-8 w-8 text-primary" />
                    </div>
                 </div>
                <h3 className="text-lg font-bold">Agendamento Simplificado</h3>
                <p className="text-sm text-muted-foreground">Encontre médicos, escolha o melhor horário e agende sua consulta em poucos cliques.</p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="flex justify-center items-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                       <History className="h-8 w-8 text-primary" />
                    </div>
                 </div>
                <h3 className="text-lg font-bold">Histórico Completo</h3>
                <p className="text-sm text-muted-foreground">Acesse todo o seu histórico de consultas, passadas e futuras, de forma organizada.</p>
              </div>
              <div className="grid gap-1 text-center">
                 <div className="flex justify-center items-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                       <Wallet className="h-8 w-8 text-primary" />
                    </div>
                 </div>
                <h3 className="text-lg font-bold">Gestão Financeira</h3>
                <p className="text-sm text-muted-foreground">Visualize seus custos médicos, controle seus gastos e realize pagamentos online.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} AgendaSaúde. Todos os direitos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/accessibility" className="text-xs hover:underline underline-offset-4">
            Acessibilidade
          </Link>
        </nav>
      </footer>
    </div>
  );
}
