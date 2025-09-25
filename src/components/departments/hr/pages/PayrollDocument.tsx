import React from 'react';
import dicelLogo from '../../../../assets/images/dicel-logo.png';

interface SecurityEmployee {
  id: string;
  no: number;
  name: string;
  post: string;
  account: string;
  bankName: string;
  telephone: string;
  idNumber: string;
  basicSalary: number;
  transportAllowance: number;
  grossSalary: number;
  paye: number;
  maternityLeaveEmployee: number;
  maternityLeaveEmployer: number;
  rssbPensionEmployee6: number;
  rssbPensionEmployer6: number;
  rssbPensionEmployee2: number;
  totalRssbContribution: number;
  netPayB4CBHI: number;
  mutuelle: number;
  advance: number;
  netBankList: number;
  status: 'active' | 'inactive' | 'paid';
  lastPaid: string;
}

interface PayrollDocumentProps {
  employees: SecurityEmployee[];
  onClose: () => void;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const PayrollDocument: React.FC<PayrollDocumentProps> = ({ employees, onClose }) => {
  const activeEmployees = employees.filter(emp => emp.status === 'active');
  const totalGrossSalary = activeEmployees.reduce((sum, emp) => sum + emp.grossSalary, 0);
  const totalPAYE = activeEmployees.reduce((sum, emp) => sum + emp.paye, 0);
  const totalRSSB = activeEmployees.reduce((sum, emp) => sum + emp.totalRssbContribution, 0);
  const totalNetPay = activeEmployees.reduce((sum, emp) => sum + emp.netBankList, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveAsPDF = async () => {
    try {
      // Convert logo to base64 for embedding
      let logoBase64 = '';
      
      // Try to get the logo from the current page first
      const existingLogo = document.querySelector('img[alt="DICEL Logo"]') as HTMLImageElement;
      if (existingLogo && existingLogo.src) {
        try {
          // If it's already a data URL, use it directly
          if (existingLogo.src.startsWith('data:')) {
            logoBase64 = existingLogo.src;
          } else {
            // Fetch the logo and convert to base64
            const response = await fetch(existingLogo.src);
            if (response.ok) {
              const blob = await response.blob();
              const reader = new FileReader();
              logoBase64 = await new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              });
            }
          }
        } catch (error) {
          // Could not convert logo from page
        }
      }
      
      // If that didn't work, try the public folder
      if (!logoBase64) {
        try {
          const response = await fetch('/dicel-logo.png', {
            method: 'GET',
            headers: {
              'Accept': 'image/png,image/*,*/*;q=0.8'
            }
          });
          
          if (response.ok) {
            const blob = await response.blob();
            
            if (blob.type.startsWith('image/')) {
              const reader = new FileReader();
              logoBase64 = await new Promise((resolve, reject) => {
                reader.onload = () => {
                  const result = reader.result as string;
                  console.log('Base64 result length:', result.length, 'starts with:', result.substring(0, 50));
                  resolve(result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              });
              console.log('Successfully loaded logo from public folder');
            } else {
              console.log('Blob is not an image, type:', blob.type);
            }
          } else {
            console.log('Response not OK, status:', response.status);
          }
        } catch (error) {
          console.log('Could not load logo from public folder:', error);
        }
      }
      
      // If still no logo, create a fallback
      if (!logoBase64) {
        console.log('Creating fallback text logo');
        const canvas = document.createElement('canvas');
        canvas.width = 60;
        canvas.height = 60;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#2563eb';
          ctx.fillRect(0, 0, 60, 60);
          ctx.fillStyle = 'white';
          ctx.font = 'bold 12px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('DICEL', 30, 30);
        }
        logoBase64 = canvas.toDataURL();
      }

      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      // Get the document content
      const documentContent = document.querySelector('.print-content')?.innerHTML;
      if (!documentContent) return;

      // Replace logo src with base64 - handle both the imported logo and any other logo references
      let processedContent = documentContent;
      
      console.log('Original document content preview:', documentContent.substring(0, 500));
      console.log('Logo base64 available:', logoBase64 ? 'Yes' : 'No');
      console.log('Logo base64 length:', logoBase64 ? logoBase64.length : 0);
      
      // Replace the specific dicelLogo import reference
      if (logoBase64) {
        // More aggressive replacement - find the img tag with DICEL Logo alt text
        processedContent = processedContent.replace(
          /<img[^>]*alt="DICEL Logo"[^>]*src="[^"]*"[^>]*>/g,
          `<img src="${logoBase64}" alt="DICEL Logo" class="w-full h-full object-contain">`
        );
        
        // Also try to replace any img tag that might be our logo
        processedContent = processedContent.replace(
          /<img([^>]*?)src="[^"]*"([^>]*?)alt="DICEL Logo"([^>]*?)>/g,
          `<img$1src="${logoBase64}"$2alt="DICEL Logo"$3>`
        );
        
        // Fallback - replace any logo-related div content
        processedContent = processedContent.replace(
          /<div class="w-20 h-20 mr-6 flex items-center justify-center">[^<]*<img[^>]*alt="DICEL Logo"[^>]*>[^<]*<\/div>/g,
          `<div class="w-20 h-20 mr-6 flex items-center justify-center"><img src="${logoBase64}" alt="DICEL Logo" class="w-full h-full object-contain"></div>`
        );
        
        console.log('Logo replacement completed');
        console.log('Processed content preview:', processedContent.substring(0, 500));
      }

      // Create the print document
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Security Payroll Document - ${new Date().toLocaleDateString()}</title>
            <style>
              @page {
                size: A4;
                margin: 0.5in;
              }
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 12px;
                line-height: 1.4;
                color: #333;
                margin: 0;
                padding: 0;
              }
              .print-header {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 3px solid #2563eb;
                padding-bottom: 15px;
              }
              .logo {
                width: 60px;
                height: 60px;
                margin-right: 15px;
                object-fit: contain;
              }
            .company-info h1 {
              font-size: 24px;
              font-weight: bold;
              color: #1e40af;
              margin: 0 0 5px 0;
            }
            .company-info p {
              margin: 2px 0;
              color: #6b7280;
            }
            .document-title {
              text-align: center;
              background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
              border-left: 4px solid #2563eb;
              padding: 20px;
              margin: 20px 0;
              border-radius: 8px;
            }
            .document-title h2 {
              font-size: 20px;
              font-weight: bold;
              color: #1e40af;
              margin: 0 0 8px 0;
            }
            .document-title p {
              margin: 3px 0;
              color: #6b7280;
            }
            .summary-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 15px;
              margin: 20px 0;
            }
            .summary-card {
              border: 2px solid #e5e7eb;
              border-radius: 8px;
              padding: 15px;
              text-align: center;
              background: white;
            }
            .summary-card h3 {
              font-size: 10px;
              font-weight: bold;
              color: #1e40af;
              text-transform: uppercase;
              margin: 0 0 8px 0;
            }
            .summary-card .value {
              font-size: 18px;
              font-weight: bold;
              color: #059669;
            }
            .payroll-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            .payroll-table th {
              background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
              color: white;
              padding: 8px;
              text-align: left;
              font-size: 10px;
              font-weight: bold;
              border-right: 1px solid #1e40af;
            }
            .payroll-table th:last-child {
              border-right: none;
            }
            .payroll-table td {
              padding: 6px 8px;
              border-bottom: 1px solid #e5e7eb;
              font-size: 11px;
              border-right: 1px solid #f3f4f6;
            }
            .payroll-table td:last-child {
              border-right: none;
            }
            .payroll-table tr:nth-child(even) {
              background-color: #f9fafb;
            }
            .text-right {
              text-align: right;
            }
            .text-center {
              text-align: center;
            }
            .font-medium {
              font-weight: 500;
            }
            .font-bold {
              font-weight: bold;
            }
            .text-green-600 {
              color: #059669;
            }
            .signature-section {
              display: flex;
              justify-content: space-between;
              margin: 30px 0;
              padding: 20px;
              background-color: #f9fafb;
              border-radius: 8px;
            }
            .signature-box {
              text-align: center;
              min-width: 120px;
            }
            .signature-line {
              border-bottom: 2px solid #9ca3af;
              margin-bottom: 8px;
              height: 30px;
            }
            .signature-box p {
              font-weight: bold;
              font-size: 12px;
              margin: 0;
            }
            .signature-box .date {
              font-size: 10px;
              color: #6b7280;
              margin-top: 5px;
            }
            .footer {
              text-align: center;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
              color: #6b7280;
              font-size: 11px;
            }
            .footer p {
              margin: 2px 0;
            }
            .footer .company-name {
              font-weight: bold;
              color: #374151;
            }
            @media print {
              body { -webkit-print-color-adjust: exact; }
              .print-header, .document-title, .summary-grid, .payroll-table, .signature-section, .footer {
                break-inside: avoid;
              }
              .payroll-table {
                font-size: 10px;
              }
              .payroll-table th, .payroll-table td {
                padding: 4px 6px;
              }
            }
          </style>
        </head>
        <body>
          ${processedContent}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Wait for content to load, then trigger print dialog
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 500);
    
    } catch (error) {
      console.error('Error creating PDF:', error);
      alert('Error creating PDF. Please try the Print button instead.');
    }
  };


  return (
    <>
      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
          }
          
          .print-content {
            margin: 0;
            padding: 20px;
            max-width: none;
            width: 100%;
            background: white;
          }
          
          .print-header, .document-title, .summary-grid, .payroll-table, .signature-section, .footer {
            break-inside: avoid;
          }
          
          .payroll-table {
            font-size: 10px;
            width: 100%;
          }
          
          .payroll-table th, .payroll-table td {
            padding: 4px 6px;
            border: 1px solid #e5e7eb;
          }
          
          .payroll-table th {
            background: #2563eb;
            color: white;
            -webkit-print-color-adjust: exact;
          }
          
          .payroll-table tr:nth-child(even) {
            background-color: #f9fafb;
            -webkit-print-color-adjust: exact;
          }
          
          .summary-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
          }
          
          .summary-card {
            break-inside: avoid;
          }
          
          .signature-section {
            break-inside: avoid;
          }
          
          .no-print {
            display: none;
          }
          
          @page {
            size: A4;
            margin: 0.5in;
          }
        }
      `}</style>
      
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full mx-4 max-h-[95vh] overflow-y-auto">
        {/* Print Button */}
        <div className="no-print sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Security Payroll Document</h2>
          <div className="flex space-x-3">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
            >
              <span>🖨️</span>
              <span>Print</span>
            </button>
            <button
              onClick={handleSaveAsPDF}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
            >
              <span>📄</span>
              <span>Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="p-8 print:p-4 print-content">
          {/* Header */}
          <div className="print-header flex items-center mb-8 border-b-4 border-blue-600 pb-6">
            <div className="w-20 h-20 mr-6 flex items-center justify-center">
              <img 
                src={dicelLogo} 
                alt="DICEL Logo" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-lg rounded-lg shadow-lg">DICEL</div>';
                  }
                }}
              />
            </div>
            <div className="company-info">
              <h1 className="text-3xl font-bold text-blue-900 mb-2">DICEL ERP SYSTEMS</h1>
              <p className="text-gray-600 text-lg">Enterprise Resource Planning Solutions</p>
              <p className="text-gray-500">Kigali, Rwanda | Tel: +250 788 123 456</p>
              <p className="text-gray-500">Email: info@dicel.rw | Web: www.dicel.rw</p>
            </div>
          </div>

          {/* Document Title */}
          <div className="document-title text-center mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">SECURITY PERSONNEL PAYROLL</h2>
            <p className="text-gray-600">Pay Period: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            <p className="text-gray-500">Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
          </div>

          {/* Summary Cards */}
          <div className="summary-grid grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="summary-card bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">Total Employees</h3>
              <div className="value text-2xl font-bold text-green-600">{activeEmployees.length}</div>
            </div>
            <div className="summary-card bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">Total Gross Salary</h3>
              <div className="value text-2xl font-bold text-green-600">{formatCurrency(totalGrossSalary)}</div>
            </div>
            <div className="summary-card bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">Total Deductions</h3>
              <div className="value text-2xl font-bold text-red-600">{formatCurrency(totalPAYE + totalRSSB)}</div>
            </div>
            <div className="summary-card bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">Total Net Pay</h3>
              <div className="value text-2xl font-bold text-green-600">{formatCurrency(totalNetPay)}</div>
            </div>
          </div>

          {/* Payroll Table */}
          <div className="overflow-x-auto mb-8">
            <table className="payroll-table w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                  <th className="p-3 text-left text-xs font-bold">No</th>
                  <th className="p-3 text-left text-xs font-bold">Employee Name</th>
                  <th className="p-3 text-left text-xs font-bold">Position</th>
                  <th className="p-3 text-left text-xs font-bold">Account No</th>
                  <th className="p-3 text-left text-xs font-bold">Bank</th>
                  <th className="p-3 text-right text-xs font-bold">Basic Salary</th>
                  <th className="p-3 text-right text-xs font-bold">Transport</th>
                  <th className="p-3 text-right text-xs font-bold">Gross Salary</th>
                  <th className="p-3 text-right text-xs font-bold">PAYE</th>
                  <th className="p-3 text-right text-xs font-bold">RSSB (6%)</th>
                  <th className="p-3 text-right text-xs font-bold">RSSB (2%)</th>
                  <th className="p-3 text-right text-xs font-bold">Mutuelle</th>
                  <th className="p-3 text-right text-xs font-bold">Advance</th>
                  <th className="p-3 text-right text-xs font-bold">Net Pay</th>
                </tr>
              </thead>
              <tbody>
                {activeEmployees.map((employee, index) => (
                  <tr key={employee.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 text-sm">{employee.no}</td>
                    <td className="p-3 text-sm font-medium">{employee.name}</td>
                    <td className="p-3 text-sm">{employee.post}</td>
                    <td className="p-3 text-sm">{employee.account}</td>
                    <td className="p-3 text-sm">{employee.bankName}</td>
                    <td className="p-3 text-sm text-right font-medium">{formatCurrency(employee.basicSalary)}</td>
                    <td className="p-3 text-sm text-right font-medium">{formatCurrency(employee.transportAllowance)}</td>
                    <td className="p-3 text-sm text-right font-medium">{formatCurrency(employee.grossSalary)}</td>
                    <td className="p-3 text-sm text-right font-medium">{formatCurrency(employee.paye)}</td>
                    <td className="p-3 text-sm text-right font-medium">{formatCurrency(employee.rssbPensionEmployee6)}</td>
                    <td className="p-3 text-sm text-right font-medium">{formatCurrency(employee.rssbPensionEmployee2)}</td>
                    <td className="p-3 text-sm text-right font-medium">{formatCurrency(employee.mutuelle)}</td>
                    <td className="p-3 text-sm text-right font-medium">{formatCurrency(employee.advance)}</td>
                    <td className="p-3 text-sm text-right font-bold text-green-600">{formatCurrency(employee.netBankList)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signature Section */}
          <div className="signature-section flex justify-between mb-8 p-6 bg-gray-50 rounded-xl">
            <div className="signature-box text-center min-w-[150px]">
              <div className="signature-line border-b-2 border-gray-400 mb-2 h-10"></div>
              <p className="font-bold text-sm">HR Manager</p>
              <p className="date text-xs text-gray-500">Date: _______________</p>
            </div>
            <div className="signature-box text-center min-w-[150px]">
              <div className="signature-line border-b-2 border-gray-400 mb-2 h-10"></div>
              <p className="font-bold text-sm">Finance Manager</p>
              <p className="date text-xs text-gray-500">Date: _______________</p>
            </div>
            <div className="signature-box text-center min-w-[150px]">
              <div className="signature-line border-b-2 border-gray-400 mb-2 h-10"></div>
              <p className="font-bold text-sm">General Manager</p>
              <p className="date text-xs text-gray-500">Date: _______________</p>
            </div>
          </div>

          {/* Footer */}
          <div className="footer text-center pt-6 border-t-2 border-gray-200 text-gray-500 text-sm">
            <p className="company-name font-bold">DICEL ERP SYSTEMS</p>
            <p>KG 123 St, Kacyiru, Kigali, Rwanda</p>
            <p>Tel: +250 788 123 456 | Email: payroll@dicel.rw</p>
            <p className="mt-2">This document is computer generated and does not require a signature</p>
            <p>Generated on {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PayrollDocument;
