import Link from 'next/link';
import { Home, BookOpen, MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/data/site-config';

/** Custom 404 in Turkish, replacing Next's default English page. */
export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl font-extrabold text-brand-500">404</p>

      <h1 className="mt-6 text-display-sm">Aradığınız sayfa bulunamadı</h1>

      <p className="mt-4 max-w-prose text-lead text-mist">
        Bağlantı değişmiş veya sayfa kaldırılmış olabilir. Aşağıdaki bağlantılardan
        devam edebilir ya da doğrudan bize yazabilirsiniz.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          <Home aria-hidden="true" className="h-4 w-4" />
          Ana Sayfa
        </Link>
        <Link href="/blog/" className="btn-secondary">
          <BookOpen aria-hidden="true" className="h-4 w-4" />
          Blog
        </Link>
        <a
          href={whatsappLink('Merhaba, sitenizde aradığım sayfayı bulamadım.')}
          className="btn-secondary"
        >
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          WhatsApp&apos;tan Yazın
        </a>
      </div>
    </div>
  );
}
