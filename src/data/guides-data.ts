/**
 * Installation guides.
 *
 * One entry per device family. Steps are deliberately generic: menu names move
 * between firmware versions, so the guides describe the shape of the process
 * rather than promising an exact button path.
 */

export type Guide = {
  slug: string;
  name: string;
  title: string;
  seoTitle: string;
  description: string;
  /** Short line for the hub and card listings. */
  summary: string;
  minutes: number;
  devices: string[];
  steps: { title: string; text: string }[];
  tips: string[];
  troubleshooting: { problem: string; fix: string }[];
};

export const guides: Guide[] = [
  {
    slug: 'smart-tv',
    name: 'Smart TV',
    title: 'Smart TV IPTV Kurulumu',
    seoTitle: 'Smart TV IPTV Kurulumu: Samsung ve LG Rehberi | IPTV Turkey',
    description:
      'Samsung Tizen ve LG webOS televizyonlarda IPTV kurulumunu adım adım anlatan Türkçe rehber. Uygulama seçimi, abonelik bilgilerinin girilmesi ve sık karşılaşılan sorunlar.',
    summary: 'Samsung Tizen ve LG webOS modelleri için adım adım kurulum.',
    minutes: 6,
    devices: ['Samsung (Tizen)', 'LG (webOS)', 'Philips ve Sony Smart TV'],
    steps: [
      {
        title: 'Televizyonu internete bağlayın',
        text: 'Mümkünse Ethernet kablosu kullanın. Kablo çekemiyorsanız modemin 5 GHz Wi-Fi bandını seçin; 2,4 GHz bandı daha uzağa ulaşır ama komşu ağların yoğunluğundan çok daha fazla etkilenir.',
      },
      {
        title: 'Uygulama mağazasından oynatıcıyı kurun',
        text: 'Televizyonun kendi mağazasını açın ve uyumlu bir IPTV oynatıcısı arayın. Hangi uygulamanın modelinize uygun olduğundan emin değilseniz destek hattımıza model adını yazın.',
      },
      {
        title: 'Cihaz kimliğini not edin',
        text: 'Bazı oynatıcılar ilk açılışta ekranda bir cihaz kimliği veya anahtar gösterir. Bu bilgiyi not edin; aboneliğinizin tanımlanması için gerekebilir.',
      },
      {
        title: 'Abonelik bilgilerinizi girin',
        text: 'Size iletilen oynatma listesi adresini veya sunucu bilgilerinizi ilgili alana girin. Uzun adresi kumandayla yazmak yerine telefonunuzdan kopyalayın; tek karakterlik hata listenin yüklenmemesine yol açar.',
      },
      {
        title: 'Listenin yüklenmesini bekleyin',
        text: 'Geniş listelerde ilk yükleme yarım dakikayı bulabilir. Kanallar geldikten sonra program rehberi adresini tanımlayın ve saat dilimini İstanbul olarak ayarlayın.',
      },
    ],
    tips: [
      '2016 öncesi modellerde mağaza güncel oynatıcıları desteklemeyebilir. Televizyonu değiştirmek yerine HDMI girişine takılan bir Android TV kutusu veya Fire TV Stick çok daha ekonomiktir.',
      'Kanal sıralamasını değiştirmek isterseniz listeyi düzenlemek yerine oynatıcının favoriler özelliğini kullanın; liste yenilendiğinde düzenlemeleriniz kaybolur.',
    ],
    troubleshooting: [
      { problem: 'Liste hiç yüklenmiyor', fix: 'Adresi yeniden kopyalayın, baş ve sondaki boşlukları silin.' },
      { problem: 'Görüntü sık donuyor', fix: 'Ethernet deneyin veya 5 GHz bandına geçin, indirme yapan cihazları kapatın.' },
      { problem: 'Program rehberi boş', fix: 'Oynatıcıda EPG adresinin tanımlı olduğunu kontrol edin.' },
    ],
  },
  {
    slug: 'android-tv',
    name: 'Android TV',
    title: 'Android TV ve Google TV IPTV Kurulumu',
    seoTitle: 'Android TV IPTV Kurulumu: Adım Adım Türkçe Rehber | IPTV Turkey',
    description:
      'Android TV ve Google TV cihazlarında IPTV kurulumu: uygulama seçimi, abonelik bilgilerinin girilmesi, performans ayarları ve sorun giderme.',
    summary: 'Android TV ve Google TV cihazlarında oynatıcı kurulumu.',
    minutes: 5,
    devices: ['Android TV kutuları', 'Google TV', 'Chromecast (Google TV)', 'Sony ve Philips Android TV'],
    steps: [
      {
        title: 'Google Play üzerinden oynatıcıyı kurun',
        text: 'Android TV, uygulama çeşitliliği en geniş platformdur. Uygulamaları resmî mağazadan kurun; internette dolaşan APK dosyaları denetimden geçmediği için cihazınızı gereksiz riske sokar.',
      },
      {
        title: 'Uygulamayı açın ve profil oluşturun',
        text: 'Çoğu oynatıcı ilk açılışta bir profil veya liste eklemenizi ister. Profile tanıyacağınız bir ad verin.',
      },
      {
        title: 'Abonelik bilgilerinizi tanımlayın',
        text: 'Oynatma listesi adresinizi ya da sunucu adresi, kullanıcı adı ve şifrenizi girin. Cihazınızda hangi yöntemin kullanılacağını sipariş sonrasında sizinle paylaşıyoruz.',
      },
      {
        title: 'EPG ve saat dilimini ayarlayın',
        text: 'Program rehberi adresini tanımlayın, ardından cihaz ayarlarından saat dilimini İstanbul yapın. Rehber görünüp saatler kaymışsa sorun neredeyse her zaman saat dilimidir.',
      },
    ],
    tips: [
      'Düşük bellekli kutularda geniş listeler yavaş açılır. Oynatıcının önbelleğini temizlemek ve kullanmadığınız kategorileri gizlemek belirgin fark yaratır.',
      'Kutuyu televizyonun arkasındaki dar boşluğa sıkıştırmayın; ısınma ve zayıf Wi-Fi sinyali birlikte gelir.',
    ],
    troubleshooting: [
      { problem: 'Uygulama açılışta kapanıyor', fix: 'Uygulama önbelleğini temizleyin, cihazı yeniden başlatın.' },
      { problem: 'Arayüz çok yavaş', fix: 'Kullanmadığınız kategorileri gizleyin, arka plandaki uygulamaları kapatın.' },
      { problem: 'Bağlantı hatası', fix: 'Aynı aboneliğin başka bir cihazda açık olmadığından emin olun.' },
    ],
  },
  {
    slug: 'fire-tv-stick',
    name: 'Fire TV Stick',
    title: 'Fire TV Stick IPTV Kurulumu',
    seoTitle: 'Fire TV Stick IPTV Kurulumu: Türkçe Rehber | IPTV Turkey',
    description:
      'Amazon Fire TV Stick üzerinde IPTV kurulumu: uygulama kurulumu, abonelik bilgilerinin girilmesi, ısınma ve Wi-Fi sorunlarının çözümü.',
    summary: 'Amazon Fire TV çubuk ve kutularında hızlı kurulum.',
    minutes: 5,
    devices: ['Fire TV Stick', 'Fire TV Stick 4K', 'Fire TV Cube'],
    steps: [
      {
        title: 'Cihazı HDMI girişine takın',
        text: 'Kutudan çıkan HDMI uzatma kablosunu kullanın. Çubuğun televizyonun arkasında sıkışması hem ısınmaya hem de kablosuz sinyalin zayıflamasına yol açar.',
      },
      {
        title: 'Amazon Appstore üzerinden oynatıcıyı kurun',
        text: 'Ana ekrandaki arama alanından uyumlu bir IPTV oynatıcısı arayın ve kurun.',
      },
      {
        title: 'Abonelik bilgilerinizi girin',
        text: 'Oynatma listesi adresinizi veya sunucu bilgilerinizi tanımlayın. Fire TV kumandasıyla uzun adres yazmak zahmetlidir; Fire TV uygulamasının klavyesini telefonunuzdan kullanabilirsiniz.',
      },
      {
        title: 'Kanalları ve rehberi kontrol edin',
        text: 'Liste yüklendikten sonra birkaç kanal açarak görüntüyü test edin, ardından EPG adresini ve saat dilimini ayarlayın.',
      },
    ],
    tips: [
      'Fire TV Stick, yeni başlayanlar için en pratik çözümlerden biridir: uygun fiyatlı, taşınabilir ve her HDMI girişine takılabilir.',
      'Eski bir televizyonunuz varsa çubuk televizyonu yenilemeden IPTV kullanmanızı sağlar; televizyon yalnızca ekran görevi görür.',
    ],
    troubleshooting: [
      { problem: 'Cihaz ısınıyor ve donuyor', fix: 'HDMI uzatma kablosunu kullanın, havalandırmayı engellemeyin.' },
      { problem: 'Wi-Fi zayıf', fix: '5 GHz bandına geçin, çubuğu modeme yakınlaştırın.' },
      { problem: 'Depolama doldu', fix: 'Kullanmadığınız uygulamaları kaldırın, önbelleği temizleyin.' },
    ],
  },
  {
    slug: 'mobil',
    name: 'Mobil cihazlar',
    title: 'Telefon ve Tablette IPTV Kurulumu',
    seoTitle: 'Mobil IPTV Kurulumu: Android ve iOS Rehberi | IPTV Turkey',
    description:
      'Android ve iOS telefon ile tabletlerde IPTV kurulumu. Kurulumu önce telefonda denemenin neden en hızlı yol olduğunu ve mobil veri kullanımını anlatıyoruz.',
    summary: 'Android ve iOS telefon ile tabletlerde kurulum.',
    minutes: 4,
    devices: ['Android telefon ve tablet', 'iPhone ve iPad'],
    steps: [
      {
        title: 'Uygulama mağazasından oynatıcıyı kurun',
        text: 'Google Play veya App Store üzerinden uyumlu bir IPTV oynatıcısı kurun.',
      },
      {
        title: 'Abonelik bilgilerinizi yapıştırın',
        text: 'Bilgiler telefonunuza mesajla ulaştığı için kopyala-yapıştır en kolay yöntemdir. Elle yazmaya gerek yoktur.',
      },
      {
        title: 'Birkaç kanal açarak test edin',
        text: 'Kanallar açılıyorsa abonelik bilgileriniz doğru demektir. Bu, televizyonda sorun çıkarsa nerede arayacağınızı bilmenizi sağlar.',
      },
    ],
    tips: [
      'İlk denemeyi telefonda yapmanızı öneririz. Telefonda çalışıp televizyonda çalışmayan bir kurulum, sorunun abonelik bilgilerinde değil televizyondaki uygulamada veya ağda olduğunu söyler.',
      'Mobil veriyle izlemek hızla kota tüketir. HD bir yayın saatte yaklaşık 2 GB kullanır; mümkün olduğunda Wi-Fi tercih edin.',
    ],
    troubleshooting: [
      { problem: 'Görüntü var ses yok', fix: 'Oynatıcı ayarlarından ses kod çözücüsünü değiştirin.' },
      { problem: 'Arka planda durduruluyor', fix: 'Uygulama için pil optimizasyonunu kapatın.' },
      { problem: 'Veri hızla tükeniyor', fix: 'Wi-Fi kullanın veya oynatıcıdan daha düşük çözünürlük seçin.' },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
