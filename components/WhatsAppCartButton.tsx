'use client';

import { CartItem } from '@/lib/types';
import { MessageCircle } from 'lucide-react';

interface WhatsAppCartButtonProps {
  selectedItems: CartItem[];
  totalAmount: number;
}

export default function WhatsAppCartButton({
  selectedItems,
  totalAmount,
}: WhatsAppCartButtonProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+9779866335500';

  const handleClick = () => {
    if (selectedItems.length === 0) return;

    const itemsList = selectedItems.map(item => {
      const unitName = item.product.unit.replace('per ', '');
      return `• ${item.product.name} (${item.quantity} ${unitName}) - ₹${(item.product.price * item.quantity).toFixed(2)}`;
    }).join('\n');

    const message = `🍬 *Cart Order Request from Mithai Shop*

📦 *Order Details:*
━━━━━━━━━━━━━━━
${itemsList}
━━━━━━━━━━━━━━━

💰 *Total Amount: ₹${totalAmount.toFixed(2)}*

Please confirm my order. Thank you! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      disabled={selectedItems.length === 0}
      className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-full font-semibold text-lg transition-all ${
        selectedItems.length > 0
          ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      <MessageCircle className="h-6 w-6" />
      Buy Selected on WhatsApp
    </button>
  );
}
