import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Your privacy is important to us. Here's how we protect your data.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: October 17, 2025</p>
        </div>

        <div className="grid gap-8">
          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-blue-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Name and email address when you create an account</li>
                  <li>Phone number for account verification</li>
                  <li>Payment information for subscriptions (processed securely)</li>
                  <li>Profile information you choose to provide</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Learning Data</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Course progress and completion status</li>
                  <li>Quiz results and assignment submissions</li>
                  <li>Learning preferences and activity logs</li>
                  <li>Video watch time and engagement metrics</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-green-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide and improve our learning platform services</li>
                <li>Personalize your learning experience and recommendations</li>
                <li>Process payments and manage your subscription</li>
                <li>Send important updates about your account and courses</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>Analyze usage patterns to improve our platform</li>
                <li>Comply with legal obligations and prevent fraud</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-purple-600" />
                How We Protect Your Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Security Measures</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure cloud storage with regular backups</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal data by authorized personnel only</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Data Retention</h3>
                <p className="text-gray-600">
                  We keep your personal information only as long as necessary to provide our services 
                  and comply with legal obligations. You can request deletion of your account and 
                  data at any time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Access & Control</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>View and update your profile information</li>
                    <li>Download your learning data</li>
                    <li>Delete your account and data</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Communication Preferences</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Manage email notification settings</li>
                    <li>Opt out of marketing communications</li>
                    <li>Control learning recommendations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy or how we handle your data, 
                please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> privacy@learninghub.com</p>
                <p><strong>Address:</strong> Learning Hub Privacy Team, 123 Education Street, Learning City, LC 12345</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
