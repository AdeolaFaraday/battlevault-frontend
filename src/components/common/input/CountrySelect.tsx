"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Check } from "lucide-react";
import clsx from "clsx";

interface Country {
    name: string;
    code: string;
    flag: string;
}

const countries: Country[] = [
    { name: "United States", code: "US", flag: "🇺🇸" },
    { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
    { name: "Canada", code: "CA", flag: "🇨🇦" },
    { name: "Australia", code: "AU", flag: "🇦🇺" },
    { name: "Nigeria", code: "NG", flag: "🇳🇬" },
    { name: "Ghana", code: "GH", flag: "🇬🇭" },
    { name: "South Africa", code: "ZA", flag: "🇿🇦" },
    { name: "Kenya", code: "KE", flag: "🇰🇪" },
    { name: "India", code: "IN", flag: "🇮🇳" },
    { name: "Germany", code: "DE", flag: "🇩🇪" },
    { name: "France", code: "FR", flag: "🇫🇷" },
    { name: "Spain", code: "ES", flag: "🇪🇸" },
    { name: "Brazil", code: "BR", flag: "🇧🇷" },
    { name: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
];

interface CountrySelectProps {
    value?: string;
    onChange: (value: string) => void;
    error?: string;
    label?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, error, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedCountry = countries.find(c => c.name === value);

    const filteredCountries = countries.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col gap-1.5 w-full" ref={containerRef}>
            {label && (
                <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{label}</span>
                    {error && <span className="text-[10px] font-bold text-red-400 uppercase tracking-tight">{error}</span>}
                </div>
            )}

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={clsx(
                        "w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all text-left",
                        isOpen ? "bg-white/10 border-indigo-500/50" : "bg-white/5 border-white/10 hover:border-white/20",
                        error ? "border-red-500/50" : ""
                    )}
                >
                    <div className="flex items-center gap-3">
                        {selectedCountry ? (
                            <>
                                <span className="text-xl">{selectedCountry.flag}</span>
                                <span className="text-sm font-medium text-white">{selectedCountry.name}</span>
                            </>
                        ) : (
                            <span className="text-sm font-medium text-white/30">Select your country</span>
                        )}
                    </div>
                    <ChevronDown size={18} className={clsx("text-white/30 transition-transform duration-300", isOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute z-[60] left-0 right-0 mt-2 bg-[#1a1d2e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-3xl"
                        >
                            <div className="p-3 border-b border-white/5">
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                    <input
                                        type="text"
                                        placeholder="Search countries..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/30 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="max-h-[240px] overflow-y-auto scrollbar-hide py-2">
                                {filteredCountries.length > 0 ? (
                                    filteredCountries.map((country) => (
                                        <button
                                            key={country.code}
                                            type="button"
                                            onClick={() => {
                                                onChange(country.name);
                                                setIsOpen(false);
                                                setSearchTerm("");
                                            }}
                                            className={clsx(
                                                "w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left",
                                                value === country.name ? "bg-indigo-500/10" : ""
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">{country.flag}</span>
                                                <span className="text-sm font-medium text-white">{country.name}</span>
                                            </div>
                                            {value === country.name && <Check size={16} className="text-indigo-400" />}
                                        </button>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center">
                                        <p className="text-sm text-white/20 font-medium">No countries found</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CountrySelect;
