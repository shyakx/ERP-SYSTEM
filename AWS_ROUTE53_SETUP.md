# 🌐 AWS Route 53 Custom Domain Setup Guide
## Setting up www.dicel-erp.com for DICEL ERP Application

---

## 📋 **Table of Contents**
1. [Prerequisites](#prerequisites)
2. [Step 1: Domain Registration](#step-1-domain-registration)
3. [Step 2: Create Hosted Zone](#step-2-create-hosted-zone)
4. [Step 3: SSL Certificate Setup](#step-3-ssl-certificate-setup)
5. [Step 4: Update CloudFront Distribution](#step-4-update-cloudfront-distribution)
6. [Step 5: Configure DNS Records](#step-5-configure-dns-records)
7. [Step 6: Testing & Validation](#step-6-testing--validation)
8. [Troubleshooting](#troubleshooting)
9. [Cost Breakdown](#cost-breakdown)
10. [Security Best Practices](#security-best-practices)

---

## 🎯 **Prerequisites**

### **Required AWS Services:**
- ✅ AWS Account with billing enabled
- ✅ Route 53 (DNS Management)
- ✅ CloudFront (CDN - Already configured)
- ✅ S3 (Storage - Already configured)
- ✅ Certificate Manager (SSL Certificates)

### **Current Setup:**
- **CloudFront Distribution ID**: `E144DEXER1WRP0`
- **S3 Bucket**: `dicel-erp-production`
- **Current URL**: `https://d2iq65q7bkruv1.cloudfront.net/`

---

## 🚀 **Step 1: Domain Registration**

### **Option A: Register via AWS Route 53**

1. **Access Route 53 Console:**
   ```
   AWS Console → Route 53 → Register Domain
   ```

2. **Search for Domain:**
   - Enter: `dicel-erp.com`
   - Check availability
   - If available, proceed to registration

3. **Complete Registration:**
   - Fill in contact information
   - Choose registration period (1-10 years recommended)
   - Complete payment (~$12/year for .com)

### **Option B: Use Existing Domain**

If you already own `dicel-erp.com`:
- Transfer to AWS Route 53, OR
- Keep with current registrar and update nameservers

---

## 🏗️ **Step 2: Create Hosted Zone**

### **Create Hosted Zone:**

1. **Navigate to Route 53:**
   ```
   AWS Console → Route 53 → Hosted zones
   ```

2. **Create New Hosted Zone:**
   - Click "Create hosted zone"
   - Domain name: `dicel-erp.com`
   - Type: Public hosted zone
   - Click "Create hosted zone"

3. **Note Name Servers:**
   - Copy the 4 name servers provided
   - Example:
     ```
     ns-1234.awsdns-12.com
     ns-5678.awsdns-34.org
     ns-9012.awsdns-56.net
     ns-3456.awsdns-78.co.uk
     ```

### **Update Domain Nameservers (if using external registrar):**

1. **Go to your domain registrar**
2. **Update nameservers** to the 4 provided by AWS
3. **Wait for propagation** (24-48 hours, usually 1-2 hours)

---

## 🔒 **Step 3: SSL Certificate Setup**

### **Request SSL Certificate:**

1. **Access Certificate Manager:**
   ```
   AWS Console → Certificate Manager → Request certificate
   ```

2. **Add Domain Names:**
   - Primary domain: `dicel-erp.com`
   - Wildcard: `*.dicel-erp.com` (for subdomains)
   - Validation method: DNS validation
   - Click "Request"

3. **Validate Certificate:**
   - Route 53 will automatically create validation records
   - Wait for certificate to be issued (5-10 minutes)
   - Status should change to "Issued"

### **Certificate Details:**
- **Domain**: `dicel-erp.com`
- **Wildcard**: `*.dicel-erp.com`
- **Validation**: DNS
- **Cost**: Free with AWS Certificate Manager

---

## ☁️ **Step 4: Update CloudFront Distribution**

### **Modify CloudFront Distribution:**

1. **Access CloudFront Console:**
   ```
   AWS Console → CloudFront → Distributions
   ```

2. **Select Your Distribution:**
   - Distribution ID: `E144DEXER1WRP0`
   - Click "Edit"

3. **Update Alternate Domain Names:**
   - In "Alternate domain names (CNAMEs)":
     - Add: `www.dicel-erp.com`
     - Add: `dicel-erp.com`

4. **Update SSL Certificate:**
   - SSL Certificate: Custom SSL Certificate
   - Select your certificate from ACM
   - Minimum protocol version: TLSv1.2_2021

5. **Save Changes:**
   - Click "Yes, Edit"
   - Wait for deployment (5-10 minutes)

### **CloudFront Configuration:**
```json
{
  "DistributionId": "E144DEXER1WRP0",
  "AlternateDomainNames": [
    "www.dicel-erp.com",
    "dicel-erp.com"
  ],
  "SSLCertificate": "arn:aws:acm:us-east-1:ACCOUNT:certificate/CERT-ID"
}
```

---

## 📝 **Step 5: Configure DNS Records**

### **Create DNS Records in Route 53:**

1. **Access Your Hosted Zone:**
   ```
   Route 53 → Hosted zones → dicel-erp.com
   ```

2. **Create A Record for Root Domain:**
   ```
   Record name: (leave empty for root domain)
   Record type: A
   Alias: Yes
   Route traffic to: CloudFront distribution
   Region: US East (N. Virginia)
   Distribution: E144DEXER1WRP0
   ```

3. **Create CNAME Record for www:**
   ```
   Record name: www
   Record type: CNAME
   Value: d2iq65q7bkruv1.cloudfront.net
   TTL: 300 seconds
   ```

### **DNS Records Summary:**
```
Type    Name                    Value
A       dicel-erp.com          CloudFront Distribution
CNAME   www.dicel-erp.com      d2iq65q7bkruv1.cloudfront.net
```

---

## 🧪 **Step 6: Testing & Validation**

### **DNS Propagation Check:**

1. **Check DNS Resolution:**
   ```bash
   nslookup www.dicel-erp.com
   nslookup dicel-erp.com
   ```

2. **Test SSL Certificate:**
   ```bash
   curl -I https://www.dicel-erp.com
   curl -I https://dicel-erp.com
   ```

3. **Browser Testing:**
   - Open: `https://www.dicel-erp.com`
   - Open: `https://dicel-erp.com`
   - Verify SSL lock icon
   - Test all application features

### **Expected Results:**
- ✅ Both URLs resolve to your application
- ✅ SSL certificate is valid
- ✅ No security warnings
- ✅ All application features work

---

## 🔧 **Troubleshooting**

### **Common Issues & Solutions:**

#### **1. DNS Not Resolving:**
```bash
# Check if DNS is propagated
dig www.dicel-erp.com
nslookup www.dicel-erp.com

# Wait 24-48 hours for full propagation
```

#### **2. SSL Certificate Issues:**
- Verify certificate is issued in ACM
- Check CloudFront distribution settings
- Ensure certificate is in US East (N. Virginia) region

#### **3. CloudFront Not Working:**
```bash
# Check CloudFront distribution status
aws cloudfront get-distribution --id E144DEXER1WRP0

# Invalidate cache if needed
aws cloudfront create-invalidation --distribution-id E144DEXER1WRP0 --paths "/*"
```

#### **4. 403 Forbidden Errors:**
- Check S3 bucket policy
- Verify CloudFront origin settings
- Ensure public read access on S3 bucket

### **Useful Commands:**
```bash
# Check DNS propagation
dig +short www.dicel-erp.com

# Test SSL certificate
openssl s_client -connect www.dicel-erp.com:443 -servername www.dicel-erp.com

# Check CloudFront status
aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='DICEL ERP Production']"
```

---

## 💰 **Cost Breakdown**

### **Monthly Costs:**
- **Domain Registration**: $1.00/month (billed annually)
- **Route 53 Hosted Zone**: $0.50/month
- **SSL Certificate**: Free
- **CloudFront**: ~$0.10-0.50/month (for low traffic)
- **S3 Storage**: ~$0.02-0.05/month

### **Total Estimated Cost:**
- **Monthly**: ~$1.60-2.00
- **Annual**: ~$19-24

### **Cost Optimization:**
- Use CloudFront caching to reduce S3 requests
- Enable compression in CloudFront
- Set appropriate TTL values

---

## 🔐 **Security Best Practices**

### **SSL/TLS Configuration:**
- Minimum protocol: TLSv1.2_2021
- Enable HSTS headers
- Redirect HTTP to HTTPS

### **DNS Security:**
- Enable DNSSEC (if supported by registrar)
- Use Route 53 for reliable DNS
- Monitor DNS queries

### **CloudFront Security:**
- Enable WAF (Web Application Firewall) if needed
- Set up geo-restrictions if required
- Monitor access logs

### **S3 Security:**
- Block public access (except for website hosting)
- Use bucket policies for access control
- Enable versioning for backup

---

## 📊 **Monitoring & Maintenance**

### **Regular Checks:**
- ✅ SSL certificate expiration (renewal is automatic)
- ✅ Domain registration expiration
- ✅ CloudFront distribution status
- ✅ S3 bucket access logs

### **Performance Monitoring:**
- CloudFront metrics in AWS Console
- Route 53 health checks
- Application performance monitoring

### **Backup Strategy:**
- S3 bucket versioning enabled
- Route 53 hosted zone backup
- SSL certificate backup (automatic with ACM)

---

## 🎯 **Final Checklist**

### **Before Going Live:**
- [ ] Domain registered and active
- [ ] Hosted zone created
- [ ] SSL certificate issued
- [ ] CloudFront distribution updated
- [ ] DNS records configured
- [ ] Both URLs working (www and non-www)
- [ ] SSL certificate valid
- [ ] Application fully functional
- [ ] Performance tested
- [ ] Security headers configured

### **Post-Launch:**
- [ ] Monitor DNS propagation
- [ ] Test from different locations
- [ ] Verify mobile compatibility
- [ ] Check analytics tracking
- [ ] Set up monitoring alerts

---

## 📞 **Support & Resources**

### **AWS Documentation:**
- [Route 53 Developer Guide](https://docs.aws.amazon.com/Route53/)
- [CloudFront Developer Guide](https://docs.aws.amazon.com/CloudFront/)
- [Certificate Manager User Guide](https://docs.aws.amazon.com/acm/)

### **Useful Tools:**
- [DNS Checker](https://dnschecker.org/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [GTmetrix](https://gtmetrix.com/) (Performance testing)

### **Contact Information:**
- **AWS Support**: Available in AWS Console
- **Route 53 Support**: Included with AWS Support plans
- **Community**: AWS Developer Forums

---

## 🚀 **Quick Reference Commands**

### **AWS CLI Commands:**
```bash
# Check CloudFront distribution
aws cloudfront get-distribution --id E144DEXER1WRP0

# List hosted zones
aws route53 list-hosted-zones

# Check SSL certificates
aws acm list-certificates

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E144DEXER1WRP0 --paths "/*"
```

### **Testing Commands:**
```bash
# DNS resolution
nslookup www.dicel-erp.com

# SSL certificate
curl -I https://www.dicel-erp.com

# Performance test
curl -w "@curl-format.txt" -o /dev/null -s https://www.dicel-erp.com
```

---

**🎉 Congratulations! Your DICEL ERP application will now be accessible at `https://www.dicel-erp.com`**

This setup provides a professional, secure, and scalable hosting solution for your ERP application with global CDN distribution and automatic SSL certificate management. 