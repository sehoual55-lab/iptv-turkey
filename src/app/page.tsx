import Link from 'next/link';
import Image from 'next/image';
import {
  Wrench, Layers, CalendarClock, Users, Headphones, Gauge,
  Tv, MonitorPlay, Radio, Smartphone, ArrowRight, Clock,
} from 'lucide-react';
import { Section } from '@/components/Section';
import { Eyebrow, AccentHeading } from '@/components/Eyebrow';
import { StatStrip } from '@/components/StatStrip';
import { DeviceGrid } from '@/components/DeviceGrid';
import { HowItWorks } from '@/components/HowItWorks';
import { CheckoutTrigger } from '@/components/CheckoutTrigger';
import { TurkishFlag } from '@/components/TurkishFlag';
import { PricingGrid } from '@/components/PricingGrid';
import { FAQAccordion } from '@/components/FAQAccordion';
import { BlogCard } from '@/components/BlogCard';
import { StructuredData } from '@/components/StructuredData';
import { homepageFaqs } from '@/data/faq-data';
import { articlesByDate } from '@/data/blog-data';
import { whatsappLink } from '@/data/site-config';
import { pageMetadata, faqSchema, serviceSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'IPTV Turkey | Türkiye IPTV Paketleri ve Kurulum Rehberi',
  description:
    'IPTV Turkey paketlerini, uyumlu cihazları ve Türkçe kurulum rehberlerini keşfedin. Smart TV, Android TV ve Fire TV Stick için esnek çözümleri karşılaştırın.',
  path: '/',
});

const benefits = [
  { icon: Wrench, title: 'Kolay kurulum', text: 'Cihazınıza uygun oynatıcıyı kurup abonelik bilgilerinizi girmeniz yeterlidir. Ortalama kurulum beş ila on dakika sürer.' },
  { icon: Layers, title: 'Esnek paket seçenekleri', text: '3, 6, 12 ve 24 aylık süreler arasından ihtiyacınıza uyan planı seçebilir, ek bağlantı talep edebilirsiniz.' },
  { icon: CalendarClock, title: 'Program rehberi desteği', text: 'Elektronik program rehberi (EPG) sayesinde hangi yayının ne zaman başlayacağını kanal listesinde görebilirsiniz.' },
  { icon: Users, title: 'Çoklu cihaz uyumluluğu', text: 'Aboneliğinizi televizyon, telefon, tablet ve bilgisayara kurabilirsiniz. Eş zamanlı izleme paketinize bağlıdır.' },
  { icon: Headphones, title: 'Müşteri desteği', text: 'Kurulum ve bağlantı sorunlarında WhatsApp üzerinden Türkçe destek alabilirsiniz.' },
  { icon: Gauge, title: 'HD ve FHD kalite', text: 'Cihazınız, bağlantınız ve lisanslı kaynak desteklediği ölçüde HD ve Full HD çözünürlükte izleme yapılabilir.' },
];

const explainerPoints = [
  {
    title: 'Bir M3U oynatma listesi',
    text: 'Aboneliğiniz bir oynatma listesi olarak gelir: IPTV standardı olan M3U biçiminde bir bağlantı veya dosya. Bu liste, oynatıcı uygulamanıza yayınları nereden alacağını söyler. Yanında cihazınıza uygun kurulum rehberi de iletilir.',
  },
  {
    title: 'Kendi cihazlarınızda',
    text: 'Smart TV, Fire TV Stick, Android TV, Apple TV, telefon, tablet veya bilgisayar: izlediğiniz her yere kurabilirsiniz. Aynı anda kaç ekranda açabileceğiniz seçtiğiniz pakete bağlıdır, bir ile beş arasında değişir.',
  },
  {
    title: 'WhatsApp üzerinden sipariş',
    text: 'Hesap oluşturmanız gerekmez ve bu sitede hiçbir ödeme bilgisi girilmez. Paketi seçersiniz, düğme WhatsApp\'ı siparişiniz yazılmış hâlde açar ve konuşma gerçek bir kişiyle başlar.',
  },
];

const guides = [
  { href: '/kurulum/smart-tv/', icon: Tv, label: 'Smart TV', note: 'Samsung Tizen ve LG webOS modelleri için adım adım kurulum.', minutes: 6 },
  { href: '/kurulum/android-tv/', icon: MonitorPlay, label: 'Android TV', note: 'Android TV ve Google TV cihazlarında oynatıcı kurulumu.', minutes: 5 },
  { href: '/kurulum/fire-tv-stick/', icon: Radio, label: 'Fire TV Stick', note: 'Amazon Fire TV çubuk ve kutularında hızlı kurulum.', minutes: 5 },
  { href: '/kurulum/mobil/', icon: Smartphone, label: 'Mobil cihazlar', note: 'Android ve iOS telefon ile tabletlerde kurulum.', minutes: 4 },
];

export default function HomePage() {
  const latest = articlesByDate.slice(0, 6);

  return (
    <>
      <StructuredData data={[serviceSchema(), faqSchema(homepageFaqs)]} />

      {/* 1 — Announcement bar */}
      <div className="border-b border-navy-600 bg-navy-800">
        <div className="shell py-2.5">
          <p className="text-center text-sm text-mist">
            Smart TV, Android TV, Fire TV Stick ve mobil cihazlarla uyumludur. Kurulum
            sırasında destek ekibimiz size yardımcı olur.
          </p>
        </div>
      </div>

      {/* 2 — Hero */}
      <section className="relative overflow-hidden border-b border-navy-600">
        <div className="shell py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>IPTV Turkey • Abonelik</Eyebrow>
              <AccentHeading
                as="h1"
                text="IPTV Turkey: Türkiye için *esnek* ve güvenilir IPTV deneyimi."
                className="text-display-lg"
              />
              <p className="mt-6 max-w-prose text-lead text-mist">
                Smart TV, Android TV, Fire TV Stick, telefon, tablet ve bilgisayarınızda
                kullanabileceğiniz esnek IPTV çözümlerini keşfedin. Çanak anten yok,
                teknisyen kurulumu yok — yalnızca internet bağlantınız.
              </p>
              <p className="mt-4 max-w-prose text-mist">
                Paketinizi seçin, siparişinizi WhatsApp üzerinden iletin, kurulum
                bilgilerinizi alın ve izlemeye başlayın. Sorularınıza Türkçe yanıt veren
                gerçek bir kişi eşlik eder.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/paketler/" className="btn-primary">Paketleri İncele</Link>
                <a
                  href={whatsappLink('Merhaba, IPTV Turkey abonelikleri hakkında bilgi almak istiyorum.')}
                  className="btn-secondary"
                >
                  WhatsApp&apos;tan Yazın
                </a>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-sm text-mist">
                <li>Hızlı kurulum</li>
                <li>Çoklu cihaz</li>
                <li>HD ve FHD desteği</li>
                <li>Türkçe destek</li>
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-card border border-navy-600 shadow-lift">
                <TurkishFlag className="block w-full" />
              </div>
            </div>
          </div>

          <div className="mt-14">
            <StatStrip
              items={[
                { value: 'M3U', label: 'Standart oynatma listesi' },
                { value: '1 – 5', label: 'Eş zamanlı bağlantı' },
                { value: 'FHD / HD', label: 'Kaynağa bağlı olarak' },
                { value: '7/24', label: 'WhatsApp destek hattı' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Subscription explainer — a genuine three-part sequence */}
      <Section
        eyebrow="Abonelik"
        headingId="abonelik"
        title="IPTV aboneliği *sade* biçimde, üç maddede"
        intro="Rakam yığınları yerine, tam olarak ne aldığınızı ve onunla ne yapacağınızı anlatıyoruz."
      >
        <ol className="grid gap-5 md:grid-cols-3">
          {explainerPoints.map((point, i) => (
            <li key={point.title} className="card p-6">
              <span className="font-display text-2xl font-extrabold text-navy-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{point.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 3 — Device compatibility */}
      <Section
        eyebrow="Uyumluluk"
        headingId="cihaz-uyumlulugu"
        title="*Uyumlu* cihazlar"
        intro="Uyumlu bir oynatıcı uygulaması kurulabilen her cihaz oynatma listenizi açabilir. Türkiye'de en yaygın kullanılan platformlar aşağıdadır."
      >
        <DeviceGrid />
      </Section>

      {/* 4 — Benefits */}
      <Section
        eyebrow="Neden biz"
        headingId="hizmet-ozellikleri"
        title="Bizi *seçmeniz* için altı neden"
        intro="Abartılı vaatler yerine, hizmetin gerçekte ne sunduğunu açıkça belirtiyoruz."
        className="border-y border-navy-600 bg-navy-800"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6">
              <Icon aria-hidden="true" className="h-5 w-5 text-brand-400" />
              <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5 — How it works (a genuine sequence, so it is numbered) */}
      <Section eyebrow="Adımlar" headingId="nasil-calisir" title="*Nasıl* çalışır?">
        <HowItWorks />
      </Section>

      {/* 6 — Pricing preview */}
      <Section
        eyebrow="Tarifeler"
        headingId="paketler"
        wide
        title="*IPTV aboneliğinizi* seçin"
        intro="Tüm paketler varsayılan olarak tek eş zamanlı bağlantı içerir. Ek bağlantı talep edebilirsiniz."
        className="border-y border-navy-600 bg-navy-800"
      >
        <PricingGrid />
        <p className="mt-10 text-sm text-mist">
          Sipariş öncesi uyumluluk veya süre hakkında sorunuz mu var?{' '}
          <a
            href={whatsappLink('Merhaba, paketler hakkında bir sorum var.')}
            className="text-brand-300 underline underline-offset-2 hover:text-brand-400"
          >
            WhatsApp üzerinden yazın
          </a>
          .
        </p>
        <p className="mt-6">
          <Link href="/paketler/" className="font-display text-sm font-semibold text-brand-300 hover:text-brand-400">
            Paket ayrıntılarını karşılaştır
          </Link>
        </p>
      </Section>

      {/* 7 — SEO content */}
      <Section eyebrow="Rehber" headingId="neden-iptv-turkey" title="Türkiye'de IPTV: *gerçekte* nasıl çalışır">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-4 text-mist lg:col-span-7">
          <p>
            Türkiye’de internet üzerinden televizyon izleme alışkanlığı hızla yaygınlaşıyor.
            Fiber altyapının genişlemesi ve Smart TV sahipliğinin artmasıyla birlikte, uydu
            anteni kurmadan içerik izlemek çoğu hane için pratik bir seçenek hâline geldi.
            IPTV Turkey olarak yaptığımız iş bu noktada başlıyor: teknolojiyi anlaşılır
            kılmak, kurulumu kolaylaştırmak ve beklentileri gerçekçi biçimde yönetmek.
          </p>
          <p>
            Bir IPTV hizmeti seçerken en çok karşılaşılan sorun, abartılı vaatlerdir.
            “Kesintisiz”, “sınırsız” veya “garantili” gibi ifadeler kulağa güven verici gelse
            de teknik gerçeklikle örtüşmez. İzleme kalitesi üç değişkene bağlıdır: cihazınızın
            donanımı, internet bağlantınızın kararlılığı ve yayının alındığı lisanslı kaynak.
            Bu üçünden biri zayıfsa sonuç etkilenir. Bu nedenle sitemizde performans garantisi
            vermiyor, bunun yerine bağlantınızın ve cihazınızın nasıl hazırlanması gerektiğini
            ayrıntılı olarak anlatıyoruz.
          </p>
          <p>
            İkinci önemli konu yasal çerçevedir. IPTV teknolojisinin kendisi tamamen
            yasaldır; belirsizlik, iletilen içeriğin yayın haklarından kaynaklanır. İnternette
            dolaşan ücretsiz kod ve liste paylaşımları hem hukuki risk hem de ciddi güvenlik
            riski taşır. Bilinmeyen sunuculara bağlanmak, cihazınızı zararlı yazılıma ve
            kimlik avı girişimlerine açık hâle getirir. Bu yüzden sitemizde herhangi bir
            oynatma listesi, kod veya erişim bilgisi yayımlamıyoruz; bu konuları yalnızca
            eğitici içeriklerimizde, riskleri açıklamak amacıyla ele alıyoruz.
          </p>
          <p>
            Üçüncüsü ise destektir. Kurulum sırasında yaşanan sorunların büyük bölümü ağ
            ayarlarından ya da cihazdaki uygulama sürümünden kaynaklanır ve doğru yönlendirmeyle
            birkaç dakikada çözülür. WhatsApp destek hattımız tam olarak bunun içindir. Abone
            olmadan önce cihazınızın uyumlu olup olmadığından emin değilseniz model adını
            yazmanız yeterli; uygun değilse sorunu çözen daha ekonomik bir yol önerebiliriz.
          </p>
        </div>

          <figure className="lg:col-span-5">
            <div className="overflow-hidden rounded-card border border-navy-600 shadow-lift lg:sticky lg:top-24">
              <Image
                src="/images/iptv-turkiye-salon.webp"
                alt="Türk bayrağının yanında duran bir Smart TV ekranında IPTV arayüzü: canlı yayın, dizi ve film kategorileri satırlar hâlinde listeleniyor."
                width={1000}
                height={1250}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-haze">
              Görsel temsilîdir. Ekranda görünen içerikler örnek amaçlı oluşturulmuştur ve
              gerçek bir yayın akışını göstermez.
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* 8 — Installation preview */}
      <Section
        eyebrow="Kurulum"
        headingId="kurulum-rehberleri"
        title="*Kurulum* rehberleri"
        intro="Cihazınıza uygun rehberi açarak adım adım ilerleyebilirsiniz."
        className="border-y border-navy-600 bg-navy-800"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.href}
                href={guide.href}
                className="group card flex flex-col p-6 transition-colors hover:border-brand-500/50"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-navy-600 bg-navy-900 transition-colors group-hover:border-brand-500/50">
                  <Icon aria-hidden="true" className="h-5 w-5 text-brand-400" />
                </span>

                <h3 className="mt-5 font-display text-lg font-bold text-paper">{guide.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{guide.note}</p>

                <span className="mt-5 flex items-center justify-between border-t border-navy-600 pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-haze">
                    <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                    {guide.minutes} dakika
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-brand-300">
                    Rehberi aç
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* 9 — Latest posts */}
      {latest.length > 0 && (
        <Section
          eyebrow="Blog"
          headingId="blog"
          title="Blogdan *son* yazılar"
          intro="Kurulum, cihaz seçimi ve güvenlik konularında Türkçe rehberler."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>
          <p className="mt-8">
            <Link href="/blog/" className="font-display text-sm font-semibold text-brand-300 hover:text-brand-400">
              Tüm yazıları gör
            </Link>
          </p>
        </Section>
      )}

      {/* 10 — FAQ */}
      <Section
        eyebrow="SSS"
        headingId="sss"
        title="*IPTV* hakkında sorularınız"
        intro="Aklınıza takılanların çoğunun yanıtı burada. Bulamazsanız WhatsApp üzerinden sorabilirsiniz."
        center
        className="border-y border-navy-600 bg-navy-800"
      >
        <div className="mx-auto max-w-3xl">
          <FAQAccordion faqs={homepageFaqs} />
          <p className="mt-8 text-center">
            <Link href="/sss/" className="font-display text-sm font-semibold text-brand-300 hover:text-brand-400">
              Tüm soruları gör
            </Link>
          </p>
        </div>
      </Section>

      {/* 11 — Final CTA */}
      <Section headingId="son-adim">
        <div className="card p-8 sm:p-12">
          <AccentHeading
            id="son-adim"
            text="Size uygun paketi seçin, kurulumu birlikte *tamamlayalım*"
            className="max-w-2xl text-display-sm"
          />
          <p className="mt-4 max-w-prose text-mist">
            Hangi paketin size uygun olduğundan emin değilseniz cihazınızı ve kaç kişinin
            izleyeceğini yazmanız yeterli; uygun süreyi birlikte belirleyelim.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CheckoutTrigger className="btn-primary">Abone Ol</CheckoutTrigger>
            <a
              href={whatsappLink('Merhaba, hangi paketin bana uygun olduğunu öğrenmek istiyorum.')}
              className="btn-secondary"
            >
              WhatsApp&apos;tan Yazın
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
