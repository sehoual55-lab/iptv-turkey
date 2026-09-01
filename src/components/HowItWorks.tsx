import { ListChecks, MonitorSmartphone, KeyRound, CirclePlay } from 'lucide-react';

const steps = [
  {
    icon: ListChecks,
    title: 'Paketinizi seçin',
    text: 'Süre ve eş zamanlı bağlantı ihtiyacınıza göre uygun planı belirleyin.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Uyumlu cihazınızı belirleyin',
    text: 'Smart TV, Android TV, Fire TV Stick, mobil cihaz veya bilgisayar arasından seçim yapın.',
  },
  {
    icon: KeyRound,
    title: 'Kurulum bilgilerini alın',
    text: 'Abonelik bilgileriniz ve cihazınıza uygun kurulum adımları sizinle paylaşılır.',
  },
  {
    icon: CirclePlay,
    title: 'İzlemeye başlayın',
    text: 'Oynatıcıyı yapılandırdıktan sonra kanal listeniz ve program rehberi hazır olur.',
  },
];

/**
 * Four ordered steps.
 *
 * A rail runs through the step nodes to show progression: horizontal on wide
 * screens, vertical on narrow ones. The numerals are structural here because
 * the content genuinely is a sequence.
 */
export function HowItWorks() {
  return (
    <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {/* Rail — decorative, so it stays out of the accessibility tree. */}
      <div
        aria-hidden="true"
        className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-gradient-to-r from-brand-500/70 via-brand-500/25 to-navy-500/40 lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-8 top-8 w-px bg-gradient-to-b from-brand-500/70 via-brand-500/20 to-transparent sm:hidden"
      />

      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <li key={step.title} className="group relative">
            {/* Node sits on the rail; the opaque background cuts the line. */}
            <div className="relative z-10 mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-navy-600 bg-navy-800 shadow-card transition-colors group-hover:border-brand-500/60">
              <Icon aria-hidden="true" className="h-6 w-6 text-brand-400" />
              <span className="absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 font-display text-xs font-bold text-white">
                {i + 1}
              </span>
            </div>

            <div className="relative">
              {/* Oversized ghost numeral, purely typographic depth. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 right-0 select-none font-display text-7xl font-extrabold leading-none text-white/[0.035]"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="font-display text-lg font-bold text-paper">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist">{step.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
