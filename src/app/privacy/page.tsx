"use client";

import React from 'react';
import LegalPageLayout from '@/src/components/legal/LegalPageLayout';
import PrivacyContent from '@/src/components/legal/PrivacyContent';

const PrivacyPage = () => {
    // Current date for "Last Updated"
    const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated={lastUpdated}>
            <PrivacyContent />
        </LegalPageLayout>
    );
};

export default PrivacyPage;
