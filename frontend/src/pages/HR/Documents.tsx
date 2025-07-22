import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Upload, 
  Download, 
  Search, 
  Filter, 
  Plus, 
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Tag,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'react-toastify';
import apiService from '../../services/api'; 