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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full mx-4 max-h-[95vh] overflow-y-auto">
        {/* Print Button */}
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Security Payroll Document</h2>
          <div className="flex space-x-3">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
            >
              <span>🖨️</span>
              <span>Print Document</span>
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
        <div className="p-8 print:p-4">
          {/* Header */}
          <div className="flex items-center mb-8 border-b-4 border-blue-600 pb-6">
            <div className="w-20 h-20 mr-6 flex items-center justify-center">
              <img 
                src={dicelLogo} 
                alt="DICEL Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">DICEL ERP SYSTEMS</h1>
              <p className="text-gray-600 text-lg">Enterprise Resource Planning Solutions</p>
              <p className="text-gray-500">Kigali, Rwanda | Tel: +250 788 123 456</p>
              <p className="text-gray-500">Email: info@dicel.rw | Web: www.dicel.rw</p>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">SECURITY PERSONNEL PAYROLL</h2>
            <p className="text-gray-600">Pay Period: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            <p className="text-gray-500">Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">Total Employees</h3>
              <div className="text-2xl font-bold text-green-600">{activeEmployees.length}</div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">Total Gross Salary</h3>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalGrossSalary)}</div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">Total Deductions</h3>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(totalPAYE + totalRSSB)}</div>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center shadow-sm">
              <h3 className="text-sm font-bold text-blue-900 uppercase mb-2">Total Net Pay</h3>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(totalNetPay)}</div>
            </div>
          </div>

          {/* Payroll Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-lg">
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
          <div className="flex justify-between mb-8 p-6 bg-gray-50 rounded-xl">
            <div className="text-center min-w-[150px]">
              <div className="border-b-2 border-gray-400 mb-2 h-10"></div>
              <p className="font-bold text-sm">HR Manager</p>
              <p className="text-xs text-gray-500">Date: _______________</p>
            </div>
            <div className="text-center min-w-[150px]">
              <div className="border-b-2 border-gray-400 mb-2 h-10"></div>
              <p className="font-bold text-sm">Finance Manager</p>
              <p className="text-xs text-gray-500">Date: _______________</p>
            </div>
            <div className="text-center min-w-[150px]">
              <div className="border-b-2 border-gray-400 mb-2 h-10"></div>
              <p className="font-bold text-sm">General Manager</p>
              <p className="text-xs text-gray-500">Date: _______________</p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 border-t-2 border-gray-200 text-gray-500 text-sm">
            <p className="font-bold">DICEL ERP SYSTEMS</p>
            <p>KG 123 St, Kacyiru, Kigali, Rwanda</p>
            <p>Tel: +250 788 123 456 | Email: payroll@dicel.rw</p>
            <p className="mt-2">This document is computer generated and does not require a signature</p>
            <p>Generated on {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollDocument;
