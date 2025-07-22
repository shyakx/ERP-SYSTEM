const jwt = require('jsonwebtoken');

// Simple token verification middleware with enhanced logging
const authenticateToken = (req, res, next) => {
  console.log(`🔐 [AUTH] Authenticating request to ${req.path}`);
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    console.log(`❌ [AUTH] No token provided for ${req.path}`);
    return res.status(401).json({ error: 'Access token required' });
  }

  console.log(`🔍 [AUTH] Token found: ${token.substring(0, 10)}...`);

  try {
    // For demo purposes, we'll use a simple token check
    // In production, you should use proper JWT verification
    if (token === 'demo-token') {
      req.user = {
        id: 'DIC001',
        role: 'system_admin',
        email: 'admin@dicelsecurity.com'
      };
      console.log(`✅ [AUTH] Token valid for ${req.path} - User: ${req.user.role}`);
      next();
    } else {
      console.log(`❌ [AUTH] Invalid token for ${req.path}`);
      return res.status(403).json({ error: 'Invalid token' });
    }
  } catch (err) {
    console.log(`❌ [AUTH] Token verification error for ${req.path}:`, err.message);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Role-based authorization middleware with enhanced logging
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(`🔒 [ROLE] Checking roles for ${req.path}`);
    console.log(`   📝 Required roles:`, roles);
    console.log(`   📝 User role:`, req.user?.role);
    
    if (!req.user) {
      console.log(`❌ [ROLE] No user found for ${req.path}`);
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      console.log(`❌ [ROLE] Insufficient permissions for ${req.path}`);
      console.log(`   📝 User role: ${req.user.role}, Required: ${roles.join(', ')}`);
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    console.log(`✅ [ROLE] Access granted for ${req.path} - User: ${req.user.role}`);
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles
}; 