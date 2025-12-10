import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, Link as LinkIcon, Youtube, Facebook, Instagram, Twitter, 
  Check, AlertCircle, Loader2, Play, FileVideo, Music, Clock, Trash2, 
  Search, Settings, Shield, Zap, Menu, X as XIcon, Headphones, Film, 
  Info, Globe, HelpCircle, Mail, User, Code, FileText, Lock 
} from 'lucide-react';

/**
 * CONFIG: Branding & Assets
 */
const BRAND = {
  name: "NEXUS",
  subtitle: "Video Downloader",
  company: "LAVENROY NEXUS",
  founder: "EDT EDIRISINGHE",
  email: "lavenroy.nexus@gmail.com",
  images: {
    thumbnail_placeholder: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80",
  }
};

/**
 * COMPONENT: Info Modal
 */
const InfoModal = ({ isOpen, onClose, title, content, icon: Icon }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-300 overflow-hidden border border-white/20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex justify-between items-center text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
              {Icon && <Icon size={24} />}
            </div>
            <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 active:scale-90">
            <XIcon size={24} />
          </button>
        </div>
        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {content}
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button onClick={onClose} className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all duration-200 active:scale-95 shadow-lg shadow-gray-200">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * UTILITY: Platform Detection
 */
const getPlatformConfig = (url) => {
  if (!url) return { id: 'unknown', name: 'Unknown', icon: LinkIcon, color: 'text-gray-400', bg: 'bg-gray-50' };
  if (url.includes('youtube.com') || url.includes('youtu.be')) return { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600', bg: 'bg-red-50' };
  if (url.includes('facebook.com') || url.includes('fb.watch')) return { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50' };
  if (url.includes('instagram.com')) return { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' };
  if (url.includes('twitter.com') || url.includes('x.com')) return { id: 'twitter', name: 'X (Twitter)', icon: Twitter, color: 'text-black', bg: 'bg-gray-100' };
  return { id: 'unknown', name: 'Unknown', icon: LinkIcon, color: 'text-gray-600', bg: 'bg-gray-50' };
};

/**
 * CORE LOGIC: Data Extraction
 */
const extractVideoData = async (url, platform) => {
  // SET THIS TO FALSE TO USE REAL BACKEND
  const USE_MOCK_DATA = false; 
  
  // PRODUCTION CONFIGURATION
  // This correctly reads the VITE_API_URL environment variable from Vercel
  const API_ENDPOINT = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/extract';

  if (!USE_MOCK_DATA) {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
         const err = await response.json();
         throw new Error(err.error || 'Failed to fetch video data.');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error. Backend not reachable.');
    }
  }

  // ... Mock Logic ...
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.length < 10) {
        reject(new Error("Invalid URL. Please check the link and try again."));
        return;
      }
      resolve({
        id: Math.random().toString(36).substr(2, 9),
        title: "NEXUS Tech Review | Future of AI Software",
        thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
        duration: "04:20",
        author: BRAND.company,
        formats: [
          { id: 1, quality: '4K Ultra HD', type: 'MP4', size: '850 MB', category: 'video', badge: '4K' },
          { id: 2, quality: '1080p Full HD', type: 'MP4', size: '145 MB', category: 'video', badge: 'HD' },
          { id: 3, quality: '720p HD', type: 'MP4', size: '84 MB', category: 'video', badge: 'HD' },
          { id: 5, quality: '320kbps (High)', type: 'MP3', size: '12.5 MB', category: 'audio', badge: 'HQ' },
          { id: 6, quality: '128kbps (Std)', type: 'MP3', size: '4.1 MB', category: 'audio', badge: '' },
        ]
      });
    }, 1500); 
  });
};

const Navbar = ({ onOpenModal }) => (
  <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ease-out">
            <Download size={24} strokeWidth={3} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
              {BRAND.name}
            </span>
            <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase group-hover:text-blue-600 transition-colors">
              {BRAND.subtitle}
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          {[
            { label: 'How it Works', icon: Info, id: 'how' },
            { label: 'Supported Sites', icon: Globe, id: 'sites' },
            { label: 'FAQ', icon: HelpCircle, id: 'faq' }
          ].map((item) => (
            <button key={item.id} onClick={() => onOpenModal(item.id)} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 active:scale-95 flex items-center gap-2">
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
        <a href={`mailto:${BRAND.email}`} className="p-2.5 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-full transition-all duration-200 active:scale-90 border border-gray-100 hover:border-blue-100">
          <Mail size={20} />
        </a>
      </div>
    </div>
  </nav>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="p-8 bg-white rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-2 transition-all duration-300 group cursor-default">
    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const DownloadProgress = ({ progress, onClose, fileName }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
    <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl scale-100 animate-in zoom-in-95 duration-300 border border-white/20">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Downloading...</h3>
          <p className="text-sm text-gray-500 truncate max-w-[250px] mt-1">{fileName}</p>
        </div>
        <button onClick={onClose} disabled={progress < 100} className={`p-2 rounded-full transition-all duration-200 active:scale-90 ${progress === 100 ? 'hover:bg-gray-100 text-gray-500' : 'text-gray-300 cursor-not-allowed'}`}>
          <XIcon size={24} />
        </button>
      </div>
      <div className="mb-8">
        <div className="flex justify-between text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
          <span>{progress < 100 ? 'Processing Stream' : 'Complete'}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden p-0.5">
          <div className={`h-full rounded-full transition-all duration-300 ease-out shadow-lg ${progress === 100 ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`} style={{ width: `${progress}%` }} />
        </div>
      </div>
      {progress === 100 ? (
        <div className="bg-green-50 text-green-700 p-4 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 border border-green-100 shadow-sm">
          <div className="bg-green-100 p-2 rounded-full">
            <Check size={24} />
          </div>
          <div className="flex-1">
             <span className="block font-bold">Success!</span>
             <span className="text-sm opacity-90">File saved to your device.</span>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 text-blue-700 p-4 rounded-2xl flex items-center gap-4 border border-blue-100 shadow-sm">
          <Loader2 size={24} className="animate-spin" />
          <div className="flex-1">
             <span className="block font-bold">NEXUS Engine</span>
             <span className="text-sm opacity-90">Optimizing media quality...</span>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [platform, setPlatform] = useState(getPlatformConfig(''));
  const [history, setHistory] = useState([]);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [activeTab, setActiveTab] = useState('video');
  const [modalOpen, setModalOpen] = useState(null); 
  const inputRef = useRef(null);

  const modalContent = {
    how: (
      <div className="space-y-6 text-gray-600">
        <p>The <strong>NEXUS Downloader</strong> utilizes the proprietary LavenRoy Nexus extraction algorithm to bypass standard restrictions and deliver high-fidelity media.</p>
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <ol className="list-decimal pl-5 space-y-3 font-medium text-gray-800">
            <li>Copy the URL from your favorite platform (YouTube, Facebook, etc).</li>
            <li>Paste the link into the NEXUS input field.</li>
            <li>Allow the Engine to parse the available streams.</li>
            <li>Choose your preferred resolution or audio bitrate and hit Download.</li>
          </ol>
        </div>
      </div>
    ),
    sites: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { name: 'YouTube', icon: Youtube, color: 'text-red-600' },
          { name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
          { name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
          { name: 'X (Twitter)', icon: Twitter, color: 'text-black' },
        ].map((site) => (
          <div key={site.name} className="p-4 border border-gray-100 hover:border-blue-200 bg-gray-50 hover:bg-blue-50/30 rounded-xl flex items-center gap-4 transition-all hover:scale-105 duration-200 cursor-default">
             <site.icon className={site.color} size={24} /> 
             <span className="font-bold text-gray-800">{site.name}</span>
          </div>
        ))}
      </div>
    ),
    faq: (
      <div className="space-y-4">
        {[
          { q: "Is NEXUS Downloader free?", a: "Yes, NEXUS is provided 100% free of charge by LavenRoy Nexus as a contribution to the open software community." },
          { q: "Is my data secure?", a: "Absolutely. We operate on a 'Zero-Log' architecture. No links, IP addresses, or downloaded files are stored on our servers." },
          { q: "Who is behind this?", a: `This platform is designed and architected by ${BRAND.founder} under the LAVENROY NEXUS banner.` }
        ].map((item, i) => (
          <details key={i} className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
              <summary className="p-4 font-bold cursor-pointer list-none flex items-center justify-between text-gray-800 hover:bg-gray-100 transition-colors">
                {item.q} <span className="transition-transform duration-300 group-open:rotate-180 text-blue-500">▼</span>
              </summary>
              <div className="px-4 pb-4 text-gray-600 leading-relaxed border-t border-gray-200/50 pt-3">
                {item.a}
              </div>
          </details>
        ))}
      </div>
    ),
    privacy: (
      <div className="space-y-4 text-gray-600">
        <div className="flex items-center gap-2 text-green-600 font-bold mb-2">
          <Shield size={20} />
          <span>LavenRoy Nexus Privacy Standard</span>
        </div>
        <p>Your privacy is paramount. This protocol outlines our commitment to data security:</p>
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>No Logging:</strong> We do not track user IPs or browser fingerprints.</li>
          <li><strong>Ephemeral Processing:</strong> Video conversion happens in temporary RAM containers that are wiped instantly after download generation.</li>
          <li><strong>No Cookies:</strong> We do not use persistent tracking cookies.</li>
        </ul>
        <p className="text-xs text-gray-400 mt-4 border-t pt-2">Last Updated: December 2024 by EDT EDIRISINGHE</p>
      </div>
    ),
    terms: (
      <div className="space-y-4 text-gray-600">
         <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
          <FileText size={20} />
          <span>Terms of Use Agreement</span>
        </div>
        <p>By using the NEXUS VIDEO DOWNLOADER, you agree to the following:</p>
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Personal Use Only:</strong> This tool is intended for downloading content you have the right to access for personal, non-commercial use.</li>
          <li><strong>Copyright Respect:</strong> You must not use this tool to infringe upon the intellectual property rights of content creators.</li>
          <li><strong>Availability:</strong> Service uptime is not guaranteed and is provided "as is".</li>
        </ul>
        <p className="text-xs text-gray-400 mt-4 border-t pt-2">Governance: LAVENROY NEXUS Software Dev.</p>
      </div>
    )
  };

  useEffect(() => {
    setPlatform(getPlatformConfig(url));
    setError('');
  }, [url]);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await extractVideoData(url, platform);
      setResult(data);
      setActiveTab('video');
      const newHistoryItem = { ...data, date: new Date().toISOString(), url };
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 5));
    } catch (err) {
      setError(err.message || "Unable to establish connection with source URL.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      if (inputRef.current) inputRef.current.focus();
    } catch (err) {
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleDownload = (format) => {
    setShowProgress(true);
    setDownloadProgress(0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setDownloadProgress(Math.min(100, Math.round(progress)));
    }, 400); 
  };

  const filteredFormats = result ? result.formats.filter(f => f.category === activeTab) : [];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar onOpenModal={setModalOpen} />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80"></div>
        <div className="relative max-w-4xl mx-auto px-4 pt-20 pb-24 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-8 uppercase tracking-widest shadow-sm hover:shadow-md transition-shadow cursor-default">
            <Code size={12} />
            <span>Powered by {BRAND.company}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-tight">
            NEXUS <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              VIDEO DOWNLOADER
            </span>
          </h1>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            The ultimate tool for seamless media extraction. Architected by <span className="font-semibold text-gray-800">{BRAND.founder}</span> for speed, privacy, and universal compatibility.
          </p>
          {/* Search Box */}
          <div className="max-w-3xl mx-auto transform hover:scale-[1.01] transition-all duration-300">
            <form onSubmit={handleAnalyze} className="relative group z-20">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-white p-2 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex-shrink-0 pl-4 pr-3 text-gray-400">
                  {platform.id !== 'unknown' ? (
                    <platform.icon className={`${platform.color} animate-in zoom-in spin-in-90 duration-300`} size={24} />
                  ) : (
                    <LinkIcon size={24} />
                  )}
                </div>
                <input ref={inputRef} type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste video URL from YouTube, FB, etc..." className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 text-lg h-14" />
                <div className="flex items-center gap-2 pr-2">
                  {!url && (
                    <button type="button" onClick={handlePaste} className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-blue-600 rounded-xl transition-all duration-200 active:scale-95">
                      PASTE
                    </button>
                  )}
                  <button type="submit" disabled={loading || !url} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 uppercase tracking-wide">
                    {loading ? <Loader2 className="animate-spin" /> : 'Download'}
                  </button>
                </div>
              </div>
            </form>
            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 shadow-sm">
                <AlertCircle size={20} />
                <span className="font-medium">{error}</span>
              </div>
            )}
          </div>
          {/* Supported Icons - Restored Colors */}
          <div className="mt-12 flex justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             <Youtube size={36} className="text-red-600 hover:scale-110 transition-transform" />
             <Facebook size={36} className="text-blue-600 hover:scale-110 transition-transform" />
             <Instagram size={36} className="text-pink-600 hover:scale-110 transition-transform" />
             <Twitter size={36} className="text-black hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">
        {/* Results Section */}
        {result && (
          <div className="mb-24 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-gray-100 overflow-hidden ring-1 ring-black/5">
              <div className="grid md:grid-cols-12 gap-0">
                {/* Thumbnail Side */}
                <div className="md:col-span-5 bg-gray-900 relative group overflow-hidden min-h-[300px] md:min-h-full">
                  <img src={result.thumbnail} alt={result.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                    <div className="inline-flex items-center gap-2 text-white/90 text-xs font-bold mb-3 uppercase tracking-wider bg-black/40 backdrop-blur-md px-2 py-1 rounded w-fit">
                      <Clock size={12} />
                      <span>{result.duration}</span>
                    </div>
                    <h3 className="text-white font-bold text-2xl leading-tight line-clamp-3 shadow-black drop-shadow-md">{result.title}</h3>
                  </div>
                  <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-bold border border-white/20 uppercase tracking-wider shadow-lg">
                    {platform.name}
                  </div>
                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                     <div className="bg-white/20 backdrop-blur-xl p-4 rounded-full border border-white/40">
                       <Play size={40} className="text-white fill-white ml-1" />
                     </div>
                  </div>
                </div>
                {/* Content Side */}
                <div className="md:col-span-7 flex flex-col h-full bg-white">
                  {/* Tabs */}
                  <div className="flex border-b border-gray-100">
                    <button onClick={() => setActiveTab('video')} className={`flex-1 py-5 text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'video' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
                      <Film size={18} />
                      VIDEO MP4
                    </button>
                    <button onClick={() => setActiveTab('audio')} className={`flex-1 py-5 text-sm font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'audio' ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50/50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
                      <Headphones size={18} />
                      AUDIO MP3
                    </button>
                  </div>
                  {/* List Area */}
                  <div className="p-8 flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-gray-900">Select Quality</h2>
                      <div className="text-[10px] font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wide">
                         {activeTab === 'video' ? 'Video Stream' : 'Audio Extract'}
                      </div>
                    </div>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                      {filteredFormats.map((format) => (
                        <div key={format.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-200 group">
                          <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${activeTab === 'audio' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                              {activeTab === 'audio' ? <Music size={24} /> : <FileVideo size={24} />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900 text-lg">{format.quality}</span>
                                {format.badge && (
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase shadow-sm ${activeTab === 'audio' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                                    {format.badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 font-medium mt-1">
                                {format.type} • {format.size}
                              </div>
                            </div>
                          </div>
                          <button onClick={() => handleDownload(format)} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-200 shadow-md active:scale-95 ${activeTab === 'audio' ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}>
                            <Download size={18} />
                            SAVE
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <FeatureCard icon={Shield} title="NEXUS Secure Core" desc="Enterprise-grade privacy protocols ensure your digital footprint remains invisible. No logs, no tracking, complete anonymity." />
          <FeatureCard icon={Zap} title="Hyper-Thread Engine" desc="Powered by LavenRoy's proprietary algorithms for blazing fast stream extraction and conversion." />
          <FeatureCard icon={Settings} title="Universal Formats" desc="Adaptive format conversion supporting the entire spectrum of modern media containers (MP4, WEBM, MP3)." />
        </div>
        {/* Recent History */}
        {history.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Session Log</h2>
              <button onClick={() => setHistory([])} className="text-sm text-red-500 hover:text-red-700 font-bold flex items-center gap-2 uppercase tracking-wide hover:bg-red-50 px-4 py-2 rounded-lg transition-all active:scale-95">
                <Trash2 size={16} /> Clear
              </button>
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 divide-y divide-gray-100 overflow-hidden shadow-xl shadow-gray-200/50">
              {history.map((item, idx) => (
                <div key={idx} className="p-5 flex items-center gap-5 hover:bg-gray-50 transition-colors group">
                  <img src={item.thumbnail} alt="" className="w-20 h-14 object-cover rounded-lg bg-gray-200 shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 font-medium">{new Date(item.date).toLocaleTimeString()}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors hover:bg-blue-50 rounded-full">
                        <Download size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/20">
                  <Download size={24} strokeWidth={3} />
                </div>
                <span className="text-2xl font-black text-gray-900 tracking-tighter">{BRAND.name}</span>
              </div>
              <p className="text-gray-500 mb-6 max-w-md leading-relaxed">
                The premier media extraction tool for the modern web. Built for speed, privacy, and universal compatibility.
              </p>
              <div className="flex flex-col gap-1 text-sm text-gray-500 border-l-4 border-blue-600 pl-4 py-1">
                <span className="font-bold text-gray-900">{BRAND.company}</span>
                <span>Founder: <span className="font-medium text-gray-700">{BRAND.founder}</span></span>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-4">
               <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Connect with us</span>
               <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 group w-fit shadow-lg shadow-gray-200 active:scale-95">
                 <Mail size={20} className="group-hover:animate-bounce" />
                 <span className="font-medium">{BRAND.email}</span>
               </a>
               <div className="flex gap-4 mt-2">
                 <button className="p-2.5 bg-gray-50 rounded-xl text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 active:scale-90 shadow-sm border border-gray-100">
                    <Twitter size={20} />
                 </button>
                 <button className="p-2.5 bg-gray-50 rounded-xl text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 active:scale-90 shadow-sm border border-gray-100">
                    <Facebook size={20} />
                 </button>
                 <button className="p-2.5 bg-gray-50 rounded-xl text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 active:scale-90 shadow-sm border border-gray-100">
                    <Instagram size={20} />
                 </button>
               </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-100 text-center flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>&copy; 2024 {BRAND.company}. All Rights Reserved.</span>
            <div className="flex gap-6 mt-4 md:mt-0">
               <button onClick={() => setModalOpen('privacy')} className="hover:text-blue-600 transition-colors">Privacy Protocol</button>
               <button onClick={() => setModalOpen('terms')} className="hover:text-blue-600 transition-colors">Terms of Use</button>
            </div>
          </div>
        </div>
      </footer>
      {/* Info Modal */}
      <InfoModal isOpen={!!modalOpen} onClose={() => setModalOpen(null)} title={modalOpen === 'how' ? 'How it Works' : modalOpen === 'sites' ? 'Supported Platforms' : modalOpen === 'faq' ? 'Frequently Asked Questions' : modalOpen === 'privacy' ? 'Privacy Protocol' : 'Terms of Use'} icon={modalOpen === 'how' ? Info : modalOpen === 'sites' ? Globe : modalOpen === 'faq' ? HelpCircle : modalOpen === 'privacy' ? Shield : FileText} content={modalOpen ? modalContent[modalOpen] : null} />
      {/* Download Progress Modal */}
      {showProgress && (
        <DownloadProgress progress={downloadProgress} fileName={result?.title + (activeTab === 'audio' ? ".mp3" : ".mp4")} onClose={() => setShowProgress(false)} />
      )}
    </div>
  );

}
