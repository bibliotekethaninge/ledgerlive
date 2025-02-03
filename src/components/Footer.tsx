import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Products Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Ledger Stax</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Ledger Nano X</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Ledger Nano S Plus</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Compare our devices</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Bundles</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Accessories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">All products</a></li>
            </ul>
          </div>

          {/* Crypto Services Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Crypto Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Crypto Prices</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Buy crypto</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Staking crypto</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Swap crypto</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Bitcoin wallet</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Ethereum wallet</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">See all assets</a></li>
            </ul>
          </div>

          {/* Business Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Business</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Ledger Enterprise Solutions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">For Startups</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Finding from Ledger Cathay Capital</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">For Developers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">The Developer Portal</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Bounty program</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Resellers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Ledger Press Kit</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Affiliates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Status</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Legal Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <img 
                src="https://www.ledger.com/wp-content/themes/ledger-v2/public/images/ledger-logo-long.svg" 
                alt="Ledger" 
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Ledger. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;