export type Faq = { question: string; answer: string };

/**
 * These questions are rendered visibly on the page and are also used to build
 * FAQPage structured data. Never add a question here that is not shown to
 * visitors — Google requires the answer to be visible on the page.
 */
export const faqs: Faq[] = [
  {
    question: 'IPTV nedir?',
    answer:
      'IPTV, televizyon yayınlarının uydu veya kablo yerine internet bağlantısı üzerinden iletilmesidir. Açılımı Internet Protocol Television olan bu teknoloji, görüntü ve sesi veri paketleri hâlinde cihazınıza ulaştırır. Bu sayede Smart TV, telefon, tablet veya bilgisayar gibi internete bağlanabilen cihazlarda izleme yapılabilir. IPTV bir içerik türü değil, bir iletim yöntemidir; hangi içeriğin izlenebileceği tamamen hizmet sağlayıcının sahip olduğu yayın haklarına bağlıdır.',
  },
  {
    question: 'IPTV Turkey hangi cihazlarla uyumludur?',
    answer:
      'Hizmetimiz Samsung ve LG Smart TV modelleri, Android TV ve Google TV cihazları, Amazon Fire TV Stick, Apple TV, Android ve iOS telefon ve tabletler ile Windows ve macOS bilgisayarlarda kullanılabilir. Uyumluluk cihazın işletim sistemi sürümüne ve uygulama mağazasında ilgili oynatıcının bulunup bulunmamasına göre değişebilir. Cihazınızın uygun olup olmadığından emin değilseniz model adını WhatsApp üzerinden gönderin, kısa sürede yanıtlayalım.',
  },
  {
    question: 'İnternet hızım kaç Mbps olmalı?',
    answer:
      'Pratikte SD yayınlar için yaklaşık 8-10 Mbps, HD yayınlar için 15-25 Mbps, Full HD ve üzeri için 25-40 Mbps aralığı rahat bir izleme sağlar. Bu değerler kesin sınırlar değildir; kullanılan video codec\'i, kaynak kalitesi ve evdeki diğer cihazların bant genişliği tüketimi sonucu doğrudan etkiler. Hızdan çok bağlantının kararlılığı önemlidir. Mümkün olduğunda Ethernet kablosu, mümkün değilse 5 GHz Wi-Fi bandı tercih edilmelidir.',
  },
  {
    question: 'Aynı anda kaç cihazda izleyebilirim?',
    answer:
      'Paketler varsayılan olarak tek eş zamanlı bağlantı içerir. Yani aboneliğinizi farklı cihazlara kurabilirsiniz, ancak aynı anda yalnızca birinde yayın açabilirsiniz. Evde birden fazla ekranda aynı anda izleme yapmak istiyorsanız sipariş sırasında ek bağlantı talep edebilirsiniz. Tek aboneliği birden fazla kişiyle paylaşmak bağlantı hatalarına yol açar ve kullanım koşullarımıza aykırıdır.',
  },
  {
    question: 'IPTV kurulumu nasıl yapılır?',
    answer:
      'Kurulum, cihazınıza uyumlu bir oynatıcı uygulaması yüklemek ve size iletilen abonelik bilgilerini bu uygulamaya girmekten ibarettir. Ortalama bir kurulum beş ila on dakika sürer. Smart TV, Android TV, Fire TV Stick ve mobil cihazlar için adım adım Türkçe rehberlerimizi kurulum bölümünde bulabilirsiniz. Takıldığınız bir aşama olursa WhatsApp üzerinden destek ekibimize yazabilirsiniz.',
  },
  {
    question: 'M3U bağlantısı nedir?',
    answer:
      'M3U, oynatma listesi biçimidir. Basitçe, hangi yayın akışının hangi adresten alınacağını ve nasıl adlandırılacağını tarif eden bir metin dosyasıdır. IPTV oynatıcıları bu dosyayı okuyarak kanal listenizi oluşturur. M3U bir içerik kaynağı değil, yalnızca bir yönlendirme biçimidir. Bilinmeyen kaynaklardan indirilen listeler güvenlik açısından risklidir; konuyu blog bölümümüzdeki M3U yazısında ayrıntılı olarak ele aldık.',
  },
  {
    question: 'Sipariş nasıl veriliyor?',
    answer:
      'Paket kartındaki düğmeye dokunduğunuzda kısa bir form açılır: cihazınızı, kaç eş zamanlı bağlantı istediğinizi ve iletişim bilgilerinizi girersiniz. Ardından siparişiniz WhatsApp üzerinden iletilir ve konuşma gerçek bir kişiyle devam eder. Bu sitede hiçbir ödeme bilgisi girilmez; ödeme adımları talebiniz alındıktan sonra sizinle paylaşılır.',
  },
  {
    question: 'Paket içeriği bölgeye göre değişir mi?',
    answer:
      'Evet. Yayın hakları ülke ve bölge bazında lisanslanır. Bu nedenle belirli bir kanalın veya içeriğin kullanılabilirliği bulunduğunuz bölgeye, seçtiğiniz pakete ve hizmet sağlayıcının sahip olduğu haklara göre değişebilir. Belirli bir içeriği izlemek için abone olmayı düşünüyorsanız, satın almadan önce o içeriğin paketinizde yer alıp almadığını destek ekibimize sormanızı öneririz.',
  },
  {
    question: 'VPN gerekli mi?',
    answer:
      'Normal şartlarda VPN gerekmez. Bazı internet servis sağlayıcıları belirli akış protokollerinde hız düşürme uygulayabilir; böyle bir durumda VPN bağlantı kararlılığını iyileştirebilir. Ancak VPN kullanımı ek gecikme yaratabileceği için varsayılan bir çözüm olarak önerilmez. VPN\'in bölgesel yayın haklarını aşmak amacıyla kullanılması, ilgili hizmetlerin kullanım koşullarına aykırı olabilir.',
  },
  {
    question: 'Destek ekibine nasıl ulaşabilirim?',
    answer:
      'En hızlı yol WhatsApp destek hattımızdır. Sitedeki WhatsApp düğmelerine dokunarak doğrudan yazışma başlatabilirsiniz. Alternatif olarak iletişim sayfamızdaki formu doldurabilir veya destek e-posta adresimize yazabilirsiniz. Yazarken cihaz modelinizi ve karşılaştığınız hatanın ekran görüntüsünü paylaşmanız çözümü hızlandırır.',
  },
];

/** Homepage shows a shorter selection; the /sss page shows all of them. */
export const homepageFaqs = faqs.slice(0, 8);
