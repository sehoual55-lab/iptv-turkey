import type { Article } from '../blog-data';

export const iptvTurkeyM3u: Article = {
  slug: 'iptv-turkey-m3u',
  title: 'IPTV Turkey M3U: M3U Bağlantısı Nasıl Çalışır?',
  seoTitle: 'IPTV Turkey M3U: M3U Bağlantısı Nasıl Çalışır? | IPTV Turkey',
  description:
    'M3U biçiminin ne olduğunu, portal girişinden farkını, oynatıcıya nasıl tanımlandığını ve bilinmeyen listelerin taşıdığı güvenlik risklerini açıklıyoruz.',
  excerpt:
    'M3U aslında ne? Portal girişinden farkı nedir, oynatıcıya nasıl tanımlanır ve neden bilinmeyen kaynaklardan liste indirmemek gerekir? Teknik ama sade bir anlatım.',
  publishedAt: '2026-01-28',
  updatedAt: '2026-02-11',
  author: 'IPTV Turkey Editör Ekibi',
  readingMinutes: 7,
  imageAlt: 'Oynatma listesi yapısını temsil eden soyut metin dosyası görseli',
  keyword: 'iptv turkey m3u',
  body: [
    {
      type: 'p',
      text: 'IPTV konusunu araştırmaya başlayan hemen herkes birkaç dakika içinde “M3U” ifadesiyle karşılaşıyor. Kulağa teknik bir terim gibi geliyor, oysa arkasındaki fikir şaşırtıcı derecede basit. Bu yazıda M3U’nun ne olduğunu, aboneliğinizle ilişkisini, oynatıcı uygulamaya nasıl tanımlandığını ve en önemlisi hangi durumlarda ciddi risk taşıdığını anlatıyoruz.',
    },
    {
      type: 'note',
      text: 'Bu yazı eğitici bir içeriktir. Sitemizde hiçbir oynatma listesi bağlantısı, kod veya erişim bilgisi paylaşılmaz.',
    },

    { type: 'h2', text: 'M3U nedir?', id: 'm3u-nedir' },
    {
      type: 'p',
      text: 'M3U, bir oynatma listesi biçimidir. Teknik olarak düz bir metin dosyasıdır: içinde hangi yayının hangi adresten alınacağı, kanalın adı, varsa logosu ve ait olduğu kategori yazar. Dosyanın kendisi görüntü veya ses taşımaz; yalnızca oynatıcıya “şu kanalı çalmak istersen şu adrese git” der.',
    },
    {
      type: 'p',
      text: 'Adı 1990’ların sonundaki müzik oynatıcılarından gelir. O dönemde bilgisayarınızdaki şarkıların sırasını tutan küçük dosyalar M3U uzantısıyla saklanırdı. Bugün aynı mantık, müzik dosyaları yerine canlı yayın akışlarını işaret edecek şekilde kullanılıyor. Yani M3U yeni bir teknoloji değil; olgunlaşmış ve yaygınlaşmış eski bir standart.',
    },
    {
      type: 'p',
      text: 'Buradan çıkan önemli sonuç şudur: M3U bir içerik kaynağı değildir. Bir listenin “dolu” ya da “boş” olması, arkasındaki sunucunun neye erişim verdiğine bağlıdır. Bu ayrımı akılda tutmak, ilerleyen bölümlerdeki güvenlik konusunu anlamayı kolaylaştırır.',
    },

    { type: 'h2', text: 'M3U ile portal girişi arasındaki fark', id: 'portal-farki' },
    {
      type: 'p',
      text: 'Abonelik bilgileriniz size iki farklı biçimde ulaşabilir. Bunların hangisinin kullanılacağı, cihazınıza kurduğunuz oynatıcının desteklediği yönteme göre değişir.',
    },
    {
      type: 'table',
      caption: 'İki tanımlama yönteminin karşılaştırması',
      head: ['', 'M3U bağlantısı', 'Portal / API girişi'],
      rows: [
        ['Girdiğiniz bilgi', 'Tek bir uzun adres', 'Sunucu adresi, kullanıcı adı ve şifre'],
        ['Kanal listesi', 'Dosya indirildiğinde oluşur', 'Uygulama sunucuya sorarak oluşturur'],
        ['Güncelleme', 'Liste yenilendiğinde', 'Genellikle otomatik'],
        ['Kategori yapısı', 'Dosyada nasıl yazılmışsa öyle', 'Sunucudan geldiği gibi'],
        ['Tipik kullanım', 'Basit oynatıcılar, bilgisayarlar', 'Gelişmiş oynatıcı uygulamaları'],
      ],
    },
    {
      type: 'p',
      text: 'Pratikte ikisi de aynı sonuca ulaşır. Portal girişi genellikle daha derli topludur çünkü kategori ve program rehberi bilgisi sunucudan yönetilir. M3U ise daha çok cihaz desteklediği için tercih edilir. Hangisini kullanacağınızı cihazınızın oynatıcısı belirler; destek ekibimiz size cihazınıza uygun olanı iletir.',
    },

    { type: 'h2', text: 'EPG neden ayrı bir konudur?', id: 'epg' },
    {
      type: 'p',
      text: 'EPG, elektronik program rehberidir. Kanal listesinde hangi programın şu anda yayında olduğunu, sonrasında ne başlayacağını gösteren tablodur. EPG çoğu zaman oynatma listesinden ayrı bir adresle gelir ve farklı bir dosya biçimi kullanır.',
    },
    {
      type: 'p',
      text: 'Bu yüzden kanal listeniz sorunsuz çalışırken program rehberi boş görünebilir. Böyle bir durumda ilk kontrol edilecek iki şey vardır: oynatıcıda EPG adresinin tanımlı olup olmadığı ve cihazın saat diliminin doğru ayarlanıp ayarlanmadığı. Saat dilimi yanlışsa rehber görünür, ancak programlar birkaç saat kaymış olarak listelenir.',
    },

    { type: 'h2', text: 'Kurulum sırasında dikkat edilecek noktalar', id: 'kurulum' },
    {
      type: 'ol',
      items: [
        'Bağlantıyı elle yazmak yerine kopyalayıp yapıştırın. Uzun adreslerde tek bir karakter hatası bile listenin yüklenmemesine yol açar.',
        'Adresin başındaki ve sonundaki boşlukları temizleyin. Mesajdan kopyalarken görünmeyen boşluk eklenmesi sık karşılaşılan bir hatadır.',
        'Oynatıcıya listeyi tanımladıktan sonra ilk yüklemenin bitmesini bekleyin. Geniş listelerde bu işlem yarım dakikayı bulabilir.',
        'Kanallar geldiyse EPG adresini de tanımlayın ve saat dilimini kontrol edin.',
        'Aboneliğinizi yalnızca kendi cihazlarınızda kullanın. Aynı bilgiyle birden fazla yerden bağlanmak bağlantı hatası üretir.',
      ],
    },
    {
      type: 'p',
      text: 'Liste yüklenmiyorsa sorun genellikle üç yerden birindedir: adres yanlış kopyalanmıştır, internet bağlantısı o an kararsızdır ya da oynatıcı o biçimi desteklemiyordur. Destek ekibimize yazarken cihaz modelini ve ekrandaki hata mesajını paylaşırsanız hangisi olduğunu hızlıca ayırt edebiliriz.',
    },

    { type: 'h2', text: 'Bilinmeyen listeler neden risklidir?', id: 'guvenlik' },
    {
      type: 'p',
      text: 'İnternette “ücretsiz M3U listesi” aramak birkaç saniye sürer ve karşınıza yüzlerce sonuç çıkar. Bu listelerin cazip görünmesi anlaşılır bir durum, ancak taşıdıkları riskler çoğu kullanıcının tahmin ettiğinden fazladır.',
    },
    {
      type: 'ul',
      items: [
        'Zararlı yazılım: Liste dosyasıyla birlikte önerilen “özel oynatıcı” uygulamaları, resmî mağaza dışından kurulduğu için denetimden geçmez.',
        'Kimlik avı: Bazı siteler listeyi indirmek için hesap açmanızı ister ve topladıkları e-posta ile şifreleri başka servislerde dener.',
        'Çalınmış hesaplar: Dolaşımdaki listelerin bir kısmı, başkasının ödediği aboneliklerden sızdırılmış erişim bilgileridir.',
        'Kararsız yayın: Kaynağı belirsiz sunucular sık sık kapanır; bugün çalışan bir liste yarın yanıt vermeyebilir.',
        'Hukuki risk: Lisanssız dağıtılan içeriğe erişim, bilerek kullanan taraf açısından da sorumluluk doğurabilir.',
      ],
    },
    {
      type: 'p',
      text: 'Bu nedenle sitemizde hiçbir oynatma listesi bağlantısı yayımlamıyoruz ve bilinmeyen kaynaklardan indirilen listeleri kullanmanızı önermiyoruz. Meşru bir hizmette abonelik bilgileri size doğrudan iletilir, herkese açık bir sayfada durmaz. Zaten ayırt edici soru da budur: bir erişim bilgisi herkese açıksa, ortada bir abonelik değil, sızdırılmış bir kaynak vardır.',
    },

    { type: 'h2', text: 'Özet', id: 'ozet' },
    {
      type: 'p',
      text: 'M3U, oynatıcınıza yayınları nereden alacağını söyleyen basit bir metin dosyasıdır. Portal girişiyle aynı sonuca ulaşır, aralarındaki fark yalnızca tanımlama biçimidir. Program rehberi ise ayrı bir adresle gelir ve saat dilimi ayarına duyarlıdır. En kritik nokta güvenliktir: kaynağı belli olmayan listelerden uzak durmak, hem cihazınızı hem de hesaplarınızı korur.',
    },
    {
      type: 'p',
      text: 'Cihazınızda hangi yöntemin kullanılacağından emin değilseniz, kurulum rehberlerimize göz atabilir veya destek hattımıza cihaz modelinizi yazabilirsiniz.',
    },
  ],
  faqs: [
    {
      question: 'M3U dosyasını kendim düzenleyebilir miyim?',
      answer:
        'Teknik olarak düz metin olduğu için düzenlenebilir, ancak önermiyoruz. Kanal sıralamasını veya adlarını değiştirmek listenin yenilendiğinde bozulmasına yol açar. Sıralama tercihiniz varsa oynatıcı uygulamasının favori listesi özelliğini kullanmak daha sağlıklıdır.',
    },
    {
      question: 'Kanallar geliyor ama program rehberi boş, neden?',
      answer:
        'EPG genellikle oynatma listesinden ayrı bir adresle tanımlanır. Oynatıcıda EPG adresinin girili olduğunu ve cihazın saat diliminin doğru olduğunu kontrol edin. Rehber görünüyor ama saatler kaymışsa sorun neredeyse her zaman saat dilimidir.',
    },
    {
      question: 'Aynı M3U bağlantısını hem telefonda hem televizyonda tanımlayabilir miyim?',
      answer:
        'Tanımlayabilirsiniz. Ancak tek bağlantılı bir pakette aynı anda yalnızca bir cihazda yayın açabilirsiniz. İkisinde birden açtığınızda bağlantı hatası alırsınız; eş zamanlı izleme için ek bağlantı gerekir.',
    },
  ],
  related: ['iptv-turkey-nedir', 'turkey-iptv-m3u-kurulum'],
};
