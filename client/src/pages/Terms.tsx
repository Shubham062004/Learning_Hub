import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Scale, AlertCircle, CreditCard } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-xl text-gray-600">
            Please read these terms carefully before using our platform.
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: October 17, 2025</p>
        </div>

        <div className="grid gap-8">
          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="h-5 w-5 mr-2 text-green-600" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Learning Hub, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please 
                do not use this service.
              </p>
            </CardContent>
          </Card>

          {/* Use License */}
          <Card>
            <CardHeader>
              <CardTitle>Use License</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Permitted Use</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Access and view course content for personal, non-commercial use</li>
                  <li>Download materials for offline viewing (where available)</li>
                  <li>Participate in discussions and community features</li>
                  <li>Share course progress and achievements</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Prohibited Activities</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Redistribute or resell course content</li>
                  <li>Share account credentials with others</li>
                  <li>Use automated tools to access the platform</li>
                  <li>Upload malicious content or spam</li>
                  <li>Circumvent security measures or access restrictions</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                Subscription and Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Free Trial</h3>
                <p className="text-gray-600">
                  New users are eligible for a 7-day free trial. You may cancel anytime during 
                  the trial period without charge.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Subscription Plans</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Monthly and annual billing options available</li>
                  <li>Automatic renewal unless cancelled</li>
                  <li>Course access valid for 90 days from enrollment</li>
                  <li>Refunds available within 30 days of purchase</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cancellation</h3>
                <p className="text-gray-600">
                  You may cancel your subscription at any time. Access will continue until 
                  the end of your current billing period.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Course Access */}
          <Card>
            <CardHeader>
              <CardTitle>Course Access and Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Access Validity</h3>
                <p className="text-gray-600">
                  Course access is valid for 90 days from the date of enrollment. After expiration, 
                  you can renew access by upgrading your subscription or purchasing individual courses.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Content Updates</h3>
                <p className="text-gray-600">
                  We regularly update course content to ensure accuracy and relevance. New content 
                  may be added without additional charge during your access period.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Completion Certificates</h3>
                <p className="text-gray-600">
                  Certificates are awarded upon successful completion of course requirements. 
                  Certificates remain accessible even after course access expires.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                Disclaimers and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Service Availability</h3>
                <p className="text-gray-600">
                  While we strive for 99.9% uptime, we cannot guarantee uninterrupted service. 
                  Maintenance and updates may temporarily affect availability.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Content Accuracy</h3>
                <p className="text-gray-600">
                  Course content is provided for educational purposes. While we ensure quality, 
                  we cannot guarantee that all information is error-free or up-to-date.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Career Outcomes</h3>
                <p className="text-gray-600">
                  Completion of courses does not guarantee employment or specific career outcomes. 
                  Success depends on individual effort, market conditions, and other factors.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                For questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> legal@learninghub.com</p>
                <p><strong>Address:</strong> Learning Hub Legal Team, 123 Education Street, Learning City, LC 12345</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
