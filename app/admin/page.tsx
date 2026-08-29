'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  SiteDatabase,
  SiteSettings,
  Activity,
  Tour,
  Transfer,
  Review,
  GalleryItem,
  FAQItem,
  SEOPageData,
  LeadInquiry,
} from '@/lib/types';
import {
  LayoutDashboard,
  Settings,
  Waves,
  Compass,
  Car,
  Star,
  Camera,
  HelpCircle,
  Search,
  Users,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  ShieldCheck,
  Upload,
  Download,
  FileJson,
  Key,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  X,
  Sparkles,
  Info,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [data, setData] = useState<SiteDatabase | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Activity Edit Modal State
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // Tour Edit Modal State
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  // Transfer Edit Modal State
  const [editingTransfer, setEditingTransfer] = useState<Transfer | null>(null);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  // Review Edit Modal State
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Gallery Edit Modal State
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  // FAQ Edit Modal State
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  // Password Change State
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');

  // Fetch initial content
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authRes = await fetch('/api/auth');
        const authData = await authRes.json();
        if (!authData.authenticated) {
          router.push('/admin/login');
          return;
        }

        const res = await fetch('/api/content');
        if (!res.ok) throw new Error('Failed to load database');
        const dbData = await res.json();
        setData(dbData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error loading site data. Please ensure you are logged in.');
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  // Full Database Save
  const handleSaveAll = async (overrideData?: SiteDatabase) => {
    const targetData = overrideData || data;
    if (!targetData) return;
    setSaving(true);
    setSaveSuccess(false);
    setError('');

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'full_sync',
          data: targetData,
        }),
      });

      if (!res.ok) throw new Error('Save failed');

      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to save changes to database.');
      setSaving(false);
    }
  };

  // Export JSON Backup (for committing to GitHub)
  const handleExportJSON = () => {
    if (!data) return;
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hikka-surf-school-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON Backup
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setData(parsed);
        handleSaveAll(parsed);
        alert('Database successfully imported and saved!');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  // Image File Uploader Helper
  const handleImageUpload = async (
    file: File,
    onSuccess: (url: string) => void
  ) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (result.success && result.url) {
        onSuccess(result.url);
      } else {
        alert(result.error || 'Upload failed');
      }
    } catch (err) {
      alert('Error uploading file');
    }
  };

  // Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_password',
          newPassword,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setPasswordMsg('Password changed successfully!');
        setNewPassword('');
      } else {
        setPasswordMsg(result.error || 'Failed to update password');
      }
    } catch (err) {
      setPasswordMsg('Server error changing password');
    }
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (id: string, status: LeadInquiry['status']) => {
    if (!data) return;
    const updated = data.inquiries.map((inq) =>
      inq.id === id ? { ...inq, status } : inq
    );
    const newData = { ...data, inquiries: updated };
    setData(newData);
    await fetch('/api/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-surf-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold">Loading Admin CMS...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="bg-slate-800 p-8 rounded-3xl text-center space-y-4 max-w-md">
          <p className="text-red-400 font-bold">{error || 'Session expired'}</p>
          <Link
            href="/admin/login"
            className="px-6 py-2.5 bg-surf-600 rounded-xl font-bold text-sm inline-block"
          >
            Login to Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col">
      {/* Admin Topbar */}
      <header className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-surf-500 to-ocean-500 flex items-center justify-center text-white font-bold shadow-md">
            ❤️
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-white text-base sm:text-lg leading-none">
              Hikka Surf School CMS
            </h1>
            <p className="text-[11px] text-gray-400">Content Management & SEO Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {saveSuccess && (
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800">
              <CheckCircle className="w-4 h-4" /> Saved!
            </span>
          )}

          <button
            onClick={() => handleSaveAll()}
            disabled={saving}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-gray-200 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-slate-700 rounded-xl transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 bg-slate-800/60 border-r border-slate-700/80 p-3 space-y-1 overflow-x-auto md:overflow-y-auto">
          <div className="hidden md:block px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Content Modules
          </div>

          {[
            { id: 'overview', label: 'Dashboard & Leads', icon: LayoutDashboard },
            { id: 'branding', label: 'Branding & Contact', icon: Settings },
            { id: 'hero', label: 'Hero & Homepage', icon: Sparkles },
            { id: 'activities', label: '🏄 Surf & Activities', icon: Waves },
            { id: 'tours', label: '🌴 Sri Lanka Day Trips', icon: Compass },
            { id: 'transfers', label: '🚕 Transfers & Taxi', icon: Car },
            { id: 'reviews', label: '⭐ Google Reviews', icon: Star },
            { id: 'gallery', label: '📷 Photo Gallery', icon: Camera },
            { id: 'faqs', label: '❓ FAQ Manager', icon: HelpCircle },
            { id: 'seo', label: '🔍 100% SEO Meta', icon: Search },
            { id: 'backup', label: '💾 Backup / GitHub', icon: FileJson },
            { id: 'security', label: '🔒 Password & Auth', icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left ${
                  activeTab === tab.id
                    ? 'bg-surf-600 text-white shadow-md shadow-surf-600/30'
                    : 'text-gray-300 hover:bg-slate-700/60 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-6xl">
          {/* ========================================================
              TAB 1: OVERVIEW & LEADS
             ======================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-heading text-white">
                  Dashboard Overview
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Summary of your content and recent WhatsApp booking inquiries.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                  <span className="text-xs text-gray-400 uppercase font-bold">Activities</span>
                  <div className="text-3xl font-extrabold font-heading text-surf-400 mt-1">
                    {data.activities?.length || 0}
                  </div>
                </div>

                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                  <span className="text-xs text-gray-400 uppercase font-bold">Day Trips</span>
                  <div className="text-3xl font-extrabold font-heading text-amber-400 mt-1">
                    {data.tours?.length || 0}
                  </div>
                </div>

                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                  <span className="text-xs text-gray-400 uppercase font-bold">Google Reviews</span>
                  <div className="text-3xl font-extrabold font-heading text-emerald-400 mt-1">
                    {data.reviews?.length || 0}
                  </div>
                </div>

                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
                  <span className="text-xs text-gray-400 uppercase font-bold">Inquiries Logged</span>
                  <div className="text-3xl font-extrabold font-heading text-cyan-400 mt-1">
                    {data.inquiries?.length || 0}
                  </div>
                </div>
              </div>

              {/* Inquiries Log */}
              <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white">
                      Recent Booking Inquiries & Leads
                    </h3>
                    <p className="text-xs text-gray-400">
                      Captured when visitors click WhatsApp or submit requests on the site.
                    </p>
                  </div>
                </div>

                {data.inquiries?.length === 0 ? (
                  <p className="text-sm text-gray-400 py-6 text-center">
                    No inquiries recorded yet. When travelers click book, they will appear here.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-700 text-gray-400 uppercase text-[10px]">
                          <th className="py-3 px-2">Date / Time</th>
                          <th className="py-3 px-2">Customer</th>
                          <th className="py-3 px-2">Activity</th>
                          <th className="py-3 px-2">Booked For</th>
                          <th className="py-3 px-2">Guests</th>
                          <th className="py-3 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/60">
                        {data.inquiries?.map((inq) => (
                          <tr key={inq.id} className="hover:bg-slate-700/30">
                            <td className="py-3 px-2 text-gray-400 text-xs">
                              {new Date(inq.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-2 font-semibold text-white">
                              {inq.name}
                              {inq.contactNumber && (
                                <div className="text-[11px] text-gray-400">{inq.contactNumber}</div>
                              )}
                            </td>
                            <td className="py-3 px-2 text-surf-300 font-medium">
                              {inq.activity}
                            </td>
                            <td className="py-3 px-2 text-gray-300">
                              {inq.date} ({inq.preferredTime})
                            </td>
                            <td className="py-3 px-2 text-gray-300">
                              {inq.guestsCount} Pax
                            </td>
                            <td className="py-3 px-2">
                              <select
                                value={inq.status}
                                onChange={(e) =>
                                  handleUpdateInquiryStatus(
                                    inq.id,
                                    e.target.value as LeadInquiry['status']
                                  )
                                }
                                className={`text-xs px-2.5 py-1 rounded-lg font-bold ${
                                  inq.status === 'booked'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : inq.status === 'contacted'
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                    : inq.status === 'cancelled'
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                }`}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="booked">Booked ✓</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 2: BRANDING & CONTACT SETTINGS
             ======================================================== */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-heading text-white">
                  Branding & Contact Information
                </h2>
                <p className="text-sm text-gray-400">
                  Update business phone, official WhatsApp number, address, and Google Maps embed.
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={data.settings.businessName}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...data.settings, businessName: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Brand Heart / Emoji
                    </label>
                    <input
                      type="text"
                      value={data.settings.brandHeart}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...data.settings, brandHeart: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                    Main Tagline
                  </label>
                  <input
                    type="text"
                    value={data.settings.tagline}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...data.settings, tagline: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-emerald-400 mb-1">
                      WhatsApp Number (International format)
                    </label>
                    <input
                      type="text"
                      value={data.settings.whatsappNumber}
                      placeholder="+94771234567"
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...data.settings, whatsappNumber: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-emerald-500/50 rounded-xl text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Phone Number (Display)
                    </label>
                    <input
                      type="text"
                      value={data.settings.phoneNumber}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...data.settings, phoneNumber: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={data.settings.email}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...data.settings, email: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                    Beach Address / Location
                  </label>
                  <input
                    type="text"
                    value={data.settings.address}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...data.settings, address: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Google Maps URL
                    </label>
                    <input
                      type="text"
                      value={data.settings.googleMapsUrl}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...data.settings, googleMapsUrl: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Google Maps Embed Iframe URL
                    </label>
                    <input
                      type="text"
                      value={data.settings.googleMapsEmbedIframe}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: { ...data.settings, googleMapsEmbedIframe: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                    />
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sand-400 mb-3">
                    Social Media Profiles
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Instagram URL</label>
                      <input
                        type="text"
                        value={data.settings.instagramUrl}
                        onChange={(e) =>
                          setData({
                            ...data,
                            settings: { ...data.settings, instagramUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Facebook URL</label>
                      <input
                        type="text"
                        value={data.settings.facebookUrl}
                        onChange={(e) =>
                          setData({
                            ...data,
                            settings: { ...data.settings, facebookUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">TripAdvisor URL</label>
                      <input
                        type="text"
                        value={data.settings.tripadvisorUrl}
                        onChange={(e) =>
                          setData({
                            ...data,
                            settings: { ...data.settings, tripadvisorUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Google Business URL</label>
                      <input
                        type="text"
                        value={data.settings.googleBusinessUrl}
                        onChange={(e) =>
                          setData({
                            ...data,
                            settings: { ...data.settings, googleBusinessUrl: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Announcement Banner */}
                <div className="pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-sand-400">
                      Top Announcement Banner
                    </h4>
                    <label className="flex items-center gap-2 text-xs text-gray-300">
                      <input
                        type="checkbox"
                        checked={data.settings.announcementBanner?.enabled}
                        onChange={(e) =>
                          setData({
                            ...data,
                            settings: {
                              ...data.settings,
                              announcementBanner: {
                                ...data.settings.announcementBanner,
                                enabled: e.target.checked,
                              },
                            },
                          })
                        }
                        className="rounded text-surf-600"
                      />
                      <span>Enable Banner</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data.settings.announcementBanner?.text || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: {
                          ...data.settings,
                          announcementBanner: {
                            ...data.settings.announcementBanner,
                            text: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 3: HERO & HOMEPAGE CONTENT
             ======================================================== */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-heading text-white">
                  Hero & Homepage Content
                </h2>
                <p className="text-sm text-gray-400">
                  Customize hero titles, description, background video/photo, and local story.
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={data.settings.heroHeadline}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...data.settings, heroHeadline: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                    Hero Subheadline / Tagline
                  </label>
                  <input
                    type="text"
                    value={data.settings.heroSubheadline}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...data.settings, heroSubheadline: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                    Hero Short Description
                  </label>
                  <textarea
                    rows={3}
                    value={data.settings.heroDescription}
                    onChange={(e) =>
                      setData({
                        ...data,
                        settings: { ...data.settings, heroDescription: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>

                {/* Hero Media */}
                <div className="pt-4 border-t border-slate-700">
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                    Hero Background Media URL
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={data.settings.heroMedia?.url || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          settings: {
                            ...data.settings,
                            heroMedia: { ...data.settings.heroMedia, url: e.target.value },
                          },
                        })
                      }
                      className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                    />
                    <label className="px-4 py-2.5 bg-surf-600 hover:bg-surf-700 text-white rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5">
                      <Upload className="w-4 h-4" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload(file, (url) => {
                              setData({
                                ...data,
                                settings: {
                                  ...data.settings,
                                  heroMedia: { ...data.settings.heroMedia, url },
                                },
                              });
                            });
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* About Story Paragraphs */}
                <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sand-400 mb-3">
                    About Story Content
                  </h4>
                  <div className="space-y-3">
                    {data.settings.aboutStory?.content?.map((paragraph, i) => (
                      <div key={i}>
                        <label className="block text-[11px] text-gray-400 mb-1">
                          Paragraph {i + 1}
                        </label>
                        <textarea
                          rows={2}
                          value={paragraph}
                          onChange={(e) => {
                            const updatedContent = [...data.settings.aboutStory.content];
                            updatedContent[i] = e.target.value;
                            setData({
                              ...data,
                              settings: {
                                ...data.settings,
                                aboutStory: {
                                  ...data.settings.aboutStory,
                                  content: updatedContent,
                                },
                              },
                            });
                          }}
                          className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 4: ACTIVITIES & SURF LESSONS
             ======================================================== */}
          {activeTab === 'activities' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white">
                    Activities & Surf Lessons
                  </h2>
                  <p className="text-sm text-gray-400">
                    Edit pricing, packages, inclusions, safety rules, and partner flags.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newAct: Activity = {
                      id: `act-${Date.now()}`,
                      slug: `new-activity-${Date.now().toString().slice(-4)}`,
                      icon: '🏄',
                      title: 'New Activity',
                      tagline: 'Activity Tagline',
                      category: 'ocean',
                      shortDescription: 'Short summary...',
                      fullDescription: 'Full description...',
                      heroImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
                      galleryImages: [],
                      isPartnerActivity: false,
                      buttonText: 'Book Activity',
                      suitableFor: ['Beginners', 'Families'],
                      included: ['Equipment provided'],
                      whatToBring: ['Swimwear', 'Towel'],
                      meetingPoint: 'Hikka Surf School Beach Hut, Hikkaduwa',
                      safetyInfo: 'Life jackets and ocean safety briefing provided.',
                      packages: [
                        {
                          id: 'pkg-1',
                          title: 'Standard Package',
                          duration: '1.5 Hours',
                          priceUSD: 25,
                          priceLKR: 8000,
                          description: 'Standard session',
                          features: ['Equipment included', 'Instructor assistance'],
                        },
                      ],
                      faqs: [],
                      seo: {
                        metaTitle: 'Activity in Hikkaduwa',
                        metaDescription: 'Book activity in Hikkaduwa',
                        keywords: ['Hikkaduwa activity'],
                      },
                    };
                    setEditingActivity(newAct);
                    setIsActivityModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-surf-600 hover:bg-surf-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Activity</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.activities?.map((act) => (
                  <div
                    key={act.id}
                    className="bg-slate-800 p-5 rounded-3xl border border-slate-700 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{act.icon}</span>
                        {act.isPartnerActivity ? (
                          <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                            Partner Activity
                          </span>
                        ) : (
                          <span className="bg-surf-500/20 text-surf-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-surf-500/30">
                            Direct School
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold font-heading text-white">{act.title}</h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{act.shortDescription}</p>

                      <div className="mt-3 py-2 px-3 bg-slate-900 rounded-xl border border-slate-700/60 text-xs flex items-center justify-between">
                        <span className="text-gray-400">Packages:</span>
                        <span className="font-bold text-surf-300">{act.packages?.length || 0} Pricing Options</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700">
                      <button
                        onClick={() => {
                          setEditingActivity(act);
                          setIsActivityModalOpen(true);
                        }}
                        className="flex-1 py-2 bg-surf-600 hover:bg-surf-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Full Activity</span>
                      </button>

                      <Link
                        href={`/activities/${act.slug}`}
                        target="_blank"
                        className="p-2 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-xl"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => {
                          if (confirm(`Delete "${act.title}"?`)) {
                            const updated = data.activities.filter((a) => a.id !== act.id);
                            setData({ ...data, activities: updated });
                          }
                        }}
                        className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-xl"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 5: SRI LANKA DAY TRIPS
             ======================================================== */}
          {activeTab === 'tours' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white">
                    Sri Lanka Day Trips & Excursions
                  </h2>
                  <p className="text-sm text-gray-400">
                    Manage Galle Fort, Bentota, Yala safari, and Ella highland tours.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newTour: Tour = {
                      id: `tour-${Date.now()}`,
                      slug: `day-tour-${Date.now().toString().slice(-4)}`,
                      title: 'New Sri Lanka Tour',
                      destination: 'Destination Name',
                      duration: 'Full Day (8-10 Hours)',
                      priceFromUSD: 50,
                      priceFromLKR: 16000,
                      badge: 'Day Trip',
                      shortDescription: 'Tour description...',
                      itinerary: [
                        { stop: 'Hotel Pickup', description: 'Pickup from Hikkaduwa' },
                      ],
                      highlights: ['Scenic spots', 'Local driver'],
                      included: ['AC vehicle', 'Driver & fuel'],
                      heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
                      isPartnerActivity: false,
                      seo: {
                        metaTitle: 'Day Tour Sri Lanka',
                        metaDescription: 'Book day tour',
                        keywords: ['Day tour Sri Lanka'],
                      },
                    };
                    setEditingTour(newTour);
                    setIsTourModalOpen(true);
                  }}
                  className="px-4 py-2.5 bg-surf-600 hover:bg-surf-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Tour</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.tours?.map((tour) => (
                  <div
                    key={tour.id}
                    className="bg-slate-800 p-5 rounded-3xl border border-slate-700 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-400 uppercase">{tour.badge || 'Tour'}</span>
                        <span className="text-xs text-gray-400 font-semibold">{tour.duration}</span>
                      </div>

                      <h3 className="text-lg font-bold font-heading text-white">{tour.title}</h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{tour.shortDescription}</p>

                      <div className="mt-3 py-2 px-3 bg-slate-900 rounded-xl border border-slate-700/60 text-xs flex items-center justify-between">
                        <span className="text-gray-400">Price From:</span>
                        <span className="font-bold text-surf-300">${tour.priceFromUSD} USD</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700">
                      <button
                        onClick={() => {
                          setEditingTour(tour);
                          setIsTourModalOpen(true);
                        }}
                        className="flex-1 py-2 bg-surf-600 hover:bg-surf-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Tour Details</span>
                      </button>

                      <Link
                        href={`/tours/${tour.slug}`}
                        target="_blank"
                        className="p-2 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-xl"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => {
                          if (confirm(`Delete tour "${tour.title}"?`)) {
                            const updated = data.tours.filter((t) => t.id !== tour.id);
                            setData({ ...data, tours: updated });
                          }
                        }}
                        className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-xl"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 6: TRANSFERS & TAXI
             ======================================================== */}
          {activeTab === 'transfers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white">
                    Airport Transfers & Taxi Services
                  </h2>
                  <p className="text-sm text-gray-400">
                    Manage Colombo Airport (CMB) pickups and private chauffeur hire packages.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.transfers?.map((trans, idx) => (
                  <div
                    key={trans.id || idx}
                    className="bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-4"
                  >
                    <div>
                      <label className="block text-[11px] text-gray-400 uppercase font-bold mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={trans.title}
                        onChange={(e) => {
                          const updated = [...data.transfers];
                          updated[idx] = { ...trans, title: e.target.value };
                          setData({ ...data, transfers: updated });
                        }}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">USD Price</label>
                        <input
                          type="number"
                          value={trans.priceUSD}
                          onChange={(e) => {
                            const updated = [...data.transfers];
                            updated[idx] = { ...trans, priceUSD: Number(e.target.value) };
                            setData({ ...data, transfers: updated });
                          }}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Vehicle Type</label>
                        <input
                          type="text"
                          value={trans.vehicleType}
                          onChange={(e) => {
                            const updated = [...data.transfers];
                            updated[idx] = { ...trans, vehicleType: e.target.value };
                            setData({ ...data, transfers: updated });
                          }}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={trans.description}
                        onChange={(e) => {
                          const updated = [...data.transfers];
                          updated[idx] = { ...trans, description: e.target.value };
                          setData({ ...data, transfers: updated });
                        }}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 7: GOOGLE REVIEWS
             ======================================================== */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white">
                    Google Reviews & Customer Testimonials
                  </h2>
                  <p className="text-sm text-gray-400">
                    Add genuine traveler feedback with reviewer photo, rating, and activity.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newRev: Review = {
                      id: `rev-${Date.now()}`,
                      authorName: 'Traveler Name',
                      authorLocation: 'Country / City',
                      authorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                      rating: 5,
                      date: 'Recently',
                      source: 'Google',
                      activityReviewed: 'Beginner Surf Lesson',
                      text: 'Amazing surf lesson in Hikkaduwa! The instructors were very patient and helpful.',
                      verified: true,
                      featured: true,
                    };
                    const updated = [newRev, ...data.reviews];
                    setData({ ...data, reviews: updated });
                  }}
                  className="px-4 py-2.5 bg-surf-600 hover:bg-surf-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.reviews?.map((rev, idx) => (
                  <div
                    key={rev.id || idx}
                    className="bg-slate-800 p-5 rounded-3xl border border-slate-700 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.authorPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                          alt={rev.authorName}
                          className="w-10 h-10 rounded-full object-cover border border-slate-600"
                        />
                        <div>
                          <input
                            type="text"
                            value={rev.authorName}
                            onChange={(e) => {
                              const updated = [...data.reviews];
                              updated[idx] = { ...rev, authorName: e.target.value };
                              setData({ ...data, reviews: updated });
                            }}
                            className="bg-slate-900 border border-slate-700 px-2 py-1 rounded text-white text-xs font-bold"
                          />
                          <input
                            type="text"
                            value={rev.authorLocation}
                            onChange={(e) => {
                              const updated = [...data.reviews];
                              updated[idx] = { ...rev, authorLocation: e.target.value };
                              setData({ ...data, reviews: updated });
                            }}
                            className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-gray-400 text-[11px] mt-1 block"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const updated = data.reviews.filter((_, i) => i !== idx);
                          setData({ ...data, reviews: updated });
                        }}
                        className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] text-gray-400">Activity</label>
                        <input
                          type="text"
                          value={rev.activityReviewed}
                          onChange={(e) => {
                            const updated = [...data.reviews];
                            updated[idx] = { ...rev, activityReviewed: e.target.value };
                            setData({ ...data, reviews: updated });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-cyan-300 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Stars (1-5)</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={rev.rating}
                          onChange={(e) => {
                            const updated = [...data.reviews];
                            updated[idx] = { ...rev, rating: Number(e.target.value) };
                            setData({ ...data, reviews: updated });
                          }}
                          className="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-amber-400 font-bold text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400">Review Text</label>
                      <textarea
                        rows={3}
                        value={rev.text}
                        onChange={(e) => {
                          const updated = [...data.reviews];
                          updated[idx] = { ...rev, text: e.target.value };
                          setData({ ...data, reviews: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl text-gray-200 text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 8: PHOTO GALLERY
             ======================================================== */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white">
                    Photo & Video Gallery Manager
                  </h2>
                  <p className="text-sm text-gray-400">
                    Upload and manage high-quality photos by category.
                  </p>
                </div>
                <label className="px-4 py-2.5 bg-surf-600 hover:bg-surf-700 text-white font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5 shadow-md">
                  <Upload className="w-4 h-4" />
                  <span>Upload New Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file, (url) => {
                          const newItem: GalleryItem = {
                            id: `gal-${Date.now()}`,
                            title: file.name.split('.')[0] || 'Ocean Photo',
                            category: 'Surfing',
                            imageUrl: url,
                            caption: 'Hikkaduwa beach photo',
                          };
                          setData({
                            ...data,
                            gallery: [newItem, ...data.gallery],
                          });
                        });
                      }
                    }}
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.gallery?.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 flex flex-col"
                  >
                    <div className="h-40 relative bg-slate-900">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          const updated = data.gallery.filter((_, i) => i !== idx);
                          setData({ ...data, gallery: updated });
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="p-3 space-y-2 flex-1">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...data.gallery];
                          updated[idx] = { ...item, title: e.target.value };
                          setData({ ...data, gallery: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-white text-xs font-bold"
                        placeholder="Title..."
                      />

                      <select
                        value={item.category}
                        onChange={(e) => {
                          const updated = [...data.gallery];
                          updated[idx] = {
                            ...item,
                            category: e.target.value as GalleryItem['category'],
                          };
                          setData({ ...data, gallery: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-surf-300 text-xs"
                      >
                        <option value="Surfing">Surfing</option>
                        <option value="Ocean">Ocean</option>
                        <option value="Snorkeling">Snorkeling</option>
                        <option value="Turtles">Turtles</option>
                        <option value="Fishing">Fishing</option>
                        <option value="Boats">Boats</option>
                        <option value="Hikkaduwa">Hikkaduwa</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Happy Customers">Happy Customers</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 9: FAQ MANAGER
             ======================================================== */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-white">
                    FAQ Accordion Manager
                  </h2>
                  <p className="text-sm text-gray-400">
                    Add and customize categorized questions and answers.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newFaq: FAQItem = {
                      id: `faq-${Date.now()}`,
                      category: 'Surfing',
                      question: 'New Question?',
                      answer: 'Answer to the question...',
                      order: data.faqs.length + 1,
                    };
                    setData({ ...data, faqs: [...data.faqs, newFaq] });
                  }}
                  className="px-4 py-2.5 bg-surf-600 hover:bg-surf-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.faqs?.map((faq, idx) => (
                  <div
                    key={faq.id || idx}
                    className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <select
                        value={faq.category}
                        onChange={(e) => {
                          const updated = [...data.faqs];
                          updated[idx] = {
                            ...faq,
                            category: e.target.value as FAQItem['category'],
                          };
                          setData({ ...data, faqs: updated });
                        }}
                        className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-surf-300 text-xs font-bold"
                      >
                        <option value="Surfing">Surfing</option>
                        <option value="Snorkeling & Wildlife">Snorkeling & Wildlife</option>
                        <option value="Booking & Payments">Booking & Payments</option>
                        <option value="Day Trips & Transport">Day Trips & Transport</option>
                        <option value="General">General</option>
                      </select>

                      <button
                        onClick={() => {
                          const updated = data.faqs.filter((_, i) => i !== idx);
                          setData({ ...data, faqs: updated });
                        }}
                        className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => {
                        const updated = [...data.faqs];
                        updated[idx] = { ...faq, question: e.target.value };
                        setData({ ...data, faqs: updated });
                      }}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm font-bold"
                      placeholder="Question..."
                    />

                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => {
                        const updated = [...data.faqs];
                        updated[idx] = { ...faq, answer: e.target.value };
                        setData({ ...data, faqs: updated });
                      }}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-gray-200 text-xs"
                      placeholder="Answer..."
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 10: 100% SEO META TAGS
             ======================================================== */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-heading text-white">
                  100% SEO Meta Tag Manager
                </h2>
                <p className="text-sm text-gray-400">
                  Target Google keywords, customize Page Titles and Meta Descriptions per page route.
                </p>
              </div>

              <div className="space-y-4">
                {Object.entries(data.seoPages || {}).map(([path, seo]) => (
                  <div
                    key={path}
                    className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sand-400 uppercase tracking-wider bg-sand-950/60 px-3 py-1 rounded-full border border-sand-800/40">
                        Route: {path}
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] text-gray-400 uppercase font-bold mb-1">
                        Meta Title (Google Browser Tab)
                      </label>
                      <input
                        type="text"
                        value={seo.metaTitle}
                        onChange={(e) => {
                          const updated = {
                            ...data.seoPages,
                            [path]: { ...seo, metaTitle: e.target.value },
                          };
                          setData({ ...data, seoPages: updated });
                        }}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-gray-400 uppercase font-bold mb-1">
                        Meta Description (Google Search Snippet)
                      </label>
                      <textarea
                        rows={2}
                        value={seo.metaDescription}
                        onChange={(e) => {
                          const updated = {
                            ...data.seoPages,
                            [path]: { ...seo, metaDescription: e.target.value },
                          };
                          setData({ ...data, seoPages: updated });
                        }}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-gray-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-gray-400 uppercase font-bold mb-1">
                        Target Keywords (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={seo.keywords?.join(', ') || ''}
                        onChange={(e) => {
                          const kws = e.target.value.split(',').map((s) => s.trim());
                          const updated = {
                            ...data.seoPages,
                            [path]: { ...seo, keywords: kws },
                          };
                          setData({ ...data, seoPages: updated });
                        }}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-surf-300 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 11: BACKUP & GITHUB EXPORT / IMPORT
             ======================================================== */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-heading text-white">
                  Database Backup & GitHub Deployment
                </h2>
                <p className="text-sm text-gray-400">
                  Export your updated content JSON file anytime to commit to your GitHub repository or restore backups.
                </p>
              </div>

              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 space-y-6">
                <div className="p-4 bg-surf-950/60 rounded-2xl border border-surf-800/40 text-xs text-surf-200 flex items-start gap-3">
                  <Info className="w-5 h-5 text-surf-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-white">Hosting on GitHub / Vercel / Netlify:</p>
                    <p>
                      All changes are automatically saved into your live database. If you want to sync changes directly with your GitHub repository files, click <strong>"Download Full Database JSON"</strong> below, and replace <code className="text-sand-300">data/initial-data.json</code> in your repo!
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Export */}
                  <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-700 text-center space-y-3">
                    <Download className="w-8 h-8 text-emerald-400 mx-auto" />
                    <h3 className="font-bold text-white text-base">Export Database Backup</h3>
                    <p className="text-xs text-gray-400">
                      Download a complete copy of all your texts, packages, prices, reviews, and SEO.
                    </p>
                    <button
                      onClick={handleExportJSON}
                      className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download JSON Backup</span>
                    </button>
                  </div>

                  {/* Import */}
                  <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-700 text-center space-y-3">
                    <Upload className="w-8 h-8 text-surf-400 mx-auto" />
                    <h3 className="font-bold text-white text-base">Restore / Import Backup</h3>
                    <p className="text-xs text-gray-400">
                      Upload a previous JSON backup file to instantly restore all site content.
                    </p>
                    <label className="w-full py-3 px-4 bg-surf-600 hover:bg-surf-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>Select JSON File</span>
                      <input
                        type="file"
                        accept=".json,application/json"
                        className="hidden"
                        onChange={handleImportJSON}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB 12: SECURITY & PASSWORD
             ======================================================== */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-lg">
              <div>
                <h2 className="text-2xl font-bold font-heading text-white">
                  Security & Admin Password
                </h2>
                <p className="text-sm text-gray-400">
                  Update your admin access password.
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-4">
                {passwordMsg && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold ${
                      passwordMsg.includes('success')
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {passwordMsg}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      New Admin Password
                    </label>
                    <input
                      type="password"
                      placeholder="Minimum 4 characters..."
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-surf-600 hover:bg-surf-700 text-white font-bold rounded-xl text-sm shadow-md transition-all"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================
          MODAL: EDIT FULL ACTIVITY
         ======================================================== */}
      {isActivityModalOpen && editingActivity && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-3xl border border-slate-700 max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden text-white">
            <div className="p-5 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-heading font-bold text-xl">
                Edit Activity: {editingActivity.title}
              </h3>
              <button
                onClick={() => setIsActivityModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingActivity.title}
                    onChange={(e) =>
                      setEditingActivity({ ...editingActivity, title: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Icon (Emoji)</label>
                  <input
                    type="text"
                    value={editingActivity.icon}
                    onChange={(e) =>
                      setEditingActivity({ ...editingActivity, icon: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingActivity.tagline}
                  onChange={(e) =>
                    setEditingActivity({ ...editingActivity, tagline: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingActivity.shortDescription}
                  onChange={(e) =>
                    setEditingActivity({ ...editingActivity, shortDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={editingActivity.fullDescription}
                  onChange={(e) =>
                    setEditingActivity({ ...editingActivity, fullDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              {/* Partner Activity Toggle */}
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-700 space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <input
                    type="checkbox"
                    checked={editingActivity.isPartnerActivity}
                    onChange={(e) =>
                      setEditingActivity({
                        ...editingActivity,
                        isPartnerActivity: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <span>Is this a Partner Activity? (e.g. Whale Watching, Deep Sea Fishing)</span>
                </label>
                {editingActivity.isPartnerActivity && (
                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1">Partner Disclaimer Text</label>
                    <input
                      type="text"
                      value={editingActivity.partnerDisclaimer || ''}
                      onChange={(e) =>
                        setEditingActivity({
                          ...editingActivity,
                          partnerDisclaimer: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-amber-200 text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Hero Image */}
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Hero Photo URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingActivity.heroImage}
                    onChange={(e) =>
                      setEditingActivity({ ...editingActivity, heroImage: e.target.value })
                    }
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                  />
                  <label className="px-3 py-2 bg-surf-600 text-white rounded-xl text-xs font-bold cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file, (url) => {
                            setEditingActivity({ ...editingActivity, heroImage: url });
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Pricing Packages */}
              <div className="pt-2 border-t border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-sand-400 text-xs uppercase">
                    Pricing Packages ({editingActivity.packages.length})
                  </h4>
                  <button
                    onClick={() => {
                      const newPkg = {
                        id: `pkg-${Date.now()}`,
                        title: 'New Option',
                        duration: '1.5 Hours',
                        priceUSD: 25,
                        priceLKR: 8000,
                        description: 'Package description',
                        features: ['Equipment included'],
                      };
                      setEditingActivity({
                        ...editingActivity,
                        packages: [...editingActivity.packages, newPkg],
                      });
                    }}
                    className="px-2.5 py-1 bg-surf-600 text-white rounded-lg text-xs font-bold"
                  >
                    + Add Option
                  </button>
                </div>

                <div className="space-y-3">
                  {editingActivity.packages.map((pkg, pIdx) => (
                    <div key={pkg.id || pIdx} className="p-3 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] text-gray-400">Title</label>
                          <input
                            type="text"
                            value={pkg.title}
                            onChange={(e) => {
                              const updated = [...editingActivity.packages];
                              updated[pIdx] = { ...pkg, title: e.target.value };
                              setEditingActivity({ ...editingActivity, packages: updated });
                            }}
                            className="w-full bg-slate-800 border border-slate-700 px-2 py-1 rounded text-white text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400">USD Price</label>
                          <input
                            type="number"
                            value={pkg.priceUSD}
                            onChange={(e) => {
                              const updated = [...editingActivity.packages];
                              updated[pIdx] = { ...pkg, priceUSD: Number(e.target.value) };
                              setEditingActivity({ ...editingActivity, packages: updated });
                            }}
                            className="w-full bg-slate-800 border border-slate-700 px-2 py-1 rounded text-emerald-400 font-bold text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400">Duration</label>
                          <input
                            type="text"
                            value={pkg.duration}
                            onChange={(e) => {
                              const updated = [...editingActivity.packages];
                              updated[pIdx] = { ...pkg, duration: e.target.value };
                              setEditingActivity({ ...editingActivity, packages: updated });
                            }}
                            className="w-full bg-slate-800 border border-slate-700 px-2 py-1 rounded text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-700 flex justify-end gap-3">
              <button
                onClick={() => setIsActivityModalOpen(false)}
                className="px-4 py-2 bg-slate-700 text-gray-200 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const updatedActivities = data.activities.map((a) =>
                    a.id === editingActivity.id ? editingActivity : a
                  );
                  // If new, push
                  if (!data.activities.some((a) => a.id === editingActivity.id)) {
                    updatedActivities.push(editingActivity);
                  }
                  setData({ ...data, activities: updatedActivities });
                  setIsActivityModalOpen(false);
                }}
                className="px-6 py-2 bg-surf-600 hover:bg-surf-700 text-white rounded-xl text-xs font-bold"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDIT TOUR
         ======================================================== */}
      {isTourModalOpen && editingTour && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-3xl border border-slate-700 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-white">
            <div className="p-5 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-heading font-bold text-xl">
                Edit Tour: {editingTour.title}
              </h3>
              <button
                onClick={() => setIsTourModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Tour Title</label>
                  <input
                    type="text"
                    value={editingTour.title}
                    onChange={(e) =>
                      setEditingTour({ ...editingTour, title: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Destination</label>
                  <input
                    type="text"
                    value={editingTour.destination}
                    onChange={(e) =>
                      setEditingTour({ ...editingTour, destination: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Price From (USD)</label>
                  <input
                    type="number"
                    value={editingTour.priceFromUSD}
                    onChange={(e) =>
                      setEditingTour({ ...editingTour, priceFromUSD: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-emerald-400 font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingTour.duration}
                    onChange={(e) =>
                      setEditingTour({ ...editingTour, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingTour.shortDescription}
                  onChange={(e) =>
                    setEditingTour({ ...editingTour, shortDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Hero Image URL</label>
                <input
                  type="text"
                  value={editingTour.heroImage}
                  onChange={(e) =>
                    setEditingTour({ ...editingTour, heroImage: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
            </div>

            <div className="p-4 border-t border-slate-700 flex justify-end gap-3">
              <button
                onClick={() => setIsTourModalOpen(false)}
                className="px-4 py-2 bg-slate-700 text-gray-200 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const updatedTours = data.tours.map((t) =>
                    t.id === editingTour.id ? editingTour : t
                  );
                  if (!data.tours.some((t) => t.id === editingTour.id)) {
                    updatedTours.push(editingTour);
                  }
                  setData({ ...data, tours: updatedTours });
                  setIsTourModalOpen(false);
                }}
                className="px-6 py-2 bg-surf-600 hover:bg-surf-700 text-white rounded-xl text-xs font-bold"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
