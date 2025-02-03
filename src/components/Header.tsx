import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

interface MenuItem {
  title: string;
  href: string;
  target?: string;
  children?: MenuItem[];
  tag?: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Products',
    href: '#',
    children: [
      { title: 'Ledger Flex', href: 'https://shop.ledger.com/pages/ledger-flex', tag: 'New' },
      { title: 'Ledger Stax', href: 'https://shop.ledger.com/pages/ledger-stax' },
      { title: 'Ledger Nano X', href: 'https://shop.ledger.com/pages/ledger-nano-x' },
      { title: 'Ledger Nano S Plus', href: 'https://shop.ledger.com/pages/ledger-nano-s-plus' },
      { title: 'Compare our devices', href: 'https://shop.ledger.com/pages/hardware-wallets-comparison' },
      { title: 'Hardware Wallet', href: 'https://shop.ledger.com/pages/hardware-wallet' },
      { title: 'Gift Cards', href: 'https://shop.ledger.com/products/gift-card' },
      { title: 'Packs', href: 'https://shop.ledger.com/#category-bundle' },
      { title: 'Accessories', href: 'https://shop.ledger.com/#category-accessories' },
      { title: 'Collaborations', href: 'https://www.ledger.com/collaborations' },
      { title: 'See all products', href: 'https://shop.ledger.com' },
      { title: 'Download Ledger Live', href: 'https://www.ledger.com/ledger-live' },
      { title: 'Supported crypto', href: 'https://www.ledger.com/supported-crypto-assets' }
    ]
  },
  {
    title: 'App and services',
    href: '#',
    children: [
      { title: 'Ledger Live', href: 'https://www.ledger.com/ledger-live' },
      { title: 'Ledger Recover', href: 'https://shop.ledger.com/pages/ledger-recover' },
      { title: 'CL Card', href: 'https://www.ledger.com/cl-card' },
      { title: 'Supported Services', href: 'https://www.ledger.com/supported-services' },
      { title: 'Crypto Prices', href: 'https://www.ledger.com/coin/price' }
    ]
  },
  {
    title: 'Learn',
    href: '#',
    children: [
      { title: 'Ledger Academy', href: 'https://www.ledger.com/academy', target: '_blank' },
      { title: 'Learn and Earn', href: 'https://quest.ledger.com/', target: '_blank' },
      { title: 'Classroom', href: 'https://www.ledger.com/academy/what-is-web-30-everything-you-need-to-know', target: '_blank' },
      { title: 'Blog', href: '/blog' },
      { title: 'What is a crypto wallet', href: 'https://www.ledger.com/academy/basic-basics/2-how-to-own-crypto/what-is-a-crypto-wallet', target: '_blank' },
      { title: 'How to Buy', href: 'https://www.ledger.com/buy' },
      { title: 'How to Swap', href: 'https://www.ledger.com/swap' },
      { title: 'How to Stake', href: 'https://www.ledger.com/staking' }
    ]
  },
  {
    title: 'For Business',
    href: '#',
    children: [
      { title: 'Ledger Enterprise Solutions', href: 'https://enterprise.ledger.com?utm_source=mainsite&utm_medium=header', target: '_blank' },
      { title: 'Ledger Partners', href: '/partners' },
      { title: 'Ledger Co-branded Partnership', href: 'https://ledger.com/co-branded', target: '_blank' }
    ]
  },
  { title: 'For Developers', href: 'https://developers.ledger.com/', target: '_blank' },
  { title: 'Support', href: 'https://support.ledger.com/hc', target: '_blank' }
];

const languages = [
  { name: 'العربية', code: 'ar', href: 'https://www.ledger.com/ar/ledger-live/%D8%AA%D9%88%D9%82%D9%8A%D8%B9%D8%A7%D8%AA-%D8%AA%D9%86%D8%B2%D9%8A%D9%84-ledger-live' },
  { name: '简体中文', code: 'zh-hans', href: 'https://www.ledger.com/zh-hans/ledger-live/ledger-live-%E4%B8%8B%E8%BD%BD%E7%AD%BE%E5%90%8D' },
  { name: 'Français', code: 'fr', href: 'https://www.ledger.com/fr/ledger-live/signatures-de-telechargement-de-ledger-live' },
  { name: 'Deutsch', code: 'de', href: 'https://www.ledger.com/de/ledger-live/ledger-live-download-signatures' },
  { name: 'Русский', code: 'ru', href: 'https://www.ledger.com/ru/%D1%81%D0%BA%D0%B0%D1%87%D0%B0%D1%82%D1%8C-%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5-%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D0%B8-ledger-live' },
  { name: 'Español', code: 'es', href: 'https://www.ledger.com/es/ledger-live/firmas-de-descarga-de-ledger-live' },
  { name: '日本語', code: 'ja', href: 'https://www.ledger.com/ja/ledger-live%E7%BD%B2%E5%90%8D%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89' },
  { name: '한국어', code: 'ko', href: 'https://www.ledger.com/ko/ledger-live/ledger-live-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EC%84%9C%EB%AA%85' },
  { name: 'Türkçe', code: 'tr', href: 'https://www.ledger.com/tr/ledger-live-indirme-imzalari' },
  { name: 'Português', code: 'pt-br', href: 'https://www.ledger.com/pt-br/ledger-live/assinaturas-de-download-do-ledger-live' }
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenItems, setMobileOpenItems] = useState<string[]>([]);

  const toggleMobileItem = (title: string) => {
    setMobileOpenItems(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-gray-200 lg:border-none">
          <div className="flex items-center">
            <a href="/">
              <span className="sr-only">Ledger</span>
              <img 
                src="https://www.ledger.com/wp-content/themes/ledger-v2/public/images/ledger-logo-long.svg" 
                alt="Ledger" 
                className="h-8 w-auto"
              />
            </a>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1 lg:ml-8">
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <div key={item.title} className="relative group py-2">
                  {item.children ? (
                    <>
                      <button
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 group"
                      >
                        {item.title}
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                      </button>
                      <div className="absolute left-0 mt-2 w-screen max-w-xs transform px-2 sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                          <div className="relative grid gap-1 bg-white p-2">
                            {item.children.map((child) => (
                              <a
                                key={child.title}
                                href={child.href}
                                target={child.target}
                                className="flex items-center rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                              >
                                <span className="flex-1">{child.title}</span>
                                {child.tag && (
                                  <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                                    {child.tag}
                                  </span>
                                )}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      target={item.target}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      {item.title}
                    </a>
                  )}
                </div>
              ))}
            </div>
            
            {/* Language selector */}
            <div className="relative group ml-8">
              <button
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 py-2 group"
              >
                English
                <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {languages.map((lang) => (
                  <a
                    key={lang.code}
                    href={lang.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    {lang.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => toggleMobileItem(item.title)}
                    >
                      {item.title}
                      <ChevronDown className={`ml-2 h-5 w-5 transform ${mobileOpenItems.includes(item.title) ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`${mobileOpenItems.includes(item.title) ? 'block' : 'hidden'} pl-4`}>
                      {item.children.map((child) => (
                        <a
                          key={child.title}
                          href={child.href}
                          target={child.target}
                          className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        >
                          {child.title}
                          {child.tag && (
                            <span className="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 ml-2">
                              {child.tag}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    target={item.target}
                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
            
            {/* Mobile language selector */}
            <div className="border-t border-gray-200 pt-4">
              <button
                className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => toggleMobileItem('language')}
              >
                English
                <ChevronDown className={`ml-2 h-5 w-5 transform ${mobileOpenItems.includes('language') ? 'rotate-180' : ''}`} />
              </button>
              <div className={`${mobileOpenItems.includes('language') ? 'block' : 'hidden'} pl-4`}>
                {languages.map((lang) => (
                  <a
                    key={lang.code}
                    href={lang.href}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {lang.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;