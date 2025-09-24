import React, { useState, useEffect } from 'react';
// import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton } from '../../../shared/AnimatedCard';
import PayrollDocument from './PayrollDocument';
import { 
  Shield, 
  DollarSign, 
  Plus,
  Edit,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  Calculator,
  Download,
  Send,
  Search,
  Save,
  X,
  Upload,
  User,
  Users
} from 'lucide-react';

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

interface PayrollPeriod {
  id: string;
  period: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'approved' | 'paid';
  totalAmount: number;
  employeeCount: number;
}

const SecurityPayroll: React.FC = () => {
  // Sample data based on the Excel sheet provided
  const [securityEmployees, setSecurityEmployees] = useState<SecurityEmployee[]>([
    {
      id: '1',
      no: 1,
      name: 'Tuyisenge Leonidas',
      post: 'E122_Nyagisozi',
      account: '100164086927',
      bankName: 'BK',
      telephone: '250791989071',
      idNumber: '1199880126533030',
      basicSalary: 16181,
      transportAllowance: 12000,
      grossSalary: 28181,
      paye: 0,
      maternityLeaveEmployee: 49,
      maternityLeaveEmployer: 49,
      rssbPensionEmployee6: 1691,
      rssbPensionEmployer6: 1691,
      rssbPensionEmployee2: 324,
      totalRssbContribution: 3802,
      netPayB4CBHI: 26441,
      mutuelle: 132,
      advance: 0,
      netBankList: 26309,
      status: 'active',
      lastPaid: '2024-01-15'
    },
    {
      id: '2',
      no: 2,
      name: 'DUKUNDANE Egide',
      post: 'Karongi',
      account: '100164086928',
      bankName: 'BK',
      telephone: '250791989072',
      idNumber: '1199880126533031',
      basicSalary: 16181,
      transportAllowance: 12000,
      grossSalary: 28181,
      paye: 0,
      maternityLeaveEmployee: 49,
      maternityLeaveEmployer: 49,
      rssbPensionEmployee6: 1691,
      rssbPensionEmployer6: 1691,
      rssbPensionEmployee2: 324,
      totalRssbContribution: 3802,
      netPayB4CBHI: 26441,
      mutuelle: 132,
      advance: 0,
      netBankList: 26309,
      status: 'active',
      lastPaid: '2024-01-15'
    },
    {
      id: '3',
      no: 3,
      name: 'Nzabandora Jean',
      post: 'Rutsiro',
      account: '100164086929',
      bankName: 'BK',
      telephone: '250791989073',
      idNumber: '1199880126533032',
      basicSalary: 16181,
      transportAllowance: 12000,
      grossSalary: 28181,
      paye: 0,
      maternityLeaveEmployee: 49,
      maternityLeaveEmployer: 49,
      rssbPensionEmployee6: 1691,
      rssbPensionEmployer6: 1691,
      rssbPensionEmployee2: 324,
      totalRssbContribution: 3802,
      netPayB4CBHI: 26441,
      mutuelle: 132,
      advance: 0,
      netBankList: 26309,
      status: 'active',
      lastPaid: '2024-01-15'
    },
    {
      id: '4',
      no: 4,
      name: 'Ugirinshuti Philipe',
      post: 'Nyagatare',
      account: '100164086930',
      bankName: 'EQUITY',
      telephone: '250791989074',
      idNumber: '1199880126533033',
      basicSalary: 16181,
      transportAllowance: 12000,
      grossSalary: 28181,
      paye: 0,
      maternityLeaveEmployee: 49,
      maternityLeaveEmployer: 49,
      rssbPensionEmployee6: 1691,
      rssbPensionEmployer6: 1691,
      rssbPensionEmployee2: 324,
      totalRssbContribution: 3802,
      netPayB4CBHI: 26441,
      mutuelle: 132,
      advance: 0,
      netBankList: 26309,
      status: 'active',
      lastPaid: '2024-01-15'
    }
  ]);

  const [payrollPeriods] = useState<PayrollPeriod[]>([
    {
      id: '1',
      period: 'January 2024',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'paid',
      totalAmount: 105236,
      employeeCount: 4
    },
    {
      id: '2',
      period: 'December 2023',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      status: 'paid',
      totalAmount: 105236,
      employeeCount: 4
    }
  ]);

  const [activeTab, setActiveTab] = useState<'payroll' | 'periods'>('payroll');
  const [selectedEmployee, setSelectedEmployee] = useState<SecurityEmployee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<SecurityEmployee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState<SecurityEmployee[]>([]);
  const [showPayrollDocument, setShowPayrollDocument] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [csvPreview, setCsvPreview] = useState<{ headers: string[], rows: string[][], mappedFields: { [key: string]: number } } | null>(null);

  // Payroll calculation functions
  const calculatePAYE = (grossSalary: number): number => {
    if (grossSalary < 60000) return 0;
    if (grossSalary < 100000) return (grossSalary - 60000) * 0.10;
    if (grossSalary < 200000) return (grossSalary - 100000) * 0.20 + (100000 - 60000) * 0.10;
    return ((100000 - 60000) * 0.10) + ((200000 - 100000) * 0.20) + ((grossSalary - 200000) * 0.30);
  };

  const calculateMaternityLeaveEmployee = (grossSalary: number): number => {
    return Math.round(grossSalary * 0.003);
  };

  const calculateMaternityLeaveEmployer = (grossSalary: number): number => {
    return Math.round(grossSalary * 0.003);
  };

  const calculateRssbPensionEmployee6 = (grossSalary: number): number => {
    return Math.round(grossSalary * 0.06);
  };

  const calculateRssbPensionEmployer6 = (grossSalary: number): number => {
    return Math.round(grossSalary * 0.06);
  };

  const calculateRssbPensionEmployee2 = (grossSalary: number): number => {
    return Math.round(grossSalary * 0.02);
  };

  const calculateTotalRssbContribution = (employee6: number, employer6: number, employee2: number): number => {
    return employee6 + employer6 + employee2;
  };

  const calculateNetPayB4CBHI = (grossSalary: number, paye: number, maternityEmployee: number, rssbEmployee6: number, rssbEmployee2: number): number => {
    return grossSalary - (paye + maternityEmployee + rssbEmployee6 + rssbEmployee2);
  };

  const calculateMutuelle = (netPayB4CBHI: number): number => {
    return Math.round(netPayB4CBHI * 0.005);
  };

  const calculateNetBankList = (netPayB4CBHI: number, mutuelle: number, advance: number): number => {
    return netPayB4CBHI - mutuelle - advance;
  };

  const recalculatePayroll = (employee: SecurityEmployee): SecurityEmployee => {
    const grossSalary = employee.basicSalary + employee.transportAllowance;
    const paye = calculatePAYE(grossSalary);
    const maternityLeaveEmployee = calculateMaternityLeaveEmployee(grossSalary);
    const maternityLeaveEmployer = calculateMaternityLeaveEmployer(grossSalary);
    const rssbPensionEmployee6 = calculateRssbPensionEmployee6(grossSalary);
    const rssbPensionEmployer6 = calculateRssbPensionEmployer6(grossSalary);
    const rssbPensionEmployee2 = calculateRssbPensionEmployee2(grossSalary);
    const totalRssbContribution = calculateTotalRssbContribution(rssbPensionEmployee6, rssbPensionEmployer6, rssbPensionEmployee2);
    const netPayB4CBHI = calculateNetPayB4CBHI(grossSalary, paye, maternityLeaveEmployee, rssbPensionEmployee6, rssbPensionEmployee2);
    const mutuelle = calculateMutuelle(netPayB4CBHI);
    const netBankList = calculateNetBankList(netPayB4CBHI, mutuelle, employee.advance);

    return {
      ...employee,
      grossSalary,
      paye,
      maternityLeaveEmployee,
      maternityLeaveEmployer,
      rssbPensionEmployee6,
      rssbPensionEmployer6,
      rssbPensionEmployee2,
      totalRssbContribution,
      netPayB4CBHI,
      mutuelle,
      netBankList
    };
  };

  // Filter employees based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEmployees(securityEmployees);
    } else {
      const filtered = securityEmployees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.post.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.account.includes(searchTerm)
      );
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, securityEmployees]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <AlertCircle className="w-4 h-4" />;
      case 'draft': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const totalPayroll = securityEmployees.reduce((sum, employee) => sum + employee.netBankList, 0);
  const totalGrossSalary = securityEmployees.reduce((sum, employee) => sum + employee.grossSalary, 0);
  const totalDeductions = securityEmployees.reduce((sum, employee) => 
    sum + employee.paye + employee.maternityLeaveEmployee + employee.rssbPensionEmployee6 + employee.rssbPensionEmployee2 + employee.mutuelle, 0);
  const totalRssbContributions = securityEmployees.reduce((sum, employee) => sum + employee.totalRssbContribution, 0);

  const handleAddEmployee = () => {
    // Implement add employee functionality
    console.log('Add employee');
  };

  const handleViewEmployee = (employee: SecurityEmployee) => {
    setSelectedEmployee(employee);
  };

  const handleEditEmployee = (employee: SecurityEmployee) => {
    setEditingEmployee({ ...employee });
  };

  const handleSaveEmployee = () => {
    if (editingEmployee) {
      const updatedEmployee = recalculatePayroll(editingEmployee);
      setSecurityEmployees(prev => 
        prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
      );
      setEditingEmployee(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  const handleInputChange = (field: keyof SecurityEmployee, value: string | number) => {
    if (editingEmployee) {
      const updatedEmployee = { ...editingEmployee, [field]: value };
      setEditingEmployee(updatedEmployee);
    }
  };

  const handleProcessPayroll = () => {
    // Process payroll for all active employees
    const activeEmployees = securityEmployees.filter(emp => emp.status === 'active');
    
    if (activeEmployees.length === 0) {
      alert('No active employees to process payroll for.');
      return;
    }

    // Show the payroll document
    setShowPayrollDocument(true);
  };

  // Bulk Import Functions
  const downloadTemplate = () => {
    // Create comprehensive template with examples and instructions matching actual CSV structure
    const templateData = [
      {
        'NO': 1,
        'NAME': 'Jean Baptiste',
        'POST': 'Security Guard',
        'ACCOUNT': '1234567890',
        'BANK NAME': 'Bank of Kigali',
        'TELEPHONE': '+250788123456',
        'ID': '1234567890123456',
        'Basic Salary': 20000,
        'Transport Allowance': 12000,
        'Gross Salary': 32000,
        'PAYE': 0,
        '0.3% maternity leave employee': 96,
        '0.3% maternity leave employer': 96,
        '6% RSSB pension employee': 1920,
        '6% RSSB pension employer': 1920,
        '2% RSSB pension employe': 640,
        'TOTAL RSSB Contributio': 4480,
        'Net pay B4 CBHI': 27384,
        'Mutuell e 0.5%': 137,
        'Advance': 0,
        'Net Bank List': 27247
      },
      {
        'NO': 2,
        'NAME': 'Marie Claire',
        'POST': 'Senior Security Guard',
        'ACCOUNT': '0987654321',
        'BANK NAME': 'Equity Bank',
        'TELEPHONE': '+250788654321',
        'ID': '9876543210987654',
        'Basic Salary': 25000,
        'Transport Allowance': 15000,
        'Gross Salary': 40000,
        'PAYE': 0,
        '0.3% maternity leave employee': 120,
        '0.3% maternity leave employer': 120,
        '6% RSSB pension employee': 2400,
        '6% RSSB pension employer': 2400,
        '2% RSSB pension employe': 800,
        'TOTAL RSSB Contributio': 5600,
        'Net pay B4 CBHI': 32480,
        'Mutuell e 0.5%': 162,
        'Advance': 5000,
        'Net Bank List': 27318
      }
    ];

    // Add instructions as comments in the CSV
    const instructions = [
      '# Security Payroll Import Template - Complete Payroll Data',
      '# Required fields: NAME, Basic Salary, Transport Allowance',
      '# Optional fields: All other columns (will be calculated if missing)',
      '# If payroll calculations are provided, they will be used instead of auto-calculation',
      '# Numeric values should not contain currency symbols or commas',
      '# Empty rows will be skipped automatically',
      '# Column order can be changed - system will auto-detect field types',
      '#',
      ''
    ];

    const csvContent = [
      ...instructions,
      Object.keys(templateData[0]).join(','),
      ...templateData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'security_payroll_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateSampleData = () => {
    const sampleEmployees: SecurityEmployee[] = [];
    const positions = ['Security Guard', 'Senior Security Guard', 'Security Supervisor', 'Security Manager'];
    const banks = ['Bank of Kigali', 'Equity Bank', 'I&M Bank', 'GT Bank', 'Access Bank'];
    
    for (let i = 1; i <= 100; i++) {
      const basicSalary = Math.floor(Math.random() * 10000) + 15000; // 15,000 - 25,000
      const transportAllowance = Math.floor(Math.random() * 5000) + 10000; // 10,000 - 15,000
      const grossSalary = basicSalary + transportAllowance;
      
      sampleEmployees.push({
        id: `sample-${i}`,
        no: i,
        name: `Security Employee ${i}`,
        post: positions[Math.floor(Math.random() * positions.length)],
        account: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        bankName: banks[Math.floor(Math.random() * banks.length)],
        telephone: `+250788${String(Math.floor(Math.random() * 900000) + 100000)}`,
        idNumber: `${Math.floor(Math.random() * 9000000000000000) + 1000000000000000}`,
        basicSalary,
        transportAllowance,
        grossSalary,
        paye: calculatePAYE(grossSalary),
        maternityLeaveEmployee: grossSalary * 0.003,
        maternityLeaveEmployer: grossSalary * 0.003,
        rssbPensionEmployee6: grossSalary * 0.06,
        rssbPensionEmployer6: grossSalary * 0.06,
        rssbPensionEmployee2: grossSalary * 0.02,
        totalRssbContribution: grossSalary * 0.14,
        netPayB4CBHI: grossSalary - (calculatePAYE(grossSalary) + grossSalary * 0.003 + grossSalary * 0.08),
        mutuelle: (grossSalary - (calculatePAYE(grossSalary) + grossSalary * 0.003 + grossSalary * 0.08)) * 0.005,
        advance: Math.random() > 0.8 ? Math.floor(Math.random() * 5000) : 0,
        netBankList: 0, // Will be calculated
        status: 'active' as const,
        lastPaid: ''
      });
    }

    // Calculate net bank list for all employees
    const updatedEmployees = sampleEmployees.map(emp => ({
      ...emp,
      netBankList: emp.netPayB4CBHI - emp.mutuelle - emp.advance
    }));

    setSecurityEmployees(prev => [...prev, ...updatedEmployees]);
    alert(`✅ Generated 100 sample security employees successfully!\n\n📊 Total employees: ${securityEmployees.length + 100}\n💰 Ready for payroll processing`);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImportFile(file);
      setImportStatus('idle');
      setImportErrors([]);
      setCsvPreview(null);

      // Check file type and handle accordingly
      const fileExtension = file.name.toLowerCase().split('.').pop();
      
      if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        setImportErrors(['Excel files (.xlsx/.xls) are not supported. Please save your file as CSV format and try again.']);
        return;
      }

      // Generate preview
      try {
        const text = await file.text();
        
        // Check if the file is actually a CSV (not binary data)
        if (text.startsWith('PK') || text.includes('[Content_Types].xml') || text.includes('<?xml')) {
          setImportErrors(['Invalid file format. The file appears to be an Excel file or binary format. Please save as CSV (.csv) format and try again.']);
          return;
        }
        
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          setImportErrors(['File must contain at least a header row and one data row.']);
          return;
        }

        // Parse CSV with the same logic as import
        const parseCSVLine = (line: string): string[] => {
          const result: string[] = [];
          let current = '';
          let inQuotes = false;
          
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              result.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current.trim());
          return result;
        };

        const headers = parseCSVLine(lines[0]).map(h => h.replace(/"/g, '').trim());
        
        // Create field mapping
        const fieldMapping: { [key: string]: string[] } = {
          name: ['name', 'full name', 'employee name', 'staff name', 'personnel name'],
          post: ['post', 'position', 'role', 'job title', 'designation'],
          account: ['account', 'account number', 'bank account', 'account no'],
          bankName: ['bank name', 'bank', 'banking institution', 'financial institution'],
          telephone: ['telephone', 'phone', 'mobile', 'contact', 'phone number'],
          idNumber: ['id number', 'id', 'national id', 'identity number', 'id no'],
          basicSalary: ['basic salary', 'basic', 'base salary', 'salary', 'basic pay'],
          transportAllowance: ['transport allowance', 'transport', 'allowance', 'transportation', 'travel allowance'],
          advance: ['advance', 'advance payment', 'loan', 'advance amount']
        };

        const mappedHeaders: { [key: string]: number } = {};
        headers.forEach((header, index) => {
          const lowerHeader = header.toLowerCase();
          for (const [field, variations] of Object.entries(fieldMapping)) {
            if (variations.some(variation => lowerHeader.includes(variation))) {
              mappedHeaders[field] = index;
              break;
            }
          }
        });

        // Parse first 5 rows for preview
        const previewRows = lines.slice(1, 6).map(line => parseCSVLine(line));
        
        setCsvPreview({
          headers,
          rows: previewRows,
          mappedFields: mappedHeaders
        });
      } catch (error) {
        setImportErrors([`Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`]);
      }
    }
  };

  const processBulkImport = async () => {
    if (!importFile) return;

    setImportStatus('processing');
    setImportProgress(0);
    setImportErrors([]);

    try {
      const text = await importFile.text();
      
      // Check if the file is actually a CSV (not binary data)
      if (text.startsWith('PK') || text.includes('[Content_Types].xml') || text.includes('<?xml')) {
        setImportStatus('error');
        setImportErrors(['Invalid file format. The file appears to be an Excel file or binary format. Please save as CSV (.csv) format and try again.']);
        return;
      }
      
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        setImportStatus('error');
        setImportErrors(['File must contain at least a header row and one data row.']);
        return;
      }

      // More flexible CSV parsing that handles quoted fields and different separators
      const parseCSVLine = (line: string): string[] => {
        const result: string[] = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        return result;
      };

      const headers = parseCSVLine(lines[0]).map(h => h.replace(/"/g, '').trim());
      
      // Create flexible field mapping based on actual CSV columns
      const fieldMapping: { [key: string]: string[] } = {
        no: ['no', 'number', 'employee no', 'emp no'],
        name: ['name', 'full name', 'employee name', 'staff name', 'personnel name'],
        post: ['post', 'position', 'role', 'job title', 'designation'],
        account: ['account', 'account number', 'bank account', 'account no'],
        bankName: ['bank name', 'bank', 'banking institution', 'financial institution'],
        telephone: ['telephone', 'phone', 'mobile', 'contact', 'phone number'],
        idNumber: ['id', 'id number', 'national id', 'identity number', 'id no'],
        basicSalary: ['basic salary', 'basic', 'base salary', 'salary', 'basic pay'],
        transportAllowance: ['transport allowance', 'transport', 'allowance', 'transportation', 'travel allowance'],
        grossSalary: ['gross salary', 'gross', 'total salary', 'gross pay'],
        paye: ['paye', 'tax', 'income tax', 'pay as you earn'],
        maternityLeaveEmployee: ['0.3% maternity leave employee', 'maternity leave employee', 'maternity employee', '0.3% maternity employee'],
        maternityLeaveEmployer: ['0.3% maternity leave employer', 'maternity leave employer', 'maternity employer', '0.3% maternity employer'],
        rssbPensionEmployee6: ['6% rssb pension employee', 'rssb pension employee', 'rssb employee 6%', '6% rssb employee'],
        rssbPensionEmployer6: ['6% rssb pension employer', 'rssb pension employer', 'rssb employer 6%', '6% rssb employer'],
        rssbPensionEmployee2: ['2% rssb pension employe', '2% rssb pension employee', 'rssb pension employee 2%', '2% rssb employee'],
        totalRssbContribution: ['total rssb contributio', 'total rssb contribution', 'total rssb', 'rssb total'],
        netPayB4CBHI: ['net pay b4 cbhi', 'net pay before cbhi', 'net before cbhi', 'net b4 cbhi'],
        mutuelle: ['mutuell e 0.5%', 'mutuelle 0.5%', 'mutuelle', 'mutual 0.5%', 'mutual'],
        advance: ['advance', 'advance payment', 'loan', 'advance amount'],
        netBankList: ['net bank list', 'net bank', 'bank transfer', 'final net']
      };

      // Map headers to standard field names
      const mappedHeaders: { [key: string]: number } = {};
      headers.forEach((header, index) => {
        const lowerHeader = header.toLowerCase();
        for (const [field, variations] of Object.entries(fieldMapping)) {
          if (variations.some(variation => lowerHeader.includes(variation))) {
            mappedHeaders[field] = index;
            break;
          }
        }
      });

      const newEmployees: SecurityEmployee[] = [];
      const errors: string[] = [];
      const warnings: string[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        
        // Skip empty rows
        if (values.every(v => !v.trim())) {
          continue;
        }

        // More flexible column count handling
        if (values.length < headers.length) {
          // Pad with empty strings if too few columns
          while (values.length < headers.length) {
            values.push('');
          }
        } else if (values.length > headers.length) {
          // Truncate if too many columns
          values.splice(headers.length);
        }

        const rowData: any = {};
        headers.forEach((header, index) => {
          rowData[header] = values[index] || '';
        });

        // Extract data using flexible mapping
        const name = mappedHeaders.name !== undefined ? values[mappedHeaders.name] : '';
        const basicSalaryStr = mappedHeaders.basicSalary !== undefined ? values[mappedHeaders.basicSalary] : '';
        const transportAllowanceStr = mappedHeaders.transportAllowance !== undefined ? values[mappedHeaders.transportAllowance] : '';

        // Validate required fields with more helpful messages
        if (!name || !name.trim()) {
          errors.push(`Row ${i + 1}: Missing employee name`);
          continue;
        }

        if (!basicSalaryStr || !basicSalaryStr.trim()) {
          errors.push(`Row ${i + 1}: Missing basic salary for ${name}`);
          continue;
        }

        if (!transportAllowanceStr || !transportAllowanceStr.trim()) {
          errors.push(`Row ${i + 1}: Missing transport allowance for ${name}`);
          continue;
        }

        // Parse numeric values with better error handling
        const parseNumericValue = (value: string, defaultValue: number = 0): number => {
          if (!value || !value.trim()) return defaultValue;
          const parsed = parseFloat(value.replace(/[^\d.-]/g, ''));
          return isNaN(parsed) ? defaultValue : parsed;
        };

        const basicSalary = parseNumericValue(basicSalaryStr);
        const transportAllowance = parseNumericValue(transportAllowanceStr);
        
        if (basicSalary <= 0) {
          errors.push(`Row ${i + 1}: Invalid basic salary "${basicSalaryStr}" for ${name}`);
          continue;
        }

        if (transportAllowance < 0) {
          errors.push(`Row ${i + 1}: Invalid transport allowance "${transportAllowanceStr}" for ${name}`);
          continue;
        }

        // Extract or calculate payroll components
        const grossSalary = mappedHeaders.grossSalary !== undefined ? 
          parseNumericValue(values[mappedHeaders.grossSalary], basicSalary + transportAllowance) : 
          basicSalary + transportAllowance;
        
        const paye = mappedHeaders.paye !== undefined ? 
          parseNumericValue(values[mappedHeaders.paye]) : 
          calculatePAYE(grossSalary);
        
        const maternityLeaveEmployee = mappedHeaders.maternityLeaveEmployee !== undefined ? 
          parseNumericValue(values[mappedHeaders.maternityLeaveEmployee]) : 
          grossSalary * 0.003;
        
        const maternityLeaveEmployer = mappedHeaders.maternityLeaveEmployer !== undefined ? 
          parseNumericValue(values[mappedHeaders.maternityLeaveEmployer]) : 
          grossSalary * 0.003;
        
        const rssbPensionEmployee6 = mappedHeaders.rssbPensionEmployee6 !== undefined ? 
          parseNumericValue(values[mappedHeaders.rssbPensionEmployee6]) : 
          grossSalary * 0.06;
        
        const rssbPensionEmployer6 = mappedHeaders.rssbPensionEmployer6 !== undefined ? 
          parseNumericValue(values[mappedHeaders.rssbPensionEmployer6]) : 
          grossSalary * 0.06;
        
        const rssbPensionEmployee2 = mappedHeaders.rssbPensionEmployee2 !== undefined ? 
          parseNumericValue(values[mappedHeaders.rssbPensionEmployee2]) : 
          grossSalary * 0.02;
        
        const totalRssbContribution = mappedHeaders.totalRssbContribution !== undefined ? 
          parseNumericValue(values[mappedHeaders.totalRssbContribution]) : 
          rssbPensionEmployee6 + rssbPensionEmployer6 + rssbPensionEmployee2;
        
        const netPayB4CBHI = mappedHeaders.netPayB4CBHI !== undefined ? 
          parseNumericValue(values[mappedHeaders.netPayB4CBHI]) : 
          grossSalary - (paye + maternityLeaveEmployee + rssbPensionEmployee6 + rssbPensionEmployee2);
        
        const mutuelle = mappedHeaders.mutuelle !== undefined ? 
          parseNumericValue(values[mappedHeaders.mutuelle]) : 
          netPayB4CBHI * 0.005;
        
        const advance = mappedHeaders.advance !== undefined ? 
          parseNumericValue(values[mappedHeaders.advance]) : 0;
        
        const netBankList = mappedHeaders.netBankList !== undefined ? 
          parseNumericValue(values[mappedHeaders.netBankList]) : 
          netPayB4CBHI - mutuelle - advance;

        newEmployees.push({
          id: `imported-${Date.now()}-${i}`,
          no: mappedHeaders.no !== undefined ? parseNumericValue(values[mappedHeaders.no], securityEmployees.length + newEmployees.length + 1) : securityEmployees.length + newEmployees.length + 1,
          name: name.trim(),
          post: mappedHeaders.post !== undefined ? values[mappedHeaders.post] || 'Security Guard' : 'Security Guard',
          account: mappedHeaders.account !== undefined ? values[mappedHeaders.account] || '' : '',
          bankName: mappedHeaders.bankName !== undefined ? values[mappedHeaders.bankName] || '' : '',
          telephone: mappedHeaders.telephone !== undefined ? values[mappedHeaders.telephone] || '' : '',
          idNumber: mappedHeaders.idNumber !== undefined ? values[mappedHeaders.idNumber] || '' : '',
          basicSalary,
          transportAllowance,
          grossSalary,
          paye,
          maternityLeaveEmployee,
          maternityLeaveEmployer,
          rssbPensionEmployee6,
          rssbPensionEmployer6,
          rssbPensionEmployee2,
          totalRssbContribution,
          netPayB4CBHI,
          mutuelle,
          advance,
          netBankList,
          status: 'active' as const,
          lastPaid: ''
        });

        setImportProgress((i / (lines.length - 1)) * 100);
      }

      // Show results
      if (newEmployees.length > 0) {
        setSecurityEmployees(prev => [...prev, ...newEmployees]);
        setImportStatus('success');
        
        let message = `✅ Bulk import completed successfully!\n\n📊 Imported: ${newEmployees.length} employees\n❌ Errors: ${errors.length}`;
        if (warnings.length > 0) {
          message += `\n⚠️ Warnings: ${warnings.length}`;
        }
        message += `\n\n📈 Total employees: ${securityEmployees.length + newEmployees.length}`;
        
        alert(message);
      } else {
        setImportStatus('error');
        setImportErrors(errors);
      }

    } catch (error) {
      setImportStatus('error');
      setImportErrors([`Failed to process file: ${error instanceof Error ? error.message : 'Unknown error'}`]);
    }
  };

  const handleGeneratePayslips = () => {
    // Generate payslips for all employees
    if (securityEmployees.length === 0) {
      alert('No employees to generate payslips for.');
      return;
    }

    // Create payslip data
    const payslipData = securityEmployees.map(employee => ({
      'Employee No': employee.no,
      'Name': employee.name,
      'Position': employee.post,
      'Basic Salary': employee.basicSalary,
      'Transport Allowance': employee.transportAllowance,
      'Gross Salary': employee.grossSalary,
      'PAYE': employee.paye,
      'Maternity Leave (Employee)': employee.maternityLeaveEmployee,
      'RSSB Pension (6%)': employee.rssbPensionEmployee6,
      'RSSB Pension (2%)': employee.rssbPensionEmployee2,
      'Net Pay Before CBHI': employee.netPayB4CBHI,
      'Mutuelle': employee.mutuelle,
      'Advance': employee.advance,
      'Net Bank List': employee.netBankList,
      'Status': employee.status,
      'Last Paid': employee.lastPaid
    }));

    // Convert to CSV format
    const csvContent = [
      Object.keys(payslipData[0]).join(','),
      ...payslipData.map(row => Object.values(row).join(','))
    ].join('\n');

    // Download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `security_payslips_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`Payslips generated successfully for ${securityEmployees.length} employees!`);
  };

  const handleExportToExcel = () => {
    // Export payroll data to Excel format
    if (securityEmployees.length === 0) {
      alert('No data to export.');
      return;
    }

    // Create detailed payroll data
    const exportData = securityEmployees.map(employee => ({
      'No': employee.no,
      'Employee Name': employee.name,
      'Position': employee.post,
      'Account Number': employee.account,
      'Bank Name': employee.bankName,
      'Telephone': employee.telephone,
      'ID Number': employee.idNumber,
      'Basic Salary': employee.basicSalary,
      'Transport Allowance': employee.transportAllowance,
      'Gross Salary': employee.grossSalary,
      'PAYE': employee.paye,
      'Maternity Leave (Employee)': employee.maternityLeaveEmployee,
      'Maternity Leave (Employer)': employee.maternityLeaveEmployer,
      'RSSB Pension Employee (6%)': employee.rssbPensionEmployee6,
      'RSSB Pension Employer (6%)': employee.rssbPensionEmployer6,
      'RSSB Pension Employee (2%)': employee.rssbPensionEmployee2,
      'Total RSSB Contribution': employee.totalRssbContribution,
      'Net Pay Before CBHI': employee.netPayB4CBHI,
      'Mutuelle (0.5%)': employee.mutuelle,
      'Advance': employee.advance,
      'Net Bank List': employee.netBankList,
      'Status': employee.status,
      'Last Paid': employee.lastPaid
    }));

    // Convert to CSV format (Excel compatible)
    const csvContent = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).join(','))
    ].join('\n');

    // Download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `security_payroll_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`Payroll data exported successfully for ${securityEmployees.length} employees!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="space-y-8 p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative px-8 py-6">
      <div className="flex justify-between items-center">
              <div className="text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
        <div>
                    <h2 className="text-3xl font-bold">Security Payroll</h2>
                    <p className="text-blue-100 text-lg">Manage security personnel payroll with automated calculations</p>
                  </div>
                </div>
        </div>
        <div className="flex space-x-3">
                <AnimatedButton
                  onClick={handleExportToExcel}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Export Excel</span>
                </AnimatedButton>
          <AnimatedButton
            onClick={handleGeneratePayslips}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Generate Payslips</span>
          </AnimatedButton>
        <AnimatedButton
          onClick={handleProcessPayroll}
          className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <Send className="w-5 h-5" />
          <span>Process Payroll</span>
        </AnimatedButton>
        
        <AnimatedButton
          onClick={() => setShowBulkImport(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <Upload className="w-5 h-5" />
          <span>Bulk Import</span>
        </AnimatedButton>
              </div>
            </div>
        </div>
      </div>

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-white opacity-10"></div>
            <div className="relative p-3 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 bg-white bg-opacity-20 rounded-md backdrop-blur-sm">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <p className="text-green-100 text-xs font-medium">Total Net Pay</p>
                  <p className="text-green-200 text-xs">Current month</p>
                </div>
              </div>
            <div>
                <p className="text-xl font-bold mb-1">{formatCurrency(totalPayroll)}</p>
                <p className="text-green-100 text-xs">{securityEmployees.length} employees</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-white opacity-10"></div>
            <div className="relative p-3 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 bg-white bg-opacity-20 rounded-md backdrop-blur-sm">
                  <Calculator className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-xs font-medium">Total Gross Salary</p>
                  <p className="text-blue-200 text-xs">Before deductions</p>
                </div>
              </div>
            <div>
                <p className="text-xl font-bold mb-1">{formatCurrency(totalGrossSalary)}</p>
                <p className="text-blue-100 text-xs">Gross earnings</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-red-500 to-pink-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-white opacity-10"></div>
            <div className="relative p-3 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 bg-white bg-opacity-20 rounded-md backdrop-blur-sm">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <p className="text-red-100 text-xs font-medium">Total Deductions</p>
                  <p className="text-red-200 text-xs">Taxes and benefits</p>
                </div>
              </div>
            <div>
                <p className="text-xl font-bold mb-1">{formatCurrency(totalDeductions)}</p>
                <p className="text-red-100 text-xs">All deductions</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-white opacity-10"></div>
            <div className="relative p-3 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 bg-white bg-opacity-20 rounded-md backdrop-blur-sm">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <p className="text-purple-100 text-xs font-medium">RSSB Contributions</p>
                  <p className="text-purple-200 text-xs">Pension & benefits</p>
                </div>
              </div>
            <div>
                <p className="text-xl font-bold mb-1">{formatCurrency(totalRssbContributions)}</p>
                <p className="text-purple-100 text-xs">Total RSSB</p>
              </div>
            </div>
          </div>
      </div>

        {/* Enhanced Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
            <button
                onClick={() => setActiveTab('payroll')}
                className={`py-6 px-1 border-b-3 font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'payroll'
                    ? 'border-blue-500 text-blue-600 bg-white rounded-t-xl shadow-sm'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${activeTab === 'payroll' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <Shield className="w-5 h-5" />
                  </div>
                  <span>Payroll Sheet</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('periods')}
                className={`py-6 px-1 border-b-3 font-semibold text-sm transition-all duration-300 ${
                activeTab === 'periods'
                    ? 'border-green-500 text-green-600 bg-white rounded-t-xl shadow-sm'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${activeTab === 'periods' ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                <span>Payroll Periods</span>
              </div>
            </button>
          </nav>
        </div>

          <div className="p-8">
            {activeTab === 'payroll' ? (
              /* Enhanced Payroll Sheet - Excel-like interface */
              <div className="space-y-6">
              <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Security Personnel Payroll</h3>
                    <p className="text-gray-600">Excel-like interface with automated calculations</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm w-80"
                      />
                    </div>
                <AnimatedButton
                  onClick={handleAddEmployee}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
                >
                      <Plus className="w-5 h-5" />
                      <span className="font-medium">Add Employee</span>
                </AnimatedButton>
                  </div>
              </div>

                {/* Enhanced Excel-like table with all columns */}
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
                  <table className="w-full border-collapse">
                  <thead>
                      <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">NO</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">NAME</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">POST</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">ACCOUNT</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">BANK NAME</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">TELEPHONE</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">ID</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">Basic Salary</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">Transport Allowance</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">Gross Salary</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">PAYE</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">0.3% maternity leave employee</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">0.3% maternity leave employer</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">6% RSSB pension employee</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">6% RSSB pension employer</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">2% RSSB pension employee</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">TOTAL RSSB Contribution</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">Net pay B4 CBHI</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">Mutuelle 0.5%</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">Advance</th>
                        <th className="border-r border-blue-500 px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">Net Bank List</th>
                        <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      {filteredEmployees.map((employee, index) => (
                        <tr key={employee.id} className={`hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm font-medium text-gray-900">{employee.no}</td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm font-semibold text-gray-900">{employee.name}</td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm text-gray-700">{employee.post}</td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm text-gray-700 font-mono">{employee.account}</td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm bg-red-50 text-red-700 font-semibold">{employee.bankName}</td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm text-gray-700 font-mono">{employee.telephone}</td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm text-gray-700 font-mono">{employee.idNumber}</td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm">
                            {editingEmployee?.id === employee.id ? (
                              <input
                                type="number"
                                value={editingEmployee.basicSalary}
                                onChange={(e) => handleInputChange('basicSalary', Number(e.target.value))}
                                className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <span className="font-semibold text-gray-900">{formatCurrency(employee.basicSalary)}</span>
                            )}
                          </td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm">
                            {editingEmployee?.id === employee.id ? (
                              <input
                                type="number"
                                value={editingEmployee.transportAllowance}
                                onChange={(e) => handleInputChange('transportAllowance', Number(e.target.value))}
                                className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <span className="font-semibold text-gray-900">{formatCurrency(employee.transportAllowance)}</span>
                            )}
                          </td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm font-bold bg-blue-50 text-blue-700">
                            {formatCurrency(employee.grossSalary)}
                          </td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm text-gray-700">
                            {employee.paye === 0 ? <span className="text-gray-400">-</span> : formatCurrency(employee.paye)}
                          </td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm text-gray-700">{employee.maternityLeaveEmployee}</td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm text-gray-700">{employee.maternityLeaveEmployer}</td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm text-gray-700">{employee.rssbPensionEmployee6}</td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm text-gray-700">{employee.rssbPensionEmployer6}</td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm text-gray-700">{employee.rssbPensionEmployee2}</td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm font-bold bg-green-50 text-green-700">
                            {employee.totalRssbContribution}
                        </td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm font-bold bg-yellow-50 text-yellow-700">
                            {formatCurrency(employee.netPayB4CBHI)}
                        </td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm text-gray-700">{employee.mutuelle}</td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm">
                            {editingEmployee?.id === employee.id ? (
                              <input
                                type="number"
                                value={editingEmployee.advance}
                                onChange={(e) => handleInputChange('advance', Number(e.target.value))}
                                className="w-full px-2 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <span className="text-gray-700">{employee.advance || '-'}</span>
                            )}
                        </td>
                          <td className="border-r border-gray-200 px-3 py-4 text-sm font-bold bg-green-100 text-green-800">
                            {formatCurrency(employee.netBankList)}
                        </td>
                          <td className="px-3 py-4 text-sm">
                          <div className="flex items-center space-x-2">
                              {editingEmployee?.id === employee.id ? (
                                <>
                                  <AnimatedButton
                                    onClick={handleSaveEmployee}
                                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                                  >
                                    <Save className="w-4 h-4" />
                                  </AnimatedButton>
                                  <AnimatedButton
                                    onClick={handleCancelEdit}
                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                  >
                                    <X className="w-4 h-4" />
                                  </AnimatedButton>
                                </>
                              ) : (
                                <>
                            <AnimatedButton
                              onClick={() => handleViewEmployee(employee)}
                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                            >
                              <Eye className="w-4 h-4" />
                            </AnimatedButton>
                            <AnimatedButton
                              onClick={() => handleEditEmployee(employee)}
                                    className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                            >
                              <Edit className="w-4 h-4" />
                            </AnimatedButton>
                                </>
                              )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
              /* Enhanced Payroll Periods */
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Payroll History</h3>
                  <p className="text-gray-600">Track and manage payroll periods</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {payrollPeriods.map((period) => (
                    <div key={period.id} className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-gray-900">{period.period}</h4>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(period.status)}`}>
                        {getStatusIcon(period.status)}
                          <span className="ml-2 capitalize">{period.status}</span>
                      </span>
                    </div>
                    
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Period</span>
                          <span className="text-gray-900 font-semibold">{period.startDate} - {period.endDate}</span>
                      </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Total Amount</span>
                          <span className="font-bold text-green-600 text-lg">{formatCurrency(period.totalAmount)}</span>
                      </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600 font-medium">Employees</span>
                          <span className="text-gray-900 font-semibold">{period.employeeCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Enhanced Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Employee Payroll Details</h3>
                  <p className="text-blue-100">Complete payroll breakdown for {selectedEmployee.name}</p>
                </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                  className="text-white hover:text-gray-200 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200"
              >
                  <X className="w-6 h-6" />
              </button>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      Personal Information
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Employee Name</label>
                        <p className="text-lg font-semibold text-gray-900">{selectedEmployee.name}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Post/Location</label>
                        <p className="text-gray-900 font-medium">{selectedEmployee.post}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Account Number</label>
                        <p className="text-gray-900 font-mono">{selectedEmployee.account}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Bank Name</label>
                        <p className="text-red-600 font-semibold">{selectedEmployee.bankName}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Telephone</label>
                        <p className="text-gray-900 font-mono">{selectedEmployee.telephone}</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <label className="block text-sm font-medium text-gray-600 mb-1">ID Number</label>
                        <p className="text-gray-900 font-mono">{selectedEmployee.idNumber}</p>
                      </div>
                    </div>
                  </div>
            </div>
            
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Calculator className="w-5 h-5 mr-2 text-green-600" />
                      Payroll Breakdown
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Basic Salary:</span>
                        <span className="font-bold text-gray-900">{formatCurrency(selectedEmployee.basicSalary)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">Transport Allowance:</span>
                        <span className="font-bold text-gray-900">{formatCurrency(selectedEmployee.transportAllowance)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b-2 border-blue-200 bg-blue-50 rounded-lg px-3">
                        <span className="text-blue-700 font-semibold">Gross Salary:</span>
                        <span className="font-bold text-blue-700 text-lg">{formatCurrency(selectedEmployee.grossSalary)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">PAYE:</span>
                        <span className="font-semibold">{selectedEmployee.paye === 0 ? <span className="text-gray-400">-</span> : formatCurrency(selectedEmployee.paye)}</span>
                </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Maternity Leave (0.3%):</span>
                        <span className="font-semibold">{selectedEmployee.maternityLeaveEmployee}</span>
                </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">RSSB Pension (6%):</span>
                        <span className="font-semibold">{selectedEmployee.rssbPensionEmployee6}</span>
                </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">RSSB Pension (2%):</span>
                        <span className="font-semibold">{selectedEmployee.rssbPensionEmployee2}</span>
                </div>
                      <div className="flex justify-between items-center py-3 border-b-2 border-yellow-200 bg-yellow-50 rounded-lg px-3">
                        <span className="text-yellow-700 font-semibold">Net Pay B4 CBHI:</span>
                        <span className="font-bold text-yellow-700 text-lg">{formatCurrency(selectedEmployee.netPayB4CBHI)}</span>
                </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Mutuelle (0.5%):</span>
                        <span className="font-semibold">{selectedEmployee.mutuelle}</span>
                </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600">Advance:</span>
                        <span className="font-semibold">{selectedEmployee.advance || 0}</span>
                </div>
                      <div className="flex justify-between items-center py-4 border-b-2 border-green-200 bg-green-50 rounded-lg px-3">
                        <span className="text-green-700 font-bold text-lg">Net Bank List:</span>
                        <span className="font-bold text-green-700 text-xl">{formatCurrency(selectedEmployee.netBankList)}</span>
                </div>
                </div>
                </div>
              </div>
            </div>
            
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <AnimatedButton
                onClick={() => setSelectedEmployee(null)}
                  className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200"
              >
                Close
              </AnimatedButton>
              <AnimatedButton
                  onClick={() => {
                    setSelectedEmployee(null);
                    handleEditEmployee(selectedEmployee);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg transition-all duration-200"
              >
                Edit Employee
              </AnimatedButton>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Payroll Document Modal */}
      {showPayrollDocument && (
        <PayrollDocument
          employees={securityEmployees}
          onClose={() => setShowPayrollDocument(false)}
        />
      )}

      {/* Bulk Import Modal */}
      {showBulkImport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Bulk Import Security Personnel</h2>
                <button
                  onClick={() => setShowBulkImport(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border-2 border-dashed border-blue-300 rounded-xl text-center hover:border-blue-500 transition-colors">
                    <Download className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Download Template</h3>
                    <p className="text-sm text-gray-600 mb-3">Get the CSV template with correct format</p>
                    <button
                      onClick={downloadTemplate}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Download Template
                    </button>
                  </div>
                  
                  <div className="p-4 border-2 border-dashed border-green-300 rounded-xl text-center hover:border-green-500 transition-colors">
                    <div className="w-8 h-8 text-green-500 mx-auto mb-2 flex items-center justify-center">
                      <span className="text-lg">📋</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Excel to CSV Guide</h3>
                    <p className="text-sm text-gray-600 mb-3">How to convert Excel files to CSV format</p>
                    <div className="text-xs text-left text-gray-600 space-y-1">
                      <p>1. Open your Excel file</p>
                      <p>2. Go to File → Save As</p>
                      <p>3. Choose "CSV (Comma delimited)"</p>
                      <p>4. Save and upload the .csv file</p>
                    </div>
                  </div>

                  <div className="p-4 border-2 border-dashed border-green-300 rounded-xl text-center hover:border-green-500 transition-colors">
                    <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Generate Sample Data</h3>
                    <p className="text-sm text-gray-600 mb-3">Create 100 sample employees for testing</p>
                    <button
                      onClick={generateSampleData}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Generate Sample
                    </button>
                  </div>
                </div>

                {/* File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload CSV File</h3>
                  <p className="text-gray-600 mb-4">Upload your CSV file with security personnel data</p>
                  <p className="text-sm text-blue-600 mb-4">
                    <strong>Note:</strong> Only CSV files are supported. If you have an Excel file, please save it as CSV format first.
                  </p>
                  
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium cursor-pointer transition-colors inline-block"
                  >
                    Choose CSV File (.csv only)
                  </label>
                  
                  {importFile && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium">Selected: {importFile.name}</p>
                      <p className="text-green-600 text-sm">Size: {(importFile.size / 1024).toFixed(1)} KB</p>
                      {importFile.name.toLowerCase().endsWith('.xlsx') || importFile.name.toLowerCase().endsWith('.xls') ? (
                        <p className="text-red-600 text-sm mt-1">
                          ⚠️ Excel file detected. Please save as CSV format first.
                        </p>
                      ) : null}
                    </div>
                  )}

                  {/* CSV Preview */}
                  {csvPreview && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-3">📋 CSV Preview</h4>
                      
                      {/* Field Mapping Status */}
                      <div className="mb-4">
                        <h5 className="font-medium text-blue-800 mb-2">Field Mapping Status:</h5>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className={`p-2 rounded ${csvPreview.mappedFields.name !== undefined ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            <strong>Name:</strong> {csvPreview.mappedFields.name !== undefined ? `Col ${csvPreview.mappedFields.name + 1}` : 'Missing'}
                          </div>
                          <div className={`p-2 rounded ${csvPreview.mappedFields.basicSalary !== undefined ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            <strong>Basic Salary:</strong> {csvPreview.mappedFields.basicSalary !== undefined ? `Col ${csvPreview.mappedFields.basicSalary + 1}` : 'Missing'}
                          </div>
                          <div className={`p-2 rounded ${csvPreview.mappedFields.transportAllowance !== undefined ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            <strong>Transport:</strong> {csvPreview.mappedFields.transportAllowance !== undefined ? `Col ${csvPreview.mappedFields.transportAllowance + 1}` : 'Missing'}
                          </div>
                          <div className={`p-2 rounded ${csvPreview.mappedFields.post !== undefined ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            <strong>Position:</strong> {csvPreview.mappedFields.post !== undefined ? `Col ${csvPreview.mappedFields.post + 1}` : 'Optional'}
                          </div>
                          <div className={`p-2 rounded ${csvPreview.mappedFields.account !== undefined ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            <strong>Account:</strong> {csvPreview.mappedFields.account !== undefined ? `Col ${csvPreview.mappedFields.account + 1}` : 'Optional'}
                          </div>
                          <div className={`p-2 rounded ${csvPreview.mappedFields.bankName !== undefined ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            <strong>Bank:</strong> {csvPreview.mappedFields.bankName !== undefined ? `Col ${csvPreview.mappedFields.bankName + 1}` : 'Optional'}
                          </div>
                          <div className={`p-2 rounded ${csvPreview.mappedFields.grossSalary !== undefined ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                            <strong>Gross Salary:</strong> {csvPreview.mappedFields.grossSalary !== undefined ? `Col ${csvPreview.mappedFields.grossSalary + 1}` : 'Auto-calc'}
                          </div>
                          <div className={`p-2 rounded ${csvPreview.mappedFields.paye !== undefined ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                            <strong>PAYE:</strong> {csvPreview.mappedFields.paye !== undefined ? `Col ${csvPreview.mappedFields.paye + 1}` : 'Auto-calc'}
                          </div>
                          <div className={`p-2 rounded ${csvPreview.mappedFields.advance !== undefined ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                            <strong>Advance:</strong> {csvPreview.mappedFields.advance !== undefined ? `Col ${csvPreview.mappedFields.advance + 1}` : 'Default 0'}
                          </div>
                        </div>
                        <p className="text-xs text-blue-600 mt-2">
                          <span className="bg-green-100 text-green-800 px-1 rounded">Green</span> = Required/Found, 
                          <span className="bg-yellow-100 text-yellow-800 px-1 rounded">Yellow</span> = Optional, 
                          <span className="bg-blue-100 text-blue-800 px-1 rounded">Blue</span> = Payroll Data, 
                          <span className="bg-gray-100 text-gray-600 px-1 rounded">Gray</span> = Auto-calculated
                        </p>
                      </div>

                      {/* Data Preview Table */}
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-xs border border-blue-200">
                          <thead className="bg-blue-100">
                            <tr>
                              {csvPreview.headers.map((header, index) => (
                                <th key={index} className="px-2 py-1 border border-blue-200 text-left">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {csvPreview.rows.map((row, rowIndex) => (
                              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-blue-25'}>
                                {row.map((cell, cellIndex) => (
                                  <td key={cellIndex} className="px-2 py-1 border border-blue-200">
                                    {cell || '-'}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <p className="text-xs text-blue-600 mt-2">
                        Showing first 5 rows. {csvPreview.rows.length < 5 ? 'All data shown.' : 'More rows will be processed during import.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Import Progress */}
                {importStatus === 'processing' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Processing...</span>
                      <span className="text-sm text-gray-500">{Math.round(importProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${importProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Import Errors */}
                {importErrors.length > 0 && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Import Errors:</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      {importErrors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Import Button */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowBulkImport(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={processBulkImport}
                    disabled={!importFile || importStatus === 'processing' || (csvPreview ? (!csvPreview.mappedFields.name || !csvPreview.mappedFields.basicSalary || !csvPreview.mappedFields.transportAllowance) : false)}
                    className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  >
                    {importStatus === 'processing' ? 'Processing...' : 'Import Employees'}
                  </button>
                  
                  {csvPreview && (!csvPreview.mappedFields.name || !csvPreview.mappedFields.basicSalary || !csvPreview.mappedFields.transportAllowance) && (
                    <p className="text-red-600 text-sm mt-2">
                      ⚠️ Cannot import: Missing required fields (Name, Basic Salary, Transport Allowance)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityPayroll;
