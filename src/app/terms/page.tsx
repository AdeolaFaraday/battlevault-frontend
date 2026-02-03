"use client";

import React from 'react';
import LegalPageLayout from '@/src/components/legal/LegalPageLayout';
import TermsContent from '@/src/components/legal/TermsContent';

const TermsPage = () => {
    // Current date for "Last Updated"
    const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <LegalPageLayout title="Terms of Service" lastUpdated={lastUpdated}>
            <TermsContent />
        </LegalPageLayout>
    );
};

export default TermsPage;
