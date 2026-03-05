import React from 'react';
import { Image as ImageIcon, Send } from 'lucide-react';

interface MessageInputProps {
    inputText: string;
    setInputText: (text: string) => void;
    handleSend: (e: React.FormEvent) => void;
    sending: boolean;
}

const MessageInput = ({ inputText, setInputText, handleSend, sending }: MessageInputProps) => {
    return (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#24283b] via-[#24283b] to-transparent shrink-0">
            <form
                onSubmit={handleSend}
                className="flex items-center gap-2 bg-[#1a1d2e] border border-white/10 rounded-full p-1 pl-4 shadow-xl backdrop-blur-md relative z-30"
            >
                <button type="button" className="text-slate-400 hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-white/5">
                    <ImageIcon size={20} />
                </button>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Message..."
                    className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none focus:ring-0 placeholder-slate-500 font-medium"
                />
                <button
                    type="submit"
                    disabled={!inputText.trim() || sending}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${inputText.trim() && !sending
                        ? 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:scale-105'
                        : 'bg-white/5 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    {sending ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Send size={16} className="ml-0.5" />
                    )}
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
