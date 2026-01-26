"use client";

import React from "react";
import { toast } from "sonner";
import CustomAlert, { AlertType } from "../../components/common/alert/CustomAlert";

interface ShowAlertProps {
    type: AlertType;
    title: string;
    message?: string;
    duration?: number;
}

export const useAlert = () => {
    const showAlert = ({ type, title, message, duration = 4000 }: ShowAlertProps) => {
        toast.custom((t) => (
            <CustomAlert
                type={type}
                title={title}
                message={message}
                onClose={() => toast.dismiss(t)}
            />
        ), {
            duration
        });
    };

    return {
        showAlert,
        success: (title: string, message?: string) => showAlert({ type: 'success', title, message }),
        error: (title: string, message?: string) => showAlert({ type: 'error', title, message }),
        warning: (title: string, message?: string) => showAlert({ type: 'warning', title, message }),
    };
};
