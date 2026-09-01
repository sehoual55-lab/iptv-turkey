/**
 * Legal and corporate pages.
 *
 * These are working drafts written for a Turkish audience, not legal advice.
 * Placeholders marked [...] must be completed with real company details, and
 * the whole set should be reviewed by a lawyer before launch.
 */

export type Section = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalPage = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  updated: string;
  intro: string;
  sections: Section[];
  /** Legal boilerplate should not compete with real pages in search. */
  noIndex?: boolean;
};

export const legalPages: LegalPage[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'hakkimizda',
    title: 'Hakkımızda',
    seoTitle: 'Hakkımızda | IPTV Turkey',
    description:
      'IPTV Turkey nasıl çalışır, neyi vaat eder ve neyi vaat etmez? Hizmet yaklaşımımız, teknik sınırlar ve yasal duruşumuz hakkında açık bilgi.',
    updated: '2026-03-01',
    intro:
      'IPTV Turkey, Türkiye’deki kullanıcılara internet üzerinden televizyon izleme çözümleri ve Türkçe kurulum desteği sunan bir abonelik hizmetidir. Bu sayfada ne yaptığımızı ve neyi vaat etmediğimizi olabildiğince açık anlatıyoruz.',
    sections: [
      {
        heading: 'Ne yapıyoruz',
        paragraphs: [
          'İşimizin özü üç başlıkta toplanır: uygun süreli abonelik seçenekleri sunmak, kurulumu adım adım anlaşılır kılmak ve sorun çıktığında gerçek bir insanın yanıt verdiği bir destek hattı işletmek.',
          'Teknolojiyi anlaşılır kılmayı, satış yapmak kadar önemli görüyoruz. Blog bölümümüzdeki rehberler bu yüzden var: abone olmasanız bile IPTV’nin nasıl çalıştığını öğrenebileceğiniz içerikler.',
        ],
      },
      {
        heading: 'Neyi vaat etmiyoruz',
        paragraphs: [
          'Sektörde sıkça görülen “kesintisiz”, “sınırsız” veya “%100 garantili” ifadelerini kullanmıyoruz, çünkü teknik olarak doğru değiller. İzleme kalitesi üç değişkene bağlıdır: cihazınızın donanımı, internet bağlantınızın kararlılığı ve yayının alındığı lisanslı kaynak.',
          'Bu üçünden biri zayıfsa sonuç etkilenir ve hiçbir hizmet sağlayıcı bunun aksini garanti edemez. Bunun yerine bağlantınızı ve cihazınızı nasıl hazırlayacağınızı ayrıntılı olarak anlatıyoruz.',
        ],
      },
      {
        heading: 'Yasal duruşumuz',
        paragraphs: [
          'IPTV teknolojisinin kendisi yasaldır; belirsizlik, iletilen içeriğin yayın haklarından kaynaklanır. Sitemizde herhangi bir oynatma listesi, erişim kodu veya hesap bilgisi yayımlamıyoruz.',
          'M3U ve benzeri konuları yalnızca eğitici içeriklerimizde, riskleri açıklamak amacıyla ele alıyoruz. Telif hakkı sahiplerinden gelen bildirimler için tanımlı bir prosedürümüz bulunmaktadır.',
        ],
      },
      {
        heading: 'Şirket bilgileri',
        paragraphs: [
          'Ticari unvan: [Şirket unvanı]. Adres: [Açık adres]. Vergi dairesi ve numarası: [Bilgi]. Bu alanlar yayına almadan önce doldurulmalıdır.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'gizlilik-politikasi',
    title: 'Gizlilik Politikası',
    seoTitle: 'Gizlilik Politikası | IPTV Turkey',
    description:
      'IPTV Turkey olarak hangi kişisel verileri topladığımızı, hangi amaçla işlediğimizi, ne kadar sakladığımızı ve KVKK kapsamındaki haklarınızı açıklıyoruz.',
    updated: '2026-03-01',
    noIndex: true,
    intro:
      'Bu politika, IPTV Turkey web sitesini kullandığınızda hangi kişisel verilerin işlendiğini açıklar. 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu [Şirket unvanı]’dır.',
    sections: [
      {
        heading: 'Topladığımız veriler',
        paragraphs: ['Yalnızca talebinizi karşılamak için gereken verileri topluyoruz:'],
        list: [
          'Sipariş formunda verdiğiniz ad soyad, e-posta adresi ve WhatsApp numarası',
          'Seçtiğiniz paket, süre ve eş zamanlı bağlantı sayısı',
          'WhatsApp üzerinden bizimle paylaştığınız yazışma içeriği',
          'Onay vermeniz hâlinde, sayfa kullanımına ilişkin anonim analiz verileri',
        ],
      },
      {
        heading: 'Toplamadığımız veriler',
        paragraphs: [
          'Bu sitede hiçbir aşamada kredi kartı, banka kartı veya banka hesabı bilgisi toplanmaz ve saklanmaz. Ödeme adımları talebiniz alındıktan sonra ayrıca paylaşılır.',
          'Kimlik numarası, pasaport bilgisi veya adres gibi verileri talep etmiyoruz.',
        ],
      },
      {
        heading: 'İşleme amaçları ve hukuki sebep',
        paragraphs: [
          'Verileriniz; siparişinizi oluşturmak, aboneliğinizi tanımlamak, kurulum desteği vermek ve yasal yükümlülüklerimizi yerine getirmek amacıyla işlenir.',
          'Hukuki sebep, sözleşmenin kurulması ve ifası ile açık rızanızdır. Analiz çerezleri yalnızca açık rıza vermeniz hâlinde çalışır.',
        ],
      },
      {
        heading: 'Aktarım ve saklama',
        paragraphs: [
          'Sipariş bilgileri, kayıt tutma amacıyla Google (Google Sheets ve Apps Script) altyapısında saklanır. WhatsApp üzerinden yapılan yazışmalar Meta Platforms altyapısında tutulur. Bu sağlayıcılar yurt dışında bulunmaktadır.',
          'Verileriniz, aboneliğinizin sona ermesinden sonra makul bir süre boyunca ve yasal saklama süreleri kapsamında saklanır, ardından silinir.',
        ],
      },
      {
        heading: 'KVKK kapsamındaki haklarınız',
        paragraphs: ['KVKK’nın 11. maddesi uyarınca şu haklara sahipsiniz:'],
        list: [
          'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
          'İşlenmişse buna ilişkin bilgi talep etme',
          'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
          'Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme',
          'Silinmesini veya yok edilmesini isteme',
          'İşlemenin münhasıran otomatik sistemlerle analiz edilmesine itiraz etme',
          'Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme',
        ],
      },
      {
        heading: 'Başvuru',
        paragraphs: [
          'Haklarınızı kullanmak için iletişim sayfamızdaki kanallardan bize ulaşabilirsiniz. Talebiniz en geç otuz gün içinde sonuçlandırılır.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'kullanim-kosullari',
    title: 'Kullanım Koşulları',
    seoTitle: 'Kullanım Koşulları | IPTV Turkey',
    description:
      'IPTV Turkey hizmetinin kullanım koşulları: abonelik kapsamı, eş zamanlı bağlantı kuralları, sorumluluk sınırları ve hizmetin sonlandırılması.',
    updated: '2026-03-01',
    noIndex: true,
    intro:
      'Bu web sitesini kullanarak ve hizmetimize abone olarak aşağıdaki koşulları kabul etmiş olursunuz. Koşulları kabul etmiyorsanız hizmeti kullanmamanızı rica ederiz.',
    sections: [
      {
        heading: 'Hizmetin kapsamı',
        paragraphs: [
          'IPTV Turkey, internet üzerinden yayın erişimi sağlayan bir abonelik ve teknik destek hizmetidir. Üçüncü taraflara ait kanalların, yapımların veya markaların sahibi değildir ve bunlar üzerinde hak iddia etmez.',
          'İçerik ve kanal kullanılabilirliği lisanslama, bölge, paket ve hizmet sağlayıcıya göre değişebilir. Belirli bir içerik için abone olmayı düşünüyorsanız, satın almadan önce durumu destek ekibimize danışmanızı öneririz.',
        ],
      },
      {
        heading: 'Abonelik ve eş zamanlı bağlantı',
        paragraphs: [
          'Paketler varsayılan olarak tek eş zamanlı bağlantı içerir. Aboneliğinizi birden fazla cihaza kurabilirsiniz, ancak aynı anda yalnızca paketinizin izin verdiği sayıda ekranda yayın açabilirsiniz.',
          'Abonelik bilgilerinizi üçüncü kişilerle paylaşmanız, yeniden satmanız veya kamuya açık şekilde yayımlamanız yasaktır. Bu durumun tespiti hâlinde abonelik iade yapılmaksızın sonlandırılabilir.',
        ],
      },
      {
        heading: 'Kullanıcı yükümlülükleri',
        list: [
          'Hizmeti yalnızca kişisel, ticari olmayan amaçlarla kullanmak',
          'Abonelik bilgilerini gizli tutmak',
          'Hizmeti yürürlükteki mevzuata aykırı biçimde kullanmamak',
          'Sisteme zarar verecek veya erişimi engelleyecek girişimlerde bulunmamak',
        ],
      },
      {
        heading: 'Sorumluluğun sınırı',
        paragraphs: [
          'İzleme kalitesi cihazınıza, internet bağlantınızın kararlılığına ve lisanslı kaynağa bağlıdır. Kesintisiz veya hatasız hizmet garantisi verilmemektedir.',
          'İnternet servis sağlayıcınızdan, cihazınızdan veya üçüncü taraf altyapılardan kaynaklanan aksaklıklardan sorumlu tutulamayız.',
        ],
      },
      {
        heading: 'Değişiklikler',
        paragraphs: [
          'Bu koşullar zaman zaman güncellenebilir. Güncel sürüm daima bu sayfada yayımlanır; sayfanın başındaki tarih son güncellemeyi gösterir.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'iade-politikasi',
    title: 'İade Politikası',
    seoTitle: 'İade Politikası | IPTV Turkey',
    description:
      'IPTV Turkey iade koşulları: hangi durumlarda iade yapılır, hangi durumlarda yapılmaz, başvuru nasıl yapılır ve süreç ne kadar sürer?',
    updated: '2026-03-01',
    noIndex: true,
    intro:
      'Hizmetin cihazınızda beklendiği gibi çalışmasını önemsiyoruz. Bu sayfa, iade taleplerinin hangi koşullarda değerlendirildiğini açıklar.',
    sections: [
      {
        heading: 'İade yapılabilecek durumlar',
        paragraphs: [
          'Abonelik bilgileriniz teslim edildikten sonra hizmet teknik nedenlerle çalışmıyorsa ve destek ekibimizin yönlendirmelerine rağmen sorun çözülemiyorsa, ilk yedi gün içinde iade talebinde bulunabilirsiniz.',
          'Bu süre, kurulumun tamamlandığı ve sorunun tarafımıza bildirildiği tarihten itibaren işler.',
        ],
      },
      {
        heading: 'İade yapılamayacak durumlar',
        list: [
          'Belirli bir kanalın veya içeriğin pakette bulunmaması. İçerik kullanılabilirliği lisanslamaya ve bölgeye göre değişir ve satın alma öncesinde sorulabilir.',
          'İnternet bağlantısının yetersiz olması veya cihazın teknik olarak uyumsuz olması. Uyumluluk satın alma öncesinde teyit edilebilir.',
          'Abonelik bilgilerinin üçüncü kişilerle paylaşılması nedeniyle yaşanan bağlantı sorunları.',
          'Kullanım koşullarının ihlali nedeniyle sonlandırılan abonelikler.',
        ],
      },
      {
        heading: 'Başvuru ve süreç',
        paragraphs: [
          'İade talebinizi WhatsApp destek hattımız veya iletişim sayfamız üzerinden iletebilirsiniz. Talebinizde sipariş bilgilerinizi, cihaz modelinizi ve karşılaştığınız sorunu belirtmeniz süreci hızlandırır.',
          'Talepler en geç on dört gün içinde değerlendirilir. Onaylanan iadeler, ödemenin yapıldığı yönteme uygun şekilde gerçekleştirilir.',
        ],
      },
      {
        heading: 'Cayma hakkı',
        paragraphs: [
          'Mesafeli Sözleşmeler Yönetmeliği uyarınca, elektronik ortamda anında ifa edilen ve tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde cayma hakkı bulunmamaktadır. Buna karşın yukarıda belirtilen teknik durumlarda iade değerlendirmesi yapılır.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'cerez-politikasi',
    title: 'Çerez Politikası',
    seoTitle: 'Çerez Politikası | IPTV Turkey',
    description:
      'IPTV Turkey web sitesinde hangi çerezlerin kullanıldığı, hangilerinin zorunlu olduğu ve tercihlerinizi nasıl değiştirebileceğiniz.',
    updated: '2026-03-01',
    noIndex: true,
    intro:
      'Çerezler, ziyaret ettiğiniz sitelerin tarayıcınıza kaydettiği küçük metin dosyalarıdır. Bu sayfa, sitemizde hangi çerezlerin ne amaçla kullanıldığını açıklar.',
    sections: [
      {
        heading: 'Zorunlu çerezler',
        paragraphs: [
          'Sitenin temel işlevleri için gereklidir ve kapatılamaz. Şu anda yalnızca çerez tercihinizi hatırlamak için bir kayıt tutuyoruz; bu kayıt tarayıcınızda saklanır ve sunucularımıza gönderilmez.',
        ],
      },
      {
        heading: 'Analiz çerezleri',
        paragraphs: [
          'Sayfaların nasıl kullanıldığını anlamamıza yardımcı olur. Bu çerezler yalnızca siz açıkça onay verdiğinizde yüklenir. Onay vermediğiniz sürece hiçbir analiz kodu çalıştırılmaz.',
        ],
      },
      {
        heading: 'Pazarlama çerezleri',
        paragraphs: [
          'Kampanya ölçümlemesi için kullanılabilir ve yalnızca onayınızla çalışır. Hiçbir isteğe bağlı çerez önceden seçili değildir.',
        ],
      },
      {
        heading: 'Tercihlerinizi değiştirme',
        paragraphs: [
          'Siteye ilk girişinizde görünen çerez bildirimi üzerinden kabul, ret veya ayrıntılı seçim yapabilirsiniz. Tercihinizi sonradan değiştirmek isterseniz tarayıcınızın site verilerini temizlemeniz yeterlidir; bildirim yeniden görüntülenir.',
          'Tarayıcı ayarlarından tüm çerezleri engellemeniz de mümkündür, ancak bu durumda bazı işlevler beklendiği gibi çalışmayabilir.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'telif-hakki-sikayeti',
    title: 'Telif Hakkı Şikayeti',
    seoTitle: 'Telif Hakkı Şikayeti Bildirimi | IPTV Turkey',
    description:
      'Telif hakkı ihlali bildiriminde bulunma prosedürü. Bildiriminizde bulunması gereken bilgiler, değerlendirme süreci ve karşı bildirim hakkı.',
    updated: '2026-03-01',
    intro:
      'Fikri mülkiyet haklarına saygı gösteriyoruz. Hak sahibi olduğunuz bir içeriğin hizmetimiz aracılığıyla izinsiz erişilebilir olduğunu düşünüyorsanız, aşağıdaki prosedürü izleyerek bize bildirimde bulunabilirsiniz.',
    sections: [
      {
        heading: 'Bildiriminizde bulunması gerekenler',
        paragraphs: [
          'Talebinizi hızlı değerlendirebilmemiz için bildiriminizin şu bilgileri içermesi gerekir:',
        ],
        list: [
          'Hak sahibinin adı, unvanı ve iletişim bilgileri',
          'Hak sahipliğini gösteren belge veya yetkilendirme bilgisi',
          'İhlal edildiği iddia edilen eserin açık tanımı',
          'İçeriğin hizmetimiz üzerinde nerede yer aldığına dair yeterli tanımlama',
          'Kullanımın hak sahibi tarafından yetkilendirilmediğine dair beyan',
          'Bildirimdeki bilgilerin doğru olduğuna dair beyan ve imza',
        ],
      },
      {
        heading: 'Nasıl bildirim yapılır',
        paragraphs: [
          'Bildiriminizi iletişim sayfamızda belirtilen e-posta adresine, konu satırına “Telif Hakkı Bildirimi” yazarak gönderebilirsiniz.',
          'Eksik bilgi içeren bildirimler değerlendirilemez; bu durumda sizden ek bilgi talep edilir.',
        ],
      },
      {
        heading: 'Değerlendirme süreci',
        paragraphs: [
          'Usulüne uygun bildirimler en kısa sürede incelenir. İnceleme sonucunda haklı bulunan taleplerde ilgili içeriğe erişim engellenir ve gerekli görülmesi hâlinde ilgili hizmet sağlayıcı bilgilendirilir.',
          'Tekrarlayan ihlaller söz konusu olduğunda ilgili aboneliklerin sonlandırılması da dâhil olmak üzere ek tedbirler uygulanır.',
        ],
      },
      {
        heading: 'Karşı bildirim',
        paragraphs: [
          'Erişimi engellenen bir içeriğin hatalı olarak kaldırıldığını düşünüyorsanız, aynı kanaldan karşı bildirimde bulunabilirsiniz. Karşı bildiriminizde gerekçenizi ve iletişim bilgilerinizi belirtmeniz gerekir.',
        ],
      },
      {
        heading: 'Yasal uyarı',
        paragraphs: [
          'Kasten yanlış beyanda bulunmak hukuki sorumluluk doğurabilir. Bildirimde bulunmadan önce hak sahipliğinizden emin olmanızı öneririz.',
        ],
      },
    ],
  },
];

export function getLegalPage(slug: string): LegalPage | undefined {
  return legalPages.find((page) => page.slug === slug);
}
