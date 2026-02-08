import React from 'react';

const PrivacyContent = () => {
    return (
        <div className="space-y-6 text-slate-300 font-medium leading-relaxed">
            <section>
                <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
                <p>
                    Battlevault (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) values your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application (the &quot;Platform&quot;). By using the Platform, you consent to the data practices described in this policy.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
                <p className="mb-2">We collect information that identifies you personally, as well as other data regarding your use of the Platform.</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Account Information:</strong> Name, email address, phone number, and country</li>
                    <li><strong>Gameplay Data:</strong> Records of games played, scores, competition history, and invite lists.</li>
                    <li><strong>Financial Information:</strong> Bank account details (for withdrawals) and transaction history. Note that we do not store your credit card numbers; these are processed securely by our payment partners.</li>
                    <li><strong>Device and Usage Data:</strong> IP address, browser type, device identifiers, and operating system info collected automatically via cookies and analytics tools.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
                <p className="mb-2">We use the collected data for the following purposes:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>To operate and maintain the Platform and its features.</li>
                    {/* <li>To verify your identity and age in compliance with our Terms of Service.</li> */}
                    <li>To process payments and withdrawals via our third-party providers (e.g., Paystack).</li>
                    <li>To prevent fraud, cheating, and unauthorized access.</li>
                    <li>To communicate with you regarding updates, support, and promotional offers.</li>
                    <li>To comply with legal obligations and regulatory requirements in Nigeria.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">4. Disclosure of Your Information</h2>
                <p className="mb-2">We may share your information with:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf, such as payment processing (Paystack), data hosting (Google Cloud), and analytics.</li>
                    <li><strong>Legal Requirements:</strong> If required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
                    <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">5. Data Retention and Security</h2>
                <p>
                    We implement appropriate technical and organizational security measures to protect your personal information. We retain your personal data only for as long as necessary to fulfill the purposes set out in this policy or as required by law.
                    {/* (e.g., for tax and accounting purposes). */}
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">6. Cookies and Tracking Technologies</h2>
                <p>
                    We use cookies and similar tracking technologies to track activity on our Platform and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Platform.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">7. Your Data Rights</h2>
                <p className="mb-2">Under the Nigeria Data Protection Regulation (NDPR) and other applicable laws, you have the right to:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Access the personal data we hold about you.</li>
                    <li>Request correction of any inaccurate or incomplete data.</li>
                    <li>Request deletion of your personal data (&quot;Right to be Forgotten&quot;), subject to legal retention obligations.</li>
                    <li>Object to or restrict the processing of your personal data.</li>
                    <li>Withdraw consent at any time where we relied on your consent to process your information.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">8. Third-Party Websites</h2>
                <p>
                    Our Platform may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                </p>
            </section>

            {/* <section>
                <h2 className="text-xl font-bold text-white mb-3">9. Children&apos;s Privacy</h2>
                <p>
                    Our Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If we become aware that we have collected such data without verification of parental consent, we take steps to remove that information from our servers.
                </p>
            </section> */}

            <section>
                <h2 className="text-xl font-bold text-white mb-3">9. Changes to This Privacy Policy</h2>
                <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">10. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact our Data Protection Officer at: <a href="mailto:adeolaafaraday@gmail.com" className="text-indigo-400 hover:underline">adeolaafaraday@gmail.com</a>.
                </p>
            </section>
        </div>
    );
};

export default PrivacyContent;
