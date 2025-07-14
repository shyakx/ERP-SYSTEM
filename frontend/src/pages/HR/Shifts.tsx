import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import Modal from '../../components/Common/Modal';

interface Shift {
  id?: string;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
  notes?: string;
}

const statusOptions = [
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'missed', label: 'Missed' },
];

const initialForm: Shift = {
  employeeName: '',
  date: '',
  startTime: '',
  endTime: '',
  location: '',
  status: 'scheduled',
  notes: '',
};

const Shifts: React.FC = () => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [form, setForm] = useState<Shift>(initialForm);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchShifts();
  }, []);

  useEffect(() => {
    if (modalType === 'edit' && selectedShift) {
      setForm(selectedShift);
    } else if (modalType === 'add') {
      setForm(initialForm);
    }
  }, [modalType, selectedShift]);

  const fetchShifts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/shifts');
      if (!res.ok) throw new Error('Failed to fetch shifts');
      const data = await res.json();
      setShifts(data);
    } catch (err: any) {
      setError('Could not load shifts.');
      toast.error('Could not load shifts.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id || !window.confirm('Delete this shift?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/shifts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Shift deleted');
      fetchShifts();
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.employeeName || !form.date || !form.startTime || !form.endTime || !form.location || !form.status) {
      toast.error('Please fill all required fields.');
      return;
    }
    setFormLoading(true);
    try {
      if (modalType === 'add') {
        const res = await fetch('http://localhost:5000/api/shifts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Add failed');
        toast.success('Shift added');
      } else if (modalType === 'edit' && selectedShift?.id) {
        const res = await fetch(`http://localhost:5000/api/shifts/${selectedShift.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Edit failed');
        toast.success('Shift updated');
      }
      setShowModal(false);
      fetchShifts();
    } catch {
      toast.error('Save failed');
    } finally {
      setFormLoading(false);
    }
  };

  const filtered = shifts.filter(s =>
    (s.employeeName || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.location || '').toLowerCase().includes(search.toLowerCase())
  );

  // Helper functions for formatting
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  const formatTime = (start: string, end: string) => {
    if (!start || !end) return '-';
    const fmt = (t: string) => {
      const [h, m] = t.split(':');
      if (!h || !m) return t;
      const hour = parseInt(h);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${m} ${ampm}`;
    };
    return `${fmt(start)} - ${fmt(end)}`;
  };
  const statusBadge = (status: string) => {
    const color =
      status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
      status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
      status === 'completed' ? 'bg-green-100 text-green-800' :
      status === 'missed' ? 'bg-red-100 text-red-800' :
      'bg-gray-100 text-gray-800';
    return <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${color}`}>{status.replace('_', ' ')}</span>;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shift Scheduling</h1>
            <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => { setShowModal(true); setModalType('add'); setSelectedShift(null); }}
            >
          <Plus className="w-4 h-4" /> Add Shift
            </button>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            className="w-full pl-10 pr-4 py-2 border rounded"
            placeholder="Search by employee or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No shifts found.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Notes</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(shift => (
                <tr key={shift.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{shift.employeeName || '-'}</td>
                  <td className="px-4 py-2">{formatDate(shift.date)}</td>
                  <td className="px-4 py-2">{formatTime(shift.startTime, shift.endTime)}</td>
                  <td className="px-4 py-2">{shift.location || '-'}</td>
                  <td className="px-4 py-2">{statusBadge(shift.status)}</td>
                  <td className="px-4 py-2">{shift.notes ? <span title={shift.notes}>{shift.notes.length > 20 ? shift.notes.slice(0, 20) + '…' : shift.notes}</span> : '-'}</td>
                  <td className="px-4 py-2 text-right flex gap-2 justify-end">
                    <button className="text-blue-600" title="View"><Eye className="w-4 h-4" /></button>
                    <button className="text-green-600" title="Edit" onClick={() => { setShowModal(true); setModalType('edit'); setSelectedShift(shift); }}><Edit className="w-4 h-4" /></button>
                    <button className="text-red-600" title="Delete" onClick={() => handleDelete(shift.id)}><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={modalType === 'add' ? 'Add Shift' : 'Edit Shift'}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Employee Name<span className="text-red-500">*</span></label>
            <input
              name="employeeName"
              value={form.employeeName}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date<span className="text-red-500">*</span></label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Start Time<span className="text-red-500">*</span></label>
              <input
                type="time"
                name="startTime"
                value={form.startTime}
                onChange={handleFormChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">End Time<span className="text-red-500">*</span></label>
              <input
                type="time"
                name="endTime"
                value={form.endTime}
                onChange={handleFormChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location<span className="text-red-500">*</span></label>
            <input
              name="location"
              value={form.location}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status<span className="text-red-500">*</span></label>
          <select
              name="status"
              value={form.status}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleFormChange}
              className="w-full border rounded px-3 py-2"
              rows={2}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="px-4 py-2 border rounded" onClick={() => setShowModal(false)} disabled={formLoading}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={formLoading}>{formLoading ? 'Saving...' : 'Save'}</button>
                </div>
              </form>
      </Modal>
    </div>
  );
};

export default Shifts; 