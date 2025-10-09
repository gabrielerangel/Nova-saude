
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Declaração de Acessibilidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <p>
            O AgendaSaúde está empenhado em garantir a acessibilidade digital para pessoas com deficiência. Estamos continuamente melhorando a experiência do usuário para todos e aplicando os padrões de acessibilidade relevantes.
          </p>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Nosso Compromisso</h2>
            <p>
              Nosso objetivo é estar em conformidade com as Diretrizes de Acessibilidade para Conteúdo Web (WCAG) 2.1 no nível AA. Essas diretrizes explicam como tornar o conteúdo da web mais acessível para pessoas com deficiência.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Medidas de Suporte</h2>
            <p>
              O AgendaSaúde toma as seguintes medidas para garantir a acessibilidade:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Incluímos a acessibilidade como parte de nossa missão.</li>
              <li>Integramos a acessibilidade em nossas práticas de desenvolvimento.</li>
              <li>Realizamos testes de acessibilidade regulares.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Compatibilidade</h2>
            <p>
              Esta aplicação foi projetada para ser compatível com as principais tecnologias assistivas e navegadores modernos.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Tecnologias Utilizadas</h2>
            <p>
              A acessibilidade deste site depende das seguintes tecnologias para funcionar com a combinação específica de navegador da web e quaisquer tecnologias assistivas ou plugins instalados em seu computador:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>HTML</li>
              <li>WAI-ARIA</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
          </div>
           <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Feedback</h2>
            <p>
              Agradecemos seu feedback sobre a acessibilidade do AgendaSaúde. Por favor, nos informe se encontrar barreiras de acessibilidade através do email: <a href="mailto:acessibilidade@agendasaude.com" className="text-primary underline">acessibilidade@agendasaude.com</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
