import React, { useState, useEffect } from 'react';
import { DollarSign, CheckCircle, Clock, AlertCircle, Plus, Search, Send, Trash2, Eye, X, Printer, Download } from 'lucide-react';
import CountUp from 'react-countup';
import { formatRWF } from '../../utils/formatRWF';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Add type for invoice items
interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  [key: string]: string | number;
}

// New: Types for invoices and payments from backend
interface Invoice {
  id: number;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  company_name: string;
  contact_person: string;
  total_amount: number;
  paid_amount: number;
  balance_amount: number;
  status: string;
}
interface Payment {
  id: number;
  payment_number: string;
  reference_number: string;
  company_name: string;
  amount: number;
  payment_method: string;
  status: string;
  payment_date: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid': return 'bg-emerald-100 text-emerald-800';
    case 'sent': return 'bg-blue-100 text-blue-800';
    case 'overdue': return 'bg-rose-100 text-rose-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const placeholderLogo = (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="12" fill="#2563eb" />
    <text x="50%" y="56%" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial" dy=".3em">D</text>
  </svg>
);

const dicelLogo = (
  <span className="font-extrabold text-2xl text-blue-700 tracking-widest">DICEL</span>
);

const REAL_LOGO = '/logo.png';

const Invoicing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments'>('invoices');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState<{
    client: string;
    contact: string;
    issue_date: string;
    due_date: string;
    items: InvoiceItem[];
    notes: string;
    payment_terms: string;
  }>({
    client: '',
    contact: '',
    issue_date: '',
    due_date: '',
    items: [{ description: '', quantity: 1, unit_price: 0 }],
    notes: '',
    payment_terms: 'Net 30',
  });
  const [invoiceNumber, setInvoiceNumber] = useState('');

  // New: State for real data
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [invRes, payRes] = await Promise.all([
        fetch('/api/finance/invoices', { headers: { Authorization: `Bearer demo-token` } }),
        fetch('/api/finance/payments', { headers: { Authorization: `Bearer demo-token` } })
      ]);
      if (!invRes.ok || !payRes.ok) throw new Error('Failed to fetch data');
      const invData = await invRes.json();
      const payData = await payRes.json();
      setInvoices(invData);
      setPayments(payData);
      setInvoiceNumber('INV-' + (invData.length + 1).toString().padStart(3, '0'));
    } catch (err) {
      setError('Failed to load invoices or payments');
    } finally {
      setLoading(false);
    }
  };

  // Update handleFormChange to use keyof InvoiceItem for item fields
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    idx?: number,
    field?: keyof InvoiceItem
  ) => {
    if (typeof idx === 'number' && field) {
      const items = [...form.items];
      if (field === 'quantity' || field === 'unit_price') {
        items[idx][field] = Number(e.target.value) as any;
      } else if (field === 'description') {
        items[idx][field] = e.target.value as any;
      }
      setForm({ ...form, items });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };
  const addItem = () => setForm({ ...form, items: [...form.items, { description: '', quantity: 1, unit_price: 0 }] });
  const removeItem = (idx: number) => setForm({ ...form, items: form.items.filter((_, i) => i !== idx) });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setShowPreview(true);
  };
  const handlePrint = () => {
    window.print();
  };

  // Filtering and searching real data
  const filteredInvoices = invoices.filter(inv =>
    (inv.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.company_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || inv.status === statusFilter)
  );
  const filteredPayments = payments.filter(pay =>
    pay.payment_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pay.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Summary calculations from real data
  const getTotalInvoiced = () => invoices.reduce((t, i) => t + Number(i.total_amount || 0), 0);
  const getTotalPaid = () => invoices.reduce((t, i) => t + Number(i.paid_amount || 0), 0);
  const getOutstanding = () => invoices.reduce((t, i) => t + Number(i.balance_amount || 0), 0);
  const getOverdue = () => invoices.filter(i => i.status === 'overdue').length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Invoicing & Billing</h1>
              <p className="text-gray-600 mt-2">Manage invoices, track payments, and monitor cash flow</p>
            </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              onClick={() => setShowModal(true)}
              >
              <Plus className="h-4 w-4 mr-2 animate-bounce" />
                New Invoice
              </button>
          </div>
        </div>
        {/* Modal for Create Invoice */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 relative animate-fadeIn">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700" onClick={() => setShowModal(false)}><X /></button>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">{placeholderLogo} <span>Create Invoice</span></h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Client</label>
                    <input name="client" value={form.client} onChange={handleFormChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact</label>
                    <input name="contact" value={form.contact} onChange={handleFormChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                    <input name="issue_date" type="date" value={form.issue_date} onChange={handleFormChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input name="due_date" type="date" value={form.due_date} onChange={handleFormChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Line Items</label>
                  {form.items.map((item, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        placeholder="Description"
                        value={item.description}
                        onChange={e => handleFormChange(e, idx, 'description')}
                        className="flex-1 border border-gray-300 rounded-md p-2"
                        required
                      />
                      <input
                        type="number"
                        min={1}
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={e => handleFormChange(e, idx, 'quantity')}
                        className="w-16 border border-gray-300 rounded-md p-2"
                        required
                      />
                      <input
                        type="number"
                        min={0}
                        placeholder="Unit Price"
                        value={item.unit_price}
                        onChange={e => handleFormChange(e, idx, 'unit_price')}
                        className="w-24 border border-gray-300 rounded-md p-2"
                        required
                      />
                      {form.items.length > 1 && (
                        <button type="button" className="text-red-500" onClick={() => removeItem(idx)}>-</button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="text-blue-600 mt-2" onClick={addItem}>+ Add Item</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Terms</label>
                    <select name="payment_terms" value={form.payment_terms} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                      <option value="Net 30">Net 30</option>
                      <option value="Net 15">Net 15</option>
                      <option value="Due on Receipt">Due on Receipt</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea name="notes" value={form.notes} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" rows={2} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Preview Invoice</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Invoice Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 print:bg-transparent print:relative print:z-auto animate-fadeIn">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 my-8 p-8 relative animate-slideUp print:shadow-none print:p-0 print:max-w-full overflow-y-auto max-h-[90vh] transition-all duration-300">
              {/* Blue accent bar */}
              <div id="invoice-content" className="px-6 md:px-12 py-4">
                <div className="h-2 w-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 rounded-t-lg mb-4 animate-growBar"></div>
                <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 print:hidden" onClick={() => setShowPreview(false)}><X /></button>
                {/* Header Row with fade-in */}
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 animate-fadeInSlow">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <img src={REAL_LOGO} alt="Dicel Logo" className="w-16 h-16 rounded-full border-2 border-blue-600 bg-white object-contain shadow" />
                    <div>
                      <div className="font-extrabold text-2xl text-blue-900 tracking-widest">DICEL Security Company Ltd</div>
                      <div className="text-gray-700 text-sm">KN 4 Ave, Kigali, Rwanda</div>
                      <div className="text-gray-700 text-sm">info@dicel.rw | +250 788 000 000</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-xs text-gray-500">Invoice #</div>
                    <div className="font-semibold text-blue-700">{invoiceNumber}</div>
                    <div className="text-xs text-gray-500 mt-2">Invoice Date</div>
                    <div className="font-semibold">{form.issue_date}</div>
                    <div className="text-xs text-gray-500 mt-2">Due Date</div>
                    <div className="font-semibold">{form.due_date}</div>
                  </div>
                </div>
                {/* Bill To with animated underline */}
                <div className="flex flex-col md:flex-row md:justify-between mb-6">
                  <div>
                    <div className="font-semibold text-blue-700 mb-1 relative inline-block">
                      Bill To
                      <span className="block h-0.5 bg-blue-400 absolute left-0 right-0 bottom-0 animate-underlineGrow"></span>
                    </div>
                    <div className="text-gray-900 font-medium">{form.client}</div>
                    <div className="text-gray-500">{form.contact}</div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="text-xs text-gray-500">Payment Terms</div>
                    <div className="font-semibold">{form.payment_terms}</div>
                  </div>
                </div>
                {/* Items Table with hover */}
                <div className="overflow-x-auto">
                  <table className="w-full mb-6 border border-blue-200 rounded-lg overflow-hidden">
                    <thead className="bg-blue-600">
                      <tr>
                        <th className="p-3 text-left text-xs font-semibold text-white">Qty</th>
                        <th className="p-3 text-left text-xs font-semibold text-white">Description</th>
                        <th className="p-3 text-right text-xs font-semibold text-white">Unit Price</th>
                        <th className="p-3 text-right text-xs font-semibold text-white">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.items.map((item, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'} style={{ transition: 'background 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#dbeafe'}
                          onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#eff6ff'}>
                          <td className="p-3 text-gray-900">{item.quantity}</td>
                          <td className="p-3 text-gray-900">{item.description}</td>
                          <td className="p-3 text-right">{formatRWF(item.unit_price)}</td>
                          <td className="p-3 text-right font-semibold">{formatRWF(item.quantity * item.unit_price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Summary with animated Invoice Total and soft shadow */}
                <div className="flex flex-col items-end mb-6">
                  <div className="bg-blue-50 rounded-lg px-6 py-4 w-full max-w-xs shadow-lg transition-all duration-300 animate-fadeInSlow">
                    <div className="flex justify-between mb-1">
                      <div className="text-gray-700">Subtotal:</div>
                      <div className="font-semibold">{formatRWF(form.items.reduce((t, i) => t + i.quantity * i.unit_price, 0))}</div>
                    </div>
                    <div className="flex justify-between mb-1">
                      <div className="text-gray-700">VAT (18%):</div>
                      <div className="font-semibold">{formatRWF(Math.round(form.items.reduce((t, i) => t + i.quantity * i.unit_price, 0) * 0.18))}</div>
                    </div>
                    <div className="flex justify-between mt-2 text-lg">
                      <div className="text-blue-900 font-bold">Invoice Total</div>
                      <div className="font-bold text-blue-900">
                        <CountUp start={0} end={Math.round(form.items.reduce((t, i) => t + i.quantity * i.unit_price, 0) * 1.18)} duration={1.5} separator="," prefix="Frw " />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Signature and Terms with fade-in */}
                <div className="flex flex-col md:flex-row md:justify-between items-end mb-6 animate-fadeInSlow">
                  <div className="text-xs text-gray-500">
                    <div className="font-semibold text-blue-700 mb-1">Terms & Conditions</div>
                    <div>Payment is due within 15 days.</div>
                    <div className="mt-2">Name of Bank: <span className="font-medium text-gray-700">Bank of Kigali</span></div>
                    <div>Account number: <span className="font-medium text-gray-700">1234567890</span></div>
                    <div>Routing: <span className="font-medium text-gray-700">098765432</span></div>
                  </div>
                  <div className="flex flex-col items-center mt-6 md:mt-0">
                    <div className="text-xs text-gray-500 mb-1">Authorized Signature</div>
                    <div className="w-32 h-12 border-b-2 border-blue-400 mb-2"></div>
                  </div>
                </div>
                {/* Blue Wave Footer */}
                <div className="mt-8 animate-fadeInSlow">
                  <svg viewBox="0 0 500 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12">
                    <path d="M0 30 Q 125 60 250 30 T 500 30 V60 H0Z" fill="#2563eb" fillOpacity="0.15" />
                    <path d="M0 40 Q 125 20 250 40 T 500 40 V60 H0Z" fill="#2563eb" fillOpacity="0.25" />
                  </svg>
                </div>
              </div>
              {/* Download PDF and Print Buttons */}
              <div className="flex gap-4 print:hidden mt-4">
                <button onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all duration-200"><Printer className="h-4 w-4" /> Print</button>
                <button onClick={async () => {
                  const element = document.getElementById('invoice-content');
                  if (element) {
                    const canvas = await html2canvas(element as HTMLElement);
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'pt', 'a4');
                    const width = pdf.internal.pageSize.getWidth();
                    const height = (canvas.height * width) / canvas.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
                    pdf.save(`invoice-${invoiceNumber}.pdf`);
                  }
                }} className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-all duration-200"><Download className="h-4 w-4" /> Download PDF</button>
              </div>
            </div>
          </div>
        )}
        {/* Summary Cards */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <span className="text-blue-600 text-lg animate-pulse">Loading invoices...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-12">
            <span className="text-red-600 text-lg">{error}</span>
          </div>
        ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 rounded-lg shadow p-6 text-white transition-all hover:shadow-2xl">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                <DollarSign className="h-6 w-6 text-white animate-pulse" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">Total Invoiced</p>
                <p className="text-2xl font-bold">
                  <CountUp start={0} end={getTotalInvoiced()} duration={2} separator="," prefix="Rwf " />
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-400 rounded-lg shadow p-6 text-white transition-all hover:shadow-2xl">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                <CheckCircle className="h-6 w-6 text-white animate-pulse" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">Total Paid</p>
                <p className="text-2xl font-bold">
                  <CountUp start={0} end={getTotalPaid()} duration={2} separator="," prefix="Rwf " />
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 rounded-lg shadow p-6 text-white transition-all hover:shadow-2xl">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                <AlertCircle className="h-6 w-6 text-white animate-pulse" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">Outstanding</p>
                <p className="text-2xl font-bold">
                  <CountUp start={0} end={getOutstanding()} duration={2} separator="," prefix="Rwf " />
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-rose-700 via-rose-500 to-rose-400 rounded-lg shadow p-6 text-white transition-all hover:shadow-2xl">
            <div className="flex items-center">
              <div className="p-3 bg-white bg-opacity-20 rounded-full">
                <Clock className="h-6 w-6 text-white animate-pulse" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium">Overdue</p>
                <p className="text-2xl font-bold">
                  <CountUp start={0} end={getOverdue()} duration={2} />
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200 flex">
              <button
                onClick={() => setActiveTab('invoices')}
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-all ${
                  activeTab === 'invoices'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
              Invoices
              </button>
              <button
                onClick={() => setActiveTab('payments')}
              className={`py-4 px-6 border-b-2 font-medium text-sm transition-all ${
                  activeTab === 'payments'
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              Payments
              </button>
          </div>
          {/* Search and Filters */}
          <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search invoices, clients, or payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
          </div>
          {/* Content */}
          <div className="p-6">
            {activeTab === 'invoices' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInvoices.length > 0 ? filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-blue-50 transition-all">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{invoice.invoice_number}</div>
                            <div className="text-sm text-gray-500">{invoice.issue_date}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{invoice.company_name}</div>
                          <div className="text-sm text-gray-500">{invoice.contact_person}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatRWF(invoice.total_amount)}</div>
                          <div className="text-sm text-gray-500">Paid: {formatRWF(invoice.paid_amount)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>{invoice.status}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.due_date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900"><Eye className="h-4 w-4" /></button>
                            {invoice.status === 'draft' && (
                              <button className="text-green-600 hover:text-green-900"><Send className="h-4 w-4" /></button>
                            )}
                            {invoice.status === 'sent' && (
                              <button className="text-green-600 hover:text-green-900"><CheckCircle className="h-4 w-4" /></button>
                            )}
                            <button className="text-red-600 hover:text-red-900"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No invoices found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'payments' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPayments.length > 0 ? filteredPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-blue-50 transition-all">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{payment.payment_number}</div>
                            <div className="text-sm text-gray-500">{payment.reference_number}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{payment.company_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatRWF(payment.amount)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{payment.payment_method.replace('_', ' ')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">{payment.status}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.payment_date}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No payments found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default Invoicing; 