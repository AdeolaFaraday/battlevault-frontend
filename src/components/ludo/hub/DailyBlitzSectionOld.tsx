import { Clock, Users, Trophy } from 'lucide-react';

const DailyBlitzSectionOld = () => {
    return (
        <div className="bg-[#24283b] border border-white/5 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                    <Trophy size={20} />
                </div>
                <div>
                    <h5 className="font-bold text-slate-200">Blitz Daily</h5>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                            <Clock size={12} /> Starts in 45m
                        </span>
                        <span className="flex items-center gap-1">
                            <Users size={12} /> 120/200
                        </span>
                    </div>
                </div>
            </div>
            <button className="px-4 py-2 border border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg text-sm font-bold transition-all">
                View
            </button>
        </div>
    );
};

export default DailyBlitzSectionOld;
