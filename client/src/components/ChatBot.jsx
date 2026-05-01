import { useState } from 'react';
import axios from 'axios';
import { MessageCircle, Send, X } from 'lucide-react';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Hi! I am your Zyntra Stylist. Ask me anything about fashion!' }
    ]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages([...messages, userMsg]);
        setInput('');

        try {
            const { data } = await axios.post('https://myntra-backend-he3a.onrender.com/api/ai/chat', { prompt: input });
            setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to AI." }]);
        }
    };

    return (
        <div className="fixed bottom-10 right-10 z-[1000]">
            {/* Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#ff3f6c] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all"
            >
                {isOpen ? <X size={30} /> : <MessageCircle size={30} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 h-96 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border flex flex-col overflow-hidden">
                    <div className="bg-[#ff3f6c] p-4 text-white font-bold">Zyntra AI Stylist</div>
                    
                    <div className="flex-1 p-4 overflow-y-auto space-y-3">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-2 rounded-lg text-sm ${m.role === 'user' ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 dark:bg-gray-800 dark:text-white'}`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-3 border-t flex gap-2">
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 p-2 bg-gray-50 dark:bg-gray-800 dark:text-white rounded-md text-sm outline-none"
                        />
                        <button onClick={handleSend} className="text-[#ff3f6c]"><Send /></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
