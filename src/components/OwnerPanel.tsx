import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchAvailability as loadAvailability,
  saveAvailability,
  logoutOwner,
  fetchGallery,
  saveGallery,
  uploadPhoto,
  type GalleryItem,
} from '../lib/ownerApi';
import { DEFAULT_GALLERY_ITEMS } from './Gallery';

interface OwnerPanelProps {
  onLogout: () => void;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function OwnerPanel({ onLogout }: OwnerPanelProps) {
  const today = new Date();
  const [activeTab, setActiveTab] = useState<'availability' | 'gallery'>('availability');

  // Availability state
  const [curYear, setCurYear] = useState(today.getFullYear());
  const [curMonth, setCurMonth] = useState(today.getMonth());
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Gallery state
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryItem[]>([]);
  const [galleryHasChanges, setGalleryHasChanges] = useState(false);
  const [savingGallery, setSavingGallery] = useState(false);

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoTall, setNewPhotoTall] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Load initial data
  const fetchData = useCallback(async () => {
    try {
      const [availData, galleryData] = await Promise.all([
        loadAvailability().catch(() => ({ bookedDates: [] })),
        fetchGallery().catch(() => ({ photos: null })),
      ]);
      setBookedDates(new Set(availData.bookedDates || []));

      if (galleryData && Array.isArray(galleryData.photos) && galleryData.photos.length > 0) {
        setGalleryPhotos(galleryData.photos);
      } else {
        setGalleryPhotos(DEFAULT_GALLERY_ITEMS);
      }
    } catch {
      showToast('Failed to load initial data', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const getDays = (y: number, m: number) => {
    const d = new Date(y, m, 1);
    const days: (Date | null)[] = [];
    for (let i = 0; i < d.getDay(); i++) days.push(null);
    while (d.getMonth() === m) {
      days.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return days;
  };

  const getDatesInRange = (start: string, end: string): string[] => {
    const dates: string[] = [];
    const cur = new Date(start);
    const endDate = new Date(end);
    if (cur > endDate) {
      return getDatesInRange(end, start);
    }
    while (cur <= endDate) {
      dates.push(formatDate(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return dates;
  };

  const handleDateClick = (day: Date, shiftKey: boolean) => {
    const ds = formatDate(day);

    if (shiftKey && rangeStart) {
      const rangeDates = getDatesInRange(rangeStart, ds);
      setSelectedDates((prev) => {
        const next = new Set(prev);
        rangeDates.forEach((d) => next.add(d));
        return next;
      });
      setRangeStart(ds);
      return;
    }

    setRangeStart(ds);
    setSelectedDates((prev) => {
      const next = new Set(prev);
      if (next.has(ds)) {
        next.delete(ds);
      } else {
        next.add(ds);
      }
      return next;
    });
  };

  const markAsBooked = () => {
    if (selectedDates.size === 0) return;
    setBookedDates((prev) => {
      const next = new Set(prev);
      selectedDates.forEach((d) => next.add(d));
      return next;
    });
    setSelectedDates(new Set());
    setHasChanges(true);
  };

  const markAsAvailable = () => {
    if (selectedDates.size === 0) return;
    setBookedDates((prev) => {
      const next = new Set(prev);
      selectedDates.forEach((d) => next.delete(d));
      return next;
    });
    setSelectedDates(new Set());
    setHasChanges(true);
  };

  const clearSelection = () => {
    setSelectedDates(new Set());
    setRangeStart(null);
  };

  const saveAvailabilityChanges = async () => {
    setSaving(true);
    try {
      const res = await saveAvailability([...bookedDates].sort());

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 403 || res.status === 401) {
          showToast('Session expired. Please login again.', 'error');
          setTimeout(onLogout, 1500);
          return;
        }
        throw new Error(data.error || 'Save failed');
      }

      showToast('Availability saved successfully', 'success');
      setHasChanges(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save changes';
      showToast(message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Handle File Selection from Device
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPEG, PNG, WebP)', 'error');
      return;
    }

    setSelectedFile(file);

    // Auto generate title from filename if title field is empty
    if (!newPhotoTitle.trim()) {
      const cleanTitle = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setNewPhotoTitle(cleanTitle);
    }

    // Generate local preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Add Photo Action
  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !previewUrl) {
      showToast('Please select a photo file from your device first', 'error');
      return;
    }
    if (!newPhotoTitle.trim()) {
      showToast('Please enter a Title / Caption for the photo', 'error');
      return;
    }

    setUploading(true);
    try {
      // Upload photo to backend / storage
      const res = await uploadPhoto(previewUrl, selectedFile.name);
      const photoUrl = res.url || previewUrl;

      const newItem: GalleryItem = {
        src: photoUrl,
        title: newPhotoTitle.trim(),
        tall: newPhotoTall,
      };

      setGalleryPhotos((prev) => [newItem, ...prev]);
      setSelectedFile(null);
      setPreviewUrl(null);
      setNewPhotoTitle('');
      setNewPhotoTall(false);
      if (fileInputRef.current) fileInputRef.current.value = '';

      setGalleryHasChanges(true);
      showToast('Photo added! Click "Save Gallery Changes" to publish.', 'success');
    } catch {
      showToast('Failed to process image. Try selecting a different photo.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setGalleryPhotos((prev) => prev.filter((_, i) => i !== index));
    setGalleryHasChanges(true);
  };

  const handleMovePhoto = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= galleryPhotos.length) return;

    const next = [...galleryPhotos];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;

    setGalleryPhotos(next);
    setGalleryHasChanges(true);
  };

  const handleSaveGallery = async () => {
    setSavingGallery(true);
    try {
      const res = await saveGallery(galleryPhotos);

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 403 || res.status === 401) {
          showToast('Session expired. Please login again.', 'error');
          setTimeout(onLogout, 1500);
          return;
        }
        throw new Error(data.error || 'Save failed');
      }

      showToast('Gallery photos saved successfully', 'success');
      setGalleryHasChanges(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save gallery';
      showToast(message, 'error');
    } finally {
      setSavingGallery(false);
    }
  };

  const handleLogout = async () => {
    await logoutOwner();
    onLogout();
  };

  const prevMonth = () => {
    if (curMonth === 0) {
      setCurMonth(11);
      setCurYear((p) => p - 1);
    } else {
      setCurMonth((p) => p - 1);
    }
  };

  const nextMonth = () => {
    if (curMonth === 11) {
      setCurMonth(0);
      setCurYear((p) => p + 1);
    } else {
      setCurMonth((p) => p + 1);
    }
  };

  const days = getDays(curYear, curMonth);

  const totalBookedThisMonth = days.filter(
    (d) => d && bookedDates.has(formatDate(d))
  ).length;
  const totalDaysThisMonth = days.filter((d) => d !== null).length;

  if (loading) {
    return (
      <div className="owner-panel-loading">
        <div className="owner-login-spinner" />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-ash)', marginTop: '1.5rem' }}>
          Loading owner portal...
        </p>
      </div>
    );
  }

  return (
    <div className="owner-panel">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`owner-toast ${toast.type === 'success' ? 'owner-toast-success' : 'owner-toast-error'}`}
          >
            {toast.type === 'success' ? '✓' : '✕'} {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="owner-header">
        <div className="owner-header-inner">
          <div className="flex items-center gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="gold-shimmer-text"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                    fontWeight: 300,
                    letterSpacing: '0.08em',
                  }}
                >
                  SaGa
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                    fontWeight: 300,
                    letterSpacing: '0.08em',
                    color: 'var(--color-warm-white)',
                  }}
                >
                  Montana
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ash)',
                  marginTop: '0.25rem',
                }}
              >
                Owner Portal
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-6">
              <button
                onClick={() => setActiveTab('availability')}
                className={`owner-tab-btn ${activeTab === 'availability' ? 'owner-tab-active' : ''}`}
              >
                📅 Availability
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`owner-tab-btn ${activeTab === 'gallery' ? 'owner-tab-active' : ''}`}
              >
                🖼️ Gallery ({galleryPhotos.length})
              </button>
            </div>
          </div>

          <button onClick={handleLogout} className="owner-logout-btn">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="owner-main">
        <div className="owner-content">
          {activeTab === 'availability' ? (
            <>
              {/* Availability Instructions */}
              <div className="owner-instructions">
                <p>Click dates to select them, then mark as booked or available. Use <strong>Shift + Click</strong> to select a range.</p>
              </div>

              {/* Calendar & Controls Grid */}
              <div className="owner-grid">
                {/* Calendar */}
                <div className="owner-calendar-card glass-dark">
                  {/* Month nav */}
                  <div className="flex justify-between items-center mb-8">
                    <button
                      onClick={prevMonth}
                      className="text-white/40 hover:text-[var(--color-champagne)] transition-colors text-lg"
                    >
                      ←
                    </button>
                    <span
                      className="text-sm tracking-[0.2em] uppercase text-[var(--color-warm-white)]"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 400,
                        fontSize: '1.1rem',
                      }}
                    >
                      {monthNames[curMonth]} {curYear}
                    </span>
                    <button
                      onClick={nextMonth}
                      className="text-white/40 hover:text-[var(--color-champagne)] transition-colors text-lg"
                    >
                      →
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-2 mb-3">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                      <span
                        key={d}
                        className="text-center text-[0.55rem] tracking-[0.2em] uppercase text-[var(--color-ash)]"
                        style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day, i) => {
                      if (!day) return <span key={`e-${i}`} />;
                      const ds = formatDate(day);
                      const isBooked = bookedDates.has(ds);
                      const isSelected = selectedDates.has(ds);

                      let cellClass = 'owner-cal-day';
                      if (isSelected) cellClass += ' owner-cal-selected';
                      else if (isBooked) cellClass += ' owner-cal-booked';
                      else cellClass += ' owner-cal-available';

                      return (
                        <button
                          key={ds}
                          onClick={(e) => handleDateClick(day, e.shiftKey)}
                          className={cellClass}
                        >
                          <span className="owner-cal-day-num">{day.getDate()}</span>
                          {isBooked && !isSelected && (
                            <span className="owner-cal-status-dot owner-cal-dot-booked" />
                          )}
                          {!isBooked && !isSelected && (
                            <span className="owner-cal-status-dot owner-cal-dot-available" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="owner-legend">
                    <div className="owner-legend-item">
                      <span className="owner-legend-dot owner-cal-dot-available" />
                      <span>Available</span>
                    </div>
                    <div className="owner-legend-item">
                      <span className="owner-legend-dot owner-cal-dot-booked" />
                      <span>Booked</span>
                    </div>
                    <div className="owner-legend-item">
                      <span className="owner-legend-dot" style={{ background: 'var(--color-champagne)' }} />
                      <span>Selected</span>
                    </div>
                  </div>
                </div>

                {/* Actions Sidebar */}
                <div className="owner-actions-card glass-dark">
                  <p className="eyebrow mb-6">Actions</p>

                  <div className="owner-stat-row">
                    <span>Month</span>
                    <span className="text-[var(--color-warm-white)]">
                      {monthNames[curMonth]} {curYear}
                    </span>
                  </div>
                  <div className="owner-stat-row">
                    <span>Booked days</span>
                    <span style={{ color: totalBookedThisMonth > 0 ? 'var(--color-burgundy-light)' : 'var(--color-warm-white)' }}>
                      {totalBookedThisMonth} / {totalDaysThisMonth}
                    </span>
                  </div>
                  <div className="owner-stat-row">
                    <span>Available days</span>
                    <span style={{ color: '#4ade80' }}>
                      {totalDaysThisMonth - totalBookedThisMonth} / {totalDaysThisMonth}
                    </span>
                  </div>

                  <div className="gold-divider-wide my-6" />

                  <div className="owner-stat-row mb-6">
                    <span>Selected</span>
                    <span className="text-[var(--color-champagne)]">
                      {selectedDates.size} {selectedDates.size === 1 ? 'date' : 'dates'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={markAsBooked}
                      disabled={selectedDates.size === 0}
                      className="owner-action-btn owner-btn-booked"
                    >
                      🔴 Mark as Booked
                    </button>
                    <button
                      onClick={markAsAvailable}
                      disabled={selectedDates.size === 0}
                      className="owner-action-btn owner-btn-available"
                    >
                      🟢 Mark as Available
                    </button>
                    <button
                      onClick={clearSelection}
                      disabled={selectedDates.size === 0}
                      className="owner-action-btn owner-btn-clear"
                    >
                      Clear Selection
                    </button>
                  </div>

                  <div className="gold-divider-wide my-6" />

                  <button
                    onClick={saveAvailabilityChanges}
                    disabled={saving || !hasChanges}
                    className="owner-save-btn"
                  >
                    {saving ? (
                      <span className="owner-login-spinner" />
                    ) : hasChanges ? (
                      'Save Changes'
                    ) : (
                      'No Changes'
                    )}
                  </button>

                  {hasChanges && (
                    <p
                      className="text-center mt-3"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.5rem',
                        letterSpacing: '0.15em',
                        color: 'var(--color-champagne)',
                      }}
                    >
                      Unsaved changes
                    </p>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Gallery Manager Tab */
            <div className="flex flex-col gap-8">
              {/* Add New Photo Form & Save Bar */}
              <div className="glass-dark p-6 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6 items-end justify-between border-b border-white/10 pb-6">
                  <div>
                    <h3 className="text-lg font-light tracking-wide text-white">Add New Photo to Gallery</h3>
                    <p className="text-xs text-[var(--color-ash)] mt-1">Select an image file from your device (laptop, phone, or tablet).</p>
                  </div>

                  <button
                    onClick={handleSaveGallery}
                    disabled={savingGallery || !galleryHasChanges}
                    className="owner-save-btn !py-3 !px-6 !w-auto"
                  >
                    {savingGallery ? (
                      <span className="owner-login-spinner" />
                    ) : galleryHasChanges ? (
                      'Save Gallery Changes'
                    ) : (
                      'Gallery Saved'
                    )}
                  </button>
                </div>

                <form onSubmit={handleAddPhoto} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* File Selector Box */}
                  <div className="md:col-span-5 flex flex-col gap-2">
                    <label className="owner-form-label">Photo File</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-4 p-4 border border-dashed border-white/20 rounded-lg hover:border-[var(--color-champagne)] bg-black/30 cursor-pointer transition-all"
                    >
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-14 h-14 object-cover rounded border border-white/20" />
                      ) : (
                        <div className="w-14 h-14 rounded bg-white/5 flex items-center justify-center text-2xl text-[var(--color-ash)]">
                          📁
                        </div>
                      )}
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-medium text-white truncate">
                          {selectedFile ? selectedFile.name : 'Choose Photo from Device'}
                        </span>
                        <span className="text-[0.65rem] text-[var(--color-ash)] mt-0.5">
                          {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : 'Click to browse files'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title Input */}
                  <div className="md:col-span-4 flex flex-col gap-2">
                    <label className="owner-form-label">Title / Caption</label>
                    <input
                      type="text"
                      value={newPhotoTitle}
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                      placeholder="e.g. Swimming Pool Sunset"
                      className="owner-login-input text-xs"
                    />
                  </div>

                  {/* Tall Aspect & Add Button */}
                  <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-4 pt-4 md:pt-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--color-ash)]">
                      <input
                        type="checkbox"
                        checked={newPhotoTall}
                        onChange={(e) => setNewPhotoTall(e.target.checked)}
                        className="accent-[var(--color-champagne)]"
                      />
                      <span>Tall Aspect</span>
                    </label>

                    <button
                      type="submit"
                      disabled={uploading || !selectedFile}
                      className="owner-action-btn owner-btn-available !w-auto !py-2.5 !px-5"
                    >
                      {uploading ? <span className="owner-login-spinner" /> : '+ Add Photo'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Gallery Grid Manager */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryPhotos.map((photo, idx) => (
                  <div
                    key={`${photo.src}-${idx}`}
                    className="glass-dark p-3 rounded-lg flex flex-col justify-between group relative border border-white/5 hover:border-[var(--color-champagne)] transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[4/3] rounded overflow-hidden bg-black/40 relative mb-3">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="absolute top-2 left-2 bg-black/70 text-white/80 text-[0.6rem] px-2 py-0.5 rounded">
                        #{idx + 1}
                      </span>
                    </div>

                    {/* Info & Reorder */}
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-white/90 truncate">{photo.title}</p>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMovePhoto(idx, 'up')}
                          disabled={idx === 0}
                          className="px-2 py-1 bg-white/5 hover:bg-white/15 disabled:opacity-20 text-xs rounded text-white"
                          title="Move up"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => handleMovePhoto(idx, 'down')}
                          disabled={idx === galleryPhotos.length - 1}
                          className="px-2 py-1 bg-white/5 hover:bg-white/15 disabled:opacity-20 text-xs rounded text-white"
                          title="Move down"
                        >
                          ↓
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemovePhoto(idx)}
                        className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs rounded transition-colors"
                      >
                        ✕ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
