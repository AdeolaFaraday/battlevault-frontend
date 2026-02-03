import React from 'react';

const TermsContent = () => {
    return (
        <div className="space-y-6 text-slate-300 font-medium leading-relaxed">
            <section>
                <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
                <p>
                    Welcome to Battlevault (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern your use of our website, mobile application, and services (collectively, the &quot;Platform&quot;). By accessing or using Battlevault, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Platform.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">2. Eligibility and Account Requirements</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li>You must be at least 18 years of age (or the age of majority in your jurisdiction) to use Battlevault.</li>
                    <li>You must provide accurate, current, and complete information during the registration process.</li>
                    <li>You represent that you are not prohibited from using the Platform under any applicable laws or regulations.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">3. Nature of the Platform</h2>
                <p className="mb-2">
                    Battlevault is a digital gaming platform that offers skill-based games (such as Ludo) for entertainment purposes.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Free Public Gameplay:</strong> Access to our general game lobby and public matches is free of charge. We do not offer public gambling, betting, or wagering services.</li>
                    <li><strong>Private Competitions:</strong> The Platform supports private, invite-only competitions organized by users for their friends and family.</li>
                    <li><strong>No Gambling:</strong> Battlevault is strictly a skill-based gaming platform. We do not operate a casino, lottery, or any game of chance where outcomes are determined by luck.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">4. Rewards and Incentives</h2>
                <p>
                    Any monetary rewards, prizes, or payouts available on the Platform are strictly limited to private, invite-only competitions. These rewards are funded by the Platform or third-party sponsors as incentives for participation and performance. Users do not stake their own funds against other public users in an open market.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">5. Wallet, Deposits, and Withdrawals</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Internal Wallet:</strong> Battlevault maintains an internal wallet system to track your rewards and incentives. This wallet is not a bank account and does not accrue interest.</li>
                    <li><strong>Third-Party Payments:</strong> We use authorized third-party payment providers (such as Paystack) to process payouts. By using our services, you agree to comply with the terms and conditions of these providers.</li>
                    <li><strong>Withdrawals:</strong> Withdrawals are available only to fully verified users. We reserve the right to withhold withdrawals pending identity verification (KYC) to prevent fraud and money laundering.</li>
                    <li><strong>Limits:</strong> We may impose daily, weekly, or monthly withdrawal limits in accordance with our policies and regulatory requirements.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">6. User Conduct and Fair Play</h2>
                <p>
                    You agree to use the Platform fairly and responsibly. You will not:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>engage in any form of cheating, collusion, or manipulation of game outcomes;</li>
                    <li>use bots, automated scripts, or unauthorized third-party software;</li>
                    <li>create multiple accounts to abuse promotions or incentives;</li>
                    <li>harass, abuse, or threaten other users or Battlevault staff.</li>
                </ul>
                <p className="mt-2">
                    Violation of these rules may result in immediate account suspension, forfeiture of rewards, and legal action.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">7. Account Suspension and Termination</h2>
                <p>
                    Battlevault reserves the right, at its sole discretion, to suspend, restrict, or terminate your account at any time if we suspect you have violated these Terms, engaged in fraudulent activity, or if required by law.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">8. Limitation of Liability</h2>
                <p>
                    To the fullest extent permitted by law, Battlevault shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of or in connection with your use of the Platform. Our total liability for any claim arising from these Terms shall not exceed the amount validly held in your verified user wallet at the time the claim arose.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">9. Disclaimer</h2>
                <p>
                    Battlevault is not a financial institution, bank, or payment service provider. All funds are held and processed by licensed third-party partners. The Platform is provided &apos;as is&apos; without warranties of any kind.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">10. Modifications to Terms</h2>
                <p>
                    We may modify these Terms at any time. We will notify you of any material changes by posting the new Terms on the Platform. Your continued use of the Platform after such changes constitutes your acceptance of the new Terms.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">11. Governing Law</h2>
                <p>
                    These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Lagos, Nigeria.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">12. Contact Information</h2>
                <p>
                    If you have any questions about these Terms, please contact us at: <a href="mailto:legal@battlevault.com" className="text-indigo-400 hover:underline">legal@battlevault.com</a>.
                </p>
            </section>
        </div>
    );
};

export default TermsContent;
